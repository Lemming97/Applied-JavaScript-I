import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

const PostForm = ({ post: propsPost, addNewPost, updatePost }) => {
  const [post, setPost] = useState({ ...propsPost });
  const [saved, setSaved] = useState(false);

  const prevPostRef = useRef();
  useEffect(() => {
    prevPostRef.current = post;
  }, [post]);
  const prevPost = prevPostRef.current;

  const quillRef = useRef();
  useEffect(() => {
    if (prevPost && quillRef.current) {
      if (propsPost.key !== prevPost.key) {
        setPost({ ...propsPost });
        quillRef.current.getEditor().setContents(``);
      }
    }
  }, [prevPost, propsPost]);

  const handlePostForm = (event) => {
    event.preventDefault();
    if (post.title) {
      if (updatePost) {
        updatePost(post);
      } else {
        addNewPost(post);
      }
      setSaved(true);
    } else {
      alert("Title required");
    }
  };

  if (saved === true) {
    console.log("Saved");
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Form onSubmit={handlePostForm}>
        <h1>Add a New Post</h1>
        <FormGroup>
          <FormLabel>Title:</FormLabel>
          <FormControl
            id="form-title"
            value={post.title}
            onChange={(event) =>
              setPost({
                ...post,
                title: event.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Content:</FormLabel>
          <Quill
            ref={quillRef}
            defaultValue={post.content}
            onChange={(content, delta, source, editor) => {
              setPost({
                ...post,
                content: editor.getContents(),
              });
            }}
          />
        </FormGroup>
        <Button
          variant="primary"
          type="submit"
          disabled={!post.title && !post.content}
        >
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
