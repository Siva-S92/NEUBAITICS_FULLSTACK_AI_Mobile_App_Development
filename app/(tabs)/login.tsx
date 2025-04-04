import axios from "axios";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

const login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backend = "https://neubaitics-fullstack-ai-backend.vercel.app";

  const router = useRouter();

  const HandleLogin = async () => {
    // Basic validation (you can improve this)
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    let formData = { email, password };

    try {
      const res = await axios.post(`${backend}/api/user/login`, formData);

      // Check if the login was successful
      if (res.data.success) {
        console.log(res.data.user);

        setEmail('');
        setPassword('')
        // Show a success toast
        Toast.show({
          type: "success",
          text1: res.data.message,
        });

        // Store token and username in AsyncStorage
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("username", res.data.user.username);

        // Fetch the redirectUrl from AsyncStorage
        const redirectUrl = await AsyncStorage.getItem("redirectUrl");

        if (redirectUrl) {
          router.push(redirectUrl as any); // Type assertion here
        } else {
          router.push("/(tabs)"); // Default redirect to home
        }
      } else {
        // Handle the case where the login was unsuccessful
        Toast.show({
          type: "error",
          text1: "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      if(error instanceof Error){
        console.log(error.message)
        Toast.show({
          type: "error",
          text1: "Login failed.",
        });
      }
      
    }
  };

  return (
    <View className="flex-1 bg-pink-100 justify-center p-4">
      <Text className="text-2xl font-bold text-center mb-4">Please Login</Text>

      {/* Email Input */}
      <View className="mb-4">
        <Text className="text-lg font-medium">Email</Text>
        <TextInput
          className="border-2 border-gray-300 p-2 rounded-md mt-1"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <Text className="text-lg font-medium">Password</Text>
        <TextInput
          className="border-2 border-gray-300 p-2 rounded-md mt-1"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Submit Button */}
      <Button title="Submit" onPress={HandleLogin} />

      <TouchableOpacity>
        <Text
          onPress={() => router.push("/page/Signup")}
          className="text-blue-500 text-sm mt-2 underline"
        >
          if you don't have account, do signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;
