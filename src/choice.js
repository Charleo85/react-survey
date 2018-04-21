import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import ButtonBase from 'material-ui/ButtonBase';
import { scaleDescription, types, typeDescription, QuestionText1, QuestionText3 } from './constant.js';

const styles = theme => ({
	card: {
		maxWidth: 500,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 8,
		marginBottom: 8
	},
	checked: {
		color: green[500]
	},
	media: {
		width: '100%'
	},
	actionBar: {
		display: 'block'
	},
	actionSec: {
		display: 'block'
	},
	question: {
		fontWeight: '500',
		fontSize: 'large',
		marginBottom: '0'
	},
	highlight: {
		fontSize: 'large',
		color: '#42A5F5'
	},
	selectableLabel: {
		padding: '2px 6px',
		minWidth: '32px'
	},
	multiSelectableLabel: {
		padding: '2px 6px',
		minWidth: '32px',
		flexDirection: 'column'
	},
	quotation: {
		fontFamily: 'Lucida Grande'
	}
});

class ImgChoice extends Component {
	constructor(props) {
		super();
		this.state = {
			isChosen: null,
			titlePreference: -1,
			textPreference: -1,
			topicPreference: -1
		};
	}

  selectAction = interested => () => {
  	this.props.onClick(interested);
  	this.setState(prevState => {
  		return { isChosen: interested };
  	});
  };

  chooseAction = (type, idx) => () => {
  	this.props.reasoning(type, idx);
  	this.setState(prevState => {
  		return { [`${type}Preference`]: idx };
  	});
  };

  render() {
  	const { classes, data, onReasoning } = this.props;

  	const renderReasoning = type => (
  		<div className={classes.actionBar} key={type}>
  			<Typography
  				paragraph
  				align="left"
  				variant="body1"
  				component="div"
  				className={classes.question}
  			>
  				{'How much did the '}
  				{typeDescription(type)}
  				{' influence your choice? '}
  			</Typography>
  			{scaleDescription.map((val, idx) => (
  				<div style={{ display: 'inline' }} key={`${type}.${idx}`}>
  					<ButtonBase
  						onClick={this.chooseAction(type, idx)}
  						className={classes.multiSelectableLabel}
  					>
  						<Radio
  							checked={this.state[`${type}Preference`] === idx}
  							value={val}
  							name={val}
  							style={{ display: 'flex' }}
  						/>
  						<div style={{ display: 'flex' }}>{val}</div>
  					</ButtonBase>
  				</div>
  			))}
  		</div>
  	);

  	return (
  		<Card raised={this.state.isChosen != null} className={classes.card}>
  			<div>
  				<img
  					src={'/static/' + data + '.png'}
  					alt={'question'}
  					className={classes.media}
  				/>
  			</div>
  			<Divider />
  			<CardActions className={classes.actionSec}>
  				<div className={classes.actionBar}>
  					<Typography
  						paragraph
  						align="left"
  						variant="body1"
  						component="p"
  						className={classes.question}
  					>
              {QuestionText1}
  					</Typography>
  					<Button
  						onClick={this.selectAction(1)}
  						disabled={onReasoning}
  						className={classes.selectableLabel}
  					>
  						<Radio
  							disabled={onReasoning}
  							checked={this.state.isChosen === 1}
  							value="1"
  							name="yes"
  							label="yes"
  							className={classes.checked}
  						/>
  						{'Yes'}
  					</Button>
  					<Button
  						onClick={this.selectAction(0)}
  						disabled={onReasoning}
  						className={classes.selectableLabel}
  					>
  						<Radio
  							disabled={onReasoning}
  							checked={this.state.isChosen === 0}
  							value="0"
  							name="no"
  							label="no"
  						/>
  						{'No'}
  					</Button>
  				</div>
  				{onReasoning && types.map(type => renderReasoning(type))}
  			</CardActions>
  		</Card>
  	);
  }
}

class TextChoice extends Component {
	constructor(props) {
		super();
		this.state = { isChosen: null };
	}

  selectAction = interested => () => {
  	this.props.onClick(interested);
  	this.setState(prevState => {
  		return { isChosen: interested };
  	});
  };

  render() {
  	const { classes, data } = this.props;
  	return (
  		<Card raised={this.state.isChosen != null} className={classes.card}>
  			<CardContent>
  				<Typography
  					className={classes.quotation}
  					variant="subheading"
  					align="left"
  					component="p"
  				>
  					{data}
  				</Typography>
  			</CardContent>
  			<Divider />
  			<CardActions className={classes.actionSec}>
  				<div className={classes.actionBar}>
  					<Typography
  						paragraph
  						align="left"
  						variant="body1"
  						component="p"
  						className={classes.question}
  					>
              {QuestionText3}
  					</Typography>
  					<Button
  						onClick={this.selectAction(1)}
  						className={classes.selectableLabel}
  					>
  						<Radio
  							checked={this.state.isChosen === 1}
  							value="1"
  							name="yes"
  							label="yes"
  							className={classes.checked}
  						/>
  						{'Yes'}
  					</Button>
  					<Button
  						onClick={this.selectAction(0)}
  						className={classes.selectableLabel}
  					>
  						<Radio
  							checked={this.state.isChosen === 0}
  							value="0"
  							name="no"
  							label="no"
  						/>
  						{'No'}
  					</Button>
  				</div>
  			</CardActions>
  		</Card>
  	);
  }
}

export const ImgChoiceType = withStyles(styles)(ImgChoice);
export const TextChoiceType = withStyles(styles)(TextChoice);
