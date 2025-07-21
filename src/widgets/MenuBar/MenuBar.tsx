import React from "react";
import { SettingOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./MenuBar.module.css";

type MenuItem = Required<MenuProps>["items"][number];

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
    children: [
      { key: "profile", label: "Профиль" },
      { key: "logout", label: "Выйти" },
    ],
  },
];

const MenuBar: React.FC = () => (
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
  />
);

export default MenuBar;
