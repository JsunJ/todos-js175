const express = require("express");
const morgan = require("morgan");
const TodoList = require("./lib/todolist");

const app = express();
const host = "localhost";
const port = 3000;

// Static data for initial testing
let todoLists = require("./lib/seed-data");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const compareByTitle = (todoListA, todoListB) => {
  let titleA = todoListA.title.toLowerCase();
  let titleB = todoListB.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return 0;
  }
};

const sortTodoLists = lists => {
  let undoneLists = lists.filter(list => !list.isDone());
  let doneLists = lists.filter(list => list.isDone());

  undoneLists.sort(compareByTitle);
  doneLists.sort(compareByTitle);

  return [...undoneLists, ...doneLists];
};

app.get("/", (req, res) => {
  res.redirect("/lists");
});

// Render the list of todo lists
app.get("/lists", (req, res) => {
  res.render("lists", {
    todoLists: sortTodoLists(todoLists),
  });
});

// Render the new todo list page
app.get("/lists/new", (req, res) => {
  res.render("new-list");
});

// Create a new todo list
app.post("/lists", (req, res) => {
  let title = req.body.todoListTitle.trim();
  if (title.length === 0) {
    res.render("new-list", {
      errorMessage: "A title was not provided.",
    });
  } else if (title.length > 100) {
    res.render("new-list", {
      errorMessage: "List title must be between 1 and 100 characters.",
      todoListTitle: title,
    });
  } else if (todoLists.some(list => list.title === title)) {
    res.render("new-list", {
      errorMessage: "List title must be unique.",
      todoListTitle: title,
    });
  } else {
    todoLists.push(new TodoList(title));
    res.redirect("/lists");
  }
});

app.listen(port, host, () => {
  console.log(`Todos is listening on port ${port} of ${host}.`);
});