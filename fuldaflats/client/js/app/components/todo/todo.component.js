define(['knockout', 'text!./todo.component.html', 'css!./todo.component.css'], function (ko, componentTemplate) {
    function ToDoModel(title) {
        var self = this;
        self.title = ko.observable(title);
    }

    function ToDoViewModel() {
        var self = this;

        self.todoTitleToAdd = ko.observable("");
        self.todoList = ko.observableArray();

        self.addTodo = function () {
            if (self.todoTitleToAdd()) {
                var todoItem = new ToDoModel(self.todoTitleToAdd());
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

    return { viewModel: ToDoViewModel, template: componentTemplate };
});
