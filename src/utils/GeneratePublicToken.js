var SHA256 = require('sha256');
var moment = require('moment');

export function GeneratePublicToken() {
  let id = moment(Date.now()).utc().add(2, 'm').unix();
  const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

  const authCompareByte = SHA256(`${secretKey}${id}`);
  return { Authorization: authCompareByte, 'Authorization-ID': id };
}
