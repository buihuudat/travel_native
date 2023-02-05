import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { ImageLogin } from "../../assets";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../hook/auth";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
// import { GoogleLogin } from "../../api/googleLogin";
const Login = ({ route }) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState(null);
  const [passwordErrorText, setPasswordErrorText] = useState(null);

  const { handlers } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSubmit = () => {
    let err = false;
    if (phone === "") {
      setPhoneErrorText("Phone is required");
      err = true;
    }
    if (password === "") {
      setPasswordErrorText("Password is required");
      err = true;
    }
    // if (password.length < 8) {
    //   setPasswordErrorText("Password must be at 8 characters");
    //   err = true;
    // }

    if (err) {
      return;
    }

    setPhoneErrorText(null);
    setPasswordErrorText(null);
    Keyboard.dismiss();

    try {
      handlers.signIn({ phone, password });
      navigation.navigate("DiscoverScreen");
    } catch (e) {
      Alert.alert("Login failure ", e.message);
      return;
    }
  };

  const handleBack = () => {
    navigation.navigate(route.params?.back, { param: route.params.data });
  };

  const StyleView = styled(View);
  const StyleImage = styled(Image);
  const StyleText = styled(Text);
  const StyleTextInput = styled(TextInput);
  const StyleButton = styled(Button);

  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity
        onPress={handleBack}
        className="w-10 h-10 rounded-md items-center justify-center z-10 mt-8 ml-4"
      >
        <Entypo name="chevron-left" size={24} color="#06b2bb" />
      </TouchableOpacity>
      <StyleView></StyleView>
      <StyleView className="mt-3 h-[150]">
        <StyleImage
          source={ImageLogin}
          className="-mt-20 w-full h-max relative"
          resizeMode="center"
        />
      </StyleView>
      <StyleText className="text-center font-bold text-[30px] text-[#0b646b]">
        Login to your Account
      </StyleText>
      <StyleView className="m-3 space-y-8">
        <StyleView>
          <StyleTextInput
            className={`w-full h-10 border-b-2 border-solid border-[#0b646b] rounded ${
              phoneErrorText && "border-red-400"
            }`}
            style={{ padding: 10 }}
            value={phone}
            onChangeText={(e) => setPhone(e)}
            placeholder="Phone"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="numeric"
            autoCorrect={false}
          />
          {phoneErrorText && (
            <StyleText style={{ color: "red", fontStyle: "italic" }}>
              {phoneErrorText}
            </StyleText>
          )}
        </StyleView>
        <StyleView>
          <StyleTextInput
            className={`w-full h-10 border-b-2 border-solid border-[#0b646b] rounded ${
              passwordErrorText && "border-red-400"
            }`}
            style={{ padding: 10 }}
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder="Password"
            secureTextEntry
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
          />
          {passwordErrorText && (
            <StyleText style={{ color: "red", fontStyle: "italic" }}>
              {passwordErrorText}
            </StyleText>
          )}
        </StyleView>

        <StyleView className="">
          <StyleButton title="Submit" onPress={handleSubmit} />
        </StyleView>
      </StyleView>

      <StyleText className="text-center">-Or Login With-</StyleText>

      <StyleView className="flex-row justify-center gap-4 pt-3">
        <StyleView className="bg-[#2fafe2] flex-row  w-[100px]  m-2 p-3 rounded-md font-bold">
          <AntDesign name="google" size={24} color="white" />
          <StyleText className="text-center text-white">oogle</StyleText>
        </StyleView>
        <StyleView className="bg-[#2fafe2] flex-row  w-[100px]  m-2 p-3 rounded-md font-bold">
          <FontAwesome name="facebook" size={20} color="white" />
          <StyleText className="text-center text-white">acebook</StyleText>
        </StyleView>
      </StyleView>

      <StyleView className="flex justify-center text-center mt-10">
        <StyleText style={{ textAlign: "center" }}>
          Don't have an account{" "}
          <StyleText
            className="text-[#4ee629] font-bold"
            onPress={() => navigation.navigate("Register")}
          >
            Register now
          </StyleText>
        </StyleText>
      </StyleView>
    </SafeAreaView>
  );
};

export default Login;
