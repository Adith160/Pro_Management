import React, { useState, useEffect, useRef } from 'react';
import { createTasks } from '../../../api/taskApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AddTask.module.css';
import greenIcon from '../../../assets/icons/GreenEllipse.png';
import redIcon from '../../../assets/icons/RedEllipse.png';
import blueIcon from '../../../assets/icons/BlueEllipse.png';
import deleteIcon from '../../../assets/icons/Delete.png';

function AddTask(props) {
    const [checklist, setChecklist] = useState([]);
    const [checklistTitle, setChecklistTitle] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const datePickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        }

        if (showDatePicker) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDatePicker]);

    const addChecklistItem = () => {
        const newChecklistItem = { title: checklistTitle, completed: false };
        setChecklist([...checklist, newChecklistItem]);
        setChecklistTitle(''); // Clear the input field after adding the checklist item
    };
    
    

    const handleTaskCheckboxChange = (e, taskId) => {
        const { checked } = e.target;
        setChecklist(checklist.map((task, index) => index === taskId ? { ...task, completed: checked } : task));
    };

    const handleTaskRemove = (taskId) => {
        setChecklist(checklist.filter((task, index) => index !== taskId));
    };

    const handleClick = (e) => {
        e.stopPropagation();
        props.handleShowAddTask();
    };

    
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Convert dueDate to Joi.date() format
            const formattedDueDate = dueDate ? dueDate.toISOString() : null;
    
            // Construct the final task object with all fields
            const finalTask = {
                title: taskTitle,
                dueDate: formattedDueDate,
                priority: selectedStatus,
                status: "ToDo",
                checklists: checklist.map(task => ({ checklist: task.title, type: task.completed ? '1' : '0' })),
            };
    
            // Call the createTasks function from your taskApi
            const response = await createTasks(finalTask);
    
            // Handle response if needed
    
            console.log(response);
            setTaskTitle('');
            setDueDate(null);
            setSelectedStatus(null);
            setChecklist([]);
            setChecklistTitle('');
        } catch (error) {
            console.error('Error creating task:', error);
            // Handle error if needed
        }
    };

    const handleDateClick = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (date) => {
        setDueDate(date);
        setShowDatePicker(false);
    };

    const handleStatusClick = (status) => {
        setSelectedStatus(status);
    };

    const handleChecklistTitleChange = (e, index) => {
        const newChecklist = [...checklist];
        newChecklist[index].title = e.target.value;
        setChecklist(newChecklist);
    };
    

    return (
        <div className={styles.mainDiv} onClick={handleClick}>
            <div className={styles.addDiv} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleTaskSubmit} autoComplete="off">
                    <span>Title<sup>*</sup> </span>
                    <div className={styles.priorityButtons}>
                        <label htmlFor='priority' className={styles.pLabel}>
                            <input name='title' placeholder='Enter Task Title' type='title' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className={styles.mailIcon} required />
                            Select Priority <sup>*</sup>
                            <label className={styles.prioBtn} onClick={() => handleStatusClick('High')} style={{ backgroundColor: selectedStatus === 'High' ? '#b5c1c780' : '' }}> <img src={redIcon} alt='red' />HIGH PRIORITY</label>
                            <label className={styles.prioBtn} onClick={() => handleStatusClick('Moderate')} style={{ backgroundColor: selectedStatus === 'Moderate' ? '#b5c1c780' : '' }}> <img src={blueIcon} alt='blue' />MODERATE PRIORITY</label>
                            <label className={styles.prioBtn} onClick={() => handleStatusClick('Low')} style={{ backgroundColor: selectedStatus === 'Low' ? '#b5c1c780' : '' }}> <img src={greenIcon} alt='green' />LOW PRIORITY</label>
                        </label>
                    </div>
                    <span>Checklist ({checklist.filter(task => task.completed).length}/{checklist.length})<sup>*</sup> </span>
                    <div className={styles.addedTasks}>
                        {checklist.map((task, index) => (
                            <div key={index} className={styles.taskItem}>
                                <input type='checkbox' checked={task.completed} onChange={(e) => handleTaskCheckboxChange(e, index)}/>
                                <input type='text' className={styles.checklistTitle} placeholder='Enter Task Title' value={task.title} onChange={(e) => handleChecklistTitleChange(e, index)} required />
                                <img src={deleteIcon} alt='delete' style={{ float: "right" }} onClick={() => handleTaskRemove(index)} />
                            </div>
                        ))}
                    </div>
                    <button className={styles.addBtn} type="button" onClick={addChecklistItem}>+ Add New</button>
                    <div className={styles.bottomBtn}>
                        <div className={styles.dateInput} onClick={handleDateClick}>
                            {dueDate ? dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Select Due Date"}
                        </div>
                        {showDatePicker && (
                            <div ref={datePickerRef} className={styles.datePickerWrapper}>
                                <div className={styles.datePickerOverlay} onClick={() => setShowDatePicker(false)}></div>
                                <div className={styles.datePickerContainer}>
                                    <DatePicker 
                                        selected={dueDate} 
                                        onChange={handleDateChange} 
                                        className={styles.datePicker} 
                                        inline // Display the date picker inline
                                    />
                                </div>
                            </div>
                        )}
                        <div style={{width:"60%"}}>
                            <label className={styles.prioBtn} style={{color:"red",border:"1px solid red", textAlign:"center", width:"29%"}} onClick={handleClick}>Cancel</label>
                            <button className={styles.prioBtn} style={{backgroundColor:"#17A2B8", color:"white",  width:"33%", height:"4vh"}}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
