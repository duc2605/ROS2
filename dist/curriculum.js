/* Giáo trình tự biên soạn; ví dụ Linux dùng Bash trên Ubuntu 22.04. */
const DOC='https://docs.ros.org/en/humble/';
const REPO='https://github.com/duc2605/three-robot-rescue';
const MODULES=[
 {id:1,title:'Làm quen với terminal & Python',desc:'Bắt đầu từ số 0: hiểu thư mục, câu lệnh và những dòng Python đầu tiên.',level:'Nhập môn',weeks:'Tuần 1–2'},
 {id:2,title:'Khởi động ROS 2 Humble',desc:'Cài môi trường, hiểu ROS graph và tạo workspace của riêng bạn.',level:'Cơ bản',weeks:'Tuần 3'},
 {id:3,title:'Giao tiếp trong ROS 2',desc:'Topic, service, action và parameter qua những thí nghiệm nhỏ.',level:'Cơ bản',weeks:'Tuần 4–5'},
 {id:4,title:'Viết những node đầu tiên',desc:'Biến kiến thức thành mã Python có thể build và chạy.',level:'Lập trình',weeks:'Tuần 6–7'},
 {id:5,title:'Tổ chức & chẩn đoán hệ thống',desc:'Interface, launch, QoS và dữ liệu ghi lại để tìm nguyên nhân lỗi.',level:'Trung cấp',weeks:'Tuần 8–9'},
 {id:6,title:'Robot trong thế giới mô phỏng',desc:'Hệ tọa độ, mô hình robot, LiDAR, RViz và Gazebo Fortress.',level:'Trung cấp',weeks:'Tuần 10–11'},
 {id:7,title:'Điều hướng & đội hình cứu hộ',desc:'Từ odometry đến D* Lite, MPC và phối hợp ba robot trong dự án.',level:'Nâng cao',weeks:'Tuần 12–14'},
 {id:8,title:'Từ prototype đến dự án hoàn chỉnh',desc:'C++, vòng đời node, kiểm thử và đồ án đánh giá có số liệu.',level:'Nâng cao',weeks:'Tuần 15–16'}
];
const LESSONS=[];
const PROJECT_COMMIT='c8af894130b833a51a7d42fb7b927813b4a804ba';
const S=(heading,text,code='',lang='bash',extra={})=>({heading,text,code,lang,...extra});
let questionCounter=0;
const Q=(question,options,answer,explanation)=>{const shift=questionCounter++%options.length;return {question,options:[...options.slice(shift),...options.slice(0,shift)],answer:(answer-shift+options.length)%options.length,explanation};};
function L(id,module,title,summary,minutes,objectives,sections,steps,expected,solution,quiz,source,project){LESSONS.push({id,module,title,summary,minutes,objectives,sections,practice:{steps,expected,solution},quiz,source:source||DOC+'Tutorials.html',project:project||''});}
L(1,1,'cd, ls, pwd: đi lại trong máy tính','Hiểu terminal là gì, bạn đang ở đâu và cách đi đến thư mục dự án.',60,
 ['Phân biệt terminal, shell và ROS 2','Dùng được đường dẫn tuyệt đối, tương đối và thư mục cha','Tự tìm thư mục three-robot-rescue'],[
 S('Terminal là gì?','Terminal là cửa sổ để nhập câu lệnh. Shell (ở đây là Bash) đọc và thực hiện lệnh. ROS 2 là bộ công cụ xây dựng phần mềm robot; nó không thay thế Ubuntu. Các lệnh `cd`, `ls`, `pwd` thuộc môi trường hệ điều hành, dùng được cả khi chưa cài ROS. Mở terminal Ubuntu bằng Ctrl+Alt+T. Dấu `$` minh họa nơi nhập lệnh, không cần gõ dấu này.'),
 S('Ba lệnh đầu tiên','`pwd` (print working directory) in thư mục hiện tại. `ls` (list) liệt kê nội dung. `cd` (change directory) đổi thư mục của shell hiện tại. Cú pháp chung: tên_lệnh [tùy_chọn] [đối_số]. Ví dụ `ls -la` có tên lệnh `ls` và tùy chọn `-la`. `cd` có thể không in gì khi thành công.',`pwd
ls
ls -la
cd ~
pwd
cd ..
pwd
cd -`),
 S('Hiểu đường dẫn','`/` là thư mục gốc trên Linux. `~` là thư mục cá nhân, ví dụ /home/duc. `.` là thư mục hiện tại, `..` là thư mục cha. Đường dẫn bắt đầu bằng `/` là tuyệt đối; đường dẫn như `social_navigation_planner` tính từ vị trí hiện tại. Linux phân biệt chữ hoa/thường. Dùng dấu nháy khi tên có khoảng trắng.',`cd ~/three-robot-rescue
ls
cd social_navigation_planner
pwd
cd ..
ls social_navigation_sim`),
 S('Windows và Ubuntu','Giáo trình dùng Bash trong Ubuntu 22.04. PowerShell có tên lệnh trùng như `ls`, nhưng cách triển khai và tham số khác; `source`, `sudo apt` và đường dẫn /opt/ros phải chạy trong Ubuntu. Nếu dùng WSL2, mở tab Ubuntu thay vì PowerShell. Có thể dùng phòng thực hành mô phỏng của giao diện này để luyện những lệnh cơ bản.'),
 S('Khi lệnh báo lỗi','“No such file or directory” thường do sai tên, sai thư mục hiện tại hoặc chưa clone dự án. Chạy `pwd` và `ls` trước khi sửa đường dẫn. Phím Tab giúp điền tên; mũi tên lên lấy lệnh trước. `cd` chỉ nhận thư mục, không mở một tệp Python.')],
 ['Mở phòng thực hành, chạy pwd rồi ls.','Đi vào three-robot-rescue, liệt kê hai package.','Đi vào social_navigation_planner rồi trở về thư mục cha.'],
 'Bạn giải thích được vị trí hiện tại và thấy hai thư mục social_navigation_planner, social_navigation_sim.',
 'Trong terminal mô phỏng: `cd ~/three-robot-rescue`, `ls`, `cd social_navigation_planner`, `pwd`, `cd ..`. Không có output sau cd thường có nghĩa là đã chuyển thư mục thành công.',[
 Q('cd .. có tác dụng gì?',['Đi lên thư mục cha','Xóa thư mục hiện tại','Đến thư mục gốc'],0,'Hai dấu chấm chỉ thư mục cha; / mới là thư mục gốc.'),
 Q('Lệnh nào là lệnh ROS 2?',['ls -la','ros2 node list','pwd'],1,'ros2 là giao diện dòng lệnh của ROS 2. ls và pwd là lệnh hệ điều hành.')],
 'https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html','Thư mục gốc dự án chứa hai package, scripts và docs. Bắt đầu bằng việc tự tìm chúng bằng ls.');

L(2,1,'Tạo, đọc và quản lý tệp','mkdir, touch, cat, cp, mv và cách sửa một tệp cấu hình.',75,
 ['Tạo thư mục bài tập tách khỏi mã nguồn dự án','Đọc tệp và tìm một từ trong mã','Nhận biết ghi đè và xóa tệp'],[
 S('Tạo một góc học tập','`mkdir` tạo thư mục, `-p` tạo cả các thư mục cha còn thiếu. `touch` tạo tệp rỗng nếu chưa có; nếu đã có thì cập nhật mốc thời gian. Chúng ta đặt bài tập trong ~/ros2_learning để không lẫn với dự án.',`mkdir -p ~/ros2_learning/notes
cd ~/ros2_learning/notes
touch buoi01.txt
ls -l`),
 S('Đọc và sửa tệp','`cat` in toàn bộ nội dung, `less` đọc từng trang (bấm q để thoát). `nano` là trình soạn thảo terminal: Ctrl+O để lưu, Enter xác nhận tên, Ctrl+X để thoát. Dùng `head -n 20` xem 20 dòng đầu.',`nano buoi01.txt
cat buoi01.txt
head -n 20 ~/three-robot-rescue/README.md`),
 S('Sao chép, đổi tên, xóa','`cp nguồn đích` sao chép. `mv nguồn đích` chuyển hoặc đổi tên. `rm` xóa tệp và thường không có thùng rác. Chỉ thử với tệp bài tập tự tạo; đọc lại đường dẫn trước khi Enter. Sao chép thư mục cần `cp -r`. Không cần dùng sudo để sửa tệp của chính bạn.',`cp buoi01.txt ban_sao.txt
mv ban_sao.txt buoi01_backup.txt
ls
rm buoi01_backup.txt`),
 S('Tìm dấu vết trong mã','`grep -n` tìm dòng chứa chuỗi và in số dòng. `grep -R` tìm trong cây thư mục; `find` tìm theo tên tệp. Lệnh này hữu ích khi muốn biết topic /cmd_vel được tạo ở đâu. Đừng sửa nội dung chỉ vì tìm thấy từ khóa.',`cd ~/three-robot-rescue
find social_navigation_sim -name '*.launch.py'
grep -Rn 'create_subscription' social_navigation_planner/social_navigation_planner | head -n 15`)],
 ['Tạo ~/ros2_learning/notes và tệp tên mission.txt.','Ghi bằng nano: “Mục tiêu: hiểu luồng dữ liệu ba robot”.','Tạo bản sao, đổi tên bản sao rồi đọc lại.','Tìm các launch file của dự án bằng find.'],
 'Tệp mission.txt giữ nguyên; bạn có danh sách launch file và biết dùng q để thoát less.',
 '`mkdir -p ~/ros2_learning/notes`; sau đó dùng nano, cp và mv với các tệp nằm trong thư mục này. find chỉ đọc tên tệp và không thay đổi mã nguồn.',[
 Q('cp a.txt b.txt làm gì?',['Đổi tên a.txt','Sao chép a.txt sang b.txt','Đi vào b.txt'],1,'cp tạo bản sao; mv mới dùng để di chuyển hoặc đổi tên.'),
 Q('Đang đọc less, dùng phím nào để thoát?',['q','Ctrl+O','Tab'],0,'q là quit. Ctrl+O là thao tác lưu trong nano.')],
 'https://www.gnu.org/software/coreutils/manual/coreutils.html','Dùng find để khảo sát launch, config, worlds và models trước khi chạy mô phỏng.');

L(3,1,'Shell, biến môi trường & tiến trình','Hiểu source, export, pipe và vì sao mỗi terminal cần được cấu hình.',75,
 ['Đọc được export ROS_DOMAIN_ID=31','Phân biệt source với chạy script bằng bash','Dừng đúng tiến trình và hiểu pipe/redirect'],[
 S('Biến và export','Biến shell lưu chuỗi. `export` cho phép tiến trình con nhận biến. Không có khoảng trắng quanh dấu =. Dấu `$` đọc giá trị; nháy kép vẫn mở rộng biến, nháy đơn giữ nguyên ký tự. Hai terminal độc lập có thể có cấu hình khác nhau.',`export ROS_DOMAIN_ID=31
echo "$ROS_DOMAIN_ID"
echo 'Giá trị literal: $ROS_DOMAIN_ID'
printenv ROS_DOMAIN_ID`),
 S('source có gì đặc biệt?','`source file.bash` thực thi tệp ngay trong shell hiện tại nên các biến môi trường được giữ lại. `bash script.sh` tạo shell con. ROS 2 dùng setup.bash để thêm đường dẫn chương trình và thư viện. Source bản nền trước, rồi workspace. Thực hiện trong mỗi terminal mới.',`source /opt/ros/humble/setup.bash
# Khi workspace đã được build:
source ~/three-robot-rescue/install/setup.bash
echo "$ROS_DISTRO"`),
 S('Đọc một câu lệnh dài','Dấu `\\` cuối dòng nối lệnh sang dòng tiếp theo, không đặt khoảng trắng sau nó. `|` chuyển stdout của lệnh trái thành stdin của lệnh phải. `>` ghi đè tệp; `>>` nối thêm. `&&` chỉ chạy lệnh sau nếu lệnh trước thành công. `#` mở đầu chú thích.',`printenv | grep '^ROS'
printf 'buoi 1\n' > ~/ros2_learning/notes/log.txt
printf 'buoi 2\n' >> ~/ros2_learning/notes/log.txt
cat ~/ros2_learning/notes/log.txt`),
 S('Một terminal, một tác vụ chạy lâu','Node chạy liên tục thường giữ terminal cho đến khi bấm Ctrl+C. Mở terminal thứ hai để kiểm tra topic. Ctrl+C gửi tín hiệu ngắt, không phải sao chép văn bản. Có thể xem tiến trình bằng `ps`. Đối với dự án, chỉ mở một lượt mô phỏng cùng lúc và chờ nó dừng trước khi mở lượt khác.',`ps -ef | grep '[r]os2'
# Xem cách dùng trước khi chạy:
ros2 --help`)],
 ['Mở hai terminal Ubuntu. Export ROS_DOMAIN_ID=31 ở một cửa sổ.','Đọc biến ở cả hai cửa sổ để thấy cấu hình không tự chia sẻ.','Source Humble trong mỗi cửa sổ nếu đã cài.','Tạo log hai dòng bằng > và >> trong thư mục học tập.'],
 'Bạn giải thích được tại sao node ở hai terminal có thể không nhìn thấy nhau khi domain khác nhau.',
 'Export cùng ROS_DOMAIN_ID=31 và source cùng bản ROS trong từng terminal. Dấu > thay thế nội dung; >> giữ nội dung cũ và thêm ở cuối.',[
 Q('Tại sao dùng source setup.bash?',['Để biên dịch node','Để cập nhật môi trường shell hiện tại','Để mở Gazebo'],1,'setup.bash cấu hình môi trường. colcon build mới thực hiện build.'),
 Q('A && B chạy B khi nào?',['Luôn luôn','Khi A thành công','Khi A thất bại'],1,'Toán tử && kiểm tra mã thoát thành công của A.')],
 'https://www.gnu.org/software/bash/manual/html_node/Environment.html','Dự án dùng ROS_DOMAIN_ID=31 trong các bộ lệnh hướng dẫn; đặt giống nhau cho các terminal tham gia cùng phiên.');

L(4,1,'Python đủ dùng để viết node','Biến, list, hàm, class và callback qua ví dụ trạng thái ba robot.',120,
 ['Viết và chạy một tệp Python 3','Đọc class, self và hàm callback','Biết phân biệt lỗi cú pháp với lỗi logic'],[
 S('Tạo chương trình đầu tiên','Tạo ~/ros2_learning/status.py bằng nano hoặc VS Code. Python dùng thụt lề để xác định khối lệnh, nên dùng 4 dấu cách. Chuỗi dùng nháy, số thực dùng dấu chấm. list giữ nhiều phần tử. dict ánh xạ khóa thành giá trị.',`robots = ['leader', 'follower_1', 'follower_2']
battery = {'leader': 82, 'follower_1': 75, 'follower_2': 91}

for name in robots:
    print(f'{name}: {battery[name]}%')`,'python'),
 S('Hàm biến dữ liệu thành hành vi','`def` định nghĩa hàm; tham số nhận đầu vào; `return` trả kết quả. Tránh dùng biến toàn cục cho mọi thứ. Chia phép tính thành hàm nhỏ để kiểm thử không cần mở ROS hoặc Gazebo.',`def should_return_home(percent, threshold=20):
    return percent < threshold

assert should_return_home(10) is True
assert should_return_home(80) is False
print(should_return_home(15))`,'python'),
 S('Class và self','Class gom dữ liệu và hành vi. `__init__` khởi tạo đối tượng; `self` là đối tượng hiện tại. Trong ROS 2, class của bạn thường kế thừa Node. Callback là hàm được hệ thống gọi khi có sự kiện, ví dụ nhận message hoặc timer đến hạn.',`class RobotStatus:
    def __init__(self, name):
        self.name = name
        self.count = 0

    def on_message(self, text):
        self.count += 1
        print(self.name, self.count, text)

robot = RobotStatus('leader')
robot.on_message('ready')`,'python'),
 S('Chạy và đọc lỗi','Chạy bằng Python hệ thống của Ubuntu. Traceback cho biết tệp, dòng và loại lỗi. SyntaxError: sai cú pháp; IndentationError: sai thụt lề; ModuleNotFoundError: thiếu module hoặc chưa source. Ghi nhớ: `=` gán, `==` so sánh, `:` mở khối, `import` dùng module.',`python3 --version
python3 ~/ros2_learning/status.py
python3 -m py_compile ~/ros2_learning/status.py`)],
 ['Tạo status.py và chạy ví dụ list/dict.','Thêm trạng thái cho robot thứ ba và viết hàm cảnh báo pin.','Viết ít nhất ba assert: pin 0, 19 và 20 với ngưỡng 20.'],
 'Pin 0 và 19 cần trở về, pin 20 chưa dưới ngưỡng. Tệp chạy không có SyntaxError.',
 'Dùng `return percent < threshold`. Với điều kiện này, 20 không nhỏ hơn 20. Tách hàm ra khỏi I/O giúp kiểm tra trường hợp biên rõ ràng.',[
 Q('self đại diện cho gì?',['Đối tượng hiện tại','Tên package ROS','Một vòng lặp'],0,'Mỗi đối tượng có dữ liệu riêng như self.count.'),
 Q('Callback được gọi khi nào?',['Chỉ khi bạn gõ tên hàm trong terminal','Khi sự kiện mà nó đăng ký xảy ra','Chỉ khi build package'],1,'Timer hoặc message kích hoạt callback; executor điều phối callback trong ROS 2.')],
 'https://docs.python.org/3/tutorial/','Bạn sẽ dùng kỹ năng này để đọc planner và tạo node giám sát riêng, thay vì sửa thuật toán ngay từ đầu.');

