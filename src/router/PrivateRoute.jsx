import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, Link } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className='flex flex-col gap-2 justify-center items-center min-h-screen'>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    if (user) {
        return children
    }

    return (
        <Navigate to="/login" replace />
    )
}

export default PrivateRoute
