import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ActivityIndicator, Button, HelperText, TextInput, useTheme } from "react-native-paper";

export default function AuthValidationScreen() {

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
