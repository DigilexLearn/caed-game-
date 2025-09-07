import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function Card({ value, isFlipped, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={isFlipped}>
      <View style={[styles.inner, isFlipped ? styles.flipped : styles.hidden]}>
        <Text style={styles.text}>{isFlipped ? value : "❓"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
  width: 70,
  height: 90,
  margin: 8,
  borderRadius: 10,
  backgroundColor: "#444",
},
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  hidden: {
    backgroundColor: "#444",
  },
  flipped: {
    backgroundColor: "#4caf50",
  },
  text: {
    fontSize: 28,
    color: "white",
  },
});
