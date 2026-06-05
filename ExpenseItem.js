import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard, 
  ScrollView,
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ExpenseItem() {
  // --- STATES ---
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  // Task B2: Active filter tab ko track karne ke liye state (Default: 'All')
  const [activeTab, setActiveTab] = useState('All');

  // --- FUNCTIONS ---

  // 1. Expense Add Karne Ka Function
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

    // Naya expense object banana
    const newExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      category: category,
    };

    // Naye item ko list ke shuru me add karna
    setExpenses([newExpense, ...expenses]);
    
    // Inputs ko khali karna
    setTitle('');
    setAmount('');
    setCategory('');
    setError('');
    Keyboard.dismiss();
  };

  // 2. Expense Delete Karne Ka Function
  const handleDelete = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  // --- DEMO FILTRATION LOGIC (Task B2) ---
  // Agar 'All' select hai to saari list dikhao, warna sirf selected category wali
  const filteredExpenses = activeTab === 'All' 
    ? expenses 
    : expenses.filter(item => item.category === activeTab);


  // --- LIVE AGGREGATE TOTAL (Task B4) ---
  // Filtered list ke mutabiq total amount calculate karna
  const totalAmount = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      
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

      {/* --- TASK B2: HORIZONTAL FILTER TABS --- */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {['All', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Other'].map((tabName) => (
            <TouchableOpacity
              key={tabName}
              style={[
                styles.tabButton,
                activeTab === tabName && styles.activeTabButton // Active tab par blue background lagane ke liye
              ]}
              onPress={() => setActiveTab(tabName)} // Click karne par tab change hoga
            >
              <Text style={[styles.tabButtonText, activeTab === tabName && styles.activeTabButtonText]}>
                {tabName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Scrollable Output List (Using Filtered Data) */}
      <FlatList
        data={filteredExpenses} // Ab yeh filtered list render karega
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses logged under this category.</Text>
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
        <Text style={styles.totalLabel}>Total ({activeTab}):</Text>
        <Text style={styles.totalValue}>PKR {totalAmount.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { paddingHorizontal: 20, marginBottom: 10, paddingTop: 10 },
  input: { backgroundColor: '#ffffff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#cbd5e1', fontSize: 16, color: '#1e293b' },
  pickerContainer: { backgroundColor: '#ffffff', borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#cbd5e1', overflow: 'hidden' },
  picker: { height: 50, width: '100%' },
  addButton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#ffffff', fontWeight: '#600', fontSize: 16 },
  errorText: { color: '#dc2626', marginBottom: 12, fontWeight: '500', textAlign: 'center' },
  
  /* Filter Tabs Styles */
  filterContainer: { paddingVertical: 10, backgroundColor: '#ffffff', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  filterTitle: { fontSize: 14, fontWeight: '600', color: '#64748b', paddingHorizontal: 20, marginBottom: 6 },
  tabScroll: { paddingHorizontal: 15, flexDirection: 'row' },
  tabButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f1f5f9', marginRight: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  activeTabButton: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  tabButtonText: { fontSize: 13, fontWeight: '500', color: '#475569' },
  activeTabButtonText: { color: '#ffffff', fontWeight: '600' },

  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  emptyText: { textAlign: 'center', color: '#64748b', marginTop: 40, fontSize: 15 },
  
  /* Item Card Styles */
  itemCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  itemCategory: { fontSize: 13, color: '#2563eb', marginTop: 4, fontWeight: '500' },
  itemActions: { alignItems: 'flex-end' },
  itemAmount: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  deleteButton: { marginTop: 6, backgroundColor: '#fee2e2', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  deleteButtonText: { color: '#dc2626', fontSize: 12, fontWeight: '600' },

  footer: { padding: 20, backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#334155' },
  totalValue: { fontSize: 20, fontWeight: '700', color: '#2563eb' },
});