const { AppConfigs } = require("../AppConfig");


// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
 // Set cache-control header to no-store
 res.setHeader('Cache-Control', 'no-store');
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: AppConfigs().COOKIE_DOMAIN
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
