async function sendPushNotification(content, token) {
  if (Array.isArray(token)) {
    token.forEach((token) => sendPushNotification(content, token));
  } else {
    // console.log('recieved content: ', content);
    console.log('in notify');
    const message = {
      to: token,
      sound: 'default',
      title: content.title || 'No Title',
      body: content.body || 'No Body',
      data: content.data,
    };
    console.log('updated message: ', message);
    try {
      let result = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      console.log('this is the result: ', result);
    } catch (err) {
      console.error(err);
    }
  }
}

export default sendPushNotification;
