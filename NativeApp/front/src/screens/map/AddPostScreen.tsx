import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {colors, mapNavigations} from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateAddPost} from '@/utils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import {MarkerColor} from '@/types';
import useGetAddress from '@/hooks/useGetAddress';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

export default function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();

  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const address = useGetAddress(location);

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  const handleSubmit = () => {
    const body = {
      date: new Date(),
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: [],
    };

    createPost.mutate(
      {address, ...location, ...body},
      {
        // 요청 성공시 이전 화면으로 이동
        onSuccess: () => navigation.goBack(),
        onError: error => console.log(error),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고싶은 내용을 입력하세요"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {flex: 1, padding: 20, marginBottom: 20},
  inputContainer: {gap: 20, marginBottom: 20},
});
