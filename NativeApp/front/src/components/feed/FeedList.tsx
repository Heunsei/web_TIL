import {FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import FeedItem from './FeedItem';

// 서버에서 받아오는 내용이 고정되어 있지않고 유동적일때,
// 얼마나 받아와야하는지 모를때 사용하는 component
export default function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch;
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      // 바닥에 닿았을 때 실행할 함수
      onEndReached={handleEndReached}
      // 바닥에 닿기 조금 전에 실행
      onEndReachedThreshold={0.5}
      // 위로 당겼을 때 새로고침 할거에요
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
