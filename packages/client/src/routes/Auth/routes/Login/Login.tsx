import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import TextFieldset from "../../../../molecules/TextFieldset";
import { useAuthentication } from "../../../../state/authentication";
import { LoginBody, UserFields } from "../../../../state/authentication/mockApi/types";
import { wait } from "../../../../util/wait";
import forgotMeta from "../ForgotPassword/meta";
import registerMeta from "../Register/meta";
import routeMeta from "./meta";

export type FormValues = LoginBody;

const Component: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: authState, login } = useAuthentication();
  const { handleSubmit, register: registerField, errors, setError } = useForm<FormValues>();
  const qs = new URLSearchParams(location.search);
  let from = qs.get("from");
  if (from === "undefined") from = null;

  const onSubmit = React.useCallback(
    async (values: FormValues) => {
      const res = await login(values);
      if (res.errors)
        Object.entries(res.errors).forEach(([field, message]) =>
          setError(field as keyof FormValues, { type: "manual", message: message as string })
        );
      console.info("Login Success");
    },
    [login, setError]
  );

  React.useEffect(() => {
    if (authState.user.username) wait(1000).then(() => (from ? navigate(-1) : navigate("/")));
  }, [authState.user.username, from, navigate]);

  if (authState.user.username) {
    return (
      <>
        <h1>Success!</h1>
        <div>You're logged in, sending you {from ? "back" : "home"}...</div>
      </>
    );
  }

  return (
    <>
      <h1>{routeMeta.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldset
          name={UserFields.username}
          labelText="Username or Email"
          type="text"
          autoFocus
          placeholder="john@acme.com"
          defaultValue="admin@example.com"
          error={errors?.username?.message}
          inputRef={registerField()}
        />
        <TextFieldset
          name={UserFields.password}
          labelText="Password"
          type="password"
          placeholder="********"
          defaultValue="CoolPassword9"
          error={errors?.password?.message}
          inputRef={registerField()}
        />
        <button type="submit">Submit</button>
      </form>
      <Link replace to={`${registerMeta.path}?${location.search}`}>
        Need an account?
      </Link>
      <Link to={forgotMeta.path}>Forgot your password?</Link>
    </>
  );
};

export default Component;
