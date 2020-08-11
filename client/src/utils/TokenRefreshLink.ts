import { TokenRefreshLink } from 'apollo-link-token-refresh';
import JwtDecode from 'jwt-decode';
import { getAccessToken, setAccessToken } from './accessToken';

export const TokenRefresh = new TokenRefreshLink({
	accessTokenField: 'accessToken',
	isTokenValidOrUndefined: () => {
		const token = getAccessToken();
		if (!token) {
			return true;
		}
		try {
			const { exp } = JwtDecode(token);
			if (Date.now() >= exp * 1000) {
				return false;
			}
			return true;
		} catch {
			return false;
		}
	},
	fetchAccessToken: () => {
		return fetch('http://localhost:3200/refresh-token', {
			method: 'POST',
			credentials: 'include',
		});
	},
	handleFetch: (accessToken) => {
		// const accessTokenDecrypted = jwtDecode(accessToken);
		setAccessToken(accessToken);
	},
	handleError: (err) => {
		// full control over handling token fetch Error
		console.warn('Your refresh token is invalid. Try to relogin');
		console.error(err);
	},
});
