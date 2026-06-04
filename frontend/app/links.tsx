import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const resources = [
  {
    label: "American Red Cross Disaster Help",
    url: "https://www.redcross.org/get-help.html",
  },
  {
    label: "National Weather Service Safety Portal",
    url: "https://www.weather.gov/safety",
  },
  {
    label: "FEMA Disaster Resources",
    url: "https://www.ready.gov",
  },
  {
    label: "FEMA National Preparedness Framework",
    url: "https://www.fema.gov/emergency-managers/national-preparedness",
  },
  {
    label: "Ready.gov Hazard Information Sheets",
    url: "https://www.ready.gov/be-informed",
  },
  {
    label: "ASPR (HHS) Strategic Preparedness",
    url: "https://aspr.hhs.gov/Pages/Home.aspx",
  },
  {
    label: "Disaster Preparedness Checklists",
    url: "https://www.preparationcall.com/disaster-preparedness-resources/",
  },
  {
    label: "CDC Natural Disasters and Severe Weather",
    url: "https://www.cdc.gov/disasters/index.html",
  },
  {
    label: "National Voluntary Organizations Active in Disaster (NVOAD)",
    url: "https://www.nvoad.org",
  },
  {
    label: "U.S. Fire Administration",
    url: "https://www.usfa.fema.gov/",
  },
  {
    label: "National Center for Disaster Preparedness (Columbia University)",
    url: "https://ncdp.columbia.edu",
  },
  {
    label: "Disaster Distress Helpline (SAMHSA)",
    url: "https://www.samhsa.gov/find-help/disaster-distress-helpline",
  },
  {
    label: "U.S. Geological Survey Natural Hazards",
    url: "https://www.usgs.gov/natural-hazards",
  },
  {
    label: "National Hurricane Center",
    url: "https://www.nhc.noaa.gov",
  },
  {
    label: "National Earthquake Information Center",
    url: "https://earthquake.usgs.gov",
  },
];


export default function HelpfulLinksScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔗 Helpful Disaster Resources</Text>

      {resources.map((link, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => Linking.openURL(link.url)}
          style={styles.linkCard}
        >
          <Text style={styles.linkText}>{link.label}</Text>
        </TouchableOpacity>
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
