const todolistService = require('../services/todolistService');

exports.create = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
     const data = await todolistService.create({
      title,
      description,
      dueDate,
      priority
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.lists = async (req, res) => {
  try {
    const data = await todolistService.lists();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result  = await todolistService.update(id,updateData);
    res.json({ message: 'Task updated successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req,res) =>{
  try{
    const id = req.params.id;
    const { is_done } = req.body;
    const result = await todolistService.updateStatus(id ,is_done);
    res.json({ result });
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result  = await todolistService.delete(id);
    res.json({ message: 'Task delete ', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};