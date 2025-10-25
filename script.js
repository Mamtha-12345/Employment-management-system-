// Employee Management System JavaScript

// DOM elements
const employeeForm = document.getElementById('employeeForm');
const employeeList = document.getElementById('employeeList');
const cancelBtn = document.getElementById('cancelBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadEmployees();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    employeeForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('employeeId').value;
    const employee = {
        id: employeeId || Date.now().toString(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        position: document.getElementById('position').value,
        department: document.getElementById('department').value,
        salary: parseFloat(document.getElementById('salary').value)
    };
    
    if (employeeId) {
        updateEmployee(employee);
    } else {
        addEmployee(employee);
    }
    
    resetForm();
    loadEmployees();
}

// Add new employee
function addEmployee(employee) {
    const employees = getEmployeesFromStorage();
    employees.push(employee);
    saveEmployeesToStorage(employees);
}

// Update existing employee
function updateEmployee(updatedEmployee) {
    const employees = getEmployeesFromStorage();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
        employees[index] = updatedEmployee;
        saveEmployeesToStorage(employees);
    }
}

// Delete employee
function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        const employees = getEmployeesFromStorage();
        const filteredEmployees = employees.filter(emp => emp.id !== id);
        saveEmployeesToStorage(filteredEmployees);
        loadEmployees();
    }
}

// Edit employee
function editEmployee(id) {
    const employees = getEmployeesFromStorage();
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        document.getElementById('employeeId').value = employee.id;
        document.getElementById('name').value = employee.name;
        document.getElementById('email').value = employee.email;
        document.getElementById('position').value = employee.position;
        document.getElementById('department').value = employee.department;
        document.getElementById('salary').value = employee.salary;
        
        document.querySelector('.btn-primary').innerHTML = '<i class="fas fa-save"></i> Update Employee';
    }
}

// Load and display employees
function loadEmployees() {
    const employees = getEmployeesFromStorage();
    employeeList.innerHTML = '';
    
    if (employees.length === 0) {
        employeeList.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">No employees found. Add your first employee!</p>';
        return;
    }
    
    employees.forEach(employee => {
        const employeeCard = createEmployeeCard(employee);
        employeeList.appendChild(employeeCard);
    });
}

// Create employee card
function createEmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = 'employee-card';
    
    card.innerHTML = `
        <h3><i class="fas fa-user-circle"></i> ${employee.name}</h3>
        <p><i class="fas fa-envelope"></i> ${employee.email}</p>
        <p><i class="fas fa-briefcase"></i> ${employee.position}</p>
        <p><i class="fas fa-building"></i> ${employee.department}</p>
        <p><i class="fas fa-dollar-sign"></i> $${employee.salary.toLocaleString()}</p>
        <div class="actions">
            <button class="btn btn-edit" onclick="editEmployee('${employee.id}')">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-delete" onclick="deleteEmployee('${employee.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    return card;
}

// Reset form
function resetForm() {
    employeeForm.reset();
    document.getElementById('employeeId').value = '';
    document.querySelector('.btn-primary').innerHTML = '<i class="fas fa-save"></i> Save Employee';
}

// Local storage functions
function getEmployeesFromStorage() {
    const employees = localStorage.getItem('employees');
    return employees ? JSON.parse(employees) : [];
}

function saveEmployeesToStorage(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}
