import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/FontAwesome";
import ExpenseService from "../Services/ExpenseService";

const DetailScreen = ({ navigation, route }) => {
  const [expId, setExpId] = useState(route.params.expenseId);
  const [expense, setExpense] = useState();
  const FetchExpense = async () => {
    console.log("Action invoked");
    try {
      var res = await ExpenseService.getExpensesById(expId);

      if (res.status === 200) {
        console.log(res.data);
        setExpense(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchExpense();
  }, []);

  const LogoutAction = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };
  return (
    <View sytle={styles.body}>
      <StatusBar backgroundColor={"#006060"} />

      <View style={styles.header}>
        <View style={styles.titleContain}>
          <Image
            style={styles.logo}
            source={require("../assets/SeaExpenLogo.png")}
          />
          <Text style={styles.title}>SeaExpen</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={LogoutAction}>
          <Icon style={styles.title} name="sign-out" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <View style={styles.container}>
          <Text>{expId}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "teal",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3.95,
    elevation: 4,
  },
  logo: {
    height: 36,
    resizeMode: "contain",
    width: 36,
    borderColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 32,
  },
  titleContain: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },
  container: {
    padding: 15,
    backgroundColor: "#fff",
    minHeight: 400,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});

export default DetailScreen;
