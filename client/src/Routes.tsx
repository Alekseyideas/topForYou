import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Home } from './pages';

export const UnAuthRoutes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/home" exact component={Home} />
		</Switch>
	);
};
