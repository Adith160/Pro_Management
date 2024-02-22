import React, { useState } from 'react';
import styles from './DashBoard.module.css';
import TaskCard from './TaskCard/TaskCard'
import AddTask from './AddTask/AddTask';
import collapseIcon from '../../assets/icons/codicon_collapse-all.png'
import addIcon from '../../assets/icons/Add.png'

function DashBoard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const[showAddTask, setShowAddTask] = useState(false);

  const handleShowAddTask=(e)=>{
    setShowAddTask(!showAddTask)
  }

  return (
    <div className={styles.mainContainer}>
        <div className={styles.topDiv}>
            <span className={styles.headSpan}>Welcome! Kumar</span>
            <span>{formattedDate}</span>
        </div>

        <div className={styles.headingDiv}>
          <span className={styles.headSpan}>Board</span>
          <select className={styles.weekSelection}>
             <option value="option1" style={{border: "none"}}>Today</option>
             <option value="option2" selected>This week</option>
             <option value="option3">This month</option>
          </select>
        </div>

        <div className={styles.mainDiv}>
            <div className={styles.taskDiv}>
                <div className={styles.taskHead}>
                  <span className={styles.headSpan2}>Backlog</span> 
                  <img src={collapseIcon} alt='collapse' className={styles.collapse}/>
                </div>
                <div className={styles.taskRecords}>
                <TaskCard />
                <TaskCard />
                <TaskCard />
                </div>
                
            </div>

            <div className={styles.taskDiv}>
                <div className={styles.taskHead}>
                  <span className={styles.headSpan2}>To do</span> 
                  <div>
                      <img src={addIcon} alt='collapse'style={{width:"35%", height:"40%", marginRight:"20%", cursor:"pointer"}} onClick={handleShowAddTask}/>
                      <img src={collapseIcon} alt='collapse' style={{width:"40%", height:"60%",cursor:"pointer"}}/>
                  </div>
                </div>
                <TaskCard />
                <TaskCard />
            </div>

            <div className={styles.taskDiv}>
                 <div className={styles.taskHead}>
                    <span className={styles.headSpan2}>In progress</span> 
                    <img src={collapseIcon} alt='collapse' className={styles.collapse}/>
                </div>
                  <TaskCard />
                  <TaskCard />
            </div>
            <div className={styles.taskDiv}>
                <div className={styles.taskHead}>
                  <span className={styles.headSpan2}>Done</span> 
                  <img src={collapseIcon} alt='collapse' className={styles.collapse}/>
                </div>
                  <TaskCard />
                  <TaskCard />
            </div>
        </div>
      {showAddTask && <AddTask handleShowAddTask={handleShowAddTask}/>}
     </div>
  );
}

export default DashBoard;
