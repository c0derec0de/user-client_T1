import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { authApi } from "../../shared/api/userApi";

const { Option } = Select;

type FieldType = {
  name: string;
  surName: string;
  password: string;
  fullName: string;
  email: string;
  birthDate?: dayjs.Dayjs;
  telephone?: string;
  employment?: string;
};

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^\+?[0-9]{10,15}$/;

const employmentOptions = [
  "Полная занятость",
  "Частичная занятость",
  "Фриланс",
  "Безработный",
  "Студент",
];

interface CreateUserModalProps {
  open: boolean;
  onCancel: () => void;
}

const CreateUser: React.FC<CreateUserModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const handleCreateUser = async (values: FieldType) => {
    try {
      const preparedData = {
        ...values,
        birthDate: values.birthDate
          ? values.birthDate.format("YYYY-MM-DD")
          : undefined,
        userAgreement: true,
      };

      await authApi.register(preparedData);
      console.log("Пользователь успешно создан!");
      form.resetFields();
      onCancel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(
        error.response?.data?.message ||
          "Ошибка при создании пользователя. Попробуйте снова."
      );
    }
  };

  return (
    <Modal
      title="Создать пользователя"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={600}
      styles={{ body: { padding: "24px" } }}
      destroyOnHidden
    >
      <Form
        form={form}
        name="createUser"
        layout="vertical"
        onFinish={handleCreateUser}
      >
        <Form.Item<FieldType>
          label="Имя"
          name="name"
          rules={[
            { required: true, message: "Пожалуйста, введите ваше имя!" },
            { max: 64, message: "Имя не должно превышать 64 символа!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Фамилия"
          name="surName"
          rules={[
            { required: true, message: "Пожалуйста, введите вашу фамилию!" },
            { max: 64, message: "Фамилия не должна превышать 64 символа!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Полное имя"
          name="fullName"
          rules={[
            { required: true, message: "Пожалуйста, введите полное имя!" },
            {
              max: 130,
              message: "Полное имя не должно превышать 130 символов!",
            },
          ]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item<FieldType> label="Дата рождения" name="birthDate">
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Телефон"
          name="telephone"
          rules={[
            { pattern: phoneRegex, message: "Некорректный номер телефона!" },
          ]}
        >
          <Input addonBefore="+" placeholder="79991234567" />
        </Form.Item>

        <Form.Item<FieldType> label="Занятость" name="employment">
          <Select placeholder="Выберите тип занятости">
            {employmentOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUser;
