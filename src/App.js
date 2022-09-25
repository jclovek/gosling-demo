import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import SideBar from './DashBoard/index';
import Spinner from './DashBoard/Components/Spinner/Spinner';
import Notifier from './DashBoard/Components/Notifier/Notifier';
import { Provider } from 'react-redux';
import Store from './Store';

// const redirectAuth = 'https://idmsac.localhost/IDMSWebAuth/login?language=US-EN&appIdKey=e917593122c1c94928172547e27a877800f89457b3000a8fd722c85751af1876&rv=2';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loaded: true,
      isFull: false,
      applicationData: [],
      podsData: [],
      authentication: {},
      unauthorized: false,
    };
  }

  getAuthenticationdata = async() => {
    const result = 1;
    localStorage.setItem('ot_logged_in', 'yes')
    document.cookie = 'jwtot=' + result.jwt + '; path=/';
    this.setState({authentication: result, unauthorized: false});
    // this.props.setAuthentication(result);
    this.setState({loaded: true});
    
  }

  componentDidMount = async() => {
    await this.getAuthenticationdata();
  }

  snackbarRef = React.createRef();

  render() {
    return (
      <Provider store={Store} >
      <div>
        <Notifier ref = {this.snackbarRef} />
        <BrowserRouter >
          { this.state.loaded ?
            <>
              { this.state.unauthorized ?
                <div style={{height: '1200px', background: '#e8e8e8'}}>
                  <div style={{height: '70px', background: '#3f51b5',  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'}}> <h4 style={{padding: '20px', color: 'white'}}>Gosling-Demo (Beta)</h4></div>
                  <div style={{border: 'solid thin white',width: '400px', background: 'white', marginTop: '10%', marginLeft: '40%', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
                  <div style={{padding: '30px'}}>
                  <h4 style={{color: 'rgb(97, 92, 92)'}}>Unauthorized</h4>
                    <h6 style={{color: '#737070'}}>You are not authorized to view this application contents.</h6>
                    </div>
                  </div>
                </div> : <Switch>
                            <Route exact path="/" render={() => (
                                <Redirect to={'/prod/all'} />
                              )} />
                            <Route exact path={'/carry'} render={() => (
                              <Redirect to={'/carry/all'}/>
                            )}/>
                            <Route exact path={'/icloud1'} render={() => (
                              <Redirect to={'/icloud1/all'}/>
                            )}/>
                            <Route exact path={'/icloud2'} render={() => (
                              <Redirect to={'/icloud2/all'}/>
                            )}/>
                            <Route exact path={'/icloud3'} render={() => (
                              <Redirect to={'/icloud3/all'}/>
                            )}/>
                            <Route exact path={'/icperf'} render={() => (
                              <Redirect to={'/icperf/all'}/>
                            )}/>
                            <SideBar authentication={this.state.authentication} />
                          </Switch>
              }
            </> : <Spinner />
          }
        </BrowserRouter>
        </div>
    </Provider>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   setAuthentication: (authentication) => dispatch(setAuthentication(authentication)),
// });
// const mapStateToProps = (state, ownProps) => {
//   return {
//     authentication: state.omnitracker.authentication,
//     selectedRedirectUrl: state.omnitracker.selectedRedirectUrl
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps)(App);

export default App;
