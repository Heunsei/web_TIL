import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderButton from './HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export default function FeedHomeHeaderLeft({
  navigation,
}: FeedHomeHeaderLeftProps) {
  return (
    <HeaderButton
      icon={
        <Ionicons
          name="menu"
          color={colors.BLACK}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
      }
    />
  );
}

const styles = StyleSheet.create({});
