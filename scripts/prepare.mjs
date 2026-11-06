import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const data=vm.runInNewContext(fs.readFileSync(path.join(root,'dist/curriculum.js'),'utf8')+'\n({MODULES,LESSONS,COMMANDS,PROJECT_COMMIT})');
const {MODULES,LESSONS,COMMANDS,PROJECT_COMMIT}=data;
const write=(p,text)=>{const target=path.join(root,p);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,text,'utf8');};
assert.equal(LESSONS.length,32);assert.equal(MODULES.length,8);
const ids=new Set();let quizzes=0,minutes=0;
for(const l of LESSONS){assert(!ids.has(l.id));ids.add(l.id);assert(l.id>0&&l.id<=32);assert(l.module===Math.ceil(l.id/4));assert(l.objectives.length>=3);assert(l.sections.length>=4);assert(l.practice.steps.length>=3);assert(l.practice.expected&&l.practice.solution);assert(new URL(l.source).protocol==='https:');assert(l.project);minutes+=l.minutes;for(const q of l.quiz){assert(q.options.length>=3);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);assert(q.explanation);quizzes++;}}
assert.equal(quizzes,64);
let md='# Giáo trình ROS 2 Humble — Từ dòng lệnh đến đội robot cứu hộ\n\n';
md+='Môi trường: Ubuntu22.04, Bash, ROS2 Humble, Python3, Gazebo Fortress.\n\n';
md+=`32 bài · 8 chặng · ${minutes/60} giờ đọc và thực hành ước tính (chưa tính xử lý lỗi môi trường/mở rộng). Gợi ý phân bổ trong 16 tuần.\n\n`;
md+=`Gắn với [three-robot-rescue](https://github.com/duc2605/three-robot-rescue/tree/${PROJECT_COMMIT}), source tham chiếu ngày04/11/2026. Giáo trình không thay source dự án; các tính năng đề xuất được phân biệt với baseline. GUI là phần mềm học tập, terminal trong GUI chỉ mô phỏng dữ liệu mẫu.\n\n`;
md+='Lệnh có chú thích Terminal A/B phải chạy ở cửa sổ riêng. Source Humble/overlay và đặt cùng ROS_DOMAIN_ID=31 trong từng terminal. Không chạy Bash trong PowerShell.\n\n';
for(const m of MODULES){md+=`## Chặng ${m.id}: ${m.title}\n\n${m.desc}\n\n`;for(const l of LESSONS.filter(l=>l.module===m.id)){
 md+=`### Bài ${l.id}: ${l.title}\n\n${l.summary}\n\nThời lượng gợi ý: ${l.minutes} phút.\n\nMục tiêu:\n\n${l.objectives.map(s=>'- '+s).join('\n')}\n\n`;
 for(const s of l.sections){md+=`#### ${s.heading}\n\n${s.text}\n\n`;if(s.code)md+='```'+s.lang+'\n'+s.code+'\n```\n\n';if(s.table){md+='| '+s.table.headers.join(' | ')+' |\n| '+s.table.headers.map(()=> '---').join(' | ')+' |\n';for(const row of s.table.rows)md+='| '+row.map(c=>c.replaceAll('|','\\|')).join(' | ')+' |\n';md+='\n';}}
 md+='#### Thực hành\n\n'+l.practice.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')+'\n\n**Kết quả cần đạt:** '+l.practice.expected+'\n\n**Gợi ý:** '+l.practice.solution+'\n\n';
 md+='#### Tự kiểm tra\n\n';for(const[qIndex,q]of l.quiz.entries()){md+=`${qIndex+1}. ${q.question}\n\n`+q.options.map((o,i)=>`   ${String.fromCharCode(65+i)}. ${o}`).join('\n')+`\n\nĐáp án: ${String.fromCharCode(65+q.answer)}. ${q.explanation}\n\n`;}
 md+=`**Gắn dự án:** ${l.project}\n\n[Nguồn tham khảo](${l.source})\n\n---\n\n`;
}}
md+='## Sổ tay câu lệnh\n\n';for(const [name,category,desc,code]of COMMANDS)md+=`### ${name} (${category})\n\n${desc}\n\n`+'```text\n'+code+'\n```\n\n';
write('dist/giao-trinh-ros2-humble.md',md);
// Ready-to-build training workspace; all files are derived from the lesson examples.
const packageRoot='examples/ws/src/rescue_learning';
const nodeMap=[[13,'status_pub'],[14,'safety_watch'],[15,'add_server'],[15,'add_client'],[16,'count_action']];
for(const [id,name]of nodeMap){const l=LESSONS.find(l=>l.id===id);const snippets=l.sections.filter(s=>s.lang==='python'&&s.code.includes('def main'));const s=snippets[name==='add_client'?1:0];assert(s,`missing ${name}`);write(`${packageRoot}/rescue_learning/${name}.py`,s.code+'\n');}
write(`${packageRoot}/rescue_learning/__init__.py`,'');write(`${packageRoot}/resource/rescue_learning`,'');
write(`${packageRoot}/setup.py`, `from setuptools import setup, find_packages\nfrom glob import glob\n\nsetup(\n    name='rescue_learning', version='0.1.0',\n    packages=find_packages(exclude=['test']),\n    data_files=[\n        ('share/ament_index/resource_index/packages', ['resource/rescue_learning']),\n        ('share/rescue_learning', ['package.xml']),\n        ('share/rescue_learning/launch', glob('launch/*.launch.py')),\n    ],\n    install_requires=['setuptools'], zip_safe=True,\n    maintainer='ROS 2 Lab learner', maintainer_email='learner@example.com',\n    description='Independent training examples for ROS 2 Humble', license='MIT',\n    entry_points={'console_scripts': [\n${nodeMap.map(([,name])=>`        '${name} = rescue_learning.${name}:main',`).join('\n')}\n    ]},\n)\n`);
write(`${packageRoot}/setup.cfg`,'[develop]\nscript_dir=$base/lib/rescue_learning\n[install]\ninstall_scripts=$base/lib/rescue_learning\n');
write(`${packageRoot}/package.xml`,'<?xml version="1.0"?>\n<package format="3">\n  <name>rescue_learning</name><version>0.1.0</version>\n  <description>Independent Humble training nodes. No robot command publisher.</description>\n  <maintainer email="learner@example.com">ROS 2 Lab learner</maintainer><license>MIT</license>\n  <buildtool_depend>ament_python</buildtool_depend>\n  <exec_depend>rclpy</exec_depend><exec_depend>std_msgs</exec_depend>\n  <exec_depend>example_interfaces</exec_depend><exec_depend>launch</exec_depend><exec_depend>launch_ros</exec_depend>\n  <export><build_type>ament_python</build_type></export>\n</package>\n');
write(`${packageRoot}/launch/learning.launch.py`,LESSONS[17].sections.find(s=>s.lang==='python'&&s.code.includes('generate_launch_description')).code+'\n');
const interfaceRoot='examples/ws/src/training_interfaces';
write(`${interfaceRoot}/msg/RobotHealth.msg`,'std_msgs/Header header\nstring robot_name\nbool data_fresh\n# -1.0 means no sample has ever been received.\nfloat32 seconds_since_update\n');
write(`${interfaceRoot}/CMakeLists.txt`,LESSONS[16].sections.find(s=>s.lang==='cmake').code+'\n');
write(`${interfaceRoot}/package.xml`,'<?xml version="1.0"?>\n<package format="3">\n  <name>training_interfaces</name><version>0.1.0</version><description>Training message contracts</description>\n  <maintainer email="learner@example.com">ROS 2 Lab learner</maintainer><license>MIT</license>\n  <buildtool_depend>ament_cmake</buildtool_depend><build_depend>rosidl_default_generators</build_depend>\n  <exec_depend>rosidl_default_runtime</exec_depend><depend>std_msgs</depend>\n  <member_of_group>rosidl_interface_packages</member_of_group>\n  <export><build_type>ament_cmake</build_type></export>\n</package>\n');
write('examples/README.md','# Ví dụ học tập ROS2 Humble\n\nĐây là workspace độc lập; không chép đè vào repository three-robot-rescue. Không có node nào phát cmd_vel. Node safety_watch đọc topic tuyệt đối /robotN/safety_status nên cần cùng domain với phiên muốn quan sát.\n\nGiải nén trên Ubuntu22.04. Trong thư mục examples/ws:\n\n```bash\nsource /opt/ros/humble/setup.bash\nrosdep install --from-paths src --ignore-src -r -y\ncolcon build --symlink-install\nsource install/setup.bash\nexport ROS_DOMAIN_ID=31\nros2 launch rescue_learning learning.launch.py\n```\n\nExecutable riêng: status_pub, safety_watch, add_server, add_client, count_action. Chạy server trước client; dùng terminal riêng đã source Humble/overlay. Node training_count chỉ đếm Fibonacci, không chạy nhiệm vụ cứu hộ.\n\nVí dụ action:\n\n```bash\nros2 run rescue_learning count_action\n# Terminal khác cùng môi trường:\nros2 action send_goal /training_count example_interfaces/action/Fibonacci "{order: 8}" --feedback\n```\n\nNguồn đã kiểm cú pháp Python, chưa build/chạy trên ROS trong tác vụ tạo giáo trình. Các bài13–18 giải thích từng tệp và bài tập mở rộng.\n');
// Export snippets for syntax-only checks. Nothing below runs a ROS command.
for(const l of LESSONS)for(const[i,s]of l.sections.entries())if(s.code&&['python','bash'].includes(s.lang))write(`.qa/snippets/lesson-${l.id}-${i}.${s.lang==='python'?'py':'sh'}`,s.code+'\n');
write('.qa/curriculum-summary.json',JSON.stringify({lessons:LESSONS.length,modules:MODULES.length,quizzes,minutes,hours:minutes/60,commands:COMMANDS.length,project_commit:PROJECT_COMMIT},null,2));
console.log(JSON.stringify({lessons:LESSONS.length,quizzes,minutes,hours:minutes/60,markdown_bytes:Buffer.byteLength(md),examples:nodeMap.length,validation:'passed'}));
