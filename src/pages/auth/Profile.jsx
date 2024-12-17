import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { FaEdit, FaSignOutAlt, FaFolderOpen, FaDonate } from "react-icons/fa";
// import bgImg  from "../../assets/Wave.png";
const Profile = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error", "User not authenticated.", "error");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim(),
      });
      Swal.fire("Success", "Profile updated successfully!", "success");
      setIsModalOpen(false);
    } catch {
      Swal.fire("Error", "Failed to update profile. Please try again.", "error");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-950 justify-center py-8 bg-cover bg-top bg-no-repeat px-4"
    >
      <Helmet>
        <title>CrowdHex | My Profile</title>
      </Helmet>

      {/* Profile Card */}
      <div className="w-full max-w-4xl bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="h-24 bg-blue-400/70 "></div>
        <div className="flex justify-center -mt-16">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="text-center py-8">
          <h1 className="text-2xl font-semibold dark:text-gray-200 text-gray-800">
            Welcome back, {user?.displayName || "User Name"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Email: {user?.email || "user@example.com"}
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              onClick={() => setIsModalOpen(true)}
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="flex items-center justify-center px-4 py-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => navigate("/my-campaigns")}
        >
          <FaFolderOpen className="text-blue-500 text-3xl mr-4" />
          <span className="text-lg font-semibold dark:text-gray-200">
            My Campaigns
          </span>
        </button>
        <button
          className="flex items-center justify-center px-4 py-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => navigate("/my-donations")}
        >
          <FaDonate className="text-blue-500 text-3xl mr-4" />
          <span className="text-lg font-semibold dark:text-gray-200">
            My Donations
          </span>
        </button>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box dark:bg-gray-800 bg-white">
            <h3 className="font-bold text-lg text-center mb-4 dark:text-gray-200">
              Update Profile
            </h3>
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="modal-action flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
