import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	dismissButton: {
		float: 'right'
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	instruction: {
		fontSize: '22px',
		color: '#111111'
	},
	highlight: {
		fontSize: '22px',
		fontStyle: 'italic',
		color: '#D50000'
	},
	root: theme.mixins.gutters({
		paddingTop: 8,
		paddingBottom: 8,
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		marginLeft: 'auto',
		marginRight: 'auto',
		maxWidth: 960
	})
});

class Instruction extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root} elevation={0}>
				<Typography
					align="left"
					variant="headline"
					component="h1"
					className={classes.instruction}
				>
        In this survey, you need to answer 3 pages of questions. It takes less than 2 minutes on average to finish.
					<span className={classes.highlight}> Each page has different instructions; </span>
          please read instructions carefully on each page.
				</Typography>
			</Paper>
		);
	}
}

export default withStyles(styles)(Instruction);
