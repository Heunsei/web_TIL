import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {feedNavigations} from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';

// param을 typing하는 경우 상세 스크린과 같이 id값을 쓰는 스크린에 해주면 됨

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  //   [feedNavigations.FEED_DETAIL]: undefined;
};
const Stack = createStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={navigation => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Stack.Navigator>
  );
}
