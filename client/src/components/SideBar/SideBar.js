import React, { useState } from 'react';
import styles from './SideBar.module.css';
import Logout from '../PopUp/PopUp';
import logo from '../../assets/icons/codesandbox.png'
import analyticIcon from '../../assets/icons/database.png'
import boardIcon from '../../assets/icons/layout.png'
import settingIcon from '../../assets/icons/settings.png'
import logoutIcon from '../../assets/icons/Logout.png'
import { useNavigate } from 'react-router-dom';

function SideBar(props) {
  const[showLogout, setShowLogout] = useState(false);
  const[Active, setActive] = useState(0);
  const navigate = useNavigate();
  
  const toggleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }

  const toggleNavigate=(page)=>{
    setActive(page);
  props.toggleActivePage(page);
}

const handleShowLogout=(e)=>{
  setShowLogout(!showLogout)
}

  return (
    <div className={styles.sideBar}>
      <div className={styles.headings}> <img src={logo} alt='logo' style={{marginRight:'5%'}}/>  Pro Manage</div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
           <li className={Active === 0 ? styles.active : ''} onClick={() => toggleNavigate(0)}>
            <img src={boardIcon} alt='logo' style={{marginRight:'8%', width:'9%'}}/> Board &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </li>

          <li className={Active === 1 ? styles.active : ''} onClick={() => toggleNavigate(1)}><img src={analyticIcon} alt='logo'style={{marginRight:'8%', width:'9%'}}/> Analytics &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </li>

          <li className={Active === 2 ? styles.active : ''} onClick={() => toggleNavigate(2)}><img src={settingIcon} alt='logo' style={{marginRight:'8%', width:'9%'}}/> Settings &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </li>
        </ul>
      </div>
     
      <button className={styles.logOut} onClick={handleShowLogout}><img src={logoutIcon} alt='logo' style={{marginRight:'15%', width:'19%'}} />Log out</button>
      {showLogout && <Logout handleShowLogout={handleShowLogout} toggleLogout={toggleLogout} type={'logout'}/>}

    </div>
  );
}

export default SideBar;
