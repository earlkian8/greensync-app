import { View, Text, Modal, Pressable, TextInput, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Feather from '@expo/vector-icons/Feather';

const BinModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    qr_code: "",
    bin_type: "",
    status: "Active",
  });

  // Generate QR code automatically when bin type is selected
  useEffect(() => {
    if (formData.bin_type) {
      const prefix = formData.bin_type.split(' ')[0].substring(0, 2).toUpperCase();
      const timestamp = Date.now().toString().slice(-6);
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const generatedQR = `${prefix}-BIN-${timestamp}${randomNum}`;
      setFormData(prev => ({ ...prev, qr_code: generatedQR }));
    }
  }, [formData.bin_type]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.bin_type) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
    // Reset form
    setFormData({
      name: "",
      qr_code: "",
      bin_type: "",
      status: "Active",
    });
  };

  const binTypes = ["General Waste", "Recyclable", "Organic", "Hazardous"];
  const statuses = ["Active", "Inactive", "Maintenance"];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl max-h-[90%]">
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">Add New Bin</Text>
            <Pressable onPress={onClose} className="p-2 active:bg-gray-100 rounded-full">
              <Feather name="x" size={24} color="#6B7280" />
            </Pressable>
          </View>

          {/* Form Content */}
          <ScrollView 
            className="px-5 py-4"
            showsVerticalScrollIndicator={false}
          >
            {/* Bin Name */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Bin Name <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(value) => handleChange("name", value)}
                placeholder="e.g., General Waste 1"
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Bin Type */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Bin Type <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {binTypes.map((type) => (
                  <Pressable
                    key={type}
                    onPress={() => handleChange("bin_type", type)}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.bin_type === type
                        ? 'bg-green-600 border-green-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${
                      formData.bin_type === type ? 'text-white' : 'text-gray-700'
                    }`}>
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Status */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Status <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row gap-2">
                {statuses.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => handleChange("status", status)}
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      formData.status === status
                        ? 'bg-green-600 border-green-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text className={`text-sm font-medium text-center ${
                      formData.status === status ? 'text-white' : 'text-gray-700'
                    }`}>
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Auto-generated QR Code */}
            {formData.qr_code && (
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Generated QR Code
                </Text>
                <View className="border border-green-300 rounded-xl px-4 py-3 bg-green-50">
                  <View className="flex-row items-center">
                    <Feather name="check-circle" size={18} color="#16A34A" />
                    <Text className="text-green-700 font-semibold ml-2">
                      {formData.qr_code}
                    </Text>
                  </View>
                  <Text className="text-xs text-green-600 mt-1">
                    This QR code will be automatically assigned to the bin
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Footer Buttons */}
          <View className="px-5 py-4 border-t border-gray-200 flex-row gap-3">
            <Pressable
              onPress={onClose}
              className="flex-1 border border-gray-300 rounded-xl py-3 active:bg-gray-50"
            >
              <Text className="text-gray-700 text-center font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              className="flex-1 bg-green-600 rounded-xl py-3 active:bg-green-700"
            >
              <Text className="text-white text-center font-semibold">Add Bin</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BinModal;