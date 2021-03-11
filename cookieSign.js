let AWS = require('aws-sdk');

let keyPairId = 'APKAI4MLSF3GOFEDRZVQ';
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAkuCUfvrCDcwXON7VN+obBf1vEzVxqozvIpf3EUyXiTKWKux/
6Zy5MbUJLFsLkNFOCHg98JFKB81mvNgCvQH3q+iOwRbG84AwdmXAsEUOG+ZR6cnz
/YTcDrr2xCeQbTx3X0n57sdLYzfEQnWc3tnRc3YS36GTj74piOiNDtRXR7DAl5IL
VnMsvgw0SSjvxUQMpiyDYHIiigFOq/x31Wzk9O6Hu2/SzUdf4iQPo8dtnl6/9toN
m0j7dULMu6XoL0+QH8u+DwKur1nA9SMlWTeTXNkhbYAd3U3VE5jwuznxvpt2MpsR
6WkX9o/uk7irwhkQRwa9jU5lXVHQJOJg/shoRQIDAQABAoIBAFA92WK15CZdhaJQ
OvRdNX5EQtafsAWZEVw44YXV7kPKGzhAFHGwaYy6dtSAuQTZFGSULGKtPWCd2q74
5CYWWRTV7IeYxgBp3BAS7v5d+6NKZR3wcxfh6ccyZXYslz7WdfDdHWpR/uGpqdMV
JiqpnUATFaSPRWqWXWKqicW8RCKpmi5kO7QKfOzOzTOih0e/RQnNh+f4LCsIiQeL
dykaV5nYg6ZgY+BE2CuWZAMjjDRnn8+uabknZY7qv7jSk3mMktX7AW2cRNlSevfA
wu/XCRZL7xn3UhmcfPZT9Nm4fdQhWujDT9ZPCmobijVc536nGbANvYhHXfRXDd7l
J2zZnAECgYEA6fuShax+s3zbRNMvRd3q3h9mwDGr68AAdRoR0zwu6DW5mJy+u1iU
P5L1n4W1Ipax4xcSoF/0Rf9r/aAJJ8NQnkC9Pg/sVfdYgQwPwokAEau2MZM7qiqt
QaIFO6UmEoSdOGgnP2ZuID0aFtZdiw1hLujiFbqgG36PgRequGhDREECgYEAoLK3
znpZQPIrvpDVLXoMhxfttGK9fW/oZXPpVixDycBg6RCIznarACjeEwqntHqmKzcF
rd8HufZsVyId4RUUZGWMzXD2AsOQa4J9KKLmayU+7S3gfnHbpT3N23v4a0btHeLy
Zv34Euo8+72l9946JtCiOj3ILzA0flBSAuSXUwUCgYEAwd7+8t+QQ+wqSoapXryX
xOBD5O/DQZ1fQ6gMKPhu7VzGoVsO9nBYtaxw9HJ3OWefkUgm2NdosS8ILagSre25
uMZvhyLucfR2UsbJsCiP9BRQ7BbQkxi1YfJ7X4ZhW2qiUoCKNJAMo429Njr8WyEE
6zdvTQ3LZ7yf7xjLDezl/4ECgYBxnosJKUZr/g3h2kNvuQich9WgoeO6ieI1wSOs
svVm82dRwkgIOq0jGsIRkooKuGE+0tNoIPY0jMADR3L6zs2xQn+wTfsS7zTwXr2h
erQR866vQa2lmVkkVzNyyQ9Wwjoq1GhxW4YH0ag2kduECpLxGLhrF32vp5Sl7qJd
u0QnBQKBgCbyFgHAZo2jkZUpiFXI0waC4fDxuoqktJJ5xd40BKCzR1m+dcNI9oSI
RNgYMFfmHg6HHoJ9dlYSueQ9Dl75RqfiKmDGP4GN9Z3PnnLySyACUEVI5kdJPJiE
3QPw0CM+YuS0Fm/V1j5EzchV+1fvaQKldGky5uw2oW7vI+gaJxDM
-----END RSA PRIVATE KEY-----`;
const cfUrl = 'd3g398vtomrdr5.cloudfront.net';
const now = new Date();
const expiredTime = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  now.getDate()
);
const expiry = expiredTime.getTime() / 1000;

let policy = {
  Statement: [
    {
      Resource: 'http*://' + cfUrl + '/1/*',
      Condition: {
        DateLessThan: { 'AWS:EpochTime': expiry },
      },
    },
  ],
};

let policyString = JSON.stringify(policy);

let signer = new AWS.CloudFront.Signer(keyPairId, privateKey);

exports.getSignedCookie = function (req, res) {
  var options = { url: 'http://' + cfUrl, policy: policyString };

  signer.getSignedCookie(options, function (err, cookie) {
    if (err) {
      res.send(err);
    } else {
      console.log('cookies: ');
      console.log(cookie);
      res.send(cookie);
    }
  });
};
