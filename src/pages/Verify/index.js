import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../states/auth';

export default function Verify() {
  const { checkLoggedUser } = useAuth();

  useEffect(() => {
    checkLoggedUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#68B92C" />
    </View>
  );
}
