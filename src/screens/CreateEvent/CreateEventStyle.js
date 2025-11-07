import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F62AC",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
imagePicker: {
  backgroundColor: "#0F62AC",
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 15,
  marginTop: 10,
},
imagePickerText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
imagePreview: {
  width: "100%",
  height: 180,
  borderRadius: 10,
  marginBottom: 15,
  marginTop: 10,
},

});
