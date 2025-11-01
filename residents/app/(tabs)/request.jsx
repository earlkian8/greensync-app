import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';
import RequestCard from "@/components/RequestCard";

const Request = () => {
  const [search, setSearch] = useState("");

  // Sample data - replace with actual data from your backend
  const requests = [
    {
      id: 1,
      request_type: "Bulk Waste Collection",
      waste_type: "General Waste",
      status: "Pending",
      preferred_date: "2024-06-15",
      preferred_time: "09:00:00",
      created_at: "2024-06-10",
      priority: "High"
    },
    {
      id: 2,
      request_type: "Special Pickup",
      waste_type: "Recyclable",
      status: "Assigned",
      preferred_date: "2024-06-16",
      preferred_time: "14:30:00",
      created_at: "2024-06-11",
      priority: "Medium"
    },
    {
      id: 3,
      request_type: "Emergency Collection",
      waste_type: "Hazardous",
      status: "Completed",
      preferred_date: "2024-06-12",
      preferred_time: "10:00:00",
      created_at: "2024-06-09",
      priority: "High"
    },
    {
      id: 4,
      request_type: "Regular Pickup",
      waste_type: "Organic",
      status: "Pending",
      preferred_date: "2024-06-18",
      preferred_time: "08:00:00",
      created_at: "2024-06-10",
      priority: "Low"
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 bg-gray-50"
    >
      {/* Header Section */}
      <View className="bg-white px-5 pt-5 pb-4 shadow-sm">
        <View className="flex-row items-center gap-3">
          {/* Search Input */}
          <View className="flex-1 relative">
            <Feather 
              name="search" 
              size={18} 
              color="#9CA3AF" 
              style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
            />
            <TextInput
              placeholder="Search requests..."
              value={search}
              onChangeText={setSearch}
              className="border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-gray-50 text-gray-800"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Add Button */}
          <Pressable
            onPress={() => console.log("Add Request pressed")}
            className="bg-green-600 px-4 py-3 rounded-xl flex-row items-center shadow-sm active:bg-green-700"
          >
            <AntDesign name="plus" size={18} color="white" />
            <Text className="text-white ml-1.5 font-semibold">Add Request</Text>
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
      >
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onViewDetails={(id) => console.log("View details for request:", id)}
          />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Request;