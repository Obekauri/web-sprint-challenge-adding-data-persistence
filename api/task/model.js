const db = require('../../data/dbConfig')

function getAll() {
    return db('tasks as ts')
    .leftJoin(
        'projects as pr',
        'ts.project_id',
        'pr.project_id'
    )
    .select(
        'ts.*',
        'pr.project_name',
        'pr.project_description'
    )
    .then(rows => {
        rows.forEach(row => {
            row.task_completed = Boolean(row.task_completed);
        });
        return rows; // Return the transformed rows
    });
}

function insert(task){
    return db('tasks')
        .insert(task)
        .then(task_id => {
            return db('tasks').where('task_id', task_id[0])
                .then(result => {
                    result[0].task_completed = Boolean(result[0].task_completed)
                    return result[0]
                })
        })
}


module.exports = {
    getAll,
    insert,
}
