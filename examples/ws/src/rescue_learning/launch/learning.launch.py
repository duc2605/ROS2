from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(package='rescue_learning', executable='status_pub',
             namespace='training', output='screen'),
        Node(package='rescue_learning', executable='safety_watch',
             name='team_observer', output='screen'),
    ])
