const express = require('express');
const router = express.Router();
const { queryGuestsByOid, insertGuest ,insertGuest2,deleteGuest,updateGuest} = require('../../api/guest');
const Guest = require('../../domain/Guest');

router.get('/getGuests', (req, res) => {
    console.log(req.body.oid)
    let oid = req.query.oid;

    queryGuestsByOid(oid).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
});

router.get('/getGuest', (req, res) => {
   // console.log(req.body.oid)
    let oid = req.body.oid;
    queryGuestsByOid(oid).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
});

router.post('/insertGuest', (req, res) => {
    let guest = req.body;
    values = []
    console.log(guest)
    values.push([new Guest(guest.oid, guest.gid, guest.name)]);
    //await insertGuest(values);
    insertGuest2(guest.oid, guest.gid, guest.name).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
});

router.post('/delGuest', (req, res) => {
    let guest = req.body;
    console.log(guest)
    deleteGuest(guest.oid).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
});

router.post('/updateGuest', (req, res) => {
    let guest = req.body;
    console.log(guest)
    updateGuest(guest.gid, guest.name,guest.oid).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;