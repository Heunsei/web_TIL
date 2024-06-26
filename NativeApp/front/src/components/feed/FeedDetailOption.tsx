import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CompoundOption} from '../common/CompoundOption';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

export default function FeedDetailOption({
  isVisible,
  hideOption,
}: FeedDetailOptionProps) {
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Button isDanger>삭제하기</CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button>수정하기</CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소하기
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.BackGround>
    </CompoundOption>
  );
}

const styles = StyleSheet.create({});
