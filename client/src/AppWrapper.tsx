import React from 'react';
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core';
import { NavPanel } from './components';

interface AppWrapperProps {
	children: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				flexShrink: 0,
			},
		},

		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
	})
);

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<NavPanel />
			<Container style={{ maxWidth: 'initial', paddingTop: '20px' }}>
				{children}
			</Container>
		</div>
	);
};
