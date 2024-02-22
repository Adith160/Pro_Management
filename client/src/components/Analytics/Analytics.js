import React, { useEffect } from 'react';
import styles from './Analytics.module.css';
import eclipsIcon from '../../assets/icons/Ellipse 3.png';
import { getTaskSummary } from '../../api/taskApi';

function Analytics() {
  useEffect(() => {
    getSummary();
  }, []); 
  const getSummary = async () => {
    debugger;
    const response = await getTaskSummary();
    if (response) {
      console.log("response", response);
    }
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <h2>Analytics</h2>
        <div className={styles.recordDiv}>
          <ul>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Backlog Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> To-do Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> In-Progress Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Completed Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
          </ul>
        </div>

        <div className={styles.recordDiv}>
          <ul>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Low Priority</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Moderate Priority</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> High Priority</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
            <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Due Date Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>10</span></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Analytics;
