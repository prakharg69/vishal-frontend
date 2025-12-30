import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Signup() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    category: "" // ✅ added
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validate role
  useEffect(() => {
    if (role !== "user" && role !== "responder") {
      navigate("/signup/user");
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Extra validation
    if (role === "responder" && !form.category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/auth/signup",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role,
          category: role === "responder" ? form.category : undefined
        },
        { withCredentials: true }
      );

      navigate(`/login/${role}`);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-slate-800">
          Sign up as{" "}
          <span className="text-blue-600 capitalize">{role}</span>
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
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
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Category (ONLY FOR RESPONDER) */}
        {role === "responder" && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="medical">Medical</option>
              <option value="security">Security</option>
              <option value="accident">Accident</option>
              <option value="general">General</option>
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Login */}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to={`/login/${role}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

        {/* Switch Role */}
        <p className="text-center text-xs text-slate-500">
          Not a {role}?{" "}
          <Link
            to={`/signup/${role === "user" ? "responder" : "user"}`}
            className="text-blue-600 hover:underline"
          >
            Sign up as {role === "user" ? "Responder" : "User"}
          </Link>
        </p>
      </form>
    </div>
  );
}
