import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.avatarContainer}>
        <Avatar size={40} icon={<UserOutlined />} />
        <span>Роль</span>
      </div>
      <button className={styles.exitButton}>
        <LogoutOutlined />
        <span>Выйти</span>
      </button>
    </header>
  );
}
