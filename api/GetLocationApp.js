import Geolocation from "react-native-geolocation-service";

const checkPermission = async () => {
  const granted = await Geolocation.requestPermissions();
  return granted;
};
export const GetLocationApp = async () => {
  if (checkPermission()) {
    try {
      const location = await Geolocation.getCurrentPosition(
        (position) => position,
        // (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      return location;
    } catch (e) {
      return e;
    }
  }
};
