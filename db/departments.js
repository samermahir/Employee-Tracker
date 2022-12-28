const db = require("./connection");
const { default: inquirer } = require("inquirer");

async function viewAllDepartments() {
    try {
      const departments = 
        await db.query("SELECT * FROM department")

      return departments
    } catch (err) {
        console.log(err);
    }
}

async function addDepartments() {
  try {
    const departments = await viewAllDepartments();
    const {
        name,    
    } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What department do you want to add?"
        }
      ])
      await db.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${name}")`)
      const newDepartments = await viewAllDepartments
      return newDepartments 
    }catch(err) {
      console.log(err)
    
        }
}

module.exports = { viewAllDepartments, addDepartments }