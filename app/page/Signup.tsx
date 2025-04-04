import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert } from 'react-native';
import Toast from 'react-native-toast-message';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const backend = "https://neubaitics-fullstack-ai-backend.vercel.app";

  

  const handleSignUp = async () => {
    if (!username || !email || !password) {
        Alert.alert('Error', 'All fields are required');
        return;
      }
    try {
      let formData = { username, email, password };
      const res = await axios.post(`${backend}/api/user/register`, formData);
      if (res.data.success) {
        
        Toast.show({
                  type: "success",
                  text1: res.data.message,
                });
        router.push("/(tabs)/login");
      }
    } catch (error: unknown) {
      if(error instanceof Error){
        Toast.show({
            type: "error",
            text1: error.message,
          });
      }
      
        
    }
  };

  return (
    <View className='flex-1 bg-pink-100 justify-center p-4'>
      <Text className='text-2xl font-bold text-center mb-4'>Please Signup</Text>

      {/* Username Input */}
      <View className='mb-4'>
        <Text className='text-lg font-medium'>Username</Text>
        <TextInput
          className='border-2 border-gray-300 p-2 rounded-md mt-1'
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Email Input */}
      <View className='mb-4'>
        <Text className='text-lg font-medium'>Email</Text>
        <TextInput
          className='border-2 border-gray-300 p-2 rounded-md mt-1'
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View className='mb-6'>
        <Text className='text-lg font-medium'>Password</Text>
        <TextInput
          className='border-2 border-gray-300 p-2 rounded-md mt-1'
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSignUp} />
    </View>
  );
};

export default Signup;
