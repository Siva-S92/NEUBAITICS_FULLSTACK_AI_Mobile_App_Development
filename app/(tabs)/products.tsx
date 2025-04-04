import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";


const products = () => {
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
 const backend = "https://neubaitics-fullstack-ai-backend.vercel.app";

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${backend}/api/products/get-products`);
      if (res.data.success) {
        setProducts(res.data.products);
        setIsLoading(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <View className="flex-1 bg-pink-100">
      {isLoading && (
        <ActivityIndicator
          size={"large"}
          color="blue"
          className="mt-20 self-center"
        />
      )}
      <FlatList 
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          alignItems: 'center',
          gap: 20,
          paddingLeft: 6,
          paddingRight: 3,
          marginBottom: 10,
        }}
        scrollEnabled={true}
        className="mt-2 pb-32"
      />
    </View>
  );
};

export default products;
