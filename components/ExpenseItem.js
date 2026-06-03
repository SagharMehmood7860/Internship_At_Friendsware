import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard, 
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ExpenseItem() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleAddExpense = () => {
    // Validation Rules
    if (!title.trim()) {
      setError('Title cannot be empty.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    if (!category) {
      setError('Category must be selected.');
      return;
    }

    // Creating a unique expense entry object
    const newExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      category: category,
    };

    // Prepend new entry to the state array
    setExpenses([newExpense, ...expenses]);
    
    // Reset structural UI inputs
    setTitle('');
    setAmount('');
    setCategory('');
    setError('');
    Keyboard.dismiss();
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  // Compute live aggregate total of all entries
  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={{ flex: 1 }}>
      {/* Form Input Container */}
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Expense Title" 
          value={title} 
          onChangeText={setTitle} 
          placeholderTextColor="#94a3b8"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Amount" 
          value={amount} 
          onChangeText={setAmount} 
          keyboardType="numeric" 
          placeholderTextColor="#94a3b8"
        />
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category..." value="" color="#94a3b8" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Utilities" value="Utilities" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Output List */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses logged yet.</Text>
        }
        renderItem={({ item }) => (
          /* Individual Expense Row UI */
          <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <View style={styles.itemActions}>
              <Text style={styles.itemAmount}>PKR {item.amount.toLocaleString()}</Text>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Running Total Balance Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalValue}>PKR {totalAmount.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { paddingHorizontal: 20, marginBottom: 16 },
  input: { backgroundColor: '#ffffff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#cbd5e1', fontSize: 16, color: '#1e293b' },
  pickerContainer: { backgroundColor: '#ffffff', borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#cbd5e1', overflow: 'hidden' },
  picker: { height: 50, width: '100%' },
  addButton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
  errorText: { color: '#dc2626', marginBottom: 12, fontWeight: '500', textAlign: 'center' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  emptyText: { textAlign: 'center', color: '#64748b', marginTop: 40, fontSize: 15 },
  
  /* Item Card Styles */
  itemCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  itemCategory: { fontSize: 13, color: '#64748b', marginTop: 4, fontStyle: 'italic' },
  itemActions: { alignItems: 'flex-end' },
  itemAmount: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  deleteButton: { marginTop: 6, backgroundColor: '#fee2e2', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  deleteButtonText: { color: '#dc2626', fontSize: 12, fontWeight: '600' },

  footer: { padding: 20, backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#334155' },
  totalValue: { fontSize: 20, fontWeight: '700', color: '#2563eb' },
});