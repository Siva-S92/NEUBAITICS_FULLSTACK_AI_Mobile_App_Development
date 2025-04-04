import React, { useState } from "react";
import axios from "axios";

import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddReview = ({ id, fetchAllReviews }: any) => {
  const backend = "https://neubaitics-fullstack-ai-backend.vercel.app";

  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = async () => {
    try {
      // Form data to be sent to the backend
      let formData = { productId: id, comment: reviewText };
      console.log(formData);
      let token = await AsyncStorage.getItem("token");

      // Sending POST request to the backend
      const res = await axios.post(
        `${backend}/api/review/create-review`,
        formData,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the review was created successfully
      if (res.data.success) {
        setReviewText("");
        fetchAllReviews();
        console.log(res.data.new_review); // Log new review

        Toast.show({
          type: "success",
          text1: res.data.message,
        });
      } else {
        // Handle error if the response is unsuccessful
        console.log(res.data.message);
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    }
  };

  return (
    <View className="w-full max-w-xl mx-auto p-2 bg-white shadow-lg rounded-lg">
      <Text className="text-1xl font-semibold text-gray-800 mb-2">
        Write a Review
      </Text>
      <TextInput
        multiline
        numberOfLines={12}
        value={reviewText}
        onChangeText={(inputText) => setReviewText(inputText)}
        placeholder="Write your review here..."
        className="w-full h-28 p-4 border-2 border-gray-300 rounded-md"
      />
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-sm text-gray-500">{reviewText.length} / 500</Text>
        <TouchableOpacity className="bg-blue-600 py-2 px-8 rounded-md">
          <Text onPress={handleReviewSubmit} className="text-white">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddReview;
