import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IStoreState } from '../store/reducers';
import {
  fetchPosts,
  fetchUserPosts,
  addNewPost,
  IPost,
} from '../store/actions/post';
import { PostItem, AddPost } from '.';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const PostList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const user = useSelector((state: IStoreState) => state.user.user);
  const posts = useSelector((state: IStoreState) => state.posts.posts);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClose = () => setOpen(false);

  const handleAddPost = async (newPost: IPost) => {
    try {
      if (location.pathname.includes('mypost')) {
        await dispatch(fetchUserPosts(user.id));
      } else {
        await dispatch(addNewPost(newPost));
      }
      setOpen(false);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        await dispatch(fetchPosts());
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchBlogPosts();
  }, [dispatch]);

  if (loading) {
    return <CircularProgress size={40} />;
  }

  return (
    <Container>
      {posts && (
        <List>
          {posts.map((post) => (
            <ListItem key={post.id}>
              <PostItem post={post} />
            </ListItem>
          ))}
        </List>
      )}

      {open && (
        <AddPost
          open={open}
          handleClose={handleClose}
          addPost={handleAddPost}
        />
      )}

      <Fab
        color='primary'
        aria-label='add'
        style={{ position: 'fixed', right: 50, bottom: 50 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default PostList;
