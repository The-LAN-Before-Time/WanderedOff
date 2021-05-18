import React, { useState, useContext } from 'react';
import {
  View,
  Button,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import { UserContext } from '../../../shared/UserContext';

import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../../styles/styles';
import Slider from '@react-native-community/slider';
import { Keyboard } from 'react-native';

const CreateSession = (props) => {
  const { setSessionId, setRadius } = props;
  const userData = useContext(UserContext);
  const navigation = useNavigation();
  //const [toggle, setToggle] = useState(true);
  const [scrollable, setScrollable] = useState({
    scrollEnabled: true
  });
  const [initialState, setInitialState] = useState({
    name: '',
    code: '',
    radius: '500',
    centerMovable: true,
    owner: userData.id,
    active: true,
    expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  console.log(initialState);

  const reviewSchema = yup.object({
    name: yup.string().required().min(4),
    code: yup.string().required().min(3),
    //.test('is user's phone number', 'Invalid Phone Number', (val) => {
    //   val === userData.phoneNumber;
    // })
    radius: yup
      .string()
      .required()
      .test(
        'valid radius',
        'radius must be at least 10 feet',
        (val) => val >= 10
      ),
  });

  const updateState = (values) => {
    console.log(values)
    //setInitialState(values);
    setRadius(Math.round(Number(values.radius)/3.281*1000)/1000);
    const sessionRef = firebase.firestore().collection('sessions');
    sessionRef.add(values).then((response) => {
      firebase.firestore().collection('sessionUsers').doc(response.id).set({});
      const session = Object.assign({}, values);
      session.id = response.id;
      setSessionId(session.id);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Sessions', params: { session } }],
      });
    });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={scrollable.scrollEnabled}>
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
              <Text style={styles.label}> Session name </Text>
              <TextInput
                style={styles.input}
                placeholder='Session Name'
                value={props.values.name}
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')}
                // onChangeText={(val) => setInitialState({...initialState, name: val})}
              />
              <Text style={styles.errorText}>
                {props.touched.name && props.errors.name}
              </Text>
              <Text style={styles.label}>Room code</Text>
              <TextInput //Remove this input later
                style={styles.input}
                placeholder='Ex: 12345'
                value={props.values.code}
                onChangeText={props.handleChange('code')}
                onBlur={props.handleBlur('code')}
                // value={initialState.code}
                // onChangeText={(val) => setInitialState({...initialState, code: val})}
                keyboardType='number-pad'
              />
              <Text style={styles.errorText}>
                {props.touched.code && props.errors.code}
              </Text>
              <Text style={styles.label}>Radius</Text>

              <View style={testStyles.container}>
              <Slider
                style={{width: '85%'}}
                value={props.values.radius}
                onSlidingStart={() => setScrollable({scrollEnabled: false})}
                onSlidingComplete={() => setScrollable({scrollEnabled: true})}
                onValueChange={(e) => {
                  props.setFieldValue(`radius`, e)
                  Keyboard.dismiss();
                  console.log(e)
                }}
                minimumValue={10}
                maximumValue={1000}
                step={10}
              />
                <View style={testStyles.textCon}>
                  {/* <Text>10</Text> */}
                  <Text>
                      {props.values.radius + ' feet'}
                  </Text>
                  {/* <Text>1000</Text> */}
                </View>
            </View>



              {/* <TextInput
                style={styles.input}
                placeholder='Ex: 50'
                value={props.values.radius}
                onChangeText={props.handleChange('radius')}
                onBlur={props.handleBlur('radius')}
                keyboardType='number-pad'
                // value={String(initialState.radius)}
                // onChangeText={(val) => setInitialState({...initialState, radius: val})}
              /> */}


              <Text style={styles.errorText}>
                {props.touched.radius && props.errors.radius}
              </Text>
              {/* <Text style={styles.label}>Center movable?</Text>
              <Switch
                style={styles.switch}
                trackColor={{ false: 'gray', true: '#59b3ff' }}
                thumbColor='white'
                ios_backgroundColor='gray'
                value={props.values.centerMovable}
                // onChangeText={props.handleChange('name')}
                onValueChange={(value) =>
                  props.setFieldValue('centerMovable', value)
                }
                // value={toggle}
              /> */}
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Create Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const testStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCon: {
    // width: 286,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CreateSession;
