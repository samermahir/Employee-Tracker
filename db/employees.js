const { default: inquirer } = require("inquirer");
const db = require("./connection");

async function viewAllEmployees() {
    try {
      const employees = 
        await db.query("SELECT * FROM employee")

      return employees;
    } catch (err) {
        console.log(err);
    }
}

async function addEmployee() {
    const {
        firstName,
        lastName
    } = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        }
    ])

    await db.query('INSERT into')
}

module.exports = { 
    viewAllEmployees,
    addEmployee
}