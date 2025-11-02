import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import BinsCard from "@/components/BinsCard";
import Feather from '@expo/vector-icons/Feather';
import BinModal from "@/components/BinModal";
import BinDetailModal from "@/components/BinDetailModal";
import Toast from "@/components/Toast";
import { fetchBins, createBin, updateBin, deleteBin, formatBinData } from '@/services/binsService';

const Bins = () => {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success"
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  // Load bins on component mount
  useEffect(() => {
    loadBins();
  }, []);

  // Load bins from API
  const loadBins = async () => {
    try {
      setLoading(true);
      const result = await fetchBins();
      
      if (result.success) {
        const formattedBins = result.data.map(bin => formatBinData(bin));
        setBins(formattedBins);
      } else {
        showToast(result.error || 'Failed to load bins', 'error');
      }
    } catch (error) {
      console.error('Error loading bins:', error);
      showToast('An unexpected error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadBins();
    setRefreshing(false);
  }, []);

  // Handle adding new bin
  const handleAddBin = async (formData) => {
    try {
      const result = await createBin(formData);
      
      if (result.success) {
        // Format and add new bin to the list
        const formattedBin = formatBinData(result.data);
        setBins([formattedBin, ...bins]);
        setModalVisible(false);
        showToast(result.message || 'Bin registered successfully', 'success');
      } else {
        // Handle validation errors
        if (typeof result.error === 'object') {
          const errorMessages = Object.values(result.error).flat().join(', ');
          showToast(errorMessages, 'error');
        } else {
          showToast(result.error || 'Failed to register bin', 'error');
        }
        return false; // Indicate failure
      }
      return true; // Indicate success
    } catch (error) {
      console.error('Error adding bin:', error);
      showToast('An unexpected error occurred', 'error');
      return false;
    }
  };

  // Handle bin press to show details
  const handleBinPress = (bin) => {
    setSelectedBin(bin);
    setDetailModalVisible(true);
  };

  // Handle updating bin
  const handleUpdateBin = async (binId, updatedData) => {
    try {
      const result = await updateBin(binId, updatedData);
      
      if (result.success) {
        // Update bin in local state
        setBins(bins.map(bin => 
          bin.id === binId 
            ? formatBinData(result.data)
            : bin
        ));
        
        // Update selected bin if it's currently open
        if (selectedBin?.id === binId) {
          setSelectedBin(formatBinData(result.data));
        }
        
        showToast(result.message || 'Bin updated successfully', 'success');
        return true;
      } else {
        showToast(result.error || 'Failed to update bin', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error updating bin:', error);
      showToast('An unexpected error occurred', 'error');
      return false;
    }
  };

  // Handle deleting bin
  const handleDeleteBin = async (binId) => {
    try {
      const result = await deleteBin(binId);
      
      if (result.success) {
        // Remove bin from local state
        setBins(bins.filter(bin => bin.id !== binId));
        showToast(result.message || 'Bin deleted successfully', 'success');
        return true;
      } else {
        showToast(result.error || 'Failed to delete bin', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error deleting bin:', error);
      showToast('An unexpected error occurred', 'error');
      return false;
    }
  };

  // Filter bins based on search
  const filteredBins = bins.filter(bin => 
    bin.name.toLowerCase().includes(search.toLowerCase()) ||
    bin.qrCode.toLowerCase().includes(search.toLowerCase()) ||
    bin.binType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
      >
        {/* Toast Notification */}
        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={hideToast}
        />

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
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#16A34A" />
            <Text className="text-gray-500 mt-3">Loading bins...</Text>
          </View>
        ) : filteredBins.length === 0 ? (
          <View className="flex-1 items-center justify-center px-5">
            <Feather name="inbox" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg font-semibold mt-4">
              {search ? 'No bins found' : 'No bins registered yet'}
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              {search 
                ? 'Try a different search term' 
                : 'Tap the Add button to register your first bin'}
            </Text>
          </View>
        ) : (
          <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#16A34A']}
                tintColor="#16A34A"
              />
            }
          >
            {filteredBins.map((bin) => (
              <BinsCard
                key={bin.id}
                bin={bin}
                onPress={handleBinPress}
              />
            ))}
          </ScrollView>
        )}

        {/* Add Bin Modal */}
        <BinModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddBin}
        />

        {/* Bin Detail Modal */}
        <BinDetailModal
          visible={detailModalVisible}
          onClose={() => setDetailModalVisible(false)}
          bin={selectedBin}
          onUpdate={handleUpdateBin}
          onDelete={handleDeleteBin}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Bins;