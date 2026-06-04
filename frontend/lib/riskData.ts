export const disasterInfo: Record<
  string,
  { description: string; months?: string; recentEvent?: string; education: string }
> = {
  hurricane: {
    description:
      "A hurricane is a powerful tropical storm with strong winds and heavy rainfall that forms over warm ocean waters.",
    months: "June – November",
    education:
      "Hurricanes bring intense winds, flooding, and storm surges. If a hurricane is forecasted, secure outdoor objects, stock emergency supplies, and follow evacuation orders. Avoid flooded roads and stay indoors until officials declare it safe.",
  },
  flood: {
    description:
      "Flooding happens when water overflows onto normally dry land, often caused by heavy rain, melting snow, or overflowing rivers.",
    months: "Varies by region; often spring and fall",
    education:
      "Floods can occur suddenly or build up over time. Never walk or drive through floodwaters. Move to higher ground, listen to weather alerts, and keep important items in waterproof containers.",
  },
  fire: {
    description:
      "Wildfires are uncontrolled fires that spread quickly through vegetation, often fueled by dry conditions, wind, and heat.",
    months: "Summer – Fall",
    education:
      "Wildfires spread fast and produce dangerous smoke. Create a defensible zone around your home, prepare an evacuation plan, and avoid lighting open flames during dry or windy days.",
  },
  tornado: {
    description:
      "Tornadoes are violent rotating columns of air that extend from thunderstorms to the ground.",
    months: "March – July (varies by region)",
    education:
      "Tornadoes can form with little warning. When a tornado warning is issued, take shelter in a basement or interior room without windows. Avoid vehicles and mobile homes if possible.",
  },
  storm: {
    description:
      "Severe storms bring strong winds, heavy rain, lightning, and sometimes hail or flash flooding.",
    months: "Spring – Summer",
    education:
      "During severe storms, lightning and strong winds pose serious risks. Stay indoors and away from windows, avoid using electronics, and unplug sensitive equipment. If outdoors, seek shelter immediately and never take cover under trees.",
  },
  "winter storm": {
    description:
      "Winter storms bring snow, ice, freezing rain, and extreme cold that can disrupt travel and power systems.",
    months: "December – February",
    education:
      "Winter storms can cause frostbite, hypothermia, and dangerous driving conditions. Stay indoors if possible, dress warmly, keep blankets and flashlights handy, and avoid unnecessary travel.",
  },
  drought: {
    description:
      "A drought is a prolonged period of unusually low rainfall leading to water shortages and dry conditions.",
    months: "Varies by region; often summer",
    education:
      "During droughts, conserve water by reducing outdoor use and fixing leaks. Droughts can increase wildfire risk — follow local burn restrictions and report any signs of smoke.",
  },
  earthquake: {
    description:
      "Earthquakes are sudden shaking of the ground caused by movement of the Earth's tectonic plates.",
    months: "Any time of year",
    education:
      "If you feel shaking, drop to the ground, cover your head, and hold on until it stops. Stay away from windows and heavy furniture. Afterward, check for gas leaks and avoid damaged buildings.",
  },
  tsunami: {
    description:
      "A tsunami is a series of large ocean waves caused by underwater earthquakes or volcanic eruptions.",
    months: "Any time of year",
    education:
      "If you are near the coast and feel a strong earthquake or see the ocean rapidly recede, move immediately to high ground. Stay there until authorities declare it safe.",
  },
};
