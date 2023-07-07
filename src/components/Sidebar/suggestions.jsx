import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    async function suggestedProfiles() {
      try {
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response);
      } catch (error) {
        console.log(error);
      }
      
    }
    
    if (userId) {
      suggestedProfiles();
    }
  }, [following, userId]);

  if (!profiles) {
    return <Skeleton count={1} height={150} className="mt-5" />;
  }

  return (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
