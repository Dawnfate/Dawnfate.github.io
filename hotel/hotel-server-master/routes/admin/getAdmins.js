const express = require('express');
const router = express.Router();
const { queryAllAdmins } = require('../../api/admin');

router.post('/getAdmins', (req, res) => {
    console.log(req.body)
    console.log((req.body.username!="") && (req.body.password!=""))
    if ((req.body.username!="") && (req.body.password!="")) {
        console.log(1)
        queryAllAdmins().then(result => {
            console.log(result)
            for (let admin of result) {
                Reflect.deleteProperty(admin, 'password');
                Reflect.deleteProperty(admin, 'idkey');
            }
            console.log(result);
            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }
});

module.exports = router;