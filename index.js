
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments } = require('./db/departments');
const { viewAllEmployees } = require('./db/employees');


const start = async (s) => {
    if (s)  console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'what would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
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
        case 'Exit':
            console.log('Goodbye');
            process.exit();
            
    }
    start(false);
}

start(true);
