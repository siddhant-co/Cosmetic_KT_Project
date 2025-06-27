// components/Navbar/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/ClientsideComponent/Navbar/NavItems";
import MobileMenu from "@/components/ClientsideComponent/Navbar/MobileMenu";
import NavbarIconsWrapper from "@/components/ClientsideComponent/Navbar/NavbarIconsWrapper";

const Navbar = async () => {
  return (
    <nav className="w-full bg-white shadow p-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Left: Logo */}
        <Link href="/">
          <Image src="/sitelogo.png" alt="Logo" width={100} height={40} />
        </Link>

        {/* Center Nav Items for md+ */}
        <div className="hidden md:block">
          <NavItems />
        </div>

        {/* Right Icons for md+ */}
        <div className="hidden md:block">
          <NavbarIconsWrapper />
        </div>

        {/* Mobile / Tablet Menu */}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
