const { verifyToken } = require('./jwt');

module.exports = function (req, res, next) {
    const token = req.get('Authorization');
    //const token = req.headers['authorization'];
   // const token = req.headers.authorization.split(' ')[0];

    if (token) {
        verifyToken(token).then(result => {
            next();
        }).catch(err => {
            console.log(err);
            return res.json({ tokenState: 403, msg: 'invalid token' });
        })
    }
    else {
        return res.json({ tokenState: 403, msg: 'invalid token' });
    }
};