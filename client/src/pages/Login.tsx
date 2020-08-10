import React from 'react';
import { Grid, Container, Box, TextField, Button } from '@material-ui/core';
import { useForm } from '../hooks/useForm';
import { useLoginMutation } from '../generated/graphql';

const field1 = 'email';
const field2 = 'pass';

export const Login = () => {
	const [login] = useLoginMutation();
	const { form, onChangeHandler } = useForm({
		[field1]: {
			value: '',
		},
		[field2]: {
			value: '',
		},
	});
	const loginHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = form[field1].value;
		const pass = form[field2].value;
		const log = await login({
			variables: {
				options: {
					email,
					password: pass,
				},
			},
		});
		console.log(log);
	};
	return (
		<Container>
			<Grid
				container
				justify="center"
				alignItems="center"
				style={{ minHeight: '100vh' }}
			>
				<Grid item md={6}>
					<Box>
						<Box textAlign="center">
							<h1>Login</h1>
						</Box>
						<form onSubmit={loginHandler} noValidate autoComplete="off">
							<Box>
								<TextField
									required
									fullWidth
									name={field1}
									value={form[field1].value}
									onChange={onChangeHandler}
									type="email"
									label="Email"
								/>
							</Box>
							<Box marginTop={2}>
								<TextField
									fullWidth
									required
									label="Password"
									name={field2}
									value={form[field2].value}
									onChange={onChangeHandler}
									type="password"
									autoComplete="current-password"
								/>
							</Box>
							<Box marginTop={5} textAlign="center">
								<Button
									centerRipple
									size="large"
									color="primary"
									variant="contained"
									onClick={loginHandler}
								>
									Login
								</Button>
							</Box>
						</form>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};
