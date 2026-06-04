import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📱 How to use DisasterScope</Text>

      <Text style={styles.paragraph}>
        DisasterScope is a community-focused app designed to help individuals and families prepare for natural disasters.
        By entering your state and county, you’ll receive risk scores for hurricanes, floods, fires, winter storms, and tornadoes.
        Along with these scores, the app offers descriptions, events, and educational information or safety tips about each disaster type when you tap each card.
      </Text>

      <Text style={styles.paragraph}>
        The app also provides detailed information on each disaster, preparation checklists, and helpful resource links
        to help you stay safe before, during, and after a disaster event. These tools can be found on the home screen.
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 70,
    paddingBottom: 50,
    backgroundColor: "#fffbe6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#5d4037",
  },
  paragraph: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    lineHeight: 26,
  },
  backButton: {
    backgroundColor: "#f4b400",
    paddingVertical: 16,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  backText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
