import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const Loader: React.FC = () => {
	return (
		<div
			style={{
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(255, 255, 255, 0.5)',
			}}
		>
			<CircularProgress color="secondary" />
		</div>
	);
};
