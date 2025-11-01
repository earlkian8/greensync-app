import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NotificationItem from "@/components/NotificationItem";

const Notification = () => {
  // Sample notifications data - replace with your actual data
  const [notificationsData, setNotificationsData] = useState([
    {
      id: 1,
      title: "Bin Collection Reminder",
      message: "Your scheduled bin collection is tomorrow at 8:00 AM",
      notification_type: "reminder",
      is_read: false,
      created_at: "2024-06-15T09:30:00"
    },
    {
      id: 2,
      title: "Collection Completed",
      message: "Waste collection from General Waste 1 has been completed",
      notification_type: "completion",
      is_read: false,
      created_at: "2024-06-14T14:20:00"
    },
    {
      id: 3,
      title: "Bin Status Update",
      message: "Bin GS-BIN-003 is now marked as full",
      notification_type: "update",
      is_read: true,
      created_at: "2024-06-13T11:15:00"
    },
    {
      id: 4,
      title: "New Request Assigned",
      message: "You have been assigned to a new waste collection request",
      notification_type: "info",
      is_read: false,
      created_at: "2024-06-12T16:45:00"
    },
    {
      id: 5,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight at 10:00 PM",
      notification_type: "info",
      is_read: true,
      created_at: "2024-06-11T08:00:00"
    }
  ]);

  const handleMarkAsRead = (notificationId) => {
    setNotificationsData(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? {
              ...notification,
              is_read: true,
              read_at: new Date().toISOString()
            }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotificationsData(prev =>
      prev.map(notification => ({
        ...notification,
        is_read: true,
        read_at: new Date().toISOString()
      }))
    );
  };

  const unreadCount = notificationsData.filter(n => !n.is_read).length;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-white px-5 pt-5 pb-4 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-xl font-bold text-gray-800">
              All Notifications
            </Text>
            {unreadCount > 0 && (
              <View className="bg-red-500 px-2.5 py-1 rounded-full ml-2">
                <Text className="text-white text-xs font-semibold">
                  {unreadCount} new
                </Text>
              </View>
            )}
          </View>
          
          {unreadCount > 0 && (
            <Pressable
              onPress={handleMarkAllAsRead}
              className="flex-row items-center active:opacity-70"
            >
              <MaterialIcons name="done-all" size={18} color="#16A34A" />
              <Text className="text-green-600 font-medium text-sm ml-1.5">
                Mark all
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
      >
        {notificationsData.length > 0 ? (
          notificationsData.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        ) : (
          <View className="bg-gray-100 rounded-xl py-12 items-center">
            <Feather name="bell-off" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 mt-3 text-base">No notifications</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notification;