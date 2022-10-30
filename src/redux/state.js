import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
   _state: {
      profilePage: {
         posts: [
            { id: 1, message: "Hi, how are you?", likesCount: 10 },
            { id: 2, message: "It's my first post", likesCount: 33 },
         ],
         newPostText: "blablabla",
      },

      dialogsPage: {
         dialogs: [
            { id: 1, name: "Messi" },
            { id: 2, name: "Xavi" },
            { id: 3, name: "Iniesta" },
            { id: 4, name: "Suarez" },
            { id: 5, name: "Busquets" },
            { id: 6, name: "Puyol" },
            { id: 7, name: "Valdes" },
         ],
         messages: [
            { id: 1, message: "Hola" },
            { id: 2, message: "Como estas??" },
            { id: 3, message: "Buenos noches" },
            { id: 4, message: "Vamos" },
         ],
         newMessageBody: "",
      },
      sidebar: {},
   },
   _callSubscriber() {
      console.log("state changed");
   },

   getState() {
      return this._state;
   },
   subscribe(observer) {
      this._callSubscriber = observer;
   },

   dispatch(action) {
      this._state.profilePage = profileReducer(this._state.profilePage, action);
      this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
      this._state.sidebar = sidebarReducer(this._state.sidebar, action);

      this._callSubscriber(this._state);
   },
};

export default store;
