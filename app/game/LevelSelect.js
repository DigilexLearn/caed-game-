import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

export default function LevelSelect({ onSelectLevel }) {
  const levels = [1, 2, 3, 4, 5];

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🎯 Select Level</Text>
        {levels.map((lvl) => (
          <TouchableOpacity
            key={lvl}
            style={styles.button}
            onPress={() => onSelectLevel(lvl)}
          >
            <Text style={styles.buttonText}>Level {lvl}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: "cover" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 28, marginBottom: 20, color: "white", fontWeight: "bold" },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
});
