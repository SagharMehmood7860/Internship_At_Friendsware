import React from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
// Yahan humne custom item manager component register kia hai
import ExpenseItem from './components/ExpenseItem';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>My Expenses</Text>
      <ExpenseItem />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginVertical: 16, color: '#0f172a' },
});