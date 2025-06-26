// components/Navbar/Navbar.tsx
import NavItems from "./NavItems";

const Navbar = async () => {
  return (
    <nav className="w-full px-4 py-2 bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">YourLogo</div>
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
