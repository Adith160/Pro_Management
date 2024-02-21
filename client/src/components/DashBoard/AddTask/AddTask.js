import React, { useState } from 'react'
import styles from './AddTask.module.css'
import {loginUser} from '../../../api/auth'

function AddTask(props) {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
      });

      const [errors, setErrors] = useState({
        email: '',
        password: '', 
      })

      const handleOnChange = (e) => {
        e.stopPropagation(); // Prevent event from propagating to parent div
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '', // Clear the error when the user makes a change
        }));
      };
      

      const handleClick = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to parent
        props.handleShowAddTask();
      };

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
          }
        }
      }
  return (
    <div className={styles.mainDiv} onClick={handleClick}>
        <div className={styles.addDiv} onClick={(e) => e.stopPropagation()}>
            <form  onSubmit={handleUserSubmit} autocomplete="off">
                <h6>Title</h6>
                <input name='email' placeholder='Email' type='email' value={userData.email} onChange={handleOnChange}   className={styles.mailIcon}></input>
                {errors.email && <div className={styles.errorText}>{errors.email}</div>}
                {errors.password && <div className={styles.errorText}>{errors.password}</div>}
                <button className={styles.submitBtn} type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default AddTask