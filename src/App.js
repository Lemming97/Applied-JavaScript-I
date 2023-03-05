import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import firebase from "./firebase";
import { useStorageState } from "react-storage-hooks";

import UserContext from "./context/UserContext";

import Header from "./components/Header";
import Message from "./components/Message";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import Login from "./components/Login";
import Footer from "./components/Footer";
import CreateUserForm from "./components/CreateUserForm";
import NotFound from "./components/NotFound";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = (props) => {
  const [user, setUser] = useStorageState(localStorage, "state-user", {
    isAuthenticated: false,
    data: null,
  });
  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [message, setMessage] = useState(null);
  const [userCreated, setUserCreated] = useState(false);
  const history = useHistory();

  const createUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          email: response.user["email"],
          isAuthenticated: true,
        });
        setUserCreated(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };
  useEffect(() => {
    if (userCreated) {
      setUserCreated(false);
      history.push("/login");
    }
  }, [userCreated, history]);

  const onLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          email: response.user["email"],
          isAuthenticated: true,
        });
        toast.success("Login successful");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({ isAuthenticated: false });
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const getNewSlugFromTitle = (title) =>
    encodeURIComponent(title.toLowerCase().split(" ").join("-"));

  const addNewPost = (post) => {
    const postsRef = firebase.database().ref("posts");
    post.slug = getNewSlugFromTitle(post.title);
    delete post.key;
    postsRef.push(post);
    setFlashMessage(`saved`);
  };

  const updatePost = (post) => {
    const postRef = firebase.database().ref("posts/" + post.key);
    postRef.update({
      slug: getNewSlugFromTitle(post.title),
      title: post.title,
      content: post.content,
    });
    setFlashMessage(`updated`);
  };

  const deletePost = (post) => {
    const postRef = firebase.database().ref("posts/" + post.key);
    postRef.remove();
    setFlashMessage(`deleted`);
  };

  useEffect(() => {
    const postsRef = firebase.database().ref("posts");
    postsRef.on("value", (snapshot) => {
      const posts = snapshot.val();
      const newStatePosts = [];
      for (let post in posts) {
        newStatePosts.push({
          key: post,
          slug: posts[post].slug,
          title: posts[post].title,
          content: posts[post].content,
        });
      }
      setPosts(newStatePosts);
    });
  }, [setPosts]);

  return (
    <Router>
      <UserContext.Provider value={{ user, onLogin, onLogout, createUser }}>
        <div className="App">
          <Header />
          {message && <Message type={message} />}
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Posts posts={posts} deletePost={deletePost} />}
            />
            <Route
              path="/post/:postSlug"
              render={(props) => {
                const post = posts.find(
                  (post) => post.slug === props.match.params.postSlug
                );
                if (post) {
                  return <Post post={post} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              exact
              path="/login"
              render={() =>
                !user.isAuthenticated ? <Login /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/new"
              render={() =>
                user.isAuthenticated ? (
                  <PostForm
                    addNewPost={addNewPost}
                    post={{ key: null, slug: "", title: "", content: "" }}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/edit/:postSlug"
              render={(props) => {
                const post = posts.find(
                  (post) => post.slug === props.match.params.postSlug
                );
                if (post) {
                  if (user.isAuthenticated) {
                    return <PostForm updatePost={updatePost} post={post} />;
                  } else {
                    return <Redirect to="/login" />;
                  }
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              path="/create-user"
              render={() =>
                userCreated ? (
                  <Redirect to="/" />
                ) : (
                  <CreateUserForm
                    setUser={(userData) => {
                      setUser({ ...userData, isAuthenticated: true });
                      setUserCreated(true);
                    }}
                  />
                )
              }
            />
            <Route component={NotFound} />
          </Switch>
          <ToastContainer />
          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
