// components/Navbar/NavItems.tsx
import Link from "next/link";
import { getNavbarData, NavbarItem } from "@/api/NavbarApi";

const NavItems = async () => {
  let navItems: NavbarItem[] = [];

  try {
    const response = await getNavbarData();
    if ("result" in response && Array.isArray(response.result)) {
      navItems = response.result;
    }
  } catch (error) {
    console.error("❌ Failed to fetch navbar items:", error);
  }

  return (
    <ul className="flex gap-10">
      {" "}
      {navItems.map((item) =>
        item.is_active ? (
          <li key={item.id}>
            <Link href={item.link || "#"}>
              <span className="hover:text-blue-600">{item.name}</span>
            </Link>
          </li>
        ) : null
      )}
    </ul>
  );
};

export default NavItems;
