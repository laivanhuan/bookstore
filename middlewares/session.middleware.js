const shortid = require('shortid');

const Session = require('../models/session');

module.exports = async (req, res, next) => {
	if (!req.signedCookies.sessionId){
		let sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {signed: true});

		Session.create({
            id: sessionId
        });
	}
	next();
}