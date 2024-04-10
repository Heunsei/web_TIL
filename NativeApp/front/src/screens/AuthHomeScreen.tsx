import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AuthHomeScreen({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <Text>AuthHomeScreen</Text>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
