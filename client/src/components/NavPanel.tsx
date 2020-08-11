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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
	const classes = useStyles();
	return (
		<nav aria-label="mailbox folders">
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

				<ListItem button component={NavLink} to="/">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
				<ListItem button component={NavLink} to="/home">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
			</Drawer>
		</nav>
	);
};
