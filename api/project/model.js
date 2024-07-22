const db = require('../../data/dbConfig')

function getAll() {
    return db('projects')
    .then(rows => {
        rows.forEach(row => {
            row.project_completed = Boolean(row.project_completed);
        });
        return rows; // Return the transformed rows
    });
}

function insert(project) {
    return db('projects')
        .insert(project)
        .then(project_id => {
            return db('projects').where('project_id', project_id[0])
                .then(result => {
                    result[0].project_completed = Boolean(result[0].project_completed)
                    return result[0]
                })
        })
}

module.exports = {
    getAll,
    insert,
}
