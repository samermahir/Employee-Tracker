const { default: inquirer } = require("inquirer");
const db = require("./connection");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
    try {
      const roles = 
        await db.query("SELECT * FROM role")

      return roles
    } catch (err) {
        console.log(err);
    }
}

async function addRole() {
        try {
        const department= await viewAllDepartments();
        const {
            title,
            salary,
            department_id
            
        } = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title or role of the employee?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the employee?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What is the department of the employee?",
                choices: department.map(department => {
                    return {
                        value: department.id,
                        name: department.name
                    }
                })
            }
        ]);  

        await db.query(`INSERT into role (title, salary, department_id) VALUES (${title}, ${salary}, ${department_id})`)
        const addRole = await viewAllRoles()
        
        return addRole;
          } catch (err) {
            console.log(err);
          }
        }
    module.exports = { viewAllRoles, addRole, }
