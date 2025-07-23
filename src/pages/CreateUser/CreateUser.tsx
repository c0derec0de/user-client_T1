import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { authApi } from "../../shared/api/userApi";
import { useForm, Controller } from "react-hook-form";

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

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^\+?[0-9]{10,15}$/;

const CreateUser: React.FC<CreateUserModalProps> = ({ open, onCancel }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldType>();

  const onSubmit = async (data: FieldType) => {
    try {
      const preparedData = {
        ...data,
        birthDate: data.birthDate
          ? data.birthDate.format("YYYY-MM-DD")
          : undefined,
        userAgreement: true,
      };

      console.log("Пользователь успешно создан!", preparedData);
      await authApi.register(preparedData);
      reset();
      onCancel?.();
    } catch (error: unknown) {
      if (error instanceof Error && error) {
        console.log(error);
      } else {
        console.log("Ошибка при создании пользователя. Попробуйте снова.");
      }
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
      destroyOnClose
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Item
          label="Имя"
          help={errors.name?.message}
          validateStatus={errors.name ? "error" : ""}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Пожалуйста, введите ваше имя!",
              maxLength: {
                value: 64,
                message: "Имя не должно превышать 64 символа!",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          help={errors.surName?.message}
          validateStatus={errors.surName ? "error" : ""}
        >
          <Controller
            name="surName"
            control={control}
            rules={{
              required: "Пожалуйста, введите вашу фамилию!",
              maxLength: {
                value: 64,
                message: "Фамилия не должна превышать 64 символа!",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Полное имя"
          help={errors.fullName?.message}
          validateStatus={errors.fullName ? "error" : ""}
        >
          <Controller
            name="fullName"
            control={control}
            rules={{
              required: "Пожалуйста, введите полное имя!",
              maxLength: {
                value: 130,
                message: "Полное имя не должно превышать 130 символов!",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          help={errors.email?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Пожалуйста, введите ваш email!",
              pattern: {
                value: emailRegex,
                message: "Некорректный email адрес!",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          help={errors.password?.message}
          validateStatus={errors.password ? "error" : ""}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: "Пожалуйста, введите пароль!" }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item label="Дата рождения">
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Телефон"
          help={errors.telephone?.message}
          validateStatus={errors.telephone ? "error" : ""}
        >
          <Controller
            name="telephone"
            control={control}
            rules={{
              pattern: {
                value: phoneRegex,
                message: "Некорректный номер телефона!",
              },
            }}
            render={({ field }) => (
              <Input addonBefore="+" placeholder="79991234567" {...field} />
            )}
          />
        </Form.Item>

        <Form.Item label="Занятость">
          <Controller
            name="employment"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Выберите тип занятости"
                {...field}
                onChange={(value) => field.onChange(value)}
              >
                {employmentOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Создать
          </Button>
        </Form.Item>
      </form>
    </Modal>
  );
};

export default CreateUser;
