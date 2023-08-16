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

const ExpenseAddModal = ({ visible, toggle, action }) => {
  const [categories, setCategories] = useState([]);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

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

  const SubmitAction = () => {
    if (amount && category) {
      action(amount, category, note);
    }
  };
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
            <Text style={styles.title}>Add Expense</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggle}>
              <Icon name="close" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Amount (in ₹):</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              inputMode="decimal"
              autoFocus={true}
              onChangeText={(text) => setAmount(text)}
            />
            {/* <TextInput style={styles.input} placeholder="Category" /> */}
            <Text style={styles.label}>Category:</Text>
            <Dropdown
              style={styles.input}
              data={categories}
              placeholder="--Select Category--"
              placeholderStyle={{ color: "#999" }}
              labelField="category"
              valueField="id"
              onChange={(val) => setCategory(val.id)}
            />
            <Text style={styles.label} onChangeText={(text) => setNote(text)}>
              Note:
            </Text>
            <TextInput
              style={styles.textarea}
              multiline={true}
              numberOLines={2}
              placeholder={"Enter a note."}
            ></TextInput>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={SubmitAction}
            >
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
    height: "auto",
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
    marginVertical: 14,
    gap: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
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
  textarea: {
    width: "100%",
    borderColor: "#ddd",
    height: 66,
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
