// const {
//     MarketplaceMeteringClient 
//   } = require("@aws-sdk/client-marketplace-metering-node/MarketplaceMeteringClient");
//   const {
//     BatchMeterUsageCommand 
//   } = require("@aws-sdk/client-marketplace-metering-node/commands/BatchMeterUsageCommand");
  
//   const AWS = require('aws-sdk');

// module.exports = (req, res, next) => {
//     const marketplaceMetering = new MarketplaceMeteringClient({region: 'region'});
//     var token = req.body.token || req.query.token || req.headers['token'];
//     var params = {
//         RegistrationToken: token /* required */
//       };
//     const batchMeterUsageCommand = new BatchMeterUsageCommand(params);
//       marketplaceMetering.send(batchMeterUsageCommand).then(data => {
//           req.data = data;
//           next();
//           // do something
//       }).catch(error => {
//         return res.status(401).json({ success: false, message: "authorization failed", tokenAutorization: false });
//     })
//     next();
// }

// const AWS = require('aws-sdk');

// const marketplacemetering = new AWS.MarketplaceMetering({
//   apiVersion: '2016-01-14',
//   region: 'us-east-1',
//   credentials: new AWS.TemporaryCredentials({
//     RoleArn: 'REPLACE_ME' // TODO replace with RoleArn output from CloudFormation stack
//   })
// });

// marketplacemetering.resolveCustomer({
//   RegistrationToken: 'REPLACE_ME' // TODO replace with token from POST request
// }, (err, data) => {
//   if (err) {
//     if (err.code === 'InvalidTokenException') {
//       // invalid token
//     } else {
//      throw err;
//     }
//   } else {
//     if (data.ProductCode === 'REPLACE_ME') { // TODO replace with your product code from AWS Marketplace
//        // success, continue with registration in your own system
//        // attach the data.CustomerIdentifier with your own records for metering!
//     } else {
//       // invalid product code
//     }
//   }
// });