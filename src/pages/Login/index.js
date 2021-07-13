import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Keyboard,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../states/auth';
import api from '../../utils/api';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Background from '../../assets/imagens/background-initial.png';

import styles from './style';

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const navigation = useNavigation();

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
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatório'),
  });

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const response = await api.post('/login', {
        email: values.email,
        senha: values.password,
      });

      login(response.data.token, response.data.user, values.password);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Ops...',
        'Houve algum erro na tentativa de login. Tente mais uma vez ou aguarde um pouco.',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.backgroundImage}>
        { !keyboardShow && (
          <Text style={styles.subtitle}>
            Andar de bike vai além do esporte, é sustentabilidade!
          </Text>
        ) }
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ values, handleBlur, handleChange, handleSubmit, errors, isValid }) => (
            <View>
              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Informe o seu email"
                style={styles.inputLogin}
              />
              {errors.email ? (
                <Text style={styles.textInputError}>{errors.email}</Text>
              ) : (
                <></>
              )}

              <View style={[styles.inputView, { padding: 0 }]}>
                <TextInput
                  secureTextEntry={!passwordVisible}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Informe a sua senha"
                  style={styles.input}
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
                <Text style={styles.textInputError}>{errors.password}</Text>
              )}

              <TouchableOpacity
                disabled={!isValid}
                style={[
                  styles.buttonEnter,
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
          )}
        </Formik>

        <View style={styles.footer}>
          <Text style={styles.labelFooter}>Não possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.labelButtonFooter}>Cadastre-se!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
