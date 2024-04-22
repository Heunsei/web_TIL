import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {mainNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator<MainDrawerParamList>() {
  return (
    // 옵션 -> 네이게이터가 밀리지 않고 화면 위로 나오게하는 옵션
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
      }}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{title: '홈'}}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedHomeScreen}
        options={{title: '피드'}}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{title: '캘린더'}}
      />
    </Drawer.Navigator>
  );
}
