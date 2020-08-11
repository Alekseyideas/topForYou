import React from 'react';
// import { useGetUsersLazyQuery } from '../generated/graphql';
import { NavPanel } from '../components';

export const Home = () => {
	// const [
	// 	getUsers,
	// 	{ data: usersData, error: usersError, loading: usersLoading },
	// ] = useGetUsersLazyQuery({ fetchPolicy: 'network-only' });

	// let htmlUsers = <p />;
	// if (usersLoading) {
	// 	htmlUsers = <p>Loading...</p>;
	// }
	// if (usersError) {
	// 	htmlUsers = <p>{JSON.stringify(usersError)}</p>;
	// }
	// if (usersData) {
	// 	htmlUsers = <p>{JSON.stringify(usersData)}</p>;
	// }
	// let htmlBody = <p />;
	// if (loading) htmlBody = <p>Loading...</p>;
	// if (error) htmlBody = <p>Error :(</p>;

	// if (data && data.users && data.users[0]) {
	// 	htmlBody = (
	// 		<ul>
	// 			{data.users.map((user: any) => {
	// 				return (
	// 					<li key={user.id}>
	// 						{user.id}: {user.firstName}
	// 					</li>
	// 				);
	// 			})}
	// 		</ul>
	// 	);
	// }

	return (
		<>
			<NavPanel />
			{/* <Container>
				<Button variant="contained">Default</Button>
				<Button variant="contained" color="primary" onClick={() => getUsers()}>
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
				{htmlUsers}
			</Container> */}
		</>
	);
};
