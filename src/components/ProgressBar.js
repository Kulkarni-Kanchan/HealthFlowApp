import { StyleSheet, Text, View } from "react-native";

export default function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Step {current + 1} of {total}
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  label: { fontSize: 13, color: "#666", marginBottom: 8, fontWeight: "600" },
  track: { height: 6, backgroundColor: "#E0E0E0", borderRadius: 3 },
  fill: { height: 6, backgroundColor: "#4F46E5", borderRadius: 3 },
});
