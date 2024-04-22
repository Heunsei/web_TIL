import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      // 에러났을때 할수있는 행동 정의
      () => {
        setIsUserLocationError(true);
      },
      {
        // 옵션 지정가능
        enableHighAccuracy: true,
      },
    );
  }, []);
  return {userLocation, isUserLocationError};
}

export default useUserLocation;
