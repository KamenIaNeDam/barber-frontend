export const logout = async () => {
  document.cookie = `access_token=;path=/; max-age=${0}; SameSite=Lax`;
};
