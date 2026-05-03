import { StyleSheet, TextInput } from "react-native";
import MultiSelect from "./MultiSelect";
import RadioGroup from "./RadioGroup";

export default function StepInput({ step, value, onChange }) {
  if (step.type === "radio") {
    return (
      <RadioGroup options={step.options} value={value} onChange={onChange} />
    );
  }

  if (step.type === "multiselect") {
    return (
      <MultiSelect
        options={step.options}
        value={value || []}
        onChange={onChange}
      />
    );
  }

  if (step.type === "text") {
    return (
      <TextInput
        style={styles.input}
        placeholder={step.placeholder}
        value={value || ""}
        onChangeText={onChange}
        autoCapitalize="words"
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fff",
  },
});
