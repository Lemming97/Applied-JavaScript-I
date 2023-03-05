import React from "react";
import Navigation from "./Navigation";
import { GiCat } from "react-icons/gi";

import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <>
      <header>
        <Navigation />
        <div className="p-5 text-center bg-light">
          <h1 className="mb-3">The Purrington Post</h1>
          <h4 className="mb-3">
            A Fresh, Fun and Feline Friendly Cat Blog.
          </h4>{" "}
          <GiCat className="logo" />
        </div>
      </header>
    </>
  );
};

export default Header;
