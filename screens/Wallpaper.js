import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import {NativeModules} from 'react-native';
import React, {useState} from 'react';

import {imageResources, catImages} from '../constants/model';
import TextButton from '../components/UI/TextButton';
import IconButton from '../components/UI/IconButton';

const {WallpaperManager} = NativeModules;
const {width, height} = Dimensions.get('window');

function Wallpaper({route, navigation}) {
  const catID = route.params.categoryId;
  const imgID = route.params.imageId;
  const categoryImages = catImages.filter(item => {
    return item.catID === catID;
  });

  const selectedimageURL =
    imgID === 0
      ? categoryImages[0].image
      : categoryImages.find(item => {
          return item.Id === imgID;
        }).image;
  const selectedimageId =
    imgID === 0
      ? categoryImages[0].image
      : categoryImages.find(item => {
          return item.Id === imgID;
        }).Id;

  const [selectedImage, setSelectedImage] = useState(selectedimageURL);
  const [selectedImageID, setSelectedImageID] = useState(selectedimageId);

  const handleButtonPress = imageID => {
     console.log(imageID);
    if (WallpaperManager) {
      const selectedResource = imageResources.find(item => item.Id === imageID);
      const resourceName = selectedResource?.Image;
       console.log(resourceName);

      if (resourceName) {
        Alert.alert('Set Wallpaper', 'Choose where to set the wallpaper:', [
          {text: 'Home Screen', onPress: () => setWallpaper(resourceName, 1)},
          {text: 'Lock Screen', onPress: () => setWallpaper(resourceName, 2)},
          {text: 'Both', onPress: () => setWallpaper(resourceName, 3)},
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true });
      } else {
        Alert.alert('Error', 'Image resource name is not available');
      }
    } else {
      Alert.alert('Error', 'WallpaperManager is not available');
    }
  };

  const setWallpaper = (resourceName, type) => {
    WallpaperManager.setWallpaper(
      resourceName,
      type,
      message => Alert.alert('Success', message),
      error => Alert.alert('Error', error),
    );
  };

  function handlePreview(selectedImage) {
    navigation.navigate('PreviewScreen', {
      image: selectedImage,
    });
  }

  function handleImageChange({item}) {
    setSelectedImage(item.image);
    setSelectedImageID(item.Id);
  }

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.largeImage} />
        <IconButton
          name={'chevron-back'}
          onPress={() => navigation.goBack()}
          size={20}
          color={'white'}
          btnStyles={styles.backBtn}
        />
        <TextButton
          onPress={() => handlePreview(selectedImage)}
          text={'Preview'}
          btnStyles={styles.previewBtn}
        />
        <TextButton
          onPress={() => handleButtonPress(selectedImageID)}
          text={'Set As Wallpaper'}
          btnStyles={styles.setWallpaperBtn}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={categoryImages}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleImageChange({item})}>
              <Image source={item.image} style={styles.flatListImage} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.Id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
}

export default Wallpaper;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 20,
    position: 'relative',
  },
  largeImage: {
    width: width,
    height: height - 100,
    resizeMode: 'cover',
  },
  flatListContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  flatListImage: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    resizeMode: 'cover',
  },
  setWallpaperBtn: {
    bottom: '10%',
    left: '50%',
    transform: [{translateX: -80}, {translateY: 20}],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  previewBtn: {
    top: '3%',
    right: '3%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
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
