import React from 'react'
import styles from './Settings.module.css'
import SideBar from '../SideBar/SideBar'

function Settings() {
  return (
    <>
    <div className={styles.mainDiv}>
    <SideBar />
    <div className={styles.mainContainer}></div>
    </div>
    </>
  )
}

export default Settings