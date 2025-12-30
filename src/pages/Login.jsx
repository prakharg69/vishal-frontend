import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const { login, isLoggedIn, user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Validate role
  useEffect(() => {
    if (role !== "user" && role !== "responder") {
      navigate("/login/user");
    }
  }, [role, navigate]);

  // ✅ Prevent logged-in users from seeing login page
  useEffect(() => {
    if (isLoggedIn && user) {
      navigate(
        user.role === "responder"
          ? "/responder/dashboard"
          : "/user/dashboard"
      );
    }
  }, [isLoggedIn, user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔐 Login API (sets cookie)
      await axios.post(
        "http://localhost:5001/api/auth/login",
        { ...form, role },
        { withCredentials: true }
      );

      // ✅ Sync AuthContext immediately
      await login();

      // ✅ Navigate without reload
      navigate(
        role === "user"
          ? "/user/dashboard"
          : "/responder/dashboard"
      );
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-slate-800">
          Login as{" "}
          <span className="text-blue-600 capitalize">{role}</span>
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            to={`/signup/${role}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>

        {/* Switch Role */}
        <p className="text-center text-xs text-slate-500">
          Not a {role}?{" "}
          <Link
            to={`/login/${role === "user" ? "responder" : "user"}`}
            className="text-blue-600 hover:underline"
          >
            Login as {role === "user" ? "Responder" : "User"}
          </Link>
        </p>
      </form>
    </div>
  );
}
