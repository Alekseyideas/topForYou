import React from 'react';
import {
	Breadcrumbs,
	Typography,
	Link,
	Card,
	TextField,
	Box,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import { NavLink, Redirect } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { UserRoles } from '../utils/helpers';
import { Loader, ErrorModal } from '../components';
import {
	useCreateUserMutation,
	GetUsersQuery,
	GetUsersDocument,
} from '../generated/graphql';
import { routePath } from '../utils/routePath';

const field1 = 'name';
const field2 = 'lastName';
const field3 = 'pass';
const field4 = 'email';
export const CreateUser: React.FC = () => {
	const [createUser, { loading, error }] = useCreateUserMutation();
	const [showModal, setShowModal] = React.useState(false);
	const [goToUsers, setGoToUsers] = React.useState(false);
	const { form, onChangeHandler } = useForm({
		[field1]: {
			value: '',
		},
		[field2]: {
			value: '',
		},
		[field3]: {
			value: '',
		},
		[field4]: {
			value: '',
		},
	});

	React.useEffect(() => {
		console.log(error, 'error');
	}, [error]);

	const [role, setRole] = React.useState(1);

	if (goToUsers) return <Redirect to={routePath.home} />;
	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" component={NavLink} to="/">
					Users
				</Link>
				<Typography color="textPrimary">Create User</Typography>
			</Breadcrumbs>

			<Card
				style={{
					maxWidth: '600px',
					marginTop: '20px',
					padding: '20px',
					position: 'relative',
				}}
			>
				<form action="" noValidate autoComplete="off">
					<Box>
						<TextField
							required
							fullWidth
							name={field1}
							value={form[field1].value}
							onChange={onChangeHandler}
							type="text"
							label="First name"
							color="secondary"
						/>
					</Box>
					<Box marginTop={2}>
						<TextField
							required
							fullWidth
							name={field2}
							value={form[field2].value}
							onChange={onChangeHandler}
							type="text"
							label="Last name"
							color="secondary"
						/>
					</Box>
					<Box marginTop={2}>
						<TextField
							required
							fullWidth
							name={field3}
							value={form[field3].value}
							onChange={onChangeHandler}
							type="text"
							label="Password"
							color="secondary"
						/>
					</Box>
					<Box marginTop={2}>
						<TextField
							required
							fullWidth
							name={field4}
							value={form[field4].value}
							onChange={onChangeHandler}
							type="email"
							label="Email"
							color="secondary"
						/>
					</Box>
					<Box marginTop={2}>
						<InputLabel id="demo-simple-select-label">Role</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							name="role"
							value={role}
							onChange={(e) => {
								if (e && e.target) {
									setRole(Number(e.target.value));
								}
							}}
							// onChange={(e) => setRole(+e.target.value)}
						>
							{Object.keys(UserRoles).map((key) => {
								return (
									<MenuItem key={key} value={UserRoles[+key].id}>
										{UserRoles[+key].name}
									</MenuItem>
								);
							})}
						</Select>
					</Box>
					<Box marginTop={5} textAlign="right">
						<Button
							centerRipple
							size="large"
							color="primary"
							variant="contained"
							onClick={async () => {
								try {
									await createUser({
										variables: {
											options: {
												email: form[field4].value,
												role,
												firstName: form[field1].value,
												lastName: form[field2].value,
												password: form[field3].value,
											},
										},
										update: (store, { data }) => {
											console.log('data: ', data);
											// console.log('store: ', store);
											if (!data) return null;
											const queryData = store.readQuery<GetUsersQuery>({
												query: GetUsersDocument,
											});
											const users =
												queryData && queryData.users && queryData.users[0]
													? [...queryData.users, data.createUser]
													: [data.createUser];
											return store.writeQuery<GetUsersQuery>({
												query: GetUsersDocument,
												data: {
													__typename: 'Query',
													users,
												},
											});
										},
									});
									setGoToUsers(true);
								} catch (e) {
									console.log(e);
									setShowModal(true);
								}
							}}
						>
							Create
						</Button>
					</Box>
				</form>
				{loading ? <Loader /> : null}
				{showModal ? (
					<ErrorModal
						handleClose={() => setShowModal(false)}
						body={<p>{JSON.stringify(error)}</p>}
					/>
				) : null}
			</Card>
		</>
	);
};
