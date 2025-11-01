import { View, Text, Pressable } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const BinsCard = ({name, status, lastCollected, qrCode}) => {
    const isActive = status === "Active";
    
    return (
        <Pressable 
            onPress={() => console.log("Bin pressed:", name)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 overflow-hidden active:bg-gray-50"
        >
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 pb-3">
                <Text className="text-lg font-bold text-gray-800">{name}</Text>
                <View className={`px-3 py-1.5 rounded-full ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Text className={`text-xs font-semibold ${isActive ? 'text-green-700' : 'text-gray-600'}`}>
                        {status}
                    </Text>
                </View>
            </View>

            {/* Details */}
            <View className="flex-row justify-between items-center px-4 pb-4">
                <View className="flex-1">
                    {/* QR Code */}
                    <View className="flex-row items-center mb-2">
                        <View className="g-gray-100 p-1.5 rounded-md mr-2">
                            <AntDesign name="qrcode" size={14} color="#4B5563" />
                        </View>
                        <Text className="text-sm text-gray-600 font-medium">{qrCode}</Text>
                    </View>
                    
                    {/* Last Collected */}
                    <View className="flex-row items-center">
                        <View className="bg-gray-100 p-1.5 rounded-md mr-2">
                            <Feather name="calendar" size={14} color="#4B5563" />
                        </View>
                        <Text className="text-xs text-gray-500">
                            Last collected: <Text className="font-medium text-gray-600">{lastCollected}</Text>
                        </Text>
                    </View>
                </View>

                {/* Arrow Icon */}
                <View className="bg-gray-100 p-2 rounded-full ml-3">
                    <AntDesign name="arrow-right" size={16} color="#6B7280" />
                </View>
            </View>
        </Pressable>
    );
}

export default BinsCard;