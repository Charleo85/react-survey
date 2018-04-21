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
		fontSize: '18px',
		color: '#111111'
	},
	highlight: {
		fontSize: '18px',
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
          This task is composed of several questions over 3 pages. It costs in average less than 2 mins to finish.<br/>
					<span className={classes.highlight}> Questions on each page has different instructions, </span>
          so make sure you read carefully the instructions on every page.
				</Typography>
			</Paper>
		);
	}
}

export default withStyles(styles)(Instruction);
