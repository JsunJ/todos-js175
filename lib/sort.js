// Compare object titles alphabetically (case-insensitive)
const compareByTitle = (itemA, itemB) => {
  let titleA = itemA.title.toLowerCase();
  let titleB = itemB.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return 0;
  }
};

module.exports = {
  // Sort list of todo lists by both completion status and title
  sortTodoLists(lists) {
    let undoneLists = lists.filter(list => !list.isDone());
    let doneLists = lists.filter(list => list.isDone());

    undoneLists.sort(compareByTitle);
    doneLists.sort(compareByTitle);

    return [...undoneLists, ...doneLists];
  },

  // Sort list of todos
  sortTodos(list) {
    let undoneTodos = list.todos.filter(todo => !todo.isDone());
    let doneTodos = list.todos.filter(todo => todo.isDone());

    undoneTodos.sort(compareByTitle);
    doneTodos.sort(compareByTitle);

    return [...undoneTodos, ...doneTodos];
  },
};
