let todos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [
        {
            title: 'task 1',
            completed: false,
        },
        {
            title: 'task 2',
            completed: true,
        }
    ]



const listContainer = document.querySelector('.listContainer')

function render() {
    listContainer.innerText = ''

    console.log(todos);

    todos.forEach((obj, i) => {
        const div = document.createElement('div')
        div.className = 'todo'
        const span = document.createElement('span')
        span.innerText = obj.title

        const icon = document.createElement('icon')
        icon.innerHTML = `<i class="fa fa-check"></i>`

        div.onclick = () => {
            obj.completed = !obj.completed
            if (obj.completed === true) {
                div.prepend(icon)
                div.style = `background:#888;
                color:white;
                text-decoration: line-through;`
                deleteBtn.style.color = 'white';
            } else {
                div.removeAttribute('style');
                icon.remove()
                deleteBtn.style.color = 'gray';
            }

        }

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'delete-button'
        deleteBtn.innerText = 'X'

        deleteBtn.onclick = () => {
            let targetIndex = i
            todos = todos.filter((_, index) => index !== targetIndex)
            render()
            localStorage.setItem('todos', JSON.stringify(todos))
        }


        const editBtn = document.createElement('button')
        editBtn.innerText = 'Edit'
        editBtn.className = 'editBtn'

        editBtn.onclick = (e) => {
            e.stopPropagation()
            const editInput = document.createElement('input')
            const saveBtn = document.createElement('button')
            saveBtn.innerText = 'Save'
            saveBtn.className = 'saveBtn'
            let parent = editBtn.parentElement
            editInput.type = "text";
            editInput.value = todos[i].title;
            parent.append(editInput, saveBtn);
            editInput.focus();
            editBtn.remove()
            span.style.display='none'

            editInput.onclick = (e) => e.stopPropagation()

            saveBtn.onclick = (e) => {
                e.stopPropagation()
                editInput.remove()
                span.style.display='inline'
                div.append(editBtn, deleteBtn)

                todos[i].title = editInput.value
                localStorage.setItem('todos', JSON.stringify(todos))

            }
        }
        div.append(span, editBtn, deleteBtn)
        listContainer.append(div)
    })
}

render()

const addInput = document.querySelector('.inp')
const addBtn = document.querySelector('.addBtn')

addBtn.onclick = () => {
    if (addInput.value.trim()) {
        todos.push({
            title: addInput.value,
            completed: false
        })

        addInput.value = ''

        render()

        localStorage.setItem('todos', JSON.stringify(todos))
    } else {
        alert('input is empty')
    }
}