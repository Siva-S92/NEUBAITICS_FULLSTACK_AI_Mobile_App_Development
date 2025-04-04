import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import AddReview from "../../components/AddReview";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  interface Product {
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    price: number;
    stock: number;
    rating: number;
    // Add other fields here that are relevant to your product
  }

  const [current_product, setCurrentProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<any>([]);
  const backend = "https://neubaitics-fullstack-ai-backend.vercel.app";

  const fetchAllReviews = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Get token from AsyncStorage
      const res = await axios.get(`${backend}/api/review/get-reviews/${id}`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        setReviews(res.data.reviews);
        console.log(res.data.reviews);
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    }
  }, []);

  // Fetch product data
  const getCurrentProduct = useCallback(async () => {
    try {
      const res = await axios.get(`${backend}/api/products/get-product/${id}`);
      if (res.data.success) {
        setCurrentProduct(res.data.product);
        console.log(res.data.product);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    }
  }, []);

  useEffect(() => {
    // Create an async function to check the token and perform logic
    const checkTokenAndFetchData = async () => {
      const token = await AsyncStorage.getItem("token"); // Wait for the token asynchronously

      if (!token) {
        // Store the current pathname before navigating to login
        await AsyncStorage.setItem("redirectUrl", `/product/${id}`);

        // Use setTimeout to delay the navigation until after the update
        setTimeout(() => {
          router.push("/(tabs)/login");
        }, 0); // The timeout is set to 0 to execute after the current call stack
      } else {
        // If the token exists, fetch the current product and reviews
        getCurrentProduct();
        fetchAllReviews();
      }
    };

    checkTokenAndFetchData(); // Call the async function inside useEffect
  }, [getCurrentProduct, fetchAllReviews, router, id]); // Ensure `id` is included in the dependencies

  if (!current_product) {
    return (
      <View className="w-full min-h-screen flex justify-center items-center">
        <ActivityIndicator
          size={"large"}
          color="blue"
          className="mt-20 self-center"
        />
      </View>
    ); // Placeholder while the product is being fetched
  }

  return (
    <ScrollView>
      <View className="bg-white py-6 px-4 space-y-6">
        <TouchableOpacity>
          <Text onPress={() => router.push("/(tabs)/products")} className="text-center text-lg font-semibold text-blue-500 underline underline-offset-4 mt-2">
            Go&nbsp;to&nbsp;All&nbsp;Products
          </Text>
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-gray-800 mt-4">
          Product Details
        </Text>

        {/* Render product and reviews */}
        {current_product && (
          <View className="w-full h-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <Image
              source={{
                uri: current_product.thumbnail,
              }}
              resizeMode="contain"
              className="w-full h-64 object-cover"
            />
            <View className="p-4 space-y-2">
              <Text className="text-xl font-semibold text-gray-900">
                {current_product.title}
              </Text>
              <Text className="text-sm text-gray-600">
                {current_product.category}
              </Text>
              <Text className="text-lg font-semibold text-gray-900">
                {current_product.price}
              </Text>
              <Text className="text-gray-700">
                {current_product.description}
              </Text>
            </View>
          </View>
        )}

        <View className="mt-5">
          <AddReview id={id} fetchAllReviews={fetchAllReviews} />

          {reviews.length > 0 && (
            <View>
              <Text className="text-xl font-semibold text-gray-800">
                Reviews:
              </Text>
              {reviews.map((review: any) => (
                <View
                  key={review._id}
                  className="mt-4 p-4 border-b border-gray-100"
                >
                  <View className="flex-row items-center gap-2">
                    <Icon name="account-circle" size={30} color="gray" />
                    <Text className="text-lg font-semibold text-gray-900 ">
                      {review.userId.username}
                    </Text>
                  </View>
                  <Text className="text-gray-600 mt-1">{review.comment}</Text>
                  <Text className="text-sm text-gray-500 mt-2">
                    Sentiment: {review.result.label}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
