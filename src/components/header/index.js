import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import * as ROUTES from '../../constants/routes';
import { filteredSearch } from '../../services/firebase';
import SearchDropdownMenu from './search-dropdown';

export default function Header({ setPostPopup, postPopup }) {
  const [dropdown, setDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState();
  const [searchInput, setSearchInput] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();

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

  const handleSearchInput = async (e) => {
    setSearchInput(e.target.value);

    if (searchInput) {
      const userList = await filteredSearch(searchInput);
      if (userList) {
        setUsers(userList);
      }
    }
  };

  useEffect(() => {
    setProfilePicture(user.imageSrc);
  }, [user, user.imageSrc]);

  useEffect(() => {
    setPage(window.location.pathname);
    const closeDropdown = (e) => {
      if (e.path[0].nodeName === 'IMG') {
        if (!e.path[0].alt.includes('profile')) {
          setDropdown(false);
        }
      } else {
        setDropdown(false);
      }
      if (e.path[0].nodeName !== 'INPUT') {
        setSearchDropdown(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="LiteGram logo">
                <img
                  src="/images/logo.png"
                  alt="LiteGram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-primary rounded-lg flex items-center pl-4 py-3 h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="bg-gray-primary ml-2 w-60 relative">
                <input
                  type="text"
                  name="searchbar"
                  placeholder="Search"
                  className="bg-gray-primary font-thin focus:outline-none border-none w-full pr-2"
                  value={searchInput}
                  onChange={handleSearchInput}
                  autoComplete="off"
                  onClick={() => setSearchDropdown(true)}
                />
                <div className="absolute z-40 top-10 right-minus-35-px select-none bg-white transition-all rounded-lg drop-shadow-md">
                  <SearchDropdownMenu dropdown={searchDropdown} users={users} />
                </div>
              </div>
            </div>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </Link>
                <button type="button" onClick={() => setPostPopup(!postPopup)}>
                  <div className="border-2 rounded-lg mr-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </button>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 font-weight-700"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
