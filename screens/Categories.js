import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {categories} from '../constants/model';
import CategoryItem from '../components/UI/CategoryItem';

function Categories() {
  function renderList({item}) {
    return <CategoryItem {...item} />;
  }

  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderList}
        keyExtractor={item => item.Id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
