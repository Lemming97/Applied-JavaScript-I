import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Message = ({ type }) => {
  const messages = {
    saved: "Post has been saved!",
    updated: "Post has been updated!",
    deleted: "Post has been deleted.",
  };

  switch (type) {
    case "saved":
      toast.success(messages[type], {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message-success",
      });
      break;
    case "updated":
      toast.info(messages[type], {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message-updated",
      });
      break;
    case "deleted":
      toast.error(messages[type], {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message-deleted",
      });
      break;
    default:
      break;
  }

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Message;
