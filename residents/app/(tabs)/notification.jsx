import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Bell, Check, CheckCheck, Trash2, Inbox } from "lucide-react-native";
import {
  getAllNotifications,
  getNotificationCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  clearAllNotifications,
} from "../../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      const [allRes, countRes] = await Promise.all([
        getAllNotifications(),
        getNotificationCount(),
      ]);

      setNotifications(allRes.data || []);
      setUnreadCount(countRes.data?.count || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRead = async (id) => {
    await markNotificationRead(id);
    load();
  };

  const handleReadAll = async () => {
    await markAllNotificationsRead();
    load();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    load();
  };

  const handleClearAll = async () => {
    await clearAllNotifications();
    load();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-5 pb-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center gap-3">
          <Bell size={28} color="#1f2937" strokeWidth={2} />
          <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
          {unreadCount > 0 && (
            <View className="bg-blue-500 rounded-full px-2 py-0.5 min-w-[24px] items-center justify-center">
              <Text className="text-white text-xs font-bold">{unreadCount}</Text>
            </View>
          )}
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity 
            onPress={handleReadAll} 
            className={`flex-row items-center gap-1.5 px-3 py-2 rounded-lg ${
              unreadCount === 0 ? 'bg-gray-100' : 'bg-gray-100'
            }`}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={18} color={unreadCount === 0 ? "#9ca3af" : "#3b82f6"} />
            <Text className={`text-sm font-semibold ${
              unreadCount === 0 ? 'text-gray-400' : 'text-blue-500'
            }`}>
              Mark All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleClearAll} 
            className={`flex-row items-center gap-1.5 px-3 py-2 bg-red-50 rounded-lg`}
            disabled={notifications.length === 0}
          >
            <Trash2 size={18} color={notifications.length === 0 ? "#9ca3af" : "#ef4444"} />
            <Text className={`text-sm font-semibold ${
              notifications.length === 0 ? 'text-gray-400' : 'text-red-500'
            }`}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View className="flex-1 justify-center items-center px-8">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-3 text-sm text-gray-600">Loading notifications...</Text>
        </View>
      ) : notifications.length === 0 ? (
        <View className="flex-1 justify-center items-center px-8">
          <Inbox size={64} color="#d1d5db" strokeWidth={1.5} />
          <Text className="mt-4 text-xl font-semibold text-gray-900">No notifications</Text>
          <Text className="mt-1 text-sm text-gray-600">You're all caught up!</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {notifications.map((n) => (
            <View
              key={n.id}
              className={`mx-4 mt-3 p-4 bg-white rounded-xl border ${
                !n.read_at 
                  ? 'border-l-4 border-l-blue-500 border-gray-200 bg-blue-50' 
                  : 'border-gray-200'
              } shadow-sm`}
            >
              <View className="mb-3">
                <View className="flex-row gap-3">
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${
                    !n.read_at ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Bell size={20} color={!n.read_at ? "#3b82f6" : "#6b7280"} strokeWidth={2} />
                  </View>
                  
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-1">
                      <Text className="text-base font-semibold text-gray-900 flex-shrink">
                        {n.title || "Notification"}
                      </Text>
                      {!n.read_at && (
                        <View className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </View>
                    <Text className="text-sm text-gray-600 leading-5 mb-1.5">
                      {n.message}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      {formatDate(n.created_at)}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-2 items-center">
                {!n.read_at && (
                  <TouchableOpacity
                    onPress={() => handleRead(n.id)}
                    className="flex-row items-center gap-1.5 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <Check size={16} color="#3b82f6" />
                    <Text className="text-xs font-semibold text-blue-500">Mark Read</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => handleDelete(n.id)}
                  className="p-2 bg-red-50 border border-red-200 rounded-lg"
                >
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View className="h-5" />
        </ScrollView>
      )}
    </View>
  );
}