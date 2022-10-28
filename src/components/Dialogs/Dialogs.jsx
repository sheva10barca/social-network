import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import s from "./Dialogs.module.css";

const Dialogs = (props) => {
   let dialogsElements = props.state.dialogs.map((dialog) => (
      <DialogItem name={dialog.name} id={dialog.id} />
   ));
   let messagesElements = props.state.messages.map((message) => (
      <Message message={message.message} />
   ));

   let newMsg = React.createRef();

   let addMsg = () => {
      let msg = newMsg.current.value;
      alert(msg)
   }

   return (
      <div className={s.dialogs}>
         <div className={s.dialogsItems}>{dialogsElements}</div>
         <div className={s.messages}>{messagesElements}</div>
         <div>
            <textarea ref={newMsg}></textarea>
         </div>
         <div>
            <button onClick={addMsg}>add</button>
         </div>
      </div>
   );
};

export default Dialogs;
