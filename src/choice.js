import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 480,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 8,
    marginBottom: 8
  },
  media: {
    height: 200
  }
};

class Choice extends Component {
  constructor(props) {
    super();
    this.state = { isChosen: false };
  }

  selectAction() {
    // console.log("clicked choice");
    //onChange={this.selectAction.bind(this)}

    if (this.props.selectable || this.state.isChosen) {
      this.props.onClick();
      this.setState(prevState => {
        return { isChosen: !prevState.isChosen };
      });
    }
  }

  render() {
    const { classes, selectable, data, isMedia } = this.props;
    return (
      <Card raised={this.state.isChosen} className={classes.card} onClick={this.selectAction.bind(this)}>
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
          <Checkbox
            checked={this.state.isChosen}
            disabled={!selectable && !this.state.isChosen}
            value="selected"
            color="primary"
          />
          <p>{data.img}</p>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Choice);
