var cf = require('aws-cloudfront-sign');
var options = {
  keypairId: 'APKAI4MLSF3GOFEDRZVQ',
  privateKeyPath: 'pk-APKAIALMYUR6KWJ5J75Q.pem',
};
var signedCookies = cf.getSignedCookies(
  'd3g398vtomrdr5.cloudfront.net/10/*',
  options
);

// You can now set cookies in your response header. For example:
for (var cookieId in signedCookies) {
  // res.cookie(cookieId, signedCookies[cookieId]);
  console.log(cookieId, ':', signedCookies);
}

// var cf = require('aws-cloudfront-sign');
// var options = {
//   keypairId: 'APKAIALMYUR6KWJ5J75Q',
//   privateKeyPath: 'pk-APKAIALMYUR6KWJ5J75Q.pem',
// };
// var signedUrl = cf.getSignedUrl(
//   'http://d1k9je5694vop2.cloudfront.net/1/*',
//   options
// );
// console.log('Signed URL: ' + signedUrl);
