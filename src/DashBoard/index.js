import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import clsx from 'clsx';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ReactTooltip from "react-tooltip";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Warning from '@material-ui/icons/Warning';
import WavesIcon from '@material-ui/icons/Waves';
import GitHubIcon from '@material-ui/icons/GitHub';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MenuIcon from '@material-ui/icons/Menu';
import SpaIcon from '@material-ui/icons/Spa';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import { Link, BrowserRouter, withRouter } from "react-router-dom";
// import Settings from './Components/Settings';
// import Graph_One from './Components/Graph_One';
// import All from './Components/All';
// import Graph_Two from './Components/Graph_Two';
// import Github from './Components/Github';
// import Incidents from './Components/Incidents';
// import Acsfreeze from './Components/AcsFreeze';
// import Splunk from './Components/Splunk';
// import Documentation from './Components/Documentation';
import Spinner from './Components/Spinner/Spinner';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
// import { submitLogout} from '../Services/Service';
import { clearNotifier } from '../Redux/actions/DashBoardActions';

const drawerWidth = 230;

function SideBar(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: "block"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    hide: {
      display: 'none',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(3) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
    content: {
      marginLeft: '55px',
      // marginTop: '64px'
    },
    contentOpen: {
      marginLeft: '230px',
      // marginTop: '64px'
    },
    toolbar: theme.mixins.toolbar,
    paper: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4
    },
    font: {
      fontSize: "20px"
    },
    fontItem : {
      fontSize: "15px"
    },
    title: {
      flexGrow: 1,
      // marginRight: '50%'
    },
    avatar: {
      backgroundImage: '',
      width: "30px",
      height: "30px",
      borderRadius: "15px",
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      backgroundPosition: "center",
      backgroundSize: "37px auto"
    },
    formControl:{
      marginRight: '20px',
    },
    select: {
      color: 'white',
    },
    icon: {
        color: 'white'
    },
    'dropdown-toggle::after': {
      position: 'absolute',
      top: '15px'
    }, 
  }));

  const history = useHistory();
  const [loggedOut, setLoggedOut] = useState(false);
  const [loading, setLoading] = useState(true);

  const [logout, setOpens] = useState(() => {
    if(props.location.pathname.includes('/logout')) {
      localStorage.setItem('ot_logged_in', 'no')
      document.cookie = 'jwtot=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      return false
    } else {
      return true
    }
  });

  const [selected, setSelected] = useState(() => {
    if(props.location.pathname.includes('/all')){
      return 'all'
    } else if(props.location.pathname.includes('/graph_one')){
      return 'graph_one'
    } else if(props.location.pathname.includes('/graph_two')){
      return 'graph_two'
    } else if(props.location.pathname.includes('/github')){
      return 'github'
    } else if(props.location.pathname.includes('/incidents')){
      return 'incidents'
    } else if(props.location.pathname.includes('/settings')){
      return 'settings'
    }else if(props.location.pathname.includes('/acsfreeze')){
      return 'acsfreeze'
    }else if(props.location.pathname.includes('/splunk')){
      return 'splunk'
    }else if(props.location.pathname.includes('/docs')){
      return 'docs'
    } else {
      return 'all'
    }
  });

  const toggle = async(logOut) => {
    // setLoggedOut(true)
    if(logOut === true){
      // const logout = await submitLogout();
      const logout = false;
      localStorage.setItem('ot_logged_in', 'no')
      document.cookie = 'jwtot=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      setOpens(!logout)
      history.push('/logout')
    } else if(logOut === false){
      if(localStorage.ot_logged_in === 'no'){
        localStorage.setItem('ot_logged_in', 'yes')
        window.location.href = props.selectedRedirectUrl;
      } else if(localStorage.ot_logged_in === 'yes') {
        // setOpens(!logout)
        history.push('/prod/all')
        setSelected('all')
        window.location.reload();
      }
    }
    setLoggedOut(false)
  };

  const classes = useStyles();

  const [env, setEnv] = useState(() => { return 'prod' });



  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const onClickHandler = async(e, selected) => {
    if (selected === 'all') {
        setSelected('all')
    } else if (selected === 'graph_one') {
      setSelected('graph_one')
    } else if (selected === 'graph_two') {
        setSelected('graph_two')
    } else if (selected === 'github') {
        setSelected('github')
    } else if (selected === 'incidents') {
        setSelected('incidents')
    } else if (selected === 'settings') {
        setSelected('settings')
    } else if (selected === 'docs') {
      setSelected('docs')
    } else if (selected === 'acsfreeze') {
      setSelected('acsfreeze')
    } else if (selected === 'splunk') {
      setSelected('splunk')
    } else {
        setSelected('all')
    }
    props.clearNotifier()
  }

  const handleEnvChange = (event) => {
    if(event.currentTarget.value === 'qa') {
      window.location.href = 'https://localhost';
    } else {
      props.history.push(`/${event.currentTarget.value}/`+selected);
      setEnv(event.currentTarget.value);
    }
  };

  const renderEnvName = (param) => {
    switch(param) {
     
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (<> { logout ?
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" 
              className={classes.appBar} >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            <a href='/prod/all'><span style={{color: 'white'}}>Gosling-Demo (Beta)</span></a>
          </Typography>
          <Link to='/docs' onClick={e => onClickHandler(e, 'docs')} style={{color: 'white', marginRight: '20px', fontSize: '15px', textDecoration: 'none'}}>Documentation</Link>
          <a href='url to api swagger docs'  target='_blank' rel="noopener noreferrer" style={{color: 'white', marginRight: '20px', fontSize: '15px', textDecoration: 'none'}}>API</a>
          <a href='mailto:keith@keipher.com' style={{color: 'white', marginRight: '20px', fontSize: '15px', textDecoration: 'none'}}>Contact Us</a>
          <div className={classes.avatar}> </div>
          <DropdownItems>
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle tag="a" className="nav-link" caret style={{fontSize: '15px', cursor: 'pointer', color: 'white'}}>
                {props.authentication.firstName}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem style={{textDecoration: 'none', background: '#f5f4f4', color: 'black', cursor: 'pointer'}} onClick={() => toggle(true)} >Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </DropdownItems>
        </Toolbar>
      </AppBar>
      <BrowserRouter >
      <Drawer
        // className={classes.drawer}
        variant="permanent"
        className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
        classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
      >
        <div className={classes.toolbar} />

        <List>
          <ListItem key="platform">
            <ListItemText
              primary="Platform"
              className={clsx(classes.font, {[ classes.hide]: !open})}
              // className={classes.font}
              disableTypography
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              style={{fontSize:'12px', backgroundColor:'white'}}
              className={clsx(classes.menuButton, {
                // [classes.hide]: open,
              })}
            >
              { open ? <ArrowBackIosIcon disableFocusRipple={true} disableRipple={true} style={{fontSize:'16px', boxShadow: 'none', backgroundColor:'white'}} /> : <ArrowForwardIosIcon style={{fontSize:'16px', boxShadow: 'none', backgroundColor:'white'}} /> }
          </IconButton>
          </ListItem>
          <ListItem
            button
            key='all'
            onClick={e => onClickHandler(e, 'all')}
            selected={selected === 'all' ? true : false}
            component={Link}
            to={'/'+env+'/all'}
          >
            <ListItemIcon style={{minWidth:'48px'}}>
            <AllInclusiveIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              primary={'All'}
              disableTypography
            />
          </ListItem>
          <ListItem
            button
            key='graph_one'
            onClick={e => onClickHandler(e, 'graph_one')}
            selected={selected === 'graph_one' ? true : false}
            component={Link}
            to={'/'+env+'/graph_one'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <WavesIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              primary={'Graph_One'}
              disableTypography/>
          </ListItem>
          <ListItem
            button
            key='graph_two'
            onClick={e => onClickHandler(e, 'graph_two')}
            selected={selected === 'graph_two' ? true : false}
            component={Link}
            to={'/'+env+'/graph_two'}
          >
            <ListItemIcon style={{minWidth:'48px'}}>
            <HomeWorkIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              primary={'Graph_Two'}
              disableTypography/>
          </ListItem>
          <ListItem
            button
            key='github'
            onClick={e => onClickHandler(e, 'github')}
            selected={selected === 'github' ? true : false}
            component={Link}
            to={'/'+env+'/github'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <GitHubIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              primary={'Github'}
              disableTypography/>
          </ListItem>
          <ListItem
            button
            key='incidents'
            onClick={e => onClickHandler(e, 'incidents')}
            selected={selected === 'incidents' ? true : false}
            component={Link}
            to={'/'+env+'/incidents'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <Warning style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              style={{minWidth:'130px'}}
              className={classes.fontItem}
              primary={'Incidents (Inkblot)'}
              disableTypography/>
          </ListItem>
          <ListItem
            button
            key='acsfreeze'
            onClick={e => onClickHandler(e, 'acsfreeze')}
            selected={selected === 'acsfreeze' ? true : false}
            component={Link}
            to={'/'+env+'/acsfreeze'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <AcUnitIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              style={{minWidth:'130px'}}
              className={classes.fontItem, classes.primary}
              primary={ 'ACS Prod Freeze'}
              disableTypography/>
          </ListItem>
          <ListItem
            button
            key='splunk'
            onClick={e => onClickHandler(e, 'splunk')}
            selected={selected === 'splunk' ? true : false}
            component={Link}
            style={{maxHeight:'47px'}}
            to={'/'+env+'/splunk'}
            >
            <ListItemIcon>
            <SpaIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              style={{minWidth:'130px'}}
              primary={'Users Impacted (Splunk)'}
              disableTypography/>
          </ListItem>
          <ListItem
            style={{borderTop: 'solid thin #adacac'}}
            button
            key='settings'
            onClick={e => onClickHandler(e, 'settings')}
            selected={selected === 'settings' ? true : false}
            component={Link}
            to={'/'+env+'/settings'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <SettingsIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              primary={'Settings'}
              disableTypography/>
          </ListItem>
        </List>
      </Drawer>
        <main className={clsx({
                [classes.contentOpen]: open,
                [classes.content]: !open,
            })}>
            <div className={classes.toolbar} ></div>
            {/* { Object.keys(props.authentication).length === 0 ? <Spinner /> : */}
            { false ? <Spinner /> :

            <>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontSize:'3.38rem'}}>
            {(() => {
                      switch(selected) {
                        // case 'all':
                        //   return <All selectedSource={selected} selectedEnv={env} key={env}/>
                        case 'graph_one':
                          return <WavesIcon  selectedSource={selected} selectedEnv={env} key={env} />
                        case 'graph_two':
                          return <HomeWorkIcon style={{fontSize:'1.38rem'}} selectedSource={selected} selectedEnv={env} key={env} />
                        case 'github':
                          return <GitHubIcon style={{fontSize:'1.38rem'}} selectedSource={selected} selectedEnv={env} key={env} />
                        // case 'incidents':
                        //   return <Incidents selectedSource={selected} selectedEnv={env} key={env} />
                        // case 'acsfreeze':
                        // return <Acsfreeze selectedSource={selected} selectedEnv={env} key={env} />
                        // case 'splunk':
                        // return <Splunk selectedSource={selected} selectedEnv={env} key={env} />
                        // case 'settings':
                        //   return <Settings selectedEnv={env} />
                        // case 'docs':
                        //   return <Documentation />
                        // default:
                        //   return <WavesIcon style={{fontSize:'1.38rem'}}/>
                      }
                      
            })()}
            </div>
            </>}
        </main>
      </BrowserRouter>
      </div> :  <BrowserRouter >
                {loggedOut ? <Spinner /> :
                  <div style={{height: '1200px', background: '#e8e8e8'}}>
                    <div style={{height: '70px', background: '#3f51b5',  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'}}> <h4 style={{padding: '20px', color: 'white'}}>Gosling-Demo (Beta)</h4></div>
                      <div style={{border: 'solid thin white',width: '400px', background: 'white', marginTop: '10%', marginLeft: '40%', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
                      <div style={{padding: '30px'}}>
                        <h4 style={{color: 'rgb(97, 92, 92)'}}>Logged Out</h4>
                        <h6 style={{color: '#737070'}}>You are now logged out of Gosling-Demo.</h6>
                        <br />
                        <button onClick={() => toggle(false)} style={{color: 'white', backgroundColor: '#3e51b5', borderRadius: '4px', fontSize: '15px'}}>Login</button>
                      </div>
                    </div>
                  </div>
                  }
                </BrowserRouter>
    }
  </>);
}

const DropdownItems = styled.div`
.dropdown-toggle::after{
  position: absolute;
  top: 17px;
  right: 1px;
}
`;
const mapDispatchToProps = (dispatch) => ({
  clearNotifier: () => dispatch(clearNotifier())
});
const mapStateToProps = (state, ownProps) => {
  return {
    // authentication: state.omnitracker.authentication,
    selectedRedirectUrl: state.omnitracker.selectedRedirectUrl
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(SideBar));
