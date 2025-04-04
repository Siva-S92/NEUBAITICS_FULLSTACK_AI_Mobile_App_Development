import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
    placeholder: string;
    onPress?: () => void;
}

const Searchbox = ({placeholder, onPress}: Props) => {

  return (
    <View className='flex-row items-center bg-blue-500 rounded-full px-5 py-4 mb-5'>
      <Icon name="search" size={30} color="white" />
      <TextInput
      onPress={onPress}
      placeholder={placeholder}
      placeholderTextColor={'white'}
      value=''
      onChangeText={() => {}}
      className='flex-1 ml-2 text-white'
       />
    </View>
  )
}

export default Searchbox