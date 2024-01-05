const todoHeader = document.getElementById('todo-header');
const input = document.querySelector('#input');
const button = document.querySelector('#button');
const error = document.querySelector('#error');
const todoList = document.querySelector('#todo-list');

function validate(form, error) {
    if(!form.value) {
        error.style.display = 'block'
        return false;
    } else {
        error.style.display = 'none'
    }

    if (!form.value.trim()) {
        error.style.display = 'block'
        error.innerHTML = `Matn probellardan iborat bo'lmasligi shart`
        return false;
    } else {
        error.style.display = 'none'
        error.innerHTMl = `Matn kiritilishi shart`
    }

    if(form.value.length <= 4) {
        error.style.display = 'block'
        error.innerHTML = `Belgilar soni kamida 5 ta bo'lishi kerak`
        return false;
    } else {
        error.style.display = 'none'
        error.innerHTMl = `Matn kiritilishi shart`
    }

    return true;
}

button && button.addEventListener('click', function() {
    if(validate(input, error)) {
        const todo = {
            id: Date.now(),
            name: input.value,
            status: "active"
        };

        let data = [];
        if(localStorage.getItem('todos')) {
            data = JSON.parse(localStorage.getItem('todos'));
        }

        data.push(todo);
        localStorage.setItem('todos', JSON.stringify(data));
        let todoItem = createTodo(todo);
        todoList.innerHTML += todoItem;
        input.value = '';
    } else {
        console.log('Validatsiya o`tmadi')
    }
});

input && input.addEventListener('keyup', function(event) {
    if(event.keyCode == 13) {
        if(validate(input, error)) {
            const todo = {
                id: Date.now(),
                name: input.value,
                status: "active"
            };
    
            let data = [];
            if(localStorage.getItem('todos')) {
                data = JSON.parse(localStorage.getItem('todos'));
            }
    
            data.push(todo);
            localStorage.setItem('todos', JSON.stringify(data));
            let todoItem = createTodo(todo);
            todoList.innerHTML += todoItem;
            input.value = '';
        } else {
            console.log('Validatsiya o`tmadi')
        }
    }
});

function getDataFromLStorage() {
    let data = [];
    if(localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos'))
    }

    return data;
}

function createTodo(todo) {
    let status = false;
    if(!todo.status == 'active') {
        status = true;
    } 
    return `
    <li data-item = "todo_${todo.id}">
        <div class="check-name">
            <input type="checkbox" name="" id="" ${status ? 'checked' : ''}>
            <p>${todo.name}</p>
        </div>

        <div class="actions">
            <i class="fa-regular fa-pen-to-square"></i>
            <i class="fa-regular fa-trash-can"></i>
        </div>
    </li>
`;
}

document.addEventListener('DOMContentLoaded', function() {
    let data = getDataFromLStorage();
    if(data.length) {
        data.forEach(item => {
            let todo = createTodo(item);
            todoList.innerHTML += todo;
        });

        todoHeader.innerHTML = `Todos (${data.length})`
    }
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    if(checkboxes.length) {
        checkboxes.forEach(item => {
            item.addEventListener('change', function(evene) {
                if (event.target.checked) {
                    this.nextSibling.nextSibling.style.textDecoration = 'line-through';
                    console.log(this.parentNode.parentNode.getAttribute('dats-item').slice)
                } else {
                    this.nextSibling.nextSibling.style.textDecoration = 'none'
                }
                
            })
        })
    }
});

