
import { useState } from "react";
// import "../styles/Login.css";
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          typeof data.detail === "string"
            ? data.detail
            : "Registration failed. Please check your details."
        );
        return;
      }

      setMessage("Account created successfully! You can now sign in.");
    } catch (error) {
      setMessage("Unable to connect to ARIA server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="background-glow"></div>

      <div className="login-container">
        <div className="brand-section">
          <h1>ARIA</h1>
          <p>Adaptive Real-Time Intelligence Assistant</p>
          <span>Intelligence that observes. Understands. Assists.</span>
        </div>

        <div className="login-card">
          <h2>Create Account</h2>
          <p className="login-subtitle">
            Register to get started with ARIA
          </p>

          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              maxLength={100}
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password (minimum 8 characters)"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {message && (
            <p role="status" aria-live="polite">
              {message}
            </p>
          )}

          <p className="signup-text">
            Already have an account? <a href="/">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
