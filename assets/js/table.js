let data = JSON.parse(localStorage.getItem('serverData')) || [];
let filteredData = [...data]; 
let selectedServers = new Set();
let rowsPerPage = 5;

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const visibleData = filteredData.slice(start, end);

    visibleData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="select-checkbox" data-index="${start + index}"></td>
            <td>${item.name}</td>
            <td>${item.ip}</td>
            <td>${item.environment}</td>
            <td>${item.system}</td>
        `;
        tbody.appendChild(row);
    });

    updateSelectedCount();
}

function updateSelectedCount() {
    const btnText = document.querySelector('.select-btn-text');
    btnText.textContent = `Выбрано: ${selectedServers.size}`;
}

function createSelectMenu() {
    const menu = document.createElement('div');
    menu.className = 'select-menu';


    const selectAllBtn = document.createElement('button');
    selectAllBtn.textContent = 'Выбрать все';
    selectAllBtn.addEventListener('click', () => {
        data.forEach((_, index) => selectedServers.add(index));
        updateSelectedCount();
        renderTable();
    });
    menu.appendChild(selectAllBtn);


    const deselectAllBtn = document.createElement('button');
    deselectAllBtn.textContent = 'Отменить';
    deselectAllBtn.addEventListener('click', () => {
        selectedServers.clear();
        updateSelectedCount();
        renderTable();
    });
    menu.appendChild(deselectAllBtn);

    return menu;
}


document.querySelector('.btn-select').addEventListener('click', (event) => {
    const menu = document.querySelector('.select-menu');

    if (menu) {
        menu.remove();
    } else {
        const newMenu = createSelectMenu();
        newMenu.style.position = 'absolute';
        newMenu.style.top = `${event.clientY}px`;
        newMenu.style.left = `${event.clientX}px`;
        document.body.appendChild(newMenu);

        document.addEventListener('click', (e) => {
            if (!newMenu.contains(e.target) && !event.target.contains(e.target)) {
                newMenu.remove();
            }
        }, { once: true });
    }
});

function filterData() {
    const globalSearch = document.querySelector('.search-input').value;
    const nameFilter = document.querySelector('input[data-column="name"]').value.toLowerCase();
    const ipFilter = document.querySelector('input[data-column="ip"]').value;
    const environmentFilter = document.querySelector('input[data-column="environment"]').value.toLowerCase();
    const systemFilter = document.querySelector('input[data-column="system"]').value.toLowerCase();


    const globalSearchTerms = globalSearch
        .split(/[\s,;\r\n]+/)
        .filter((term) => term.trim() !== '')
        .map((term) => term.toLowerCase());

    filteredData = data.filter((item) => {
        const matchesGlobalSearch =
            globalSearchTerms.length === 0 ||
            globalSearchTerms.some((term) =>
                item.name.toLowerCase().includes(term) || item.ip.includes(term)
            );

        const matchesName = !nameFilter || item.name.toLowerCase().includes(nameFilter);
        const matchesIP = !ipFilter || item.ip.includes(ipFilter);
        const matchesEnvironment =
            !environmentFilter || item.environment.toLowerCase().includes(environmentFilter);
        const matchesSystem = !systemFilter || item.system.toLowerCase().includes(systemFilter);

        return matchesGlobalSearch && matchesName && matchesIP && matchesEnvironment && matchesSystem;
    });

    currentPage = 1;
    renderTable();
}


document.querySelectorAll('.column-filter').forEach((input) => {
    input.addEventListener('input', filterData);
});

document.querySelector('.search-input').addEventListener('input', filterData);

document.addEventListener('change', (event) => {
    if (event.target.classList.contains('select-checkbox')) {
        const index = event.target.dataset.index;
        if (event.target.checked) {
            selectedServers.add(index);
        } else {
            selectedServers.delete(index);
        }
        updateSelectedCount();
    }
});

document.querySelectorAll('.rows-per-page').forEach((btn, index) => {
    if (index === 0) {
        btn.classList.add('active');
        rowsPerPage = parseInt(btn.textContent, 10);
    }

    btn.addEventListener('click', () => {
        rowsPerPage = parseInt(btn.textContent, 10);

        document.querySelectorAll('.rows-per-page').forEach((button) => {
            button.classList.remove('active');
        });
        btn.classList.add('active');

        renderTable();
    });
});

document.querySelectorAll('.btn-desktop, .btn-example, .btn-documentation, .btn-close, .btn-next').forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(`Клик по кнопке: ${button.textContent.trim()}`);
    });
});
function createSelectMenu() {
    const menu = document.createElement('div');
    menu.className = 'select-menu';


    const selectAllBtn = document.createElement('button');
    selectAllBtn.textContent = 'Выбрать все';
    selectAllBtn.addEventListener('click', () => {
        data.forEach((_, index) => selectedServers.add(index));
        updateSelectedCount();
        renderTable();
    });
    menu.appendChild(selectAllBtn);
    const deselectAllBtn = document.createElement('button');
    deselectAllBtn.textContent = 'Отменить';
    deselectAllBtn.addEventListener('click', () => {
        selectedServers.clear();
        updateSelectedCount();
        renderTable();
    });
    menu.appendChild(deselectAllBtn);

    return menu;
}
document.querySelector('.btn-select').addEventListener('click', (event) => {
    const menu = document.querySelector('.select-menu');

    if (menu) {
        menu.remove();
    } else {
        const newMenu = createSelectMenu();
        newMenu.style.position = 'absolute';
        newMenu.style.top = `${event.clientY}px`;
        newMenu.style.left = `${event.clientX}px`;
        document.body.appendChild(newMenu);
        document.addEventListener('click', (e) => {
            if (!newMenu.contains(e.target) && !event.target.contains(e.target)) {
                newMenu.remove();
            }
        }, { once: true });
    }
});
function updateSelectedCount() {
    const btnText = document.querySelector('.select-btn-text');
    btnText.textContent = `Выбрано: ${selectedServers.size}`;
}
document.querySelector('.checkboxSearch input[type="checkbox"]').addEventListener('change', (event) => {
    const isChecked = event.target.checked;

    document.querySelectorAll('.select-checkbox').forEach((checkbox) => {
        checkbox.checked = isChecked;
        if (isChecked) {
            selectedServers.add(checkbox.dataset.index);
        } else {
            selectedServers.delete(checkbox.dataset.index); 
        }
    });

    updateSelectedCount();
});
function createPopupMenu(button) {
    const menu = document.createElement('div');
    menu.className = 'popup-menu';
    const selectAllBtn = document.createElement('button');
    selectAllBtn.textContent = 'Выбрать все';
    selectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.select-checkbox').forEach((checkbox) => {
            checkbox.checked = true;
            selectedServers.add(checkbox.dataset.index);
        });
        document.querySelector('.checkboxSearch input[type="checkbox"]').checked = true;
        updateSelectedCount();
    });
    menu.appendChild(selectAllBtn);

    const deselectAllBtn = document.createElement('button');
    deselectAllBtn.textContent = 'Отменить';
    deselectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.select-checkbox').forEach((checkbox) => {
            checkbox.checked = false;
        });
        selectedServers.clear();
        document.querySelector('.checkboxSearch input[type="checkbox"]').checked = false;
        updateSelectedCount();
    });
    menu.appendChild(deselectAllBtn);


    const rect = button.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`; 
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';

    return menu;
}
document.querySelector('.btn-select').addEventListener('click', function () {
    const button = this;
    const menu = document.querySelector('.popup-menu');

    if (menu) {
        menu.remove();
    } else {
        const rect = button.getBoundingClientRect(); 

        const newMenu = createPopupMenu(button); 
        newMenu.style.position = 'absolute';
        newMenu.style.top = `${rect.bottom + window.scrollY}px`; 
        newMenu.style.left = `${rect.left + window.scrollX}px`;  
        newMenu.style.width = `${rect.width}px`; 

        document.body.appendChild(newMenu);

        document.addEventListener('click', function(e) {
            if (!newMenu.contains(e.target) && !button.contains(e.target)) {
                newMenu.remove(); 
            }
        }, { once: true });
    }
});

let currentPage = 1;

function switchPage(direction) {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }

    renderTable();
    updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
    const prevButton = document.querySelector('.btn-prev-page');
    const nextButton = document.querySelector('.btn-next-page');

    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }


    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}


document.querySelector('.btn-prev-page').addEventListener('click', () => switchPage('prev'));
document.querySelector('.btn-next-page').addEventListener('click', () => switchPage('next'));

function updatePaginationButtons(totalPages) {
    const prevButton = document.querySelector('.btn-prev-page');
    const nextButton = document.querySelector('.btn-next-page');

    if (currentPage === 1) {
        prevButton.disabled = true;
        prevButton.classList.remove('active'); 
    } else {
        prevButton.disabled = false;
        prevButton.classList.add('active'); 
    }


    if (currentPage === totalPages) {
        nextButton.disabled = true;
        nextButton.classList.remove('active');
    } else {
        nextButton.disabled = false;
        nextButton.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    updatePaginationButtons(totalPages)
    renderTable(); 
});

renderTable();