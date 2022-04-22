import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCount } from "../../../_slices/counterSlice";
import { Link } from "react-router-dom";

function RegisterPage() {
  const count = useSelector(selectCount);

  useEffect(() => {}, []);

  return (
    <div>
      RegisterPage {count}
      <br />
      <Link to="/">Go Back to home</Link>
    </div>
  );
}

export default RegisterPage;
