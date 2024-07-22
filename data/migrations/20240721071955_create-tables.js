exports.up = function(knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments(`project_id`) // this will add primary key 
        tbl.string('project_name', 255)
            .notNullable()
        tbl.text(`project_description`)
        tbl.boolean(`project_completed`)
            .defaultTo(false)
    })
    .createTable('resources', tbl => {
        tbl.increments('resource_id'),
        tbl.string('resource_name')
            .unique()
            .notNullable()
        tbl.string('resource_description')
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id')
        tbl.string('task_description')
            .notNullable()
        tbl.text('task_notes')
        tbl.boolean('task_completed')
            .defaultTo(false)
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