L(5,2,'Cài Humble trên Ubuntu 22.04','Chuẩn bị đúng môi trường và kiểm tra bằng talker–listener.',120,
 ['Xác nhận Ubuntu Jammy và Bash','Cài ROS 2 Humble từ kho chính thức','Chạy demo ở hai terminal độc lập'],[
 S('Chọn đúng môi trường','Dùng Ubuntu 22.04 (Jammy) cho giáo trình này. Nếu máy chính là Windows, có thể học bằng Ubuntu trên WSL2; mô phỏng 3D cần WSLg/driver phù hợp và có thể gặp hạn chế GPU hoặc mạng. Ubuntu cài trực tiếp là lựa chọn thuận lợi cho Gazebo. Chạy các lệnh dưới đây trong terminal Ubuntu. RAM 8 GB là mức bắt đầu thực tế; mô phỏng nhiều robot và camera có thể cần nhiều hơn.',`cat /etc/os-release
uname -m
locale`),
 S('Locale và kho phần mềm','Đầu tiên cấu hình UTF-8, bật Universe và cập nhật Ubuntu. Đọc danh sách thay đổi của apt trước khi đồng ý. Với máy Ubuntu 22.04 cài mới, cập nhật hệ thống trước khi cài ROS giúp tránh lỗi phụ thuộc systemd/udev được tài liệu Humble lưu ý.',`sudo apt update
sudo apt upgrade
sudo apt install locales software-properties-common curl python3
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
sudo add-apt-repository universe`),
 S('Thêm kho ROS và cài Desktop','Gói ros2-apt-source cấu hình khóa và kho ROS. Đoạn dưới đọc phiên bản phát hành của gói cấu hình, tải bản dành cho Jammy rồi cài. Sau đó cài ROS Desktop và công cụ phát triển. Nếu tải lỗi, kiểm tra tài liệu cài đặt chính thức trong phần nguồn, không bỏ qua bước kho ROS.',`ROS_APT_VERSION=$(curl -fsSL https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | python3 -c 'import json,sys; print(json.load(sys.stdin)["tag_name"])')
curl -fL "https://github.com/ros-infrastructure/ros-apt-source/releases/download/\${ROS_APT_VERSION}/ros2-apt-source_\${ROS_APT_VERSION}.jammy_all.deb" -o /tmp/ros2-apt-source.deb
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-humble-desktop ros-dev-tools
source /opt/ros/humble/setup.bash
echo "$ROS_DISTRO"`),
 S('Kiểm tra hai chiều','Terminal A phát, terminal B nhận. Source Humble ở cả hai; đặt cùng domain 31. Chưa cần clone hay build dự án. Nếu ros2 không tìm thấy, kiểm tra source; nếu nhận im lặng, kiểm tra domain và môi trường.',`# Terminal A
source /opt/ros/humble/setup.bash
export ROS_DOMAIN_ID=31
ros2 run demo_nodes_cpp talker

# Terminal B (mở riêng)
source /opt/ros/humble/setup.bash
export ROS_DOMAIN_ID=31
ros2 run demo_nodes_py listener`),
 S('rosdep cho các bài sau','rosdep đọc package.xml và cài phụ thuộc hệ thống. Chỉ chạy init một lần; nếu báo đã được khởi tạo, không cần lặp lại init. update chạy bằng tài khoản thường. Mỗi lần thêm package mới, dùng rosdep install từ gốc workspace.',`sudo rosdep init
rosdep update`)],
 ['Kiểm tra VERSION_ID phải là 22.04.','Hoàn tất cài đặt và in ROS_DISTRO.','Chạy talker và listener trong 2 terminal, sau đó Ctrl+C cả hai.'],
 'ROS_DISTRO in humble; listener nhận liên tục dữ liệu do talker gửi.',
 'Nếu apt không tìm ros-humble-desktop, kiểm tra bản Ubuntu và việc cài ros2-apt-source. Nếu init báo đã tồn tại, tiếp tục rosdep update. Đây là hướng dẫn để bạn chạy; website không tự cài ROS.',[
 Q('Humble trong giáo trình dùng Ubuntu nào?',['22.04 Jammy','24.04 Noble','Bất kỳ bản nào với cùng lệnh apt'],0,'Các binary apt trong giáo trình nhắm Ubuntu 22.04.'),
 Q('ros2: command not found thường cần kiểm tra gì trước?',['Source /opt/ros/humble/setup.bash','Tăng tốc độ robot','Xóa workspace'],0,'Có thể terminal chưa có đường dẫn chương trình ROS trong môi trường.')],
 DOC+'Installation/Ubuntu-Install-Debs.html','README dự án yêu cầu Humble và Gazebo Fortress. Chúng ta giữ nguyên cặp phiên bản này.');

L(6,2,'Node, package và ROS graph','Nhìn phần mềm robot như một mạng các thành phần giao tiếp.',75,
 ['Phân biệt package, executable và node','Đọc danh sách node và thông tin kết nối','Phân biệt ROS 1 master với discovery ROS 2'],[
 S('Ba khái niệm không giống nhau','Package là đơn vị tổ chức mã và phụ thuộc. Executable là chương trình có thể chạy. Node là thành phần ROS trong tiến trình. Một executable có thể tạo nhiều node. Ví dụ `demo_nodes_cpp` là package, `talker` là executable, còn tên node cần xác nhận bằng ros2 node list.'),
 S('Giải phẫu ros2 run','`ros2` là chương trình CLI, `run` là lệnh con, sau đó là tên package và executable. `--help` giải thích tùy chọn của từng lệnh. Không gõ tên tệp .py tùy ý thay cho executable đã được cài.',`ros2 pkg executables demo_nodes_cpp
ros2 run demo_nodes_cpp talker
# Terminal khác đã source và cùng domain:
ros2 node list
ros2 node info /talker`),
 S('ROS graph và discovery','Graph gồm node cùng các kết nối topic, service, action. Các node cùng domain có thể khám phá nhau qua middleware; không cần chạy roscore như ROS 1. ROS_DOMAIN_ID giúp phân nhóm discovery, không phải cơ chế bảo mật. ros2 node list có thể cần vài giây để phản ánh trạng thái mới.'),
 S('Xem đồ thị bằng GUI','rqt_graph hiển thị kết nối publish/subscribe. Chạy thêm listener rồi quan sát talker → /chatter → listener. Các topic hệ thống có thể bị ẩn bởi bộ lọc. Dừng listener và quan sát graph thay đổi.',`ros2 run demo_nodes_py listener
# Terminal thứ ba:
ros2 run rqt_graph rqt_graph`)],
 ['Chạy talker và listener.','Dùng node list, node info rồi vẽ graph trên giấy.','Dừng listener và so sánh số subscriber trước/sau.'],
 'Bạn chỉ đúng package nào cung cấp chương trình, tên node đang chạy và tên topic nối hai node.',
 'Tên chương trình không bắt buộc bằng tên node. `ros2 node info /talker` cho biết publishers, subscribers và services của node đang có trong graph.',[
 Q('Một process có thể chứa nhiều node không?',['Có','Không','Chỉ khi chạy roscore'],0,'ROS 2 hỗ trợ composition và nhiều node trong một tiến trình.'),
 Q('ROS_DOMAIN_ID có bảo mật dữ liệu không?',['Có, mã hóa mọi message','Không, chủ yếu phân nhóm discovery','Chỉ bảo mật camera'],1,'Bảo mật cần cơ chế khác như SROS2 và chính sách mạng.')],
 DOC+'Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html','Trước khi đọc thuật toán, hãy xác định process và node nào thực sự tồn tại trong phiên mô phỏng.');

L(7,2,'Turtlesim: điều khiển robot đầu tiên','Một mô hình nhỏ để thấy node, topic và lệnh vận tốc hoạt động.',90,
 ['Mở GUI turtlesim và điều khiển bằng bàn phím','Đọc Twist và Pose','Quan sát hệ thống từ terminal thứ ba'],[
 S('Mở mô phỏng nhỏ','Turtlesim là bài tập 2D gọn để học ROS, không phải Gazebo. Cài package nếu chưa có. Mỗi terminal dùng source Humble và domain 31 như bài trước.',`sudo apt install ros-humble-turtlesim
ros2 run turtlesim turtlesim_node
# Terminal B:
ros2 run turtlesim turtle_teleop_key`),
 S('Bàn phím điều khiển terminal','Bấm mũi tên trong terminal teleop đang được focus. Không phải bấm trong cửa sổ turtlesim. Terminal teleop phát vận tốc, turtlesim nhận và cập nhật vị trí. Khi điều khiển, quan sát x, y và theta trong Pose.',`# Terminal C:
ros2 topic list -t
ros2 topic echo /turtle1/pose
# Ctrl+C để dừng echo`),
 S('Gửi một lệnh vận tốc','Twist gồm linear và angular, mỗi phần có x/y/z. Robot phẳng thường dùng linear.x (m/s) và angular.z (rad/s). Turtlesim dùng không gian mô phỏng riêng nên không dùng kích thước của nó để suy ra robot thật. --once gửi đúng một message; rùa có thể đi một đoạn trước khi timeout.',`ros2 interface show geometry_msgs/msg/Twist
ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 1.0}, angular: {z: 0.5}}"`),
 S('Đừng có hai nguồn lệnh cùng lúc','Khi pub và teleop cùng phát một topic, rùa có thể nhận lệnh xen kẽ. Dừng teleop trước thí nghiệm pub. Đây là phiên bản thu nhỏ của lỗi có hai controller tranh quyền điều khiển robot. Một topic tên /cmd_vel không tự đảm bảo chỉ có một người phát.')],
 ['Điều khiển rùa vẽ gần một hình vuông.','Quan sát pose và giải thích theta.','Dừng teleop rồi gửi một Twist bằng CLI.'],
 'GUI phản hồi với lệnh; topic echo cho thấy tọa độ thay đổi và bạn xác định được publisher của cmd_vel.',
 'Bốn đoạn tiến với các lần quay gần 90°. Bàn phím phải focus đúng terminal. Dùng `ros2 topic info /turtle1/cmd_vel -v` để kiểm tra endpoint.',[
 Q('Trong chuyển động phẳng, angular.z biểu diễn gì?',['Tốc độ quay quanh trục đứng','Tọa độ z','Mức pin'],0,'Thông thường dùng rad/s cho vận tốc góc.'),
 Q('Muốn teleop nhận phím, focus ở đâu?',['Terminal chạy teleop','README','Bất kỳ cửa sổ nào'],0,'teleop đọc bàn phím từ terminal của nó.')],
 DOC+'Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html','Sau khi hiểu rùa nhận Twist, bạn sẽ dễ hiểu luồng vận tốc đến ba robot; tên topic thực tế phải tra từ dự án.');

L(8,2,'Workspace, colcon & package','Tự tạo gói học tập và hiểu vì sao build xong vẫn phải source.',120,
 ['Hiểu src, build, install và log','Tạo package ament_python','Phân biệt workspace học tập và workspace dự án'],[
 S('Một workspace có gì?','Workspace là thư mục làm việc chứa package. `src` giữ mã nguồn; `build` giữ dữ liệu trung gian; `install` giữ kết quả được cài; `log` giữ nhật ký build. Không sửa tệp trong install để thay cho mã nguồn. colcon điều phối build; ament cung cấp hệ thống build ROS. Workspace là quy ước tổ chức, không bắt buộc mọi repo đều đặt mã trong src.'),
 S('Tạo package rescue_learning','Trong các bài lập trình, dùng workspace riêng ~/ros2_learning/ws. Gói có dependencies rclpy, std_msgs và example_interfaces. Tên package nên viết thường với gạch dưới.',`source /opt/ros/humble/setup.bash
mkdir -p ~/ros2_learning/ws/src
cd ~/ros2_learning/ws/src
ros2 pkg create rescue_learning --build-type ament_python --dependencies rclpy std_msgs example_interfaces
cd ..
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install --packages-select rescue_learning`),
 S('Underlay và overlay','Bản Humble trong /opt/ros là underlay; package tự build là overlay. Mở terminal mới để chạy, source underlay rồi overlay. Mỗi terminal dùng lệnh đó. --symlink-install hỗ trợ phát triển nhưng đổi entry_points, thêm tệp hoặc thay metadata vẫn cần build lại.',`source /opt/ros/humble/setup.bash
source ~/ros2_learning/ws/install/setup.bash
ros2 pkg prefix rescue_learning
ros2 pkg executables rescue_learning`),
 S('Đọc package Python','package.xml khai báo phụ thuộc và metadata. setup.py cấu hình cài package, dữ liệu và entry_points. setup.cfg chỉ nơi đặt executable. Thư mục rescue_learning/rescue_learning giữ module Python, có __init__.py. Package mới chưa có console_scripts nên danh sách executable có thể rỗng.'),
 S('Bản đồ lỗi build','“package not found”: kiểm tra source và ros2 pkg prefix. “No executable found”: kiểm tra entry_points và build lại. ImportError: kiểm tra phụ thuộc, interpreter và tên module. Dự án three-robot-rescue dùng hai package ở ngay gốc repo và build bằng --base-paths; đừng tự chuyển thư mục trong dự án.')],
 ['Tạo và build rescue_learning.','Mở terminal mới rồi source overlay.','Dùng pkg prefix xác nhận đường dẫn workspace học tập.','Tìm package.xml và setup.py, đọc các trường quan trọng.'],
 'rescue_learning được tìm thấy trong ~/ros2_learning/ws/install; bạn nêu được vai trò bốn thư mục workspace.',
 'Chưa viết node nên không có executable là bình thường. Không dùng sudo colcon build; workspace phải thuộc tài khoản hiện tại.',[
 Q('Sửa mã nguồn ở thư mục nào?',['src hoặc thư mục package gốc','install','log'],0,'install là đầu ra. Trong repo dự án, package nằm trực tiếp ở gốc.'),
 Q('Đổi console_scripts xong cần gì?',['Build lại và source đúng overlay','Chỉ đổi ROS_DOMAIN_ID','Mở RViz'],0,'Entry point là metadata được cài trong bước build.')],
 DOC+'Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html','Hai package dự án nằm ở gốc repo; các lệnh build chính thức dùng --base-paths social_navigation_planner social_navigation_sim.');

