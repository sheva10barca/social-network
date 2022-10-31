const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_NEW_MESSAGE_BODY:
         state.newMessageBody = action.body;
         return state;
      case SEND_MESSAGE:
         let body = state.newMessageBody;
         state.newMessageBody = "";
         state.messages.push({ id: 5, message: body });
         return state;
      default:
         return state;
   }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => {
   return { type: UPDATE_NEW_MESSAGE_BODY, body: body };
};

export default dialogsReducer;
