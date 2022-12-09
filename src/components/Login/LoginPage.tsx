import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
// @ts-ignore
import { createField, Input } from "../common/FormsControls/FormsControls.tsx";
// @ts-ignore
import { required } from "../../utils/validators/validators.ts";
// @ts-ignore
import { AppStateType } from "../../redux/redux-store.ts";
// @ts-ignore
import { login } from "../../redux/auth-reducer.ts";
import { Navigate } from "react-router-dom";
// @ts-ignore
import style from "./../common/FormsControls/FormsControls.module.css";
import { GetStringKeys } from "../common/FormsControls/FormsControls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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

export type LoginFormValuesType = {
   captcha: string;
   rememberMe: boolean;
   password: string;
   email: string;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

export const LoginPage: React.FC = () => {
   const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
   const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

   const dispatch = useDispatch();

   const onSubmit = (formData: any) => {
      dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
   };

   if (isAuth) {
      return <Navigate to={"/profile"} />;
   }

   return (
      <div>
         <h1>Login</h1>
         <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
      </div>
   );
};
