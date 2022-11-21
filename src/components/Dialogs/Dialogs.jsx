import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

import s from "./Dialogs.module.css";

const Dialogs = (props) => {
   let state = props.dialogsPage;

   let dialogsElements = state.dialogs.map((dialog, i) => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />);
   let messagesElements = state.messages.map((message, i) => <Message message={message.message} key={message.id} />);

   let addNewMessage = (values) => {
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
