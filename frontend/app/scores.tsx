import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BACKEND_URL } from "../lib/config";
import { disasterInfo } from "../lib/riskData";

export default function ScoresScreen() {
  const { state, county } = useLocalSearchParams();
  const router = useRouter();
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [events, setEvents] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/risk`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state, county }),
        });

        const data = await res.json();
        if (data.ok) {
          setScores(data.scores);
          setEvents(data.events || {});
        } else {
          setError("No scores returned.");
        }
      } catch (err: any) {
        setError(err.message || "Fetch failed.");
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>DisasterScope</Text>
          <ActivityIndicator size="large" color="#f4b400" />
          <Text style={styles.loadingText}>Loading your risk scores...</Text>
          <Text style={styles.loadingText}>
            Please be patient — the render server may take up to a minute to wake up.
          </Text>
        </View>
      ) : error ? (
        <Text style={styles.error}>⚠ {error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>
            Risk Scores for {county}, {state}
          </Text>

          {scores &&
            Object.entries(scores).map(([type, score]) => {
              const info = disasterInfo[type] || {};
              const latest = events?.[type] || "";
              return (
                <TouchableOpacity
                  key={type}
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: `/${type}`,
                      params: {
                        type,
                        state,
                        county,
                        city: county,
                        score,
                        latest,
                      },
                    })
                  }
                >
                  <Text style={styles.cardTitle}>{type.toUpperCase()}</Text>
                  <Text style={styles.cardScore}>Score: {score}/100</Text>
                  <Text style={styles.cardDesc}>
                    ~{info.description || "No description available."}
                  </Text>
                  {latest ? (
                    <Text style={styles.cardLatest}>📍 Events: {latest}</Text>
                  ) : null}
                </TouchableOpacity>
              );
            })}

          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>← Enter Another Location</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#5d4037",
  },
  card: {
    backgroundColor: "#fff8e1",
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
  },
  cardScore: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 4,
    color: "#000",
  },
  cardDesc: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  cardLatest: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    marginTop: 10,
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
  error: {
    marginTop: 50,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 300,
    backgroundColor: "#fffbe6",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
