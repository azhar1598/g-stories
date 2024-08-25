import { FC } from "react";
import { IconApps, IconUser, IconWandOff } from "@tabler/icons-react";

const Sidebar: FC = () => {
  return (
    <div className="bg-gray-800 h-screen w-20 fixed top-10 flex flex-col justify-between">
      <div className="flex flex-col items-center mt-4">
        <div className="w-full flex flex-col items-center py-4 hover:bg-blue-600">
          <div className="bg-blue-600 w-full flex flex-col items-center py-4">
            <IconWandOff stroke={2} size={32} className="text-white" />
            <span className="text-white text-sm">Generate</span>
          </div>
        </div>

        <div className="w-full flex flex-col items-center py-4">
          <div className="bg-gray-800 w-full flex flex-col  items-center py-4">
            <IconUser size={32} className="text-white" />
            <span className="text-white text-sm">Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
