import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '@/hooks/queries/useAuth';

export default function RootNavigator() {
  const {isLogin} = useAuth();
  // const isLogin = true;
  return (
    <>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
      {/* <MainDrawerNavigator /> */}
    </>
  );
}

const styles = StyleSheet.create({});
