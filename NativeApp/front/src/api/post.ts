import {ImageUri, Post} from '@/types';
import axiosInstance from './axios';

type ResponsePost = Post & {images: ImageUri[]};

type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);
  console.log('create post', data);
  return data;
};

export {createPost};
export type {ResponsePost, RequestCreatePost};
