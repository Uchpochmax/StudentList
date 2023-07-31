
// получение массива из заполненной формы

let studentsArr = [
    {
        surname: 'Сидоров',
        name: 'Иван',
        middleName: 'Михайлович',
        dateOfBirth: '23.12.1990',
        yearStart: '2005',
        department: 'Физики'
    },
    {
        surname: 'Сидорова',
        name: 'Ольга',
        middleName: 'Михайловна',
        dateOfBirth: '12.11.1994',
        yearStart: '2019',
        department: 'Астрономии'
    },
    {
        surname: 'Сорокина',
        name: 'Мария',
        middleName: 'Алексеевна',
        dateOfBirth: '01.01.1992',
        yearStart: '2008',
        department: 'Математики'
    },
    {
        surname: 'Андропов',
        name: 'Александр',
        middleName: 'Петрович',
        dateOfBirth: '03.10.1992',
        yearStart: '2003',
        department: 'Информатики'
    },
    {
        surname: 'Никифоров',
        name: 'Олег',
        middleName: 'Олегович',
        dateOfBirth: '24.12.1995',
        yearStart: '2021',
        department: 'Химии'
    }
]
buildTable(studentsArr);

document.querySelector('.btn').addEventListener('click', addStudent);

function addStudent() {
    // константа для валидации по дате начала обучения
    const dateLimit = '2000';

    // создаем констатнты для элементов в форме
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const middleName = document.getElementById('middleName');
    const date = document.getElementById('date');
    const year = document.getElementById('year');
    const department = document.getElementById('department');

    // валидация, после удаления лишних прообелов
    if (year.value.trim().toLowerCase() <= dateLimit) {
        alert('Год начала обучения должен быть не раньше 2000')
        return
    }
    if (name.value.trim().toLowerCase() === ''
        || surname.value.trim().toLowerCase() === ''
        || middleName.value.trim().toLowerCase() === ''
        || department.value.trim().toLowerCase() === '') {
        alert('Пожалуйста заполните все поля')
        return
    }

    // зададим формат даты для данных из input в формате чч.мм.гггг вместо гггг-мм-чч
    const dateValueArr = date.value.trim().split('-');
        console.log(dateValueArr);
    const dateValue = dateValueArr.reverse().join('.');
        console.log(dateValue);

    const someStudent = {
        name: name.value,
        surname: surname.value,
        middleName: middleName.value,
        dateOfBirth: dateValue,
        yearStart: year.value,
        department: department.value
    };

    studentsArr.push(someStudent);
    console.log(studentsArr);
    buildTable(studentsArr);

    name.value = '';
    surname.value = '';
    middleName.value = '';
    date.value = '';
    year.value = '';
    department.value = '';
}

// создаем строку со студентом в таблице
function buildTable(data) {
    const table = document.getElementById('mytable');
    table.innerHTML = '';
    let html = '';

    for (let i = 0; i < data.length; i++) {

        let fioObj = `${data[i].surname} ${data[i].name} ${data[i].middleName}`;
        let old = age(data[i].dateOfBirth);
        let row =
            `
            <tr>
                <td>${fioObj}</td>
                <td>${data[i].department}</td>
                <td>${data[i].dateOfBirth} (${old})</td>
                <td>${learn(data[i].yearStart)}</td>
            </tr>
            `
        html += row;
    }

    table.innerHTML = html;
}

// функция подсчета возраста
function age(defaultDate) {
    if (typeof (defaultDate) === 'string') {
        let defaultDateArr = defaultDate.split('.');
        let remove = defaultDateArr.splice(1, 1);
        defaultDateArr.unshift(remove);
        defaultDate = defaultDateArr.join('.');
    }
    let today = new Date();
    let dateValidate = new Date('01.01.1900');
    let dateOfBirth = new Date(defaultDate);
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    let month = today.getMonth() - dateOfBirth.getMonth();
    if (dateOfBirth.getTime() > today.getTime() || dateOfBirth.getTime() < dateValidate.getTime()) {
        alert('Введите корректную дату рождения');
        return
    }
    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }
    return age;
}

// функция выввода сроков обучения
function learn(str) {
    let endYear = +str + 4;
    let now = new Date;
    let grade = now.getFullYear() - str;

    let output;
    if (grade > 4) {
        output = `${str} - ${endYear} (закончил)`;
    }
    else {
        output = `${str} - ${endYear} (${grade} курс)`
    }

    return output;
}

