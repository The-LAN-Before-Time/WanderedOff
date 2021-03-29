import React, {useState, useRef} from 'react'
import {Image, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView, } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {firebase} from '../../firebase/config'



function PhoneAuthScreen() {
    const [phone, setPhone] = useState('')
    const [confirmResult, setConfirmResult] = useState(null)
    const [verificationCode, setVerificationCode] = useState('')
    const [userId, setUserId] = useState('')
    const buttonId = useRef()

    const appVerifier = new firebase.auth.RecaptchaVerifier(buttonId, {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
    });

    const validatePhoneNumber = () => {
        console.log("Validate Phone Number")
        let regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        // return regexp.test(Number(phone))
        return true
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#aaa'
        },
        page: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        textInput: {
            marginTop: 20,
            width: '90%',
            height: 40,
            borderColor: '#555',
            borderWidth: 2,
            borderRadius: 5,
            paddingLeft: 10,
            color: '#fff',
            fontSize: 16
        },
        themeButton: {
            width: '90%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#888',
            borderColor: '#555',
            borderWidth: 2,
            borderRadius: 5
        },
        themeButtonTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff'
        },
        verificationView: {
            width: '100%',
            alignItems: 'center',
            marginTop: 50
        }
    })

    const handleSendCode = () => {
        // Request to send OTP (over the phone)
        if (validatePhoneNumber()) {
            firebase
                .auth()
                .signInWithPhoneNumber(phone, appVerifier)
                .then(result => {
                    setConfirmResult(result)
                })
                .catch(error => {
                    alert(error.message)
                    console.log(error)
                })
        } else {
            alert('Invalid Phone Number')
        }
    }

    const handleVerifyCode = () => {
        // Request for OTP verification
        if (verificationCode.length === 6) {
            confirmResult
                .confirm(verificationCode)
                .then(user => {
                    setUserId(user.uid)
                    alert(`Verified! ${user.uid}`)
                })
                .catch(error => {
                    alert(error.message)
                    console.log(error)
                })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }

    const renderConfirmationCodeView = () => {
        return (
            <View style={styles.verificationView}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Verification code'
                    placeholderTextColor='#eee'
                    value={verificationCode}
                    keyboardType='numeric'
                    onChangeText={verificationCode => {
                        setVerificationCode(verificationCode)
                    }}
                    maxLength={6}
                />
                <TouchableOpacity
                    style={[styles.themeButton, {marginTop: 20}]}
                    onPress={handleVerifyCode}>
                    <Text style={styles.themeButtonTitle}>Verify Code</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: '#333'}]}>
            <View style={styles.page}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Phone Number with country code'
                    placeholderTextColor='#eee'
                    keyboardType='phone-pad'
                    value={phone}
                    onChangeText={phone => {
                        setPhone(phone)
                    }}
                    maxLength={15}
                    editable={confirmResult ? false : true}
                />

                <TouchableOpacity
                    style={[styles.themeButton, {marginTop: 20}]}
                    onPress={
                        confirmResult
                            ? changePhoneNumber
                            : handleSendCode
                    }
                    ref={buttonId}
                >
                    <Text style={styles.themeButtonTitle}>
                        {confirmResult ? 'Change Phone Number' : 'Send Code'}
                    </Text>
                </TouchableOpacity>

                {confirmResult ? renderConfirmationCodeView() : null}
            </View>
        </SafeAreaView>
    )
}

export default PhoneAuthScreen
