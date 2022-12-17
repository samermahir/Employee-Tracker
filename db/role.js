const db = require("./connection");

async function viewAllRoles() {
    try {
      const role = 
        await db.query("SELECT * FROM role")

      return role
    } catch (err) {
        console.log(err);
    }
}

module.exports = { viewAllRoles }