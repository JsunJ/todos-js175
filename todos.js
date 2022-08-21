const express = require("express");
const morgan = require("morgan");

const app = express();
const host = "localhost";
const port = 3000;

// Static data for initial testing
let todoLists = require("./lib/seed-data");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));

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
  res.render("lists", {
    todoLists: sortTodoLists(todoLists),
  });
});

app.listen(port, host, () => {
  console.log(`Todos is listening on port ${port} of ${host}.`);
});