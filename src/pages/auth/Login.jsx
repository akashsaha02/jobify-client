import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Enter your email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter your password" className="input input-bordered" required />


                        <label className="label">
                            <Link to="/register" className="label-text-alt link link-hover">Don't have an account? <span className="text-primary">Register now!</span></Link>
                        </label>
                        <label className="label">
                            <Link to="/" className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
