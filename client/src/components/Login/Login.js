import React, { useState }  from 'react'
import styles from './Login.module.css'
import logoArt from '../../assets/images/Art.png'
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../api/auth'
import viewIcon from '../../assets/icons/view.png'

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });


  const [errors, setErrors] = useState({
    email: '',
    password: '', 
  })

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleOnChange=(e)=>{
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error when the user makes a change
    }));
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};

    if (userData.password.trim() === '') {
      newErrors.password = 'Field Is Required';
    }

    if (userData.email.trim() === '') {
      newErrors.email = 'Field Is Required';
    }

    // Update the errors state
    setErrors(newErrors);

    const resetForm = () => {
      setUserData({
        email: '',
        password: '',
      });
    };

    if ((Object.keys(newErrors).length === 0) && (userData.check===true)){
     
      const response = await loginUser({ ...userData });
      if(response){
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name)
        resetForm();
        redirectToRegister();
      }
    }
  }

  const redirectToRegister = () =>{
    navigate("/register");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.imageDiv}>
        <img src={logoArt} alt='logo' width='50%' height='65%'/>
        <div className={styles.texts}>
          <span className={styles.span1}>Welcome aboard my friend </span> 
          <span className={styles.span2}>just a couple of clicks and we start</span>
        </div>
      </div>

      <div className={styles.loginDiv}>
        <div className={styles.mainDiv}>
          <div className={styles.titleDiv}>
              <h3>Login</h3>
          </div>
     {/* form starts here */}
          <div className={styles.formDiv}>
          <form  onSubmit={handleUserSubmit} >
        <input name='email' placeholder='Email' type='email' value={userData.email} onChange={handleOnChange}  autocomplete="new-password" className={styles.mailIcon}></input>
        {errors.email && <div className={styles.errorText}>{errors.email}</div>}
        <input name='password' placeholder='Password' type={showPassword ? 'text' : 'password'} value={userData.password} onChange={handleOnChange} className={styles.lockIcon}></input>
        <img src={viewIcon} alt='view' className={styles.view} onClick={togglePasswordVisibility }/>
        {errors.password && <div className={styles.errorText}>{errors.password}</div>}
        <button className={styles.submitBtn} type='submit'>Login</button>
      </form>
      <span className={styles.span3}>Have no account yet?</span>
      <button className={styles.loginBtn} type='submit' onClick={redirectToRegister}>Register</button>
          </div>
       </div>  
       

      </div>
    </div>
  )
}

export default Login