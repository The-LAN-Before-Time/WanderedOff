import React, { useState, useContext } from 'react';
import { View, Button, Text, ScrollView, TextInput, TouchableOpacity, Switch, Slider, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import { UserContext } from '../../../shared/UserContext'
import styles from '../../styles/formStyles';
import { Formik } from 'formik';
import * as yup from 'yup';

const CreateSession = (props) => {
  const { setSessionId, setRadius } = props;
  const userData = useContext(UserContext)
  const navigation = useNavigation();
  const [radiusTest, setRadiusTest] = useState(20)
  //const [toggle, setToggle] = useState(true);
  const [initialState, setInitialState] = useState({
    name: '',
    code: '',
    radius: radiusTest,
    centerMovable: false,
    owner: userData.id,
    active: true,
    expirationDate: new Date(Date.now() + 24*60*60*1000)
  })

  const reviewSchema = yup.object({
    name: yup.string()
    .required()
    .min(4),
    code: yup.string()
    .required()
    .min(3),
    //.test('is user's phone number', 'Invalid Phone Number', (val) => {
    //   val === userData.phoneNumber;
    // })
    radius: yup.string()
    .required()
    .test(
      "valid radius",
      "Radius must be greater than 20 meters",
      (val) =>
        val > "20"
    ),
  })

  const updateState = (values) => {
    //setInitialState(values);
    setRadius(Number(values.radius))
    console.log("VALUES", values)
    const sessionRef = firebase.firestore().collection('sessions')
    sessionRef.add(values).then(response => {
      firebase.firestore().collection('sessionUsers').doc(response.id).set({});
      const session = Object.assign({}, values);
      session.id = response.id;
      setSessionId(session.id);
      navigation.navigate("Sessions", {session});
    })
  }

  return (
    <ScrollView>
      <Formik
        initialValues={initialState}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          updateState(values);
        }}
      >
      {(props) => (
        <View>
          <View>
            <Text style={styles.label}> Session Name </Text>
            <TextInput
              style={styles.input}
              placeholder="Session Name"
              value={props.values.name}
              onChangeText={props.handleChange('name')}
              onBlur={props.handleBlur("name")}
              // onChangeText={(val) => setInitialState({...initialState, name: val})}
            />
            <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>
            <Text style={styles.label}>Token *phone number*</Text>
            <TextInput  //Remove this input later
                style={styles.input}
              placeholder="Token *phone number*"
              value={props.values.code}
              onChangeText={props.handleChange('code')}
              onBlur={props.handleBlur("code")}
              // value={initialState.code}
              // onChangeText={(val) => setInitialState({...initialState, code: val})}
              keyboardType='number-pad'
            />
            <Text style={styles.errorText}>{props.touched.code && props.errors.code}</Text>
            <Text style={styles.label}>Enter radius (in meters)</Text>
            {/* <View style={testStyles.container}>
              <Slider
                style={{width: 300, height: 30, borderRadius: 50, marginLeft: 50}}
                placeholder="Enter radius"
                value={radiusTest}
                onValueChange={(val) => setRadiusTest(val)}
                minimumValue={20}
                maximumValue={1000}
                step={100}
                // value={String(initialState.radius)}
                // onChangeText={(val) => setInitialState({...initialState, radius: val})}
              />
                <View style={testStyles.textCon}>
                  <Text>20m</Text>
                  <Text>
                      {radiusTest + 'm'}
                  </Text>
                  <Text >1000m</Text>
                </View>
            </View> */}

            <TextInput
              style={styles.input}
              placeholder="Enter radius"
              value={props.values.radius}
              onChangeText={props.handleChange('radius')}
              onBlur={props.handleBlur("radius")}
              keyboardType='number-pad'
              // value={String(initialState.radius)}
              // onChangeText={(val) => setInitialState({...initialState, radius: val})}
            />
            <Text style={styles.errorText}>{props.touched.radius && props.errors.radius}</Text>
            <Text style={styles.label}>Center movable?</Text>
              <Switch
                  style={styles.switch}
                  trackColor={{false: 'gray', true: '#59b3ff'}}
                  thumbColor="white"
                  ios_backgroundColor="gray"
                  value={props.values.centerMovable}
                  // onChangeText={props.handleChange('name')}
                  onValueChange={(value) => props.setFieldValue('centerMovable', value)}
                  // value={toggle}
              />
          </View>
          <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
              <Text style={styles.buttonText}>Create Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </Formik>
    </ScrollView>
  )
}

const testStyles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  textCon: {
      width: 320,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
});


export default CreateSession;
