import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform, ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../../styles/styles';
import {firebase} from '../../firebase/config'

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

export default function PhoneScreen( {navigation} ) {

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
    let showPhoneNumberInput = true;

    const phoneVerificationInput = () => {
        return (
            <ScrollView >
                <Text style={styles.label}>Enter phone number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="+1 999 999 9999"
                    autoFocus
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                />
                <TouchableOpacity
                    style={styles.button}
                    disabled={!phoneNumber}
                    onPress={async () => {
                      /** The FirebaseRecaptchaVerifierModal ref implements the
                       *  FirebaseAuthApplicationVerifier interface and can be
                       *  passed directly to `verifyPhoneNumber`. */

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
                >
                    <Text style={styles.buttonText}>Send Verification Code</Text>
                </TouchableOpacity>
            </ScrollView>
            )
    }
    const verificationCodeInput = () => {
        return (
            <ScrollView>
                <Text style={styles.label}>Enter Verification code</Text>
                <TextInput
                    style={styles.input}
                    editable={!!verificationId}
                    placeholder="123456"
                    onChangeText={setVerificationCode}
                />
                <TouchableOpacity
                    style={styles.button}
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
                ><Text style={styles.buttonText}>Confirm Verification Code</Text></TouchableOpacity>
            </ScrollView>
        )
    }

    return(
        <ScrollView >
        <View style={{marginTop: 20}}>

            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={attemptInvisibleVerification}
            />

            <Image style={styles.logo} source={require('../../../assets/icon.png')}  />

            { showPhoneNumberInput ? phoneVerificationInput() : verificationCodeInput()  }


            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <View >
                        <Text
                            style={{
                                color: message.color || 'blue',
                                fontSize: 17,
                                textAlign: 'center',
                                margin: 20,
                            }}>
                            {message.text}
                            <View>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}
                                          onPress={()=>{
                                              showPhoneNumberInput = false
                                          }}
                                    >Ok</Text>
                                </View>
                            </View>
                        </Text>
                    </View>
                </TouchableOpacity>

            ) : (
                undefined
            )}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
        </ScrollView>
    )
}
