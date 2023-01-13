
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartments } = require('./db/departments');
const { viewAllEmployees, addEmployee, updateRole } = require('./db/employees');
const { viewAllRoles, addRole } = require('./db/role');


const start = async (s) => {
    if (s)  console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'what would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add new department',
                'Add a role',
                'Add an employee',
                'Update employee role',
                'Exit'
            ]
        }
        
    ])

    switch (choice) {
        case 'View all departments':
            const departments = await viewAllDepartments()
            console.table(departments)
            break;

        case 'View all employees':
            const employees = await viewAllEmployees()
            console.table(employees)
            break;
        
        case 'View all roles':
            const roles = await viewAllRoles()
            console.table(roles)
            break;

        case 'Add an employee':
            const newEmployees = await addEmployee()
            console.table(newEmployees)
            break;

        case 'Add new department':
            const newDepartments = await addDepartments()
            console.table(newDepartments)
            break;

        case 'Add a role':
            const newRoles = await addRole()
            console.table(newRoles)
            break;

        case 'Update employee role':
            const updateEmployeeRole = await updateRole()
            console.table(updateEmployeeRole)
            break;

        case 'Exit':
            console.log('Goodbye');
            process.exit();
            
    }
    start(false);
}

start(true);
