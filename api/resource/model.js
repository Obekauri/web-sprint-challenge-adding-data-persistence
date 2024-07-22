const db = require('../../data/dbConfig')


function getAll() {
    return db('resources')
}

function insert(recource) {
    return db('resources')
        .insert(recource)
        .then(resource_id => {
            return db('resources').where('resource_id', resource_id[0])
                .then(result => {
                    return result[0]
                })
        })
}
module.exports = {
    getAll,
    insert
}
