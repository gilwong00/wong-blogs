import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { IStoreState } from '../store/reducers';
import { IPost } from '../store/actions/post';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostWrapper = styled(Card)`
  width: 35% !important;
  margin: auto;
  margin-top: 2%;
`;

const CommentInput = styled(TextField)`
	label {
		padding: 10px;
	}

	padding: 10px;
	width: 95%;
`

const Post = () => {
  const [comment, setComment] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const { id } = useParams();
  const posts = useSelector((state: IStoreState) => state.posts.posts);
	const post = posts.find((p: IPost) => p && p.id?.toString() === id);
	// const dispatch = useDispatch();

  return (
    <PostWrapper>
      <CardHeader title={post?.title} />
      <CardContent>
        <ContentWrapper>
          <Typography color='textSecondary' component='p'>
            {post?.body}
          </Typography>
          <Typography color='textSecondary' component='p'>
            total comments {post?.totalComments}
          </Typography>
        </ContentWrapper>
      </CardContent>
      <CardActions>
        <IconButton style={{ marginLeft: 'auto' }} onClick={() => setShowInput(!showInput)}>
          <AddIcon />
        </IconButton>
        Add Comment
      </CardActions>
			{/* render comments */}
      {showInput && (
        <CommentInput
          // className={classes.textField}
          label='Add a comment'
					type='text'
					// InputProps={{ paddingLeft: 10 }}
          fullWidth
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
        />
      )}
    </PostWrapper>
  );
};

export default Post;