L(9,3,'Topic & message: luồng dữ liệu','Theo một message từ publisher đến subscriber và đọc kiểu dữ liệu.',90,
 ['Dùng list, info, echo và hz','Hiểu tên topic, message type và QoS','Tra đúng topic thay vì đoán tên'],[
 S('Topic là luồng, message là cấu trúc','Publisher gửi các mẫu dữ liệu lên topic; subscriber đăng ký nhận. Không cần biết trực tiếp tên node bên kia. Một topic có thể có nhiều publisher và subscriber. Tên topic, kiểu dữ liệu và QoS phải tương thích. Topic hợp cho dữ liệu liên tục như scan, pose, vận tốc.'),
 S('Bộ công cụ quan sát','Chạy turtlesim của bài 7 trước. `list -t` in kèm kiểu, `info -v` xem endpoint và QoS, `echo` xem nội dung, `hz` đo tốc độ nhận ở phía công cụ (không đảm bảo bằng tần số thực ở nguồn). Dừng echo/hz bằng Ctrl+C.',`ros2 topic list -t
ros2 topic info /turtle1/pose -v
ros2 topic echo /turtle1/pose --once
ros2 topic hz /turtle1/pose
ros2 interface show turtlesim/msg/Pose`),
 S('Đọc topic trong dự án','Trong mã hiện tại, coordinator phát /dstar_lite/path kiểu Path và /formation/reference kiểu PoseArray. Mỗi bộ MPC nhận /robotN/scan rồi phát /robotN/cmd_vel kiểu Twist. Đây là tên đọc từ nguồn; graph runtime vẫn là nơi xác nhận phiên bạn đang chạy.',`# Chạy khi dự án đã được bạn mở ở terminal khác:
ros2 topic info /formation/reference -v
ros2 interface show geometry_msgs/msg/PoseArray
ros2 topic echo /robot1/safety_status --once
ros2 topic hz /robot1/scan`),
 S('Đừng bỏ qua đơn vị và timestamp','Header thường có stamp và frame_id. Số tọa độ chỉ có ý nghĩa khi biết nó thuộc frame nào và thời điểm nào. PoseArray có một header cho cả mảng pose. Một Pose không tự nói pose đó của robot nào; thứ tự trong mảng phải đọc theo giao ước của node, không tự gán theo suy đoán.')],
 ['Trên turtlesim, liệt kê topic có kiểu.','Viết bảng 3 cột: topic, type, node phát cho ít nhất 3 topic.','Khi có phiên dự án, kiểm tra /formation/reference bằng info -v.'],
 'Bạn phân biệt được số publisher, subscriber, tần số nhận và cấu trúc message.',
 'Dùng node info để đối chiếu với topic info. Nếu thấy topic nhưng echo im lặng, kiểm tra publisher đang phát, QoS, domain và đồng hồ; chưa kết luận thuật toán hỏng.',[
 Q('Thấy topic trong list đã chứng minh đang có dữ liệu mới chưa?',['Chưa','Đã chứng minh','Chỉ cần tên có scan'],0,'Endpoint có thể tồn tại nhưng chưa phát hoặc QoS không tương thích.'),
 Q('frame_id giải thích điều gì?',['Hệ tọa độ của dữ liệu','Phiên bản Ubuntu','Tên executable'],0,'Một tọa độ cần frame và thời gian để diễn giải đúng.')],DOC+'Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html','Lập bảng topic thực tế cho robot1, robot2, robot3; đặc biệt theo dõi /formation/reference và safety_status.');

L(10,3,'Service: hỏi một lần, nhận một kết quả','Dùng request–response cho thao tác ngắn như reset và đổi cấu hình.',75,
 ['Tra loại service và đọc request/response','Gọi reset, spawn trong turtlesim','Hiểu giới hạn service cho tác vụ kéo dài'],[
 S('Mô hình request–response','Service client gửi request; server xử lý rồi trả response. Một giao diện .srv có phần request, dấu --- và phần response. Hợp với thao tác ngắn như đặt trạng thái hoặc truy vấn. Chạy lâu, cần feedback/cancel thì cân nhắc action.'),
 S('Khám phá trước khi gọi','Mở turtlesim. list -t hiển thị kiểu service. interface show đọc schema. spawn tạo thêm rùa với tọa độ và tên. reset xóa các rùa tạo thêm và đưa hệ về trạng thái ban đầu.',`ros2 service list -t
ros2 service type /spawn
ros2 interface show turtlesim/srv/Spawn
ros2 service call /spawn turtlesim/srv/Spawn "{x: 2.0, y: 3.0, theta: 0.0, name: 'rescue2'}"
ros2 service call /reset std_srvs/srv/Empty '{}'`),
 S('Cú pháp YAML khi gọi','Đối số request ở CLI dùng YAML. Đặt toàn bộ object trong nháy để shell không tách sai. Phải có khoảng trắng sau dấu hai chấm. Empty có request rỗng nên dùng {}. Tên field và loại dữ liệu phải đúng interface; lỗi parse không phải lỗi mạng.'),
 S('Bài học thiết kế','Nếu server chậm và client chờ đồng bộ bên trong một callback ở executor đơn luồng, hệ có thể bị kẹt. Với code thực tế, ưu tiên call_async và giới hạn thời gian chờ. Một service trả thành công chỉ xác nhận thao tác theo contract, không tự chứng minh robot đã đạt mục tiêu vật lý.')],
 ['Spawn rùa thứ hai có tên rescue2.','Kiểm tra các topic mới rồi reset.','Giải thích vì sao “đi tới vị trí cứu hộ” thường hợp action hơn service.'],
 'Service trả về tên rùa; reset đưa GUI về một rùa. Bạn đọc được phần request và response.',
 'Dùng interface show trước rồi mới soạn YAML. Di chuyển dài cần feedback và khả năng hủy, trong khi service mô hình hóa một lời gọi và kết quả.',[
 Q('Dấu --- trong .srv ngăn cách gì?',['Request và response','Hai topic','Hai node'],0,'Phần trước là yêu cầu, phần sau là kết quả.'),
 Q('Service hợp nhất với tác vụ nào?',['Reset trạng thái ngắn','Đi tuần 30 phút cần hủy','Luồng camera 30 Hz'],0,'Tác vụ dài dùng action; camera thường dùng topic.')],DOC+'Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html','Không suy rằng dự án đã có service điều khiển nhiệm vụ chỉ vì có service parameter. Tra graph và code trước khi thiết kế thêm API.');

L(11,3,'Action: mục tiêu, phản hồi & hủy','Hiểu tác vụ kéo dài qua action quay rùa và chuẩn bị thiết kế nhiệm vụ cứu hộ.',90,
 ['Phân biệt goal, feedback, result','Gửi action goal từ CLI','Biết acceptance không đồng nghĩa thành công'],[
 S('Vì sao cần action?','Action cho tác vụ có thời gian thực hiện. Client gửi goal, server có thể chấp nhận hoặc từ chối. Trong khi chạy, server gửi feedback; cuối cùng trả result với trạng thái. Client có thể yêu cầu cancel, server cần hỗ trợ và xử lý yêu cầu đó. Goal accepted chưa có nghĩa nhiệm vụ xong.'),
 S('Thử với turtlesim','Bật turtlesim, dừng teleop để không tranh lệnh. Action rotate_absolute quay rùa đến góc tuyệt đối. theta tính bằng radian. --feedback hiển thị tiến độ trong terminal.',`ros2 action list -t
ros2 action info /turtle1/rotate_absolute
ros2 interface show turtlesim/action/RotateAbsolute
ros2 action send_goal /turtle1/rotate_absolute turtlesim/action/RotateAbsolute "{theta: 1.57}" --feedback`),
 S('Đọc một interface action','Một .action có ba phần ngăn bởi hai dòng ---. Lần lượt là goal, result và feedback; thứ tự lưu trong tệp khác cách ta hay kể “goal–feedback–result”. Nhận diện status: accepted/executing, succeeded, aborted, canceled. Đóng CLI bằng Ctrl+C không nên được xem là bằng chứng server đã xác nhận hủy goal.'),
 S('Liên hệ cứu hộ','Có thể thiết kế action RescueMission với goal là khu vực/đích, feedback là trạng thái tìm kiếm và result là kết quả có bằng chứng. Đây là đề xuất mở rộng. Mã dự án hiện nhận /goal_pose bằng topic PoseStamped ở coordinator; không tự khẳng định đó là action NavigateToPose của Nav2.')],
 ['Gửi ba góc khác nhau cho rotate_absolute.','Ghi goal, một feedback và trạng thái kết thúc.','Viết trên giấy interface nhiệm vụ cứu hộ có ba phần.'],
 'Rùa quay theo mục tiêu; bạn không nhầm request accepted với SUCCEEDED.',
 'Goal đề xuất: PoseStamped target; Result: bool completed và string reason; Feedback: string phase và float32 progress. Cần định nghĩa progress dựa trên dữ liệu, không tăng giả theo thời gian.',[
 Q('Trong tệp .action, thứ tự ba phần là gì?',['Goal, result, feedback','Goal, feedback, result','Request, response, topic'],0,'Hai dấu --- tách Goal / Result / Feedback.'),
 Q('/goal_pose trong dự án có mặc nhiên là action không?',['Không, nguồn hiện tại đăng ký một topic','Có vì tên có goal','Có vì RViz gửi nó'],0,'Kiểu kết nối phải xác nhận bằng code và CLI.')],DOC+'Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html','Thiết kế mission action là bài mở rộng; giữ rõ khác biệt với /goal_pose sẵn có.');

L(12,3,'Parameter, remap & namespace','Chạy cùng một node với tên và cấu hình khác nhau cho nhiều robot.',90,
 ['Dùng param get/set/dump','Phân biệt parameter với launch argument','Hiểu namespace và tên tuyệt đối'],[
 S('Cấu hình của từng node','Parameter là giá trị cấu hình gắn với node, ví dụ tốc độ hay use_sim_time. Node có thể yêu cầu khai báo trước và có thể từ chối cập nhật. Set thành công không đảm bảo code dùng lại giá trị ngay nếu chương trình chỉ đọc lúc khởi tạo. Dùng turtlesim để thử thay nền.',`ros2 param list /turtlesim
ros2 param get /turtlesim background_r
ros2 param set /turtlesim background_r 180
ros2 service call /clear std_srvs/srv/Empty '{}'
ros2 param dump /turtlesim`),
 S('Đổi tên và namespace','Các đối số ROS đứng sau --ros-args. `-r __node:=...` đổi tên node, `-r __ns:=...` đặt namespace. Tên tương đối như cmd_vel được ghép namespace; tên tuyệt đối /cmd_vel không tự đổi theo namespace. Namespace node không tự đổi frame_id trong message.',`ros2 run demo_nodes_cpp talker --ros-args -r __node:=rescue_talker -r __ns:=/training -r chatter:=status
# Ở terminal khác:
ros2 node info /training/rescue_talker
ros2 topic echo /training/status --once`),
 S('Launch argument khác parameter','Tham số launch truyền theo dạng name:=value ở ros2 launch. Launch có thể đưa nó vào parameter, tên tệp, điều kiện hoặc nhiều node. -p là parameter khi chạy node trực tiếp. Muốn biết launch hỗ trợ gì, dùng --show-args trước; không tự đoán tên.',`# Chỉ xem khai báo, không khởi động simulation:
ros2 launch social_navigation_sim social_dynamic.launch.py --show-args`),
 S('Ba robot cần hơn ba namespace','Dự án có robot1, robot2, robot3 và leader mặc định trong nguồn là robot3. Topic cmd_vel được tạo với tên tuyệt đối chứa robot_name. Đổi namespace đơn thuần không tự biến robot1 thành robot2. Cần kiểm tra parameter robot_name, frame_prefix, bridge và cấu hình controller cùng nhau.')],
 ['Đổi màu nền turtlesim rồi clear.','Chạy talker trong /training và remap chatter thành status.','Đọc tham số launch dự án bằng --show-args sau khi đã build.'],
 'Bạn nhìn thấy /training/status và phân biệt rõ ba loại tên: node, topic, frame.',
 'Relative topic status nằm trong /training; absolute /status nằm ở gốc. Giữ đúng thứ tự --ros-args rồi -r hoặc -p khi chạy executable.',[
 Q('Namespace có tự đổi frame_id trong message không?',['Không','Có','Chỉ khi tên node đổi'],0,'frame_id là dữ liệu chuỗi và cần cấu hình rõ.'),
 Q('leader_camera:=true trong ros2 launch là gì?',['Launch argument','Lệnh Linux','Luôn là parameter cùng tên của mọi node'],0,'Launch quyết định nó được dùng cho phần nào của hệ thống.')],DOC+'Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Parameters/Understanding-ROS2-Parameters.html','Tra leader_robot thay vì mặc định robot1 là leader; source hiện đặt robot3 làm mặc định.');

L(13,4,'Viết publisher bằng rclpy','Tạo node phát trạng thái cứu hộ và đăng ký executable để ros2 run tìm thấy.',120,
 ['Hiểu chu trình init → Node → spin → shutdown','Viết timer và publisher','Cài console_scripts trong setup.py'],[
 S('Chuẩn bị từ bài 8','Dùng package rescue_learning trong workspace riêng. Tạo tệp ~/ros2_learning/ws/src/rescue_learning/rescue_learning/status_pub.py. Node dưới đây là ví dụ học tập, không phải trạng thái thật của dự án. Timer mỗi giây phát một chuỗi vào topic tương đối training_status.'),
 S('Mã publisher hoàn chỉnh','create_publisher nhận kiểu message, tên topic và độ sâu hàng đợi. create_timer nhận chu kỳ giây và callback. spin giữ executor xử lý sự kiện. Khối finally dọn node khi dừng bằng Ctrl+C.',`import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class StatusPublisher(Node):
    def __init__(self):
        super().__init__('training_status_publisher')
        self.sent = 0
        self.output = self.create_publisher(String, 'training_status', 10)
        self.timer = self.create_timer(1.0, self.tick)

    def tick(self):
        self.sent += 1
        message = String()
        message.data = f'TRAINING ONLY: heartbeat {self.sent}'
        self.output.publish(message)
        self.get_logger().info(message.data)

def main(args=None):
    rclpy.init(args=args)
    node = StatusPublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == '__main__':
    main()`,'python'),
 S('Đăng ký executable','Trong setup.py của rescue_learning, thêm entry dưới đây vào danh sách console_scripts, không thay toàn bộ setup.py bằng đoạn trích. Phần bên trái là tên executable; bên phải là module:function. package.xml đã có rclpy và std_msgs từ bài 8.',`entry_points={
    'console_scripts': [
        'status_pub = rescue_learning.status_pub:main',
    ],
},`,'python'),
 S('Build và quan sát','Build trong terminal đã source Humble. Ở terminal chạy node, source overlay. Ở terminal quan sát, cũng source và dùng cùng domain. Chu kỳ 1 giây tương ứng mục tiêu khoảng 1 Hz; điều phối hệ thống có thể tạo jitter.',`cd ~/ros2_learning/ws
colcon build --symlink-install --packages-select rescue_learning
source install/setup.bash
ros2 run rescue_learning status_pub
# Terminal khác:
ros2 topic echo /training_status
ros2 topic hz /training_status`)],
 ['Viết node và console_scripts rồi build.','Quan sát message bằng CLI.','Đổi chu kỳ thành 0.5 giây, chạy lại và so sánh hz.'],
 'Có executable status_pub, topic /training_status phát heartbeat; chu kỳ giảm một nửa thì tần số mục tiêu tăng gấp đôi.',
 'Nếu No executable found, kiểm tra setup.py, build lại và source workspace. Nếu import module lỗi, tệp cần nằm bên trong thư mục module rescue_learning có __init__.py.',[
 Q('create_timer(0.5, callback) có tần số mục tiêu bao nhiêu?',['2 Hz','0.5 Hz','50 Hz'],0,'Tần số = 1 / chu kỳ tính bằng giây.'),
 Q('console_scripts ánh xạ tới đâu?',['Module Python và hàm main','Tên topic','Đường dẫn /opt/ros'],0,'Định dạng executable = package.module:function.')],DOC+'Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html','Cùng mẫu create_publisher xuất hiện trong dstar_mpc_controller.py nhưng dữ liệu thực là Path, PoseArray, Twist và trạng thái an toàn.');

