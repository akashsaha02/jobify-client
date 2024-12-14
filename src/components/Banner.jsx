// import Lottie from "lottie-react";
// import typewriterAnimation from "../../assets/new.json"; // Replace with your Lottie JSON file path
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <section className="bg-blue-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 items-center lg:justify-between">
                {/* Left Content */}
                <div className=" max-w-2xl">
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight max-w-xl">
                        The <span className="text-blue-600">Easiest Way </span>
                         to Get Your New Job
                    </h1>
                    <div className="mt-4 text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-300">
                        <Typewriter
                            words={[
                                "Start your journey today.",
                                "Turn dreams into reality.",
                                "Fund your ideas effortlessly.",
                            ]}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </div>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                        Each month, more than 3 million job seekers turn to
                        website in their search for work, making over 140,000
                        applications every single day
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-start">
                        <Link to={'/add-campaign'} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white text-lg font-medium rounded-lg shadow-lg transition-all">
                            Start a Campaign
                        </Link>
                        <Link to={'/campaigns'} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white text-lg font-medium rounded-lg shadow-lg transition-all">
                            Explore Projects
                        </Link>
                    </div>
                </div>

                {/* Right Content */}
                <div className="mt-12 lg:mt-0 flex justify-center md:justify-end">
                    <div className="relative">
                        {/* <Lottie
                            animationData={typewriterAnimation}
                            className="w-full max-w-md"
                            loop
                            autoplay
                        /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
