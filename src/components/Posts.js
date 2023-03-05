import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Button, ListGroup, Container, Modal } from "react-bootstrap";

const Posts = ({ posts, deletePost }) => {
  const { user } = useContext(UserContext);
  const [postImages, setPostImages] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPostImages = async () => {
      const images = {};
      for (const post of posts) {
        const response = await fetch(
          "https://placekitten.com/" +
            (Math.floor(Math.random() * 450) + 200) +
            "/300"
        );
        images[post.key] = response.url;
      }
      setPostImages(images);
    };
    fetchPostImages();
  }, [posts]);

  const handleDelete = () => {
    deletePost(selectedPost);
    setSelectedPost(null);
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <article className="posts-container">
        <h1>Posts</h1>
        <ListGroup variant="flush">
          {posts.length < 1 && (
            <ListGroup.Item key="empty">No posts yet!</ListGroup.Item>
          )}
          {posts.map((post) => (
            <ListGroup.Item key={post.key}>
              <h2>
                <Link to={`/post/${post.slug}`}>{post.title}</Link>
              </h2>
              {user.isAuthenticated && user.id === post.owner && (
                <p>
                  <Link to={`/edit/${post.slug}`}>
                    <Button variant="outline-secondary">Edit</Button>
                  </Link>
                  {" | "}
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setSelectedPost(post);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </p>
              )}
              {postImages[post.key] && (
                <img
                  src={postImages[post.key]}
                  className="my-2"
                  alt={`Image for post ${post.title}`}
                />
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </article>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the post "{selectedPost?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Posts;
