import React, { useEffect, useState } from 'react';
import styles from './DashBoard.module.css';
import { editTasks, getAllTaskByWeek, updateTaskStatus } from '../../api/taskApi';
import TaskCard from './TaskCard/TaskCard';
import AddTask from './AddTask/AddTask';
import collapseIcon from '../../assets/icons/codicon_collapse-all.png';
import addIcon from '../../assets/icons/Add.png';
import { toast } from 'react-toastify';

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
  const [menu, setMenu] = useState(false);
  const [addTaskType, setAddTaskType] = useState('add');
  const [taskId_editTask, setTaskId_editTask] = useState('');

  useEffect(() => {
    fetchTasksByWeek(period);
  }, [period]); // Add 'week' as a dependency to useEffect

  const fetchTasksByWeek = async (selectedPeriod) => {
    try {
      // Call your API to get tasks based on the selected week for each status
      const backlogTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'BackLog' });
      const todoTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'ToDo' });
      const inProgressTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'InProgress' });
      const doneTasks = await getAllTaskByWeek({ period: selectedPeriod, status: 'Done' });
      
      // Update state variables with fetched data for each status
      setBacklogData(backlogTasks.tasks);
      setToDoData(todoTasks.tasks);
      setInProgressData(inProgressTasks.tasks);
      setCompletedData(doneTasks.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error
    }
  }
  
  const handleShowAddTask = (type, taskID) => {
    if(type ==='add'){
      setAddTaskType('add')
    }else{
      setAddTaskType('edit')
      setTaskId_editTask(taskID)
    }
    setShowAddTask(!showAddTask);
  }

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  }

  const handleSetMenu = () =>{
    setMenu(false)
  }

  const handleStatusUpdate = async (value, taskId) => {
    try {
        await updateTaskStatus(value, taskId);
        await fetchTasksByWeek(period);
    } catch (error) {
        console.error('Error updating task status:', error);
    }
}

const refreshData =async () => {
  try {
    await fetchTasksByWeek('all');
      await fetchTasksByWeek(period);
  } catch (error) {
      toast.error("Request Failed")
  }
}

const handleEditTask = async ( title, dueDate, priority, status, checklists ,taskId)=>{
  try {
    if( !title || !priority || !status || !checklists || !taskId) {
      toast.error("Fill all mandatory fields")
    }
    await editTasks( {title, dueDate, priority, status, checklists ,taskId});
    await refreshData();
  } catch (error) {
    toast.error("Request Failed")
  }
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
                        <TaskCard key={task.id} task={task} setMenu={menu} handleStatusUpdate={handleStatusUpdate} refreshData={refreshData} handleShowAddTask={handleShowAddTask}/>
                    ))}
                </div>
            </div>

            <div className={styles.taskDiv}>
                <div className={styles.taskHead}>
                  <span className={styles.headSpan2}>To do</span> 
                  <div>
                      <img src={addIcon} alt='collapse'style={{width:"35%", height:"40%", marginRight:"20%", cursor:"pointer"}} onClick={()=>handleShowAddTask('add')}/>
                      <img src={collapseIcon} alt='collapse' style={{width:"40%", height:"60%",cursor:"pointer"}} onClick={handleSetMenu}/>
                  </div>
                </div>
                <div className={styles.taskRecords}>
                    {toDoData.map(task => (
                        <TaskCard key={task.id} task={task} setMenu={menu} handleStatusUpdate={handleStatusUpdate} refreshData={refreshData} handleShowAddTask={handleShowAddTask}/>
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
                       <TaskCard key={task.id} task={task} setMenu={menu} handleStatusUpdate={handleStatusUpdate} refreshData={refreshData} handleShowAddTask={handleShowAddTask}/>
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
                        <TaskCard key={task.id} task={task} setMenu={menu} handleStatusUpdate={handleStatusUpdate} refreshData={refreshData} handleShowAddTask={handleShowAddTask}/>
                    ))}
                </div>
            </div>
        </div>
      {showAddTask && <AddTask handleShowAddTask={handleShowAddTask} refreshData={refreshData} handleEditTask={handleEditTask} type={addTaskType} taskId={taskId_editTask}/>}
     </div>
  );
}

export default DashBoard;
