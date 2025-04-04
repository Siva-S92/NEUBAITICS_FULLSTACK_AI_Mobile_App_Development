import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const ProductCard = ({ product }: any) => {
  return (
    <Link href={`/product/${product._id}`} asChild>
      <TouchableOpacity className="w-[50%]">
        <View className="w-full h-80 px-3 py-2 rounded-md border border-pink-200">
          <Image
            className="w-full h-[60%]"
            source={{
              uri: product.thumbnail,
            }}
            resizeMode="cover"
          />
          <View className="w-full h-[40%] justify-center">
            <Text className="">{product.title}</Text>
            <Text className="">Category:{product.category}</Text>
            <Text className="">Price:{product.price}$</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductCard;
