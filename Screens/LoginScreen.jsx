import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import UserServices from "../Services/UserServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(true);

  const Verification = async () => {
    try {
      var res = await UserServices.Verify();
      if (res.status === 200) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error.message);
      AsyncStorage.removeItem("token");
      setLoading(false);
    }
  };

  useEffect(() => {
    Verification();
  }, []);

  const LoginAction = async () => {
    console.log("Action invoked");
    setLoading(true);
    var user = {
      username,
      password,
    };

    console.log(user);

    try {
      var res = await UserServices.Login(user);

      if (res.status === 200) {
        AsyncStorage.setItem("token", res.data);

        console.log(res.data);

        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Errror", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.contanier}>
      <Text style={styles.title}>SeaExpen</Text>
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
        ></ActivityIndicator>
      ) : (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.login} onPress={() => LoginAction()}>
            <Text style={styles.loginText} onPress={() => LoginAction()}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contanier: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    gap: 20,
  },
  input: {
    height: 60,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 30,
    paddingLeft: 20,
    fontSize: 16,
  },
  login: {
    width: "70%",
    height: 60,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  loading: {},
});

export default LoginScreen;
