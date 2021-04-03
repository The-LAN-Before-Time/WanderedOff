import { StyleSheet } from 'react-native';

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
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        borderTopColor: '#cccccc',
        borderTopWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        // marginTop: -1
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
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

/** Sessions Mgmt */
    heading: {
        fontSize: 30,
    },
    cog: {
        paddingTop: 5,
    },
    text: {
        fontSize: 20,
        color: '#2e2e2d',
    },
    userName: {
        marginLeft: 30,
        fontSize: 20,
        color: '#2e2e2d',
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
        backgroundColor: '#0061b2',
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
        color: '#333333'
    },
    logo: {
        flex: 1,
        height: 150,
        width: 150,
        alignSelf: "center",
        margin: 30
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
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    circleGreen: {
        marginRight: 10,
        width: 15,
        height: 15,
        borderRadius: 150 / 2,
        backgroundColor: '#198754',
    },
    circleRed: {
        marginRight: 10,
        width: 15,
        height: 15,
        borderRadius: 150 / 2,
        backgroundColor: '#d9202b',
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
        backgroundColor: '#0061b2',
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



/** Footer */
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#0061b2",
        fontWeight: "bold",
        fontSize: 16
    },

})
