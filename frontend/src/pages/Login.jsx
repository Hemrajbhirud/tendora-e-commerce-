import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-heading font-bold mb-4 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to your Trendora account.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <a href="#" className="flex-col text-sm text-gray-500 hover:text-black transition-colors flex items-center">
                            Forgot Password?
                        </a>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`mt-4 w-full py-4 rounded-full font-medium text-white transition-colors ${loading ? 'bg-gray-400' : 'bg-black hover:bg-black/80'}`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    
                    <div className="text-center mt-6 text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-black font-medium border-b border-black pb-[2px]">Create one</Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
