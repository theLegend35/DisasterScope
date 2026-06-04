import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const facts = [
  "Tornadoes can occur in all 50 U.S. states — even Alaska.",
  "Wildfires can create their own weather systems, including fire-induced lightning.",
  "Floods are the most common and costly natural disaster in the U.S.",
  "Earthquakes can trigger landslides, tsunamis, and even volcanic eruptions.",
  "Hurricane season peaks in September, but storms can form as early as May.",
  "The Richter scale is logarithmic — a magnitude 6 quake is 10× stronger than a magnitude 5.",
  "Droughts can increase wildfire risk by drying out vegetation and soil.",
  "A single lightning bolt can reach temperatures five times hotter than the Sun’s surface.",
  "Most tsunamis are caused by undersea earthquakes that suddenly displace large volumes of water.",
  "The deadliest natural disaster in recorded history was the 1931 China floods, killing millions.",
  "Tornado wind speeds can exceed 300 mph in the most extreme EF5 events.",
  "Hurricanes lose strength rapidly when they move over land because they rely on warm ocean water.",
  "Volcanic ash can travel hundreds of miles and disrupt air traffic worldwide.",
  "The ‘Ring of Fire’ around the Pacific Ocean is home to about 75% of the world’s active volcanoes.",
  "Flash floods can develop in less than 6 hours after heavy rainfall.",
  "Heatwaves are becoming more frequent and intense due to climate change.",
  "Avalanches can reach speeds of over 200 mph — faster than a speeding car.",
  "Storm surges from hurricanes can cause more damage than the wind itself.",
  "Wildfire smoke can travel thousands of miles, affecting air quality on other continents.",
  "Aftershocks can continue for days or even months following a major earthquake.",
  "Sinkholes form when underground water erodes rock and causes the ground to collapse.",
  "The Fujita Scale (EF Scale) rates tornadoes by damage, not by direct wind measurement.",
  "Volcanic eruptions can temporarily cool Earth’s climate by releasing ash and sulfur dioxide.",
  "Droughts are the slowest-developing natural disaster but can last for years.",
  "Landslides can move entire hillsides and bury towns within minutes.",
  "Ice storms occur when freezing rain coats surfaces in layers of ice, causing power outages.",
  "In deserts, flash floods are especially dangerous because dry ground cannot absorb water quickly.",
  "Typhoons and hurricanes are the same type of storm — just named differently depending on location.",
  "The eye of a hurricane can be completely calm, surrounded by the most violent winds in the eyewall.",
  "Lightning strikes Earth about 8 million times per day.",
  "Dust storms can transport particles across entire oceans.",
  "El Niño and La Niña events can alter global weather patterns for months at a time.",
  "The strongest recorded earthquake was the 1960 Chile quake, measuring magnitude 9.5.",
  "Tsunami waves can travel at jetliner speeds — over 500 mph in deep ocean water.",
  "Seismic waves travel faster through solid rock than through loose sediment.",
  "Volcanic lava flows can reach temperatures over 2,000°F (1,100°C).",
  "Hailstones can grow as large as softballs inside strong thunderstorm updrafts.",
  "Most people who die in floods drown in vehicles when trying to cross flooded roads.",
  "The 2011 Japan earthquake shortened Earth’s day by a fraction of a second.",
  "Disaster warning systems like sirens and text alerts save thousands of lives annually.",
  "Tornadoes are most common in the U.S. because of unique geography that allows warm and cold air to collide.",
  "Climate change increases the intensity of hurricanes by warming ocean waters.",
  "A ‘megadrought’ is a drought lasting two decades or longer.",
  "Earthquakes can’t be predicted, but scientists can estimate long-term probabilities for regions.",
  "Floodplains are flat areas next to rivers that naturally flood — but also support fertile agriculture.",
  "Lightning can strike the same place multiple times — tall buildings like the Empire State Building are hit often.",
  "Some volcanic eruptions produce ‘pyroclastic flows’ that move faster than 100 mph and destroy everything in their path.",
  "Tropical cyclones in the Indian Ocean are called ‘cyclones,’ while in the Pacific they’re ‘typhoons.’",
  "Severe droughts can cause reservoirs and rivers to dry up, leading to water shortages and crop failures.",
  "The Earth experiences about 500,000 detectable earthquakes every year — though most are too small to feel.",
];


export default function FactStrip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.strip}>
      <Text style={styles.text}>🧠 Did you know? {facts[index]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    padding: 10,
    backgroundColor: "transparent",
    borderColor: "transparent",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});
