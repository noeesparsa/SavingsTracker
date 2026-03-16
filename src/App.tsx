import { Typography } from "antd";

import AccountForm from "./components/accountForm/AccountForm.component";

function App() {
  return (
    <div className="flex min-h-screen w-screen content-center items-center justify-center bg-indigo-200 p-8">
      <div className="flex h-full min-h-36 flex-col gap-4 rounded-2xl bg-white px-8 py-4">
        <Typography.Title
          className="text-center font-mono font-bold italic"
          level={2}
        >
          Savings Tracker
        </Typography.Title>
        <AccountForm username="noe" />
      </div>
    </div>
  );
}

export default App;
