import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../../_slices/userSlice";

export default function (SpecificComponent, option, adminRoute = null) {
  //option
  //- null: anybody
  //- true: login user only
  //- false: login user has not permitted

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(authUser()).then((res) => {
        console.log("auth response : ", res);
        // 로그인 하지 않은 상태
        if (res.payload.isAuth == false) {
          // 인증이 필요한 페이지라면 로그인 화면으로
          if (option) {
            navigate("/login", { replace: true });
          }
        } else {
          // 로그인 된 상태
          if (adminRoute && res.payload.isAdmin) {
            alert("관리자가 사용 가능합니다.");
            navigate("/", { replace: true });
          } else {
            // 인증된 사용자가 접근할 수 없는 페이지라면 홈으로
            if (option === false) {
              navigate("/", { replace: true });
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
