import React from 'react';
import { Modal, Theme, makeStyles, createStyles } from '@material-ui/core';

interface ErrorModalProps {
	body: JSX.Element;
	handleClose: () => void;
}
function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			position: 'absolute',
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #fff',
			boxShadow: theme.shadows[4],
			padding: theme.spacing(2, 4, 3),
		},
	})
);
export const ErrorModal: React.FC<ErrorModalProps> = ({
	body,
	handleClose,
}) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	return (
		<Modal
			open={true}
			onClose={handleClose}
			// aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div style={modalStyle} className={classes.paper}>
				<h2 id="modal-title">Error</h2>
				{body}
			</div>
		</Modal>
	);
};
