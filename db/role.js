const db = require("./connection");

async function viewAllRoles() {
    try {
      const roles = 
        await db.query("SELECT * FROM role")

      return roles
    } catch (err) {
        console.log(err);
    }
}

module.exports = { viewAllRoles }