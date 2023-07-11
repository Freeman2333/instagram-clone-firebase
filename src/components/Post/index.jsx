import { useRef } from "react";

import Header from "./header";
import Actions from "./actions";
import Comments from "./comments";
import Footer from "./footer";

const Post = ({ content, currentUserId }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content?.username} />
      <img src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likes={content?.likes || []}
        currentUserId={currentUserId}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;
