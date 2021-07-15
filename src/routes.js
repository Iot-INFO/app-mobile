import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Context } from './context';

import Login from './pages/Login';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';

import CustomMenu from './components/CustomMenu';
import Bases from './pages/Bases';
import Bikes from './pages/Bikes';
import Travels from './pages/Travels';
import Scanner from './pages/Scanner';
import Camera from './pages/Scanner/Camera';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Running from './pages/Running';
import Contact from './pages/Contact';
import About from './pages/About';
import RouteTravel from './components/Travel/Route';

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();
const PublicStack = createStackNavigator();
const AppTabs = createBottomTabNavigator();

function LoadingRoute() {
  return (
    <PublicStack.Navigator initialRouteName={Verify}>
      <PublicStack.Screen
        name="Verify"
        component={Verify}
        options={{ headerShown: false }}
      />
    </PublicStack.Navigator>
  );
}

function PublicRoutes() {
  return (
    <PublicStack.Navigator initialRouteName={Landing}>
      <PublicStack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <PublicStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <PublicStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </PublicStack.Navigator>
  );
}

function InitialTabRoutes() {
  return (
    <AppStack.Navigator
      initialRouteName={Home}
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Bases" component={Bases} />
      <AppStack.Screen name="Payment" component={Payment} />
      <AppStack.Screen name="Running" component={Running} />
      <AppStack.Screen name="Travels" component={Travels} />
      <AppStack.Screen name="RouteTravel" component={RouteTravel} />
      <AppStack.Screen name="Contact" component={Contact} />
      <AppStack.Screen name="About" component={About} />
      <AppStack.Screen name="Scanner" component={Scanner} />
      <AppStack.Screen name="Camera" component={Camera} />
    </AppStack.Navigator>
  );
}

function AppRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicial"
      drawerType="slide"
      drawerContent={(props) => <CustomMenu {...props} />}
    >
      <Drawer.Screen name="InitialTabRoutes" component={InitialTabRoutes} />
    </Drawer.Navigator>
  );
}

export default function Routes() {
  const { signed, loading } = useContext(Context);

  return (
    <NavigationContainer>
      {loading ? (
        <LoadingRoute />
      ) : (
        <>{signed ? <AppRoutes /> : <PublicRoutes />}</>
      )}
    </NavigationContainer>
  );
}
