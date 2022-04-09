const express = require('express');
const router = express.Router();
const axios = require('axios');
const { queryUserByUid, insertUser } = require('../../api/user');
const weappCofig = require('../../module/weappConfig');
const cache = require('../../module/cache');
const { createSessionId } = require('../../module/utils');
const bodyParser = require('body-parser')

router.post('/loginUser', async (req, res) => {
    console.log(req.body.code);
    try {
        let wxResult = await new Promise((resolve,reject)=>{
            axios.get('https://api.weixin.qq.com/sns/jscode2session', {
                params: {
                    appid: weappCofig.appid,
                    secret: weappCofig.secret,
                    js_code: req.body.code,
                    grant_type: 'authorization_code',
                }
            }
            ).then(res=>{
                console.log(res);
                resolve(res)
            });
        })

        console.log(wxResult.data.openid) 
        let result = await queryUserByUid(wxResult.data.openid);
        //let res = wxResult.data.openid;
        //console.log(res);
        if (!result.length) {
            console.log(result);
            await insertUser(wxResult.data.openid);

        }

        let data = {};
        data.phone = result[0]?.phone ?? null;
        data.sessionId = createSessionId();

        await cache.add(data.sessionId, { uid: wxResult.data.openid, sessionKey: wxResult.data.session_key });
        console.log(data.sessionId)
        res.json({ state: true, data });
    } catch (err) {
        console.log(err);
        res.json({ state: false, msg: 'error' });
    }
 }
);

module.exports = router; 