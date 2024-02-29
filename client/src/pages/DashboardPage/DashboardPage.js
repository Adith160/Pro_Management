import React, { useState } from 'react'
import styles from './DashboardPage.module.css'
import SideBar from '../../components/SideBar/SideBar'
import Analytics from '../../components/Analytics/Analytics'
import Settings from '../../components/Settings/Settings'
import DashBoard from '../../components/DashBoard/Main/DashBoard'

function DashboardPage() {
  const [ActivePage, setActivePage] = useState(0);
  const toggleActivePage= (page)=>{
    setActivePage(page);
  }
  return (
    <div className={styles.mainDiv}>
      <SideBar toggleActivePage={toggleActivePage}/>
      <div className={styles.mainContainer}>
          {ActivePage===0 &&  <DashBoard />}
          {ActivePage===1 &&  <Analytics />}
          {ActivePage===2 &&  <Settings />}
      </div>
    </div>
  )
}

export default DashboardPage