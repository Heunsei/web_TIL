import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useForm from '../../hooks/useForm';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {validateSignup} from '../../utils';

export default function SignupScreen() {
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={signup.errors.email}
          inputMode="email"
          touched={signup.touched.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={signup.errors.password}
          secureTextEntry
          touched={signup.touched.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          secureTextEntry
          touched={signup.touched.passwordConfirm}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});
