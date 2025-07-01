// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/store/slices/authSlice";
// import { RootState } from "@/store/store";
// import { FiUser } from "react-icons/fi";

// export default function UserAvatar() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const customer = useSelector((state: RootState) => state.auth.customer);

//   const username =
//     customer?.username ||
//     customer?.firstName ||
//     (customer?.email ? customer.email.split("@")[0] : "") ||
//     "";

//   const initials = username ? username.slice(0, 2).toUpperCase() : "US";

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push("/auth");
//     router.refresh();
//   };

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // If user not logged in, show login icon
//   if (!customer) {
//     return (
//       <Link href="/auth" aria-label="Login">
//         <div className="flex flex-col items-center">
//           <FiUser size={20} />
//           <span>Profile</span>
//         </div>
//       </Link>
//     );
//   }

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={toggleMenu}
//         aria-haspopup="true"
//         aria-expanded={menuOpen}
//         className="flex items-center space-x-2 bg-white px-2 py-1 rounded-full shadow border border-gray-200 hover:shadow-md transition-all cursor-pointer"
//       >
//         <div className="w-9 h-9 rounded-full bg-[#e60076] text-white flex items-center justify-center font-bold text-sm uppercase">
//           {initials}
//         </div>
//         <span className="hidden md:inline text-gray-800 font-medium text-sm">
//           {username}
//         </span>
//       </button>

//       {menuOpen && (
//         <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
//           <button
//             onClick={handleLogout}
//             aria-label="Logout"
//             className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
 
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { FiUser } from "react-icons/fi";
import { BsBoxSeam, BsTag } from "react-icons/bs";
import { MdLogout, MdOutlineEmail } from "react-icons/md";
import { FaRegHeart, FaBell, FaUserEdit } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { BiGift } from "react-icons/bi";
import Image from "next/image";
 
export default function UserAvatar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
 
  const customer = useSelector((state: RootState) => state.auth.customer);
 
  const username =
    customer?.firstName && customer?.lastName
      ? `${customer.firstName} ${customer.lastName}`
      : customer?.firstName ||
        customer?.username ||
        (customer?.email ? customer.email.split("@")[0] : "") ||
        "";
 
  const initials = username ? username.slice(0, 2).toUpperCase() : "US";
 
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth");
    router.refresh();
  };
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  if (!customer) {
    return (
      <Link href="/auth" aria-label="Login">
        <div className="flex flex-col items-center text-xs text-gray-700">
          <FiUser size={20} />
          <span>Profile</span>
        </div>
      </Link>
    );
  }
 
  const menuItems = [
    {
      name: "My Profile",
      icon: <FaUserEdit className="mr-3 text-gray-500" />,
      action: () => router.push("/account?tab=profile"),
    },
    {
      name: "SuperCoin Zone",
      icon: <GiReceiveMoney className="mr-3 text-gray-500" />,
      action: () => alert("SuperCoin Zone Clicked"),
    },
    {
      name: "Flipkart Plus Zone",
      icon: <MdOutlineEmail className="mr-3 text-gray-500" />,
      action: () => alert("Flipkart Plus Zone Clicked"),
    },
    {
      name: "Orders",
      icon: <BsBoxSeam className="mr-3 text-gray-500" />,
      action: () => router.push("/account?tab=orders"),
    },
    {
      name: "Wishlist (2)",
      icon: <FaRegHeart className="mr-3 text-gray-500" />,
      action: () => alert("Wishlist Clicked"),
    },
    {
      name: "Coupons",
      icon: <BsTag className="mr-3 text-gray-500" />,
      action: () => alert("Coupons Clicked"),
    },
    {
      name: "Gift Cards",
      icon: <BiGift className="mr-3 text-gray-500" />,
      action: () => alert("Gift Cards Clicked"),
    },
    {
      name: "Notifications",
      icon: <FaBell className="mr-3 text-gray-500" />,
      action: () => alert("Notifications Clicked"),
    },
  ];
 
  return (
    <div className="relative" ref={menuRef}>
      <div
        onMouseEnter={() => setMenuOpen(true)}
        className="flex items-center gap-3 cursor-pointer px-8 py-1 rounded-md hover:bg-gray-100 transition-all duration-200"
      >
        {customer.imageUrl ? (
          <Image
            src={customer.imageUrl}
            alt="User Avatar"
            width={10}
            height={10}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-bold text-base uppercase border border-gray-300">
            {initials}
          </div>
        )}
        <span className="text-gray-800 font-medium text-sm whitespace-nowrap">
          {username}
        </span>
      </div>
 
      {menuOpen && (
        <div
          onMouseLeave={() => setMenuOpen(false)}
          className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in"
        >
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    item.action();
                  }}
                  className="flex items-center w-full px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.icon}
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t px-4 py-2">
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="flex items-center text-sm text-red-600 hover:text-red-700 w-full"
            >
              <MdLogout className="mr-3" size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 
 