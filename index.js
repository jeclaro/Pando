const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const data = {
  goals: [],
  projects: [],
  tasks: [],
  notes: [],
  events: []
};
let idCounter = 1;

function addItem(type, item) {
  item.id = idCounter++;
  data[type].push(item);
  return item;
}

['goals','projects','tasks','notes','events'].forEach(type => {
  app.get(`/api/${type}`, (req,res) => res.json(data[type]));
  app.post(`/api/${type}`, (req,res) => res.json(addItem(type, req.body)));
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
