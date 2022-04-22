import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  selectCount,
  setMessage,
  selectMessage,
} from "../../../_slices/counterSlice";
import { fetchMessage } from "../../../services/message";

function LandingPage() {
  const count = useSelector(selectCount);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMessage({ id: "myId", password: "myPassword" });
      dispatch(setMessage(res.message));
    };
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <div>Message: {message}</div>
      <Link to="/register">Go to RegisterPage</Link>
    </div>
  );
}

export default LandingPage;
