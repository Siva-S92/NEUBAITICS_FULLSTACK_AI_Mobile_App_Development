import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";
import GridChart from "../components/ScatterChart";
import TableView from "../components/DataTable";
import Toast from "react-native-toast-message";

function dashboard() {
  const backend = "https://neubaitics-fullstack-ai-backend.vercel.app";

  const router = useRouter();

  const [total_reviews, setTotalReviews] = useState([]);

  // Fetch reviews from backend
  const fetchTotalReviews = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Get token from AsyncStorage
      const res = await axios.get(`${backend}/api/review/get-allreviews`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        setTotalReviews(res.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     // Store the current pathname before navigating to login
  //     localStorage.setItem("redirectUrl", window.location.pathname);

  //     // Use setTimeout to delay the navigation until after the update
  //     setTimeout(() => {
  //       navigate("/login", { replace: true });
  //     }, 0); // The timeout is set to 0 to execute after the current call stack
  //   } else {
  //     fetchTotalReviews();
  //   }
  // }, [fetchTotalReviews, navigate]);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      router.push("/(tabs)/login");
      Toast.show({
        type: "success",
        text1: "Logged out!!!!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong while logging out",
      });
    }
  };

  useEffect(() => {
    // Create an async function to check the token and perform logic
    const checkTokenAndFetchData = async () => {
      const token = await AsyncStorage.getItem("token"); // Wait for the token asynchronously

      if (!token) {
        // Store the current pathname before navigating to login
        await AsyncStorage.setItem("redirectUrl", "/(tabs)/dashboard");

        // Use setTimeout to delay the navigation until after the update
        setTimeout(() => {
          router.push("/(tabs)/login");
        }, 0); // The timeout is set to 0 to execute after the current call stack
      } else {
        // If the token exists, fetch the reviews
        fetchTotalReviews();
      }
    };

    checkTokenAndFetchData(); // Call the async function inside useEffect
  }, [fetchTotalReviews, router, logout]);

  return (
    <>
      <View>
        <TouchableOpacity onPress={logout}>
          <Text className="text-center text-blue-500 underline underline-offset-4 my-5">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mb-10">
      <GridChart total_reviews={total_reviews} />
      </View>
      <View className="bg-pink-200">
      <TableView total_reviews={total_reviews}  />
      </View>
    </>
  );
}

export default dashboard;
