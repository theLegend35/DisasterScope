import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const disasterData = {
  hurricane: {
    name: "Hurricane",
    fact: "Fun Fact: Hurricanes can release energy equivalent to 10 atomic bombs per second.",
    description:
      "A hurricane is a powerful tropical storm with strong winds and heavy rainfall that forms over warm ocean waters.",
  },
  flood: {
    name: "Flood",
    fact: "Fun Fact: Floods are the most common natural disaster in the U.S.",
    description:
      "Flooding happens when water overflows onto normally dry land, often caused by heavy rain, melting snow, or overflowing rivers.",
  },
  fire: {
    name: "Wildfire",
    fact: "Fun Fact: Wildfires can move faster than a person can run — up to 14 mph.",
    description:
      "Wildfires are uncontrolled fires that spread quickly through vegetation, often fueled by dry conditions, wind, and heat.",
  },
  tornado: {
    name: "Tornado",
    fact: "Fun Fact: Tornadoes can have wind speeds over 300 mph.",
    description:
      "Tornadoes are violent rotating columns of air that extend from thunderstorms to the ground.",
  },
  earthquake: {
    name: "Earthquake",
    fact: "Fun Fact: The Earth's crust shifts about 1 inch per year due to tectonic movement.",
    description:
      "Earthquakes are sudden shaking of the ground caused by movement of tectonic plates beneath the Earth's surface.",
  },
};

export default function LearnScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧠 Learn About Disasters</Text>

      {Object.entries(disasterData).map(([key, { name, fact, description }]) => (
        <View key={key} style={styles.card}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardFact}>{fact}</Text>
          <Text style={styles.cardDesc}>{description}</Text>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fffbe6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#5d4037",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 6,
  },
  cardFact: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#333",
  },
  backButton: {
    backgroundColor: "#f4b400",
    paddingVertical: 14,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  backText: {
    fontSize: 16,
    color: "#000000ff",
  },
});
