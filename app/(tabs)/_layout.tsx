import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "lightpink",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => (
            <>
              <Icon name="home" size={30} color="dodgerblue" />
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          headerShown: false,
          tabBarIcon: () => (
            <>
              <Icon name="shopping-bag" size={30} color="dodgerblue" />
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: () => (
            <>
              <Icon name="dashboard" size={30} color="dodgerblue" />
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
          tabBarIcon: () => (
            <>
              <Icon name="account-circle" size={30} color="dodgerblue" />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
