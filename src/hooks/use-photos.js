import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [user] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      // does the user actually follow people
      if (user.following) {
        followedUserPhotos = await getPhotos(userId, user.following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
