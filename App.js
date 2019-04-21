/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./src/screens/Home";
import Daily from "./src/screens/Daily";
import Login from "./src/screens/Login";
import Loading from "./src/screens/Loading";

const TabNavigator = createMaterialTopTabNavigator({
  Today: {
    screen: Home,
  },
  Daily: { screen: Daily }
}, {
    initialRouteName: 'Today',
    swipeEnabled: true,
    defaultNavigationOptions: {
      tabBarVisible: false,
    }
  })

const AppNavigator = createStackNavigator(
  {
    Loading: { screen: Loading },
    Login: { screen: Login },
    Home: { screen: TabNavigator }
  }, {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      header: null
    }, 
  }
);

export default createAppContainer(AppNavigator);