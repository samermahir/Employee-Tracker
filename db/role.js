const { prompt } = require("inquirer");
const db = require("./connection");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
    try {
      const role = 
        await db.query("SELECT  role.id, title, salary, department_id FROM role LEFT JOIN department ON role.department_id = department.id")

      return role
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
            
        } = await prompt([
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
                choices: department.map((department) => {
                    return {
                        value: department.id,
                        name: department.name
                    }
                })
            }
        ]);  

        await db.query(`INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
        const newRole = await viewAllRoles();
        
        return newRole;
          } catch (err) {
            console.log(err);
          }
        }
        
    module.exports = { viewAllRoles, addRole, }
