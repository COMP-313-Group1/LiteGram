import { useContext } from "react";
import { Link } from 'react-router-dom';
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from '../constants/routes';

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  
  return (
  <header className="h-16 bg-white border-b border-gray-primary mb-8">
    <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                <h1 className="flex justify-center w-full">
                    <Link to={ROUTES.DASHBOARD} aria-label="LiteGram logo">
                        <img src="/images/logo.png" alt="LiteGram" classname="mt-2 w-6/10"  height="200" width="150"/>
                    </Link>
                </h1>
            </div>
            <div className="text-gray-700 text-center flex items-center align-items"> 
            {user ? (
                <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
</svg>

                </Link>
                <button
                type="button"
                title="Sign Out"
                onClick={() => firebase.auth().signOut()}
                onKeyDown={(e) => {
                    if (event.key === 'Enter'){
                        firebase.auth().signOut();
                    }
                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>

                </button>
                <div className="flex items-center cursor-pointer">
                    <Link to={'/p/${user.displayName}'}>
                        <img className="rounded-full h-8 w-8 flex" src={'/images/avatars/${user.displayName}.jpg'}
                        alt={'${user.displayName} profile'}
                        />
                    </Link>
                </div>
                </>
            ) : (
                <>
                <Link to={ROUTES.LOGIN}>
                    <button type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 font-weight-700" >
                        Log In</button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                    <button type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8">
                        Sign Up</button>
                </Link>
                </>
            )
            }
            </div>
    </div>
    </div>
  </header>
  );
}
