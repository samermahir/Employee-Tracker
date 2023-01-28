const { prompt } = require("inquirer");
const db = require("./connection");
const { viewAllRoles } = require("./role");

async function viewAllEmployees() {
    try {
      const employees = 
        await db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id")

      return employees;
    } catch (err) {
        console.log(err);
    }
}

async function addEmployee() {
    try {
    const roles = await viewAllRoles();
    const employees = await viewAllEmployees();
    const {
        first_Name,
        last_Name,
        role,
        manager
        
    } = await prompt([
        {
            type: "input",
            name: "first_Name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_Name",
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "Employees role?",
            choices: roles.map(role => {
                return {
                    value: role.id,
                    name: role.title
                }
            })
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: [
            ...employees.map(employee => {
                return {
                    value: employee.id,
                    name:  `${employee.first_name} ${employee.last_name}`
                }
            }),
            {
                value: null,
                name: 'No manager',
            }
        ]
        }
    ])

    await db.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${first_Name}", "${last_Name})", ${role}, ${manager})`)

    const newEmployees = await viewAllEmployees();

    return newEmployees;
  } catch (err) {
    console.log(err);
}

} 

async function updateRole() {
    try {
    const updateEmployee = await viewAllEmployees();
    const updateRole = await viewAllRoles();
    
    const {
        employee, newRole
    } = await prompt([
        {
            type: "list",
            name: "employee",
            message: "Employee that you would like to update",
            choices: updateEmployee.map((employee) => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }
            })
        },
        {
            type: "list",
            name: "newRole",
            message: "What is the new position",
            choices: updateRole.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        }
    ])

    await db.query(`UPDATE employee SET role_id = (${newRole}) WHERE id = (${employee})`)
    const updateEmployeeRole = await viewAllEmployees();
    return updateEmployeeRole; 
}catch (err) {
    console.log(err)
}
}
module.exports = { 
    viewAllEmployees,
    addEmployee,
    updateRole
}