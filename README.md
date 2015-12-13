# Contact List Application

This application will allow users to manage their contacts in one location, and be able to filter entries based on certain criteria.


Description
-----------
Each contact has the following properties:

- fName - A string representing the first name of the contact
- lName - A string representing the last name of the contact
- emailAddress - A string representing the email address of the contact
- phone - A string representing the phone number of the contact

Features
--------
- Users can submit, view, and delete contacts
- Possible future application of having users log in to retain contacts

Approach
--------
This contact list is an Express web application that uses Handlebars for templates.

Routes
------
- / - The index route, which will show the form for submitting a contact and the entered contacts
- /contacts/delete - Handle requests to delete a contact. Not completely functional right now.
