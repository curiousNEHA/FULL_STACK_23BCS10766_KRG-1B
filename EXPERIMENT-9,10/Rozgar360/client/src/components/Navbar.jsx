import React from "react";
import { assets } from "../assets/assets";
import { UserButton, useUser, SignInButton, useClerk } from "@clerk/clerk-react";
import { useContext,useState,useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { Bell } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
const Navbar = () => {
  const location = useLocation();
const dropdownRef = useRef(null);
  const {openSignIn} = useClerk();
  const { isLoaded, user } = useUser(); 
  console.log("User:", user); // ✅ Works here
  const [hasUnread, setHasUnread] = useState(true); // you can set dynamically later
  const { socket,notifications, setNotifications } = useSocket();
  const [showDropdown, setShowDropdown] = useState(false);
  const unreadCount = notifications.length;
  const navigate = useNavigate();
 const {setShowRecruiterLogin} = useContext(AppContext);
 useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


useEffect(() => {
  if (!user || !user.id) return;

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${user.id}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  fetchNotifications();
}, [user]);


 if (!isLoaded) {
  return <div className="py-4 shadow bg-white"></div>;
}


if (!socket) {
  console.warn("Socket not connected yet");
}

 // wait until user is loaded

  const sendNotification = () => {
    if (socket) {
      socket.emit("sendNotification", { 
        receiverId: "<other-user-id>", // replace with actual receiver ID
        message: `Hello from ${user.firstName}!`
      });
    }
  };
  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick = {()=> navigate('/')} className='cursor-pointer' src={assets.logo} alt="Logo" />
      
        <ul className="flex items-center gap-6">
  <li>
    <Link
      to="/"
      className={`pb-1 border-b-2 transition-all duration-200 ${
        location.pathname === "/" ? "border-blue-600 text-blue-600" : "border-transparent hover:border-gray-400"
      }`}
    >
      Home
    </Link>
  </li>

  <li>
    <Link
      to="/features"
      className={`pb-1 border-b-2 transition-all duration-200 ${
        location.pathname === "/features" ? "border-blue-600 text-blue-600" : "border-transparent hover:border-gray-400"
      }`}
    >
      Features
    </Link>
  </li>

  <li>
    <Link
      to="/how-it-works"
      className={`pb-1 border-b-2 transition-all duration-200 ${
        location.pathname === "/how-it-works" ? "border-blue-600 text-blue-600" : "border-transparent hover:border-gray-400"
      }`}
    >
      How It Works
    </Link>
  </li>

  <li>
    <Link
      to="/about"
      className={`pb-1 border-b-2 transition-all duration-200 ${
        location.pathname === "/about" ? "border-blue-600 text-blue-600" : "border-transparent hover:border-gray-400"
      }`}
    >
      About
    </Link>
  </li>

  <li>
    <Link
      to="/contact"
      className={`pb-1 border-b-2 transition-all duration-200 ${
        location.pathname === "/contact" ? "border-blue-600 text-blue-600" : "border-transparent hover:border-gray-400"
      }`}
    >
      Contact
    </Link>
  </li>
</ul>

          

        {user ? (
         <div className="flex items-center gap-6">

<li className="relative list-none" ref={dropdownRef}>
  <div
    onClick={() => setShowDropdown(!showDropdown)}
    className="relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all duration-200"
  >
    <Bell size={22} className="text-gray-700" />
    {notifications.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
        {notifications.length > 9 ? "9+" : notifications.length}
      </span>
    )}
  </div>

  {showDropdown && (
   <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl border border-gray-200 z-50 overflow-hidden">

      <div className="p-3 border-b font-semibold text-gray-700">Notifications</div>
      {notifications.length === 0 ? (
        <p className="p-3 text-gray-500 text-sm">No new notifications</p>
      ) : (
        notifications.map((notif, idx) => (
          <div
            key={idx}
            className="p-3 border-b text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
        <div className="flex justify-between items-center">
  <div className="flex items-center gap-2 font-medium text-blue-600">
  🏢 {notif.companyName || "Company"}
  {Date.now() - new Date(notif.createdAt).getTime() < 3600000 && (
    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
      New
    </span>
  )}
</div>

  <div className="text-xs text-gray-400">
    {new Date(notif.createdAt).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    })}
  </div>
</div>
<div
  className={`mt-1 ${
    notif.type === "accepted"
      ? "text-green-600 font-semibold"
      : notif.type === "rejected"
      ? "text-red-500 font-semibold"
      : "text-gray-700"
  }`}
>
  {notif.message}
</div>


          </div>
        ))
      )}
      {notifications.length > 0 && (
        <button
          onClick={() => setNotifications([])}
          className="w-full text-sm text-blue-600 py-2 hover:bg-gray-100"
        >
          Mark all as read
        </button>
      )}
    </div>
  )}
</li>







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
