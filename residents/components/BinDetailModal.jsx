import { View, Text, Modal, Pressable, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';

const BinDetailModal = ({ visible, onClose, bin, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBin, setEditedBin] = useState({
    bin_type: "",
    status: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Update local state when bin changes
  useEffect(() => {
    if (bin) {
      setEditedBin({
        bin_type: bin.binType || "",
        status: bin.status || "Active",
      });
    }
  }, [bin]);

  const handleUpdate = async () => {
    if (!editedBin.bin_type || !editedBin.status) {
      Alert.alert("Error", "Please select both bin type and status");
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(bin.id, editedBin);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating bin:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Bin",
      "Are you sure you want to delete this bin? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await onDelete(bin.id);
            onClose();
          }
        }
      ]
    );
  };

  const binTypes = ["Organic", "General Waste", "Recyclable", "Hazardous"];
  const statuses = ["Active", "Inactive", "Full", "Damaged"];

  if (!bin) return null;

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
            <Text className="text-xl font-bold text-gray-800">Bin Details</Text>
            <View className="flex-row items-center gap-2">
              {!isEditing && (
                <Pressable
                  onPress={() => setIsEditing(true)}
                  className="p-2 active:bg-gray-100 rounded-full"
                >
                  <Feather name="edit-2" size={20} color="#16A34A" />
                </Pressable>
              )}
              <Pressable onPress={onClose} className="p-2 active:bg-gray-100 rounded-full">
                <Feather name="x" size={24} color="#6B7280" />
              </Pressable>
            </View>
          </View>

          {/* Content */}
          <ScrollView 
            className="px-5 py-4"
            showsVerticalScrollIndicator={false}
          >
            {/* QR Code Display */}
            <View className="items-center py-6 bg-gray-50 rounded-2xl mb-6">
              <View className="bg-white p-4 rounded-xl shadow-sm">
                <QRCode
                  value={bin.qrCode}
                  size={200}
                  backgroundColor="white"
                  color="black"
                />
              </View>
              <Text className="text-gray-600 font-semibold mt-4 text-base">{bin.qrCode}</Text>
              <Text className="text-gray-500 text-sm mt-1">Scan to access bin</Text>
            </View>

            {/* Bin Name (Auto-generated from type) */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-2">Bin Name</Text>
              <Text className="text-2xl font-bold text-gray-800">{bin.name}</Text>
              <Text className="text-xs text-gray-400 mt-1">
                Auto-generated from bin type
              </Text>
            </View>

            {/* Bin Type */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-3">Bin Type</Text>
              {isEditing ? (
                <View className="flex-row flex-wrap gap-2">
                  {binTypes.map((type) => (
                    <Pressable
                      key={type}
                      onPress={() => setEditedBin(prev => ({ ...prev, bin_type: type }))}
                      disabled={isUpdating}
                      className={`px-4 py-2.5 rounded-lg border-2 ${
                        editedBin.bin_type === type
                          ? 'bg-green-600 border-green-600'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text className={`text-sm font-semibold ${
                        editedBin.bin_type === type ? 'text-white' : 'text-gray-700'
                      }`}>
                        {type}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View className="inline-flex self-start px-4 py-2.5 rounded-xl bg-blue-100">
                  <Text className="font-semibold text-blue-700">
                    {bin.binType}
                  </Text>
                </View>
              )}
            </View>

            {/* Status */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-3">Status</Text>
              {isEditing ? (
                <View className="flex-row gap-2">
                  {statuses.map((status) => (
                    <Pressable
                      key={status}
                      onPress={() => setEditedBin(prev => ({ ...prev, status }))}
                      disabled={isUpdating}
                      className={`flex-1 px-3 py-3 rounded-xl border-2 ${
                        editedBin.status === status
                          ? 'bg-green-600 border-green-600'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text className={`text-sm font-semibold text-center ${
                        editedBin.status === status ? 'text-white' : 'text-gray-700'
                      }`}>
                        {status}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View className={`inline-flex self-start px-4 py-2.5 rounded-xl ${
                  bin.status === 'Active' 
                    ? 'bg-green-100' 
                    : bin.status === 'Inactive'
                    ? 'bg-gray-100'
                    : bin.status === 'Full'
                    ? 'bg-orange-100'
                    : 'bg-red-100'
                }`}>
                  <Text className={`font-semibold ${
                    bin.status === 'Active' 
                      ? 'text-green-700' 
                      : bin.status === 'Inactive'
                      ? 'text-gray-700'
                      : bin.status === 'Full'
                      ? 'text-orange-700'
                      : 'text-red-700'
                  }`}>
                    {bin.status}
                  </Text>
                </View>
              )}
            </View>

            {/* Additional Info */}
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-white p-2 rounded-lg mr-3">
                  <Feather name="calendar" size={18} color="#16A34A" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Last Collected</Text>
                  <Text className="text-sm font-semibold text-gray-800">
                    {bin.lastCollected}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-white p-2 rounded-lg mr-3">
                  <AntDesign name="clockcircleo" size={18} color="#16A34A" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Registered</Text>
                  <Text className="text-sm font-semibold text-gray-800">
                    {bin.registeredAt}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            {isEditing && (
              <View className="flex-row gap-3 mb-4">
                <Pressable
                  onPress={() => {
                    setEditedBin({ 
                      bin_type: bin.binType, 
                      status: bin.status 
                    });
                    setIsEditing(false);
                  }}
                  disabled={isUpdating}
                  className="flex-1 border-2 border-gray-300 rounded-xl py-3 active:bg-gray-50"
                >
                  <Text className="text-gray-700 text-center font-semibold">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleUpdate}
                  disabled={isUpdating}
                  className={`flex-1 rounded-xl py-3 ${
                    isUpdating ? 'bg-green-400' : 'bg-green-600 active:bg-green-700'
                  }`}
                >
                  <Text className="text-white text-center font-semibold">
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Text>
                </Pressable>
              </View>
            )}

            {/* Delete Button */}
            {!isEditing && (
              <Pressable
                onPress={handleDelete}
                className="border-2 border-red-500 rounded-xl py-3 active:bg-red-50 mb-4"
              >
                <View className="flex-row items-center justify-center">
                  <Feather name="trash-2" size={18} color="#EF4444" />
                  <Text className="text-red-500 font-semibold ml-2">Delete Bin</Text>
                </View>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BinDetailModal;