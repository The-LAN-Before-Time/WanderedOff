async function sendPushNotification(content, token) {
  const message = {
    to: token,
    sound: 'default',
    title: content.title,
    body: content.body,
    data: { data: 'goes here' },
  };

  const result = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  console.log('notification result: ', result);
}
export default sendPushNotification;
