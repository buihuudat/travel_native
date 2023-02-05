import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
const ItemCarContainer = ({ imageSrc, title, location, data, back }) => {
  const navigation = useNavigation();

  const StyleText = styled(Text);
  const StyleView = styled(View);
  const StyleImage = styled(Image);
  const StyleTouch = styled(TouchableOpacity);

  return (
    location && (
      <StyleTouch
        onPress={() => navigation.navigate("ItemScreen", { param: data, back })}
        className="rounded-md border space-y-1 px-3 w-[182px] py-2 my-2"
      >
        <StyleImage
          source={{ uri: imageSrc }}
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
        <StyleText className="text-[#428288] text-[18px] font-bold">
          {title?.length > 13 ? `${title.slice(0, 13)}..` : title}
        </StyleText>
        <StyleView
          className="flex-row items-center space-x-1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FontAwesome name="map-marker" size={16} color="#8597a2" />
          <StyleText className="text-[#428288] text-[12px] font-bold">
            {location?.length > 14 ? `${location.slice(0, 14)}..` : location}
          </StyleText>
        </StyleView>
      </StyleTouch>
    )
  );
};

export default ItemCarContainer;
