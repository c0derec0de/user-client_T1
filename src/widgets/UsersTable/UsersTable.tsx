import React, { useEffect, useState } from "react";
import { Table, Space, Tag, Button } from "antd";
import type { TableProps } from "antd";
import { userApi, userDelete } from "../../shared/api/userApi";
import EditUser from "../../pages/EditUser/EditUser";

interface User {
  id: string;
  email: string;
  name: string;
  surName: string;
  fullName: string;
  birthDate?: string | null;
  telephone?: string | null;
  employment?: string | null;
  createdAt: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await userDelete.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("Ошибка при удалении пользователя:", error);
    }
  };

  const handleUpdated = async () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
    const data = await userApi.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userApi.getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: TableProps<User>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: "Полное имя",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Телефон",
      dataIndex: "telephone",
      key: "telephone",
      render: (phone) => phone || "-",
    },
    {
      title: "Занятость",
      dataIndex: "employment",
      key: "employment",
      render: (employment) => (
        <Tag color={employment ? "blue" : "default"}>
          {employment || "Не указано"}
        </Tag>
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleEdit(record)}>
            Редактировать
          </Button>
          <Button size="small" danger onClick={() => handleDelete(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: true }}
      />
      {isEditModalOpen && editingUser && (
        <EditUser
          open={isEditModalOpen}
          user={editingUser}
          onCancel={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdated}
        />
      )}
    </>
  );
};
export default UsersTable;
