import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://jobtrack-backend-8z23.onrender.com/api/auth/register",
        form
      );

      setMessage(
        response.data.message || "Registration successful!"
      );

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand-icon">J</span>
          <span>JobTrack</span>
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Start managing your job applications in one place.
        </p>

        {message && (
          <div className="auth-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full Name</label>

          <input
            id="register-name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">Email Address</label>

          <input
            id="register-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Password</label>

          <input
            id="register-password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;