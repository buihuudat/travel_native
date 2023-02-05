import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styled } from "nativewind";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };

  const StyleView = styled(View);
  const StyleImage = styled(Image);
  const StyleText = styled(Text);

  return (
    <TouchableOpacity
      className="items-center justify-center space-y-2"
      onPress={handlePress}
    >
      <StyleView className="w-20 h-16 flex flex-col p-2 shadow-sm rounded-full items-center justify-center">
        <StyleImage
          source={imageSrc}
          className="w-full h-full object-contain"
        />
        <StyleText
          style={
            type === title.toLowerCase()
              ? { color: "#00BCC9" }
              : { color: "#444" }
          }
        >
          {title}
        </StyleText>
      </StyleView>
    </TouchableOpacity>
  );
};

export default MenuContainer;
