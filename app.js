const todoBoxCancels = document.querySelectorAll(".todo-box-cancel"),
todoMenuItem = document.querySelectorAll(".todo-menu__item"),
todoOpenBtn = document.querySelector(".todo-create__btn"),
todoChecks = document.querySelectorAll(".todo-checkbox"),
todoMenu = document.querySelector(".todo-create"),
todoBox = document.querySelector(".todo-box"),
todoList = document.querySelector(".todo-list"),
todoAddBtn = document.querySelector(".todo-add__btn")

const completeTodo = target => {
    target.remove()
    document.querySelector(".todo-completed").append(target)
    target.classList.add("completed")
}

const deleteTodo = target => {
    target.remove()
    document.querySelector(".todo-deleted").append(target)
    target.classList.add("deleted")
}

const createTodo = () => {
    const newTodo = document.createElement("div")
    newTodo.classList.add("todo-box")

    const todoCheck = document.createElement("input")
    todoCheck.setAttribute("type", "radio")
    todoCheck.classList.add("todo-checkbox")

    const todoInner = document.createElement("div")
    todoInner.classList.add("todo-inner")
    todoInner.innerHTML = document.querySelector(".todo-create__input").value

    const todoCancel = document.createElement("button")
    todoCancel.classList.add("todo-box-cancel")

    todoCheck.addEventListener("click", e => e.target.parentNode.classList.toggle("complete"))
    todoCancel.addEventListener("click", e => deleteTodo(e.target.parentNode))
    todoCheck.addEventListener("focus", e => completeTodo(e.target.parentNode))

    newTodo.append(todoCheck, todoInner, todoCancel)
    todoList.append(newTodo)
    // sessionStorage.setItem("todo", todoList.innerHTML)
}

todoAddBtn.addEventListener("click", createTodo)

todoOpenBtn.addEventListener("click", () => todoMenu.classList.toggle("active"))

todoMenuItem.forEach(el => {
    el.addEventListener("click", e => e.preventDefault())
})

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

// todoList.innerHTML = sessionStorage.getItem("todo")