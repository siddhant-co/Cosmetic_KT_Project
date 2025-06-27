// components/Navbar/Navbar.tsx
import Image from "next/image";
import NavItems from "./NavItems";
import NavbarIcons from "./NavbarIcons";

const Navbar = async () => {
  return (
    <nav className="w-full bg-white shadow p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative px-4">
        <div className="h-10 flex items-center">
          {" "}
          {/* Limit container height */}
          <Image
            src="/sitelogo.png"
            alt="Logo"
            width={120} // Increased width
            height={120} // Increased height
            className="object-contain size-25" // Prevent stretching the parent
          />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <NavItems />
        </div>
        <NavbarIcons />
      </div>
    </nav>
  );
};

export default Navbar;
