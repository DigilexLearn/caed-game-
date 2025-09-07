import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RunnerGame from "../game/RunnerGame";
import MemoryGame from "../game/MemoryGame";
import LevelSelect from "../game/LevelSelect";

export default function App() {
  const [game, setGame] = useState("menu"); // "menu" | "runner" | "memory"
  const [level, setLevel] = useState(null); // memory ke levels ke liye

  // 🎯 Runner Game
  if (game === "runner") return <RunnerGame />;

  // 🎯 Memory Game Flow
  if (game === "memory") {
    if (!level) {
      return <LevelSelect onSelectLevel={(lvl) => setLevel(lvl)} />;
    }
    return (
      <MemoryGame
        level={level}
        onExit={(next) => {
          if (next && next <= 5) {
            setLevel(next); // ✅ auto next level
          } else {
            setLevel(null); // ✅ back to level select
            setGame("menu");
          }
        }}
      />
    );
  }

  // 🎯 Main Menu
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Choose a Game</Text>
      <TouchableOpacity style={styles.button} onPress={() => setGame("runner")}>
        <Text style={styles.buttonText}>🏃 Runner Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setGame("memory")}>
        <Text style={styles.buttonText}>🃏 Memory Flip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, marginBottom: 20, fontWeight: "bold" },
  button: {
    backgroundColor: "#4caf50",
    padding: 12,
    margin: 10,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
