import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login, Home, CreateUser } from './pages';
import { routePath } from './utils/routePath';

export const UnAuthRoutes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Redirect to="/" />
		</Switch>
	);
};
export const AuthRoutes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path={routePath.home} exact component={Home} />
			<Route path={routePath.createUser} exact component={CreateUser} />
		</Switch>
	);
};
