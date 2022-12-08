import React from "react";
// @ts-ignore
import { actions } from "../../redux/dialogs-reducer.ts";
// @ts-ignore
import Dialogs from "./Dialogs.tsx";
import { connect } from "react-redux";
// @ts-ignore
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
   return {
      dialogsPage: state.dialogsPage,
   };
};

export default compose<React.ComponentType>(connect(mapStateToProps, { ...actions }), withAuthRedirect)(Dialogs);
