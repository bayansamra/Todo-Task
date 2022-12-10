const todoMenu = document.querySelector(".todo-menu");

const titleInput = document.querySelector(".title-input");
const descInput = document.querySelector(".desc-input");

const addBtn = document.getElementById("add-icon");
const saveBtn = document.getElementById("save-icon");
const cancelBtn = document.getElementById("cancel-icon");

const activeArticle = document.querySelector("article.active");
const disabledFooter = document.querySelector("footer.disabled");

// Get all posts
// The first branch of the task
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        JSON.parse(xhr.response);
        const todoArray = JSON.parse(xhr.response).map(el => {
            return {
                title: el.title,
                desc: el.body
            }
        });
        showArrayOfTodos(todoArray);
    }
}

const createTodoCard = (title, desc) => {
    const todo = document.createElement('div');
    todo.classList.add("todo");
    todo.innerHTML = `
        <h2 class="todo-title">${title}</h2>
        <p class="todo-content">${desc}</p>
`
    return todo
}

const showArrayOfTodos = (arr) => {
    arr.forEach(todo => {
        todoMenu.appendChild(createTodoCard(todo.title, todo.desc))
    });
}

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.send();

// add button
addBtn.addEventListener('click', () => {
    disabledFooter.style = 'display: none';
    activeArticle.style = 'display: block';
    todoMenu.style = 'padding-bottom: 0px;'
    todoMenu.scrollTo(0, todoMenu.scrollHeight);
});

//cancel button
cancelBtn.addEventListener('click', () => {
    disabledFooter.style = 'display: flex';
    activeArticle.style = 'display: none';
    todoMenu.style = 'padding-bottom: 100px;'
    todoMenu.scrollTo(0, 0);
});

//save button
saveBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const desc = descInput.value;
    if (title === "") {
        titleInput.style = 'outline: 1px solid #f00;'
    } else {
        titleInput.style = 'outline: 1px solid transparent;'
    }

    if (desc === "") {
        descInput.style = 'outline: 1px solid #f00;'
    } else {
        descInput.style = 'outline: 1px solid transparent;'
    }

    if (title !== "" && desc !== "") {
          // The second branch of the task
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                title: title,
                body: desc
            })
        }).then(res => {
            console.log(res);
            todoMenu.appendChild(createTodoCard(title, desc))
            todoMenu.scrollTo(0, todoMenu.scrollHeight);
            titleInput.value = ""
            descInput.value = ""
            todoMenu.style = 'padding-bottom: 100px;';
            disabledFooter.style = 'display: flex';
            activeArticle.style = 'display: none';
        })
    }
});
