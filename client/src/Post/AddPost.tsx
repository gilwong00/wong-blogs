import React, { useState } from 'react';
import { IPost } from '../store/actions/post';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface IProps {
  open: boolean;
  handleClose: () => void;
  addPost: (newPost: IPost) => void;
}

const AddPost: React.FC<IProps> = ({ open, handleClose, addPost }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      fullWidth
    >
      <DialogTitle id='form-dialog-title'>Add a new Post</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          label='Title'
          type='text'
          fullWidth
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <TextField
          rows={4}
          multiline
          margin='dense'
          label='Description'
          type='text'
          fullWidth
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBody(e.target.value)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => addPost({ title, body })} color='primary'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPost;
