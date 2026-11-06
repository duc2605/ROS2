# Đồng bộ nội dung với nguồn tham chiếu

Nguồn: https://github.com/duc2605/three-robot-rescue, nhánh main.

1. Chạy `node scripts/check-upstream.mjs` để đọc commit mới nhất.
2. Nếu không đổi SHA, không cần sửa bài.
3. Nếu đổi SHA, đọc diff các manifest, launch, node, topic/type/QoS, frame, cấu hình, mô hình, recording và viewer có liên quan. Đọc hướng dẫn trong repo nguồn; không chạy code upstream chỉ để xem thay đổi.
4. Cập nhật bài trong `dist/curriculum.js`, sơ đồ/topic mẫu trong `dist/app.js`, ví dụ và lệnh bị ảnh hưởng. Giữ ROS2 Humble/Ubuntu22.04/Fortress; ghi rõ khác biệt nếu upstream đổi nền.
5. Giữ lesson ID và khóa localStorage; tránh làm mất tiến độ/ghi chú. Không coi dữ liệu mẫu là runtime thật. Nếu đổi câu hỏi, xử lý phiên bản đáp án phù hợp.
6. Chỉ cập nhật PROJECT_COMMIT và ngày tham chiếu sau khi đọc và điều chỉnh. Ghi rõ bài thay đổi, kiểm tra thực chạy và điều chưa kiểm chứng.
7. Chạy scripts/prepare.mjs, kiểm cú pháp JS/Python/Bash và cập nhật ZIP ví dụ nếu cần. Kiểm giao diện khi đổi GUI.
8. Xuất bản bằng cơ chế hosting của repository riêng khi đã thiết lập.

Script kiểm tra SHA không tự viết lại bài học. Bộ nguồn GitHub này không chứa scheduler, webhook hoặc quyền hosting. Lịch local Codex là cấu hình riêng trên máy thiết lập nó. Không sửa/push source robot hoặc chạy ROS/Gazebo chỉ để cập nhật giáo trình.
