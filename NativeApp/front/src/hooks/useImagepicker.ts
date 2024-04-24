import {getFormDataImages} from '@/utils';
import ImagePickr from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import {useState} from 'react';
import {ImageUri} from '@/types';
import {Alert} from 'react-native';

interface UseImagePickerProsp {
  initaialImage: ImageUri[];
}

function useImagePicker({initaialImage = []}: UseImagePickerProsp) {
  const [imageUris, setImageUris] = useState(initaialImage);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 갯수 초과', '추가 가능한 이미지는 최대 5개입니다');
      return;
    }
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const handleChange = () => {
    ImagePickr.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);
        // 성공하면 옆에 업로드된 이미지 표시
        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 에러 표시
        }
      });
  };
  return {
    imageUris,
    handleChange,
  };
}

export default useImagePicker;
