# A Paint Company App

This web application is for 'A Paint Company' to track the status of their paint stock. The status options include 'Available', 'Running Low', and 'Out of Stock'.

### Techstack 
1. Frontend: React, NodeJS
2. Backend: Django, Python
3. Cloud Hosting Platform: Heroku
4. DevOps: GitHub Actions

### User Guide 
- Navigate to the deployed web application at https://a-paint-company-a54db84c4060.herokuapp.com/
- This will automatically redirect you to a login page.
- Login with one of the user credentials listed below in the 'User Documentation' section.
- Once logged in, you will be redirected to the main page. 
- The main page has a Kanban board with three columns for each paint status.
- To edit paint status, drag and drop a paint card to the appropriate column.
- To edit inventory, click the inventory value on the paint card and type in the correct value or use the up / down toggles. 

### User Documentation
| Username   | Password       | User Group | Staff Status | Permissions   |
|------------|----------------|------------|--------------|---------------|
| john       | Ilovepainting3 | Assigners  | False        | View          |
| jane       | Ilovemanaging5 | Managers   | False        | View / Update |
| bob        | Ilovepainting7 | Painters   | False        | View / Update |
| adam       | Iloveadmin9    | Admin      | True         | View / Update |

1. John: John represents an employee who assigns houses to be painted who is able to view inventory and paint status, but is not able to edit them and has no admin privileges.
2. Jane: Jane represents a manager who is able to edit inventory and paint status, but has no admin privileges.
3. Bob: Bob represents a painter who is able to edit inventory and paint status, but has no admin privileges.
4. Adam: Adam represents an admin user so he is able to create, delete, and edit users by accessing the `/admin/` dashboard  

### API Documentation 
- `/admin/`: access admin dashboard which provides access to users, groups, and the Paints model
- `/api/`: retrieve all paint info 
- `/api/post/<str:colour>/`: update paint info of specific paint colour
- `/api/account/login/`: login user 
- `/api/account/logout/`: logout user 

### Local Setup 
1. Clone this repository 
2. Navigate to the root directory of the repository.
2. Run `npm install` 
3. Run `pip install -r requirements.txt`
4. Start the backend: Run `python manage.py runserver`
5. Start the frontend: Run `npm start` 
6. Navigate to the frontend at `localhost:3000`
7. Navigate to the backend server at `localhost:8000`. Read section 'API Documentation' for information on how to use backend server. 

### Testing 
Frontend Tests: `npm test`
Backend Tests: `python manage.py test`

### Project Assumptions 
1. It is not necessary for there to be a register user / create account page because this can be done on the admin dashboard by staff accounts.
2. The only functionality that needs to be done on the app is tracking paint inventory and status, bulk orders would not be performed through the application. 

### References 
LOGO.com was used to generate the company logo. This logo is stored at `./public/logo.png`.