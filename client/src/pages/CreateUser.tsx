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
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { UserRoles, IUserRoleGroup } from '../utils/helpers';

const field1 = 'name';
const field2 = 'lastName';
const field3 = 'pass';
const field4 = 'email';
const field5 = 'role';
export const CreateUser: React.FC = () => {
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

	const [role, setRole] = React.useState(1);
	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" component={NavLink} to="/">
					Users
				</Link>
				<Typography color="textPrimary">Create User</Typography>
			</Breadcrumbs>

			<Card style={{ maxWidth: '600px', marginTop: '20px', padding: '20px' }}>
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
						<InputLabel id="demo-simple-select-label">Age</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={role}
							onChange={(e) => console.log(e)}
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
							onClick={() => console.log('Create')}
						>
							Create
						</Button>
					</Box>
				</form>
			</Card>
		</>
	);
};
