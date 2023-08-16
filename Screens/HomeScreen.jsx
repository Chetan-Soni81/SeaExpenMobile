import React, { useEffect, useState } from "react";
import {
  Image,
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
  const [show, setShow] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const LogoutAction = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const CreateExpense = async (amount, category, note) => {
    var data = {
      amount,
      category,
      note,
    };

    console.log(data);

    try {
      var res = await ExpenseService.createExpense(data);

      if (res.status === 200) {
        GetExpenses();
        setShow(false);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const toggle = () => {
    setShow(!show);
  };

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

      <ScrollView>
        <View style={styles.container}>
          {expenses.map((x) => (
            <TouchableOpacity
              key={x.id}
              onPress={() => navigation.navigate("Detail", { expenseId: x.id })}
            >
              <ExpenseItem
                amount={x.amount}
                Category={x.categoryName}
                recordDate={x.recordedDate}
              />
            </TouchableOpacity>
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
        action={CreateExpense}
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
