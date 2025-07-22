import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { type RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { userLogout } from "../../shared/api/userApi";
import styles from "./Header.module.css";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await userLogout.logoutUser();
      dispatch(logout());
      handleOpenModal();
      console.log("Вы успешно вышли из аккаунта.");
    } catch (error) {
      console.error(error);
      console.log("Ошибка при выходе из аккаунта.");
    }
  };

  return (
    <header className={styles.header}>
      {user ? (
        <>
          <div className={styles.userInfo}>
            <Avatar size={40} icon={<UserOutlined />} />
            <span className={styles.username}>{user.fullName}</span>
            <button className={styles.exitButton} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </>
      ) : (
        <button className={styles.extanceButton} onClick={handleOpenModal}>
          <LogoutOutlined />
          <span>Войти</span>
        </button>
      )}
      <LoginPage open={isModalOpen} onCancel={handleCloseModal} />
    </header>
  );
}
