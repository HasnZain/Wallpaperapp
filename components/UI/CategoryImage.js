import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

function CategoryImage({Id, catID, image}) {
  const navigation = useNavigation();

  function imageClickHandler(Id, catID, image) {
    navigation.navigate('Wallpaper', {
      categoryId: catID,
      imageId: Id
    });
  }

  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => imageClickHandler(Id, catID, image)}>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
}

export default CategoryImage;

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  imageContainer: {
    width: deviceWidth > 400 ? 100 : 80,
    height: deviceWidth > 400 ? 150 : 120,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
