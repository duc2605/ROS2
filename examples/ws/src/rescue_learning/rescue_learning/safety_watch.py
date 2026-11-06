import time
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
    main()
