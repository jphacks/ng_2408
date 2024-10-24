export const getCurrentPosition = () => {
  return new Promise(
    (
      resolve: (value?: GeolocationPosition) => void,
      reject: (reason?: GeolocationPositionError) => void
    ) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  );
};
