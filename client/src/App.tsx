import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import './App.css';
import { Home, Login } from './pages';

const LOGIN = gql`
	mutation login($options: UserLoginInput!) {
		login(options: $options) {
			accessToken
			refreshToken
		}
	}
`;

function App() {
	const [login, { data: userData }] = useMutation(LOGIN);

	React.useEffect(() => {
		console.log(userData, 'userData');
	}, [userData]);

	return (
		<div>
			<Home />
			<Login />
		</div>
	);
}

export default App;
