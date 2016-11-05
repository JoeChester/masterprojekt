define(['knockout'], function (ko) {
    function ToDo(title) {
        var self = this;
        self.title = ko.observable(title);
    }

    return function ToDoController() {
        var self = this;

        self.todoTitleToAdd = ko.observable("");
        self.todoList = ko.observableArray();

        self.addTodo = function (qwe) {
            if (self.todoTitleToAdd()) {
                var todoItem = new ToDo(self.todoTitleToAdd());
                self.todoList.push(todoItem);
                //todo: ajax call
                console.log("Added " + todoItem.title());
            }
        }

        self.removeTodo = function (todoItem) {
            self.todoList.remove(todoItem)
            //todo: ajax call
            console.log("Removed " + todoItem.title());
        }
    };
});
