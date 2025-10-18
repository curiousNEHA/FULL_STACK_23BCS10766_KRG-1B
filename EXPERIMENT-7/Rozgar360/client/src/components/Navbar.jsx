import React from "react";
import { assets } from "../assets/assets";
import { UserButton, useUser, SignInButton, useClerk } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
  const {openSignIn} = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
 const {setShowRecruiterLogin} = useContext(AppContext);
  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick = {()=> navigate('/')} className='cursor-pointer' src={assets.logo} alt="Logo" />

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/applications">Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user?.firstName} {user?.lastName}</p>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button onClick = {e=>setShowRecruiterLogin(true)} className="text-gray-600">Recruiter Login</button>
            <SignInButton mode="modal">
              <button onClick = {e=>openSignIn()} className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full">
                Login
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
