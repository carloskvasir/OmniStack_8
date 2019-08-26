import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import logo from '../assets/logo.png';

export default function Login() {
  return (
    <View style={style.container}>
      <Image source={logo} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
});
