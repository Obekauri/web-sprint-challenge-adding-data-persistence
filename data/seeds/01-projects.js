const tasks = [
    { task_notes: 'task account-01', task_description: 'task Something From Account-01', project_id: 1},
    { task_notes: 'task account-02', task_description: 'task Something From Account-02', project_id: 2},
  ]
  
  exports.accounts = tasks
  
  exports.seed = function (knex, Promise) {
    return knex('tasks').truncate()
      .then(function () {
        return knex('tasks').insert(tasks);
      });
  };