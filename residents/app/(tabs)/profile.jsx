import { View, Text, ScrollView, Pressable, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from "../_layout";

const Profile = () => {
  const { user, setIsAuthenticated } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone_number: user?.phone_number || '+63 912 345 6789',
    house_no: user?.house_no || '123',
    street: user?.street || 'Main Street',
    barangay: user?.barangay || 'Barangay Ayala'
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Navigation will be handled by your auth logic in _layout
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would update the user context and call an API
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Header */}
        <View className="items-center py-6 bg-white mb-4">
          <View className="relative mb-3">
            <View className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {user?.profile_image ? (
                <Image 
                  source={{ uri: user.profile_image }} 
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full flex items-center justify-center bg-green-100">
                  <Feather name="user" size={40} color="#16A34A" />
                </View>
              )}
            </View>
            <Pressable className="absolute bottom-0 right-0 bg-green-600 p-1.5 rounded-full active:bg-green-700">
              <Feather name="camera" size={16} color="white" />
            </Pressable>
          </View>
          <Text className="text-xl font-bold text-gray-800">{formData.name}</Text>
          <Text className="text-gray-600 text-sm mt-1">
            {formData.barangay}, Zamboanga City
          </Text>
          {!isEditing && (
            <Pressable
              onPress={() => setIsEditing(true)}
              className="mt-3 border border-green-600 rounded-lg py-2 px-6 active:bg-green-50"
            >
              <Text className="text-green-600 font-medium text-sm">Edit Profile</Text>
            </Pressable>
          )}
        </View>

        <View className="px-5">
          {isEditing ? (
            <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <Text className="font-semibold text-base mb-4 text-gray-800">Edit Profile</Text>
              
              <View className="space-y-4">
                {/* Full Name */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-700 mb-1.5">Full Name</Text>
                  <TextInput
                    value={formData.name}
                    onChangeText={(value) => handleChange('name', value)}
                    className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
                  />
                </View>

                {/* Email */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-700 mb-1.5">Email</Text>
                  <TextInput
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
                  />
                </View>

                {/* Phone Number */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-700 mb-1.5">Phone Number</Text>
                  <TextInput
                    value={formData.phone_number}
                    onChangeText={(value) => handleChange('phone_number', value)}
                    keyboardType="phone-pad"
                    className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
                  />
                </View>

                {/* House No & Street */}
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <Text className="text-sm text-gray-700 mb-1.5">House No</Text>
                    <TextInput
                      value={formData.house_no}
                      onChangeText={(value) => handleChange('house_no', value)}
                      className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-700 mb-1.5">Street</Text>
                    <TextInput
                      value={formData.street}
                      onChangeText={(value) => handleChange('street', value)}
                      className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
                    />
                  </View>
                </View>

                {/* Barangay - Note: For select, you'd need a picker library or modal */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-700 mb-1.5">Barangay</Text>
                  <TextInput
                    value={formData.barangay}
                    onChangeText={(value) => handleChange('barangay', value)}
                    className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-800"
                  />
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3 mt-6">
                <Pressable
                  onPress={() => setIsEditing(false)}
                  className="flex-1 border border-gray-300 rounded-lg py-3 active:bg-gray-50"
                >
                  <Text className="text-gray-700 text-center font-medium">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleSave}
                  className="flex-1 bg-green-600 rounded-lg py-3 active:bg-green-700"
                >
                  <Text className="text-white text-center font-semibold">Save Changes</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <Text className="font-semibold text-base mb-3 text-gray-800">Personal Information</Text>
              
              <View className="space-y-3">
                {/* Email */}
                <View className="flex-row items-center py-2">
                  <Feather name="mail" size={18} color="#6B7280" />
                  <View className="ml-3">
                    <Text className="text-xs text-gray-500">Email</Text>
                    <Text className="text-sm text-gray-800">{formData.email}</Text>
                  </View>
                </View>

                {/* Phone */}
                <View className="flex-row items-center py-2">
                  <Feather name="phone" size={18} color="#6B7280" />
                  <View className="ml-3">
                    <Text className="text-xs text-gray-500">Phone</Text>
                    <Text className="text-sm text-gray-800">{formData.phone_number}</Text>
                  </View>
                </View>

                {/* Address */}
                <View className="flex-row items-start py-2">
                  <Feather name="map-pin" size={18} color="#6B7280" style={{ marginTop: 2 }} />
                  <View className="ml-3 flex-1">
                    <Text className="text-xs text-gray-500">Address</Text>
                    <Text className="text-sm text-gray-800">
                      {formData.house_no} {formData.street}, {formData.barangay}, Zamboanga City
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Logout Button */}
          <Pressable
            onPress={handleLogout}
            className="flex-row items-center justify-center py-4 active:bg-red-50 rounded-lg"
          >
            <Feather name="log-out" size={18} color="#DC2626" />
            <Text className="text-red-600 font-semibold ml-2">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;