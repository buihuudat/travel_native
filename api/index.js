import axios from "axios";

export const getPlacesData = async (
  bl_latitude,
  tr_latitude,
  bl_longitude,
  tr_longitude,
  type,
  limit
) => {
  console.log(
    bl_latitude,
    tr_latitude,
    bl_longitude,
    tr_longitude,
    type,
    limit
  );
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
            "94eeff1d89msh536c0927c271004p1eb399jsnd472fe363360",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    return null;
  }
};
