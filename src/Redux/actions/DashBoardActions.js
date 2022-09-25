export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_FREEZE_DATA = 'SET_FREEZE_DATA';
export const SET_SELECTED_SOURCE = 'SET_SELECTED_SOURCE';
export const SET_SELECTED_ENV = 'SET_SELECTED_ENV';
export const SET_SELECTED_REDIRECT_URL = 'SET_SELECTED_REDIRECT_URL';
export const SET_NOTIFIER = 'SET_NOTIFIER'
export const CLEAR_NOTIFIER = 'CLEAR_NOTIFIER'
export const SET_DATA_FILTERS = 'SET_DATA_FILTERS'

// export function setAuthentication(authentication) {
//   return {
//     type: SET_AUTHENTICATION,
//     authentication
//   };
// }

export function setApplicationData(applicationData) {
  return {
    type: SET_APPLICATION_DATA,
    applicationData
  };
}

export function setFreezeData(freezeData) {
  return {
    type: SET_FREEZE_DATA,
    freezeData
  };
}

export function setSelectedSource(selectedSource) {
  return {
    type: SET_SELECTED_SOURCE,
    selectedSource
  };
}

export function setSelectedEnv(selectedEnv) {
  return {
    type: SET_SELECTED_ENV,
    selectedEnv
  };
}


export function setNotifier(level, duration, message) {
  return {
    type: SET_NOTIFIER , level, duration, message
  };
}

export function clearNotifier() {
  return{
    type: CLEAR_NOTIFIER
  };
}

export function setDataFilters(showGraph_One, showGraph_Two, showGithub, showIncidents, showAcsFreeze) {
  return {
    type: SET_DATA_FILTERS , showGraph_One, showGraph_Two, showGithub, showIncidents, showAcsFreeze
  };
}
