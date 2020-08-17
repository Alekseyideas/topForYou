export interface IUserRole {
	id: number;
	name: string;
}
export interface IUserRoleGroup {
	[p: number]: IUserRole;
}
export const UserRoles: IUserRoleGroup = {
	1: {
		id: 1,
		name: 'Super admin',
	},
	2: {
		id: 2,
		name: 'Admin',
	},
};
