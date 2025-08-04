const db = require('../config/db');

exports.create = ({ title, description, dueDate, priority }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO tasks (title, description, due_date, priority ) VALUES (?, ?, ?, ?)';
    const values = [title, description, dueDate, priority];
    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


exports.lists = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.update = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE tasks SET 
        title = ?, 
        description = ?, 
        due_date = ?, 
        priority = ?,
      WHERE id = ?
    `;
    const values = [
      updatedData.title,
      updatedData.description,
      updatedData.due_date,
      updatedData.priority,
      id
    ];
    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.updateStatus = (id, is_done) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE tasks SET is_done = ? WHERE id = ?`;
    db.query(query, [is_done, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM tasks WHERE id = ?`;
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};