L(14,4,'Subscriber & node giám sát dự án','Đọc trạng thái của ba robot mà không can thiệp điều khiển.',120,
 ['Viết subscriber callback','Đăng ký nhiều topic bằng một node','Nhận biết thiếu dữ liệu và stale data'],[
 S('Từ nhận chuỗi đến theo dõi đội robot','Tạo rescue_learning/safety_watch.py. Trong mã dự án hiện tại, các bộ MPC phát String trên /robot1/safety_status, /robot2/safety_status, /robot3/safety_status. Node học tập chỉ đọc và log, không phát cmd_vel. Chưa có phiên dự án thì thử bằng CLI pub một String do bạn tự tạo.'),
 S('Mã observer hoàn chỉnh','Giữ reference của các subscription. Tham số mặc định robot=robot trong lambda giữ đúng tên ở từng vòng lặp; nếu chỉ tham chiếu biến vòng lặp, cả ba callback có thể dùng tên cuối. Watchdog dùng đồng hồ đơn điệu của máy để đo thời gian nhận, độc lập đồng hồ mô phỏng.',`import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SafetyWatch(Node):
    def __init__(self):
        super().__init__('training_safety_watch')
        self.last_seen = {name: None for name in ['robot1', 'robot2', 'robot3']}
        self.inputs = [
            self.create_subscription(
                String, f'/{robot}/safety_status',
                lambda msg, robot=robot: self.receive(robot, msg), 10)
            for robot in self.last_seen
        ]
        self.timer = self.create_timer(2.0, self.check)

    def receive(self, robot, msg):
        self.last_seen[robot] = time.monotonic()
        self.get_logger().info(f'{robot}: {msg.data}')

    def check(self):
        now = time.monotonic()
        for robot, stamp in self.last_seen.items():
            if stamp is None or now - stamp > 3.0:
                self.get_logger().warning(f'{robot}: chưa có trạng thái mới trong 3s')

def main(args=None):
    rclpy.init(args=args)
    node = SafetyWatch()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == '__main__':
    main()`,'python'),
 S('Đăng ký và tạo dữ liệu thử','Thêm `safety_watch = rescue_learning.safety_watch:main` vào console_scripts, build và source lại. Lệnh pub dưới chỉ dùng ở bài tập khi chưa chạy dự án, để không trộn trạng thái giả vào phiên thật.',`ros2 run rescue_learning safety_watch
# Terminal khác, chỉ dùng cho thí nghiệm độc lập:
ros2 topic pub --rate 1 /robot1/safety_status std_msgs/msg/String "{data: 'training_sample'}"`),
 S('Giới hạn của giám sát','Không nhận được message có thể do node dừng, mạng, QoS hoặc chưa phát; không đủ kết luận robot hỏng. String cần đọc schema trong nguồn trước khi parse JSON hay tự gán ý nghĩa. Watchdog thực tế nên có trạng thái “chưa biết”, “stale” và “hợp lệ”, cùng timestamp/nguồn.')],
 ['Chạy observer và chỉ tạo dữ liệu thử cho robot1.','Xác nhận robot2, robot3 bị cảnh báo thiếu trạng thái.','Dừng publisher và đo thời gian đến cảnh báo robot1.'],
 'Observer gắn đúng tên cho từng callback. Cảnh báo xuất hiện sau ngưỡng, có thêm độ trễ đến chu kỳ check kế tiếp.',
 'Ngưỡng stale là 3s nhưng timer check mỗi 2s nên không hứa cảnh báo chính xác tại 3.000s. Không coi nội dung training_sample là một trạng thái an toàn hợp lệ.',[
 Q('Vì sao lambda có robot=robot?',['Giữ tên tương ứng ở lúc tạo callback','Đổi tên topic','Tăng QoS'],0,'Nó tránh lỗi late binding của biến vòng lặp.'),
 Q('Không thấy message có chứng minh robot đã va chạm không?',['Không','Có','Có nếu quá 3 giây'],0,'Thiếu dữ liệu là trạng thái không xác định, cần chẩn đoán nguồn.')],DOC+'Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html','Đây là bước tích hợp đầu tiên: thêm observer trong workspace học tập, không sửa controller dự án.');

L(15,4,'Viết service & client bất đồng bộ','Tách phép tính khỏi giao tiếp và tránh chặn executor.',120,
 ['Tạo service AddTwoInts có thể chạy','Viết client call_async có timeout','Đọc request và điền response'],[
 S('Tạo server học tập','Tạo rescue_learning/add_server.py. example_interfaces có AddTwoInts, đã khai báo ở bài 8. Ví dụ là phép cộng để tập trung vào vòng đời lời gọi; không biểu diễn API cứu hộ đã tồn tại.',`import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class AddServer(Node):
    def __init__(self):
        super().__init__('training_add_server')
        self.service = self.create_service(AddTwoInts, 'training_add', self.add)

    def add(self, request, response):
        response.sum = request.a + request.b
        return response

def main(args=None):
    rclpy.init(args=args)
    node = AddServer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == '__main__':
    main()`,'python'),
 S('Client ngắn có giới hạn chờ','Tạo rescue_learning/add_client.py. Đoạn này chờ ở luồng main, ngoài callback. Trong node có callback khác đang hoạt động, dùng future.add_done_callback để xử lý tiếp, tránh gọi spin_until_future_complete lồng vào callback một cách tùy tiện.',`import rclpy
from example_interfaces.srv import AddTwoInts

def main(args=None):
    rclpy.init(args=args)
    node = rclpy.create_node('training_add_client')
    try:
        client = node.create_client(AddTwoInts, 'training_add')
        if not client.wait_for_service(timeout_sec=3.0):
            node.get_logger().error('Service chưa sẵn sàng sau 3 giây')
            return
        request = AddTwoInts.Request()
        request.a, request.b = 7, 5
        future = client.call_async(request)
        rclpy.spin_until_future_complete(node, future, timeout_sec=3.0)
        if not future.done():
            future.cancel()
            node.get_logger().error('Hết thời gian chờ response')
        elif future.exception() is not None:
            node.get_logger().error(str(future.exception()))
        else:
            node.get_logger().info(f'Tổng = {future.result().sum}')
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == '__main__':
    main()`,'python'),
 S('Chạy thử cả trường hợp thiếu server','Thêm hai console_scripts: add_server và add_client trỏ đến module tương ứng. Build/source như bài 13. Chạy client trước khi server tồn tại để thấy lỗi có thời gian chờ. Sau đó bật server rồi gọi lại.',`ros2 run rescue_learning add_server
# Terminal B:
ros2 run rescue_learning add_client
ros2 service call /training_add example_interfaces/srv/AddTwoInts "{a: 7, b: 5}"`),
 S('Timeout phía client không hoàn tác server','Nếu client hết hạn chờ, server vẫn có thể đang xử lý. Với thao tác tạo nhiệm vụ hoặc ghi dữ liệu, thiết kế idempotency/request ID để tránh lặp side effect khi thử lại. Future.cancel không phải lệnh hủy tác vụ vật lý ở server.')],
 ['Chạy client khi thiếu server, ghi thời gian chờ.','Chạy server rồi client, xác nhận tổng 12.','Gọi bằng CLI với a=-3 và b=3.'],
 'Không có vòng chờ vô hạn; nhận tổng đúng ở trường hợp thường và số âm.',
 'Request có hai số nguyên. Test 7+5=12, -3+3=0. Nếu callback server quên return response, không thể coi đó là API trả kết quả đúng.',[
 Q('call_async trả ngay đối tượng gì?',['Future','Response chắc chắn hoàn tất','Topic'],0,'Future đại diện kết quả có thể hoàn tất sau.'),
 Q('Client timeout có chắc server đã dừng không?',['Không','Có','Chỉ khi gọi từ Python'],0,'Timeout chỉ giới hạn việc chờ phía client.')],DOC+'Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Service-And-Client.html','Khi thêm API giám sát/đổi chế độ trong tương lai, định nghĩa rõ thao tác ngắn và side effect trước khi chọn service.');

L(16,4,'Action server có feedback & cancel','Xây một tác vụ đếm bước để học vòng đời nhiệm vụ trước khi gắn chuyển động.',150,
 ['Dùng ActionServer với giao diện có sẵn','Xử lý cancel và terminal status','Phân biệt ví dụ đếm với điều khiển thật'],[
 S('Chuẩn bị Fibonacci','Dùng example_interfaces/action/Fibonacci để học cơ chế, đặt action tên training_count. Tạo rescue_learning/count_action.py. Các thao tác chờ chỉ dùng trong bài học này; executor nhiều luồng và callback group cho phép callback cancel được phục vụ khi execute đang chạy.'),
 S('Server hoàn chỉnh','Giới hạn order để không nhận yêu cầu vô hạn; hủy được chấp nhận qua CancelResponse. execute phải kiểm tra is_cancel_requested và gọi canceled/succeed/abort tương ứng. Khi shutdown, node cũng dừng; tác vụ này không điều khiển động cơ.',`import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, GoalResponse, CancelResponse
from rclpy.callback_groups import ReentrantCallbackGroup
from rclpy.executors import MultiThreadedExecutor
from example_interfaces.action import Fibonacci

class CountAction(Node):
    def __init__(self):
        super().__init__('training_count_server')
        self.server = ActionServer(
            self, Fibonacci, 'training_count', self.execute,
            goal_callback=self.accept,
            cancel_callback=lambda goal: CancelResponse.ACCEPT,
            callback_group=ReentrantCallbackGroup())

    def accept(self, request):
        return GoalResponse.ACCEPT if 1 <= request.order <= 30 else GoalResponse.REJECT

    def execute(self, goal):
        sequence = [0, 1]
        result = Fibonacci.Result()
        for _ in range(goal.request.order):
            if goal.is_cancel_requested:
                goal.canceled()
                result.sequence = sequence
                return result
            if not rclpy.ok():
                goal.abort()
                result.sequence = sequence
                return result
            sequence.append(sequence[-1] + sequence[-2])
            feedback = Fibonacci.Feedback()
            feedback.sequence = sequence
            goal.publish_feedback(feedback)
            time.sleep(0.5)
        goal.succeed()
        result.sequence = sequence
        return result

def main(args=None):
    rclpy.init(args=args)
    node = CountAction()
    executor = MultiThreadedExecutor(num_threads=4)
    executor.add_node(node)
    try:
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        executor.shutdown()
        node.server.destroy()
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == '__main__':
    main()`,'python'),
 S('Gửi goal và theo dõi','Thêm console_script count_action, build/source rồi chạy. Bài tập triển khai client cancel ở cuối dùng ActionClient: send_goal_async → nhận goal_handle → cancel_goal_async. Kiểm tra response và result status, không coi việc đóng terminal là hủy thành công.',`ros2 run rescue_learning count_action
# Terminal khác:
ros2 action send_goal /training_count example_interfaces/action/Fibonacci "{order: 8}" --feedback
ros2 action send_goal /training_count example_interfaces/action/Fibonacci "{order: 100}" --feedback`),
 S('Bước mở rộng có chủ ý','Server học tập chấp nhận nhiều goal và cho chúng chạy cùng lúc. Trước khi dùng cho nhiệm vụ robot, thêm chính sách chỉ một goal, preemption hoặc hàng đợi; bảo vệ dữ liệu dùng chung; hủy phải đưa robot về trạng thái dừng được xác nhận. Không dùng time.sleep trong callback điều khiển tốc độ cao.')],
 ['Xác nhận order 8 có feedback và SUCCEEDED.','Xác nhận order 100 bị reject.','Viết client ActionClient gửi order 20 rồi gọi cancel_goal_async sau khi được accepted.','Kiểm tra result trả trạng thái CANCELED, ghi độ trễ hủy.'],
 'Thấy ba nhánh khác nhau: goal thành công, goal bị từ chối, goal được hủy. Không chỉ kiểm tra chuỗi console.',
 'Đặt timer client một lần để gọi cancel_goal_async khi đã có goal_handle; hủy timer sau lần gọi đầu. Với server hiện tại, execute kiểm tra hủy mỗi 0.5s nên có độ trễ. Phần mở rộng client là bài tập, chưa phải API mission của dự án.',[
 Q('Chấp nhận cancel trong callback là đủ chưa?',['Chưa, execute phải xử lý yêu cầu và cập nhật trạng thái','Đủ, động cơ tự dừng','Chỉ cần đóng CLI'],0,'Hành vi hủy cần được viết rõ trong vòng thực thi.'),
 Q('Ví dụ Fibonacci có chứng minh robot cứu hộ di chuyển được không?',['Không','Có','Có khi order lớn'],0,'Nó chỉ kiểm tra cơ chế action.')],DOC+'Tutorials/Intermediate/Writing-an-Action-Server-Client/Py.html','Áp dụng sau này cho mission manager, với chính sách một nhiệm vụ đang hoạt động cho mỗi đội robot.');

L(17,5,'Tự định nghĩa msg, srv & action','Đặt hợp đồng dữ liệu rõ ràng thay cho các chuỗi tùy ý.',120,
 ['Tạo package interface bằng ament_cmake','Sinh mã message cho Python/C++','Hiểu dependency và version của schema'],[
 S('Khi nào cần message riêng?','String nhanh cho log nhưng khó xác thực cấu trúc. Ví dụ giám sát đội robot cần tên robot, timestamp và tuổi dữ liệu thì nên dùng message có field rõ. Không đổi interface của dự án ngay trong bài học; tạo training_interfaces trong workspace riêng.'),
 S('Tạo gói và định nghĩa','Tạo package ament_cmake rồi tạo msg/RobotHealth.msg. Dòng kiểu + tên mô tả dữ liệu. Giá trị phần trăm có thể dùng float32, nhưng cần quy định miền hợp lệ và cách biểu diễn unknown. Tệp dưới dùng data_fresh để phân biệt thiếu dữ liệu.',`cd ~/ros2_learning/ws/src
ros2 pkg create training_interfaces --build-type ament_cmake
mkdir -p training_interfaces/msg
# Tạo msg/RobotHealth.msg bằng editor:
# std_msgs/Header header
# string robot_name
# bool data_fresh
# float32 seconds_since_update`),
 S('CMakeLists.txt tối thiểu','Thay CMakeLists.txt của gói interface học tập bằng nội dung dưới. std_msgs/Header là phụ thuộc cần khai báo ở cả CMake lẫn package.xml.',`cmake_minimum_required(VERSION 3.8)
project(training_interfaces)
find_package(ament_cmake REQUIRED)
find_package(rosidl_default_generators REQUIRED)
find_package(std_msgs REQUIRED)
rosidl_generate_interfaces(\${PROJECT_NAME}
  "msg/RobotHealth.msg"
  DEPENDENCIES std_msgs
)
ament_export_dependencies(rosidl_default_runtime)
ament_package()`,'cmake'),
 S('package.xml và build','Bổ sung các thẻ bên dưới bên trong <package>; giữ buildtool_depend ament_cmake đã có. Sau build, source overlay rồi xem interface. Trong package Python sử dụng message, thêm dependency training_interfaces và import RobotHealth.',`<build_depend>rosidl_default_generators</build_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<depend>std_msgs</depend>
<member_of_group>rosidl_interface_packages</member_of_group>`,'xml'),
 S('Xác nhận hợp đồng','Dùng --packages-up-to khi cần build cả phụ thuộc trong workspace. Hai máy giao tiếp cần thống nhất schema, không chỉ cùng tên kiểu. Đổi schema có thể là thay đổi phá vỡ tương thích.',`cd ~/ros2_learning/ws
colcon build --packages-select training_interfaces
source install/setup.bash
ros2 interface show training_interfaces/msg/RobotHealth
python3 -c 'from training_interfaces.msg import RobotHealth; print(RobotHealth())'`)],
 ['Tạo RobotHealth và build.','Viết node phát dữ liệu health lấy từ thời điểm nhận thực tế trong bài 14.','Định nghĩa data_fresh=false lúc chưa nhận lần nào; không gán pin hay trạng thái an toàn giả.'],
 'interface show hiển thị field, Python import được message và người đọc hiểu cách biểu diễn dữ liệu chưa biết.',
 'seconds_since_update chỉ có nghĩa khi đã có dữ liệu; có thể quy ước -1.0 khi chưa từng nhận và ghi quy ước đó vào tài liệu. Header nên mô tả thời điểm tạo báo cáo, không giả làm thời điểm đo cảm biến.',[
 Q('Package interface ở bài này dùng build type nào?',['ament_cmake','ament_python','Không cần build'],0,'rosidl_generate_interfaces được cấu hình qua CMake.'),
 Q('Cùng tên message đã đủ để hai schema khác nhau tương thích chưa?',['Chưa','Đủ','Chỉ cần cùng topic'],0,'Các bên phải thống nhất định nghĩa dữ liệu.')],DOC+'Tutorials/Beginner-Client-Libraries/Custom-ROS2-Interfaces.html','Đề xuất mở rộng health schema; các topic String của dự án vẫn giữ nguyên trong nguồn tham chiếu.');

