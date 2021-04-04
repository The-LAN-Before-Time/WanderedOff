import { StyleSheet } from 'react-native';

const red = "#d9202b"
const darkBlue = "#101c3d"
const blue = "#0061b2"
const lightBlue = "#59b3ff"
const orange = "#dd9900"

const lightGray = '#cccccc'
const darkGray = "#2e2e2d"

const green = "#198754"

export default StyleSheet.create({

/** Containers */
    container: {
        flex: 1,
        alignItems: 'center'
    },
    containerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    userContainer: {
        borderBottomColor: lightGray,
        borderBottomWidth: 1,
        borderTopColor: lightGray,
        borderTopWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        // marginTop: -1
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: lightGray,
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 15,
        paddingTop: 6,
    },

/** Loading Screen */
    loadingScreen: {
    width: 400,
    height: 800
},

/** Sessions Mgmt */
    heading: {
        fontSize: 30,
    },
    cog: {
        paddingTop: 5,
    },
    text: {
        fontSize: 20,
        color: darkGray,
    },
    userName: {
        marginLeft: 30,
        fontSize: 20,
        color: darkGray,
    },
    sessionName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },


/** Map Screen */
    mapHeader: {
        position: 'absolute',
        width: '30%',
        top: 0,
        right: 15,
        resizeMode: 'contain',
    },
    mapRecenterIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    mapButton: {
        position: 'absolute',
        borderRadius: 5,
        backgroundColor: blue,
        width: '60%',
        top: '50%',
        left: '20%',
        height: 47,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },

/** Mics */
    entityText: {
        fontSize: 20,
        color: darkGray
    },
    logo: {
        flex: 1,
        height: 150,
        width: 150,
        alignSelf: "center",
        margin: 30
    },
    switch:{
        marginLeft: 15
    },

/** Utility */
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    label_underline: {
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 5,
        paddingLeft: 15,
        fontWeight: 'bold',
        borderBottomColor: lightGray,
        borderBottomWidth: 1,
    },
    circleGreen: {
        marginRight: 10,
        width: 15,
        height: 15,
        borderRadius: 150 / 2,
        backgroundColor: green,
    },
    circleRed: {
        marginRight: 10,
        width: 15,
        height: 15,
        borderRadius: 150 / 2,
        backgroundColor: red,
    },
    paddingLeft: {
        paddingLeft: 20,
    },

/** Buttons */
    button: {
        marginTop: 20,
        height: 47,
        padding: 13,
        borderRadius: 5,
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },

    buttonDanger: {
        marginTop: 20,
        height: 47,
        padding: 13,
        borderRadius: 5,
        backgroundColor: red,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 20,
        marginRight:20,
    },
    buttonConfirm: {
        marginTop: 20,
        height: 47,
        padding: 13,
        borderRadius: 5,
        backgroundColor: green,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 20,
        marginRight:20,
    },


/** Footer */
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: darkGray
    },
    footerLink: {
        color: blue,
        fontWeight: "bold",
        fontSize: 16
    },
    label: {
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 5,
        paddingLeft: 15,
        fontWeight: "bold"
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },


})
