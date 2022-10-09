import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import clsx from 'clsx';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
// import ReactTooltip from "react-tooltip";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import WavesIcon from '@material-ui/icons/Waves';
// import GitHubIcon from '@material-ui/icons/GitHub';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SpaIcon from '@material-ui/icons/Spa';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import { Link, BrowserRouter, withRouter } from "react-router-dom";
import Spinner from './Components/Spinner/Spinner';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
// import { submitLogout} from '../Services/Service';
import { clearNotifier } from '../Redux/actions/DashBoardActions';
import GosCircosDemo from './Components/gosling/GosCircosDemo';  

// import { GoslingComponent } from "gosling.js";


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
  // const [loading, setLoading] = useState(true);

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
    if(props.location.pathname.includes('/graph_one')){
      return 'graph_one'
    } else if(props.location.pathname.includes('/graph_two')){
      return 'graph_two'
    } else if(props.location.pathname.includes('/graph_three')){
      return 'graph_three'
    } else if(props.location.pathname.includes('/gos_circos_demm')){
      return 'gos_circos_demm'
    } else {
      return 'graph_one'
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

  // const [env, setEnv] = useState(() => { return 'prod' });



  const [open, setOpen] = useState(true);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

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
    } else if (selected === 'graph_three') {
        setSelected('graph_three')
    } else if (selected === 'gos_circos_demm') {
        setSelected('gos_circos_demm')
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

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const mySpec  = {
  //   "tracks": [{
  //     "data": {
  //       "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
  //       "type": "multivec",
  //       "row": "sample",
  //       "column": "position",
  //       "value": "peak",
  //       "categories": ["sample 1"]
  //     },
  //     "mark": "rect",
  //     "x": { "field": "position", "type": "genomic" },
  //     "color": { "field": "peak", "type": "quantitative", "legend": true },
  //     "width": 600,
  //     "height": 130
  //   }]
  // }

  const listItemClasses = 'classes.fontItem, classes.primary'


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
              { open ? <ArrowBackIosIcon  style={{fontSize:'16px', boxShadow: 'none', backgroundColor:'white'}} /> : <ArrowForwardIosIcon style={{fontSize:'16px', boxShadow: 'none', backgroundColor:'white'}} /> }
          </IconButton>
          </ListItem>
          <ListItem
            button
            key='graph_one'
            onClick={e => onClickHandler(e, 'graph_one')}
            selected={selected === 'graph_one' ? true : false}
            component={Link}
            to={'/graph_one'}
          >
            <ListItemIcon style={{minWidth:'48px'}}>
            <AllInclusiveIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              primary={'Graph_One'}
              disableTypography
            />
          </ListItem>

          <ListItem
            button
            key='graph_two'
            onClick={e => onClickHandler(e, 'graph_two')}
            selected={selected === 'graph_two' ? true : false}
            component={Link}
            to={'/graph_two'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <AcUnitIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              style={{minWidth:'130px'}}
              className={listItemClasses}
              primary={ 'Graph_Two'}
              disableTypography/>
          </ListItem>
          <ListItem
            button
            key='graph_three'
            onClick={e => onClickHandler(e, 'graph_three')}
            selected={selected === 'graph_two' ? true : false}
            component={Link}
            style={{maxHeight:'47px'}}
            to={'/graph_three'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <SpaIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              style={{minWidth:'130px'}}
              primary={'Graph_Three'}
              disableTypography/>
          </ListItem>
          <ListItem
            button
            key='gos_circos_demm'
            onClick={e => onClickHandler(e, 'gos_circos_demm')}
            selected={selected === 'gos_circos_demm' ? true : false}
            component={Link}
            to={'/gos_circos_demm'}
            >
            <ListItemIcon style={{minWidth:'48px'}}>
            <WavesIcon style={{fontSize:'1.38rem'}}/>
            </ListItemIcon>
            <ListItemText
              className={classes.fontItem}
              primary={'Gosling Circos'}
              disableTypography/>
          </ListItem>
          <ListItem
            style={{borderTop: 'solid thin #adacac'}}
            button
            key='settings'
            onClick={e => onClickHandler(e, 'settings')}
            selected={selected === 'settings' ? true : false}
            component={Link}
            to={'/settings'}
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
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontSize:'2.38rem'}}>
            {(() => { 
                      return(
                     () => { switch(selected) {
                        case 'graph_one':
                          return( <div style={{width:'100%', height:'600px', display: 'flex', alignItems:'center', justifyContent:'center'}}> <AllInclusiveIcon style={{fontSize:'1.38rem'}} /></div>);
                        case 'graph_two':
                          return(<div style={{width:'100%', height:'600px', display: 'flex', alignItems:'center', justifyContent:'center'}}> <AcUnitIcon  style={{fontSize:'1.38rem'}} /></div> );
                        case 'graph_three':
                          return( <div style={{width:'100%', height:'600px', display: 'flex', alignItems:'center', justifyContent:'center'}}><SpaIcon style={{fontSize:'1.38rem'}}  /></div>);
                        case 'gos_circos_demm':
                          return( <div style={{width:'100%', height:'600px', display: 'flex', alignItems:'center', justifyContent:'center'}}><GosCircosDemo /></div>);  
                        default:
                          return                  
                      }}
                      )()                      
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
