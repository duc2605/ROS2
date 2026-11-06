// Read-only upstream check. Never runs code from the robot repository.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const reviewed=vm.runInNewContext(fs.readFileSync(path.join(root,'dist/curriculum.js'),'utf8')+'\nPROJECT_COMMIT');
const repo='https://github.com/duc2605/three-robot-rescue.git';
const output=execFileSync('git',['ls-remote',repo,'refs/heads/main'],{encoding:'utf8',timeout:60000,stdio:['ignore','pipe','pipe']});
const match=output.match(/^([a-f0-9]{40})\s+refs\/heads\/main\s*$/);
if(!match)throw Error('Cannot verify the current main commit. Retain the last reviewed revision.');
const latest=match[1];
console.log(JSON.stringify({repository:repo,branch:'main',checked_at:new Date().toISOString(),reviewed_commit:reviewed,latest_commit:latest,changed:reviewed!==latest,next_step:reviewed!==latest?'Review upstream diff and update affected lessons according to SYNC.md. Do not merely replace PROJECT_COMMIT.':'No curriculum changes needed.'},null,2));
