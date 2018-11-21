import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import Saved from './components/Saved';
import SideNav from './components/SideNav';

import API from './utils/API';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import 'typeface-roboto';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class App extends Component {
  state = {
    mobileOpen: false,
    bookQuery: "",
    bookList: [],
    activePageHeader: "Search For Books",
    activePage: "Search"
  };

  searchGoogleBooks = (query) => {
    API.searchGoogleBooks(query)
      .then(({ data }) => {
        console.log(data.items);
        const bookList = data.items.map(book => {
          return {
            bookId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || "Alex Rosenkranz",
            description: book.searchInfo.textSnippet,
            link: book.volumeInfo.infoLink,
            image: book.volumeInfo.imageLinks.thumbnail
          }
        })
        this.setState({ bookList }, () => this.handlePageChange("Search"))
      })
      .catch(err => console.log(err));
  }

  handlePageChange = (pageTitle) => {
    const activePageHeader = (pageTitle === "Search" ? "Search For Books" : "View Saved Books");
    this.setState({activePageHeader, activePage: pageTitle})
  }

  handleDrawerToggle = () => {
    this.setState(state => ({
      mobileOpen: !state.mobileOpen
    }));
  };
  

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.bookQuery) {
      this.searchGoogleBooks(this.state.bookQuery);
    }
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  saveBook = (id) => {
    const book = this.state.bookList.find(book => book.bookId === id);

    API.saveBook(book)
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const {classes, theme} = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline/>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}>
                <MenuIcon/>
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                {this.state.activePageHeader}
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl'
                ? 'right'
                : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper
              }}
                ModalProps={{
                keepMounted: true, 
              }}>
                <SideNav activePage={this.state.activePage} handleInputChange={this.handleInputChange} bookQuery={this.state.bookQuery}/>
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                paper: classes.drawerPaper
              }}
                variant="permanent"
                open>
      
                <SideNav activePage={this.state.activePage} handleInputChange={this.handleInputChange} bookQuery={this.state.bookQuery} handleFormSubmit={this.handleFormSubmit}/>
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Switch>
              <Route 
                exact 
                path="/" 
                render={() => <Search
                  handlePageChange={this.handlePageChange}
                  bookList={this.state.bookList}
                  saveBook={this.saveBook} 
                  activePage={this.activePage}/>
                }
                />
              <Route 
                exact 
                path="/search" 
                render={() => <Search 
                  handlePageChange={this.handlePageChange} 
                  bookList={this.state.bookList} 
                  saveBook={this.saveBook}
                  activePage={this.activePage}/>
                }
                />
              <Route 
                exact 
                path="/saved" 
                render={() => <Saved 
                  handlePageChange={this.handlePageChange} 
                  activePage={this.activePage}/> }
              />
              <Route render={() => <Search
                activePage={this.activePage}
                handlePageChange={this.handlePageChange}
                bookList={this.state.bookList}
                saveBook={this.saveBook} />}
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);