L(18,5,'Launch Python & cấu hình YAML','Khởi động bộ node học tập có cấu hình thay vì nhớ nhiều terminal.',120,
 ['Viết launch file và cài data_files','Truyền parameter qua YAML','Đọc launch dự án từ ngoài vào trong'],[
 S('Tạo launch học tập','Trong gói rescue_learning, tạo launch/learning.launch.py. Bài này chỉ chạy status_pub và safety_watch, không mở Gazebo. Dùng namespace /training cho ví dụ; observer vẫn đăng ký topic tuyệt đối của ba robot.',`from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(package='rescue_learning', executable='status_pub',
             namespace='training', output='screen'),
        Node(package='rescue_learning', executable='safety_watch',
             name='team_observer', output='screen'),
    ])`,'python'),
 S('Cài launch vào share','Thêm `from glob import glob` và `import os` ở đầu setup.py. Thêm tuple dưới vào danh sách data_files hiện có, giữ resource index và package.xml. Build/source rồi ros2 launch mới tìm được tệp đã cài.',`(os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),`,'python'),
 S('Parameter YAML','YAML cho parameter có tên node và ros__parameters. Đoạn dưới chỉ là cấu hình ví dụ cho node có parameter use_sim_time; muốn cấu hình biến riêng thì node phải declare_parameter và thực sự đọc nó. Tạo config/training.yaml và cài config vào share tương tự launch. Truyền đường dẫn bằng parameters=[config_path] trong Node.',`team_observer:
  ros__parameters:
    use_sim_time: false`,'yaml'),
 S('Đọc launch dự án theo tầng','run_simulation.sh chọn runner theo profile; runner gọi launch social_dynamic/social_static hoặc comparison; dstar_mpc.launch.py dựng coordinator, các robot controller, map_server và lifecycle manager. three_robot_sim.launch.py dựng mô hình, state publisher, bridge và kinematics. Launch gồm conditions và substitutions nên không coi mọi Node trong tệp đều được chạy trong mọi profile.',`cd ~/ros2_learning/ws
colcon build --symlink-install --packages-select rescue_learning
source install/setup.bash
ros2 launch rescue_learning learning.launch.py
# Xem argument dự án mà không mở mô phỏng:
ros2 launch social_navigation_sim dstar_mpc.launch.py --show-args`)],
 ['Chạy hai node học tập bằng một launch.','Kiểm tra node list và topic /training/training_status.','Vẽ sơ đồ tầng runner → launch → node cho dự án.'],
 'Launch học tập tìm được qua share; bạn phân biệt cấu hình khởi động với code thuật toán.',
 'Nếu launch không tìm được: kiểm tra glob, data_files, build và overlay. Lệnh --show-args xem cấu hình, không thay thế việc kiểm tra graph của phiên chạy thật.',[
 Q('Đặt tệp launch trong source đã đủ để ros2 launch tìm thấy chưa?',['Chưa, cần cài vào share rồi build/source','Đủ trong mọi trường hợp','Chỉ cần đổi tên node'],0,'Package phải cài dữ liệu launch đúng nơi.'),
 Q('Mọi Node viết trong launch có luôn chạy không?',['Không, có thể có condition','Có','Chỉ khi có output=screen'],0,'Cấu hình, điều kiện và event handler quyết định node thực sự chạy.')],DOC+'Tutorials/Intermediate/Launch/Launch-Main.html','Dùng sơ đồ launch để biết sửa sai tham số nằm ở runner, launch hay node; không dò toàn bộ thuật toán.');

L(19,5,'QoS, DDS & mạng nhiều robot','Giải thích tình huống có topic nhưng không nhận được message.',120,
 ['Hiểu reliable/best effort và durability','Chọn QoS phù hợp cảm biến','Chẩn đoán domain, mạng và QoS theo thứ tự'],[
 S('QoS là thỏa thuận truyền dữ liệu','Publisher đưa ra chất lượng, subscriber yêu cầu chất lượng. Hai bên chỉ kết nối khi các chính sách cần thiết tương thích. Reliable ưu tiên giao nhận có cơ chế thử lại; best effort chấp nhận mất mẫu. Depth giới hạn số mẫu trong hàng đợi Keep Last, không phải tần số phát.'),
 S('Hai cặp dễ nhầm','Publisher best effort không đáp ứng subscriber reliable. Publisher reliable có thể đáp ứng subscriber best effort. Durability transient local có thể giữ mẫu cho subscriber tham gia muộn khi các cấu hình tương thích và publisher còn hoạt động; volatile không yêu cầu lưu mẫu cũ. Thường chọn sensor profile cho scan/camera, và cân nhắc transient local cho bản đồ.'),
 S('Đọc QoS đang chạy','Đừng sửa mọi thứ sang reliable theo thói quen. Xem endpoint trước; CLI echo có thể cần chọn best effort để nhận scan. Công cụ hz cũng là subscriber nên kết quả phụ thuộc cấu hình và tải.',`ros2 topic info /robot1/scan -v
ros2 topic echo /robot1/scan --qos-reliability best_effort --once
ros2 topic info /map -v`),
 S('Subscriber dùng sensor profile','Đoạn trích dưới đặt trong __init__ của một Node, có callback on_scan do bạn định nghĩa. Sensor profile có đặc tính phù hợp dữ liệu mới liên tục. Không thay QoS trong controller dự án khi chưa xác nhận mismatch.',`from sensor_msgs.msg import LaserScan
from rclpy.qos import qos_profile_sensor_data

# Bên trong __init__ của Node:
self.scan_sub = self.create_subscription(
    LaserScan, '/robot1/scan', self.on_scan,
    qos_profile_sensor_data)`,'python'),
 S('Trình tự chẩn đoán mạng','1) Đúng source và tên topic? 2) Cùng ROS_DOMAIN_ID? 3) Cùng middleware/cấu hình discovery phù hợp? 4) Mạng và firewall có cho discovery/data? 5) QoS tương thích? Với nhiều máy, đồng bộ thời gian cũng quan trọng. ROS_DOMAIN_ID=31 không phải mật khẩu và không mã hóa dữ liệu.')],
 ['Ghi lại QoS của scan và map trong phiên dự án.','Thử echo scan best effort.','Giải thích bằng bảng bốn cặp reliable/best effort.'],
 'Bạn chỉ ra được cặp không tương thích và không nhầm mất mẫu với node dừng.',
 'Cặp duy nhất không tương thích trong ma trận reliability cơ bản là publisher best effort → subscriber reliable. Phải xét các policy khác như durability, không kết luận chỉ từ reliability.',[
 Q('Publisher best effort và subscriber reliable có tương thích không?',['Không','Có','Có nếu depth=1000'],0,'Publisher không đáp ứng yêu cầu reliable của subscriber.'),
 Q('Depth=10 có nghĩa gì?',['Số mẫu giữ trong Keep Last','10 Hz','10 robot'],0,'Độ sâu hàng đợi và tần số là hai khái niệm khác nhau.')],DOC+'Concepts/Intermediate/About-Quality-of-Service-Settings.html','Trong nguồn, scan controller dùng sensor QoS và map dùng cấu hình durability riêng; kiểm tra runtime bằng info -v.');

L(20,5,'rosbag, log & replay của dự án','Thu dữ liệu đủ ngữ cảnh và tìm nguyên nhân bằng đúng phiên chạy.',120,
 ['Ghi/phát rosbag có chọn topic','Phân biệt rosbag với JSONL replay dự án','Đọc tổng hợp lỗi trước khi mở log lớn'],[
 S('rosbag ghi message ROS','Chọn các topic phục vụ câu hỏi cần trả lời, tránh ghi toàn bộ camera khi không cần. Đây là công cụ độc lập với recorder JSONL của dự án. Tạo tên thư mục mới cho mỗi lần, dừng record bằng Ctrl+C. Không phát lại topic lệnh điều khiển vào phiên robot đang chạy.',`mkdir -p ~/ros2_learning/bags
cd ~/ros2_learning/bags
ros2 bag record -o training_01 /training_status
# Sau khi dừng record:
ros2 bag info training_01
ros2 bag play training_01`),
 S('Recorder tích hợp của dự án','Wrapper run_simulation.sh ghi mỗi lượt vào recordings khi bạn thực sự chạy wrapper. Nó không tự bắt mọi lệnh ros2 launch chạy bên ngoài. Các tệp gồm dữ liệu world, navigation, perception và tổng hợp chẩn đoán; replay viewer của dự án đọc định dạng này chứ không phải trực tiếp đọc rosbag.'),
 S('Xem lại một phiên đã có','Thay đường dẫn bằng thư mục thật do runner in ra trên máy mô phỏng. Offline viewer không cần build ROS chỉ để đọc dữ liệu đã ghi. Không có session trong repo thì chưa thể xem bằng một đường dẫn ví dụ.',`cd ~/three-robot-rescue
# Thay TEN_PHIEN_THAT bằng thư mục đã được ghi:
python3 scripts/view_replay.py --session recordings/TEN_PHIEN_THAT`),
 S('Đọc từ tổng hợp đến đoạn dữ liệu','Theo quy trình dự án: xem stop_analysis.json, goals.jsonl và diagnostics_config.json trước; sau đó chỉ lấy đoạn navigation.jsonl/world_frames.jsonl quanh thời điểm và robot đang điều tra. So khớp source hash và session. Tránh ghép contact của phiên A với pose phiên B rồi kết luận.'),
 S('Những kết luận cần phân biệt','Một video nhìn mượt không chứng minh không contact. Test số học qua không chứng minh Gazebo qua. Một lượt không contact không phải benchmark có lặp. Timestamp, tần số, loại dữ liệu thiếu và giới hạn quan sát cần đi cùng kết luận; tránh gán perception bằng ground truth của kịch bản.')],
 ['Ghi một rosbag của node học tập trong 10 giây, xem info rồi phát lại khi publisher đã dừng.','Với một session thật, tìm đúng ba tệp tổng hợp và mở viewer.','Viết nhận định 5 dòng nêu phiên, robot, thời điểm, bằng chứng và điều chưa biết.'],
 'Bạn biết hai hệ ghi dữ liệu khác nhau và mọi nhận định đều truy được về đúng phiên.',
 'Nếu chưa có bản ghi thật, chỉ làm rosbag học tập và ghi “chưa có dữ liệu dự án”. Không tạo số liệu mô phỏng để điền báo cáo.',[
 Q('Replay viewer dự án mặc nhiên đọc rosbag không?',['Không, nó đọc dữ liệu session riêng','Có, mọi định dạng đều giống nhau','Chỉ đọc /cmd_vel'],0,'Nguồn view_replay.py đọc scene.json và các JSONL của recorder.'),
 Q('Một test số học qua có chứng minh Gazebo không va chạm không?',['Không','Có','Có nếu tên test có safety'],0,'Các mức kiểm chứng khác nhau cần được báo cáo riêng.')],DOC+'Tutorials/Beginner-CLI-Tools/Recording-And-Playing-Back-Data/Recording-And-Playing-Back-Data.html','Đi theo quy trình tổng hợp trước, đoạn dữ liệu sau trong docs/FILE_CAN_DOC_VA_LENH_CHAY.md.');

L(21,6,'tf2: dữ liệu thuộc hệ tọa độ nào?','Đọc cây transform và tránh trộn tọa độ LiDAR, robot và bản đồ.',120,
 ['Hiểu map, odom, base_link và sensor frame','Dùng tf2_echo và view_frames','Phân biệt vị trí, hướng và timestamp'],[
 S('Một điểm có nhiều cách biểu diễn','Điểm cách LiDAR 1m phía trước không đồng nghĩa tọa độ x=1 trong map. Transform biểu diễn phép quay và tịnh tiến giữa hai frame tại một thời điểm. Quy ước robot phổ biến: x trước, y trái, z lên; yaw quay quanh z. Optical frame camera dùng quy ước riêng nên phải tra mô hình, không suy từ tên.'),
 S('Cây frame và ý nghĩa','map thường dùng cho vị trí toàn cục có thể được hiệu chỉnh; odom liên tục nhưng có thể trôi; base_link gắn với thân robot; sensor frame gắn cảm biến. Mỗi child frame cần một parent trong cây tại thời điểm xét. Hai node cùng phát cùng transform dễ gây nhảy dữ liệu. Đừng phát một transform tĩnh để che lỗi đo động.'),
 S('Thử transform tĩnh độc lập','Bài tập này dùng training_base và training_lidar để không đụng TF dự án. Dịch LiDAR 0.2m lên trước, 0.1m lên cao; quay bằng 0. Dừng bằng Ctrl+C sau thí nghiệm.',`ros2 run tf2_ros static_transform_publisher --x 0.2 --y 0 --z 0.1 --yaw 0 --pitch 0 --roll 0 --frame-id training_base --child-frame-id training_lidar
# Terminal khác:
ros2 run tf2_ros tf2_echo training_base training_lidar
ros2 run tf2_tools view_frames`),
 S('Time và quaternion','Transform lookup cần thời điểm phù hợp; lỗi extrapolation có thể do timestamp ngoài vùng buffer hoặc trộn sim time với wall time. Hướng trong Pose thường là quaternion x,y,z,w, không phải bốn góc. Quaternion đơn vị không quay là (0,0,0,1), phải chuẩn hóa nếu tự tính. Yaw theta cho robot phẳng: z=sin(theta/2), w=cos(theta/2).'),
 S('Đọc TF dự án','three_robot_sim.launch.py đặt namespace và frame_prefix theo robot_name. Frame thực tế nên lấy bằng view_frames và header.frame_id. Tránh tự dùng robot1/base_link trước khi xác nhận tên; macro Xacro có thể thêm tên link riêng. Coordinator có nguồn pose từ /gazebo/world_poses; cần phân biệt pose mô phỏng đo được với ước lượng odometry.')],
 ['Tạo cặp frame training và xem tf2_echo.','Lưu cây frame của một phiên dự án bằng view_frames.','Chọn một LaserScan và truy vết transform từ frame cảm biến về map.'],
 'Bạn giải thích được phép dịch 0.2m,0,0.1m và chỉ ra nguyên nhân thường gặp của lookup/extrapolation error.',
 'Đừng dùng timestamp mới nhất để thay cho thời điểm scan nếu robot đang chuyển động. Xác nhận use_sim_time và /clock ở các node có dữ liệu thời gian.',[
 Q('Quaternion không quay là gì?',['x=0,y=0,z=0,w=1','x=0,y=0,z=0,w=0','x=1,y=1,z=1,w=1'],0,'Quaternion phải có chuẩn 1.'),
 Q('Cùng một điểm, tọa độ đổi khi đổi frame không?',['Có thể đổi','Không bao giờ','Chỉ khi đổi topic'],0,'Tọa độ là cách biểu diễn tương đối với frame.')],DOC+'Tutorials/Intermediate/Tf2/Tf2-Main.html','Đọc frame_prefix trong three_robot_sim.launch.py rồi xác nhận cây thực bằng CLI.');

