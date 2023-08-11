import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import ExpenseService from "../Services/ExpenseService";

const mockData = [
  {
    value: 1,
    field: "sample 1",
  },
  {
    value: 2,
    field: "sample 2",
  },
  {
    value: 3,
    field: "sample 3",
  },
  {
    value: 4,
    field: "sample 4",
  },
  {
    value: 5,
    field: "sample 5",
  },
  {
    value: 6,
    field: "sample 6",
  },
  {
    value: 7,
    field: "sample 7",
  },
  {
    value: 8,
    field: "sample 8",
  },
  {
    value: 9,
    field: "sample 9",
  },
  {
    value: 10,
    field: "sample 10",
  },
  {
    value: 11,
    field: "sample 11",
  },
];

const ExpenseAddModal = ({ visible, toggle, action, style }) => {
  const [categories, setCategories] = useState([]);

  const GetCategories = async () => {
    try {
      var res = await ExpenseService.getCategories();

      if (res.status === 200) {
        // console.log(res.data);
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    GetCategories();
  }, []);
  return (
    <Modal
      style={{ height: "100%" }}
      visible={visible}
      transparent={true}
      onRequestClose={() => toggle()}
    >
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Insert Expense</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggle}>
              <Icon name="close" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Amount (in ₹)"
              keyboardType="numeric"
            />
            {/* <TextInput style={styles.input} placeholder="Category" /> */}
            <Dropdown
              style={styles.input}
              data={categories}
              labelField="category"
              valueField="id"
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: 320,
    height: 270,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 16,
    borderWidht: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "indigo",
    padding: 15,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    color: "white",
  },
  content: {
    justifyContent: "center",
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    marginTop: 14,
    gap: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ddd",
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 20,
    fontSize: 16,
  },
  submitButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    borderRadius: 8,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ExpenseAddModal;
