import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F5F5F5F5',
        width: 300,
        padding: 15,
        borderRadius: 8
    },

    routeInformationsContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2
    },

    details:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2
    },

    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },

    textDataTravel:{
        fontWeight: '600'
    },

    textHour:{
        fontSize:12,
        marginTop: 12
    }
})

export default styles;