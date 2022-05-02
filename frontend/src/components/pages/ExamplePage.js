import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, selectCount } from "../../_slices/counterSlice";
import { selectMessage, fetchMessage } from "../../_slices/apiSlice";
import { useCookies } from "react-cookie";
import { logout } from "../../_slices/userSlice";
import { Container, Button, Box } from "@mui/material";

function ExamplePage() {
  const count = useSelector(selectCount);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["x_auth"]);
  const navigate = useNavigate();

  useEffect(() => {
    // handle with direct response use 'unwrap'
    try {
      const fulfilled = dispatch(fetchMessage({ id: "myId", pw: "myPassword" })).unwrap();
      console.log("fetchMessage fulfilled: ", fulfilled);
      // handle result here
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log("fetchMessage rejected: ", rejectedValueOrSerializedError);
    }

    // no needs to handle
    // dispatch(fetchMessage({ id: "myId", pw: "myPassword" }));
    console.log("cookies: ", cookies);
  }, []);

  const onClickLogout = () => {
    dispatch(logout()).then(navigate("/"));
  };

  const isLogin = () => {
    return cookies.x_auth;
  };

  return (
    <Container>
      <Box component="div" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to={-1}>{"< Go back"}</Link>
        <Button variant="text" size="small" onClick={onClickLogout}>
          {isLogin() ? "Logout" : "Login"}
        </Button>
      </Box>
      <Box mt={1}>
        <Button variant="outlined" size="small" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Box component="span" mx={1}>
          {count}
        </Box>
        <Button variant="contained" size="small" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </Box>
      <Box mt={2} component="div">
        Call Api Response Message: {message}
      </Box>
    </Container>
  );
}

export default ExamplePage;
