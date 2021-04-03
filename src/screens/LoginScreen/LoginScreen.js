import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../../styles/styles';
import formStyles from '../../styles/formStyles';

import { firebase } from '../../firebase/config'

export default function LoginScreen({navigation, setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    // const onLoginPress = () => {
    //     firebase
    //         .auth()
    //         .signInWithEmailAndPassword(email, password)
    //         .then((response) => {
    //             const uid = response.user.uid
    //             const usersRef = firebase.firestore().collection('users')
    //             usersRef
    //                 .doc(uid)
    //                 .onSnapshot(
    //                     (doc) => {
    //                         if (!doc.exists) {
    //                         alert("User does not exist anymore.")
    //                         return;
    //                         }
    //                         setUser(doc.data());
    //                     },
    //                     (error) => {
    //                         console.log(error.message);
    //                     }
    //                 )
    //                 // .then(firestoreDocument => {
    //                 //     if (!firestoreDocument.exists) {
    //                 //         alert("User does not exist anymore.")
    //                 //         return;
    //                 //     }
    //                 //     const user = firestoreDocument.data()
    //                 //     setUser(user);

    //                 // })
    //                 // .catch(error => {
    //                 //     alert(error)
    //                 // });
    //                 navigation.navigate('Tabbed Nav')
    //         })
    //         .catch(error => {
    //             alert(error)
    //         })
    // }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        setUser(user);
                        navigation.navigate('Tabbed Nav')
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={formStyles.container}>

            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={formStyles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <Text style={formStyles.label}>E-mail</Text>
                <TextInput
                    style={formStyles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={formStyles.label}>Password</Text>
                <TextInput
                    style={formStyles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={formStyles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={formStyles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
