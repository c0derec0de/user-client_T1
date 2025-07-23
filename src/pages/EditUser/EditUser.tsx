import React, { useEffect } from "react";
import { Modal, Form, Input, Button, DatePicker, Select, message } from "antd";
import dayjs from "dayjs";
import { userEdit } from "../../shared/api/userApi";
import { useForm, Controller } from "react-hook-form";
import { type User } from "../../shared/types/userType";
import axios from "axios";

const { Option } = Select;

type FieldType = {
  name: string;
  surName: string;
  fullName: string;
  birthDate?: dayjs.Dayjs;
  telephone?: string;
  employment?: string;
  userAgreement: boolean;
};

const employmentOptions = [
  "Полная занятость",
  "Частичная занятость",
  "Фриланс",
  "Безработный",
  "Студент",
];

interface EditUserModalProps {
  open: boolean;
  user: User;
  onCancel: () => void;
  onUpdate: () => void;
}

const phoneRegex = /^\+?[0-9]{10,15}$/;

const EditUser: React.FC<EditUserModalProps> = ({
  open,
  user,
  onCancel,
  onUpdate,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldType>({
    defaultValues: {
      name: "",
      surName: "",
      fullName: "",
      birthDate: undefined,
      telephone: "",
      employment: "",
      userAgreement: true,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        surName: user.surName,
        fullName: user.fullName,
        birthDate: user.birthDate ? dayjs(user.birthDate) : undefined,
        telephone: user.telephone || "",
        employment: user.employment || "",
        userAgreement: true,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FieldType) => {
    try {
      const preparedData = {
        ...data,
        telephone: data.telephone?.startsWith("+")
          ? data.telephone
          : `+${data.telephone}`,
        birthDate: data.birthDate
          ? dayjs(data.birthDate).toISOString()
          : undefined,
        userAgreement: true,
      };

      console.log("Отправляем в PATCH:", JSON.stringify(preparedData, null, 2));

      const response = await userEdit.updateUser(user.id, preparedData);
      console.log("Ответ сервера:", response);

      message.success("Данные пользователя успешно обновлены");
      onUpdate();
      onCancel();
    } catch (error) {
      console.error("Полная ошибка:", error);

      let errorMessage = "Ошибка при обновлении пользователя";
      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage =
          error.response.data.message || JSON.stringify(error.response.data);
      }

      message.error(errorMessage);
    }
  };

  return (
    <Modal
      title="Редактировать пользователя"
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
            render={({ field }) => <Input {...field} disabled={isSubmitting} />}
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
            render={({ field }) => <Input {...field} disabled={isSubmitting} />}
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
            render={({ field }) => <Input {...field} disabled={isSubmitting} />}
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
                disabled={isSubmitting}
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
              <Input
                addonBefore="+"
                placeholder="79991234567"
                disabled={isSubmitting}
                {...field}
              />
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
                disabled={isSubmitting}
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
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Сохранить
          </Button>
        </Form.Item>
      </form>
    </Modal>
  );
};

export default EditUser;
