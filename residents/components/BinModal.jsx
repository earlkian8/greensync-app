import { View, Text, Modal, Pressable, TextInput, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import Feather from '@expo/vector-icons/Feather';

const BinModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    qr_code: "",
    bin_type: "",
    status: "Active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
  if (!formData.qr_code || !formData.bin_type) {
    Alert.alert("Validation Error", "Please select a bin type");
    return;
  }

  setIsSubmitting(true);
  try {
    // Find backend value
    const selectedType = binTypes.find(t => t.value === formData.bin_type);
    const backendType = selectedType ? selectedType.backend : null;

    const payload = {
      ...formData,
      bin_type: backendType,
      status: formData.status.toLowerCase(), // backend expects lowercase
    };

    await onSubmit(payload);

    // Reset form
    setFormData({
      qr_code: "",
      bin_type: "",
      status: "Active",
    });
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  // Map frontend bin types to backend values
  const binTypes = [
    { label: "Organic", value: "Organic", backend: "biodegradable" },
    { label: "General Waste", value: "General Waste", backend: "non-biodegradable" },
    { label: "Recyclable", value: "Recyclable", backend: "recyclable" },
    { label: "Hazardous", value: "Hazardous", backend: "hazardous" }
  ];

  const statuses = ["Active", "Inactive", "Full", "Damaged"];

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
            <Text className="text-xl font-bold text-gray-800">Register New Bin</Text>
            <Pressable 
              onPress={onClose} 
              className="p-2 active:bg-gray-100 rounded-full"
              disabled={isSubmitting}
            >
              <Feather name="x" size={24} color="#6B7280" />
            </Pressable>
          </View>

          {/* Form Content */}
          <ScrollView 
            className="px-5 py-4"
            showsVerticalScrollIndicator={false}
          >
            {/* Bin Type */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Bin Type <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {binTypes.map((type) => (
                  <Pressable
                    key={type.value}
                    onPress={() => handleChange("bin_type", type.value)}
                    disabled={isSubmitting}
                    className={`px-4 py-2.5 rounded-lg border ${
                      formData.bin_type === type.value
                        ? 'bg-green-600 border-green-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${
                      formData.bin_type === type.value ? 'text-white' : 'text-gray-700'
                    }`}>
                      {type.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text className="text-xs text-gray-500 mt-2">
                Select the type of waste this bin will collect
              </Text>
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
                    disabled={isSubmitting}
                    className={`flex-1 px-3 py-3 rounded-lg border ${
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

            {/* Info Box */}
            <View className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <View className="flex-row items-start">
                <Feather name="info" size={16} color="#3B82F6" style={{ marginTop: 2 }} />
                <Text className="text-xs text-blue-700 ml-2 flex-1">
                  Make sure to print and attach the QR code to your bin after registration
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View className="px-5 py-4 border-t border-gray-200 flex-row gap-3">
            <Pressable
              onPress={onClose}
              disabled={isSubmitting}
              className="flex-1 border border-gray-300 rounded-xl py-3 active:bg-gray-50"
            >
              <Text className="text-gray-700 text-center font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 rounded-xl py-3 ${
                isSubmitting ? 'bg-green-400' : 'bg-green-600 active:bg-green-700'
              }`}
            >
              <Text className="text-white text-center font-semibold">
                {isSubmitting ? 'Registering...' : 'Register Bin'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BinModal;