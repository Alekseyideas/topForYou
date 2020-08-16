export const getUserRole = (roleId: number) => {
	switch (roleId) {
		case 1:
			return 'admin';
		default:
			return 'client';
	}
};
