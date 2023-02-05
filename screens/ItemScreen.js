import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../hook/auth";

const ItemScreen = ({ route }) => {
  const { sttate } = useContext(AuthContext);
  const navigation = useNavigation();
  const data = route?.params?.param;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleBooking = () => {
    if (state.userToken) {
      navigation.navigate("PaymentScreen", { data });
    } else {
      navigation.navigate("Login", { back: "ItemScreen", data });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="absolute flex-row inset-x-0 top-7 h-max z-10 justify-between px-6">
        <TouchableOpacity
          onPress={() => navigation.navigate(route.params.back)}
          className="w-10 h-10 rounded-md items-center justify-center bg-white"
        >
          <Entypo name="chevron-left" size={24} color="#06b2bb" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#06b2bb]">
          <FontAwesome5 name="heartbeat" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg",
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />

          <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
            <View className="flex-row space-x-2 items-center">
              <Text className="text-[12px] font-bold text-gray-100">
                {data?.price_level}
              </Text>
              <Text className="text-[24px] font-bold text-white">
                {data?.price}
              </Text>
            </View>

            <View
              className={`px-2 py-2 rounded-md ${
                data?.open_now_text === "Open Now"
                  ? "bg-green-400"
                  : "bg-red-400"
              }`}
            >
              <Text className="font-bold text-white">
                {data?.open_now_text ?? "Closed Now"}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-[#428288] text-[24px] font-bold">
            {data?.name}
          </Text>
          <View className="flex-row items-center space-x-2 mt-2">
            <FontAwesome5 name="map-marker" size={25} color="#8c9ea6" />
            <Text className="text-[#8c9ea6] text-[20px] font-bold">
              {data?.location_string}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-center">
          {data?.rate && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="star" size={24} color="#D58874" />
              </View>
              <View className="text-[#515151]">{data?.rating}</View>
              <View className="text-[#515151]">Ratings</View>
            </View>
          )}

          {data?.price_level && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <MaterialIcons name="attach-money" size={24} color="black" />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.price_level}</Text>
                <Text className="text-[#515151]">Price Level</Text>
              </View>
            </View>
          )}

          {data?.bearing && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="map-signs" size={24} color="black" />
              </View>
              <View>
                <Text className="text-[#515151] capitalize">
                  {data?.bearing}
                </Text>
                <Text className="text-[#515151] capitalize">Bearing</Text>
              </View>
            </View>
          )}
        </View>

        {data?.description && (
          <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97a6af]">
            {data?.description}
          </Text>
        )}

        {data?.cuisine && (
          <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
            {data?.cuisine.map((n) => (
              <TouchableOpacity
                key={n.key}
                className="px-2 py-1 rounded-md bg-emerald-100"
              >
                <Text>{n.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
          {data?.phone && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="phone" size={24} color="#428282" />
              <Text className="text-lg">{data?.phone}</Text>
            </View>
          )}
          {data?.email && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="envelope" size={24} color="#428282" />
              <Text className="text-lg">{data?.email}</Text>
            </View>
          )}
          {data?.address && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="map-pin" size={24} color="#428282" />
              <Text className="text-lg">{data?.address}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleBooking}
            className="mt-4 px-4 py-4 rounded-lg bg-[#06b2be] items-center justify-center mb-12"
          >
            <Text className="text-3xl font-semibold uppercase tracking-wider text-gray-100">
              Book now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
