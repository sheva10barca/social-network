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
};

const dialogsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SEND_MESSAGE:
         let body = action.newMessageBody;
         return {
            ...state,
            messages: [...state.messages, { id: 6, message: body }],
         };
      default:
         return state;
   }
};

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;
