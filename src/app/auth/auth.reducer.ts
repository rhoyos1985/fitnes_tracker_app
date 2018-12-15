import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
  isAuthentication: boolean;
}

const initialState: State = {
  isAuthentication: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthentication: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthentication: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuthentication = (state: State) => state.isAuthentication;
