export enum UserType {
    Admin = 1,
    User = 2
}
export const getUserType = (status: UserType): string => {
  const statusMap: Record<UserType, string> = {
    [UserType.Admin]: 'Admin',
    [UserType.User]: 'User',
  };
  return statusMap[status] || 'Unknown';
};