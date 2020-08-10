import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getAccessToken } from './utils/accessToken';

const httpLink = createHttpLink({
	uri: 'http://localhost:3200/graphql',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = getAccessToken();
	// const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: 'include',
	link: authLink.concat(httpLink),
});

// client
// 	.query({
// 		query: gql`
// 			query getUsers {
// 				users {
// 					id
// 					firstName
// 					lastName
// 					password
// 					role
// 				}
// 			}
// 		`,
// 	})
// 	.then((result) => console.log(result));
ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
