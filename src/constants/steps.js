// Define all steps. Conditional steps have `showIf`.
export const ALL_STEPS = [
  {
    id: "step1",
    title: "Your Age Range",
    type: "radio",
    question: "What is your age range?",
    options: ["Under 18", "18–25", "26–40", "41–60", "60+"],
    required: true,
  },
  {
    id: "step2",
    title: "Your Goal",
    type: "radio",
    question: "What is your primary health goal?",
    options: [
      "Lose Weight",
      "Build Muscle",
      "Improve Endurance",
      "Stay Healthy",
    ],
    required: true,
  },
  {
    id: "step3",
    title: "Diet Preference",
    type: "multiselect",
    question: "Select your dietary preferences:",
    options: ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "No Restrictions"],
    required: true,
    // Conditional: only show if goal is Lose Weight or Build Muscle
    showIf: (answers) =>
      ["Lose Weight", "Build Muscle"].includes(answers.step2),
  },
  {
    id: "step4",
    title: "Activity Level",
    type: "radio",
    question: "How active are you currently?",
    options: [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
    ],
    required: true,
  },
  {
    id: "step5",
    title: "Your Name",
    type: "text",
    question: "What should we call you?",
    placeholder: "Enter your name",
    required: true,
  },
];

export function getVisibleSteps(answers) {
  return ALL_STEPS.filter((step) => !step.showIf || step.showIf(answers));
}
