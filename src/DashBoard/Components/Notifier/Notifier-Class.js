import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { clearNotifier } from '../../../Redux/actions/DashBoardActions';
// import { ClickAwayListener } from '@material-ui/core';

// to implment .....
//
// this.props.setNotifier(level, duration, message)}
// null = perm duration until clicked
// this.props.setNotifier('error', null, 'Error From Redux!!!!')}
//

class Notifier extends React.Component {
  message = ''

  state = {
    notifierActive: false,
    notifierDuration: null,
    notifierLevel: 'info',
    notifierMessage: 'message set in state'
  }

  handleClose = (source) => {
    if (source !== 'clicked') {
      return;
    }
    this.setState({ notifierActive: false });
    this.props.clearNotifier()
  }

  onClickAway(){
    this.setState({ notifierActive: true })
  }

  componentDidUpdate = (nextProps) => {
    if(nextProps.notifierActive !== this.props.notifierActive  ){
     this.setState({notifierActive: nextProps.notifierActive, 
                   notifierDuration: nextProps.notifierDuration, 
                   notifierLevel: nextProps.notifierLevel, 
                   notifierMessage: nextProps.notifierMessage})
   }
 }

  render() {
    return (
      <div>
      {/* <ClickAwayListener onClickAway={() => {this.onClickAway()}} > */}
        <Snackbar style={{width: '300px',margin: '104px -10px 0 0 '}}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={this.state.notifierDuration}
          onClose={() => this.handleClose()}
          open={this.state.notifierActive}
        >
          <Alert style={{ padding: '3px 20px 3px 14px', fontSize: '12px'}}  onClose={() => this.handleClose()} onClick={() => this.handleClose('clicked')}  severity={this.state.notifierLevel}>
            {this.state.notifierMessage}
          </Alert>
        </Snackbar>
        {/* </ClickAwayListener> */}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearNotifier: (message) => dispatch(clearNotifier())
});

const mapStateToProps = (state, ownProps) => {
  return {
    notifierActive: state.omnitracker.notifierActive,
    notifierDuration: state.omnitracker.notifierDuration,
    notifierLevel: state.omnitracker.notifierLevel,
    notifierMessage: state.omnitracker.notifierMessage
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Notifier);
