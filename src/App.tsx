import { LogoutOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useContext } from "react";

import AccountForm from "./components/accountForm/AccountForm.component";
import LoggingForm from "./components/loggingForm/LoggingForm.component";
import { AuthenticationContext } from "./context/authentication/AuthenticationContext";

function App() {
  const { user, logout } = useContext(AuthenticationContext);

  return (
    <div className="flex min-h-screen w-screen content-center items-center justify-center bg-indigo-200 p-8">
      <div className="flex h-full min-h-36 flex-col gap-4 rounded-2xl bg-white px-8 py-4 md:min-w-100">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <Typography.Title
            className="text-left font-mono font-bold italic"
            level={3}
          >
            Savings Tracker
          </Typography.Title>
          {user && (
            <div className="flex flex-row gap-2">
              <Button
                size="small"
                onClick={logout}
                icon={<LogoutOutlined />}
                variant="outlined"
                color="danger"
              >
                Log out
              </Button>
            </div>
          )}
        </div>
        {user === null ? (
          <LoggingForm />
        ) : (
          <AccountForm userEmail={user.email} />
        )}
      </div>
    </div>
  );
}

export default App;
