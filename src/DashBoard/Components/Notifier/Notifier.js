import Snackbar from '@material-ui/core/Snackbar';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { clearNotifier } from '../../../Redux/actions/DashBoardActions';
import { ClickAwayListener } from '@material-ui/core';

// to implment .....
//
// this.props.setNotifier(level, duration, message)}
// null = perm duration until clicked
// this.props.setNotifier('error', null, 'Error From Redux!!!!')}
//

const Notifier = () => {
  const message = '';

  const [notifierActive, setNotifierActive] = useState(false);
  const [notifierDuration, setNotifierDuration] = useState(null);
  const [notifierLevel, setNotifierLevel] = useState('info');
  const [notifierMessage, setNotifierMessage] = useState('message set in default state' );

  const handleClose = (source) => {
    if (source !== 'clicked') {
      return;
    }
    setNotifierActive(false);
    clearNotifier();
  };

  const onClickAway = () => {
    setNotifierActive(true);
  };


  return (
    <div>

      <ClickAwayListener
        onClickAway={() => {
          this.onClickAway();
        }}
      >
        <Snackbar
          style={{ width: '300px', margin: '104px -10px 0 0 ' }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={notifierDuration}
          onClose={() => handleClose()}
          open={notifierActive}
        >
          <Alert
            style={{ padding: '3px 20px 3px 14px', fontSize: '12px' }}
            onClose={() => handleClose()}
            onClick={() => handleClose('clicked')}
            severity={notifierLevel}
          >
            {notifierMessage}
          </Alert>
        </Snackbar>
      </ClickAwayListener>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   clearNotifier: (message) => dispatch(clearNotifier())
// });

// const mapStateToProps = (state, ownProps) => {
//   return {
//     notifierActive: state.omnitracker.notifierActive,
//     notifierDuration: state.omnitracker.notifierDuration,
//     notifierLevel: state.omnitracker.notifierLevel,
//     notifierMessage: state.omnitracker.notifierMessage
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps)(Notifier);

export default Notifier;
