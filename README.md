# A Paint Company App

This web application is for 'A Paint Company' to track the status of their paint stock. The status options include 'Available', 'Running Low', and 'Out of Stock'.

### Techstack 
1. Frontend: React
2. Backend: Django
3. Cloud host: Heroku

### Local Setup 
1. Clone this repository 
2. Navigate to the root directory of the repository.
2. Run `npm install` 
3. Run `pip install -r requirements.txt`
4. Run `python manage.py runserver` for the backend 
5. Run `npm start` for the frontend 
6. Navigate to the frontend at `localhost:3000`
7. Navigate to the backend server at `localhost:8000` 

### Testing 
Frontend Tests: `npm test`
Backend Tests: `python manage.py test`

### User Guide 
- Navigate to the deployed web application at https://a-paint-company-a54db84c4060.herokuapp.com/
- This will automatically redirect you to a login page.
- Login with one of the user credentials listed below in the 'User Documentation' section.
- Once logged in, you will be redirected to the main page. 
- The main page has a Kanban board with three columns for each paint status.
- To edit paint status, drag and drop a paint card to the appropriate column.
- To edit inventory, click the inventory value on the paint card and type in the correct value or use the up / down toggles. 

### API Documentation 
`/admin/`: admin dashboard 
`/api/`: retrieve all paint info 
`/api/post/<str:colour>/`: update paint info 
`/api/account/login/`: login user 
`/api/account/logout/`: logout user 

### User Documentation
1. John: John represents an employee who assigns houses to be painted who is able to view inventory and paint status, but is not able to edit them and has no admin privileges.
username: `john`
password: `Ilovepainting3`
user_group: Assigners
2. Jane: Jane represents a manager who is able to edit inventory and paint status, but has no admin privileges.
username: `jane`
password: `Ilovemanaging5`
user_group: Managers
3. Bob: Bob represents a painter who is able to edit inventory and paint status, but has no admin privileges.
username: `bobpainter`
password: `Ilovepainting7`
user_group: Painters
4. Adam: Adam represents an admin user so he is able to create, delete, and edit users by accessing the /admin dashboard  
username: `adam`
password: `Iloveadmin9`
user_group: N/A
staff_status: True 

### Project Assumptions 
1. It is not necessary for there to be a register user / create account page because this can be done on the admin dashboard by staff accounts.
2. The only functionality that needs to be done on the app is tracking paint inventory and status, bulk orders would not be performed through the application. 

### References 
To generate the company's logo, LOGO.com was used. 
