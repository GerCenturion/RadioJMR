import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Biblia from "./src/components/Biblia/Biblia";
import Devocionales from "./src/components/Devocionales";
import RadioStream from "./src/components/RadioStrem";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Biblia") {
              iconName = "bible";
            } else if (route.name === "Devocionales") {
              iconName = "book";
            } else if (route.name === "RadioStream") {
              iconName = "headphones";
            }

            return (
              <FontAwesome5
                name={iconName}
                size={30}
                color="#900"
                solid
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Biblia"
          component={Biblia}
        />
        <Tab.Screen
          name="Devocionales"
          component={Devocionales}
        />
        <Tab.Screen
          name="RadioStream"
          component={RadioStream}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
