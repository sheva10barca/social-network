import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import s from "./Dialogs.module.css";

const Dialogs = (props) => {
   let state = props.dialogsPage;

   let dialogsElements = state.dialogs.map((dialog, i) => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />);
   let messagesElements = state.messages.map((message, i) => <Message message={message.message} key={message.id} />);
   let newMessageBody = state.newMessageBody;

   let onSendMessageClick = () => {
      props.sendMessage();
   };

   let onNewMessageChange = (e) => {
      let body = e.target.value;
      props.updateNewMessageBody(body);
   };

   return (
      <div className={s.dialogs}>
         <div className={s.dialogsItems}>{dialogsElements}</div>
         <div className={s.messages}>
            <div>{messagesElements}</div>
            <div>
               <div>
                  <textarea value={newMessageBody} onChange={onNewMessageChange} placeholder="Enter your message"></textarea>
               </div>
               <div>
                  <button onClick={onSendMessageClick}>Send</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dialogs;
