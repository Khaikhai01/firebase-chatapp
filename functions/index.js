const functions = require("firebase-functions");
const axios = require("axios");

exports.createChatEngineUser = functions.auth.user().onCreate((user) => {
  axios.post(
      "https://api.chatengine.io/users/",
      {
        username: user.email,
        secret: user.uid,
        email: user.email,
        first_name: user.displayName,
      },
      {headers: {"Private-Key": "784971c0-bef7-4304-8702-9a7476b5ba22"}},
  );
});

exports.deleteChatEngineUser = functions.auth.user().onDelete((user) => {
  axios.delete("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": "92b31292-e688-4290-a997-6e5269ca154e",
      "User-Name": user.email,
      "User-Secret": user.uid,
    },
  });
});
