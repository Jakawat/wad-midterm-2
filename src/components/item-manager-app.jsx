import React, { useState } from 'react';
import deleteIcon from '../assets/delete.svg';
import penIcon from '../assets/ink_pen.svg';
import flatwareIcon from '../assets/flatware.svg';
import electricalIcon from '../assets/electrical_services.svg';

const ItemManagement = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Color Pencil set 12", category: "Stationary", price: 11.00 },
    { id: 2, name: "Small Kitty Lamp", category: "Appliance", price: 44.88 },
    { id: 3, name: "Knife Set 4pcs", category: "Kitchenware", price: 23.11 }
  ]);

  const [newItem, setNewItem] = useState({ name: '', category: '', price: '' });
  const [error, setError] = useState('');

  const categoryIcons = {
    Stationary: penIcon,
    Kitchenware: flatwareIcon,
    Appliance: electricalIcon
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      setError("Item name must not be empty");
      return;
    }
    
    const isDuplicate = items.some(item => 
      item.name.toLowerCase() === newItem.name.toLowerCase()
    );
    if (isDuplicate) {
      setError("Item must not be duplicated"); 
      return
    }

    if (!newItem.category) {
      setError("Please select a category"); 
      return;
    }

    if (parseFloat(newItem.price) < 0 || newItem.price === '') {
      setError("Price must not be less than 0"); 
      return;
    }

    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { ...newItem, id: nextId, price: parseFloat(newItem.price).toFixed(2) }]);
    
    setNewItem({ name: '', category: '', price: '' });
    setError('');
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Item Management</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img src={categoryIcons[item.category]} alt={item.category} width="24" />
              </td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <img src={deleteIcon} alt="Delete" width="20" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input 
                type="text" 
                value={newItem.name} 
                onChange={(e) => setNewItem({...newItem, name: e.target.value})} 
              />
            </td>
            <td>
              <select 
                value={newItem.category} 
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              >
                <option value="">Select Category</option>
                <option value="Stationary">Stationary</option>
                <option value="Kitchenware">Kitchenware</option>
                <option value="Appliance">Appliance</option>
              </select>
            </td>
            <td>
              <input 
                type="number" 
                value={newItem.price} 
                onChange={(e) => setNewItem({...newItem, price: e.target.value})} 
              />
            </td>
            <td>
              <button onClick={handleAddItem}>Add Item</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ItemManagement;