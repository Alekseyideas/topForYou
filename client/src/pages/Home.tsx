import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Button, Container } from '@material-ui/core';

const GET_USERS = gql`
	{
		users {
			id
			firstName
			lastName
			password
			role
		}
	}
`;
export const Home = () => {
	const [getUsers, { loading, error, data, refetch }] = useLazyQuery(GET_USERS);

	let htmlBody = <p />;
	if (loading) htmlBody = <p>Loading...</p>;
	if (error) htmlBody = <p>Error :(</p>;
	if (data && data.users && data.users[0]) {
		htmlBody = (
			<ul>
				{data.users.map((user: any) => {
					return (
						<li key={user.id}>
							{user.id}: {user.firstName}
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<Container>
			<Button variant="contained">Default</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					if (refetch) {
						console.log('refetch users');
						refetch();
					} else {
						console.log('get users');
						getUsers();
					}
				}}
			>
				Primary
			</Button>
			<Button
				variant="contained"
				color="secondary"
				onClick={() => {
					// login({
					// 	variables: {
					// 		options: {
					// 			password: '09071993',
					// 			email: 'annitasunbeam@gmail.com',
					// 		},
					// 	},
					// });
				}}
			>
				Secondary
			</Button>
			<Button variant="contained" disabled>
				Disabled
			</Button>
			<Button variant="contained" color="primary" href="#contained-buttons">
				Link
			</Button>
			<br />
			<br />
			<br />
			<br />
			{htmlBody}
		</Container>
	);
};
