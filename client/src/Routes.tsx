import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './pages';

export const UnAuthRoutes = () => {
	return (
		<Switch>
			<Route path="*" component={Login} />
		</Switch>
	);
};
