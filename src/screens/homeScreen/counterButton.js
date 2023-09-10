import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { increment } from '../../store/slices/counterSlice';

export default function CounterButton() {

  const dispatch = useDispatch();

  return (
    <View>
      <Button onPress={() => dispatch(increment()) } mode="contained">Incrementar Contador</Button>
    </View>
  )
}