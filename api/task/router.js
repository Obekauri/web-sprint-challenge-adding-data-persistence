const router = require('express').Router()
const Task = require('../task/model')

router.get('/', (req, res, next) => {
  Task.getAll()
      .then(project => {
        res.json(project)
      })
      .catch(next)
})

router.post('/', (req, res, next) => {
  const newProject = req.body

  Task.insert(newProject)
    .then(addProject => {
      res.status(201).json(addProject)
    })
    .catch(next)
})



router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: 'Something wrong inside Task routers',
      err: err.message,
      stack: err.stack,
    })
})

module.exports = router;
