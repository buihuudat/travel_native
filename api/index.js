import axios from "axios";

export const getPlacesData = async (
  bl_latitude,
  tr_latitude,
  bl_longitude,
  tr_longitude,
  type,
  limit
) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude,
          tr_latitude,
          bl_longitude,
          tr_longitude,
          restaurant_tagcategory_standalone: "10591",
          limit,
          currency: "VND",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "7daaf21ecemsh7a9a602e1c0f6a2p19053djsne133a4eae1cb",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (err) {
    return null;
  }
};
