import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { BACKEND_URL } from "../lib/config";

export default function Dashboard() {
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRiskScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, county }),
      });

      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }

      const data = await res.json();
      if (data.ok) {
        setResults(data.scores);
      } else {
        setError("No scores returned from backend.");
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Disaster Risk Dashboard</Text>

      <TextInput
        style={styles.input}
        placeholder="State (e.g. TX)"
        value={state}
        onChangeText={setState}
        autoCapitalize="characters"
      />

      <TextInput
        style={styles.input}
        placeholder="County (e.g. Harris)"
        value={county}
        onChangeText={setCounty}
      />

      <Button title="Get Risk Scores" onPress={fetchRiskScores} disabled={loading} />

      {loading && <Text style={styles.info}>Loading...</Text>}
      {error && <Text style={styles.error}>⚠ {error}</Text>}

      {results && (
        <View style={styles.results}>
          <Text style={styles.subtitle}>Risk Scores</Text>
          {Object.entries(results).map(([type, score]) => (
            <Text key={type} style={styles.resultItem}>
              {type}: {score.toFixed(2)}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 8,
  },
  info: {
    marginTop: 10,
    fontSize: 14,
    color: "blue",
  },
  error: {
    marginTop: 10,
    fontSize: 14,
    color: "red",
  },
  results: {
    marginTop: 20,
    width: "100%",
  },
  resultItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  button: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#f4b400",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