L(22,6,'URDF & Xacro: mô tả robot','Phân biệt hình nhìn thấy, hình va chạm và động lực học.',120,
 ['Đọc link, joint, visual, collision và inertial','Hiểu macro và tham số Xacro','Tìm mô hình ba bánh omni trong dự án'],[
 S('URDF là cây link–joint','Link biểu diễn phần cứng cứng; joint nối các link và mô tả chuyển động tương đối. visual dành cho hiển thị, collision dành cho va chạm, inertial chứa khối lượng và tensor quán tính. Robot đẹp trong RViz chưa đủ điều kiện mô phỏng vật lý đúng. Joint fixed không chuyển động, continuous quay không chặn góc, revolute có giới hạn.'),
 S('Mô hình nhỏ để đọc XML','Tạo ~/ros2_learning/box.urdf. Đây chỉ là mô hình quan sát, chưa có collision/inertial để thử động lực học. origin của phần visual khác origin của joint.',`<?xml version="1.0"?>
<robot name="training_box">
  <link name="training_base">
    <visual>
      <geometry><box size="0.3 0.2 0.1"/></geometry>
      <material name="green"><color rgba="0.2 0.5 0.3 1"/></material>
    </visual>
  </link>
</robot>`,'xml'),
 S('Xacro giảm lặp','Xacro mở rộng macro và biến thành URDF. Trong dự án, main.urdf.xacro gồm các tệp base_link, omni_wheel, roller, lidar, camera và ros2_control. Đọc từ main, không bắt đầu từ mesh. Tên robot_prefix ảnh hưởng topic/plugin trong macro; frame_prefix của robot_state_publisher là cấu hình khác.',`cd ~/three-robot-rescue
source /opt/ros/humble/setup.bash
xacro social_navigation_sim/urdf/3w_v2_multi/main.urdf.xacro robot_prefix:=robot1 > /tmp/robot1_learning.urdf
head -n 25 /tmp/robot1_learning.urdf`),
 S('Joint states tạo TF như thế nào?','robot_state_publisher đọc URDF và joint_states để phát transform của các link. Joint fixed có transform cố định; joint động cần trạng thái. Trong mô phỏng, joint_state_broadcaster thường phát joint_states từ controller manager. Nếu bánh đứng yên trong RViz, kiểm tra nguồn joint_states và tên joint trước khi sửa visual.'),
 S('Bài tập đọc mô hình thực','Tìm thông số bánh và vị trí lắp trong omni_wheel.urdf.xacro; ghi đơn vị mét/radian và đường dẫn mesh. Không thay khối lượng, collision hay ma sát trong dự án để làm bài này. Nếu thử chỉnh, dùng bản sao học tập và so sánh mô hình trước/sau.')],
 ['Vẽ cây link–joint tối thiểu cho robot omni.','Mở main.urdf.xacro và theo đường include đến LiDAR.','Xuất URDF học tập vào /tmp, xác nhận không còn macro xacro.'],
 'Bạn chỉ được tệp chính, tệp cảm biến và chỗ khai báo collision khác visual.',
 'File Xacro chứa macro nên cần mở rộng trước khi một công cụ chỉ hiểu URDF đọc nó. Nếu thiếu package asset, source install/setup.bash của dự án đã build.',[
 Q('visual và collision có luôn giống nhau không?',['Không, phục vụ hai mục đích khác nhau','Có, phải cùng mesh','Collision chỉ là màu'],0,'Collision thường dùng hình đơn giản hơn để tính toán.'),
 Q('robot_state_publisher cần gì để cập nhật joint động?',['joint_states phù hợp','Chỉ tên package','Một ảnh robot'],0,'Trạng thái joint kết hợp mô hình tạo transform.')],DOC+'Tutorials/Intermediate/URDF/URDF-Main.html','Đường vào mô hình: social_navigation_sim/urdf/3w_v2_multi/main.urdf.xacro.');

L(23,6,'RViz, LiDAR & camera','Nhìn dữ liệu một cách có căn cứ thay vì chỉ nhìn ảnh mô phỏng.',120,
 ['Phân biệt RViz với Gazebo','Đọc LaserScan và lọc giá trị không hợp lệ','Hiểu perception khác ground truth'],[
 S('Hai GUI phục vụ hai việc','Gazebo mô phỏng thế giới và vật lý. RViz hiển thị dữ liệu ROS: map, robot model, TF, scan, path và marker. RViz không tự tính vật lý. Fixed Frame phải nối được với frame dữ liệu. Dữ liệu không hiện thường do TF, QoS, timestamp, display chưa bật hoặc topic chọn sai.'),
 S('Đọc LaserScan','LaserScan chứa range_min, range_max, angle_min, angle_increment và ranges. Tia i có góc angle_min+i×angle_increment. Điểm trên mặt phẳng sensor: x=r cos(theta), y=r sin(theta). Loại NaN, infinity và khoảng ngoài miền hợp lệ. Tầm 2m trong dự án là giới hạn quan sát, không có nghĩa vùng ngoài 2m chắc chắn trống.',`import math

def valid_points(scan):
    points = []
    for index, distance in enumerate(scan.ranges):
        if not math.isfinite(distance):
            continue
        if not scan.range_min <= distance <= scan.range_max:
            continue
        angle = scan.angle_min + index * scan.angle_increment
        points.append((distance * math.cos(angle), distance * math.sin(angle)))
    return points`,'python'),
 S('Camera cần calibration và đồng bộ','Ảnh màu không tự cung cấp tọa độ mét. Muốn suy vị trí cần camera_info/intrinsics, depth hoặc phương pháp ước lượng phù hợp cùng transform. Dữ liệu ảnh, depth và TF lệch thời gian có thể làm người xuất hiện sai vị trí. Xem topic trước khi mở rqt_image_view; tên camera phụ thuộc profile.',`ros2 topic list -t
ros2 run rqt_image_view rqt_image_view
ros2 topic echo /robot1/scan --qos-reliability best_effort --once`),
 S('Marker không phải bằng chứng perception','Một marker do kịch bản dựng sẵn không chứng minh camera nhận ra người. Pose ground truth của Gazebo hữu ích để đánh giá nhưng phải tách khỏi đầu vào thuật toán nếu muốn đo perception thật. Trong báo cáo, ghi rõ nguồn dữ liệu, ngưỡng, tỉ lệ bỏ sót và điều kiện ánh sáng/che khuất.'),
 S('Đọc lỗi vùng xã hội','Vùng TV mất có thể do gate, tuổi dữ liệu, viewer pose hay chính sách expiry; chỉ nhìn camera vẫn có frame không đủ kết luận. Theo dõi timestamp từng nguồn và đúng session. Nhật ký dự án ghi các ca còn mở, không nên diễn giải chúng như tính năng đã được xác nhận hoàn tất.')],
 ['Trong RViz, kiểm tra Fixed Frame, TF, RobotModel, LaserScan và Path.','Ghi range_max từ message thực.','Viết ba giới hạn của việc chỉ dùng LiDAR tầm ngắn để né người động.'],
 'Bạn giải thích được một display đỏ, xử lý được range không hữu hạn và phân biệt dữ liệu đo với marker kịch bản.',
 'Ba giới hạn tiêu biểu: vùng mù/che khuất, không biết chắc chuyển động ngoài tầm, ước lượng vận tốc cần nhiều mẫu và timestamp. Không suy hành vi xã hội từ một vị trí tĩnh.',[
 Q('Infinity trong ranges có nên thành điểm vật cản vô hạn không?',['Không, cần lọc theo quy ước dữ liệu','Có','Đổi thành 0 luôn đúng'],0,'Loại dữ liệu không hợp lệ và xét range_min/max.'),
 Q('Marker người xuất hiện có chứng minh camera phát hiện người không?',['Không','Có','Có nếu màu đỏ'],0,'Marker có thể do scenario hoặc ground truth phát.')],DOC+'Tutorials/Intermediate/RViz/RViz-Main.html','Dự án có LiDAR, RGB-D và các lớp vùng xã hội; phân biệt perception, world pose và marker để đánh giá đúng.');

L(24,6,'Gazebo Fortress & chạy dự án','Build đúng hai package và chạy một phiên có ghi dữ liệu.',150,
 ['Cài integration Humble–Fortress','Hiểu bridge và đồng hồ mô phỏng','Dùng wrapper ghi mỗi lượt của dự án'],[
 S('Chọn đúng họ Gazebo','Giáo trình dùng Gazebo Fortress (Ignition Gazebo 6) phù hợp dự án Humble. Không trộn hướng dẫn Gazebo Classic gazebo11 hoặc Jazzy/Harmonic vào cùng bộ lệnh. Gói ros-humble-ros-gz cung cấp tích hợp; dự án còn phụ thuộc plugin Gazebo và các package khai báo trong manifest.',`sudo apt install ros-humble-ros-gz ros-humble-ros2-control ros-humble-ros2-controllers
source /opt/ros/humble/setup.bash
ign gazebo --help`),
 S('Lấy nguồn và phụ thuộc','Chỉ clone lần đầu nếu chưa có repo; nếu đã có, dùng thư mục hiện tại và tránh ghi đè thay đổi cá nhân. Không tự git pull khi chưa biết trạng thái làm việc. Các lệnh dưới dành cho Ubuntu, không chạy trong terminal mô phỏng của website.',`cd ~
git clone https://github.com/duc2605/three-robot-rescue.git
cd ~/three-robot-rescue
source /opt/ros/humble/setup.bash
rosdep install --from-paths social_navigation_planner social_navigation_sim --ignore-src -r -y`),
 S('Một phiên động có ghi và viewer','Khối này độc lập sau khi đã cài dependencies và clone repo. Nó build hai package, source overlay, chọn domain, tạo thư mục ghi mới rồi chạy profile động mặc định. Dừng bằng Ctrl+C, chờ các tiến trình kết thúc; dòng cuối mở viewer của đúng phiên trong cùng terminal. Website chỉ cung cấp lệnh, không chạy mô phỏng trên máy bạn.',`cd ~/three-robot-rescue
source /opt/ros/humble/setup.bash
colcon build --symlink-install --base-paths social_navigation_planner social_navigation_sim --packages-select social_navigation_planner social_navigation_sim --cmake-args -DBUILD_TESTING=OFF
source install/setup.bash
export ROS_DOMAIN_ID=31
recording_dir="recordings/learning_dynamic_$(date +%Y%m%d_%H%M%S_%N)"
bash scripts/run_simulation.sh dynamic --diagnose-stop "$recording_dir"
# Sau Ctrl+C và khi runner đã kết thúc:
python3 scripts/view_replay.py --session "$recording_dir"`),
 S('Bridge và /clock','Gazebo transport và ROS là hai hệ message khác nhau; ros_gz_bridge chuyển kiểu được hỗ trợ. Kiểm tra tên topic, chiều bridge và type mapping trong config/gz_bridge. Node dùng use_sim_time=true đọc /clock; khi pause mô phỏng, sim time ngừng. Không thay timestamp bằng wall time để che lỗi bridge.'),
 S('Giới hạn kiểm chứng','BUILD_TESTING=OFF chỉ bỏ phần tìm test/lint khi build, không có nghĩa test đã qua. Tác vụ soạn giáo trình này không build/chạy Gazebo của dự án. Khi dùng lệnh, bạn cần giữ log đầu ra, phiên bản source và dữ liệu session để đánh giá; launch thành công không chứng minh ba robot né người ổn.')],
 ['Kiểm tra đã dùng Ubuntu22.04/Humble/Fortress.','Tự chạy đúng một phiên wrapper và lưu đường dẫn nó in ra.','Quan sát /clock và graph bằng terminal thứ hai cùng domain.','Sau dừng, mở viewer đúng session.'],
 'Bạn có một session mới hoặc một log lỗi cụ thể để chẩn đoán, không dùng lại thư mục ghi cũ.',
 'Nếu build lỗi, lấy đoạn lỗi đầu tiên và manifest của package lỗi; nếu thiếu plugin, xem CMake/package.xml. Nếu GUI đen trên WSL, kiểm tra GPU/GL trước khi sửa thuật toán. Chỉ mở một phiên mô phỏng.',[
 Q('use_sim_time=true lấy thời gian từ đâu?',['/clock','Đồng hồ điện thoại','Tên recording'],0,'Node ROS dùng nguồn clock mô phỏng khi cấu hình như vậy.'),
 Q('BUILD_TESTING=OFF có nghĩa test đã thành công không?',['Không','Có','Chỉ test Python'],0,'Nó là cấu hình build, không phải kết quả kiểm thử.')],REPO+'/blob/'+PROJECT_COMMIT+'/README.md','Chạy qua scripts/run_simulation.sh để giữ cơ chế ghi mỗi lượt đã có trong dự án.');

L(25,7,'Omni kinematics & odometry','Hiểu robot ba bánh của bạn thay vì áp công thức robot hai bánh.',150,
 ['Phân biệt holonomic với differential drive','Đọc Twist có vx, vy và omega','Giải thích odometry trôi và ground truth'],[
 S('Robot của bạn là ba bánh omni','Nguồn mô phỏng có omni_kinematics.cpp và mô hình 3w_v2_multi. Robot omni có thể có vận tốc ngang vy; không nên thay bằng công thức differential-drive chỉ có tiến và quay. Twist linear.x/linear.y/angular.z được đổi thành tốc độ bánh theo bán kính, vị trí và hướng lắp bánh thực tế.'),
 S('Từ vận tốc thân sang thế giới','Nếu vận tốc v_body=(vx,vy) trong frame thân, với yaw theta: x_dot=cos(theta)vx−sin(theta)vy; y_dot=sin(theta)vx+cos(theta)vy; theta_dot=omega. Tích phân Euler dùng dt đủ nhỏ chỉ là xấp xỉ. Trước khi áp dụng, kiểm tra source xem cmd_vel đang được hiểu trong frame nào.',`import math

def integrate_pose(x, y, yaw, vx, vy, omega, dt):
    if dt <= 0.0:
        raise ValueError('dt phải dương')
    world_vx = math.cos(yaw) * vx - math.sin(yaw) * vy
    world_vy = math.sin(yaw) * vx + math.cos(yaw) * vy
    return x + world_vx * dt, y + world_vy * dt, yaw + omega * dt

x, y, yaw = integrate_pose(0, 0, math.pi/2, 1, 0, 0, 1)
assert abs(x) < 1e-9 and abs(y - 1.0) < 1e-9`,'python'),
 S('Odometry không phải chân lý tuyệt đối','Odometry ước lượng pose từ chuyển động, encoder/IMU và mô hình nên có thể trôi do trượt hoặc sai tham số. Trong dự án, coordinator cũng đăng ký pose đo từ Gazebo. Không gọi một hệ dùng ground truth là định vị tự chủ đã kiểm chứng. Khi so odom với world pose, đưa về cùng frame và timestamp.'),
 S('Đọc C++ theo luồng','Mở omni_kinematics.cpp, tìm subscription Twist → tính tốc độ bánh → publisher command, và callback joint_states/odom. Ghi lại radius và khoảng cách tâm nếu có khai báo; không đo bằng mắt từ mesh. Đổi dấu bánh sai có thể làm robot chuyển động khác hướng dù planner đúng.',`cd ~/three-robot-rescue
grep -nE 'cmd_vel|create_subscription|create_publisher|radius|wheel' social_navigation_sim/src/omni_kinematics.cpp | head -n 45
# Khi mô phỏng đã chạy:
ros2 topic info /robot1/cmd_vel -v
ros2 topic echo /robot1/odom --once`)],
 ['Chạy hàm tích phân độc lập với yaw=0 và yaw=pi/2.','Lập bảng luồng Twist → wheel command → joint state → odom theo source.','Chỉ ra vị trí có thể phát sinh sai dấu hoặc sai đơn vị.'],
 'Bạn chứng minh được tiến 1m theo thân tại yaw=pi/2 làm tăng y thế giới khoảng 1m và giải thích được vận tốc ngang.',
 'Ví dụ tích phân có dt=1 chỉ dùng phép thử hướng khi omega=0, không dùng làm controller. Muốn đánh giá odometry cần dữ liệu đồng bộ và sai số theo thời gian.',[
 Q('Với robot omni, linear.y có thể dùng không?',['Có, tùy mô hình động học','Không bao giờ','Là góc yaw'],0,'Robot holonomic có thể có chuyển động ngang.'),
 Q('Ground truth Gazebo có tương đương định vị từ cảm biến không?',['Không','Có','Có nếu cùng topic odom'],0,'Nguồn và mức độc lập của phép đo khác nhau.')],REPO+'/blob/'+PROJECT_COMMIT+'/social_navigation_sim/src/omni_kinematics.cpp','Mô hình ba bánh omni là chi tiết quan trọng để đọc lệnh vx, vy, wz trong controller của dự án.');

