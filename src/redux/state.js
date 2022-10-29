const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

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
         messages: [
            { id: 1, message: "Hola" },
            { id: 2, message: "Como estas??" },
            { id: 3, message: "Buenos noches" },
            { id: 4, message: "Vamos" },
         ],
         dialogs: [
            { id: 1, name: "Messi" },
            { id: 2, name: "Xavi" },
            { id: 3, name: "Iniesta" },
            { id: 4, name: "Suarez" },
            { id: 5, name: "Busquets" },
            { id: 6, name: "Puyol" },
            { id: 7, name: "Valdes" },
         ],
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
      if (action.type === ADD_POST) {
         let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0,
         };
         this._state.profilePage.posts.push(newPost);
         this._state.profilePage.newPostText = "";
         this._callSubscriber(this._state);
      } else if (action.type === UPDATE_NEW_POST_TEXT) {
         this._state.profilePage.newPostText = action.newText;
         this._callSubscriber(this._state);
      }
   },
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => {
   return { type: UPDATE_NEW_POST_TEXT, newText: text };
};

export default store;
