import { Form, InputNumber } from "antd";
import type { FC } from "react";

type FormInputProps = {
  id: string;
  label: string;
};

const FormInput: FC<Readonly<FormInputProps>> = ({ label, id }) => {
  return (
    <Form.Item
      label={label}
      name={id}
      rules={[{ required: true, message: "Please input this account value" }]}
    >
      <InputNumber
        min={0}
        suffix="€"
        precision={2}
        style={{ minWidth: "100%" }}
      />
    </Form.Item>
  );
};

export default FormInput;
