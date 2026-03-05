import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();

  if (Object.keys(validationErrors).length === 0) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // ✅ logs must be HERE
    console.log("Stored users:", users);
    console.log("Entered data:", formData);

    const validUser = users.find(
      (user) =>
        user.email?.toLowerCase().trim() ===
          formData.email?.toLowerCase().trim() &&
        user.password === formData.password
    );

    if (validUser) {
      alert("Login Successful!");
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      navigate("/home");
    } else {
      alert("Invalid email or password!");
    }
  } else {
    setErrors(validationErrors);
  }
};

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signin">Signin</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
