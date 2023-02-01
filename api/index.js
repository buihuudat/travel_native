import axios from "axios";

export const getPlacesData = async (
  bl_latitude,
  tr_latitude,
  bl_longitude,
  tr_longitude
) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
      {
        params: {
          bl_latitude,
          tr_latitude,
          bl_longitude,
          tr_longitude,
          restaurant_tagcategory_standalone: "10591",
          limit: "30",
          currency: "VND",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "94eeff1d89msh536c0927c271004p1eb399jsnd472fe363360",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (err) {
    return null;
  }
};
