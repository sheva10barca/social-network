import React from "react";
// @ts-ignore
import DialogItem from "./DialogItem/DialogItem.tsx";
// @ts-ignore
import Message from "./Message/Message.tsx";
// @ts-ignore
import AddMessageForm from "./AddMessageForm/AddMessageForm.tsx";
import { InitialStateType } from "../../redux/dialogs-reducer";
// @ts-ignore
import s from "./Dialogs.module.css";

type PropsType = {
   dialogsPage: InitialStateType;
   sendMessage: (messageText: string) => void;
};

export type NewMessageFormValuesType = {
   newMessageBody: string;
};

const Dialogs: React.FC<PropsType> = (props) => {
   let state = props.dialogsPage;

   let dialogsElements = state.dialogs.map((dialog, i) => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />);
   let messagesElements = state.messages.map((message, i) => <Message message={message.message} key={message.id} />);

   let addNewMessage = (values: { newMessageBody: string }) => {
      props.sendMessage(values.newMessageBody);
   };

   return (
      <div className={s.dialogs}>
         <div className={s.dialogsItems}>{dialogsElements}</div>
         <div className={s.messages}>
            <div>{messagesElements}</div>
         </div>
         <AddMessageForm onSubmit={addNewMessage} />
      </div>
   );
};

export default Dialogs;
