import React, { useState } from 'react'
import styles from './TaskCard.module.css'
import greenIcon from '../../../assets/icons/GreenEllipse.png'
import redIcon from '../../../assets/icons/RedEllipse.png'
import blueIcon from '../../../assets/icons/BlueEllipse.png'
import upIcon from '../../../assets/icons/UpArrow.png'
import downIcon from '../../../assets/icons/DownArrow.png'

function TaskCard(props) {
  const[Menu, showMenu] = useState(false);
  const handleShowMenu = ()=>{
    showMenu(!Menu);
  }
  return (
    <div className={styles.taskCardDiv}>
        <div className={styles.topSection}>
          {props.priority==='Low'? (<span><img src={greenIcon} alt='green'></img> LOW PRIORITY</span>)
        :  props.priority==='High'? (<span><img src={blueIcon} alt='blue'></img> MODERATE PRIORITY</span>) 
        : (<span><img src={redIcon} alt='red'></img> HIGH PRIORITY</span>)
        }
          <div className={styles.customSelect}>
            <select className={styles.menuSelection}>
              <option value=""></option>
              <option value="option1">Edit</option>
              <option value="option2">Share</option>
              <option value="option3" style={{color: "red"}}>Delete</option>
            </select>
          </div>

        </div>

        <div className={styles.menuDiv}>
       
          </div>

        <span className={styles.title}>Hero Section</span>

        <div className={styles.topSection}>
          <span style={{ fontSize:"0.9rem", fontWeight:"500"}}>Checklist (0/3) </span>
          {!Menu? 
          (<img src={downIcon} alt='down' style={{width:"8%", height:"3.5vh", cursor:"pointer"}} onClick={handleShowMenu}/>)
          : <img src={upIcon} alt='up' style={{width:"8%", height:"3.5vh", cursor:"pointer"}} onClick={handleShowMenu}/>}
        </div>
        
        {Menu && 
        <div className={styles.checklist}>
           <label for="myCheckbox"><input type='checkBox'  value='hah'></input>This is my checkbox</label>
        </div>}

        <div className={styles.bottomSection}>
        <button className={styles.dateBtn} style={{width:"23%", backgroundColor: props.priority === 'High' ? 'red' : ''}}>Feb 10th</button>
          <div className={styles.taskBtn}>
          <button className={styles.dateBtn}>BACKLOG</button>
          <button className={styles.dateBtn}>TO-DO</button>
          <button className={styles.dateBtn}>DONE</button>
          </div>
        </div>
    </div>
  )
}

export default TaskCard