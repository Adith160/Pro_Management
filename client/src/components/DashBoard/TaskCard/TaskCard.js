import React, { useState } from 'react';
import styles from './TaskCard.module.css';
import PopUp from '../../PopUp/PopUp';
import greenIcon from '../../../assets/icons/GreenEllipse.png';
import redIcon from '../../../assets/icons/RedEllipse.png';
import blueIcon from '../../../assets/icons/BlueEllipse.png';
import upIcon from '../../../assets/icons/UpArrow.png';
import downIcon from '../../../assets/icons/DownArrow.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskCard({ task }) {
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
      toast.dark("Link Copied", {
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
      setShowDelete(false);
      e.target.value = ""
    }
  };

  const toggleDelete = () => {
    //
  };

  // Check if task is undefined or null
  if (!task) {
    return null; // or return a placeholder indicating that no task is available
  }

  // Destructure task properties or provide defaults if they are missing
  const { title = '', priority = '', checklistItems = [], totalChecklistItems = 0, dueDate = '' } = task;

  // Format the due date to 'Feb 10th' format
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

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

      <span className={styles.title}>{title}</span>

      <div className={styles.topSection}>
        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>Checklist ({checklistItems.length}/{totalChecklistItems}) </span>
        {!Menu ?
          (<img src={downIcon} alt='down' style={{ width: "8%", height: "3.5vh", cursor: "pointer" }} onClick={handleShowMenu} />)
          : <img src={upIcon} alt='up' style={{ width: "8%", height: "3.5vh", cursor: "pointer" }} onClick={handleShowMenu} />}
      </div>

      {Menu &&
        <div className={styles.checklist}>
          {checklistItems.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <label htmlFor={`checkbox-${index}`}>
                <input id={`checkbox-${index}`} type='checkbox' value={item.checklist} /> {item.checklist} - {item.type}
              </label>
            </div>
          ))}
        </div>}

      <div className={styles.bottomSection}>
        <button className={styles.Btn} style={{ width: "23%", backgroundColor: priority === 'High' ? 'red' : '' }}>{formattedDueDate}</button>
        <div className={styles.taskBtn}>
          <button className={styles.Btn} style={{ cursor: "pointer"}}>Backlog</button>
          <button className={styles.Btn}>To-Do</button>
          <button className={styles.Btn}>Progress</button>
          <button className={styles.Btn}>Done</button>
        </div>
      </div>

      {showDelete && <PopUp setShowDelete={setShowDelete} toggleLogout={toggleDelete} type={'delete'} />}
    </div>
  );
}

export default TaskCard;
