const minionsRouter = require('express').Router();

module.exports = minionsRouter;
 
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion
        next();
    } else {
        res.status(404).send();
    }
})

minionsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('minions'));
});
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion)
}); 
minionsRouter.post('/', (req, res, next) => {
    const addMinion = addToDatabase('minions', req.body);
    res.status(201.).send(addMinion)
});
minionsRouter.put('/:minionId', (req, res, next) => {
    const minionUpdated = updateInstanceInDatabase('minions', req.body);
    res.send(minionUpdated);
});
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (minionDeleted) {
        res.status(204)
    } else {
        res.status(404)
    }
    res.send();
});