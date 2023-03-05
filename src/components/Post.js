import React, { useEffect, useState } from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Container, ListGroup } from "react-bootstrap";

const Post = ({ post }) => {
  const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
  const contentHTML = converter.convert();
  const [randomKittenUrl, setRandomKittenUrl] = useState("");

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 450) + 200;
    fetch(`https://placekitten.com/${randomNumber}/300`)
      .then((response) => {
        if (response.ok) {
          setRandomKittenUrl(response.url);
        } else {
          console.log("Failed to fetch kitten image.");
        }
      })
      .catch((error) => {
        console.log("Failed to fetch kitten image.", error);
      });
  }, []);

  return (
    <Container>
      <ListGroup className="post" variant="flush">
        <ListGroup.Item>
          <h1>{post.title}</h1>
        </ListGroup.Item>
        <ListGroup.Item>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          />
          <img src={randomKittenUrl} alt="random kitten" />
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default Post;
