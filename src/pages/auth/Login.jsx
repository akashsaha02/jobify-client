import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';
import Lottie from 'lottie-react';
import astronot from '../../assets/lottie-files/ufo.json';

const Login = () => {
    const { user, loginUser, googleSignIn, logoutUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData.email, formData.password);
            setFormData({ email: '', password: '' }); // Reset form data
            emailRef.current.value = '';
            passwordRef.current.value = '';
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Error logging in!', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success('Logged in successfully with Google!');
            navigate('/');
        } catch (error) {
            toast.error('Error logging in with Google!', error);
        }
    }

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Error logging out!', error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center dark:bg-gray-900">
            <Helmet>
                <title>Jobify - Login</title>
            </Helmet>
             {/* Lottie Animation */}
             <div className="hidden md:block absolute top-0 left-0 h-full w-1/3">
                <Lottie animationData={astronot} loop className="h-full w-full object-cover" />
            </div>
            <div className="w-full max-w-md p-8 bg-white rounded-lg dark:bg-gray-900 ">
                {user ? (
                    <div className="">
                        <div className="p-4 text-center text-green-600 bg-green-100 rounded flex flex-col justify-center items-center gap-2">
                            <img src={user.photoURL} alt="Avatar" className="w-20 h-20 object-cover rounded-full border-2 border-red-500" />
                            <p className="text-gray-800 dark:text-white">Logged in successfully! {user.displayName || user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            type="submit"
                            className="w-full px-4 py-2 mt-3 md:mt-5 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">

                        <p className="text-center text-blue-600 font-medium">Login</p>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-700 dark:text-gray-200">
                            Member Login
                        </h2>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                            Fill in the form to create an account
                        </p>

                        <button
                            onClick={() => handleGoogleSignIn()}
                            className="w-full flex justify-center rounded text-lg font-semibold items-center gap-2 px-4 py-2 text-md dark:text-white border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <span className="text-xl"><FcGoogle /></span>
                            <p className="text-gray-800 dark:text-white">Login with Google</p>
                        </button>
                        <div className="divider text-sm text-gray-600 dark:text-gray-200" >Or Continue With</div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Section */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-200">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    ref={emailRef}
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            {/* Password Section */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-200">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    ref={passwordRef}
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            {/* Forget Password? */}
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="checkbox-xs checkbox-secondary" />
                                    <span className="text-md">Remember me</span>
                                </div>

                                <p onClick={() =>
                                    navigate('/reset-password', { state: { email: formData.email } })
                                }
                                    className="block text-md text-blue-600 cursor-pointer"
                                >
                                    Forgot password?
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Login
                            </button>


                            <hr className="my-4 border-gray-300 dark:border-gray-600" />


                            <p className="text-center text-gray-600 dark:text-gray-200">
                                Don&apos;t have an account?{' '}
                                <span onClick={() => navigate("/register")} href="/register" className="text-blue-500 hover:underline">
                                    Register here
                                </span>
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
