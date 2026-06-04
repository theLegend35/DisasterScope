import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { disasterInfo } from "../lib/riskData";

export default function DisasterDetailScreen() {
  const { type, state, city, county, score, latest } = useLocalSearchParams();
  const router = useRouter();

  const disasterType = Array.isArray(type) ? type[0] : type;

  const info = disasterInfo[disasterType] || {
    description: "No info available.",
    months: "N/A",
    education: "N/A",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{disasterType.toUpperCase()} Risk</Text>
      <Text style={styles.location}>
        {city}, {state} ({county})
      </Text>
      <Text style={styles.score}>Score: {score}/100</Text>

      <View style={styles.card}>
        <Text style={styles.title}>📝 Description</Text>
        <Text style={styles.text}>{info.description}</Text>

        {latest ? (
          <>
            <Text style={styles.title}>📍 Events</Text>
            <Text style={styles.text}>{latest}</Text>
          </>
        ) : null}

        <Text style={styles.title}>📘 Educational Info</Text>
        <Text style={styles.text}>
          {info.education ||
            `Learn how to stay safe during a ${disasterType}. Always follow local alerts and have an emergency plan.`}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffef9",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
    textAlign: "center",
  },
  location: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fdf6e3",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#f4b400",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
