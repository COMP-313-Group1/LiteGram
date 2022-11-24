import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  // const [userExists, setUserExists] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      // eslint-disable-next-line no-shadow
      const [user] = await getUserByUsername(username);
      console.log(user);
      if (user?.userId) {
        setUser(user);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, navigate]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
