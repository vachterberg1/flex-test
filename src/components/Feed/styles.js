import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        backgroundColor: '#ffffff'
    },

    logo:{
        width: 100,
        height: 100,
        marginTop: 40,
    },

    search:{
        width: 300,
        height: 50,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    inputSearch:{
        paddingLeft: 20,
        fontSize: 16,
    },

    notices:{
        marginTop: 20,
        flex: 1
    },

    mainNotices:{
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: "#f0f0f0",
        width: 330,
        justifyContent: 'space-between'
    },

    form:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    formTextCall:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    formName:{
        width: 200,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        borderRadius: 20,
        marginBottom: 10,
    },

    formText:{
        
    }
})