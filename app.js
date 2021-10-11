const todoMenuItem = document.querySelectorAll(".todo-menu__item"),
todoInput = document.querySelector(".todo-create__input"),
todoOpenBtn = document.querySelector(".todo-create__btn"),
todoCompletes = document.querySelector(".todo-completed"),
todoAddBtn = document.querySelector(".todo-add__btn"),
todoDeletes = document.querySelector(".todo-deleted"),
todoMenu = document.querySelector(".todo-create"),
todoBoxs = document.querySelectorAll(".todo-box"),
todoList = document.querySelector(".todo-list")
let taskList = []

const completeTodo = target => {
    target.remove()
    todoCompletes.append(target)
    target.classList.add("completed")
    sessionStorage.setItem("todoComplete", todoCompletes.innerHTML)
}

const deleteTodo = target => {
    target.remove()
    todoDeletes.append(target)
    target.classList.add("deleted")
    sessionStorage.setItem("todoDelete", todoDeletes.innerHTML)
}

const todoEvents = () => {
    document.querySelectorAll(".todo-checkbox").forEach(el => {
        el.addEventListener("click", e => {
            // e.target.parentNode.classList.toggle("complete")
            setTimeout(completeTodo(e.target.parentNode), 3000)
        })
    })
    document.querySelectorAll(".todo-box-cancel").forEach(el => {
        el.addEventListener("click", e => deleteTodo(e.target.parentNode))
    })
}
const createTodo = () => {
    const newTodo = { todo: todoInput.value }
    if (newTodo.todo.trim() == "") return
    taskList.push(newTodo)
    sessionStorage.setItem("todos", JSON.stringify(taskList))
    addTodo()
}

const addTodo = () => {
    let todoInner = ""
    taskList.forEach(el => {
        todoInner += `
        <div class="todo-box">
            <input type="radio" class="todo-checkbox">
            <div class="todo-inner">${el.todo}</div>
            <button class="todo-box-cancel"></button>
        </div>`
        todoList.innerHTML = todoInner
    })    
    todoEvents()
    todoInput.value = ""
}
todoAddBtn.addEventListener("click", createTodo)

todoOpenBtn.addEventListener("click", () => todoMenu.classList.toggle("active"))

todoMenuItem.forEach(el => el.addEventListener("click", e => e.preventDefault()))

function tabFunc() {
    const menuBtns = document.querySelectorAll(".todo-menu__item")
    const tabCont = document.querySelectorAll("._tab")
    menuBtns.forEach(item => {
        item.addEventListener("click", () => {
            const curTab = document.querySelector(item.getAttribute("data-tab"))
            tabCont.forEach(el => el.classList.remove("active"))
            menuBtns.forEach(i => i.classList.remove("clicked"))
            curTab.classList.add("active")
            item.classList.add("clicked")
        })
    })
}tabFunc()

todoCompletes.innerHTML = sessionStorage.getItem("todoComplete")
todoDeletes.innerHTML = sessionStorage.getItem("todoDelete")
if (sessionStorage.getItem("todos")) {
    taskList = JSON.parse(sessionStorage.getItem("todos"))
    Array.from(todoCompletes.children).forEach( el => {
        taskList.forEach(item => {
            if (item.todo === el.querySelector(".todo-inner").innerHTML) {
                taskList.splice(taskList.indexOf(item), 1)
            }
        })
    })
    Array.from(todoDeletes.children).forEach( el => {
        taskList.forEach(item => {
            if (item.todo === el.querySelector(".todo-inner").innerHTML) {
                taskList.splice(taskList.indexOf(item), 1)
            }
        })
    })
    sessionStorage.setItem("todos", JSON.stringify(taskList))
    addTodo()   
}