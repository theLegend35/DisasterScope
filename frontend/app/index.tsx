import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import FactStrip from "./facts";
import { STATES, COUNTIES_BY_STATE } from "./statesCounties";

export default function HomeScreen() {
  const router = useRouter();
  const [state, setState] = useState<string | null>(null);
  const [county, setCounty] = useState<string | null>(null);
  const [stateOpen, setStateOpen] = useState(false);
  const [countyOpen, setCountyOpen] = useState(false);

  const onStateOpen = useCallback(() => setCountyOpen(false), []);
  const onCountyOpen = useCallback(() => setStateOpen(false), []);

  const handleSubmit = () => {
    if (!state || !county) {
      Alert.alert("Missing Info", "Please select both state and county.");
      return;
    }
    router.push({ pathname: "/scores", params: { state, county } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, backgroundColor: "#fffbe6" }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>DisasterScope</Text>

          <View style={styles.card}>
            <DropDownPicker
              open={stateOpen}
              value={state}
              items={STATES}
              setOpen={setStateOpen}
              setValue={setState}
              placeholder="Select a state"
              listMode="MODAL"
              onOpen={onStateOpen}
              style={styles.dropdown}
              zIndex={3000}
              dropDownContainerStyle={{ maxHeight: 200 }}
            />

            <DropDownPicker
              open={countyOpen}
              value={county}
              items={state ? COUNTIES_BY_STATE[state] || [] : []}
              setOpen={setCountyOpen}
              setValue={setCounty}
              placeholder="Select a county"
              disabled={!state}
              listMode="MODAL"
              onOpen={onCountyOpen}
              style={styles.dropdown}
              zIndex={2000}
              dropDownContainerStyle={{ maxHeight: 200 }}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>📊 Get Risk Scores</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.extraButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/learn")}
            >
              <Text style={styles.secondaryText}>🧠 Learn About Disasters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/prep")}
            >
              <Text style={styles.secondaryText}>🎒 Prep Checklist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/links")}
            >
              <Text style={styles.secondaryText}>🔗 Helpful Links</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/quiz")}
            >
              <Text style={styles.secondaryText}>🧠 Take the Disaster Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/about")}
            >
              <Text style={styles.secondaryText}>ℹ️ How To Use</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/sources")}
            >
              <Text style={styles.secondaryText}>📚 Sources</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.factStripWrapper}>
            <FactStrip />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 17,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5d4037",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 1,
    position: "relative",
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    marginTop: 1,
    backgroundColor: "#f4b400",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  extraButtons: {
    marginTop: 35,
    gap: 16,
  },
  secondaryButton: {
    backgroundColor: "#f4b400",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  factStripWrapper: {
    marginTop: 5,
  },
});
