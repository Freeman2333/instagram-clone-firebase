import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserByUserId,
} from "../../services/firebase";
import LoggedInUserContext from "../../context/extended-user";

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);
  const { setExtendedUser } = useContext(LoggedInUserContext);

  async function handleFollowUser() {
    setFollowed(true)
    await updateLoggedInUserFollowing(
      loggedInUserDocId,
      profileId,
      false
    );
    await updateFollowedUserFollowers(profileDocId, userId, false);
    const [user] = await getUserByUserId(userId);
    setExtendedUser(user)
  }

  if (followed) {
    return null
  }

  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = `/images/avatars/default.png`;
          }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  );
};

export default SuggestedProfile;
