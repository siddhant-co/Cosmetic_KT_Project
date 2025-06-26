// 'use client';

// import { useState } from 'react';



// import { AnimatePresence, motion } from 'framer-motion';
// import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';

// export default function AuthPage() {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="min-h-screen w-full flex justify-center mt-20">
//       {/* Left Form Section */}
//       <div className="w-full  justify-center items-center max-w-full  bg-white px-4">
//         <div className="max-w-md w-full">
//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-6">
//             <button
//               onClick={() => setShowLogin(true)}
//               className={`px-4 py-2 rounded-l cursor-pointer ${
//                 showLogin ? 'bg-[#fb4b02] text-white' : 'bg-gray-200'
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setShowLogin(false)}
//               className={`px-4 py-2 rounded-r cursor-pointer ${
//                 !showLogin ? 'bg-[#fb4b02] text-white' : 'bg-gray-200'
//               }`}
//             >
//               Register
//             </button>
//           </div>

//           {/* Animated Form Content */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={showLogin ? 'login' : 'register'}
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3, ease: 'easeInOut' }}
//               className="overflow-hidden"
//             >
//               {showLogin ? <LoginForm /> : <RegisterForm />}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-10">
      <div className="w-full max-w-5xl mt-5 items-center justify-center bg-white rounded-xl shadow-md overflow-hidden flex  md:flex-row">
        {/* Left - Form Section */}
        <div className="w-full md:w-full p-8 sm:p-10">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowLogin(true)}
              className={`px-4 py-2 rounded-l font-medium  cursor-pointer ${
                showLogin ? 'bg-[#8000ff] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`px-4 py-2 rounded-r font-medium cursor-pointer ${
                !showLogin ? 'bg-[#8000ff] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={showLogin ? 'login' : 'register'}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {showLogin ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
