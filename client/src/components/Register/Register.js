import React, { useState } from "react";
import styles from "./Register.module.css";
import logoArt from "../../assets/images/Art.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import viewIcon from "../../assets/icons/view.png";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error when the user makes a change
    }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (userData.name.trim() === "") {
      newErrors.name = "Field Is Required";
    }

    if (userData.password.trim() === "") {
      newErrors.password = "Field Is Required";
    }

    if (userData.email.trim() === "") {
      newErrors.email = "Field Is Required";
    }

    if (userData.password2.trim() === "") {
      newErrors.password2 = "Field Is Required";
    }

    // Update the errors state
    setErrors(newErrors);

    const resetForm = () => {
      setUserData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    };

    if (Object.keys(newErrors).length === 0) {
      const response = await registerUser({ ...userData });
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name);
        resetForm();
        redirectToLogin();
      }
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.imageDiv}>
        <img src={logoArt} alt="logo" width="50%" height="65%" />
        <div className={styles.texts}>
          <span className={styles.span1}>Welcome aboard my friend </span>
          <span className={styles.span2}>
            just a couple of clicks and we start
          </span>
        </div>
      </div>

      <div className={styles.registerDiv}>
        <div className={styles.mainDiv}>
          <div className={styles.titleDiv}>
            <h3>Register</h3>
          </div>
          {/* form starts here */}
          <div className={styles.formDiv}>
            <form onSubmit={handleUserSubmit} autoComplete="off">
              <input
                name="name"
                placeholder="Name"
                type="tel"
                value={userData.name}
                onChange={handleOnChange}
                className={styles.nameIcon}
              ></input>
              {errors.name && (
                <div className={styles.errorText}>{errors.name}</div>
              )}
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={userData.email}
                onChange={handleOnChange}
                className={styles.mailIcon}
              ></input>
              {errors.email && (
                <div className={styles.errorText}>{errors.email}</div>
              )}
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={userData.password}
                onChange={handleOnChange}
                className={styles.lockIcon}
              ></input>
              <img
                src={viewIcon}
                alt="view"
                className={styles.view}
                style={
                  errors.email && errors.name
                    ? { top: "54%" }
                    : errors.email || errors.name
                    ? { top: "52.5%" }
                    : {}
                }
                onClick={togglePasswordVisibility}
              />
              {errors.password && (
                <div className={styles.errorText}>{errors.password}</div>
              )}
              <input
                name="password2"
                placeholder="Confirm Password"
                type="password"
                value={userData.password2}
                onChange={handleOnChange}
                className={styles.lockIcon}
              ></input>
              {errors.password2 && (
                <div className={styles.errorText}>{errors.password2}</div>
              )}
              <button className={styles.submitBtn} type="submit">
                Register
              </button>
            </form>
            <span className={styles.span3}>Have an account?</span>
            <button
              className={styles.loginBtn}
              type="submit"
              onClick={redirectToLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
