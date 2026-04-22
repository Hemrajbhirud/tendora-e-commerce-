const mysql = require('mysql2/promise');
async function test() {
    try {
        const pool1 = mysql.createPool({ host: 'localhost', user: 'root', password: 'newpassword', database: 'trendora_db' });
        await pool1.query('SELECT 1');
        console.log('TCP with password success!');
    } catch(e) { console.log('TCP with password error:', e.code, e.message); }
}
test();
