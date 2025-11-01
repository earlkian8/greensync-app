import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import BinsCard from "@/components/BinsCard";
import Feather from '@expo/vector-icons/Feather';
import BinModal from "@/components/BinModal";

const Bins = () => {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [bins, setBins] = useState(
    Array(7).fill(0).map((_, i) => ({
      id: i + 1,
      name: `General Waste ${i + 1}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
      qrCode: `GS-BIN-00${i + 1}`,
      lastCollected: "Jun 10, 2023"
    }))
  );

  const handleAddBin = (formData) => {
    const newBin = {
      id: bins.length + 1,
      name: formData.name,
      status: formData.status,
      qrCode: formData.qr_code,
      binType: formData.bin_type,
      lastCollected: "Just now"
    };
    setBins([newBin, ...bins]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
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
              onPress={() => setModalVisible(true)}
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
          {bins.map((bin) => (
            <BinsCard
              key={bin.id}
              name={bin.name}
              status={bin.status}
              qrCode={bin.qrCode}
              lastCollected={bin.lastCollected}
            />
          ))}
        </ScrollView>

        {/* Add Bin Modal */}
        <BinModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddBin}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Bins;