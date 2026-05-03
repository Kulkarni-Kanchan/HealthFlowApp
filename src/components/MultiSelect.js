import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MultiSelect({ options, value = [], onChange }) {
  function toggle(opt) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  }

  return (
    <View>
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.option, selected && styles.selected]}
            onPress={() => toggle(opt)}
            activeOpacity={0.8}
          >
            <View
              style={[styles.checkbox, selected && styles.checkboxSelected]}
            >
              {selected && <Text style={styles.check}>✓</Text>}
            </View>
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
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
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#C0C0C0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxSelected: { borderColor: "#4F46E5", backgroundColor: "#4F46E5" },
  check: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  label: { fontSize: 15, color: "#333" },
  labelSelected: { color: "#4F46E5", fontWeight: "600" },
});
