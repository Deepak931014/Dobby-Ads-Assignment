import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asyncPostCall } from '../services/api';

function Login({ setToken }) {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });

  const isPasswordValid = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validatedEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    const req = { email: login.email, password: login.password };
    if (!validatedEmail(login.email) || !isPasswordValid(login.password)) {
      toast.warning("Please fill details correctly");
      setLogin({ email: "", password: "" });
      return;
    }
    const data = await asyncPostCall("/users/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (data && typeof data === "string") {
      localStorage.setItem("token", data);
      setLogin({ email: "", password: "" });
      toast.success("Login successfully");
      setToken(data);
      navigate("/upload-img");
    } else {
      setLogin({ email: "", password: "" });
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg">
    <h2 className="text-2xl font-bold mb-8">Login</h2>
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          placeholder="Enter your password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded-md">Login</button>
    </form>
    <p className="mt-4 text-gray-600">
      Don't have an account?{' '}
      <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/sign-up")}>Sign up</span>
    </p>
  </div>
</div>

  );
}

export default Login;
