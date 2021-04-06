# Wandered Off Mobile Application

Have you ever been with a group of friends and you were about to go hiking, biking, skiing, running, at a festival, or bar hopping at the downtown local scene. These activities are great to do as a group but one challenge always persists… keeping your friends together. That’s why we invented wandered off. The first ever group geo-tracking app that displays locations of all your friends and can notify you if anyone has fallen behind or Wandered Off.

We pioneered this technology using React Native which allows for compatibility across iOS and Android. By using Firebase and Firestore database we can listen for user location changes which enable real time updates. Using Expo’s built in notification functionality, users are instantly aware of friends joining their session, falling out of range or sending important status updates. All of this is achieved with the power of Google Maps and geo tracking technology.

Remember, friends who stick together, stay together. So don’t wander off.

### Getting Started

Git clone the repo titled "demoForVideo":
https://github.com/The-LAN-Before-Time/WanderedOff/tree/demoForVideo

Install the dependencies

- `$ yarn install` or `$ npm install`

You will need to also install Expo cli

- `$ npm install --global expo-cli`

You will also need to run

- `$ expo install`

Download the Expo app to view on your mobile device
https://expo.io/tools

### Frameworks used

- Expo: https://docs.expo.io/
- React-Native: https://reactnative.dev/docs/getting-started
- Firebase: https://firebase.google.com/

#### Firebase

- You will need to create a new Project in Firebase along with Google Map API key.
  [Here is a quickstart to creating Firebase project](https://firebase.google.com/docs/firestore/quickstart)

#### Demo

![Wandered Off Intro Screen](/assets/img/MarineGEO_logo.png 'Intro Screen')

![Wandered Off Map Tab](/assets/img/MarineGEO_logo.png 'Map Tab')

![Wandered Off Sessions Tab](/assets/img/MarineGEO_logo.png 'Sessions Tab')

- The app opens up showing the logo - there is a full brand book built in with our finished product. You're immediately taken to the login screen.

- Login using the following credentials:
  Email: demoemail@wanderedoffapp.com
  Password: 123456

- You are then presented with two options: create your own session or join a pre-existing one.

- To create a session, simply give it a name, assign it a unique code of your choosing and define a radius that your group should stick to.

- For this demo's purpose, you can join a pre-existing session that we have already set up, called "March Ski Trip 2021". To join use code 987654.

- Immediately you are brought to the session management tab where you can see all friends in the "March Ski Trip 2021" session and their respective statuses.

- From here you can also invite additional friends by sending the session code.

- If you switch to the map view, you can see the location of each friend and the radius the group is staying within.

- Tapping on a friend will display their full name and current status.

- You can see that as friends move, the map is updated and the radius follows them in real time.

- When a friend falls out of the radius, a notification alerts you that they’re out of range.

- On the account page you have the option to change your display name or logout of the app entirely.

- You have some more options, from the session management page you can update your status and make sure friends are notified of the change.

- You can also edit your settings to change your radius.

- When the group is done with the session simple exit.Leaving will remove your name and location from the session.
