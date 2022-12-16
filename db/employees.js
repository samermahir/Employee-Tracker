const { default: inquirer } = require("inquirer");
const db = require("./connection");

async function viewAllEmployees() {
    try {
      const employees = 
        await db.query("SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id")

      return employees;
    } catch (err) {
        console.log(err);
    }
}

async function addEmployee() {
    try {
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

    await db.query(`INSERT into employee (first_name, last_name) VALUES ("${firstName}", "${lastName})"`)
    const newEmployees = await viewAllEmployees()

    return newEmployees;
  } catch (err) {
    console.log(err);
}

} 
module.exports = { 
    viewAllEmployees,
    addEmployee
}