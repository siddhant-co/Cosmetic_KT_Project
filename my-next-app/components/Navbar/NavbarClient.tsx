// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Menu, X, ShoppingCart, Heart } from "lucide-react";
// import UserAvatar from "../UserAvatar/UserAvatar";

// export default function NavbarClient() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [navLinks, setNavLinks] = useState<
//     { label: string; href: string; hasDropdown: boolean }[]
//   >([]);

//   useEffect(() => {
//     const fetchNavItems = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/header`);
//         const data = await res.json();

//         // Make sure the response is an array of objects with { name, link }
//         const formatted = data?.map((item: any) => ({
//           label: item.name || item.title || "Link",
//           href: item.link || "#",
//           hasDropdown: item.hasDropdown ?? false,
//         }));

//         setNavLinks(formatted || []);
//       } catch (error) {
//         console.error("Failed to fetch nav items:", error);
//       }
//     };

//     fetchNavItems();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setShowNavbar(false); // Hide on scroll down
//       } else {
//         setShowNavbar(true); // Show on scroll up
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <nav
//       className={`w-full border-b border-gray-200 fixed top-0 left-0 z-50 transition-transform duration-300 bg-white ${
//         showNavbar ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between h-[66px]">
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={80}
//             height={80}
//             className="object-contain h-25 w-25 p-2"
//           />
//         </Link>

//         {/* Center Links */}
//         <div className="hidden md:flex items-center space-x-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               className="font-medium text-sm hover:text-red-600 transition"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center gap-3">
//           <div className="relative w-full max-w-xs">
//             <input
//               type="text"
//               placeholder="Search for products"
//               className="w-full pl-10 pr-4 py-3 text-sm border bg-[#F3F4F6] border-gray-400 rounded focus:outline-none"
//             />
//             <svg
//               className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
//               />
//             </svg>
//           </div>

//           <UserAvatar />

//           <Link href="/wishlist">
//             <Heart size={23} className="hover:text-red-600 transition-colors" />
//           </Link>
//           <Link href="/cart">
//             <ShoppingCart
//               size={23}
//               className="hover:text-red-600 transition-colors"
//             />
//           </Link>
//           <button
//             className="md:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle Menu"
//           >
//             {isOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-[#f8f5ef] px-4 pb-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               className="block py-2 text-sm font-medium"
//               onClick={() => setIsOpen(false)}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <button className="w-full bg-red-600 text-white text-sm py-2 mt-2 rounded-lg font-semibold">
//             CONTACT US
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }
