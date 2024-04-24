import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  PERMISSIONS,
  check,
  RESULTS,
  request,
  Permission,
} from 'react-native-permissions';
import {alerts} from '@/constants';
type PermissionType = 'LOCATION' | 'PHOTO';

// 키가 PermissionType 이면서
type PermissionOS = {
  [key in PermissionType]: Permission;
};

// 플랫폼에 따라 요청 객체가 다르게 제공됨
const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

// 유저가 입력받은 권한을 허용했는지 확인해줄 훅
function usePermisison(type: PermissionType) {
  useEffect(() => {
    async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? androidPermissions[type]
        : iosPermissions[type];
      const checked = await check(permissionOS);
      // 체크 확인
      console.log('checked', checked);

      const showPermissionAlert = () => {
        // Alert.alert('제목', '설명', [옵션]);
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              // 직접 유저에게 설정창을 열어주는 과정
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }
          // DENIED상태일때는 request를 사용해 요청을 다시 보내도록 함
          await request(permissionOS);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    };
  }, []);
}

export default usePermisison;
