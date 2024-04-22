import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '@/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermisison from '@/hooks/usePermission';

// 두가지 props종류가 들어올거라 둘을 합쳐주는 과정을 거쳐줌
// Navigation은 타입인데 MapStackParamList와 MainDrawerParamList를 포함하는 두 props를 합친 타입이다.
type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export default function MapHomeScreen() {
  // 노치부분을 계산해주는 함수(스테이터스바의 길이)
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isUserLocationError} = useUserLocation();
  // 원하는 권한을 넣어서 사용가능
  usePermisison('LOCATION');
  // 맵 접근을 위한 ref선언
  const mapRef = useRef<MapView | null>(null);

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // 에러 메세지 출력
      return;
    }
    // 좌표를 넣어주면 해당 위치로 이동함
    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      // 확대 정도를 위한 설정값
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  // 아래코드 커스텀 훅으로 변경
  // 1. 내위치 구하기(react-native-geolocation 사용)
  // 2. 지도를 이동
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     info => {
  //       const {latitude, longitude} = info.coords;
  //       setUserLocation({latitude, longitude});
  //       setIsUserLocationError(false);
  //     },
  //     // 에러났을때 할수있는 행동 정의
  //     () => {
  //       setIsUserLocationError(true);
  //     },
  //     {
  //       // 옵션 지정가능
  //       enableHighAccuracy: true,
  //     },
  //   );
  // }, []);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation
        followsUserLocation
      />
      {/* 배열로 스타일을 설정 후 inset이 있다면 top만큼 여백을 그것이 아니라면 20px만큼 */}
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Text>서랍</Text>
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <Text>내위치</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    // 노치부분을 생각해야함
    top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    // shadow속성은 안드로이드에서 작동하지 않기 때문에 아래 코드를 추가
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
