import React from 'react';
import styles from './SideBar.module.css';
import logo from '../../assets/icons/codesandbox.png'
import analyticIcon from '../../assets/icons/database.png'
import boardIcon from '../../assets/icons/layout.png'
import settingIcon from '../../assets/icons/settings.png'
import logoutIcon from '../../assets/icons/Logout.png'
import { useNavigate } from 'react-router-dom';

function SideBar(props) {
  const navigate = useNavigate();
  const toggleLogout=()=>{
    navigate("/register");
    console.log("haii")
  }
  return (
    <div className={styles.sideBar}>
      <div className={styles.headings}> <img src={logo} alt='logo' style={{marginRight:'5%'}}/>  Pro Manage</div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={props.Active === 0 ? styles.active : ''}><img src={boardIcon} alt='logo' style={{marginRight:'5%', width:'9%'}}/> Board &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
          <li className={props.Active === 1 ? styles.active : ''}><img src={analyticIcon} alt='logo'style={{marginRight:'5%', width:'9%'}}/> Analytics &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
          <li className={props.Active === 2 ? styles.active : ''}><img src={settingIcon} alt='logo' style={{marginRight:'5%', width:'9%'}}/> Settings &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        </ul>
      </div>
      <button className={styles.logOut} onClick={toggleLogout}><img src={logoutIcon} alt='logo' style={{marginRight:'15%', width:'19%'}} />Log out</button>
    </div>
  );
}

export default SideBar;
