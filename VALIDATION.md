# Kiểm tra đã thực hiện — 04/11/2026

## Nội dung và source

- 32 lesson ID duy nhất, 8 chặng, 64 câu hỏi có lựa chọn/đáp án/giải thích hợp lệ, mỗi bài có mục tiêu/thực hành/gợi ý/nguồn và phần gắn dự án.
- Tổng thời lượng gợi ý:4020 phút (67 giờ; giao diện làm tròn khoảng70 giờ), chưa tính xử lý lỗi môi trường hoặc nhánh mở rộng.
- Đọc source dự án tại commit `c8af894130b833a51a7d42fb7b927813b4a804ba`: manifests, entry_points, runner, các launch liên quan, endpoint coordinator/MPC, kinematics, CMake, viewer và phần bàn giao hiện hành. Không sửa source dự án.
- Đối chiếu Humble/Ubuntu22.04, Gazebo Fortress, action Fibonacci và ros2_control từ nguồn chính thức.

## Kiểm tra thực sự đã qua

- `node --check dist/app.js` và `node --check dist/curriculum.js`.
- `node scripts/prepare.mjs`: tính đầy đủ dữ liệu, sinh Markdown và workspace ví dụ.
- `python scripts/check-snippets.py`:14 đoạn Python parse bằng AST;52 đoạn Bash qua `bash -n`; XML/Python của workspace ví dụ hợp cú pháp. Các phép thử hàm thực tế: hướng tọa độ tại yaw=pi/2, vận tốc ngang, dt<=0, lọc NaN/Inf/out-of-range, ngưỡng pin19/20.
- GUI trong in-app browser: mở bài, trả lời đúng/sai và xem giải thích, reset quiz, đánh dấu/bỏ hoàn thành, ghi chú tồn tại sau reload; dọn dữ liệu ghi chú thử sau kiểm tra.
- Tìm bài “MPC” trả8 kết quả; lọc nâng cao trả8 bài. Sổ tay tìm source và lọc ROS2 hoạt động.
- Terminal mô phỏng: pwd, cd, ls, source, export, node list, topic list và cd quay lại; hoàn thành đủ7 checklist.
- Kiểm tra bố cục desktop1440 và mobile390. Sửa overflow ở code/path và project grid. Ở viewport client375, body375 trên trang dự án, trang chủ, terminal và bài13 sau sửa.
- Console browser không báo JavaScript error tại điểm kiểm tra.

## Chưa xác minh

- Không cài ROS, không build workspace ROS, không chạy node thật, không chạy test repository robot, không mở/dừng Gazebo hoặc đặt goal.
- Chưa kiểm chứng runtime của5 node ví dụ và các lệnh ROS trong giáo trình. Syntax check không thay thế build/runtime test.
- Chưa chạy benchmark navigation/perception, không có kết luận mới về contact, RTF hoặc chất lượng baseline.
- Chức năng nhập/xuất bản sao có triển khai và kiểm cấu trúc code; chưa thực hiện vòng download→upload trong browser QA.
