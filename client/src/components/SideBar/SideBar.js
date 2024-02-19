import React from 'react';
import styles from './SideBar.module.css';

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.headings}>Pro Manage</div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li>Hai</li>
          <li>Hai</li>
          <li>Hai</li>
        </ul>
      </div>
      <h1>Logout</h1>
    </div>
  );
}

export default SideBar;
