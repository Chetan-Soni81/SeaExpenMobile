import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ExpenseItem from "../Components/ExpenseItem";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseAddModal from "../Components/ExpenseAddModal";
import ExpenseService from "../Services/ExpenseService";

const HomeScreen = ({ navigation }) => {
  const [n, setN] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [show, setShow] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const LogoutAction = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const toggle = () => setShow(!show);

  const GetExpenses = async () => {
    try {
      var res = await ExpenseService.getExpenses();

      if (res.status === 200) {
        //console.log(res.data);
        setExpenses(res.data);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        LogoutAction();
      }
    }
  };

  useEffect(() => {
    GetExpenses();
  }, []);

  return (
    <View style={styles.body}>
      <StatusBar backgroundColor={"#006060"} />

      <View style={styles.header}>
        <Text style={styles.title}>SeaExpen</Text>
        <TouchableOpacity style={styles.logout} onPress={LogoutAction}>
          <Icon style={styles.title} name="sign-out" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.container}>
          {expenses.map((x) => (
            <ExpenseItem
              key={x.id}
              amount={x.amount}
              Category={x.categoryName}
              recordDate={x.recordedDate}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.addSection}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShow(true)}
        >
          <Icon name="plus" style={styles.addIcon}></Icon>
        </TouchableOpacity>
      </View>

      <ExpenseAddModal
        style={styles.modal}
        visible={show}
        toggle={setShow}
        action={() => {}}
      />
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
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },
  container: {
    flex: 1,
    padding: 15,
    gap: 10,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  addSection: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "orange",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  addIcon: {
    fontSize: 24,
    color: "#fff",
  },
  logout: {
    borderColor: "#fff",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  modal: {
    position: "absolute",
    bottom: 10,
  },
});

export default HomeScreen;
