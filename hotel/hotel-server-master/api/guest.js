const db = require('../db');

function queryGuestsByOid(oid) {
    const sql = `select * from guest where oid = ?`;
    return db.query(sql, [oid]);
}

function queryGuestByGid(gid) {
    const sql = `select * from guest where gid = ?`;
    return db.query(sql, [gid]);
}

function insertGuest(values) {
    const sql = `insert into guest(oid, gid, name) values ?`;
    return db.query(sql, [values]);
}

function insertGuest2(oid,gid,name) {
    const sql = `insert into guest(oid, gid, name) values (?, ?, ?)`;
    return db.query(sql, [oid,gid,name]);
}

function deleteGuest(oid) {
    const sql = `delete from guest where oid =  ?`;
    return db.query(sql, [oid]);
}

function updateGuest(gid,name,oid) {
    const sql = `update guest set gid = ? and name = ? where oid =  ?`;
    return db.query(sql, [gid,name,oid]);
}

module.exports = {
    queryGuestsByOid,
    queryGuestByGid,
    insertGuest,
    insertGuest2,
    deleteGuest,
    updateGuest,
};