import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../states/auth';
import api from '../../utils/api';
import { Feather } from '@expo/vector-icons';

import Background from '../../assets/imagens/background-initial.png';
import styles from './style';

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get('window').height;
  const { login } = useAuth();
  const navigation = useNavigation();
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    const didKeyboardShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });

    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });

    return () => {
      didKeyboardShow.remove();
      keyboardHide.remove();
    }
  }, []);

  const validationSchema = Yup.object().shape({
    nome_completo: Yup.string().required('Campo Nome obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo Email obrigatório'),
    password: Yup.string()
      .min(8, ({ min }) => `A senha deve conter, no mínimo,  ${min} caracteres`)
      .required('Campo Senha obrigatório'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Senhas diferentes')
      .required('Campo Confirmar Senha obrigatório'),
  });

  const handleCreateUser = async (values) => {
    try {
      setLoading(true);

      const responseSignUp = await api.post('/user/create', {
        nome_completo: values.nome_completo,
        email: values.email,
        senha: values.password,
        cash: 30,
      });

      const responseLogin = await api.post('/login', {
        email: values.email,
        senha: values.password,
      });

      login(responseLogin.data.token, responseLogin.data.user, values.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Ops...',
        'Houve algum erro na tentativa de cadastro. Tente mais uma vez ou aguarde um pouco.',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-500}
    >
      <ImageBackground source={Background} style={styles.backgroundImage}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          { !keyboardShow && (
            <View
              style={[
                styles.header,
                height > 684
                  ? { marginTop: 20, paddingTop: 20 }
                  : { marginTop: 0, paddingTop: 10 },
              ]}
            >
              <Text style={styles.subtitle}>
                Andar de bike vai além do esporte, é sustentabilidade!
              </Text>
            </View>
          ) }

          <View
            style={[
              styles.form,
              height < 684
                ? {
                    marginTop: 20,
                    paddingTop: 20,
                    marginBottom: 20,
                    paddingBottom: 20,
                  }
                : { marginTop: 0, paddingTop: 0 },
            ]}
          >
            <Formik
              initialValues={{
                nome_completo: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleCreateUser(values)}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                isValid,
              }) => (
                <View>
                  <TextInput
                    value={values.nome_completo}
                    onChangeText={handleChange('nome_completo')}
                    onBlur={handleBlur('nome_completo')}
                    placeholder="Nome Completo"
                    style={styles.inputView}
                  />
                  {errors.nome_completo && (
                    <Text style={styles.error}>{errors.nome_completo}</Text>
                  )}

                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Email"
                    style={styles.inputView}
                  />
                  {errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <View style={[styles.inputView, { padding: 0 }]}>
                    <TextInput
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder="Senha"
                      style={styles.input}
                      secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      <Feather
                        name={passwordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        style={{ paddingRight: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="middle"
                      style={styles.error}
                    >
                      {errors.password}
                    </Text>
                  )}

                  <View style={[styles.inputView, { padding: 0 }]}>
                    <TextInput
                      value={values.confirm_password}
                      onChangeText={handleChange('confirm_password')}
                      onBlur={handleBlur('confirm_password')}
                      placeholder="Confirmar Senha"
                      secureTextEntry={!confirmPasswordVisible}
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      <Feather
                        name={confirmPasswordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        style={{ paddingRight: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirm_password && (
                    <Text style={styles.error}>{errors.confirm_password}</Text>
                  )}

                  <View style={styles.signUpView}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={[
                        styles.buttonSignIn,
                        !isValid ? { backgroundColor: '#ccc' } : {},
                      ]}
                      onPress={handleSubmit}
                    >
                      {!loading ? (
                        <Text style={styles.textButton}>Entrar</Text>
                      ) : (
                        <ActivityIndicator size="small" color="white" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>

            <View style={styles.footer}>
              <Text style={styles.labelFooter}>Já possui uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.labelButtonFooter}>Faça login!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
