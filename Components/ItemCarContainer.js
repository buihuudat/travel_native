import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ItemCarContainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();
  return (
    location && (
      <TouchableOpacity
        onPress={() => navigation.navigate("ItemScreen", { param: data })}
        className="rounded-md border border-gray-300 space-y-2 px-3 shadow-md bg-white w-[182px] py-2 my-2"
      >
        <Image
          source={{ uri: imageSrc }}
          style={{
            width: 100,
            height: 100,
            objectFit: "contain",
            borderRadius: 6,
          }}
        />
        <Text className="text-[#428288] text-[18px] font-bold">
          {title?.length > 14 ? `${title.slice(0, 14)}..` : title}
        </Text>
        <View
          className="flex-row items-center space-x-1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FontAwesome name="map-marker" size={20} color="#8597a2" />
          <Text className="text-[#428288] text-[14px] font-bold">
            {location?.length > 14 ? `${location.slice(0, 14)}..` : location}
          </Text>
        </View>
      </TouchableOpacity>
    )
  );
};

export default ItemCarContainer;
