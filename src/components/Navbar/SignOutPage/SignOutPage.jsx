import React, { useState } from 'react';

const SignOutPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 

   
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    
    alert("Signed in successfully!");
    onLoginSuccess(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs">
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl w-[90%] max-w-md p-8 shadow-2xl text-[var(--text)] flex flex-col items-center">
        
        {/* YouTube Logo */}
        <div className="flex items-center gap-1 mb-6">
          <div className="bg-red-600 text-white flex items-center justify-center rounded-xl w-9 h-7">
            <span className="font-bold text-sm">▶</span>
          </div>
          <span className="font-bold text-2xl tracking-tighter">YouTube</span>
        </div>

        <h2 className="text-xl font-semibold mb-2">Sign in to your account</h2>
        

        {/* Error Message Display */}
        {error && (
          <div className="w-full bg-red-500/10 border border-red-500 text-red-500 text-xs py-2 px-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--sub)]">Email or phone</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent border border-[var(--border)] rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--sub)]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent border border-[var(--border)] rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <button 
            type="submit" 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer text-sm"
          >
            Sign in
          </button>
        </form>

      </div>
    </div>
  );
};

export default SignOutPage;