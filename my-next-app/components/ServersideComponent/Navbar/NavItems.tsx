import Link from "next/link";
import { getNavbarData } from "@/api/NavbarApi";

const NavItems = async () => {
  let navItems = [];

  try {
    const response = await getNavbarData();

    console.log("Navitems Response ", response);
    navItems = Array.isArray(response)
      ? response
      : response?.data || response?.items || [];
  } catch (error) {
    console.error("❌ Failed to fetch navbar items:", error);
  }

  return (
    <ul className="flex gap-6">
      {navItems.map((item: any) => (
        <li key={item.id}>
          <Link href={item.link || "#"}>
            <span className="hover:text-blue-600">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
