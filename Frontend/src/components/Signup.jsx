import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asyncPostCall } from '../services/api';

function Signup({ setToken }) {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({ fullName: "", email: "", password: "" });

  const isPasswordValid = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validatedEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    const req = { fullName: signup.fullName, email: signup.email, password: signup.password };
    if (!isPasswordValid(signup.password) || !validatedEmail(signup.email) || !signup.fullName) {
      toast.warning("Please fill details correctly. Password must have one special character and one number.");
      setSignup({ fullName: "", email: "", password: "" });
      return;
    }
    const data = await asyncPostCall("/users/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (data && typeof data === "string") {
      localStorage.setItem("token", data);
      setSignup({ fullName: "", email: "", password: "" });
      toast.success("Registration successful");
      setToken(data);
      navigate("/upload-img");
    } else {
      setSignup({ ...signup, email: "", password: "" });
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={signup.fullName}
              onChange={(e) => setSignup({ ...signup, fullName: e.target.value })}
              placeholder="Enter your name"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={signup.email}
              onChange={(e) => setSignup({ ...signup, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={signup.password}
              onChange={(e) => setSignup({ ...signup, password: e.target.value })}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
