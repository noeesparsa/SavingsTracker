import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Spin } from "antd";
import { type FC } from "react";

import {
  useGetSavingsAccounts,
  useUploadSavingsSnapshot,
} from "../../savingsQueries";
import type { AccountSnapshotPayload } from "../../types";
import FormInput from "../formInput/FormInput.component";

type AccountFormProps = {
  username: string;
};

const AccountForm: FC<Readonly<AccountFormProps>> = ({ username }) => {
  const {
    data: accounts,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
  } = useGetSavingsAccounts(username);
  const { mutate: uploadSnapshot, isPending: isUploadPending } =
    useUploadSavingsSnapshot(username);
  const [form] = Form.useForm();

  const onFinish = (values: AccountSnapshotPayload) => {
    uploadSnapshot(values);
    form.resetFields();
  };

  return (
    <div className="text-center">
      <div>{isAccountsError && <div>error</div>}</div>
      {!isAccountsError && (
        <Spin spinning={isAccountsLoading || isUploadPending}>
          {accounts !== undefined && accounts.length >= 1 && (
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <div className="grid grid-cols-1 gap-x-4 md:min-w-100 md:grid-cols-2">
                {accounts.map((account) => (
                  <FormInput
                    key={account.id}
                    id={account.id}
                    label={account.label}
                  />
                ))}
              </div>
              <div className="flex flex-col items-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isUploadPending || isAccountsLoading}
                  icon={<CloudUploadOutlined />}
                >
                  Upload snapshot
                </Button>
              </div>
            </Form>
          )}
        </Spin>
      )}
    </div>
  );
};

export default AccountForm;
