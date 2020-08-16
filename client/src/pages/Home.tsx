import React from 'react';
import {
	Container,
	makeStyles,
	Theme,
	createStyles,
	Breadcrumbs,
	Typography,
	Grid,
	Button,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	Paper,
} from '@material-ui/core';
import { NavPanel } from '../components';
import { useGetUsersQuery, useUserQuery } from '../generated/graphql';
import { getUserRole } from '../utils/helpers';

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

export const Home = () => {
	// const theme = useTheme();
	const classes = useStyles();

	const {
		data: usersData,
		error: usersError,
		loading: usersLoading,
	} = useGetUsersQuery();

	const { data: userData } = useUserQuery();

	let tableRows: (JSX.Element | null)[] | JSX.Element = (
		<TableRow>
			<TableCell component="th" scope="row" colSpan={3}>
				No Users in this table{' '}
			</TableCell>
		</TableRow>
	);
	if (usersLoading) {
		tableRows = (
			<TableRow>
				<TableCell component="th" scope="row" colSpan={3}>
					Loading ...
				</TableCell>
			</TableRow>
		);
	}
	if (usersError) {
		tableRows = (
			<TableRow>
				<TableCell component="th" scope="row" colSpan={3}>
					<Typography color="error"> {JSON.stringify(usersError)}</Typography>
				</TableCell>
			</TableRow>
		);
	}
	if (usersData?.users[0] && userData && userData.user) {
		tableRows = usersData.users.map((user) => {
			if (userData?.user?.id === user.id) return null;
			return (
				<TableRow key={user.id}>
					<TableCell component="th" scope="row">
						<Typography color="textSecondary">{user.id}</Typography>
					</TableCell>
					<TableCell component="th" scope="row">
						<Typography color="textSecondary">
							{user.firstName} {user.lastName}
						</Typography>
					</TableCell>
					<TableCell component="th" scope="row">
						<Typography color="textPrimary">
							{getUserRole(user.role)}{' '}
						</Typography>
					</TableCell>
				</TableRow>
			);
		});
	}
	return (
		<div className={classes.root}>
			<NavPanel />
			<Container style={{ maxWidth: 'initial', paddingTop: '20px' }}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="textPrimary">Users</Typography>
				</Breadcrumbs>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="center"
				>
					<h1>Users</h1>
					<Button onClick={() => null} variant="outlined">
						Create User
					</Button>
				</Grid>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="left">Id</TableCell>
								<TableCell align="left">User name</TableCell>
								<TableCell align="left">User role</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{tableRows}</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</div>
	);
};
