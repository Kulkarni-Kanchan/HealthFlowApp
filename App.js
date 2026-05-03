import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRegistry } from "react-native";
import { FlowProvider } from "./src/context/FlowContext";
import StepScreen from "./src/screens/StepScreen";
import SummaryScreen from "./src/screens/SummaryScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <FlowProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Step" component={StepScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FlowProvider>
  );
}

AppRegistry.registerComponent("main", () => App);

export default App;
