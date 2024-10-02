import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {catImages} from '../../constants/model';
import CategoryImage from './CategoryImage';
import IconButton from './IconButton';

function CategoryItem({Id, CatName}) {
  const navigation = useNavigation();
  const categoryImages = catImages
    .filter(item => {
      return item.catID === Id;
    })
    .slice(0, 5);

  function renderCategoryImages({item}) {
    return <CategoryImage {...item} />;
  }

  function detailsHandler(catId) {
    navigation.navigate('Wallpaper', {
      categoryId: catId,
      imageId: 0
    });
  }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.catHeading}>{CatName}</Text>
        <IconButton
          name={'chevron-forward'}
          onPress={() => detailsHandler(Id)}
          size={20}
          color={'black'}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={categoryImages}
          renderItem={renderCategoryImages}
          keyExtractor={item => item.Id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export default CategoryItem;

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    width: deviceWidth * 0.93,
    height: deviceHeight * 0.2,
    margin: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    elevation: 4
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  listContainer: {
    marginVertical: 5,
  },
});
