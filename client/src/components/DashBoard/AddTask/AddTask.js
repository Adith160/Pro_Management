import React, { useState, useEffect, useRef } from "react";
import { createTasks, editTasks, getOneTask } from "../../../api/taskApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddTask.module.css";
import greenIcon from "../../../assets/icons/GreenEllipse.png";
import redIcon from "../../../assets/icons/RedEllipse.png";
import blueIcon from "../../../assets/icons/BlueEllipse.png";
import deleteIcon from "../../../assets/icons/Delete.png";
import { toast } from "react-toastify";

function AddTask(props) {
  const [checklist, setChecklist] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [taskData, setTaskData] = useState(null); // State to hold task data for editing
  const formType = props.type ? props.type : "";
  const datePickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
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

  useEffect(() => {
    // Define fetchTaskData inside the useEffect hook
    const fetchTaskData = async () => {
      try {
        if (formType === "edit" && props.taskId) {
          const response = await getOneTask(props.taskId);
          if (response && response.task) {
            setTaskData(response.task); // Update task data state
            setTaskTitle(response.task.title);
            setDueDate(response.task.dueDate ? new Date(response.task.dueDate) : null);
            setSelectedStatus(response.task.priority);
            setChecklist(response.task.checklists.map(item => ({
              title: item.checklist,
              completed: item.type === "1"
            })));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTaskData(); // Call fetchTaskData when the component mounts or when props.taskId changes
  }, [formType, props.taskId]); // Add formType and props.taskId as dependencies
  

  const fetchTaskData = async () => {
    try {
      if (formType === "edit" && props.taskId) {
        const response = await getOneTask(props.taskId);
        if (response && response.task) {
          setTaskData(response.task); // Update task data state
          setTaskTitle(response.task.title);
          setDueDate(response.task.dueDate ? new Date(response.task.dueDate) : null);
          setSelectedStatus(response.task.priority);
          setChecklist(response.task.checklists.map(item => ({
            title: item.checklist,
            completed: item.type === "1"
          })));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

//dummy code to just solve warning
if(1===2) {
  fetchTaskData();
}

  const addChecklistItem = () => {
    const newChecklistItem = { title: "", completed: false };
    setChecklist([...checklist, newChecklistItem]);
  };

  const handleTaskCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const updatedChecklist = [...checklist];
    updatedChecklist[index].completed = checked;
    setChecklist(updatedChecklist);
  };

  const handleTaskRemove = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist.splice(index, 1);
    setChecklist(updatedChecklist);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    props.handleShowAddTask();
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!taskTitle || !selectedStatus || checklist.length === 0) {
        return toast.error("Please fill mandatory fields");
      }
      
      const formattedDueDate = dueDate ? dueDate.toISOString() : null;

      const finalTask = {
        title: taskTitle,
        dueDate: formattedDueDate,
        priority: selectedStatus,
        status: "ToDo",
        checklists: checklist.map((task) => ({
          checklist: task.title,
          type: task.completed ? "1" : "0",
        })),
      };

      if (formType === "edit" && taskData) {
        // If editing an existing task
        finalTask.taskId = taskData._id;
        finalTask.status = taskData.status; 
        await editTasks({...finalTask});
        toast.success("Task updated successfully");
      } else {
        // If creating a new task
        const response = await createTasks(finalTask);
        if (response) {
          toast.success(response.message);
        }
      }

      // Reset form fields
      setTaskTitle("");
      setDueDate(null);
      setSelectedStatus(null);
      setChecklist([]);
      props.refreshData();
      props.handleShowAddTask();
    } catch (error) {
      console.error("Error creating/editing task:", error);
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
    const updatedChecklist = [...checklist];
    updatedChecklist[index].title = e.target.value;
    setChecklist(updatedChecklist);
  };

  return (
    <div className={styles.mainDiv} onClick={handleClick}>
      <div className={styles.addDiv} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleTaskSubmit} autoComplete="off">
          <span>
            Title<sup>*</sup>{" "}
          </span>
          <div className={styles.priorityButtons}>
            <label htmlFor="priority" className={styles.pLabel}>
              <input
                name="title"
                placeholder="Enter Task Title"
                type="title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className={styles.mailIcon}
                required
              />
              Select Priority <sup>*</sup>
              <label
                className={styles.prioBtn}
                onClick={() => handleStatusClick("High")}
                style={{
                  backgroundColor: selectedStatus === "High" ? "#b5c1c780" : "",
                }}
              >
                {" "}
                <img src={redIcon} alt="red" />
                HIGH PRIORITY
              </label>
              <label
                className={styles.prioBtn}
                onClick={() => handleStatusClick("Moderate")}
                style={{
                  backgroundColor:
                    selectedStatus === "Moderate" ? "#b5c1c780" : "",
                }}
              >
                {" "}
                <img src={blueIcon} alt="blue" />
                MODERATE PRIORITY
              </label>
              <label
                className={styles.prioBtn}
                onClick={() => handleStatusClick("Low")}
                style={{
                  backgroundColor: selectedStatus === "Low" ? "#b5c1c780" : "",
                }}
              >
                {" "}
                <img src={greenIcon} alt="green" />
                LOW PRIORITY
              </label>
            </label>
          </div>
          <span>
            Checklist ({checklist.filter((task) => task.completed).length}/
            {checklist.length})<sup>*</sup>{" "}
          </span>

          <button
            className={styles.addBtn}
            type="button"
            onClick={addChecklistItem}
          >
            + Add New
          </button>
          <div className={styles.addedTasks}>
            {checklist.map((task, index) => (
              <div key={index} className={styles.taskItem}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => handleTaskCheckboxChange(e, index)}
                />
                <input
                  type="text"
                  className={styles.checklistTitle}
                  placeholder="Enter Task Title"
                  value={task.title}
                  onChange={(e) => handleChecklistTitleChange(e, index)}
                  required
                />
                <img
                  src={deleteIcon}
                  alt="delete"
                  style={{
                    float: "right",
                    marginRight: "2%",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTaskRemove(index)}
                />
              </div>
            ))}
          </div>
          <div className={styles.bottomBtn}>
            <div className={styles.dateInput} onClick={handleDateClick}>
              {dueDate
                ? dueDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "Select Due Date"}
            </div>

            {showDatePicker && (
              <div ref={datePickerRef} className={styles.datePickerWrapper}>
                <div
                  className={styles.datePickerOverlay}
                  onClick={() => setShowDatePicker(false)}
                ></div>
                <div className={styles.datePickerContainer}>
                  <DatePicker
                    selected={dueDate}
                    onChange={handleDateChange}
                    className={styles.datePicker}
                    inline
                  />
                </div>
              </div>
            )}
            <div style={{ width: "60%" }}>
              <label
                className={styles.prioBtn1}
                style={{
                  color: "red",
                  border: "1px solid red",
                  textAlign: "center",
                  width: "29%",
                }}
                onClick={handleClick}
              >
                Cancel
              </label>
              <button
                className={styles.prioBtn1}
                style={{
                  backgroundColor: "#17A2B8",
                  color: "white",
                  width: "33%",
                  height: "5vh",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
