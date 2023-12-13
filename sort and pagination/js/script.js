const data = [
	{ "id": 1, "name": "John", "age": 25 },
    { "id": 2, "name": "Alice", "age": 30 },
    { "id": 3, "name": "Bob", "age": 22 },
    { "id": 4, "name": "Eve", "age": 28 },
    { "id": 5, "name": "David", "age": 35 },
    { "id": 6, "name": "Grace", "age": 29 },
    { "id": 7, "name": "Harry", "age": 26 },
    { "id": 8, "name": "Isabel", "age": 31 },
    { "id": 9, "name": "Jack", "age": 27 },
    { "id": 10, "name": "Katherine", "age": 33 },
    { "id": 11, "name": "Liam", "age": 24 },
    { "id": 12, "name": "Mia", "age": 32 },
    { "id": 13, "name": "Noah", "age": 28 },
    { "id": 14, "name": "Olivia", "age": 29 },
    { "id": 15, "name": "William", "age": 26 },
    { "id": 16, "name": "Sophia", "age": 31 },
    { "id": 17, "name": "James", "age": 27 },
    { "id": 18, "name": "Emma", "age": 33 },
    { "id": 19, "name": "Benjamin", "age": 24 },
    { "id": 20, "name": "Ava", "age": 32 },
];

let currentPage = 1;
let rowsPerPage = 5;
let currentSortColumn = 0;
let currentSortOrder = 'asc';

function displayData(data) {
	const tableBody = document.getElementById("tableBody");
	tableBody.innerHTML = "";
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const paginatedData = data.slice(startIndex, endIndex);
	paginatedData.forEach(item => {
		const row = document.createElement("tr");
		row.innerHTML = `
		<td>${item.id}</td>
		<td>${item.name}</td>
		<td>${item.age}</td>
		`;
		tableBody.appendChild(row);
	});
}

function setupPagination(data) {
	const totalPages = Math.ceil(data.length / rowsPerPage);
	const pagination = document.getElementById("pagination");
	pagination.innerHTML = "";
	for (let i = 1; i <= totalPages; i++) {
		const button = document.createElement("button");
		button.innerText = i;
		button.addEventListener("click", function () {
			currentPage = i;
			displayData(data);
			highlightActivePageButton();
		});
		pagination.appendChild(button);
	}
	highlightActivePageButton();
}

function highlightActivePageButton() {
	const paginationButtons = document.querySelectorAll(".pagination button");
	paginationButtons.forEach((button, index) => {
		if (index + 1 === currentPage) {
		button.classList.add("active");
		} else {
		button.classList.remove("active");
		}
	});
}

function changeRowsPerPage() {
	rowsPerPage = parseInt(document.getElementById('rowsPerPage').value);
	currentPage = 1;
	displayData(data);
	setupPagination(data);
}

function sortAscending() {
	currentSortOrder = 'asc';
	sortTable();
}

function sortDescending() {
	currentSortOrder = 'desc';
	sortTable();
}

function sortTable() {
	const table = document.getElementById("myTable");
	const tbody = table.querySelector('tbody');
	const rows = Array.from(tbody.getElementsByTagName("tr"));
	const sortedRows = rows.sort((a, b) => {
		const cellA = a.getElementsByTagName("td")[currentSortColumn].textContent.trim();
		const cellB = b.getElementsByTagName("td")[currentSortColumn].textContent.trim();
		return isNaN(cellA) ? cellA.localeCompare(cellB) : cellA - cellB;
	});
	if (currentSortOrder === 'desc') {
		sortedRows.reverse();
	}
	tbody.innerHTML = '';
	sortedRows.forEach(sortedRow => tbody.appendChild(sortedRow));
	highlightSortButton();
}

function highlightSortButton() {
	const sortButtons = document.querySelectorAll("button");
	sortButtons.forEach(button => button.classList.remove("active"));
	const activeSortButton = document.querySelector(`button:nth-child(${(currentSortOrder === 'desc' ? 2 : 1)})`);
	activeSortButton.classList.add("active");
}

displayData(data);
setupPagination(data);