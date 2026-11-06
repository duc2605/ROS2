# Ví dụ học tập ROS2 Humble

Đây là workspace độc lập; không chép đè vào repository three-robot-rescue. Không có node nào phát cmd_vel. Node safety_watch đọc topic tuyệt đối /robotN/safety_status nên cần cùng domain với phiên muốn quan sát.

Giải nén trên Ubuntu22.04. Trong thư mục examples/ws:

```bash
source /opt/ros/humble/setup.bash
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
source install/setup.bash
export ROS_DOMAIN_ID=31
ros2 launch rescue_learning learning.launch.py
```

Executable riêng: status_pub, safety_watch, add_server, add_client, count_action. Chạy server trước client; dùng terminal riêng đã source Humble/overlay. Node training_count chỉ đếm Fibonacci, không chạy nhiệm vụ cứu hộ.

Ví dụ action:

```bash
ros2 run rescue_learning count_action
# Terminal khác cùng môi trường:
ros2 action send_goal /training_count example_interfaces/action/Fibonacci "{order: 8}" --feedback
```

Nguồn đã kiểm cú pháp Python, chưa build/chạy trên ROS trong tác vụ tạo giáo trình. Các bài13–18 giải thích từng tệp và bài tập mở rộng.
