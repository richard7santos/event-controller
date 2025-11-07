import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  participantCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  participantStatus: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
  },
  actionButton: {
    marginRight: 12,
  },
  adminButton: {
    backgroundColor: "#0F62AC",
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  adminButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
