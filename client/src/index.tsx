import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
	ApolloClient,
	InMemoryCache,
	gql,
	ApolloProvider,
} from '@apollo/client';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
	uri: 'http://localhost:3200/graphql',
	cache: new InMemoryCache(),
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
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
