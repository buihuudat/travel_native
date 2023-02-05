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
  ScrollView,
} from "react-native";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { ImageLogin } from "../../assets";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../hook/auth";

const Register = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState(null);
  const [passwordErrorText, setPasswordErrorText] = useState(null);
  const [cfPasswordErrorText, setCfPasswordErrorText] = useState(null);
  const [firstNameErrorText, setFirstNameErrorText] = useState(null);
  const [lastNameErrorText, setLastNameErrorText] = useState(null);

  const { handlers } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSubmit = () => {
    let err = false;
    if (firstName === "") {
      setFirstNameErrorText(1);
      err = true;
    }
    if (lastName === "") {
      setLastNameErrorText(1);
      err = true;
    }
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

    if (cfPassword === "") {
      setCfPasswordErrorText("Password is required");
      err = true;
    } else if (password !== cfPassword) {
      setCfPasswordErrorText("Password not match");
      err = true;
    }

    if (err) {
      return;
    }

    setPhoneErrorText(null);
    setPasswordErrorText(null);
    setLastNameErrorText(null);
    setFirstNameErrorText(null);
    setCfPasswordErrorText(null);

    const data = {
      firstName,
      lastName,
      phone,
      password,
    };

    try {
      handlers.signUp(data);
      navigation.navigate("DiscoverScreen");
    } catch (e) {
      Alert.alert("Register failure ", e);
    }
  };

  const handleBack = () => {
    navigation.navigate("Login");
  };

  const StyleView = styled(View);
  const StyleImage = styled(Image);
  const StyleText = styled(Text);
  const StyleTextInput = styled(TextInput);
  const StyleButton = styled(Button);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <TouchableOpacity
          onPress={handleBack}
          className="w-10 h-10 rounded-md items-center justify-center z-10 mt-0 ml-4"
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
          Register to your Account
        </StyleText>
        {/* form */}
        <StyleView className="m-3 space-y-8 mt-10">
          <StyleView className="flex-row w-full justify-around">
            <StyleView className="w-[40%]">
              <StyleTextInput
                className={`w-full h-10 border-b-2 border-solid border-[#0b646b] text-center rounded ${
                  firstNameErrorText && "border-red-400"
                }`}
                style={{ padding: 10 }}
                value={firstName}
                onChangeText={(e) => setFirstName(e)}
                placeholder="First Name"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </StyleView>
            <StyleView className="w-[40%]">
              <StyleTextInput
                className={`w-full text-center h-10 border-b-2 border-solid border-[#0b646b] rounded ${
                  lastNameErrorText && "border-red-400"
                }`}
                style={{ padding: 10 }}
                value={lastName}
                onChangeText={(e) => setLastName(e)}
                placeholder="Last Name"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </StyleView>
          </StyleView>

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
            />
            {passwordErrorText && (
              <StyleText style={{ color: "red", fontStyle: "italic" }}>
                {passwordErrorText}
              </StyleText>
            )}
          </StyleView>
          <StyleView>
            <StyleTextInput
              className={`w-full h-10 border-b-2 border-solid border-[#0b646b] rounded ${
                cfPasswordErrorText && "border-red-400"
              }`}
              style={{ padding: 10 }}
              value={cfPassword}
              onChangeText={(e) => setCfPassword(e)}
              placeholder="Confirm Password"
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
            />
            {cfPasswordErrorText && (
              <StyleText style={{ color: "red", fontStyle: "italic" }}>
                {cfPasswordErrorText}
              </StyleText>
            )}
          </StyleView>

          <StyleView className="">
            <StyleButton title="Submit" onPress={handleSubmit} />
          </StyleView>
        </StyleView>

        <StyleView className="flex justify-center text-center mt-10">
          <StyleText style={{ textAlign: "center" }}>
            Have an account{" "}
            <StyleText
              className="text-[#4ee629] font-bold"
              onPress={() => navigation.navigate("Login")}
            >
              Login now
            </StyleText>
          </StyleText>
        </StyleView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
