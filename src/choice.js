import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import green from 'material-ui/colors/green';

const styles = {
  card: {
    maxWidth: 480,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 8,
    marginBottom: 8
  },
  checked: {
    color: green[500],
  },
  media: {
    height: 200
  }
};

class Choice extends Component {
  constructor(props) {
    super();
    this.state = { isChosen: null };
  }

  selectAction = (interested) => () => {
    // console.log("clicked choice");
    //onChange={this.selectAction.bind(this)}

    // if (this.props.selectable || this.state.isChosen) {
      if (this.state.isChosen == null) this.props.onClick();
      this.setState(prevState => {
        return { isChosen: interested };
      });
    // }
  }

  render() {
    const { classes, selectable, data, isMedia } = this.props;
    return (
      <Card raised={this.state.isChosen != null} className={classes.card} >
        {isMedia ?
        <CardMedia
          className={classes.media}
          image={require('./img/' + data)}
        />
        :
        <CardContent>
          <Typography variant="subheading" align="left" component="p">
            {data}
          </Typography>
        </CardContent>}
        <CardActions>
          <Radio
            checked={this.state.isChosen === '1'}
            onChange={this.selectAction('1')}
            value='1'
            name="yes"
            label="Interested"
            classes={{
              checked: classes.checked,
            }}
          />
          <a onClick={this.selectAction('1')}>{"Interested"}</a>
          <Radio
            checked={this.state.isChosen === '0'}
            onChange={this.selectAction('0')}
            value='0'
            name="no"
            label="Not Interested"
          />
          <a onClick={this.selectAction('0')}>{"Not Interested"}</a>
        </CardActions>
      </Card>
    );
  }
}
{/* <Checkbox
  checked={this.state.isChosen}
  disabled={!selectable && !this.state.isChosen}

  value="selected"
  color="primary"
/>
<p>{data.img}</p> */}
export default withStyles(styles)(Choice);
