import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {firebase} from '../../firebase/config'

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

function PhoneAuthScreen( {navigation} ) {

    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = useState(
        !firebaseConfig || Platform.OS === 'web'
            ? {
                text:
                    'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
            }
            : undefined
    );
    const attemptInvisibleVerification = true;
    return(
        <View style={{ padding: 20, marginTop: 50 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={attemptInvisibleVerification}
            />
            <Text style={{ marginTop: 20 }}>Enter phone number</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
            <Button
                title="Send Verification Code"
                disabled={!phoneNumber}
                onPress={async () => {
                    /** The FirebaseRecaptchaVerifierModal ref implements the
                     *  FirebaseAuthApplicationVerifier interface and can be
                     *  passed directly to `verifyPhoneNumber`.
                     */
                    try {
                        const phoneProvider = new firebase.auth.PhoneAuthProvider();
                        const cleanPhoneNumber =  phoneNumber.replace(/[^\d]/g, '')
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                            `+${cleanPhoneNumber}`,
                            recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        showMessage({
                            text: 'Verification code has been sent to your phone.',
                        });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message} ${phoneNumber}`, color: 'red' });
                    }
                }}
            />
            <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <Button
                title="Confirm Verification Code"
                disabled={!verificationId}
                onPress={async () => {
                    try {
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                            verificationId,
                            verificationCode
                        );
                        const cleanPhoneNumber =  phoneNumber.replace(/[^\d]/g, '')
                        console.log("--- CREDENTIAL -- ")
                        await firebase.auth().signInWithCredential(credential).then( (result)=>{
                            console.log(result)
                            navigation.navigate('Registration', {cleanPhoneNumber})
                        } );

                        showMessage({ text: 'Phone authentication successful 👍' });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: 'darkred' });
                    }
                }}
            />
            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                            color: message.color || 'blue',
                            fontSize: 17,
                            textAlign: 'center',
                            margin: 20,
                        }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : (
                undefined
            )}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
    )
}

export default PhoneAuthScreen
