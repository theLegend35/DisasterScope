import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

type Question = {
  question: string;
  options: string[];
  answerIndex: number;
};

const allQuestions: Question[] = [
  {
    question: "Which disaster is most common in coastal areas?",
    options: ["Earthquake", "Tornado", "Hurricane", "Wildfire"],
    answerIndex: 2,
  },
  {
    question: "What does FEMA stand for?",
    options: [
      "Federal Emergency Management Agency",
      "Fire Evacuation Monitoring Authority",
      "Flood Emergency Mapping Association",
      "Federal Evacuation Mission Alliance",
    ],
    answerIndex: 0,
  },
  {
    question: "Which item is essential in an emergency kit?",
    options: ["Board games", "Flashlight", "Laptop", "Sunscreen"],
    answerIndex: 1,
  },
  {
    question: "Which disaster is most likely in California?",
    options: ["Tornado", "Earthquake", "Flood", "Hurricane"],
    answerIndex: 1,
  },
  {
    question: "What should you do during a tornado warning?",
    options: [
      "Go outside and watch",
      "Open windows",
      "Take shelter in a basement or interior room",
      "Drive away quickly",
    ],
    answerIndex: 2,
  },
  {
    question: "Which disaster is measured using the Richter scale?",
    options: ["Flood", "Earthquake", "Wildfire", "Hurricane"],
    answerIndex: 1,
  },
  {
    question: "Which agency issues hurricane warnings?",
    options: [
      "National Weather Service",
      "Environmental Protection Agency",
      "Department of Transportation",
      "FEMA",
    ],
    answerIndex: 0,
  },
  {
    question: "What should you do if there’s a flood warning in your area?",
    options: [
      "Move to higher ground immediately",
      "Wait until you see the water rising",
      "Go for a drive to check it out",
      "Stay in your basement",
    ],
    answerIndex: 0,
  },
  {
    question: "Which natural disaster can create a tsunami?",
    options: ["Earthquake", "Wildfire", "Tornado", "Hurricane"],
    answerIndex: 0,
  },
  {
    question: "What scale measures hurricane strength?",
    options: [
      "Enhanced Fujita Scale",
      "Saffir–Simpson Scale",
      "Richter Scale",
      "Beaufort Scale",
    ],
    answerIndex: 1,
  },
  {
    question: "What should you avoid using during a thunderstorm?",
    options: ["Cell phone", "Microwave", "Wired electronics", "Umbrella"],
    answerIndex: 2,
  },
  {
    question: "What is the main cause of wildfires?",
    options: ["Lightning", "Human activity", "Tsunamis", "Volcanoes"],
    answerIndex: 1,
  },
  {
    question: "Which disaster often follows a volcanic eruption?",
    options: ["Blizzard", "Landslide", "Drought", "Earthquake"],
    answerIndex: 1,
  },
  {
    question: "During a winter storm, what should you do if you’re trapped in your car?",
    options: [
      "Keep the engine running constantly",
      "Run the heater only occasionally and stay inside",
      "Leave the car to find shelter",
      "Sleep outside the car",
    ],
    answerIndex: 1,
  },
  {
    question: "What’s the safest thing to do during an earthquake?",
    options: [
      "Run outside immediately",
      "Stand under a doorway",
      "Drop, cover, and hold on",
      "Go to the highest floor",
    ],
    answerIndex: 2,
  },
  {
    question: "Which region of the U.S. is known as 'Tornado Alley'?",
    options: [
      "Northeast",
      "Pacific Northwest",
      "Central U.S.",
      "Southwest Desert",
    ],
    answerIndex: 2,
  },
  {
    question: "What is a common sign that a tornado is approaching?",
    options: [
      "Clear blue skies",
      "A loud roaring sound and rotating clouds",
      "Heavy snowfall",
      "Dry winds",
    ],
    answerIndex: 1,
  },
  {
    question: "What should you do if you feel an earthquake while indoors?",
    options: [
      "Run outside",
      "Drop under sturdy furniture and cover your head",
      "Stand near windows",
      "Use the elevator to evacuate",
    ],
    answerIndex: 1,
  },
  {
    question: "Which type of disaster can produce lava and ash clouds?",
    options: ["Earthquake", "Volcanic eruption", "Flood", "Tornado"],
    answerIndex: 1,
  },
  {
    question: "What’s one early warning sign of a tsunami?",
    options: [
      "Rapidly rising clouds",
      "Sudden retreat of the ocean shoreline",
      "Increased wind speed",
      "Lightning strikes over water",
    ],
    answerIndex: 1,
  },
  {
    question: "Which natural disaster can create mudflows called lahars?",
    options: ["Volcanic eruptions", "Tornadoes", "Floods", "Wildfires"],
    answerIndex: 0,
  },
  {
    question: "What is the main cause of flash floods?",
    options: [
      "Heavy rainfall in a short period",
      "Earthquakes",
      "High winds",
      "Forest fires",
    ],
    answerIndex: 0,
  },
  {
    question: "Which disaster can cause ash to block sunlight and lower global temperatures?",
    options: ["Earthquake", "Volcano", "Tornado", "Hurricane"],
    answerIndex: 1,
  },
  {
    question: "What should you do during a wildfire evacuation order?",
    options: [
      "Stay and protect your property",
      "Evacuate immediately and follow local instructions",
      "Wait until smoke is visible",
      "Hide indoors with windows open",
    ],
    answerIndex: 1,
  },
  {
    question: "What is black ice?",
    options: [
      "Ash from wildfires",
      "A thin, invisible layer of ice on roads",
      "Volcanic glass",
      "Frozen oil on roads",
    ],
    answerIndex: 1,
  },
  {
    question: "What is the safest action if you’re outdoors during lightning?",
    options: [
      "Hide under a tree",
      "Lie flat on the ground",
      "Seek shelter in a car or building",
      "Stand near metal poles",
    ],
    answerIndex: 2,
  },
  {
    question: "Which disaster can be caused by melting snow and ice in spring?",
    options: ["Flooding", "Earthquake", "Wildfire", "Volcanic eruption"],
    answerIndex: 0,
  },
  {
    question: "What tool is used to detect and track hurricanes?",
    options: ["Seismograph", "Doppler radar", "Thermometer", "Barometer"],
    answerIndex: 1,
  },
  {
    question: "Which natural disaster often follows heavy rainfall in mountainous regions?",
    options: ["Landslide", "Hurricane", "Earthquake", "Wildfire"],
    answerIndex: 0,
  },
  {
    question: "Which disaster can cause aftershocks?",
    options: ["Earthquake", "Flood", "Wildfire", "Blizzard"],
    answerIndex: 0,
  },
  {
    question: "What is the safest way to prepare for multiple disasters?",
    options: [
      "Rely on luck",
      "Have an emergency kit and a communication plan",
      "Buy extra electronics",
      "Stay home during all weather",
    ],
    answerIndex: 1,
  },
  {
    question: "Which disaster can be caused by drought conditions?",
    options: ["Wildfire", "Tornado", "Flood", "Hurricane"],
    answerIndex: 0,
  },
  {
    question: "What’s the safest place to take shelter during a hurricane?",
    options: [
      "Near windows",
      "In a basement or interior room on the lowest floor",
      "On a balcony",
      "In your car",
    ],
    answerIndex: 1,
  },
];


