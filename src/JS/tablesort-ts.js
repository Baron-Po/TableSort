/* Assumption or Prerequisite
1. Using <table>, <tr>, <th>, <td> tags to build web table.
2. The first row is header in table.
*/
// Version Announcement
var version = "1.0.0";
// Get tables in page
function getTables() {
    var tables = document.querySelectorAll('table.table-sortable');
    if (tables.length !== 0) {
        return tables;
    }
    else {
        console.log("There is no table in page, or add 'table-sortable' in table style, and please creating table did not use <table>, <tr>, <th>, <td> tags");
        throw new Error("TableNoteFound,There is no table in page, or creating table did not use <table>, <tr>, <th>, <td> tags");
    }
}
// Get node index of child element by parent node
function getChildIndex(node) {
    if (node !== undefined) {
        return Array.prototype.indexOf.call(node.parentNode.children, node);
    }
    else {
        return false;
    }
}
// Table Sort
function sortTableByColumn(table, column, asc) {
    if (asc === void 0) { asc = false; }
    var dirModifier = asc ? 1 : -1;
    var tBody = table.querySelector("tbody");
    var dataRows = Array.prototype.slice.call(tBody.rows);
    var sortedRows = dataRows.sort(function (a, b) {
        var aColText = a.querySelector("td:nth-child(".concat(column + 1, ")")).textContent.trim();
        var bColText = b.querySelector("td:nth-child(".concat(column + 1, ")")).textContent.trim();
        return (aColText > bColText) ? (1 * dirModifier) : (-1 * dirModifier);
    });
    // Remove old data in table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    // Adding new data in table
    tBody.append.apply(tBody, sortedRows);
    // Add tag in  cololumn header to remind how the table sorted
    var tHeaders = Array.prototype.slice.call(table.rows[0].children);
    tHeaders.forEach(function (element) {
        element.classList.remove("sort-by-asc", "sort-by-desc");
        tHeaders[column].classList.toggle("sort-by-asc", asc);
        tHeaders[column].classList.toggle("sort-by-desc", !asc);
    });
}
// Add event listener in table header cells
function addListenerInHeader(table) {
    var tHeaders = Array.prototype.slice.call(table.rows[0].children);
    tHeaders.forEach(function (header) {
        header.addEventListener("click", function () {
            var headerIndex = tHeaders.indexOf(header);
            var isAscending = header.classList.contains("sort-by-asc");
            sortTableByColumn(table, headerIndex, !isAscending);
        });
    });
}
var tables = getTables();
var table = tables[0];
addListenerInHeader(table);
