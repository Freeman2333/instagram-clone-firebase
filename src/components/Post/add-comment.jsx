import { useState, useContext } from "react";
import LoggedInUserContext from "../../context/extended-user";
import { addComment } from "../../services/firebase";

const AddComment = ({ docId, commentInput }) => {
  const {
    extendedUser: { fullName },
  } = useContext(LoggedInUserContext);

  const [comment, setComment] = useState("");

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    await addComment(docId, comment, fullName);
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitComment(event);
          setComment("");
        }}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
      </form>
    </div>
  );
};

export default AddComment;
