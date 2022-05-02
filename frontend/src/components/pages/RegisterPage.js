import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../_slices/userSlice";

function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      return alert("The Password are not equals.");
    }

    const params = {
      email: registerForm.email,
      password: registerForm.password,
      name: registerForm.userName,
    };

    const res = await dispatch(registerUser(params));
    if (res.payload.success) {
      alert("Register Succeed. Please try to login");
      navigate("/login");
    } else {
      alert(JSON.stringify(res.payload.err));
    }
  };

  const onTextChangeHandler = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <form style={{ minWidth: "70%", display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={registerForm.email} name="email" onChange={onTextChangeHandler} />
        <label>User Name</label>
        <input type="text" value={registerForm.userName} name="userName" onChange={onTextChangeHandler} />
        <label>Password</label>
        <input type="password" value={registerForm.password} name="password" onChange={onTextChangeHandler} />
        <label>Password Confirm</label>
        <input
          type="password"
          value={registerForm.confirmPassword}
          name="confirmPassword"
          onChange={onTextChangeHandler}
        />
        <button style={{ marginTop: "2em" }} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
