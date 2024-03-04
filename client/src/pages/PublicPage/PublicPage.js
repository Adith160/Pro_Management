import React, { useState , useEffect} from 'react'
import styles from './PublicPage.module.css'
import { getPublicTaskById } from '../../api/taskApi';
import greenIcon from '../../assets/icons/GreenEllipse.png';
import redIcon from '../../assets/icons/RedEllipse.png';
import blueIcon from '../../assets/icons/BlueEllipse.png';
import logo from '../../assets/icons/codesandbox.png'

function PublicPage() {
   const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        debugger;
        let taskId = localStorage.getItem('taskId');
        fetchPublicTask(taskId);
      }, []); 
    
      const fetchPublicTask = async (id) => {
        try {
            const response  = await getPublicTaskById(id);
            if(response){
                setTaskData(response.task);
            }
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }

    if (!taskData) {
        return null;
      }
    const { title = '', priority = '', checklists = [], dueDate = ''} = taskData;
    const formattedDueDate = new Date(dueDate);
  return (
    <div className={styles.mainDiv}>
       <div className={styles.headings}> <img src={logo} alt='logo' style={{marginRight:'5%'}}/>  Pro Manage</div>
        <div className={styles.mainContainer}>
        <div className={styles.topSection}>
        {priority === 'Low' ? (<span><img src={greenIcon} alt='green'></img> LOW PRIORITY</span>)
          : priority === 'Moderate' ? (<span><img src={blueIcon} alt='blue'></img> MODERATE PRIORITY</span>)
          : (<span><img src={redIcon} alt='red'></img> HIGH PRIORITY</span>)
        }
      </div>

      <span className={`${styles.title} ${title.length > 20 ? styles.truncated : ''}`} title={title}>
        {title.length > 20 ? title.slice(0, 20) + '...' : title}
      </span>

      <div className={styles.topSection}>
        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>Checklist ({checklists.filter(item => item.type === '1').length}/{checklists.length})</span>
      </div>

        <div className={styles.checklist}>
          {checklists.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              {/* Added onChange event handler to each checkbox */}
              <label htmlFor={`checkbox-${index}`} className={item.checklist.length > 5 ? styles.multiLine : ''}>
                <input id={`checkbox-${index}`} type='checkbox' value={item.checklist} checked={item.type === '1'}/>
                {item.checklist}
              </label>
            </div>
          ))}
        </div>

        {dueDate ? ( <div className={styles.bottomSection}>
       
            <label className={styles.dueLbl}> DueDate</label>
          <button className={styles.Btn} style={{ width: "23%", cursor: "default", backgroundColor:  '#CF3636' , color: 'white' }}>
            {formattedDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </button>
        
      </div>) : <div></div>}
        </div>
    </div>
  )
}

export default PublicPage