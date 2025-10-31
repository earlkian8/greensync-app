import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import BinsCard from "@/components/BinsCard";
import Feather from '@expo/vector-icons/Feather';
const Bins = () => {
  const [search, setSearch] = useState("");

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
              placeholder="Search bins..."
              value={search}
              onChangeText={setSearch}
              className="border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-gray-50 text-gray-800"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Add Button */}
          <Pressable
            onPress={() => console.log("Add Bin pressed")}
            className="bg-green-600 px-4 py-3 rounded-xl flex-row items-center shadow-sm active:bg-green-700"
          >
            <AntDesign name="plus" size={18} color="white" />
            <Text className="text-white ml-1.5 font-semibold">Add</Text>
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
      >
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <BinsCard
              key={i}
              name={`General Waste ${i + 1}`}
              status={i % 2 === 0 ? "Active" : "Inactive"}
              qrCode={`GS-BIN-00${i + 1}`}
              lastCollected="Jun 10, 2023"
            />
          ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Bins;