L(26,7,'Bản đồ, SLAM & vùng xã hội','Tách bản đồ vật lý, lớp tránh xã hội và bài toán tự xây bản đồ.',150,
 ['Đọc OccupancyGrid và map YAML','Phân biệt SLAM, localization và map tĩnh','Hiểu remapping planning_map trong dự án'],[
 S('OccupancyGrid biểu diễn gì?','Bản đồ lưới có resolution (m/cell), width/height, origin và data. Thường -1 là chưa biết, 0 trống, 100 chiếm dụng. Không coi unknown là free theo mặc định. Chuyển từ tọa độ thế giới sang ô phải xét origin và rotation; chia x cho resolution đơn thuần chỉ đúng với các giả định cụ thể.'),
 S('Ba bài toán khác nhau','Map server tải bản đồ có sẵn. Localization ước lượng pose trên bản đồ đã có. SLAM vừa ước lượng pose vừa xây/cập nhật map từ cảm biến. Dự án có map tĩnh và nguồn Gazebo pose; không vì thấy bản đồ trong RViz mà kết luận hệ đang SLAM.'),
 S('Lớp xã hội không phải vật cản vật lý','Trong dstar_mpc.launch.py, /map của coordinator được remap sang planning_map_topic còn /physical_map được remap về /map vật lý. Giới hạn xã hội và vật lý có ý nghĩa khác nhau. Goal có thể bị planning keepout chặn dù vùng đó không có tường. Khi debug cần xem đúng lớp, inflation và footprint.'),
 S('SLAM là nhánh mở rộng độc lập','Có thể luyện slam_toolbox trên một cấu hình một robot đã cung cấp scan và TF odom → base → laser đúng. Cần tránh xung đột với map_server/TF của dự án hiện tại. Lệnh sau không phải profile chạy sẵn của three-robot-rescue; chỉ dùng trong workspace thí nghiệm đã chuẩn bị.',`sudo apt install ros-humble-slam-toolbox
# Chỉ khi nguồn scan + TF của thí nghiệm SLAM đã sẵn sàng:
ros2 launch slam_toolbox online_async_launch.py use_sim_time:=true
# Trong terminal khác, sau khi đã chạy map_saver phù hợp:
# ros2 run nav2_map_server map_saver_cli -f ~/ros2_learning/learning_map`),
 S('Bài tập ưu tiên trong dự án','Đọc giá trị planning_map_topic của launch, dùng topic info để xác nhận hai bản đồ. Đặt bài toán chẩn đoán: goal bị chặn bởi tường hay vùng xã hội? Dùng tổng hợp và replay đúng phiên để tìm bằng chứng. Không tắt social avoidance chỉ để làm đồ thị đẹp.')],
 ['Đọc YAML bản đồ trong social_navigation_sim/map.','Ghi resolution, origin, frame và tên topic map vật lý/planning.','Vẽ sơ đồ remapping từ launch vào subscription của coordinator.'],
 'Bạn giải thích được vì sao map vật lý thông thoáng nhưng đường đi vẫn bị từ chối; phân biệt SLAM với tải map.',
 'So sánh footprint/inflation với lớp planning, không chỉ xem tâm robot. Nhánh SLAM cần cấu hình riêng để không có hai nguồn map → odom hoặc hai map server.',[
 Q('Thấy bản đồ có chứng minh đang SLAM không?',['Không','Có','Có nếu dùng RViz'],0,'Bản đồ có thể được tải từ YAML có sẵn.'),
 Q('Trong OccupancyGrid, giá trị -1 thường là gì?',['Chưa biết','Trống chắc chắn','Đích cứu hộ'],0,'Unknown cần chính sách xử lý rõ trong planner.')],REPO+'/blob/'+PROJECT_COMMIT+'/social_navigation_sim/launch/dstar_mpc.launch.py','Đây là bài quan trọng cho lỗi goal bị planning keepout chặn: đọc remapping map trước khi kết luận MPC kẹt.');

L(27,7,'D* Lite, MPC & đội hình ba robot','Tách lập đường, bám đường và an toàn động trong kiến trúc dự án.',180,
 ['Mô tả vai trò D* Lite và mỗi MPC','Theo reference đến cmd_vel','So sánh kiến trúc dự án với Nav2'],[
 S('Ba tầng nhìn từ dữ liệu','Coordinator nhận map, goal, trạng thái đội và cảm biến để tạo đường/đội hình tham chiếu. Các bộ điều khiển robot1/2/3 nhận /formation/reference, trạng thái đội, scan và prediction của đồng đội; sau đó phát cmd_vel cùng safety_status. Đường tồn tại không đảm bảo mọi lệnh điều khiển đều khả thi.'),
 S('Ý tưởng D* Lite và MPC','D* Lite tái sử dụng thông tin tìm kiếm khi chi phí lưới thay đổi để sửa đường đi. MPC dự đoán chuyển động trong một horizon, đánh giá ứng viên theo mục tiêu/ràng buộc và thực thi một bước trước khi giải lại. Tên MPC không tự xác định solver hoặc đảm bảo tối ưu toàn cục; cần đọc triển khai. Chi phí tracking, khoảng hở, vận tốc/gia tốc và hành vi đồng đội có thể xung đột.'),
 S('Luồng topic cần nhớ','Bảng này mô tả nguồn hiện tại, không phải ảnh chụp graph đang chạy. Leader mặc định trong launch là robot3 nhưng có thể thay bằng argument.', '', 'bash',{table:{headers:['Luồng','Kiểu','Vai trò'],rows:[['/goal_pose','PoseStamped','Đích vào coordinator'],['/dstar_lite/path','Path','Đường toàn cục'],['/formation/reference','PoseArray','Tham chiếu đội hình'],['/robotN/scan','LaserScan','Quan sát từng robot'],['/robotN/mpc_prediction','PoseArray','Dự báo trao đổi giữa các bộ điều khiển'],['/robotN/cmd_vel','Twist','Lệnh vận tốc ra'],['/robotN/safety_status','String','Trạng thái chẩn đoán an toàn']]}}),
 S('Nav2 nằm ở đâu?','Dự án dùng nav2_map_server và nav2_lifecycle_manager trong launch. Điều này không đồng nghĩa đang dùng trọn pipeline BT Navigator/PlannerServer/ControllerServer của Nav2: nguồn baseline chạy coordinator D* Lite và các MPC riêng. Học Nav2 là nhánh mở rộng hữu ích, nhưng không chạy một controller Nav2 cùng phát cmd_vel vào phiên baseline.'),
 S('Phân tích một ca dừng','Đi từ goal hợp lệ? → bản đồ/tham chiếu mới? → pose/scan còn mới? → trạng thái safety? → có ứng viên khả thi? → lệnh cmd_vel có được nhận? Nếu reference rỗng hoặc lỗi clearance, tăng tốc độ MPC không sửa đúng nguyên nhân. Nếu LiDAR cũ, không gỡ watchdog để buộc robot đi.',`# Các lệnh quan sát trong phiên đang chạy, không tạo goal mới:
ros2 topic info /formation/reference -v
ros2 topic echo /robot1/safety_status --once
ros2 topic info /robot1/cmd_vel -v
ros2 node info /three_robot_dstar_mpc`)],
 ['Vẽ luồng của robot1 từ reference đến wheel controller.','Dùng nguồn xác định publisher/subscriber của mpc_prediction.','Chọn một session dừng và đặt giả thuyết có thể bác bỏ bằng log.'],
 'Bạn không gộp planner, controller, perception và kinematics thành một khối “ROS bị lỗi”.',
 'Lập bảng giả thuyết–bằng chứng–phép kiểm tra. Ví dụ “scan cũ” cần timestamp và watchdog của đúng robot/phiên; “không tìm đường” cần map/clearance/reference, không chỉ nhìn vận tốc bằng 0.',[
 Q('Có đường Path đã chứng minh controller tìm được lệnh an toàn chưa?',['Chưa','Đã chứng minh','Chỉ khi Path màu xanh'],0,'Ràng buộc động và cảm biến có thể làm mọi lệnh ứng viên bị loại.'),
 Q('Dự án dùng map_server của Nav2 có nghĩa chạy toàn bộ Nav2 không?',['Không','Có','Có nếu leader=robot3'],0,'Cần đọc các node cụ thể trong launch và graph.')],REPO+'/blob/'+PROJECT_COMMIT+'/social_navigation_planner/social_navigation_planner/dstar_mpc_controller.py','Bài nâng cao bám baseline thật; các paper1–12 là nhánh đối chiếu cần giữ riêng và đánh giá theo cùng điều kiện.');

L(28,7,'ros2_control: từ Twist đến bánh xe','Theo dõi controller manager, joint state và giao diện phần cứng.',120,
 ['Phân biệt planner controller với joint controller','Đọc state/command interface','Tra controller manager của từng robot'],[
 S('Hai loại controller dễ nhầm','MPC controller quyết định vận tốc thân. ros2_control controller điều khiển các joint qua interface phần cứng. Kinematics nối hai tầng bằng cách đổi Twist thành lệnh bánh. Controller manager quản lý lifecycle, resource và vòng read–update–write; nó không tự lập kế hoạch tránh người.'),
 S('Trong dự án','three_robot_sim.launch.py tạo controller spawner dưới từng namespace, chọn /robotN/controller_manager và tải joint_state_broadcaster cùng wheel1_controller, wheel2_controller, wheel3_controller. Xacro ros2_control.urdf.xacro và YAML three_robot_controllers.yaml mô tả cấu hình. Cần đúng joint name và interface cho từng controller.'),
 S('Quan sát thay vì spawn trùng','Khi mô phỏng đã chạy, dùng list_controllers và list_hardware_interfaces. Không chạy thêm spawner nếu launch đã tải controller. -c chọn đúng manager; robot1 và robot2 có thể khác trạng thái.',`ros2 control list_controllers -c /robot1/controller_manager
ros2 control list_hardware_interfaces -c /robot1/controller_manager
ros2 control list_controllers -c /robot2/controller_manager
ros2 topic info /robot1/joint_states -v`),
 S('Chuỗi chẩn đoán','Có cmd_vel nhưng bánh không quay: kiểm tra kinematics có nhận không → topic command bánh có publisher không → controller active không → command interface claimed đúng không → plugin phần cứng/mô phỏng có load không. Bánh quay mà robot lệch hướng: kiểm dấu, bán kính, frame và bố trí bánh. Không chỉnh planner khi lỗi ở tầng chấp hành.'),
 S('Giới hạn khi chuyển robot thật','Plugin mô phỏng khác driver thật. Robot thật cần read/write phần cứng, chu kỳ ổn định, giới hạn và cơ chế dừng vật lý độc lập. Website học tập không phải bảng điều khiển motor và không kết nối trực tiếp ROS. Chuyển phần cứng là một dự án tích hợp riêng cần xác nhận từng tầng.')],
 ['Đọc tên 4 controller cho mỗi robot từ launch/YAML.','Liệt kê trạng thái controller và interface của robot1 khi có phiên mô phỏng.','Vẽ chuỗi 6 bước từ mục tiêu tới bánh xe.'],
 'Bạn định vị được lỗi thuộc planner, kinematics, ros2_control hay plugin vật lý.',
 'Trạng thái inactive không tương đương driver bị hỏng. Kiểm manager đúng namespace trước; list_hardware_interfaces cho biết interface sẵn có/đang được claim.',[
 Q('MPC và wheel controller có cùng nhiệm vụ không?',['Không','Có','Chỉ khác tên'],0,'MPC tạo lệnh thân; joint controller làm việc với bánh/interface.'),
 Q('Vì sao dùng -c /robot1/controller_manager?',['Chọn manager đúng robot','Đổi tần số LiDAR','Đặt goal'],0,'Đội nhiều robot có controller manager riêng theo namespace.')], 'https://control.ros.org/humble/doc/getting_started/getting_started.html','Tệp cấu hình: social_navigation_sim/config/controller_configs/three_robot_controllers.yaml.');

L(29,8,'C++, CMake & composition','Đọc node C++ trong dự án và biết khi nào cần tách hay gộp process.',150,
 ['Tạo executable rclcpp tối thiểu','Hiểu CMake install và dependencies','Đánh giá tradeoff của composition'],[
 S('C++ bổ sung cho Python','Dự án dùng Python cho planner và C++ cho kinematics/plugin mô phỏng. Chọn ngôn ngữ theo tải và thư viện; không tự kết luận mọi đoạn Python chậm cần viết lại. Trước khi tối ưu, đo callback duration, CPU và tần số ở cùng điều kiện.'),
 S('Node C++ tối thiểu','Tạo package training_cpp trong ~/ros2_learning/ws/src bằng ros2 pkg create --build-type ament_cmake training_cpp --dependencies rclcpp. Tạo src/hello.cpp. RAII/shared_ptr quản lý lifetime; executor phục vụ callbacks khi spin.',`#include <memory>
#include "rclcpp/rclcpp.hpp"

int main(int argc, char ** argv) {
  rclcpp::init(argc, argv);
  auto node = std::make_shared<rclcpp::Node>("training_cpp_hello");
  RCLCPP_INFO(node->get_logger(), "Hello from the rescue learning workspace");
  rclcpp::spin(node);
  rclcpp::shutdown();
  return 0;
}`,'cpp'),
 S('CMake để cài executable','Thêm trước ament_package() trong CMakeLists.txt, giữ find_package(ament_cmake REQUIRED) và find_package(rclcpp REQUIRED). Sau đó colcon build --packages-select training_cpp, source overlay và ros2 run training_cpp hello.',`add_executable(hello src/hello.cpp)
ament_target_dependencies(hello rclcpp)
install(TARGETS hello DESTINATION lib/\${PROJECT_NAME})`,'cmake'),
 S('Đọc CMake dự án','social_navigation_sim xây executable kinematics từ src/omni_kinematics.cpp, đồng thời xây shared library social_scenario_motion và replay_recorder cho Gazebo. Executable ROS và plugin Gazebo có cơ chế tải khác nhau. Tìm install(TARGETS...) để biết đầu ra được cài ở đâu.'),
 S('Composition là lựa chọn kiến trúc','Nhiều component trong một process có thể giảm overhead và cho phép intra-process khi cấu hình phù hợp; đổi lại một process lỗi có thể ảnh hưởng nhiều node và cần quan tâm thread safety. Node chạy riêng có cô lập tốt hơn. Chỉ sử dụng ros2 component load khi node đã được viết/đăng ký như component; executable thông thường không tự thành component.')],
 ['Build và chạy training_cpp/hello.','Tìm executable và hai shared library trong CMake dự án.','Đề xuất một nơi cần đo trước khi cân nhắc composition.'],
 'Bạn hiểu vì sao kinematics chạy qua ros2 run còn plugin Gazebo được simulator nạp.',
 'So compiler error đầu tiên với dòng find_package/ament_target_dependencies; đừng chỉ nhìn lỗi cuối make. Chưa chạy đo thì ghi đề xuất, không báo đã tối ưu hiệu năng.',[
 Q('Mọi executable có thể ros2 component load ngay không?',['Không','Có','Chỉ cần đổi tên'],0,'Cần component interface và registration phù hợp.'),
 Q('Gộp nhiều node vào một process có tradeoff gì?',['Giảm cô lập lỗi và tăng yêu cầu đồng bộ dữ liệu','Luôn nhanh hơn và an toàn hơn','Không có tradeoff'],0,'Cần đo lợi ích và xem ảnh hưởng lỗi chung.')],DOC+'Tutorials/Intermediate/Composition.html','Bắt đầu đọc C++ từ omni_kinematics.cpp và CMakeLists.txt, không cần đọc hết mã plugin ngay.');

