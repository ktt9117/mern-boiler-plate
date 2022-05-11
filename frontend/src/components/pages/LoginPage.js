import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Auth from "../hoc/Auth";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkRemember, setCheckRemember] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [email, setEmail] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault(); // Page Refresh 방지
    const data = new FormData(event.currentTarget);
    const params = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(loginUser(params)).then((res) => {
      if (res.payload.loginSuccess) {
        setCookie("checkRemebmer", checkRemember);
        setCookie("rememberEmail", checkRemember ? email : null);
        navigate("/");
      } else {
        alert(res.payload.message);
      }
    });
  };

  useEffect(() => {
    if (cookies.checkRemember === "true") {
      setEmail(cookies.rememberEmail);
      setCheckRemember(true);
    } else {
      setEmail("");
      setCheckRemember(false);
    }
  }, []);

  const onTextChangeHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <form style={{ minWidth: "70%", display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} name="email" autoComplete="username" onChange={onTextChangeHandler} />
        <label>Password</label>
        <input type="password" name="password" autoComplete="current-password" />
        <div>
          <input
            type="checkbox"
            checked={checkRemember}
            label="Remember me"
            onChange={(evt) => {
              setCookie("checkRemember", evt.target.checked);
              setCheckRemember(evt.target.checked);
            }}
          />
        </div>
        <button style={{ marginTop: "2em" }} type="submit">
          Sign In
        </button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">{"Forgot password?"}</Link>
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        </div>
      </form>
    </div>
  );
}

export default Auth(LoginPage, null);
