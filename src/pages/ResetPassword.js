import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import useFormField from "../hooks/useFormField";
import {
  EmailValidator,
  NonEmptyValidator,
} from "../utils/ValidatorRule/Validator";
import strings from "../i18n/definitions";
import PreferencesPage from "./_pages_shared/PreferencesPage";
import Header from "./_pages_shared/Header";
import Heading from "./_pages_shared/Heading.sc";
import Main from "./_pages_shared/Main.sc";
import Footer from "./_pages_shared/Footer.sc";

import ResetPasswordStep1 from "./ResetPasswordStep1";
import ResetPasswordStep2 from "./ResetPasswordStep2";

import { setTitle } from "../assorted/setTitle";

export default function ResetPassword() {
  const [email, setEmail, validateEmail, isEmailValid, emailErrorMsg] =
    useFormField("", [
      NonEmptyValidator("Please provide an email."),
      EmailValidator,
    ]);
  const [codeSent, setCodeSent] = useState(false);

  function emailSent() {
    setCodeSent(true);
  }

  useEffect(() => {
    setTitle(strings.resetPassword);
  }, []);

  return (
    <PreferencesPage pageWidth={"narrow"}>
      <Header>
        <Heading>Reset Password</Heading>
      </Header>
      <Main>
        {!codeSent && (
          <ResetPasswordStep1
            email={email}
            setEmail={setEmail}
            validateEmail={validateEmail}
            isEmailValid={isEmailValid}
            emailErrorMsg={emailErrorMsg}
            notifyEmailSent={emailSent}
          />
        )}

        {codeSent && <ResetPasswordStep2 email={email} />}
      </Main>
      <Footer>
        <p className="centered">
          {strings.rememberPassword + " "}
          <Link className="bold underlined-link" to="/log_in">
            {strings.login}
          </Link>
        </p>
      </Footer>
    </PreferencesPage>
  );
}
