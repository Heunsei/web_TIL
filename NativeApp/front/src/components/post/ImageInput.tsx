import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

interface ImageInputProps {
  onChange: () => void;
}

export default function ImageInput({onChange}: ImageInputProps) {
  return (
    <Pressable
      onPress={onChange}
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}>
      <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageInputPressed: {opacity: 0.5},
  inputText: {fontSize: 12, color: colors.GRAY_500},
});
