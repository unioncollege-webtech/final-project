To Do List
-----------

To Do list is where you can add items to a list. You will be able to delete to do items off of the list.

Each to do item will have following properties:

- title - a brief description of the item
- description - a string that contains the description of the item

Possible future properties:

- authentication - have users log in using google
- due date - be able to set a due date when the item needs to be done
- database - use a database to store the information in
- folders - be able to create folders and add to do items in different folders
- search - users can search for a to do item

Features
---------

- Users can create, read, update, and delete to do items
- To do items have a description
- Uses File System to store data
- Users can save changes to storage


Approach
---------

To Do List is an Express web application that uses Handlebars and Bootstrap for templates and uses file system to store items in storage.json.

Routes
-------

- / - the 'index' route. Shows a list of the to do items
- /delete - deletes the to do item
- /edit - edits a to do item
- /save - saves the toDoList array to storage.json
