define(['knockout', 'text!./todo.component.html', 'css!./todo.component.css'], function (ko, componentTemplate) {
    function ToDoModel() {
        var self = this;
        self.id = ko.observable();
        self.title = ko.observable();
    }

    function ToDoViewModel() {
        var self = this;

        self.todoTitleToAdd = ko.observable();
        self.todoList = ko.observableArray();

        var todoItem = new ToDoModel();

        self.addTodo = function () {
            if (self.todoTitleToAdd()) {
                var todoItem = new ToDoModel();
                todoItem.title(self.todoTitleToAdd());

                console.log("Adding " + todoItem.title());

                $.ajax({
                        url: "/api/todos",
                        method: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: ko.toJSON(todoItem)
                    })
                    .done(function (initizedTodoItem) {
                        if (initizedTodoItem && initizedTodoItem.title == todoItem.title() && !isNaN(initizedTodoItem.id)) {
                            todoItem.id(initizedTodoItem.id);
                            self.todoList.push(todoItem);
                            self.todoTitleToAdd("");
                            console.log("Added " + todoItem.title());
                        } else {
                            console.error("Failed to add " + todoItem.title() + "\n Unexpected server response.");
                        }
                    })
                    .fail(function (jqXHR, textStatus) {
                        console.error("Failed to add " + todoItem.title() + "\n" + textStatus);
                    });
            }
        }

        self.removeTodo = function (todoItem) {
            console.log("Removing " + todoItem.title());
            $.ajax({
                    url: "/api/todos/" + todoItem.id(),
                    method: "DELETE",
                })
                .done(function () {
                    console.log("Removed " + todoItem.title());
                    self.todoList.remove(todoItem)
                })
                .fail(function (jqXHR, textStatus) {
                    console.error("Failed to remove " + todoItem.title() + "\n" + textStatus);
                });
        }

        self.loadTodoList = function () {
            console.log("Loading to do list.")
            $.ajax({
                    url: "/api/todos",
                    method: "GET",
                    dataType: "json"
                })
                .done(function (todoList) {
                    if (todoList && todoList.length && todoList.length > 0) {
                        $.each(todoList, function (index, todoInfo) {
                            if (todoInfo.id && todoInfo.title) {
                                var todoItem = new ToDoModel();
                                todoItem.title(todoInfo.title);
                                todoItem.id(todoInfo.id);
                                self.todoList.push(todoItem);
                            }
                        });
                        console.log("Loaded to do list.");
                    } else {
                        console.log("Loaded to do list was empty or requested list was invalid.")
                    }
                })
                .fail(function (jqXHR, textStatus) {
                    console.error("Failed to load to do list.\n" + textStatus);
                });
        }
    };

    return {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var viewModel = new ToDoViewModel();
                viewModel.loadTodoList();
                return viewModel;
            }
        },
        template: componentTemplate
    };
});