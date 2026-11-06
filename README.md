# ROS 2 Lab — Giáo trình ROS 2 Humble bằng tiếng Việt

GUI học ROS 2 từ dòng lệnh Linux đến lập trình và điều hướng đội ba robot, gắn với [three-robot-rescue](https://github.com/duc2605/three-robot-rescue).

- 32 bài, 8 chặng và 64 câu tự kiểm tra.
- Bài thực hành, gợi ý, sổ tay câu lệnh, tìm kiếm và bản đồ mã nguồn dự án.
- Terminal mô phỏng; tiến độ và ghi chú lưu trong trình duyệt, có xuất/nhập JSON.
- Workspace ROS độc lập với 5 executable Python học tập.

## Chạy trên Ubuntu

Không cần npm hoặc ROS để đọc giáo trình. Các bài thực hành ROS dùng **Ubuntu 22.04, Bash, ROS 2 Humble và Gazebo Fortress**.

### 1. Cài Git và Python 3

Mở Terminal bằng **Ctrl + Alt + T**, rồi chạy:

```bash
sudo apt update
sudo apt install git python3
```

### 2. Tải mã nguồn lần đầu

```bash
cd ~
git clone https://github.com/duc2605/ROS2.git
cd ~/ROS2
```

Nếu đã clone repo, bỏ qua bước clone và vào thư mục đã có. Các lệnh dưới giả định repo nằm ở `~/ROS2`; thay đường dẫn nếu bạn clone ở nơi khác.

### 3. Mở giáo trình

```bash
cd ~/ROS2
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Giữ terminal này mở. Mở trình duyệt trên **cùng máy Ubuntu**, truy cập [http://127.0.0.1:8765/](http://127.0.0.1:8765/) và chọn **Bắt đầu từ bài 01**.

- **Lộ trình học:** chọn bài bất kỳ.
- **Terminal thực hành:** luyện các lệnh với dữ liệu mô phỏng.
- **Dự án của bạn:** xem cấu trúc và luồng dữ liệu của `three-robot-rescue`.
- **Ctrl + C** trong terminal chạy máy chủ: tắt máy chủ giáo trình.

### Những lần mở sau

```bash
cd ~/ROS2
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Sau đó mở lại [http://127.0.0.1:8765/](http://127.0.0.1:8765/). Nếu báo không kết nối được, kiểm tra máy chủ đã chạy và terminal chưa bị đóng. Nếu cổng 8765 đang bận, dùng cổng khác, ví dụ `8766`, và mở `http://127.0.0.1:8766/`.

Tiến độ/ghi chú lưu theo trình duyệt và địa chỉ truy cập; đổi cổng hoặc đổi máy có thể không thấy dữ liệu cũ. Hãy xuất bản sao JSON trong mục **Ghi chép của tôi** trước khi chuyển.

## Chạy trên Windows

Với Python đã cài, mở terminal tại thư mục repository rồi chạy:

```bash
python -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Mở http://127.0.0.1:8765/ và chọn **Bắt đầu từ bài 01**.
Hoặc nhấp đúp `MO-GIAO-TRINH.cmd`; nó khởi động máy chủ local nếu cần rồi mở trình duyệt. Tệp `.cmd` chỉ dành cho Windows. Máy chủ chỉ lắng nghe trên 127.0.0.1.

Cũng có thể mở trực tiếp `dist/index.html` để đọc bài mà không chạy máy chủ. Terminal trong website chỉ mô phỏng, không chạy shell thật hoặc điều khiển robot. Khi đến phần thực hành ROS, làm theo bài cài Humble trong giáo trình.

## Cấu trúc

```text
dist/            Giao diện static HTML/CSS/JS và bản giáo trình Markdown
examples/ws/     Workspace ROS mẫu độc lập
scripts/         Sinh giáo trình, kiểm cú pháp, kiểm tra GitHub và mở local
MO-GIAO-TRINH.cmd Nút mở trên Windows
SYNC.md          Phạm vi đồng bộ với dự án tham chiếu
VALIDATION.md    Các kiểm tra và giới hạn đã xác minh
```

`dist/curriculum.js` chứa nội dung bài học. `dist/app.js` chứa giao diện và tương tác. `dist/style.css` chứa bố cục responsive.

## Tạo lại bản Markdown và ví dụ

Cần Node.js hỗ trợ ES modules và import.meta.dirname.

```bash
node scripts/prepare.mjs
node --check dist/app.js
node --check dist/curriculum.js
```

`python scripts/check-snippets.py` kiểm cú pháp và một số hàm thuần, không chạy ROS. Script hiện dùng Git Bash tại `C:/Program Files/Git/bin/bash.exe`; chỉnh đường dẫn nếu máy bạn khác.

## Đồng bộ GitHub

```bash
node scripts/check-upstream.mjs
```

Lệnh chỉ đọc SHA nhánh main và so với commit đã duyệt trong giáo trình. Khi SHA đổi, cần đọc diff và cập nhật bài/ví dụ thực sự rồi kiểm tra; không chỉ đổi SHA. Xem SYNC.md.

**Đưa mã nguồn này lên GitHub không tự tạo lịch cập nhật.** Lịch local Codex đã thiết lập trên máy tác giả là cấu hình riêng, không nằm trong repository và không tự chuyển theo bản clone.

## Ví dụ ROS

Xem `examples/README.md`. Build workspace trong Ubuntu có dependencies; không chép đè vào repository robot. Không có node học tập nào phát cmd_vel.

## Giới hạn và nguồn

Nguồn tham chiếu ban đầu: `three-robot-rescue`, commit `c8af894130b833a51a7d42fb7b927813b4a804ba`.
Các liên kết nguồn cố định theo commit để có thể kiểm tra. Ví dụ đề xuất được phân biệt với tính năng baseline đã có.

GUI và cú pháp đã được kiểm tra; chưa build hoặc chạy ROS/Gazebo thật cho các ví dụ. Xem VALIDATION.md. Tiến độ/ghi chú chỉ lưu trên trình duyệt, không đồng bộ giữa các máy.

Bộ mã nguồn này không chứa .git, thông tin nhận dạng Sites, credential, log hoặc dữ liệu học cá nhân. Việc công khai repository không công khai dữ liệu localStorage của người học.
