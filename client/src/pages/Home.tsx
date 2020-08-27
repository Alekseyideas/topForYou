import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
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
	IconButton,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {
	useGetUsersQuery,
	useUserQuery,
	useRemoveUserMutation,
} from '../generated/graphql';
import { UserRoles, IUserRoleGroup } from '../utils/helpers';
import { routePath } from '../utils/routePath';

export const Home = () => {
	// const theme = useTheme();
	const history = useHistory();
	const {
		data: usersData,
		error: usersError,
		loading: usersLoading,
	} = useGetUsersQuery();

	const { data: userData } = useUserQuery();
	const [removeUser] = useRemoveUserMutation();

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
					<TableCell component="td" scope="row">
						<Typography color="textSecondary">{user.id}</Typography>
					</TableCell>
					<TableCell component="td" scope="row">
						<Typography color="textSecondary">
							{user.firstName} {user.lastName}
						</Typography>
					</TableCell>
					<TableCell component="td" scope="row">
						<Typography color="textPrimary">
							{UserRoles[user.role as keyof IUserRoleGroup].name}
						</Typography>
					</TableCell>
					<TableCell component="td" scope="row" align="right">
						<IconButton
							color="secondary"
							onClick={() =>
								removeUser({
									variables: {
										id: user.id,
									},
								})
							}
						>
							<DeleteIcon style={{ fontSize: 17 }} />
						</IconButton>
					</TableCell>
				</TableRow>
			);
		});
	}
	return (
		<>
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
				<Button
					onClick={() => history.push(routePath.createUser)}
					variant="outlined"
				>
					Create User
				</Button>
			</Grid>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell component="th" align="left">
								Id
							</TableCell>
							<TableCell component="th" align="left">
								User name
							</TableCell>
							<TableCell component="th" align="left">
								User role
							</TableCell>
							<TableCell component="th" align="right" />
						</TableRow>
					</TableHead>
					<TableBody>{tableRows}</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
