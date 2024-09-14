type SetError = (e: string) => void;
type SetLocation =React.Dispatch<React.SetStateAction<{
       lat: number;
       lon: number;
   }>>;

export const getLocation = (
  watchId: number | null,
  setLocation: SetLocation,
  setError: SetError
) => {
  if (!navigator.geolocation) {
    setError(" browser not support");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    ({ coords: { latitude, longitude } }) => {
      setLocation({
        lat: latitude,
        lon: longitude,
      });
    },
    (error) => {
      setError("cant get location");
      console.error(error);
    }
  );
};
