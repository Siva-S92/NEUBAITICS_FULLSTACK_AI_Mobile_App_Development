import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit"; // LineChart from react-native-chart-kit
import { useRouter } from "expo-router";

export default function GridChart({ total_reviews }) {
  const router = useRouter();

  // Filter reviews based on label
  const positives = total_reviews.filter(
    (item) => item.result.label === "POSITIVE"
  );
  const negatives = total_reviews.filter(
    (item) => item.result.label === "NEGATIVE"
  );
  const neutrals = total_reviews.filter(
    (item) => item.result.label === "NEUTRAL"
  );

  // Map unique product titles to indices
  const productTitles = [
    ...new Set(total_reviews.map((review) => review.productId.title)),
  ];

  // Function to format data for Line Chart
  const formatData = (reviews) => {
    const scores = reviews.map((review) => review.result.score);
    const validScores = scores.filter(
      (score) => !isNaN(score) && score !== Infinity && score !== -Infinity
    );

    if (scores.length !== validScores.length) {
      console.log("Invalid data detected:", scores);
    }

    return validScores;
  };

  // Data for line chart
  const positiveData = formatData(positives);
  const negativeData = formatData(negatives);
  const neutralData = formatData(neutrals);

  // Ensure no empty datasets are passed to the chart
  if (
    positiveData.length === 0 &&
    negativeData.length === 0 &&
    neutralData.length === 0
  ) {
    return <Text>Loading....</Text>;
  }

  return (
    <View className="mb-5 mt-2">
      <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 5 }}>
        Sentiments in Reviews
      </Text>

      {/* Scrollable Container */}
      <ScrollView horizontal style={{ paddingTop: 2 }}>
        <View style={{ minWidth: 600 }}>
          {/* Line Chart */}
          <LineChart
            data={{
              // Replace x-axis labels with index numbers
              labels: Array.from({ length: productTitles.length }, (_, index) =>
                (index + 1).toString()
              ), // Using index numbers for x-axis
              datasets: [
                {
                  data: positiveData,
                  color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green for positive
                  strokeWidth: 2, // Line thickness
                },
                {
                  data: negativeData,
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red for negative
                  strokeWidth: 2,
                },
                {
                  data: neutralData,
                  color: (opacity = 1) => `rgba(169, 169, 169, ${opacity})`, // Gray for neutral
                  strokeWidth: 2,
                },
              ],
            }}
            width={600}
            height={300}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2, // Number of decimal places for data
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier // Smooth lines
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      </ScrollView>

      {/* Color Identity Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorBox, { backgroundColor: "rgba(0, 255, 0, 1)" }]}
          />
          <Text>Positive</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorBox, { backgroundColor: "rgba(255, 0, 0, 1)" }]}
          />
          <Text>Negative</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: "rgba(169, 169, 169, 1)" },
            ]}
          />
          <Text>Neutral</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 4,
  },
});
