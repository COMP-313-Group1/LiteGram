import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import PostPopup from '../components/header/add-post';
import useUser from '../hooks/use-user';

export default function Dashboard() {
  const [scrollBlocked, setScrollBlocked] = useState(false);
  const [postPopup, setPostPopup] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleProfilePicture = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result);
        // eslint-disable-next-line no-undef
        imageSrc = reader.result;
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    setProfilePicture(
      user.imageSrc ? user.imageSrc : '/images/avatars/default.png'
    );
  }, [user, user.image]);
  useEffect(() => {
    document.title = 'LiteGram';
    if (window.location.pathname !== '/') {
      window.location.pathname = '/';
    }
  }, []);

  return (
    <div className="bg-gray-background">
      <Header setPostPopup={setPostPopup} postPopup={postPopup} />
      {postPopup && <PostPopup user={user} setPostPopup={setPostPopup} />}
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline setScrollBlocked={setScrollBlocked} />
        <Sidebar profilePic={profilePicture} />
      </div>
    </div>
  );
}
