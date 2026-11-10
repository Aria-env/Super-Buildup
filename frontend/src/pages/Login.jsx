
import { useState } from "react";
import "../styles/Login.css";

function Login({ onCreateAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Login failed. Please try again.");
        return;
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("aria_access_token", data.access_token);

      setMessage("Login successful! Welcome to ARIA.");
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
          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to continue to your ARIA account
          </p>

          <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <div className="login-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />
                Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {message && (
            <p role="status" aria-live="polite">
              {message}
            </p>
          )}

          <div className="separator">
            <span>OR</span>
          </div>

          <button type="button" className="google-button">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.85 46.98 31.7 46.98 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.5 14.5 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            Continue with Google
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onCreateAccount();
              }}
            >
              Create account
            </a>
          </p>

          <p className="terms">
            By continuing, you agree to ARIA's Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
