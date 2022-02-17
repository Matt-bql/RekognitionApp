const AWS = require("aws-sdk");
const rekognition = new AWS.Rekognition();
const s3 = new AWS.S3();

// eslint-disable-next-line
exports.handler = async function(event, context, callback) {
  return callback(null, {
    message: "sent back data!",
  });
  console.log("Received S3 event:", JSON.stringify(event, null, 2));
  // Get the object from the event and show its content type

  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  // Detect the labels
  return await detectLabels(bucket, key)
    .then(labels => {
      console.log(labels);
      const isAHotDog = checkIsAHotDog(labels);

      console.log(isAHotDog);
      if (!isAHotDog) {
        return removeImage(bucket, key).then(() => {
          console.log("The image was not a HotDog and was removed");
          return;
        });
      }
    })
    .catch(error => {
      return error;
    });
};

function detectLabels(bucket, key) {
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      },
    },
    MaxLabels: 5,
    MinConfidence: 85,
  };
  return rekognition
    .detectLabels(params)
    .promise()
    .then(data => {
      return data.Labels;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}
function checkIsAHotDog(labels) {
  return labels
    .map(label => {
      return label.Name === "HotDog" ? true : false;
    })
    .some(val => {
      return val === true;
    });
}
function removeImage(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  return s3.deleteObject(params).promise();
}
