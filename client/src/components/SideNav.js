import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import BookIcon from '@material-ui/icons/Book';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '95%',
    padding: 20
  },
  textField: {

    width: '100%'
  },
  dense: {
    marginTop: 19
  },
  button: {
    width: '100%'
  }
});


const SideNav = (props) => {
  const {classes} = props;
  return (
    <div>
      <Typography align="center" variant="h2" color="textPrimary">
        Google<br/>Book<br/>Search
      </Typography>
      <Divider/>

      <List>
        <Link to={`/search`}>
          <ListItem
            selected={props.activePage === "Search"
            ? true
            : false}
            button>
            <ListItemIcon>
              <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary={"Search"}/>
          </ListItem>
        </Link>
        <Link to={`/saved`}>
          <ListItem
            selected={props.activePage === "Saved"
            ? true
            : false}
            button>
            <ListItemIcon>
              <BookIcon/>
            </ListItemIcon>
            <ListItemText primary={"Saved Books"}/>
          </ListItem>
        </Link>

      </List>
      <Divider/>
      <div className={classes.container}>
        <form noValidate autoComplete="off" style={{
          width: '100%'
        }} onSubmit={props.handleFormSubmit}>
          <TextField
            id="standard-name"
            label="Book Name"
            className={classes.textField}
            value={props.bookQuery}
            onChange={props.handleInputChange}
            margin="normal"
            name="bookQuery"/>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            color="primary"
            className={classes.button}
            onClick={props.handleFormSubmit}
           >
            Search For Books
          </Button>
        </form>
      </div>
    </div>
  )
}

export default withStyles(styles)(SideNav);