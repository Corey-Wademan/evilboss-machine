const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('/minions');


apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);



module.exports = apiRouter;
