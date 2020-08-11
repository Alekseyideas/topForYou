import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	ApolloLink,
	HttpLink,
} from '@apollo/client';
import {
	unstable_createMuiStrictModeTheme,
	ThemeProvider,
} from '@material-ui/core/styles';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TokenRefresh } from './utils/TokenRefreshLink';
import { AuthLink } from './utils/AuthLink';

const theme = unstable_createMuiStrictModeTheme({
	palette: {
		type: 'dark',
	},
});
console.log('theme: ', theme);

const httpLink = new HttpLink({
	uri: 'http://localhost:3200/graphql',
	credentials: 'include',
});

const client = new ApolloClient({
	link: ApolloLink.from([TokenRefresh, AuthLink, httpLink]),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
