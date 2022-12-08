import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
// @ts-ignore
import { createField, Input } from "../common/FormsControls/FormsControls.tsx";
// @ts-ignore
import { required } from "../../utils/validators/validators.ts";
import { connect } from "react-redux";
// @ts-ignore
import { AppStateType } from "../../redux/redux-store.ts";
// @ts-ignore
import { login } from "../../redux/auth-reducer.ts";
import { Navigate } from "react-router-dom";
// @ts-ignore
import style from "./../common/FormsControls/FormsControls.module.css";
import { GetStringKeys } from "../common/FormsControls/FormsControls";

type LoginFormOwnProps = {
   captchaUrl: string | null;
};

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
   handleSubmit,
   error,
   captchaUrl,
}) => {
   return (
      <form onSubmit={handleSubmit}>
         {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
         {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
         {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

         {captchaUrl && <img src={captchaUrl} alt="#" />}
         {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

         {error && <div className={style.formSummaryError}>{error}</div>}
         <div>
            <button>Log in</button>
         </div>
      </form>
   );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "login" })(LoginForm);

type MapStateProptType = {
   captchaUrl: string | null;
   isAuth: boolean;
};

type MapDispatchPropsType = {
   login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

export type LoginFormValuesType = {
   captcha: string;
   rememberMe: boolean;
   password: string;
   email: string;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: React.FC<MapStateProptType & MapDispatchPropsType> = (props) => {
   const onSubmit = (formData: any) => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
   };

   if (props.isAuth) {
      return <Navigate to={"/profile"} />;
   }

   return (
      <div>
         <h1>Login</h1>
         <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      </div>
   );
};

const mapStateToProps = (state: AppStateType): MapStateProptType => ({
   captchaUrl: state.auth.captchaUrl,
   isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
