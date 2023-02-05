import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { getPlacesData } from "../api";
import ItemCarContainer from "../Components/ItemCarContainer";

const ExploreScreen = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      setLoading(true);
      getPlacesData(
        route.params.bl_latitude,
        route.params.tr_latitude,
        route.params.bl_longitude,
        route.params.tr_longitude,
        route.params.type,
        (route.params.limit = null)
      ).then((data) => {
        setData(data);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      return e;
    }
  }, []);

  const StyleView = styled(View);
  const StyleText = styled(Text);

  return (
    <SafeAreaView>
      {loading ? (
        <StyleView className="flex-1 mt-6 items-center justify-center">
          <ActivityIndicator size={"large"} color="#2c7379" />
        </StyleView>
      ) : data?.length <= 0 ? (
        <StyleView className="flex text-center justify-center">
          <StyleText className="text-center mt-5 font-bold text-[20px] text-[#ff7575]">
            Opps...There're something wrong
          </StyleText>
        </StyleView>
      ) : (
        <ScrollView>
          <StyleView className="p-4 flex-row items-center justify-between flex-wrap">
            {data?.map((data, i) => (
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
                back="ExploreScreen"
              />
            ))}
          </StyleView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ExploreScreen;
