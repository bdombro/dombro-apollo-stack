import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CheckboxFieldset from "../../../../molecules/CheckboxFieldset";
import TextFieldset from "../../../../molecules/TextFieldset";
import { useAuthentication } from "../../../../state";
import { RegisterBody, UserFields } from "../../../../state/authentication/mockApi/types";
import { wait } from "../../../../util/wait";
import loginMeta from "../Login/meta";
import routeMeta from "./meta";

export type FormValues = RegisterBody;

const Component: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: authState, register } = useAuthentication();
  const { handleSubmit, register: registerField, errors, setError } = useForm<FormValues>();
  const qs = new URLSearchParams(location.search);
  let from = qs.get("from");
  // TODO: Figure out why we get redirected to ?from=undefined when going directly to /auth/register (same as login)
  if (from === "undefined") from = null;

  const onSubmit = React.useCallback(
    async (values: FormValues) => {
      values.username = values.email;
      const res = await register(values);
      if (res.errors)
        Object.entries(res.errors).forEach(([field, message]) =>
          setError(field as keyof FormValues, { type: "manual", message: message as string })
        );
      console.info("Register Success");
    },
    [register, setError]
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
          name={UserFields.givenName}
          labelText="First Name"
          defaultValue="Jane"
          error={errors?.givenName?.message}
          inputRef={registerField()}
        />
        <TextFieldset
          name={UserFields.surname}
          labelText="Last Name"
          defaultValue="Smith"
          error={errors?.surname?.message}
          inputRef={registerField()}
        />
        <TextFieldset
          name={UserFields.email}
          labelText="Email"
          type="email"
          autoFocus
          defaultValue="jane@acme.com"
          placeholder="janen@acme.com"
          error={errors?.email?.message}
          inputRef={registerField()}
        />
        <TextFieldset
          name={UserFields.password}
          labelText="Password"
          type="password"
          placeholder="********"
          defaultValue="CoolPassword8"
          error={errors?.password?.message}
          inputRef={registerField()}
        />
        <CheckboxFieldset
          name={UserFields.terms}
          labelText="Do you agree to these terms?"
          error={errors?.terms?.message}
          inputRef={registerField()}
        />
        <button type="submit">Submit</button>
      </form>
      <Link replace to={`${loginMeta.path}?${location.search}`}>
        Already have an account?
      </Link>
    </>
  );
};

export default Component;
