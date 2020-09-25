import { connect } from 'react-redux'
import { actions } from  '../../../redux/modules/post/post'

import Post from './Post'
import PostList from './PostList'
import PostDetail from './PostDetail'

const ms2p = (state) => {
  return {
    ...state.post,
  };
};

const md2p = { ...actions };

//===========================
// Conection List Posts
//===========================
const ListPost = connect(ms2p, md2p)(PostList);
  
//==========================
// Conection Create Post
//=========================?
const CreatePost = connect(ms2p, md2p)(Post);

//==========================
// Conection Detail Post
//=========================?
const DetailPost = connect(ms2p, md2p)(PostDetail);

  export const connectionPost = {
    ListPost,
    CreatePost,
    DetailPost
  }