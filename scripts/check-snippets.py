"""Syntax and isolated math checks only; never starts ROS or project code."""
import ast
import math
from pathlib import Path
import subprocess
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
python_snippets = list((root / '.qa/snippets').glob('*.py'))
for source in python_snippets:
    ast.parse(source.read_text(encoding='utf-8'), filename=str(source))
for source in (root / 'examples').rglob('*.py'):
    ast.parse(source.read_text(encoding='utf-8'), filename=str(source))
for manifest in (root / 'examples').rglob('package.xml'):
    ET.parse(manifest)
bash = Path('C:/Program Files/Git/bin/bash.exe')
shell_snippets = list((root / '.qa/snippets').glob('*.sh'))
for source in shell_snippets:
    checked = subprocess.run([str(bash), '-n', str(source)], capture_output=True, text=True)
    if checked.returncode:
        raise AssertionError(f'{source.name}: {checked.stderr}')

# Validate units/directions and invalid-range behavior using the actual tutorial functions.
all_py = [ast.parse(p.read_text(encoding='utf-8')) for p in python_snippets]
functions = {n.name: n for tree in all_py for n in tree.body if isinstance(n, ast.FunctionDef)}
scope = {'math': math}
for name in ['integrate_pose', 'valid_points', 'should_return_home']:
    exec(compile(ast.Module(body=[functions[name]], type_ignores=[]), '<lesson function>', 'exec'), scope)
x, y, yaw = scope['integrate_pose'](0, 0, math.pi/2, 1, 0, 0, 1)
assert math.isclose(x, 0, abs_tol=1e-9) and math.isclose(y, 1)
x, y, yaw = scope['integrate_pose'](0, 0, 0, 0, 1, 0, 0.5)
assert math.isclose(x, 0) and math.isclose(y, 0.5)
try:
    scope['integrate_pose'](0, 0, 0, 0, 0, 0, 0)
except ValueError:
    pass
else:
    raise AssertionError('dt=0 must fail')
class Scan:
    angle_min = 0
    angle_increment = math.pi/2
    range_min = 0.1
    range_max = 2.0
    ranges = [1.0, math.inf, math.nan, 0.01, 3.0]
assert scope['valid_points'](Scan()) == [(1.0, 0.0)]
assert scope['should_return_home'](19) is True
assert scope['should_return_home'](20) is False
print(f'PASS: {len(python_snippets)} Python snippets, {len(shell_snippets)} Bash snippets, example Python/XML, scan filtering, coordinate directions, dt guard, battery threshold.')
