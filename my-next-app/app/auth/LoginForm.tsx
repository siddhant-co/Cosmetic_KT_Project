// 'use client';

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { loginSuccess } from '@/store/slices/authSlice';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Eye, EyeOff } from 'lucide-react';

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//     const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('https://ecom-testing.up.railway.app/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.token && data.user) {
//         dispatch(loginSuccess({ customer: data.user, token: data.token }));
//         toast.success('Login successful!');
//         router.push('/');
//       } else {
//         toast.error(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//       <div className="flex max-w-5xl bg-white rounded-xl p-5 mx-auto overflow-hidden shadow-md">

//         {/* Left Side - Form */}
//         <div className="w-full md:w-1/2 p-5 bg-white rounded-xl  ">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
   
//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <label className="block text-sm mb-1 text-gray-700">Email</label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   className={`w-full p-3 rounded-lg pr-10 ${
//                     errors.email ? 'border-red-500 bg-red-50' : 'border border-gray-300'
//                   }`}
//                   placeholder="admin@gmail.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <span className="absolute right-3 top-3 text-gray-400">
                  
//                 </span>
//               </div>
//             </div>

//             <div className="mb-2">
//               <label className="block text-sm mb-1 text-gray-700">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   className="w-full p-3 border border-gray-300 rounded-lg pr-10"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-3 text-gray-400 focus:outline-none"
//                 >
//                   {showPassword ?   <EyeOff /> :    <Eye />}
//                 </button>
//               </div>
//             </div>

//             <div className="mb-6 text-right">
//               <Link href="/forgot-password" className="text-purple-600 text-sm hover:underline">
//                 Forgot Password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//             <div className="flex items-center my-4">
//                <hr className="flex-grow border-t border-gray-300" />
//                  <span className="px-4 text-gray-500 text-sm">or</span>
//                    <hr className="flex-grow border-t border-gray-300" />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
//             >
//                 Continue as Guest
//             </button>
//           </form>
//         </div>

//         {/* Right Side - Illustration */}
//         <div className="hidden md:flex w-1/2 items-center justify-center bg-[#000842]">
//           <Image
//             src="https://readymadeui-nextjs-ecommerce-site-3.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsignin-image.webp&w=1080&q=75" // Update this path to your image
//             alt="Login Illustration"
//             width={400}
//             height={400}
//             className="rounded-lg"
//           />
//         </div>
//       </div>

//   );
// }


// 'use client';

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { loginSuccess } from '@/store/slices/authSlice';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Eye, EyeOff } from 'lucide-react';

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const validateInputs = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!email.trim()) newErrors.email = 'Email is required';
//     if (!password.trim()) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateInputs()) return;

//     setLoading(true);
//     try {
//       const res = await fetch('https://ecom-testing.up.railway.app/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.token && data.user) {
//         dispatch(loginSuccess({ customer: data.user, token: data.token }));
//         toast.success('Login successful!');
//         router.push('/');
//       } else {
//         toast.error(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex max-w-5xl bg-white rounded-xl p-5 mx-auto overflow-hidden shadow-md">
//       {/* Left Side - Form */}
//       <div className="w-full md:w-1/2 p-5 bg-white rounded-xl">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>

//         <form onSubmit={handleLogin}>
//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-sm mb-1 text-gray-700">Email</label>
//             <div className="relative">
//               <input
//                 type="email"
//                 className={`w-full p-3 rounded-lg pr-10 ${
//                   errors.email ? 'border-red-500 bg-red-50' : 'border border-gray-300'
//                 }`}
//                 placeholder="admin@gmail.com"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setErrors((prev) => ({ ...prev, email: '' }));
//                 }}
//               />
//             </div>
//             {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
//           </div>

//           {/* Password Field */}
//           <div className="mb-2">
//             <label className="block text-sm mb-1 text-gray-700">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 className={`w-full p-3 rounded-lg pr-10 ${
//                   errors.password ? 'border-red-500 bg-red-50' : 'border border-gray-300'
//                 }`}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   setErrors((prev) => ({ ...prev, password: '' }));
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-3 text-gray-400 focus:outline-none"
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>
//             {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
//           </div>

//           {/* Forgot Password */}
//           <div className="mb-6 text-right">
//             <Link href="/forgot-password" className="text-purple-600 text-sm hover:underline">
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
//           >
//             {loading ? 'Signing in...' : 'Sign in'}
//           </button>

//           {/* OR Separator */}
//           <div className="flex items-center my-4">
//             <hr className="flex-grow border-t border-gray-300" />
//             <span className="px-4 text-gray-500 text-sm">or</span>
//             <hr className="flex-grow border-t border-gray-300" />
//           </div>

//           {/* Guest Button (optional functionality) */}
//           <button
//             type="button"
//             disabled={loading}
//             onClick={() => toast.success('Guest login coming soon!')}
//             className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
//           >
//             Continue as Guest
//           </button>
//         </form>
//       </div>

//       {/* Right Side - Illustration */}
//       <div className="hidden md:flex w-1/2 items-center justify-center bg-[#000842]">
//         <Image
//           src="https://readymadeui-nextjs-ecommerce-site-3.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsignin-image.webp&w=1080&q=75"
//           alt="Login Illustration"
//           width={400}
//           height={400}
//           className="rounded-lg"
//         />
//       </div>
//     </div>
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
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* <div className="flex max-w-5xl w-full bg-white rounded-xl p-5 shadow-lg overflow-hidden"> */}
      <div className="w-full max-w-5xl flex mx-auto  md:p-4  border-[1px] border-gray-300 bg-white rounded-lg shadow-lg">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-5">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm mb-1 text-gray-700">Email</label>
              <input
                type="email"
                className={`w-full p-3 rounded-lg border ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm mb-1 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full p-3 pr-10 rounded-lg border ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-right">
              <Link href="/forgot-password" className="text-purple-600 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Guest Button */}
            <button
              type="button"
              disabled={loading}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Continue as Guest
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#000842]">
          <Image
            src="https://readymadeui-nextjs-ecommerce-site-3.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsignin-image.webp&w=1080&q=75"
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