L(30,8,'Executor, callback group & lifecycle','Giữ hệ phản hồi tốt và khởi động đúng thứ tự.',150,
 ['Phân biệt single/multi-thread executor','Biết deadlock và race condition thường gặp','Đọc trạng thái lifecycle của map server'],[
 S('Executor điều phối callback','SingleThreadedExecutor chạy callback nối tiếp; một callback nặng chặn callback khác. MultiThreadedExecutor có nhiều luồng nhưng callback group quyết định cái gì được phép chồng lấn. MutuallyExclusive không cho callback cùng group chạy đồng thời; Reentrant cho phép, đòi hỏi dữ liệu chia sẻ an toàn.'),
 S('Ba lỗi hay gặp','1) Service sync chờ chính executor đang bị callback của nó giữ. 2) Callback perception xử lý ảnh nặng làm lỡ timer điều khiển. 3) Hai callback cùng sửa state không có snapshot/lock làm trộn pose và timestamp. Thêm luồng không tự sửa đúng cả ba. Tách công việc nặng, dùng async, giới hạn queue và đo độ trễ.'),
 S('Lifecycle là máy trạng thái','Lifecycle node thường đi qua unconfigured → inactive → active; cleanup/shutdown đưa về trạng thái khác. configure chuẩn bị tài nguyên, activate bắt đầu hoạt động. Chỉ lifecycle node mới hỗ trợ CLI lifecycle. Node rclpy thường không tự có đầy đủ state machine này.'),
 S('Quan sát map_server dự án','dstar_mpc.launch.py tạo map_server và lifecycle_manager autostart cho nó. Trong phiên đang chạy, chỉ đọc trạng thái, không tự deactivate map_server giữa phiên. Nếu map không phát, kiểm YAML, configure và active trước khi sửa subscription.',`ros2 lifecycle nodes
ros2 lifecycle get /map_server
ros2 param get /map_server use_sim_time
ros2 topic info /map -v`),
 S('Thứ tự khởi động nhiều robot','Launch dự án có event handler nối spawn các robot và khởi động kinematics/controller sau spawn. TimerAction chỉ tạo trì hoãn thời gian, không đảm bảo dependency sẵn sàng; kiểm tra readiness tốt hơn dựa vào sự kiện/trạng thái thật. Đọc log theo process trước khi tăng mọi timeout.')],
 ['Liệt kê callback timer/subscription của observer bài 14.','Giải thích chuyện gì xảy ra nếu callback ngủ 5s trong executor đơn luồng.','Đọc lifecycle map_server trong phiên dự án và mô tả ý nghĩa.'],
 'Bạn đặt giả thuyết độ trễ dựa trên executor, callback group và tải; không cho rằng multithread luôn chữa được lag.',
 'Nếu cần xử lý ảnh ngoài callback, dùng queue bounded và giữ timestamp. Với state dùng chung, đọc snapshot nhất quán; lock phải ngắn, tránh giữ lock khi chờ I/O/service.',[
 Q('Nhiều luồng có tự bảo vệ state dùng chung không?',['Không','Có','Chỉ khi dùng Python'],0,'Callback group và đồng bộ dữ liệu vẫn cần thiết.'),
 Q('Node thông thường có luôn hỗ trợ ros2 lifecycle get không?',['Không','Có','Có nếu có parameter'],0,'Lifecycle là một loại node/state machine phải được triển khai.')],DOC+'Concepts/Intermediate/About-Executors.html','map_server dùng lifecycle; coordinator và MPC không nên bị gán lifecycle chỉ vì cùng launch.');

L(31,8,'Kiểm thử, hiệu năng & triển khai','Viết kết luận có bằng chứng và giữ quy trình dự án khi cải tiến.',180,
 ['Phân biệt unit/integration/simulation/benchmark','Đọc quy trình backup và nhật ký của repo','Biết giới hạn domain và bảo mật ROS'],[
 S('Bốn tầng bằng chứng','Unit test kiểm tra hàm: hình học, clearance, giới hạn, timestamp. Integration test kiểm các node trao đổi đúng interface. Simulation test kiểm tương tác trong thế giới cụ thể. Benchmark có lặp, cùng điều kiện và số liệu tổng hợp. Test qua ở tầng thấp không tự chứng minh tầng cao qua.'),
 S('Một unit test có ích','Với valid_points ở bài 23, kiểm NaN/Inf, dưới min/trên max và góc tia. Với tích phân bài25, kiểm yaw=0, yaw=pi/2 và dt không hợp lệ. Khi báo cáo, ghi lệnh, môi trường và kết quả thật. Đừng thêm test chỉ để kiểm một hằng số được copy từ implementation.'),
 S('Chạy test của dự án có chọn phạm vi','Khối dưới để bạn tự chạy trên Ubuntu sau khi đã cài phụ thuộc. Nó chỉ chọn hai file test safety; không mở Gazebo và không chứng minh toàn bộ repo đạt. Dùng Python hệ thống và PYTHONPATH đúng gói.',`cd ~/three-robot-rescue
source /opt/ros/humble/setup.bash
colcon build --symlink-install --base-paths social_navigation_planner social_navigation_sim --packages-select social_navigation_planner social_navigation_sim --cmake-args -DBUILD_TESTING=OFF
source install/setup.bash
export ROS_DOMAIN_ID=31
PYTHONPATH="$PWD/social_navigation_planner:$PYTHONPATH" /usr/bin/python3 -m pytest social_navigation_planner/test/test_rear_escape_preference.py social_navigation_planner/test/test_moving_obstacle_safety.py -q -p no:cacheprovider`),
 S('Trước khi thay đổi repo thật','AGENTS.md yêu cầu tạo backup bằng scripts/create_backup.py và chỉ sửa sau khi archive, SHA-256, manifest đã xác minh. Ghi thay đổi vào nhật ký; cập nhật báo cáo khi có cải tiến kỹ thuật/bằng chứng phù hợp. Không push nếu chưa có yêu cầu rõ. Giáo trình được tạo ở thư mục riêng, không thay code controller hoặc tài liệu lịch sử của repo.'),
 S('Hiệu năng và an toàn vận hành','Đo RTF, CPU, callback latency, tần số nhận và dropped/stale data trong cùng cảnh, cấu hình camera và phần cứng. RTF khác điều kiện không dùng làm % cải thiện. Domain chỉ tách discovery; với mạng không tin cậy cần cấu hình SROS2/DDS Security và chính sách mạng. Không mở rosbridge ra Internet chỉ để làm GUI; bản GUI này là phần mềm học tập cục bộ/website riêng tư.')],
 ['Tạo ba test biên cho hàm học tập.','Lập mẫu báo cáo có cột: nguồn, test đã chạy, kết quả, giới hạn.','Đọc AGENTS.md và chỉ ra bước bắt buộc trước một thay đổi controller.'],
 'Mọi con số bạn báo cáo có dữ liệu thực đi kèm và phân biệt rõ test chưa chạy.',
 'Nếu chưa có ROS/Gazebo, chỉ ghi kiểm tra Python hoặc đọc tĩnh đã thực hiện. Không ghi “ba robot an toàn” từ test số học. Kết quả GUI học tập được kiểm riêng với runtime dự án.',[
 Q('Khi nào so RTF hai phiên là hợp lý?',['Cùng điều kiện đo và cấu hình được ghi rõ','Bất kỳ hai ảnh chụp nào','Chỉ cần cùng tên world'],0,'Tải cảm biến, phần cứng và cấu hình ảnh hưởng mạnh đến RTF.'),
 Q('Trước khi sửa repo dự án, quy trình yêu cầu gì?',['Backup được xác minh và đọc bàn giao liên quan','Chỉ đổi branch là đủ','Xóa recordings để nhẹ máy'],0,'AGENTS.md ghi rõ archive, hash và manifest cần được kiểm tra trước khi sửa.')],REPO+'/blob/'+PROJECT_COMMIT+'/AGENTS.md','Giữ nguyên phân biệt đề xuất, đã triển khai, test số học, Gazebo có giới hạn và benchmark có lặp.');

L(32,8,'Đồ án: trạm giám sát đội cứu hộ','Ghép mọi kiến thức thành một phần mềm hỗ trợ dự án có thể đánh giá được.',360,
 ['Xây observer ba robot có stale-state rõ ràng','Phân tích một phiên replay bằng bằng chứng','Bàn giao kiến trúc, hướng dẫn và kết quả thực'],[
 S('Đầu ra của đồ án','Xây rescue_learning observer và một báo cáo/viewer offline cho ba robot. Nhận safety_status, scan/odom và prediction khi cần, không phát lệnh điều khiển. GUI trong giáo trình là nơi học và tra cứu; đồ án mở rộng kết nối ROS là việc bạn tự triển khai sau khi hoàn thành các bài. Chọn dữ liệu đủ cho câu hỏi, không thu mọi topic một cách máy móc.'),
 S('Mốc 1 — Giám sát có nguồn','Hiển thị từng robot với trạng thái “chưa có dữ liệu”, “mới” hoặc “quá hạn”, tuổi dữ liệu và nguồn topic. Tên leader lấy từ cấu hình đang chạy; mặc định nguồn tham chiếu là robot3. Dùng header timestamp khi có và receipt time khi cần; ghi rõ hai loại thời gian. Không tô trạng thái “an toàn” chỉ vì vận tốc bằng 0.'),
 S('Mốc 2 — Theo dấu một ca dừng','Chọn một session thật và một khoảng thời gian cụ thể. Đọc stop_analysis, goals và diagnostics_config trước. Đồng bộ reference, pose, scan, safety và cmd_vel theo thời gian. Nêu một giả thuyết chính, một giải thích thay thế và dữ liệu nào sẽ phân biệt chúng. Ground truth dùng đánh giá phải được ghi là ground truth.'),
 S('Mốc 3 — Thử nghiệm công bằng','Nếu so baseline với một paper backend, giữ cùng world, goal, tốc độ người, tham số, camera và phần cứng. Mỗi lượt dùng wrapper ghi vào thư mục mới. Định nghĩa trước contact, success, timeout, goal error và thời gian hoàn thành; chọn số lần lặp phù hợp tài nguyên. Đừng tạo số liệu khi chưa chạy.'),
 S('Rubric tự đánh giá','Đây là tiêu chí đồ án đề xuất, không phải thang điểm chứng nhận chính thức. Tổng 100 điểm.', '', 'bash',{table:{headers:['Hạng mục','Điểm','Bằng chứng cần có'],rows:[['Terminal và môi trường','10','Hướng dẫn độc lập, đúng Humble/22.04/Fortress'],['Node và interface','20','Build/run, schema và timeout rõ'],['TF, QoS, thời gian','20','Frame đúng, QoS tương thích, dữ liệu stale được nhận biết'],['Giám sát ba robot','20','Gắn đúng robot/topic, không trộn trạng thái giả'],['Phân tích phiên chạy','20','Đúng session, timeline, giả thuyết có bằng chứng'],['Bàn giao và giới hạn','10','README, source version, kết quả thực và việc chưa làm']]}}),
 S('Checklist bàn giao','README gồm mục tiêu, kiến trúc, cài đặt, build/source/run, topic contract, dữ liệu thử và giới hạn. Đính kèm source hash của dự án tham chiếu, đường dẫn session và lệnh tái hiện. Nếu chỉnh repo thật: backup và nhật ký theo AGENTS. Hoàn thành khi một người khác có thể tái hiện kết quả từ hướng dẫn, không chỉ khi có ảnh GUI.')],
 ['Chọn phạm vi observer 3 robot và viết topic contract một trang.','Tái sử dụng bài14/17, thêm thống kê freshness cho scan/odom.','Thử thiếu publisher, trễ dữ liệu, một robot mất liên lạc trong môi trường học tập.','Phân tích một session thật; nếu chưa có, đánh dấu phần này chưa kiểm chứng.','Tự chấm bằng rubric và viết bước tiếp theo.'],
 'Có phần mềm quan sát tách biệt với controller, bằng chứng tái hiện và kết luận đúng phạm vi kiểm chứng.',
 'Ưu tiên phiên bản nhỏ chạy được: safety_watch → health schema → log có timestamp → báo cáo offline. Chỉ mở rộng API điều khiển sau khi thiết kế quyền điều khiển, xác nhận trạng thái và dừng an toàn. Không gọi demo học tập là hệ cứu hộ đã sẵn sàng triển khai.',[
 Q('Observer nhận vận tốc bằng 0 có nên kết luận an toàn không?',['Không','Có','Có nếu đủ ba robot'],0,'Dừng vẫn có thể bị người/vật động đi vào; cần dữ liệu và định nghĩa đánh giá.'),
 Q('Đồ án có thể ghi “chưa kiểm chứng runtime” không?',['Có, phải ghi đúng thực tế','Không, phải điền số liệu','Chỉ cần ảnh giao diện là đủ'],0,'Trung thực về mức kiểm chứng là một phần của bàn giao kỹ thuật.')],REPO+'/tree/'+PROJECT_COMMIT,'Đầu ra gắn trực tiếp với dự án của bạn: hiểu, quan sát và đánh giá trước khi cải tiến thuật toán.');

const COMMANDS=[
 ['pwd','Linux','In đường dẫn của thư mục hiện tại.','pwd'],
 ['ls','Linux','Liệt kê tệp và thư mục; -l xem chi tiết, -a hiện tệp ẩn.','ls -la'],
 ['cd','Linux','Đổi thư mục; ~ là home, .. là thư mục cha, - quay về vị trí trước.','cd ~/three-robot-rescue\ncd social_navigation_planner\ncd ..'],
 ['mkdir','Linux','Tạo thư mục; -p tạo thêm thư mục cha còn thiếu.','mkdir -p ~/ros2_learning/ws/src'],
 ['touch','Linux','Tạo tệp rỗng hoặc cập nhật thời điểm sửa.','touch ~/ros2_learning/notes.txt'],
 ['cat / less','Linux','Đọc tệp: cat in hết; less cuộn từng trang và q để thoát.','cat README.md\nless README.md'],
 ['cp / mv / rm','Linux','Sao chép / chuyển hoặc đổi tên / xóa. Kiểm tra đích trước khi ghi đè hoặc xóa.','cp note.txt note_backup.txt\nmv note_backup.txt buoi1.txt'],
 ['grep / find','Linux','Tìm nội dung / tìm đường dẫn theo điều kiện.','find social_navigation_sim -name "*.launch.py"\ngrep -n "create_publisher" status_pub.py'],
 ['source','Shell','Nạp môi trường trong shell hiện tại, thực hiện mỗi terminal mới.','source /opt/ros/humble/setup.bash\nsource install/setup.bash'],
 ['export / echo','Shell','Đặt biến cho tiến trình con / in giá trị. Không có khoảng trắng quanh =.','export ROS_DOMAIN_ID=31\necho "$ROS_DOMAIN_ID"'],
 ['| / > / >>','Shell','Chuyển output / ghi đè tệp / nối thêm. > có thể thay toàn bộ nội dung cũ.','printenv | grep ROS\necho hoc_ros >> learning_log.txt'],
 ['Ctrl+C / Tab','Shell','Dừng tiến trình đang chạy / hoàn thành tên lệnh hoặc đường dẫn.','Ctrl+C: ngắt\nTab: gợi ý tên\n↑: lệnh trước'],
 ['ros2 run','ROS 2','Chạy executable đã cài trong package, không phải tên tệp tùy ý.','ros2 run turtlesim turtlesim_node'],
 ['ros2 node','ROS 2','Xem node đang tồn tại và các endpoint của nó.','ros2 node list\nros2 node info /three_robot_dstar_mpc'],
 ['ros2 topic','ROS 2','Khám phá luồng dữ liệu, kiểu, QoS và nội dung.','ros2 topic list -t\nros2 topic info /robot1/scan -v\nros2 topic echo /robot1/safety_status --once'],
 ['ros2 interface','ROS 2','Đọc định nghĩa msg/srv/action trước khi soạn dữ liệu.','ros2 interface show geometry_msgs/msg/Twist'],
 ['ros2 service','ROS 2','Tìm và gọi request–response. Ví dụ dưới chỉ cho turtlesim.','ros2 service list -t\nros2 service call /clear std_srvs/srv/Empty "{}"'],
 ['ros2 action','ROS 2','Tác vụ dài có goal, feedback, result và khả năng hủy.','ros2 action list -t\nros2 action info /turtle1/rotate_absolute'],
 ['ros2 param','ROS 2','Đọc/thay cấu hình node nếu node cho phép.','ros2 param list /map_server\nros2 param get /map_server use_sim_time'],
 ['ros2 launch','ROS 2','Khởi động hệ thống có cấu hình. --show-args chỉ xem khai báo argument.','ros2 launch social_navigation_sim dstar_mpc.launch.py --show-args'],
 ['colcon build','Build','Build các package; phải source install sau đó.','colcon build --symlink-install --packages-select rescue_learning'],
 ['rosdep','Build','Cài dependencies từ package.xml; init chỉ một lần, update không dùng sudo.','rosdep install --from-paths src --ignore-src -r -y'],
 ['ros2 bag','Dữ liệu','Ghi/phát message ROS; khác recorder JSONL của dự án.','ros2 bag record -o training_01 /training_status\nros2 bag info training_01'],
 ['ros2 control','Robot','Đọc controller/interface ở manager của đúng robot.','ros2 control list_controllers -c /robot1/controller_manager'],
 ['view_replay.py','Dự án','Mở bản ghi thật trên máy đã chạy simulation; thay tên thư mục mẫu.','python3 scripts/view_replay.py --session recordings/TEN_PHIEN_THAT'],
 ['run_simulation.sh','Dự án','Wrapper chọn dynamic/static/paper1..12 và ghi mỗi lượt. Xem bài24 trước khi chạy.','bash scripts/run_simulation.sh dynamic --diagnose-stop "$recording_dir"']
];
