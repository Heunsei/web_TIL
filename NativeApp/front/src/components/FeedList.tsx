import {FlatList, StyleSheet, Text} from 'react-native';
import React from 'react';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import FeedItem from './FeedItem';

// 서버에서 받아오는 내용이 고정되어 있지않고 유동적일때,
// 얼마나 빋아와야하는지 모를때 사용하는 component
export default function FeedList() {
  const {data: posts} = useGetInfinitePosts();
  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
