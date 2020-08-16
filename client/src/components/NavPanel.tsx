import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import {
	Drawer,
	makeStyles,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useUserQuery } from '../generated/graphql';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		// position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
}));

export const NavPanel: React.FC = () => {
	const { data, loading } = useUserQuery();
	const classes = useStyles();
	if (loading) return null;
	if (!data) return null;

	return (
		<nav className={classes.drawer} aria-label="mailbox folders">
			<Drawer
				variant="persistent"
				anchor="left"
				open
				classes={{ paper: classes.drawerPaper }}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				<ListItem>
					<ListItemText primary="TopForYou" color="#fff" />
				</ListItem>
				<ListItem>
					<ListItemText
						primary={`Hello ${data.user?.firstName}`}
						color="#fff"
					/>
				</ListItem>

				<ListItem button component={NavLink} to="/">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
			</Drawer>
		</nav>
	);
};
