const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getAllFromDatabase
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');


ideasRouter.param('id', (req,res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea
        next();
    } else {
        res.status(404).send();
    }
});
 
ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'))
});

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea)
});

ideasRouter.post('/', checkMillionDollarIdea, (req,res,next) => {
    const addIdea = addToDatabase('ideas', req.body);
    res.status(201).send(addIdea)
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    const ideaUpdated = updateInstanceInDatabase('ideas', req.body);
    res.send(ideaUpdated)
});

ideasRouter.delete('/:id', (req, res, next) => {
    const ideaDeleted = deleteFromDatabasebyId('ideas', req.params.id);
    if (ideaDeleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send()
}); 