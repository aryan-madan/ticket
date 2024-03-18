const ticketName = document.getElementById('customerName');
const mobileNumber = document.getElementById('mobileNumber');
const purchaseBtn = document.getElementById('purchaseBtn');
const ticketList = document.getElementById('ticketList');
const categoryBtns = document.querySelectorAll('.category-btn');
const printName = document.getElementById('printName');
const printMobile = document.getElementById('printMobile');
const printType = document.getElementById('printType');
const printBtn = document.getElementById('printBtn');
const purchaseTabBtn = document.getElementById('purchaseTabBtn');
const viewTabBtn = document.getElementById('viewTabBtn');
const purchaseTab = document.getElementById('purchaseTab');
const viewTab = document.getElementById('viewTab');

let selectedCategory = null;
let selectedTicket = null;

// Load tickets from localStorage on page load
window.addEventListener('load', () => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    updateTicketList(tickets);
});

// Add a new ticket
purchaseBtn.addEventListener('click', () => {
    const customerNameValue = ticketName.value.trim();
    const mobileNumberValue = mobileNumber.value.trim();
    if (customerNameValue && mobileNumberValue && selectedCategory) {
        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets.push({ name: customerNameValue, mobile: mobileNumberValue, category: selectedCategory });
        localStorage.setItem('tickets', JSON.stringify(tickets));
        updateTicketList(tickets);
        ticketName.value = '';
        mobileNumber.value = '';
    }
});

// Update the ticket list
function updateTicketList(tickets) {
    ticketList.innerHTML = '';
    tickets.forEach((ticket, index) => {
        const li = document.createElement('li');
        li.textContent = `${ticket.name} (${ticket.category})`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTicket(index);
        });
        li.appendChild(deleteBtn);
        li.addEventListener('click', () => {
            selectedTicket = ticket;
            printName.textContent = ticket.name;
            printMobile.textContent = ticket.mobile;
            printType.textContent = ticket.category;
        });
        ticketList.appendChild(li);
    });
}

// Delete a ticket
function deleteTicket(index) {
    const tickets = JSON.parse(localStorage.getItem('tickets'));
    tickets.splice(index, 1);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    updateTicketList(tickets);
}

// Category button event listeners
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedCategory = btn.textContent;
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Print ticket
printBtn.addEventListener('click', () => {
    if (selectedTicket) {
        window.print();
    }
});

// Tab switching
purchaseTabBtn.addEventListener('click', () => {
    purchaseTab.classList.add('active');
    viewTab.classList.remove('active');
    purchaseTabBtn.classList.add('active');
    viewTabBtn.classList.remove('active');
});

viewTabBtn.addEventListener('click', () => {
    purchaseTab.classList.remove('active');
    viewTab.classList.add('active');
    purchaseTabBtn.classList.remove('active');
    viewTabBtn.classList.add('active');
});