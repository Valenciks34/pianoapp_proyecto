import { Text, View } from 'react-native'
import React, { Component } from 'react'


const LessonScreen = ({navigation}) => {

    return (

        
        <View style = {{justifyContent:'center', alignItems:'center', flex:1}}>
            <Text
            style = {{fontSize:30}}
            onPress={() => navigation.navigate('Lessons')}>
            This is lessonScreeen
            </Text>

        </View>
    )

}


export default LessonScreen