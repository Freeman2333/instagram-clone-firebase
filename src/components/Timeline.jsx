import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { getPhotos } from "../services/firebase";
import LoggedInUserContext from "../context/extended-user";
import Post from "./Post";

const Timeline = () => {
  const { extendedUser } = useContext(LoggedInUserContext);
  const [photos, setPhotos] = useState([]);

  getPhotos(extendedUser?.following).then((res) => setPhotos(res));

  if (!extendedUser?.following) {
    return <Skeleton count={2} width={640} height={500} className="mb-5" />;
  }

  if (extendedUser?.following.length === 0) {
    return (
      <p className="flex justify-center font-bold">
        Follow other people to see Photos
      </p>
    );
  }

  return (
    <div className="container col-span-2">
      {(photos || []).map((content) => (
        <Post
          key={content.docId}
          content={content}
          currentUserId={extendedUser?.userId}
        />
      ))}
    </div>
  );
};

export default Timeline;
