import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground, // ✅ import kiya
} from "react-native";

const { width, height } = Dimensions.get("window");
const laneWidth = width / 3;

// ✅ Word Bank
const wordBank = [
  { text: "Apple", isCorrect: true },
  { text: "Appl", isCorrect: false },
  { text: "Banana", isCorrect: true },
  { text: "Bananna", isCorrect: false },
  { text: "Orange", isCorrect: true },
  { text: "Orrnge", isCorrect: false },
  { text: "Dog", isCorrect: true },
  { text: "Dgo", isCorrect: false },
  { text: "Blue", isCorrect: true },
  { text: "Bule", isCorrect: false },
  { text: "School", isCorrect: true },
  { text: "Scholl", isCorrect: false },
  { text: "Chair", isCorrect: true },
  { text: "Chiar", isCorrect: false },
  { text: "Table", isCorrect: true },
  { text: "Taabl", isCorrect: false },
  { text: "House", isCorrect: true },
  { text: "Hous", isCorrect: false },
  { text: "Friend", isCorrect: true },
  { text: "Frend", isCorrect: false },
  { text: "Water", isCorrect: true },
  { text: "Watr", isCorrect: false },
  { text: "Happy", isCorrect: true },
  { text: "Hapy", isCorrect: false },
  { text: "Garden", isCorrect: true },
  { text: "Gardan", isCorrect: false },
  { text: "Flower", isCorrect: true },
  { text: "Flwer", isCorrect: false },
  { text: "Story", isCorrect: true },
  { text: "Stroy", isCorrect: false },
  { text: "Light", isCorrect: true },
  { text: "Ligt", isCorrect: false },
];

export default function App() {
  const [lane, setLane] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);

  // spawn new answers every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        spawnAnswer();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // move answers down
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setAnswers((prev) =>
        prev
          .map((ans) => ({ ...ans, y: ans.y + 10 }))
          .filter((ans) => ans.y < height)
      );
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  // check collisions
  useEffect(() => {
    answers.forEach((ans) => {
      if (
        ans.lane === lane &&
        ans.y > height - 180 &&
        ans.y < height - 120
      ) {
        if (ans.isCorrect) {
          setScore((s) => s + 1);
        } else {
          setLives((l) => {
            if (l - 1 <= 0) {
              setGameOver(true);
              Alert.alert("❌ Game Over", `Your Score: ${score}`, [
                { text: "Restart", onPress: restartGame },
              ]);
              return 0;
            }
            return l - 1;
          });
        }
        setAnswers((prev) => prev.filter((a) => a.id !== ans.id));
      }
    });
  }, [answers]);

  const spawnAnswer = () => {
    const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    const randomLane = Math.floor(Math.random() * 3);
    setAnswers((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        ...randomWord,
        lane: randomLane,
        y: 0,
      },
    ]);
  };

  const moveLeft = () => {
    if (lane > 0) setLane(lane - 1);
  };

  const moveRight = () => {
    if (lane < 2) setLane(lane + 1);
  };

  const restartGame = () => {
    setLane(1);
    setAnswers([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")} // ✅ apni bg image yahan lagao
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.score}>⭐ Score: {score}</Text>
      <Text style={styles.lives}>❤️ Lives: {lives}</Text>

      {/* falling answers */}
      {answers.map((ans) => (
        <Text
          key={ans.id}
          style={[
            styles.answer,
            {
              top: ans.y,
              left: ans.lane * laneWidth + laneWidth / 2 - 30,
              color: ans.isCorrect ? "lightgreen" : "red",
            },
          ]}
        >
          {ans.text}
        </Text>
      ))}

      {/* player */}
      <Image
        source={require("../../assets/images/player.png")} // ✅ transparent background wali cat PNG
        style={{
          position: "absolute",
          bottom: 100,
          left: lane * laneWidth + laneWidth / 2 - 35,
          width: 80,
          height: 80,
          resizeMode: "contain",
        }}
      />

      {/* controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={moveLeft} style={styles.btn}>
          <Text style={styles.btnText}>⬅️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveRight} style={styles.btn}>
          <Text style={styles.btnText}>➡️</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  score: {
    position: "absolute",
    top: 40,
    left: 20,
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  lives: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 22,
    color: "red",
    fontWeight: "bold",
  },
  answer: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 40,
  },
  btn: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 24,
    color: "white",
  },
});
