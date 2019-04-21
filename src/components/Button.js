import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { normalize } from './utility';

export default Button = props => {
  return (
    <TouchableNativeFeedback onPress={props.onPress} background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    backgroundColor: 'white'
  },
  title: {
    borderRadius: 4,
    textAlign: 'center',
    fontSize: normalize(12),
    fontWeight: 'bold'
  }
})