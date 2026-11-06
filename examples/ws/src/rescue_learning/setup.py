from setuptools import setup, find_packages
from glob import glob

setup(
    name='rescue_learning', version='0.1.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/rescue_learning']),
        ('share/rescue_learning', ['package.xml']),
        ('share/rescue_learning/launch', glob('launch/*.launch.py')),
    ],
    install_requires=['setuptools'], zip_safe=True,
    maintainer='ROS 2 Lab learner', maintainer_email='learner@example.com',
    description='Independent training examples for ROS 2 Humble', license='MIT',
    entry_points={'console_scripts': [
        'status_pub = rescue_learning.status_pub:main',
        'safety_watch = rescue_learning.safety_watch:main',
        'add_server = rescue_learning.add_server:main',
        'add_client = rescue_learning.add_client:main',
        'count_action = rescue_learning.count_action:main',
    ]},
)
