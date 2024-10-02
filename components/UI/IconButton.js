import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function IconButton({name, color, size, onPress, btnStyles}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={btnStyles} onPress={onPress}>
      <Ionicons name={name} color={color} size={size} />
    </TouchableOpacity>
  );
}

export default IconButton;
