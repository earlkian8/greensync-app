import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  ScrollView,
  Pressable 
} from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../_layout";
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const router = useRouter();
  return (  
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-6 py-10">

          <View className="items-center mb-12">
            <Image
              source={require("@/assets/logo/whitebg.png")}
              style={{ width: 3000, height: 150, resizeMode: "contain" }}
            />
            <Text className="text-gray-600 text-lg font-medium mt-2">
              Smart Waste Management
            </Text>
          </View>

          <View className="w-full max-w-sm">
            <View className="mb-4">
              <Text className="text-gray-700 mb-1 font-medium">Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                className="border border-gray-300 w-full rounded-lg p-3 text-base"
              />
            </View>

            <View className="mb-2">
              <Text className="text-gray-700 mb-1 font-medium">Password</Text>
              <View className="relative">
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="border border-gray-300 w-full rounded-lg p-3 text-base pr-12"
                />
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-0 bottom-0 justify-center"
                >
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={24} 
                    color="gray" 
                  />
                </Pressable>
              </View>
            </View>

            <TouchableOpacity className="self-end mt-1">
              <Text className="text-green-600 text-sm font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="p-4 bg-green-500 rounded-lg mt-6" onPress={() => {
                router.replace('/home');
            }}>
              <Text className="text-white text-center text-base font-semibold">
                Login
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-600">Don’t have an account? </Text>
              <Link href={'/auth/register'}>
                <Text className="text-green-600 font-medium">Create Account</Text>
              </Link>
            </View>
          </View>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
