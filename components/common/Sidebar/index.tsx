import { FC } from "react";
import { IconApps, IconUser, IconWandOff } from "@tabler/icons-react";
import { sidebarItems } from "@/sidebar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Logo from "@/public/assets/logo/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar: FC = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    // <div className="bg-gray-800 h-screen w-20 fixed top-10 flex flex-col justify-between hidden md:block">
    //   <div className="flex flex-col items-center">
    //     {sidebarItems.map((item, index) => (
    //       <Link href={item.link} key={index} className="w-full">
    //         <div
    //           className={`w-full flex flex-col items-center py-4 ${
    //             index === 0 ? "bg-[#394189]" : "hover:bg-[#394189]"
    //           } cursor-pointer`}
    //           onClick={(e) => {
    //             if (item.name != "Logout") return;
    //             e.stopPropagation();
    //             signOut({ callbackUrl: "/login" });
    //           }}
    //         >
    //           <item.icon size={22} className="text-white" />
    //           <span className="text-white text-xs pt-2">{item.name}</span>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>

    <div className=" menu  h-screen fixed  flex flex-col justify-between hidden md:block">
      <ul className="menu bg-gray-800 ">
        {sidebarItems.map((item, index) => (
          <li className=" mt-3">
            <Link
              href={item.link}
              key={index}
              className={`flex flex-col justify-center items-center tooltip tooltip-right ${
                pathname.includes(item.link) && "active "
              }`}
              onClick={(e) => {
                // if (item.name != "Logout") return;
                e.stopPropagation();
                console.log(item.link, pathname);
                // signOut({ callbackUrl: "/login" });
              }}
            >
              <item.icon size={22} className="text-white" />
              <span className="text-white text-center text-xs pt-2">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
