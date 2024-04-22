import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComback} = useAppState();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      // 앱이 백그라운드에서 돌아왔을때 상태체크(appState)
      // 에러났을때 할수있는 행동 정의
      () => {
        setIsUserLocationError(true);
      },
      {
        // 옵션 지정가능
        enableHighAccuracy: true,
      },
    );
  }, [isComback]);
  return {userLocation, isUserLocationError};
}

export default useUserLocation;
