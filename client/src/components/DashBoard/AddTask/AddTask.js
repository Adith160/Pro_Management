import React, { useState } from 'react';
import styles from './AddTask.module.css';
//import { loginUser } from '../../../api/auth';
import greenIcon from '../../../assets/icons/GreenEllipse.png';
import redIcon from '../../../assets/icons/RedEllipse.png';
import blueIcon from '../../../assets/icons/BlueEllipse.png';
import deleteIcon from '../../../assets/icons/Delete.png';

function AddTask(props) {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');

    const addTask = () => {
        setTasks([...tasks, { id: tasks.length + 1, title: taskTitle, completed: false }]);
        setTaskTitle(''); // Clear the input field after adding task
    };

    const handleTaskCheckboxChange = (e, taskId) => {
        const { checked } = e.target;
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: checked } : task));
    };

    const handleTaskRemove = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to parent
        props.handleShowAddTask();
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        // Save tasks to database
        console.log(tasks);
    };

    return (
        <div className={styles.mainDiv} onClick={handleClick}>
            <div className={styles.addDiv} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleUserSubmit} autoComplete="off">
                    <span>Title<sup>*</sup> </span>
                    <div className={styles.priorityButtons}>
                        <label htmlFor='priority'>
                            <input name='title' placeholder='Enter Task Title' type='title' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className={styles.mailIcon} required />
                            Select Priority <sup>*</sup>
                            <button className={styles.prioBtn}> <img src={redIcon} alt='red' />HIGH PRIORITY</button>
                            <button className={styles.prioBtn}> <img src={blueIcon} alt='blue' />MODERATE PRIORITY</button>
                            <button className={styles.prioBtn}> <img src={greenIcon} alt='green' />LOW PRIORITY</button>
                        </label>
                    </div>
                    <span>Checklist ({tasks.filter(task => task.completed).length}/{tasks.length})<sup>*</sup> </span>
                    <button className={styles.addBtn} type="button" onClick={addTask}>+ Add New</button>
                    <div className={styles.addedTasks}>
                        {tasks.map(task => (
                            <div key={task.id} className={styles.taskItem}>
                                <input type='checkbox' checked={task.completed} onChange={(e) => handleTaskCheckboxChange(e, task.id)} />
                                <input type='text' placeholder='Enter Task Title'  />
                                <img src={deleteIcon} alt='delete' style={{ float: "right" }} onClick={() => handleTaskRemove(task.id)} />
                            </div>
                        ))}
                    </div>
                    <input type='date' placeholder='select date'></input>
                    <button className={styles.prioBtn}>Cancel</button>
                    <button className={styles.prioBtn}>Save</button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
