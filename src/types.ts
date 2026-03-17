type LoggingFormType = {
  email: string;
  password: string;
};

type Account = {
  id: string;
  label: string;
};

type AccountSnapshotPayload = Record<string, number>;

export type { LoggingFormType, Account, AccountSnapshotPayload };
