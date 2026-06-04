import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";

const sources = [
  {
    label: "FEMA National Risk Index CSV",
    url: "https://hazards.fema.gov/nri/data-resources",
    note: "Used to train the model that predicts disaster risk scores by county.",
  },
  {
    label: "Counties List JSON by vitalii-z8i",
    url: "https://gist.github.com/vitalii-z8i/bbb96d55d57f1e4342c3408e7286d3f2",
    note: "Used for the dropdowns with all U.S. counties by state.",
  },
  {
    label: "scikit-learn (Python ML Library)",
    url: "https://scikit-learn.org",
    note: "Used to build and train the machine learning model for disaster risk prediction.",
  },
  {
    label: "React Native",
    url: "https://reactnative.dev",
    note: "Used to build the frontend mobile app interface.",
  },
  {
    label: "Expo & EAS Build",
    url: "https://expo.dev",
    note: "Used for app development, testing, and generating the Android APK.",
  },
];


export default function SourcesScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 Data Sources & References</Text>

      {sources.map((source, index) => (
        <View key={index} style={styles.linkCard}>
          <TouchableOpacity onPress={() => Linking.openURL(source.url)}>
            <Text style={styles.linkText}>{source.label}</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>{source.note}</Text>
        </View>
      ))}

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
  linkCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  linkText: {
    fontSize: 16,
    color: "#007aff",
    fontWeight: "600",
  },
  noteText: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  backButton: {
    backgroundColor: "#f4b400",
    paddingVertical: 14,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  backText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
