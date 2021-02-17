const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;
 
const {
    addToDatabase,
    getAllFromDatabase,
    createMeeting,
    deleteAllFromDatabase
} = require('./db'); 

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});
 
meetingsRouter.post('/', (req, res, next) => {
    const addMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(addMeeting)
});

meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});