$.ajax({
    url: "https://jsonplaceholder.typicode.com/todos",
    method: 'GET',
    accept: 'application/json',
    success: function (data) {
        setModel(data);
    }
});

function setModel(data) {
    for (i in data) {
        data[i].remove = function (event, context) {
            var id = context.todo.id;
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/todos/" + id,
                method: 'DELETE',
                success: function (data, jqXHR) {
                    console.log(jqXHR);
                }
            });

        }
    }
    rivets.bind($('#todoList'), {
        todos: data
    });
}

var link = document.querySelector('link[rel="import"]');
var template = link.import.querySelector('template');
var clone = document.importNode(template.content, true);
document.querySelector('#header').appendChild(clone);