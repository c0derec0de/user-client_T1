import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { authService } from "../../shared/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

type FieldType = {
  password: string;
  email: string;
};

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

interface CreateUserModalProps {
  open: boolean;
  onCancel: () => void;
}

const LoginPage: React.FC<CreateUserModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleLogin = async (values: FieldType) => {
    try {
      const userData = await authService.login(values);
      dispatch(setUser({ email: userData.email, token: userData.token }));
      console.log("User:", userData);
      onCancel();
      form.resetFields();
    } catch (error) {
      console.log(error, "Ошибка при входе. Проверьте данные.");
    }
  };

  return (
    <Modal
      title="Вход"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={600}
      styles={{ body: { padding: "24px" } }}
    >
      <Form
        form={form}
        name="createUser"
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш email!" },
            { pattern: emailRegex, message: "Некорректный email адрес!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginPage;
