import React, { useState } from 'react';
import styles from './TaskCard.module.css';
import PopUp from '../../PopUp/PopUp';
import { deleteTask, updateTaskShared } from '../../../api/taskApi';
import greenIcon from '../../../assets/icons/GreenEllipse.png';
import redIcon from '../../../assets/icons/RedEllipse.png';
import blueIcon from '../../../assets/icons/BlueEllipse.png';
import upIcon from '../../../assets/icons/UpArrow.png';
import downIcon from '../../../assets/icons/DownArrow.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskCard({ task, setMenu, handleStatusUpdate, refreshData, handleShowAddTask }) {
  const [showDelete, setShowDelete] = useState(false);
  const [Menu, showMenu] = useState(false);
  const handleShowMenu = () => {
    showMenu(!Menu);
  };

  const handleDeleteOptionChange = (e) => {
    if (e.target.value === "option3") {
      setShowDelete(true);
      e.target.value = ""
    } else if (e.target.value === "option2") {
      handleShareClick(_id);
      toast.success("Link Copied", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: styles.toastContainer, // Custom CSS class for the toast container
      });
      e.target.value = ""
    } else {
      handleShowAddTask('edit', _id)
      setShowDelete(false);
      e.target.value = ""
    }
  };

  if (!task) {
    return null;
  }

  const { _id = '', title = '', priority = '', checklists = [], dueDate = '', status = '' } = task;

  const toggleDelete = async () => {
    const res = await deleteTask(_id);
    if (res) {
      toast.success("Task deleted successfully")
    }
    setShowDelete(false);
    refreshData();
  };

  const handleShareClick = async (_id) => {
    await updateTaskShared(_id);
  }

  const formattedDueDate = new Date(dueDate);
  const today = new Date();

  // Check if due date is in the future and task is not done
  const isDueDateFutureAndNotDone = formattedDueDate < today && status !== 'Done';

  return (
    <div className={styles.taskCardDiv}>
      <div className={styles.topSection}>
        {priority === 'Low' ? (<span><img src={greenIcon} alt='green'></img> LOW PRIORITY</span>)
          : priority === 'Moderate' ? (<span><img src={blueIcon} alt='blue'></img> MODERATE PRIORITY</span>)
          : (<span><img src={redIcon} alt='red'></img> HIGH PRIORITY</span>)
        }
        <div className={styles.customSelect}>
          <select className={styles.menuSelection} onChange={handleDeleteOptionChange}>
            <option value=""></option>
            <option value="option1">Edit</option>
            <option value="option2">Share</option>
            <option value="option3" style={{ color: "red" }}>Delete</option>
          </select>
        </div>
      </div>

      <div className={styles.menuDiv}></div>

      {/* Truncate long title and show full title in tooltip */}
      <span className={`${styles.title} ${title.length > 20 ? styles.truncated : ''}`} title={title}>
        {title.length > 20 ? title.slice(0, 20) + '...' : title}
      </span>

      <div className={styles.topSection}>
        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>Checklist ({checklists.filter(item => item.type === '1').length}/{checklists.length})</span>

        {!Menu ?
          (<img src={downIcon} alt='down' style={{ width: "8%", height: "3.5vh", cursor: "pointer" }} onClick={handleShowMenu} />)
          : <img src={upIcon} alt='up' style={{ width: "8%", height: "3.5vh", cursor: "pointer" }} onClick={handleShowMenu} />}
      </div>

      {Menu &&
        <div className={styles.checklist}>
          {checklists.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <label htmlFor={`checkbox-${index}`} className={item.checklist.length > 5 ? styles.multiLine : ''}>
                <input id={`checkbox-${index}`} type='checkbox' value={item.checklist} checked={item.type === '1'} />
                {item.checklist}
              </label>
            </div>
          ))}
        </div>

      }

      <div className={styles.bottomSection}>
        {dueDate ? (
          <button className={styles.Btn} style={{ width: "23%", cursor: "default", backgroundColor: status === 'Done' ? '#63C05B' : isDueDateFutureAndNotDone ? '#CF3636' : '#DBDBDB', color: status === 'Done' ? 'white' : isDueDateFutureAndNotDone ? 'white' : 'black' }}>
            {formattedDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </button>
        ) : <div></div>}

        <div className={styles.taskBtn}>
          {status !== 'BackLog' && <button className={styles.Btn} onClick={() => handleStatusUpdate('BackLog', _id)}>Backlog</button>}
          {status !== 'ToDo' && <button className={styles.Btn} onClick={() => handleStatusUpdate('ToDo', _id)}>To-Do</button>}
          {status !== 'InProgress' && <button className={styles.Btn} onClick={() => handleStatusUpdate('InProgress', _id)}>Progress</button>}
          {status !== 'Done' && <button className={styles.Btn} onClick={() => handleStatusUpdate('Done', _id)}>Done</button>}
        </div>
      </div>


      {showDelete && <PopUp setShowDelete={setShowDelete} toggleLogout={toggleDelete} type={'delete'} />}
    </div>
  );
}

export default TaskCard;
