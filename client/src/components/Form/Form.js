import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

  //retrieves from global state returns 1 post
  const post = useSelector((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();


  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if(post) setPostData(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">Sign in to create your own memry and like other memrys.</Typography>
      </Paper>
    )
  }

  return (

    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memry</Typography>
        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth 
          value={postData.title ?? ''} //data from post stored here
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>

        <TextField 
          name="message" 
          variant="outlined" 
          label="Message" 
          fullWidth 
          multiline
          rows={4}
          value={postData.message ?? ''} //data from post stored here
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>

        <TextField 
          name="tags" 
          variant="outlined" 
          label="Tags (comma separated)"  
          fullWidth 
          value={postData.tags ?? ''} //data from post stored here sets value = string to prevent error
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>

        <div className={classes.fileInput}>
          <FileBase 
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;