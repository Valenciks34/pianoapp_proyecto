import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: "center",
  },

  container: {
    width: "85%",
    alignItems: "stretch",
  },


  picker: {
    borderTopStartRadius: 4, 
    borderTopEndRadius: 4, 
    overflow: "hidden",
    borderBottomWidth: 0.7, 
  },

  upload_image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#250",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  text: {
    color: "#fff",
  },
});