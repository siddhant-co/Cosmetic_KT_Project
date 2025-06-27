import MobileMenu from "@/components/ClientsideComponent/Navbar/MobileMenu";
import NavbarIconsWrapper from "@/components/ClientsideComponent/Navbar/NavbarIconsWrapper";
import NavItems from "@/components/ClientsideComponent/Navbar/NavItems";
import SearchBar from "@/components/ClientsideComponent/Navbar/SearchBar";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  return (
    <nav className="w-full bg-[#f3f6f7] shadow p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center gap-4">
        {/* Desktop: Logo + NavItems + Search + Icons */}
        <div className="hidden lg:flex justify-between items-center w-full">
          {/* Left: Logo */}
          <Link href="/">
            <Image src="/logo1.png" alt="Logo" width={120} height={40} />
          </Link>

          {/* Center: Nav Items */}
          <NavItems />

          {/* Right: Search + Icons */}
          <div className="flex items-center gap-4">
            <SearchBar />
            <NavbarIconsWrapper />
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden md:flex lg:hidden justify-between items-center w-full">
          {/* Left: Logo */}
          <Link href="/">
            <Image src="/sitelogo.png" alt="Logo" width={120} height={40} />
          </Link>

          {/* Right: Search + Icons + Menu */}
          <div className="flex items-center gap-4">
            <SearchBar />
            <NavbarIconsWrapper />
            <MobileMenu />
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col md:hidden w-full">
          {/* Top Row: Hamburger at left, Logo at right */}
          <div className="flex justify-between items-center w-full">
            <MobileMenu />
            <Link href="/">
              <Image src="/sitelogo.png" alt="Logo" width={100} height={30} />
            </Link>
          </div>

          {/* Below: Search bar full width */}
          <div className="mt-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
