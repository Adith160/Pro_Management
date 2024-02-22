import React from 'react'
import styles from './PopUp.module.css'

function Logout(props) {
  return (
    props.type ==='logout'?( <div className={styles.mainDiv} onClick={props.handleShowLogout}>
      <div className={styles.popup} onClick={(e)=>e.stopPropagation()}>
        <span>Are you sure you want to Logout?</span>
        <button className={styles.blue} style={{backgroundColor:"#17A2B8", color:"white"}} onClick={props.toggleLogout}>Yes, Logout</button>
        <button className={styles.red} onClick={props.handleShowLogout}>Cancel</button>
      </div>
    </div>)
    :
    ( <div className={styles.mainDiv} onClick={props.handleShowLogout}>
      <div className={styles.popup} onClick={(e)=>e.stopPropagation()}>
        <span>Are you sure you want to Delete?</span>
        <button className={styles.blue} style={{backgroundColor:"#17A2B8", color:"white"}} onClick={props.toggleLogout}>Yes, Delete</button>
        <button className={styles.red} onClick={()=>props.setShowDelete(false)}>Cancel</button>
      </div>
    </div>)
   

  )
}

export default Logout