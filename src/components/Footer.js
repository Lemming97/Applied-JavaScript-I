import React from "react";
import { Card } from "react-bootstrap";
import { GiCat } from "react-icons/gi";

const Footer = () => {
  return (
    <>
      <Card className="text-center text-lg-left footer">
        <Card.Footer className="text-muted">
          <div
            className="text-center p-3"
            style={{
              backgroundColor: "rgba(var(--bs-light-rgb),var(--bs-bg-opacity))",
            }}
          >
            &copy; {new Date().getFullYear()} Copyright: Lindsey Martin, Applied
            JS Final {""}
            <GiCat />
          </div>
          {""}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Footer;
