import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfileTooltip = () => {
    const { logoutUser, user } = useContext(AuthContext);
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const [isTooltipHovered, setIsTooltipHovered] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            Swal.fire("Success", "Logged out successfully!", "success");
            navigate("/");
        } catch {
            Swal.fire("Error", "Error logging out!", "error");
        }
    };

    const isTooltipVisible = isProfileHovered || isTooltipHovered;

    return (
        <div
            className="relative w-fit h-full flex items-center justify-center"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
        >
            {/* Profile picture */}
            <img
                src={user.photoURL}
                alt="profile"
                className="w-[50px] h-[50px] rounded-full object-cover border-[3px] cursor-pointer border-teal-500"
            />

            {/* Tooltip */}
            <div
                className={`${
                    isTooltipVisible
                        ? "opacity-100 z-50 translate-y-0 pointer-events-auto"
                        : "opacity-0 z-[-10] translate-y-[20px] pointer-events-none"
                } absolute top-[50px] left-[0%] transform translate-x-[-80%] bg-base-100 w-[250px] rounded-md p-[15px] shadow-lg transition-all duration-300 border-2 border-teal-800 dark:text-white`}
                onMouseEnter={() => setIsTooltipHovered(true)}
                onMouseLeave={() => setIsTooltipHovered(false)}
            >
                {/* Socials */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-[7px]">
                    <p className="text-[1rem] font-[600] text-gray-700 dark:text-white">Socials</p>
                    <div className="flex items-center gap-[8px]">
                        <a href="https://zenui.net">
                            <FaLinkedin className="text-[1.3rem] text-gray-700 dark:text-white hover:text-teal-500 cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out" />
                        </a>
                        <a href="https://zenui.net">
                            <FaGithubSquare className="text-[1.3rem] text-gray-700 dark:text-white hover:text-teal-500 cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out" />
                        </a>
                        <a href="https://zenui.net">
                            <FaInstagramSquare className="text-[1.3rem] text-gray-700 dark:text-white hover:text-teal-500 cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out" />
                        </a>
                    </div>
                </div>

                {/* Account details */}
                <div className="flex items-center justify-center flex-col mt-5">
                    <div className="relative">
                        <img
                            src={user.photoURL}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <div className="w-[10px] h-[10px] rounded-full bg-green-400 absolute top-[7px] right-[8px] border-[2px] border-white"></div>
                    </div>
                    <h4 className="text-[1.1rem] font-[600] text-gray-700 mt-2 dark:text-white">
                        {user.displayName}
                    </h4>
                    <p className="text-[0.8rem] text-gray-600 dark:text-white">{user.email}</p>
                </div>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="flex mx-auto items-center gap-[8px] text-[0.9rem] px-6 py-2 rounded-md text-white font-bold bg-teal-500 mt-4"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileTooltip;
