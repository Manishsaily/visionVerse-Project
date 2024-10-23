import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavbarItem = ({ label, href, isActive, onClick }) => {
  return (
    <div
      className={`p-2 rounded-lg mb-2 cursor-pointer hover:shadow-lg text-black ${
        isActive ? "border-blue-500" : "border-gray-300"
      }`}
      onClick={onClick}
      style={{
        backgroundColor: isActive
          ? "rgba(173, 216, 230, 0.5)"
          : "rgba(255, 255, 255, 0.9)", // Highlight background for active
      }}
    >
      <Link href={href}>
        <div className="text-xl font-semibold">{label}</div>
      </Link>
    </div>
  );
};

export const RightNavbar = () => {

  const [activeIndex, setActiveIndex] = useState(null); // Track active navbar item
  const pathname = usePathname();

  const navItems = [
    { label: "On Board", href: "" },
    { label: "Result", href: "/result" },
    { label: "Quiz", href: "/style" },
    
  ];

  useEffect(() => {
    // Check if current pathname matches any of the nav item hrefs
    const index = navItems.findIndex((item) => {
      return item.href === pathname || 
             (item.label === "Quiz" && (pathname.startsWith("/template") || pathname.startsWith("/setting")));
    });
    setActiveIndex(index !== -1 ? index : null); // No default, only set if a match
  }, [pathname]);

  return (
    <div className="mt-40 h-1/4 p-4 rounded-lg">
      <div className="flex flex-col">
        {navItems.map((item, index) => (
          <NavbarItem
            key={index}
            label={item.label}
            href={item.href}
            isActive={activeIndex === index} // Highlight active item
            onClick={() => setActiveIndex(index)} // Set active item on click
          />
        ))}
      </div>
    </div>
  );
};
