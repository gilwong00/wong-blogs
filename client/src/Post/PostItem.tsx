import React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../store/actions/post';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const ContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

interface IProps {
  post: IPost;
}

const PostItem: React.FC<IProps> = ({ post }) => {
  return (
    <Container>
      <Card>
        <CardHeader title={<Link to={`/post/${post.id}`}>{post.title}</Link>} />
        <CardContent>
          <ContentWrapper>
            <Typography color='textSecondary' component='p'>
              {post.body}
            </Typography>
            <Typography color='textSecondary' component='p'>
              total comments {post.totalComments || 0}
            </Typography>
          </ContentWrapper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostItem;
