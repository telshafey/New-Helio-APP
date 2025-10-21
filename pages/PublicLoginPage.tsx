import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';

const PublicLoginPage: React.FC = () => {
    const { publicLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = publicLogin(email, password);
        if (success) {
            navigate('/profile');
        } else {
            setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        }
    };

    const handleQuickLogin = (quickEmail: string, quickPass: string) => {
        setError('');
        const success = publicLogin(quickEmail, quickPass);
        if (success) {
            // This is a simple check based on the mock data. A real app would get the user role from the login response.
            if (quickEmail === 'ahmed.masri@example.com') {
                 navigate('/my-business');
            } else {
                 navigate('/profile');
            }
        } else {
            setError('فشل تسجيل الدخول السريع.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-slate-100 dark:bg-slate-900 px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 sm:p-12 animate-fade-in-up">
                    <Logo className="h-16 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">بوابة الدخول</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-8">سواء كنت مستخدماً أو مقدم خدمة، يمكنك تسجيل الدخول من هنا.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="mt-1 block w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">كلمة المرور</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="mt-1 block w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            دخول
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">أو استخدم الدخول السريع (للتجربة)</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => handleQuickLogin('test@test.com', 'password')}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-cyan-700 bg-cyan-100 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                                دخول كمستخدم
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickLogin('ahmed.masri@example.com', 'password')}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                دخول كمقدم خدمة
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        ليس لديك حساب؟{' '}
                        <Link to="/register" className="font-medium text-cyan-600 hover:text-cyan-500">
                            أنشئ حساباً جديداً
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PublicLoginPage;