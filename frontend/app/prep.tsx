import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const checklistData: Record<string, string[]> = {
  hurricane: [
    "Water (1 gallon per person per day for 3+ days)",
    "Non-perishable food (3+ day supply)",
    "Flashlight and extra batteries",
    "First aid kit",
    "Battery-powered radio",
    "Personal hygiene items",
    "Important documents in waterproof container",
  ],
  flood: [
    "Waterproof boots and gloves",
    "Sandbags or flood barriers",
    "Evacuation plan and route",
    "Battery-powered weather radio",
    "Flashlight and extra batteries",
    "Emergency contact list",
    "Clean drinking water",
  ],
  fire: [
    "N95 masks to filter smoke",
    "Fire extinguisher",
    "Evacuation plan and go-bag",
    "Important documents and IDs",
    "Battery-powered flashlight",
    "First aid kit",
    "Sturdy shoes and protective clothing",
  ],
  tornado: [
    "Basement or storm shelter access",
    "Helmet or head protection",
    "Battery-powered weather radio",
    "Flashlight and extra batteries",
    "Whistle to signal for help",
    "Emergency food and water",
    "First aid kit",
  ],
  earthquake: [
    "Drop-cover-hold drill plan",
    "Sturdy shoes and gloves",
    "Flashlight and whistle",
    "First aid kit",
    "Emergency food and water",
    "Fire extinguisher",
    "Copies of important documents",
  ],
  tsunami: [
    "Evacuation route to high ground",
    "Waterproof bag for essentials",
    "Battery-powered radio",
    "Flashlight and extra batteries",
    "Emergency food and water",
    "First aid kit",
    "Personal flotation device (if available)",
  ],
  blizzard: [
    "Warm blankets and winter clothing",
    "Non-perishable food and water",
    "Flashlight and extra batteries",
    "Battery-powered radio",
    "Snow shovel and ice melt",
    "Backup heating source (safe for indoor use)",
    "Car emergency kit (if traveling)",
  ],
  volcano: [
    "N95 masks or respirators",
    "Goggles to protect eyes from ash",
    "Evacuation plan and route",
    "Battery-powered radio",
    "Emergency food and water",
    "First aid kit",
    "Sturdy shoes and long sleeves",
  ],
  heatwave: [
    "Plenty of drinking water",
    "Cool, breathable clothing",
    "Fans or portable cooling devices",
    "Avoid outdoor activity during peak heat",
    "Check on vulnerable neighbors",
    "Know signs of heat exhaustion and stroke",
    "Access to air-conditioned shelter",
  ],
  pandemic: [
    "Face masks and hand sanitizer",
    "Disinfectant wipes and cleaning supplies",
    "Prescription medications and refills",
    "Non-perishable food and water",
    "Thermometer and fever reducers",
    "Remote communication tools",
    "Emergency contact list",
  ],
  drought: [
    "Store extra drinking water in sealed containers",
    "Install low-flow faucets and showerheads",
    "Use drought-tolerant plants in landscaping",
    "Keep buckets for greywater reuse",
    "Monitor local water restrictions",
    "Stock up on non-water-based hygiene items (e.g. wipes)",
    "Use water-efficient appliances",
    "Keep emergency food that requires minimal water",
    "Have water purification tablets or filters",
    "Educate household on water conservation habits",
  ],
  landslide: [
    "Know evacuation routes uphill or away from slopes",
    "Avoid building near steep slopes or drainage paths",
    "Install retaining walls or erosion control systems",
    "Keep emergency radio and flashlight",
    "Monitor weather and soil conditions",
    "Have a go-bag ready with essentials",
    "Secure heavy furniture and valuables",
  ],
  avalanche: [
    "Carry avalanche beacon, probe, and shovel",
    "Wear layered, insulated clothing",
    "Know avalanche risk zones and avoid them",
    "Travel with a buddy and share location",
    "Take avalanche safety training",
    "Check snowpack and weather conditions",
    "Have emergency shelter and food",
  ],
  hailstorm: [
    "Park vehicles in covered areas",
    "Close blinds and stay away from windows",
    "Use heavy blankets to protect fragile items",
    "Keep flashlight and first aid kit",
    "Check roof and window durability",
    "Monitor weather alerts",
  ],
  thunderstorm: [
    "Unplug electronics to prevent surge damage",
    "Stay indoors and avoid plumbing",
    "Keep flashlight and batteries",
    "Secure outdoor furniture",
    "Monitor weather alerts",
    "Have emergency food and water",
  ],
  windstorm: [
    "Trim trees and remove loose branches",
    "Secure outdoor items and trash bins",
    "Reinforce windows and doors",
    "Keep flashlight and radio",
    "Have emergency shelter plan",
    "Stock up on food and water",
  ],
  coldwave: [
    "Wear thermal layers and insulated clothing",
    "Keep extra blankets and sleeping bags",
    "Use safe indoor heating sources",
    "Check on elderly or vulnerable neighbors",
    "Stock up on food and water",
    "Avoid travel unless necessary",
  ],
  lightning: [
    "Stay indoors and avoid water/plumbing",
    "Unplug electronics",
    "Avoid tall trees and open fields",
    "Use surge protectors",
    "Keep emergency radio and flashlight",
  ],
  fog: [
    "Use fog lights and drive slowly",
    "Avoid travel if visibility is low",
    "Keep emergency car kit",
    "Use reflective gear if walking",
    "Monitor traffic and weather updates",
  ],
  icestorm: [
    "Avoid travel unless absolutely necessary",
    "Keep salt or ice melt for walkways",
    "Have backup heating and power source",
    "Stock up on food and water",
    "Keep flashlight and extra batteries",
    "Check roof and tree stability",
  ],
};

const disasterTypes = Object.keys(checklistData);

export default function PrepScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎒 Prep Checklist</Text>

      <Text style={styles.subtitle}>Select a disaster type:</Text>
      <View style={styles.buttonGroup}>
        {disasterTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.disasterButton,
              selected === type && styles.selectedButton,
            ]}
            onPress={() => setSelected(type)}
          >
            <Text style={styles.buttonText}>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Essentials for {selected.toUpperCase()}</Text>
          {checklistData[selected].map((item, index) => (
            <Text key={index} style={styles.item}>• {item}</Text>
          ))}
        </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#5d4037",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  disasterButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: "#f4b400",
  },
  buttonText: {
    fontWeight: "600",
    color: "#000",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  backButton: {
    backgroundColor: "#f4b400",
    paddingVertical: 14,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  backText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});