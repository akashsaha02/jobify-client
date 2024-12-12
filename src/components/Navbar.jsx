import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
// import logo from '../../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import ProfileTooltip from './ProfileTooltip';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 md:text-sm lg:text-md font-semibold rounded-lg mr-2 ${isActive ? 'bg-teal-600 text-white' : 'bg-transparent dark:text-gray-200'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/campaigns"
        className={({ isActive }) =>
          `px-4 py-2 md:text-sm lg:text-md font-semibold rounded-lg mr-2 ${isActive ? 'bg-teal-600 text-white' : 'bg-transparent dark:text-gray-200'
          }`
        }
      >
        All Campaigns
      </NavLink>
      {user && (
        <NavLink
          to="/add-campaign"
          className={({ isActive }) =>
            `px-4 py-2 md:text-sm lg:text-md font-semibold rounded-lg mr-2 ${isActive ? 'bg-teal-600 text-white' : 'bg-transparent dark:text-gray-200'
            }`
          }
        >
          Add Campaign
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/my-campaigns"
          className={({ isActive }) =>
            `px-4 py-2 md:text-sm lg:text-md font-semibold rounded-lg mr-2 ${isActive ? 'bg-teal-600 text-white' : 'bg-transparent dark:text-gray-200'
            }`
          }
        >
          My Campaigns
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/my-donations"
          className={({ isActive }) =>
            `px-4 py-2 md:text-sm lg:text-md font-semibold rounded-lg mr-2 ${isActive ? 'bg-teal-600 text-white' : 'bg-transparent dark:text-gray-200'
            }`
          }
        >
          My Donations
        </NavLink>
      )}

      <ThemeToggle />
      {/* workinng */}
      {/* <input type="checkbox" className="toggle toggle-accent" onChange={toggleTheme} defaultChecked /> */}

    </>
  );

  return (
    <div className="bg-white dark:bg-gray-900 sticky top-0 z-20 shadow-md dark:shadow-gray-700 py-2">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden btn btn-sm btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 dark:text-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <h2
            onClick={() => navigate("/")}
            className="text-xl md:text-2xl lg:text-3xl font-bold cursor-pointer flex items-center gap-2 dark:text-gray-200"
          >
            <span>
              {/* <img className="w-12 h-12 hidden md:block" src={logo} alt="" /> */}
            </span>
            <span className="text-teal-700 dark:text-teal-500">
              CrowdHex
            </span>
          </h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          {
            <NavLink
              to={user ? "/profile" : "/register"}
              className={({ isActive }) =>
                `px-4 py-2 md:text-sm lg:text-md font-semibold rounded-lg ${isActive ? 'bg-teal-600 text-white' : 'bg-transparent dark:text-gray-200'
                }`
              }>
              {user ? "My Profile" : "Register"}
            </NavLink>

          }
          {
            user ? <ProfileTooltip img={user.displayURL} name={user.displayName} email={user.email} /> : <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 md:text-sm lg:text-md font-semibold rounded-lg ${isActive ? 'bg-teal-600 text-white' : 'bg-transparent dark:text-gray-200'
                }`
              }>
              Login
            </NavLink>
          }
        </div>
      </div>
    </div >
  );
};

export default Navbar;