// поиск по таблице
function search() {
    let searchArr = studentsArr.slice();
    let str = '';

    const inputFIO = document.getElementById('inputFIO');
    const inputDepartment = document.getElementById('inputDepartment');
    const inputYearStart = document.getElementById('inputYearStart');
    const inputYearEnd = document.getElementById('inputYearEnd');

    if (inputFIO.value.trim().toLowerCase()) {
        str = inputFIO.value.trim().toLowerCase();
        searchArr = searchArr.filter(item => item.name.trim().toLowerCase().includes(str) || item.surname.trim().toLowerCase().includes(str) || item.middleName.trim().toLowerCase().includes(str))
        inputFIO.value = '';
    }
    if (inputDepartment.value.trim().toLowerCase()) {
        str = inputDepartment.value.trim().toLowerCase();
        searchArr = searchArr.filter(item => item.department.trim().toLowerCase().includes(str))
        inputDepartment.value = '';
    }
    if (inputYearStart.value.trim().toLowerCase()) {
        str = inputYearStart.value.trim().toLowerCase();
        searchArr = searchArr.filter(item => item.yearStart.trim().toLowerCase().includes(str))
        inputYearStart.value = '';
    }
    if (inputYearEnd.value.trim().toLowerCase()) {
        str = inputYearEnd.value.trim().toLowerCase();
        searchArr = searchArr.filter(item => +item.yearStart + 4 == str)
        inputYearEnd.value = '';
    }

    buildTable(searchArr);
}

document.querySelectorAll('.btn-search').forEach(item => item.addEventListener('click', search));

// сортировка колонок
function sortColumn(selectColumn) {
    let sortArr = studentsArr.slice();

    const thFIO = document.getElementById('thFIO');
    const thDepartment = document.getElementById('thDepartment');
    const thDateOfBirth = document.getElementById('thDateOfBirth');
    const thYearStart = document.getElementById('thYearStart');

    if (thFIO.innerHTML == selectColumn.innerHTML) {
        if (thFIO.classList.contains('sort-column__straight') == false) {
            sortArr.sort((a, b) => a.surname > b.surname ? 1 : -1);
            thFIO.classList.add('sort-column__straight');
            thFIO.classList.remove('sort-column__reverse');
        }
        else {
            sortArr.sort((a, b) => a.surname < b.surname ? 1 : -1);
            thFIO.classList.remove('sort-column__straight');
            thFIO.classList.add('sort-column__reverse');
        }
    }
    if (thDepartment.innerHTML == selectColumn.innerHTML) {
        if (thDepartment.classList.contains('sort-column__straight') == false) {
            sortArr.sort((a, b) => a.department > b.department ? 1 : -1);
            thDepartment.classList.add('sort-column__straight');
            thDepartment.classList.remove('sort-column__reverse');
        }
        else {
            sortArr.sort((a, b) => a.department < b.department ? 1 : -1);
            thDepartment.classList.remove('sort-column__straight');
            thDepartment.classList.add('sort-column__reverse');
        }
    }
    if (thDateOfBirth.innerHTML == selectColumn.innerHTML) {
        if (thDateOfBirth.classList.contains('sort-column__straight') == false) {
            sortArr.sort((a, b) => age(a.dateOfBirth) - age(b.dateOfBirth))
            thDateOfBirth.classList.add('sort-column__straight');
            thDateOfBirth.classList.remove('sort-column__reverse');
        }
        else {
            sortArr.sort((a, b) => age(b.dateOfBirth) - age(a.dateOfBirth))
            thDateOfBirth.classList.remove('sort-column__straight');
            thDateOfBirth.classList.add('sort-column__reverse');
        }
    }
    if (thYearStart.innerHTML == selectColumn.innerHTML) {
        if (thYearStart.classList.contains('sort-column__straight') == false) {
            sortArr.sort((a, b) => a.yearStart - b.yearStart)
            thYearStart.classList.add('sort-column__straight');
            thYearStart.classList.remove('sort-column__reverse');
        }
        else {
            sortArr.sort((a, b) => b.yearStart - a.yearStart)
            thYearStart.classList.remove('sort-column__straight');
            thYearStart.classList.add('sort-column__reverse');
        }
    }

    buildTable(sortArr);
}

document.querySelectorAll('th').forEach(item => item.addEventListener('click', (column) => {
    let selectColumn = column.target;
    sortColumn(selectColumn);
}));