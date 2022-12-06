import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
// @ts-ignore
import profileReducer from "./profile-reducer.ts";
// @ts-ignore
import dialogsReducer from "./dialogs-reducer.ts";
// @ts-ignore
import sidebarReducer from "./sidebar-reducer.ts";
// @ts-ignore
import usersReducer from "./users-reducer.ts";
// @ts-ignore
import authReducer from "./auth-reducer.ts";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
// @ts-ignore
import appReducer from "./app-reducer.ts";

let rootReducer = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   sidebar: sidebarReducer,
   usersPage: usersReducer,
   auth: authReducer,
   form: formReducer,
   app: appReducer,
});

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;

export default store;
