import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock Data
const mockNotifications = [
  {
    id: 1,
    title: "New Route Assignment",
    message: "You have been assigned to Downtown Route A for tomorrow.",
    notification_type: "assignment",
    is_read: false,
    created_at: "2024-11-09T08:30:00",
  },
  {
    id: 2,
    title: "Schedule Change",
    message: "Your route schedule for Nov 10 has been updated. Please check the details.",
    notification_type: "schedule_change",
    is_read: false,
    created_at: "2024-11-08T14:20:00",
  },
  {
    id: 3,
    title: "Collection Verified",
    message: "Your collection at QR-001-2024 has been verified successfully.",
    notification_type: "verification",
    is_read: true,
    created_at: "2024-11-08T10:15:00",
  },
  {
    id: 4,
    title: "Route Completion",
    message: "Great job! You completed Residential Route B ahead of schedule.",
    notification_type: "info",
    is_read: true,
    created_at: "2024-11-07T16:45:00",
  },
  {
    id: 5,
    title: "New Route Assignment",
    message: "Market District Route has been assigned to you for Nov 11.",
    notification_type: "assignment",
    is_read: true,
    created_at: "2024-11-06T09:00:00",
  },
  {
    id: 6,
    title: "System Update",
    message: "The app will undergo maintenance on Nov 12 from 2-4 AM.",
    notification_type: "info",
    is_read: true,
    created_at: "2024-11-05T11:30:00",
  },
];

export default function Alerts() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, is_read: true }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return { name: 'briefcase-outline', color: '#3B82F6' };
      case 'schedule_change':
        return { name: 'calendar-outline', color: '#F59E0B' };
      case 'verification':
        return { name: 'checkmark-circle-outline', color: '#10B981' };
      default:
        return { name: 'information-circle-outline', color: '#16A34A' };
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Stats Bar */}
        {!loading && notifications.length > 0 && (
          <View className="bg-white px-4 py-3 border-b border-gray-200">
            <Text className="text-sm text-gray-600">
              {unreadCount > 0 ? (
                <Text>
                  You have <Text className="font-semibold text-green-600">{unreadCount}</Text> unread {unreadCount === 1 ? 'notification' : 'notifications'}
                </Text>
              ) : (
                'All notifications read'
              )}
            </Text>
          </View>
        )}

        {/* Notifications List */}
        <View className="p-4">
          {loading ? (
            <View className="items-center justify-center py-12">
              <ActivityIndicator size="large" color="#16A34A" />
            </View>
          ) : notifications.length === 0 ? (
            <View className="items-center py-12 bg-white rounded-lg border border-gray-200">
              <Ionicons name="notifications-off-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-3 text-base">No notifications</Text>
            </View>
          ) : (
            <View>
              {notifications.map((notification, index) => {
                const icon = getNotificationIcon(notification.notification_type);
                return (
                  <TouchableOpacity
                    key={notification.id}
                    className={`bg-white border rounded-lg p-4 ${
                      index > 0 ? 'mt-2' : ''
                    } ${
                      !notification.is_read 
                        ? 'border-l-4 border-l-green-500 border-gray-200' 
                        : 'border-gray-200'
                    }`}
                    onPress={() => markAsRead(notification.id)}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row">
                      <View className="mr-3 mt-1">
                        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                          <Ionicons name={icon.name} size={20} color={icon.color} />
                        </View>
                      </View>

                      <View className="flex-1">
                        <View className="flex-row justify-between items-start mb-1">
                          <Text className={`flex-1 font-semibold text-base ${
                            !notification.is_read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </Text>
                          <Text className="text-xs text-gray-500 ml-2">
                            {formatDate(notification.created_at)}
                          </Text>
                        </View>

                        <Text className={`text-sm ${
                          !notification.is_read ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {notification.message}
                        </Text>

                        {!notification.is_read && (
                          <View className="mt-3 flex-row justify-end">
                            <TouchableOpacity
                              className="px-3 py-1 bg-green-50 rounded-md active:bg-green-100"
                              onPress={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                            >
                              <Text className="text-xs text-green-600 font-semibold">
                                Mark as read
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}