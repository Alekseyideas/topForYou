import React from 'react';
import './App.css';
import { CircularProgress, Grid } from '@material-ui/core';
import { UnAuthRoutes } from './Routes';
import { setAccessToken } from './utils/accessToken';

function App() {
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			const data = await fetch('http://localhost:3200/refresh-token', {
				method: 'POST',
				credentials: 'include',
			});
			const resp = await data.json();
			if (resp.ok) {
				setAccessToken(resp.accessToken);
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

	return <UnAuthRoutes />;
}

export default App;
