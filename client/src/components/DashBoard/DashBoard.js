import React, { useEffect, useState } from 'react';
import styles from './DashBoard.module.css';
import { getAllTaskByWeek } from '../../api/taskApi';
import TaskCard from './TaskCard/TaskCard';
import AddTask from './AddTask/AddTask';
import collapseIcon from '../../assets/icons/codicon_collapse-all.png';
import addIcon from '../../assets/icons/Add.png';

function DashBoard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const [showAddTask, setShowAddTask] = useState(false);
  const userName = localStorage.getItem('name');
  const [period, setPeriod] = useState('thisMonth');
  const [backlogData, setBacklogData] = useState([]);
  const [toDoData, setToDoData] = useState([]);
  const [inProgressData, setInProgressData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  useEffect(() => {
    // Fetch tasks based on the selected week when 'week' state changes
    fetchTasksByWeek(period);
  }, [period]); // Add 'week' as a dependency to useEffect

  const fetchTasksByWeek = async (selectedPeriod) => {
    try {
      // Call your API to get tasks based on the selected week for each status
      const backlogTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'Backlog' });
      const todoTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'ToDo' });
      const inProgressTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'InProgress' });
      const doneTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'Done' });
      
      // Update state variables with fetched data for each status
      setBacklogData(backlogTasks.tasks);
      debugger;
      setToDoData(todoTasks.tasks);
      setInProgressData(inProgressTasks.tasks);
      setCompletedData(doneTasks.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error
    }
  }
  
  const handleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  }

  return (
    <div className={styles.mainContainer}>
        <div className={styles.topDiv}>
            <span className={styles.headSpan}>Welcome! {userName}</span>
            <span>{formattedDate}</span>
        </div>

        <div className={styles.headingDiv}>
          <span className={styles.headSpan}>Board</span>
          <select className={styles.weekSelection} value={period} onChange={handlePeriodChange}>
             <option value="today" style={{border: "none"}}>Today</option>
             <option value="thisWeek" selected>This week</option>
             <option value="thisMonth">This month</option>
          </select>
        </div>

        <div className={styles.mainDiv}>
            {/* Render task divs */}
            <div className={styles.taskDiv}>
                <div className={styles.taskHead}>
                  <span className={styles.headSpan2}>Backlog</span> 
                  <img src={collapseIcon} alt='collapse' className={styles.collapse}/>
                </div>
                <div className={styles.taskRecords}>
                    {backlogData.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
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
                <div className={styles.taskRecords}>
                    {toDoData.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

            <div className={styles.taskDiv}>
                 <div className={styles.taskHead}>
                    <span className={styles.headSpan2}>In progress</span> 
                    <img src={collapseIcon} alt='collapse' className={styles.collapse}/>
                </div>
                <div className={styles.taskRecords}>
                    {inProgressData.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

            <div className={styles.taskDiv}>
                <div className={styles.taskHead}>
                  <span className={styles.headSpan2}>Done</span> 
                  <img src={collapseIcon} alt='collapse' className={styles.collapse}/>
                </div>
                <div className={styles.taskRecords}>
                    {completedData.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
      {showAddTask && <AddTask handleShowAddTask={handleShowAddTask}/>}
     </div>
  );
}

export default DashBoard;
