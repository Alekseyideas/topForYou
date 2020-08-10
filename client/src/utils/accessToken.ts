export const setAccessToken = (s: string) => {
	localStorage.setItem('accessToken', s);
};

export const getAccessToken = () => {
	return localStorage.getItem('accessToken');
};
