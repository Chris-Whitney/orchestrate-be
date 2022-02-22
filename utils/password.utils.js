const crypto = require("crypto");

exports.validePassword = (password, hash, salt) => {
  const verify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  console.log("verifying password", hash === verify);
  return hash === verify;
};

exports.genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  console.log("Create a hash");
  return { salt, hash };
};
