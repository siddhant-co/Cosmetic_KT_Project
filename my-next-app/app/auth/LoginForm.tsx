// 'use client';
// import toast from 'react-hot-toast';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import ForgotPassword from './ForgotPassword/page';
// import { loginSuccess } from '@/store/slices/authSlice';
// import Image from 'next/image';


// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   // New state to toggle between login and forgot password
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       const res = await fetch('https://ecom-testing.up.railway.app/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
  
//       if (res.ok) {
//         const data = await res.json();
//         if (data.user && data.token) {
//           dispatch(loginSuccess({ customer: data.user, token: data.token }));
  
//           toast.success('Login successful! Redirecting...');
//           setEmail('');
//           setPassword('');
  
//           setTimeout(() => {
//             router.push('/');
//           }, 1000);
//         } else {
//           toast.error('Invalid login response');
//         }
//       } else {
//         const errorData = await res.json();
//         toast.error(errorData.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('An error occurred during login.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   if (showForgotPassword) {
//     // Show Forgot Password component
//     return (
//       <div className="max-w-md mx-auto p-6 border bg-white shadow rounded">
//         <button
//           onClick={() => setShowForgotPassword(false)}
//           className="mb-4 text-blue-600 underline"
//         >
//           ← Back to Login
//         </button>
//         <ForgotPassword />
//       </div>
//     );
//   }

//   // Default: show login form
//   return (
//     <div className="w-full flex justify-center items-center  px-4">
//   <div className="w-full max-w-[1000px] flex border border-gray-300 shadow rounded overflow-hidden bg-white">
    
//     {/* Login Form */}
//     <form
//       onSubmit={handleLogin}
//       className="w-full md:w-1/2 p-6"
//       autoComplete="off"
//     >
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full mb-3 p-2 border rounded border-gray-300"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         autoComplete="email"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full mb-3 p-2 border rounded border-gray-300"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         autoComplete="current-password"
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer"
//       >
//         {loading ? 'Logging in...' : 'Login'}
//       </button>

//       <p className="mt-4 text-center text-sm">
//         <button
//           type="button"
//           onClick={() => setShowForgotPassword(true)}
//           className="text-blue-600 underline"
//         >
//           Forgot password?
//         </button>
//       </p>
//     </form>

//     {/* Image Section */}
//     <div className="hidden md:block w-1/2 relative">
//       <Image
//         src="https://readymadeui-nextjs-ecommerce-site-3.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsignin-image.webp&w=1080&q=75"
//         alt="authImage"
//         fill
//         className="object-cover"
//       />
//     </div>
//   </div>
// </div>

//   );
// }


'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { loginSuccess } from '@/store/slices/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://ecom-testing.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token && data.user) {
        dispatch(loginSuccess({ customer: data.user, token: data.token }));
        toast.success('Login successful!');
        router.push('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex max-w-5xl w-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
   
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm mb-1 text-gray-700">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-3 text-gray-400">
                  
                </span>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm mb-1 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-400 focus:outline-none"
                >
                  {showPassword ?   <EyeOff /> :    <Eye />}
                </button>
              </div>
            </div>

            <div className="mb-6 text-right">
              <Link href="/forgot-password" className="text-purple-600 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <div className="flex items-center my-4">
               <hr className="flex-grow border-t border-gray-300" />
                 <span className="px-4 text-gray-500 text-sm">or</span>
                   <hr className="flex-grow border-t border-gray-300" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
            >
                Continue as Guest
            </button>
          </form>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#000842]">
          <Image
            src="https://readymadeui-nextjs-ecommerce-site-3.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsignin-image.webp&w=1080&q=75" // Update this path to your image
            alt="Login Illustration"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
