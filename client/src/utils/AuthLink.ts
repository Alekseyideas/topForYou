import { ApolloLink } from '@apollo/client';
import { getAccessToken } from './accessToken';

export const AuthLink = new ApolloLink((operation, forward) => {
	const token = getAccessToken();
	operation.setContext({
		headers: {
			authorization: token ? `bearer ${token}` : '',
		},
	});
	return forward(operation);
});
