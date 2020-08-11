import React from 'react';
import './App.css';
import { CircularProgress, Grid } from '@material-ui/core';
import { UnAuthRoutes, AuthRoutes } from './Routes';
import { setAccessToken } from './utils/accessToken';

function App() {
	const [loading, setLoading] = React.useState(true);
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	React.useEffect(() => {
		(async () => {
			const data = await fetch('http://localhost:3200/refresh-token', {
				method: 'POST',
				credentials: 'include',
			});
			const resp = await data.json();
			// console.log('resp: ', resp);
			if (resp.ok) {
				setAccessToken(resp.accessToken);
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}

			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<Grid
				container
				justify="center"
				alignItems="center"
				style={{ minHeight: '100vh' }}
			>
				<CircularProgress color="secondary" />
			</Grid>
		);
	}

	if (isLoggedIn) return <AuthRoutes />;
	return <UnAuthRoutes />;
}

export default App;
