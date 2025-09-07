import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert, ScrollView } from "react-native";
import { Audio } from "expo-av";
import Card from "./Card";

const levelCards = {
  1: ["🍎", "🍌", "🍎", "🍌"],
  2: ["🍎", "🍌", "🍇", "🍒", "🍎", "🍌", "🍇", "🍒"],
  3: ["🍎","🍌","🍇","🍒","🍉","🍍","🍎","🍌","🍇","🍒","🍉","🍍"],
  4: ["🍎","🍌","🍇","🍒","🍉","🍍","🥝","🥥","🍎","🍌","🍇","🍒","🍉","🍍","🥝","🥥"],
  5: ["🍎","🍌","🍇","🍒","🍉","🍍","🥝","🥥","🍓","🍑","🍎","🍌","🍇","🍒","🍉","🍍","🥝","🥥","🍓","🍑"],
};

// 👇 function to calculate lives per level
const getLivesForLevel = (level) => level + 1; 
// Level 1 → 2 lives, Level 2 → 3, ... Level 5 → 6

export default function MemoryGame({ level = 1, onExit }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lives, setLives] = useState(getLivesForLevel(level));

  useEffect(() => {
    restartGame();
  }, [level]);

  const playSound = async (file) => {
    try {
      const { sound } = await Audio.Sound.createAsync(file);
      await sound.playAsync();
    } catch (e) {
      console.log("Sound error:", e);
    }
  };

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
        playSound(require("../../assets/match.mp3"));
      } else {
        setLives((l) => {
          if (l - 1 <= 0) {
            playSound(require("../../assets/gameover.mp3"));
            Alert.alert("💀 Game Over", "Out of lives!", [
              { text: "Restart", onPress: restartGame },
              { text: "Exit", onPress: onExit },
            ]);
            return 0;
          }
          return l - 1;
        });
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      playSound(require("../../assets/win.mp3"));
      Alert.alert("🎉 You Win!", `Level ${level} completed in ${moves} moves!`, [
        { text: "Next Level", onPress: () => onExit(level + 1) },
        { text: "Exit", onPress: onExit },
      ]);
    }
  }, [matched]);

  const restartGame = () => {
    const shuffled = [...levelCards[level]].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLives(getLivesForLevel(level)); // 👈 lives reset with new formula
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>🃏 Memory Flip - Level {level}</Text>
        <Text style={styles.info}>Moves: {moves} | ❤️ Lives: {lives}</Text>

        <View style={styles.board}>
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            return (
              <Card
                key={index}
                value={card}
                isFlipped={isFlipped}
                onPress={() => handleFlip(index)}
              />
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: "cover" },
  overlay: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 30,
  },
  title: { fontSize: 26, marginBottom: 10, color: "white", fontWeight: "bold", textAlign: "center" },
  info: { fontSize: 18, marginBottom: 20, color: "lightgray", textAlign: "center" },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    justifyContent: "center",
  },
});
