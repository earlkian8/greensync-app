import { View, Text, Modal, Pressable, TextInput, ScrollView, Platform, Alert } from "react-native";
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

const RequestModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    request_type: "",
    description: "",
    preferred_date: new Date(),
    preferred_time: new Date(),
    waste_type: "",
    priority: "Medium",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.request_type || !formData.waste_type) {
      Alert.alert("Required Fields", "Please fill in all required fields");
      return;
    }
    onSubmit(formData);
    // Reset form
    setFormData({
      request_type: "",
      description: "",
      preferred_date: new Date(),
      preferred_time: new Date(),
      waste_type: "",
      priority: "Medium",
    });
  };

  const requestTypes = ["Bulk Waste Collection", "Special Pickup", "Emergency Collection", "Regular Pickup"];
  const wasteTypes = ["General Waste", "Recyclable", "Organic", "Hazardous"];
  const priorities = ["Low", "Medium", "High"];

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
            <Text className="text-xl font-bold text-gray-800">Create Request</Text>
            <Pressable onPress={onClose} className="p-2 active:bg-gray-100 rounded-full">
              <Feather name="x" size={24} color="#6B7280" />
            </Pressable>
          </View>

          {/* Form Content */}
          <ScrollView 
            className="px-5 py-4"
            showsVerticalScrollIndicator={false}
          >
            {/* Request Type */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Request Type <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {requestTypes.map((type) => (
                  <Pressable
                    key={type}
                    onPress={() => handleChange("request_type", type)}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.request_type === type
                        ? 'bg-green-600 border-green-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${
                      formData.request_type === type ? 'text-white' : 'text-gray-700'
                    }`}>
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Waste Type */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Waste Type <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {wasteTypes.map((type) => (
                  <Pressable
                    key={type}
                    onPress={() => handleChange("waste_type", type)}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.waste_type === type
                        ? 'bg-green-600 border-green-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${
                      formData.waste_type === type ? 'text-white' : 'text-gray-700'
                    }`}>
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Priority */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Priority <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row gap-2">
                {priorities.map((priority) => (
                  <Pressable
                    key={priority}
                    onPress={() => handleChange("priority", priority)}
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      formData.priority === priority
                        ? 'bg-green-600 border-green-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text className={`text-sm font-medium text-center ${
                      formData.priority === priority ? 'text-white' : 'text-gray-700'
                    }`}>
                      {priority}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Preferred Date */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white flex-row items-center justify-between"
              >
                <Text className="text-gray-800">
                  {formData.preferred_date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
                <Feather name="calendar" size={18} color="#6B7280" />
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.preferred_date}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(Platform.OS === 'ios');
                    if (selectedDate) {
                      handleChange("preferred_date", selectedDate);
                    }
                  }}
                />
              )}
            </View>

            {/* Preferred Time */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </Text>
              <Pressable
                onPress={() => setShowTimePicker(true)}
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white flex-row items-center justify-between"
              >
                <Text className="text-gray-800">
                  {formData.preferred_time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
                <Feather name="clock" size={18} color="#6B7280" />
              </Pressable>
              {showTimePicker && (
                <DateTimePicker
                  value={formData.preferred_time}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(Platform.OS === 'ios');
                    if (selectedTime) {
                      handleChange("preferred_time", selectedTime);
                    }
                  }}
                />
              )}
            </View>

            {/* Description */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </Text>
              <TextInput
                value={formData.description}
                onChangeText={(value) => handleChange("description", value)}
                placeholder="Add any additional details..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800"
                placeholderTextColor="#9CA3AF"
              />
            </View>
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
              <Text className="text-white text-center font-semibold">Submit Request</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestModal;