const apiUrlByUser: Record<string, string> = {
  [import.meta.env.VITE_USER_1_EMAIL]: import.meta.env.VITE_USER_1_API_URL,
  [import.meta.env.VITE_USER_2_EMAIL]: import.meta.env.VITE_USER_2_API_URL,
  [import.meta.env.VITE_USER_3_EMAIL]: import.meta.env.VITE_USER_3_API_URL,
};

export { apiUrlByUser };
