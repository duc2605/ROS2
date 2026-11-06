import rclpy
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
    main()
