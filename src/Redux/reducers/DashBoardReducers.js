import {
  SET_AUTHENTICATION,
  SET_APPLICATION_DATA,
  SET_FREEZE_DATA,
  SET_SELECTED_SOURCE,
  SET_SELECTED_ENV,
  SET_SELECTED_REDIRECT_URL,
  SET_NOTIFIER,
  CLEAR_NOTIFIER,
  SET_DATA_FILTERS

} from '../actions/DashBoardActions';

const initialState = {
  authentication: {},
  applicationData: [],
  freezeData: [],
  selectedSource: 'All',
  selectedEnv: 'prod',
  selectedRedirectUrl: 'https://idmsac.localhost/IDMSWebAuth/login?language=US-EN&appIdKey=e917593122c1c94928172547e27a877800f89457b3000a8fd722c85751af1876&rv=1',
  notifierMessage: 'Redux default message',
  notifierActive: 'false',
  notifierDuration: null,
  showGraph_One: true,
  showGraph_Two: true,
  showGithub: true,
  showIncidents: true,
  showAcsFreeze: true
};

export default function (state = initialState, action) {
  switch (action.type) {
      case SET_AUTHENTICATION:{
        return {
            ...state,
            authentication: action.authentication
        }
      }
      case SET_APPLICATION_DATA: {
        return {
            ...state,
            applicationData: action.applicationData
        }
      }
      case SET_FREEZE_DATA: {
        return {
            ...state,
            freezeData: action.freezeData
        }
      }
      case SET_SELECTED_SOURCE: {
        return {
          ...state,
          selectedSource: action.selectedSource
      }
      }
      case SET_SELECTED_ENV: {
        return {
          ...state,
          selectedEnv: action.selectedEnv
        }
      }
      case SET_SELECTED_REDIRECT_URL: {
        return {
          ...state,
          selectedRedirectUrl: action.selectedRedirectUrl
      }
      }
      case SET_NOTIFIER: {
        return {
          ...state,
          notifierActive: true,
          notifierDuration: action.duration,
          notifierLevel: action.level,
          notifierMessage: action.message
        }
      }
      case CLEAR_NOTIFIER: {
        return {
          ...state,
          notifierActive: false,
        }
      }
      case SET_DATA_FILTERS: {
        return {
          ...state,
          showGraph_One: action.showGraph_One,
          showGraph_Two: action.showGraph_Two,
          showGithub: action.showGithub,
          showIncidents: action.showIncidents,
          showAcsFreeze: action.showAcsFreeze
        }
      }
      default:
      return state;
  }
}
