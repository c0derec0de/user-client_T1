import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { userEdit } from "../../shared/api/userApi";
import { type User } from "../../shared/types/userType";

interface Props {
  open: boolean;
  user: User;
  onClose: () => void;
  onUpdate: () => void;
}

const EditUser: React.FC<Props> = ({ open, user, onClose, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleSubmit = async (values: User) => {
    try {
      await userEdit.updateUser(user.id, values);
      onUpdate();
    } catch (error) {
      console.error("Ошибка при обновлении", error);
    }
  };

  return (
    <Modal
      title="Редактировать пользователя"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Имя">
          <Input />
        </Form.Item>
        <Form.Item name="surName" label="Фамилия">
          <Input />
        </Form.Item>
        <Form.Item name="telephone" label="Телефон">
          <Input />
        </Form.Item>
        <Form.Item name="employment" label="Занятость">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
