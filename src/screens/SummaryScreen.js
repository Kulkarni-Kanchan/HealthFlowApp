import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFlow } from "../context/FlowContext";
import { clearProgress } from "../utils/storage";

export default function SummaryScreen({ navigation }) {
  const { state, visibleSteps, goToStep } = useFlow();

  function handleEdit(index) {
    goToStep(index);
    navigation.navigate("Step");
  }

  function handleRestart() {
    Alert.alert("Restart", "Start over from the beginning?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Restart",
        style: "destructive",
        onPress: async () => {
          await clearProgress();
          goToStep(0);
          navigation.navigate("Step");
        },
      },
    ]);
  }

  function formatAnswer(step) {
    const ans = state.answers[step.id];
    if (!ans) return "—";
    if (Array.isArray(ans)) return ans.join(", ");
    return ans;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>🎉 Your Summary</Text>
        <Text style={styles.sub}>
          Review your responses below. Tap Edit to make changes.
        </Text>

        {visibleSteps.map((step, index) => (
          <View key={step.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.stepLabel}>
                Step {index + 1} — {step.title}
              </Text>
              <TouchableOpacity onPress={() => handleEdit(index)}>
                <Text style={styles.editBtn}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.question}>{step.question}</Text>
            <Text style={styles.answer}>{formatAnswer(step)}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
          <Text style={styles.restartText}>Start Over</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8F8FC" },
  container: { padding: 24, paddingBottom: 40 },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A2E",
    marginBottom: 6,
  },
  sub: { fontSize: 14, color: "#666", marginBottom: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F46E5",
    textTransform: "uppercase",
  },
  editBtn: { fontSize: 13, color: "#4F46E5", fontWeight: "600" },
  question: { fontSize: 14, color: "#888", marginBottom: 6 },
  answer: { fontSize: 16, fontWeight: "600", color: "#1A1A2E" },
  restartBtn: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E53E3E",
    alignItems: "center",
  },
  restartText: { color: "#E53E3E", fontWeight: "700", fontSize: 15 },
});
