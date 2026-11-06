import rclpy
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
    main()
