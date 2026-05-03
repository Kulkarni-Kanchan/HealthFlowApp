import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RadioGroup({ options, value, onChange }) {
  return (
    <View>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[styles.option, value === opt && styles.selected]}
          onPress={() => onChange(opt)}
          activeOpacity={0.8}
        >
          <View style={[styles.radio, value === opt && styles.radioSelected]}>
            {value === opt && <View style={styles.radioInner} />}
          </View>
          <Text style={[styles.label, value === opt && styles.labelSelected]}>
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  selected: { borderColor: "#4F46E5", backgroundColor: "#EEF2FF" },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#C0C0C0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioSelected: { borderColor: "#4F46E5" },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4F46E5",
  },
  label: { fontSize: 15, color: "#333" },
  labelSelected: { color: "#4F46E5", fontWeight: "600" },
});
