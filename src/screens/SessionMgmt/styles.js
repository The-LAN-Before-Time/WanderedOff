import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    center:{
        justifyContent: 'center',
        alignItems: "center",
        alignContent: "center"
    },
    sessionName: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop:20

    },
    button: {
        marginTop: 20,
        height: 47,
        padding: 13,
        borderRadius: 5,
        backgroundColor: '#0061b2',
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 20,
        marginRight:20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
})
