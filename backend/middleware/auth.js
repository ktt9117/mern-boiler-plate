const { User } = require("../models/User");

const auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져온다.
  const token = req.cookies.x_auth;
  
  // 토큰을 decode해서 user를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없으면 인증 NO
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저가 있으면 인증 OK
    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = auth;