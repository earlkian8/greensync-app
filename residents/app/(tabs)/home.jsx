import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AuthContext } from "../_layout";
import ScheduleCard from "@/components/ScheduleCard";

const Home = () => {
  const { user } = useContext(AuthContext);

  // Mock data - replace with your actual data
  const upcomingSchedules = [
    {
      id: 1,
      collection_date: "2024-06-18",
      collection_time: "08:00:00",
      waste_type: "General Waste",
      status: "Scheduled",
      bin_location: "Barangay Ayala"
    },
    {
      id: 2,
      collection_date: "2024-06-20",
      collection_time: "09:00:00",
      waste_type: "Recyclable",
      status: "Scheduled",
      bin_location: "Barangay Tetuan"
    },
    {
      id: 3,
      collection_date: "2024-06-22",
      collection_time: "10:00:00",
      waste_type: "Organic",
      status: "Scheduled",
      bin_location: "Barangay Sta. Maria"
    }
  ];

  const wasteBins = [
    { id: 1, bin_type: "General Waste", status: "Active" },
    { id: 2, bin_type: "Recyclable", status: "Active" },
    { id: 3, bin_type: "Organic", status: "Inactive" },
    { id: 4, bin_type: "Hazardous", status: "Active" },
  ];

  const notifications = [
    {
      id: 1,
      title: "Collection Reminder",
      message: "Your waste collection is scheduled for tomorrow at 8:00 AM",
      created_at: "2024-06-15T09:30:00",
      is_read: false
    },
    {
      id: 2,
      title: "Bin Status Update",
      message: "Your general waste bin has been marked as full",
      created_at: "2024-06-14T14:20:00",
      is_read: true
    }
  ];

  const unreadNotifications = notifications.filter(n => !n.is_read).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="p-5">
          {/* Welcome Section */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name?.split(' ')[0] || 'User'}!
            </Text>
            <Text className="text-gray-600 mt-1">
              Let's keep our community clean together.
            </Text>
          </View>

          {/* Quick Actions */}
          <View className="flex-row gap-3 mb-6">
            <Pressable 
              onPress={() => console.log("Request Collection")}
              className="flex-1 bg-green-600 rounded-xl p-4 items-center justify-center shadow-sm active:bg-green-700"
            >
              <Feather name="plus" size={24} color="white" />
              <Text className="text-white text-sm font-semibold mt-2">
                Request Collection
              </Text>
            </Pressable>

            <Pressable 
              onPress={() => console.log("My Waste Bins")}
              className="flex-1 bg-green-100 rounded-xl p-4 items-center justify-center shadow-sm active:bg-green-200"
            >
              <Feather name="trash-2" size={24} color="#15803D" />
              <Text className="text-green-800 text-sm font-semibold mt-2">
                My Waste Bins
              </Text>
            </Pressable>
          </View>

          {/* Upcoming Collections */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                <Feather name="calendar" size={18} color="#16A34A" />
                <Text className="text-base font-bold text-gray-800 ml-2">
                  Upcoming Collections
                </Text>
              </View>
              <Pressable onPress={() => console.log("View all schedules")}>
                <Text className="text-sm text-green-600 font-semibold">View all</Text>
              </Pressable>
            </View>

            {upcomingSchedules.length > 0 ? (
              <View>
                {upcomingSchedules.map((schedule) => (
                  <ScheduleCard key={schedule.id} schedule={schedule} />
                ))}
              </View>
            ) : (
              <View className="bg-gray-100 rounded-xl py-8 items-center">
                <Text className="text-gray-500">No upcoming collections scheduled</Text>
              </View>
            )}
          </View>

          {/* Waste Bins Status */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                <Feather name="trash-2" size={18} color="#16A34A" />
                <Text className="text-base font-bold text-gray-800 ml-2">
                  Waste Bins Status
                </Text>
              </View>
              <Pressable onPress={() => console.log("View all bins")}>
                <Text className="text-sm text-green-600 font-semibold">View all</Text>
              </Pressable>
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <View className="flex-row flex-wrap gap-3">
                {wasteBins.map((bin) => (
                  <Pressable
                    key={bin.id}
                    onPress={() => console.log("Bin details:", bin.id)}
                    className={`flex-1 min-w-[30%] p-3 rounded-lg items-center ${
                      bin.status === 'Active' 
                        ? 'bg-green-100' 
                        : 'bg-red-100'
                    }`}
                  >
                    <Text className={`text-xs mb-1 ${
                      bin.status === 'Active' 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {bin.bin_type.split(' ')[0]}
                    </Text>
                    <Text className={`font-semibold text-sm ${
                      bin.status === 'Active' 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {bin.status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Recent Notifications */}
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                <Feather name="bell" size={18} color="#16A34A" />
                <Text className="text-base font-bold text-gray-800 ml-2">
                  Recent Notifications
                </Text>
                {unreadNotifications > 0 && (
                  <View className="bg-red-500 w-5 h-5 rounded-full items-center justify-center ml-2">
                    <Text className="text-white text-xs font-bold">
                      {unreadNotifications}
                    </Text>
                  </View>
                )}
              </View>
              <Pressable onPress={() => console.log("View all notifications")}>
                <Text className="text-sm text-green-600 font-semibold">View all</Text>
              </Pressable>
            </View>

            {notifications.length > 0 ? (
              <View>
                {notifications.slice(0, 2).map((notification) => (
                  <Pressable
                    key={notification.id}
                    onPress={() => console.log("View notification")}
                    className={`p-4 rounded-xl border mb-2 ${
                      !notification.is_read
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <View className="flex-row justify-between mb-1">
                      <Text className="font-semibold text-sm text-gray-800 flex-1">
                        {notification.title}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-600" numberOfLines={1}>
                      {notification.message}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              <View className="bg-gray-100 rounded-xl py-8 items-center">
                <Text className="text-gray-500">No notifications</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;