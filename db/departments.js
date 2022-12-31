const db = require("./connection");
const { prompt } = require("inquirer");

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
    // const departments = await viewAllDepartments();
    const {
        name    
    } = await prompt([
        {
            type: "input",
            name: "department",
            message: "What department do you want to add?"
        }
      ])
      await db.query(`INSERT into department (name) VALUES ("${name}")`)

      const newDepartment = await viewAllDepartments();
      return newDepartment 
    }catch(err) {
      console.log(err)
    
        }
}

module.exports = { viewAllDepartments, addDepartments }