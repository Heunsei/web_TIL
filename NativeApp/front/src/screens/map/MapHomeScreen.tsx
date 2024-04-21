import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function MapHomeScreen() {
  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsMyLocationButton
      showsUserLocation
      followsUserLocation
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
