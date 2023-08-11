import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ExpenseItem = ({ amount, Category, recordDate }) => {
  const [date, setDate] = useState(new Date());
  return (
    <View style={styles.body}>
      <Text style={styles.cost}>₹ {amount.toFixed(2) || "00.00"}</Text>
      <View style={styles.section}>
        <Text style={styles.Category}>{Category || "Unknown"}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Date: </Text>
          <Text>
            {new Date(recordDate).toLocaleDateString("en-In") || "N/A"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time: </Text>
          <Text>
            {new Date(recordDate).toLocaleTimeString("en-In") || "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    width: 160,
    height: 120,
    borderRadius: 8,
    padding: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  cost: {
    fontSize: 18,
    fontWeight: "bold",
  },
  Category: {
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "500",
  },
});

export default ExpenseItem;