const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function QuizScreen() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<Question[]>(getRandomQuestions(5));
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[questionIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const calculateScore = () => {
    return quizData.reduce((score, q, i) => {
      return score + (selectedAnswers[i] === q.answerIndex ? 1 : 0);
    }, 0);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetake = () => {
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizData(getRandomQuestions(5));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧠 Disaster Awareness Quiz</Text>

      {quizData.map((q, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.question}>{q.question}</Text>
          {q.options.map((opt, j) => {
            const isSelected = selectedAnswers[i] === j;
            const isCorrect = showResults && j === q.answerIndex;
            const isWrong =
              showResults && isSelected && j !== q.answerIndex;

            return (
              <TouchableOpacity
                key={j}
                style={[
                  styles.option,
                  isSelected && styles.selected,
                  isCorrect && styles.correct,
                  isWrong && styles.wrong,
                ]}
                onPress={() => handleSelect(i, j)}
                disabled={showResults}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {!showResults ? (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Quiz</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.scoreText}>
            You scored {calculateScore()} out of {quizData.length}
          </Text>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.retakeText}>Retake Quiz</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: "#fffbe6",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#5d4037",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  selected: {
    borderColor: "#007aff",
    backgroundColor: "#e6f0ff",
  },
  correct: {
    borderColor: "#4caf50",
    backgroundColor: "#e8f5e9",
  },
  wrong: {
    borderColor: "#f44336",
    backgroundColor: "#ffebee",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
    color: "#5d4037",
  },
  retakeButton: {
    backgroundColor: "#f4b400",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  retakeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  backButton: {
    backgroundColor: "#f4b400",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  backText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
