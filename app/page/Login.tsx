import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const backend = "https://neubaitics-fullstack-ai-backend.vercel.app";

  const HandleLogin = async () => {
    let formData = { email, password };
    try {
      const res = await axios.post(`${backend}/api/user/login`, formData);
      if (res.data.success) {
        console.log(res.data.user);
        Toast.show({
          type: "success",
          text1: res.data.message,
        });

        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("username", res.data.user.username);
        const redirecturl = await AsyncStorage.getItem("redirectUrl"); // Get token from AsyncStorage
        if (redirecturl) {
          router.push(`/`);
        } else {
          router.push("/"); // Default redirect to home or main screen
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        Toast.show({
          type: "error",
          text1: error.message,
        });
      } else {
        console.log("An unexpected error occurred", error);
      }
    }
  };
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
