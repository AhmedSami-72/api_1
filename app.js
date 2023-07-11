const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let orders = [
  { id: 1, price: 100, description: 'Laptop' },
  { id: 2, price: 200, description: 'Smartphone' },
  { id: 3, price: 50, description: 'Headphones' }
];

// Create New Order
app.post('/api/orders', (req, res) => {
  const { price, description } = req.body;

  const newOrder = {
    id: orders.length + 1,
    price,
    description
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

// Update Order
app.put('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { price, description } = req.body;

  const order = orders.find(o => o.id === id);

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
  } else {
    order.price = price;
    order.description = description;

    res.json(order);
  }
});

// Delete Order
app.delete('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);

  orders = orders.filter(o => o.id !== id);

  res.json({ message: 'Order deleted successfully' });
});

// Get All Orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});