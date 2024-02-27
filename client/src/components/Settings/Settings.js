import React, { useState } from 'react'
import styles from './Settings.module.css'
import {updateUser} from '../../api/auth'
import viewIcon from '../../assets/icons/view.png'
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [userData, setUserData] = useState({
    name: '',
    oldPassword: '',
    newPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    oldPassword: '', 
    newPassword: '',
  })
  const navigate= useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleOnChange=(e)=>{
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', 
    }));
  }
  const handleUserSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};

    if (userData.name.trim() === '') {
      newErrors.name = 'Field Is Required';
    }

    if (userData.oldPassword.trim() === '') {
      newErrors.oldPassword = 'Field Is Required';
    }

    if (userData.newPassword.trim() === '') {
      newErrors.newPassword = 'Field Is Required';
    }

    // Update the errors state
    setErrors(newErrors);

    const resetForm = () => {
      setUserData({
        name: '',
        oldPassword: '',
        newPassword:'',
      });
    };

    if (Object.keys(newErrors).length === 0){
      const response = await updateUser({ ...userData });
      if(response){
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name)
        resetForm();
        navigate('/login');
      }
    }
  }

  const togglePasswordVisibility  = (e) => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2  = (e) => {
    setShowPassword2(!showPassword2);
  };
  return (
    <>
    <div className={styles.mainContainer}>
    <div className={styles.formDiv}>
          <form  onSubmit={handleUserSubmit} autocomplete="off">
          <h2>Settings</h2>
        <input name='name' placeholder='Name' type='text' value={userData.name} onChange={handleOnChange}   className={styles.nameIcon}></input>
        {errors.name && <div className={styles.errorText}>{errors.name}</div>}
        <input name='oldPassword' placeholder='Old Password' type={showPassword ? 'text' : 'password'} value={userData.oldPassword} onChange={handleOnChange} className={styles.lockIcon}></input>
        <img src={viewIcon} alt='view' className={styles.view} onClick={togglePasswordVisibility }/>
        {errors.oldPassword && <div className={styles.errorText}>{errors.oldPassword}</div>}
        <input name='newPassword' placeholder='New Password' type={showPassword2 ? 'text' : 'password'} value={userData.newPassword} onChange={handleOnChange} className={styles.lockIcon}></input>
        <img src={viewIcon} alt='view' className={styles.view2} onClick={togglePasswordVisibility2 }/>
        {errors.newPassword && <div className={styles.errorText}>{errors.newPassword}</div>}
        <button className={styles.submitBtn} type='submit'>Update</button>
      </form>
          </div>
    </div>
    </>
  )
}

export default Settings