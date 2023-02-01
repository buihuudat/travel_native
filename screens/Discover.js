import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../Components/MenuContainer";
import { AntDesign } from "@expo/vector-icons";
import ItemCarContainer from "../Components/ItemCarContainer";
import { getPlacesData } from "../api";
const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("restaurants");
  const [loading, setLoading] = useState(true);
  const [mainData, setMainData] = useState([]);
  const [bl_latitude, setBl_latitude] = useState(null);
  const [tr_latitude, setTr_latitude] = useState(null);
  const [bl_longitude, setBl_longitude] = useState(null);
  const [tr_longitude, setTr_longitude] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      getPlacesData(bl_latitude, tr_latitude, bl_longitude, tr_longitude).then(
        (data) => {
          setMainData(data);
          setLoading(false);
        }
      );
    } catch {
      setLoading(false);
    }
  }, [bl_latitude, tr_latitude, bl_longitude, tr_longitude]);

  console.log(loading);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0b646b] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>
      <View className="flex-row items-center bg-back mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fieds: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setTr_latitude(details?.geometry?.viewport?.northeast.lat);
            setTr_longitude(details?.geometry?.viewport?.northeast.lng);
            setBl_latitude(details?.geometry?.viewport?.southwest.lat);
            setBl_longitude(details?.geometry?.viewport?.southwest.lng);
          }}
          query={{
            key: "AIzaSyBkm5JPMQUX7160BJmlbLP7jBJz9hpj1KQ",
            language: "vi",
          }}
        />
      </View>
      {/* nenu container */}

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color="#00ff00" />
        </View>
      ) : (
        <ScrollView>
          {/* <View className="flex-row items-center justify-center px-8 mt-8">
          <MenuContainer
            key={"hotel"}
            title="Hotels"
            imageSrc={Hotels}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={"attraction"}
            title="Attractions"
            imageSrc={Attractions}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={"restaurant"}
            title="Restaurants"
            imageSrc={Restaurants}
            type={type}
            setType={setType}
          />
        </View> */}

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2c7379] text-[28px] font-bold ">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-1">
                <Text className="text-[#a0c4c7] text-[20px] font-bold">
                  Explore
                </Text>
                <AntDesign name="arrowright" size={24} color="#a0c4c7" />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-between flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[600px] items-center justify-center space-y-8">
                    <Image
                      source={NotFound}
                      className="w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      Opps... Data not found!!
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
