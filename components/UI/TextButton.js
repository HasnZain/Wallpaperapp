import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

function TextButton({onPress, text, btnStyles}) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, btnStyles]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
