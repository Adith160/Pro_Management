import React, { useState } from 'react'
import styles from './Settings.module.css'
import {updateUser} from '../../api/auth'
import viewIcon from '../../assets/icons/view.png'

function Settings() {
  const [userData, setUserData] = useState({
    name: '',
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    password: '', 
    password2: '',
  })

  const [showPassword, setShowPassword] = useState(false);
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

    if (userData.name.trim() === '') {
      newErrors.name = 'Field Is Required';
    }

    if (userData.password.trim() === '') {
      newErrors.password = 'Field Is Required';
    }

    if (userData.email.trim() === '') {
      newErrors.email = 'Field Is Required';
    }

    if (userData.phone.trim() === '') {
      newErrors.password2 = 'Field Is Required';
    }

    // Update the errors state
    setErrors(newErrors);

    const resetForm = () => {
      setUserData({
        name: '',
        email: '',
        password: '',
        password2:'',
      });
    };

    if ((Object.keys(newErrors).length === 0) && (userData.check===true)){
     
      const response = await updateUser({ ...userData });
      if(response){
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name)
        resetForm();
      }
    }
  }

  const togglePasswordVisibility  = (e) => {
    setShowPassword(!showPassword);
  };
  return (
    <>
    <div className={styles.mainContainer}>
    <div className={styles.formDiv}>
          <form  onSubmit={handleUserSubmit} autocomplete="off">
          <h2>Settings</h2>
        <input name='name' placeholder='Name' type='text' value={userData.name} onChange={handleOnChange}   className={styles.nameIcon}></input>
        {errors.name && <div className={styles.errorText}>{errors.name}</div>}
        <input name='password' placeholder='Password' type={showPassword ? 'text' : 'password'} value={userData.password} onChange={handleOnChange} className={styles.lockIcon}></input>
        <img src={viewIcon} alt='view' className={styles.view} onClick={togglePasswordVisibility }/>
        {errors.password && <div className={styles.errorText}>{errors.password}</div>}
        <input name='password2' placeholder='Confirm Password' type='password' value={userData.password2} onChange={handleOnChange} className={styles.lockIcon}></input>
        <img src={viewIcon} alt='view' className={styles.view2} onClick={togglePasswordVisibility }/>
        {errors.password2 && <div className={styles.errorText}>{errors.password2}</div>}
        <button className={styles.submitBtn} type='submit'>Update</button>
      </form>
          </div>
    </div>
    </>
  )
}

export default Settings