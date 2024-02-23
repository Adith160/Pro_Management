import React, { useEffect, useState } from 'react';
import styles from './Analytics.module.css';
import eclipsIcon from '../../assets/icons/Ellipse 3.png';
import { getTaskSummary } from '../../api/taskApi';

function Analytics() {
  const [summaryData, setSummaryData] = useState({
    overallSum: 0,
    backlogCount: 0,
    progressCount: 0,
    todoCount: 0,
    completedCount: 0,
    lowPriorityCount: 0,
    moderatePriorityCount: 0,
    highPriorityCount: 0,
    dueDateTasksCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTaskSummary();
        if (response.success) {
          setSummaryData(response.statistics);
        } else {
          console.error('Failed to fetch task summary:', response);
        }
      } catch (error) {
        console.error('Error fetching task summary:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h2>Analytics</h2>
      <div className={styles.recordDiv}>
        <ul>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Backlog Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.backlogCount}</span></li>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> To-do Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.todoCount}</span></li>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> In-Progress Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.progressCount}</span></li>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Completed Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.completedCount}</span></li>
        </ul>
      </div>

      <div className={styles.recordDiv}>
        <ul>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Low Priority</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.lowPriorityCount}</span></li>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Moderate Priority</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.moderatePriorityCount}</span></li>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> High Priority</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.highPriorityCount}</span></li>
          <li><span><img src={eclipsIcon} style={{ marginRight: '5%' }} alt='icon' /> Due Date Tasks</span> <span style={{ width: '40%', fontWeight: 'bold' }}>{summaryData.dueDateTasksCount}</span></li>
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
