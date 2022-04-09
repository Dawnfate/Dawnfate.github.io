const express = require('express');
const router = express.Router();
const { queryAdminByUsername } = require('../../api/admin');
const { getToken } = require('../../module/jwt');
const { encryptPasswordSync } = require('../../module/encrypt');


router.post('/login', (req, res) => {
    queryAdminByUsername(req.body.username).then(result => {
        console.log(result);
        if (result.length && encryptPasswordSync(req.body.password) === result[0].password
            //req.body.password === result[0].password
            //encryptPasswordSync(req.body.password) === result[0].password
        
           // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsInBlcm1pc3Npb24iOjAsImlhdCI6MTY0NTc5ODg1MywiZXhwIjoxNjQ1ODg1MjUzfQ.m2r5OJbKZ2pugqB8EbVmbtT_VMz-8P5LgOdZJR1rMfo"

        ) {
            const token = getToken({ username: result[0].username, permission: result[0].permission });
            res.json({ state: true, token });
        }
        else {
            res.json({ state: false, msg: '用户名或密码错误' });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;