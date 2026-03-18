import { Button, Form, Input, Spin } from "antd";
import { type FC } from "react";

import { useAuthentication } from "../../context/authentication/useAuthentication";
import type { LoggingFormType } from "../../types";

const LoggingForm: FC = () => {
  const { login, loading } = useAuthentication();
  const [form] = Form.useForm<LoggingFormType>();

  const onSubmit = (formValues: LoggingFormType) => {
    login(formValues.email, formValues.password);
  };

  return (
    <Spin spinning={loading}>
      <Form
        className="text-center"
        layout="vertical"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item required id="email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item required id="password" name="password">
          <Input placeholder="Password" type="password" />
        </Form.Item>
        <Button color="geekblue" variant="outlined" htmlType="submit">
          Log in
        </Button>
      </Form>
    </Spin>
  );
};

export default LoggingForm;
