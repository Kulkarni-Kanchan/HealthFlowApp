import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MultiSelect from "../components/MultiSelect";
import ProgressBar from "../components/ProgressBar";
import RadioGroup from "../components/RadioGroup";
import { useFlow } from "../context/FlowContext";

export default function StepScreen({ navigation }) {
  const { state, visibleSteps, setAnswer, goNext, goBack } = useFlow();
  const [error, setError] = useState("");

  if (state.loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Restoring your progress...</Text>
      </View>
    );
  }

  const step = visibleSteps[state.currentStepIndex];
  const answer = state.answers[step.id];

  function validate() {
    if (!step.required) return true;
    if (!answer || (Array.isArray(answer) && answer.length === 0)) {
      setError("Please complete this field to continue.");
      return false;
    }
    setError("");
    return true;
  }

  function handleNext() {
    if (!validate()) return;
    if (state.currentStepIndex === visibleSteps.length - 1) {
      navigation.navigate("Summary");
    } else {
      goNext();
    }
  }

  const isLast = state.currentStepIndex === visibleSteps.length - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <ProgressBar
          current={state.currentStepIndex}
          total={visibleSteps.length}
        />

        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.question}>{step.question}</Text>

        {step.type === "radio" && (
          <RadioGroup
            options={step.options}
            value={answer}
            onChange={(val) => {
              setAnswer(step.id, val);
              setError("");
            }}
          />
        )}

        {step.type === "multiselect" && (
          <MultiSelect
            options={step.options}
            value={answer || []}
            onChange={(val) => {
              setAnswer(step.id, val);
              setError("");
            }}
          />
        )}

        {step.type === "text" && (
          <TextInput
            style={styles.input}
            placeholder={step.placeholder}
            value={answer || ""}
            onChangeText={(val) => {
              setAnswer(step.id, val);
              setError("");
            }}
            autoCapitalize="words"
          />
        )}

        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.row}>
          {state.currentStepIndex > 0 && (
            <TouchableOpacity style={styles.backBtn} onPress={goBack}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>
              {isLast ? "See Summary" : "Next →"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8F8FC" },
  container: { padding: 24, paddingBottom: 40 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { marginTop: 12, color: "#666" },
  title: { fontSize: 22, fontWeight: "700", color: "#1A1A2E", marginBottom: 6 },
  question: { fontSize: 16, color: "#555", marginBottom: 20 },
  input: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  error: { color: "#E53E3E", marginTop: 10, fontSize: 13 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    gap: 12,
  },
  backBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#4F46E5",
    alignItems: "center",
  },
  backText: { color: "#4F46E5", fontWeight: "600", fontSize: 15 },
  nextBtn: {
    flex: 2,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#4F46E5",
    alignItems: "center",
  },
  nextText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
