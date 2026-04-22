import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await register(name, email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
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
                    <h1 className="text-4xl font-heading font-bold mb-4 tracking-tight">Create Account</h1>
                    <p className="text-gray-500">Join Trendora to track orders and save favorites.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                            className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
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
                            minLength={6}
                            className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`mt-6 w-full py-4 rounded-full font-medium text-white transition-colors ${loading ? 'bg-gray-400' : 'bg-black hover:bg-black/80'}`}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    
                    <div className="text-center mt-6 text-sm text-gray-500">
                        Already have an account? <Link to="/login" className="text-black font-medium border-b border-black pb-[2px]">Sign In</Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
