import { FC } from "react";
import { IconApps, IconUser, IconWandOff } from "@tabler/icons-react";
import { sidebarItems } from "@/sidebar";
import Link from "next/link";

const Sidebar: FC = () => {
  return (
    <div className="bg-gray-800 h-screen w-20 fixed top-10 flex flex-col justify-between hidden md:block">
      <div className="flex flex-col items-center">
        {sidebarItems.map((item, index) => (
          <Link href={item.link} key={index} className="w-full">
            <div
              className={`w-full flex flex-col items-center py-4 ${
                index === 0 ? "bg-[#394189]" : "hover:bg-[#394189]"
              } cursor-pointer`}
            >
              <item.icon size={22} className="text-white" />
              <span className="text-white text-xs pt-2">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
