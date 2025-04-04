import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Searchbox from "../components/Searchbox";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const buttons = ["Go to Shopping", "See your Offers", "Free Delivery"];
  return (
    <>
      <View className="flex-1 bg-pink-300">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 10,
          }}
          className="flex-1 px-5 "
        >
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-12 h-12 mt-20 mb-5 mx-auto bg-yellow-100 p-12 rounded-full"
          />

          <View className="flex-1 my-5 ">
            <Searchbox
              onPress={() => router.push("/(tabs)/products")}
              placeholder="Search for Products"
            />
          </View>

          <View className="flex-1 justify-center gap-14">
            {/* <FlatList
              data={buttons}
              renderItem={({ item }) => (
                <Text className="text-white text-2xl text-center bg-green-500 p-6 rounded-full my-5">
                  {item}
                </Text>
              )}
            /> */}
            {buttons.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (item === "Go to Shopping")
                    router.push("/(tabs)/products");
                }}
              >
                <Text className="text-white text-2xl text-center bg-green-500 p-6 rounded-full">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => router.push("/(tabs)/dashboard")}>
              <Text className="text-white text-2xl text-center bg-red-500 p-6 rounded-full">
                Go to Dashboard
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
