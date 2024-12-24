/* Assumption or Prerequisite
1. Using <table>, <tr>, <th>, <td> tags to build web table.
2. The first row is header in table.
*/
// Version Announcement
// Get tables in page
function getTables() {
    const tables = document.querySelectorAll('table.table-sortable');
    if (tables.length !== 0) {
        return tables;
    }
    else {
        console.log("There is no table in page, or add 'table-sortable' in table style, and please creating table did not use <table>, <tr>, <th>, <td> tags");
        throw new Error("TableNoteFound,There is no table in page, or creating table did not use <table>, <tr>, <th>, <td> tags");
    }
}
// Check column data type is number, date, or string
// function colTypeCheck(col: any[]){
// }
// Table Sort
function sortTableByColumn(table, column, asc = false) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.querySelector("tbody");
    const dataRows = Array.prototype.slice.call(tBody.rows);
    const sortedRows = dataRows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        return (aColText > bColText) ? (1 * dirModifier) : (-1 * dirModifier);
    });
    // Remove old data in table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    // Adding new data in table
    tBody.append(...sortedRows);
    // Add tag in  cololumn header to remind how the table sorted
    let tHeaders = Array.prototype.slice.call(table.rows[0].children);
    tHeaders.forEach((element) => {
        element.classList.remove("sort-by-asc", "sort-by-desc");
        tHeaders[column].classList.toggle("sort-by-asc", asc);
        tHeaders[column].classList.toggle("sort-by-desc", !asc);
    });
}
// Add event listener in table header cells
function addListenerInHeader(table) {
    const tHeaders = Array.prototype.slice.call(table.rows[0].children);
    tHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            const headerIndex = tHeaders.indexOf(header);
            const isAscending = header.classList.contains("sort-by-asc");
            sortTableByColumn(table, headerIndex, !isAscending);
        });
    });
}
let tables = getTables();
let table = tables[0];
addListenerInHeader(table);
class TableSort {
}

export { TableSort };
