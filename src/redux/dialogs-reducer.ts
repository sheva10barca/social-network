const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
   id: number;
   name: string;
};

type MessageType = {
   id: number;
   message: string;
};

let initialState = {
   dialogs: [
      { id: 1, name: "Messi" },
      { id: 2, name: "Xavi" },
      { id: 3, name: "Iniesta" },
      { id: 4, name: "Suarez" },
      { id: 5, name: "Busquets" },
      { id: 6, name: "Puyol" },
      { id: 7, name: "Valdes" },
   ] as Array<DialogType>,
   messages: [
      { id: 1, message: "Hola" },
      { id: 2, message: "Como estas??" },
      { id: 3, message: "Buenos noches" },
      { id: 4, message: "Vamos" },
   ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type SendMessageCreatorActionType = {
   type: typeof SEND_MESSAGE;
   newMessageBody: string;
};

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;
