import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {catImages} from '../constants/model';
import TextButton from '../components/UI/TextButton';
import IconButton from '../components/UI/IconButton';

function Preview({route, navigation}) {
  const imageToShow = route.params.image - 3;
  const selectedImage = catImages[imageToShow].image;

  return (
    <View style={styles.imageContainer}>
      <StatusBar hidden={true} />
      <Image source={selectedImage} style={styles.image} />
      <IconButton
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        size={20}
        color={'white'}
        btnStyles={styles.backBtn}
      />
    </View>
  );
}

export default Preview;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: '3%',
    left: '3%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
