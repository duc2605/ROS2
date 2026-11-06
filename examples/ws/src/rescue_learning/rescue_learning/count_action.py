import time
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
    main()
