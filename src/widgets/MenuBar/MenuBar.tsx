import React, { useState } from "react";
import { SettingOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import CreateUser from "../../pages/CreateUser/CreateUser";
import "./MenuBar.module.css";

type MenuItem = Required<MenuProps>["items"][number];

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "users-list") {
      navigate("/");
    } else if (e.key === "create-user") {
      navigate("/user/create");
      setIsModalOpen(true);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const items: MenuItem[] = [
    {
      key: "users",
      icon: <TeamOutlined />,
      label: "Пользователи",
      children: [
        { key: "users-list", label: "Список пользователей" },
        { key: "create-user", label: "Создать пользователя" },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Настройки",
      children: [{ key: "profile", label: "Профиль" }],
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["users-list"]}
        defaultOpenKeys={["users"]}
        style={{
          height: "100%",
          borderRight: 0,
          padding: "20px 0",
          background: "transparent",
        }}
        items={items}
        onClick={handleMenuClick}
      />
      <CreateUser open={isModalOpen} onCancel={handleModalCancel} />
    </>
  );
};

export default MenuBar;
