import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader/root';
import { CircularProgress, Grid } from '@material-ui/core';
import { UnAuthRoutes, AuthRoutes } from './Routes';
import { setAccessToken } from './utils/accessToken';
import { useUserQuery } from './generated/graphql';
import { AppWrapper } from './AppWrapper';

function App() {
	// const [loading, setLoading] = React.useState(true);
	const { data: userData, loading } = useUserQuery();

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
			}
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
	if (userData)
		return (
			<AppWrapper>
				<AuthRoutes />
			</AppWrapper>
		);
	return <UnAuthRoutes />;
}

export default hot(App);
