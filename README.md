# A Paint Company App

This web application is for employees at 'A Paint Company' to track the status of their paint inventory. The status options include 'Available', 'Running Low', and 'Out of Stock'. The application comprises two primary pages:
1. Login Page: The initial point of entry, where users are authenticated to ensure they possess the necessary authorization to access the paint status information.
2. Home Page with Kanban Board: The main interface showcasing a Kanban board. This board displays the various paints, along with their respective inventory levels, and categorizes them into 'swimlanes' corresponding to their inventory status.
---

### Techstack 
1. Frontend: React
2. Backend: Django, Python
3. Cloud Hosting Platform: Heroku
4. DevOps: GitHub Actions
---

### User Guide 
- Navigate to the deployed web application at https://a-paint-company-a54db84c4060.herokuapp.com/
- This will automatically redirect you to a login page.
- Log in with one of the user credentials listed below in the 'Users and User Permissions' section.
- Once logged in, you will be redirected to the main page. 
- The main page has a Kanban board with three sections for each paint status.
- If you are logged in as a user without 'Update' permissions, then you can only view the board (not edit).  
- To edit paint status, drag and drop a paint card to the appropriate column. When on mobile, you must hold down on the card with your finger to move it.
- To edit a paint's inventory, click the inventory value on the paint card and type in the correct value or use the up and down arrow toggle buttons. 
---

### Users and User Permissions
| Username   | Password       | User Group | Staff Status | Permissions   |
|------------|----------------|------------|--------------|---------------|
| john       | Ilovepainting3 | Assigners  | False        | View          |
| jane       | Ilovemanaging5 | Managers   | False        | View / Update |
| adam       | Iloveadmin7    | Admin      | True         | View / Update |
| bobpainter | Ilovepainting9 | Painters   | False        | View / Update |

1. John: John represents an employee who assigns houses to be painted. He is in the 'Assigners' user group so he is able to view paint inventory and status, but he is not able to update them and has no admin privileges.
2. Jane: Jane represents a manager. She is in the 'Managers' user group so she is able to view and update paint inventory and status, but has no admin privileges.
3. Bob: Bob represents a painter. He is in the 'Painters' user group so he is able to view and update paint inventory and status, but has no admin privileges.
4. Adam: Adam represents a system admin user. He is in the 'Admin' user group so he is able to create, delete, and edit users and user groups by accessing the `/admin/` dashboard. He is also able to view and update paint inventory and status.
---

### API Specification 
`/admin/`
- Description: access admin dashboard which provides access to users, groups, and the Paints model
- Method: GET
- Response: Renders the admin dashboard

`/api/`
- Description: Retrieve all paint information 
- Method: GET 
- Response: Returns JSON data containing details of all paints including the fields colour, status, and inventory
```json
[
    {
        "colour": "string",
        "status": "string",
        "inventory": integer
    }
]
```

`/api/post/<str:colour>/`
- Description: update paint info of specific paint colour
- Method: POST 
- Parameters: `colour`: The colour of the paint to be updated.
- Request Body: JSON data containing the updated information (can include fields status or inventory or both)
```{
  "status": "string", // Optional
  "inventory": integer // Optional
}```
- Response: Returns JSON data containing the updated paint details with fields colour, status, and inventory
```{
  "colour": "string",
  "status": "string",
  "inventory": integer
}```

`/api/account/login/`
- Description: Login user with JSON web token authentication.
- Method: POST
- Request Body: JSON data containing the user's username and password.
```{
  "username": "string",
  "password": "string"
}```
- Response: JSON data containing a JWT access token and user groups.
```{
  "token": "string",
  "user_groups": ["string", ...]
}```

`/api/account/logout/`
- Description: Logout user with JSON web token authentication.
- Method: GET 
- Response: JSON message indicating successful logout
```{
  "message": "string"
}```
---

### Setup Locally
1. Clone this repository `git clone https://github.com/michellejwatson/A_Paint_Company_App.git`
2. Navigate to the root directory of the repository
2. Run `npm install` 
3. Run `pip install -r requirements.txt`
4. Start the backend: Run `python manage.py runserver`
5. Start the frontend: Run `npm start` 
6. Navigate to the frontend at `localhost:3000`
7. Navigate to the backend server at `localhost:8000`. Read section 'API Documentation' for information on how to use backend server. 
---

### How to Test 
- Frontend Tests: `npm test`
- Backend Tests: `python manage.py test`
---

### Project Assumptions 
- I have made the assumption that it is not necessary for there to be a register user / create account page because this can be done on the admin dashboard by staff accounts.
- I have made the assumption that the display of paint inventory and status is the only required functionality beyond authentication, therefore actions such as bulk orders would not be performed through this application. 
- I have made the assumption that users like John, whose role only involves accessing paint information for their job, should only have viewing permissions on the application. This decision aligns with the principle of least privilege, which is a security best practice aiming to restrict users' access rights to the bare minimum required for their job responsibilities.
---

### Future Work 
- More thorough of testing needs to be implemented for both the frontend React app and the backend Django project. 
- Once these tests are created and working properly, testing needs to be added to the Github Actions workflow for improved DevOps capabilities. 
---

### References 
LOGO.com was used to generate the company logo. This logo is stored at `./public/logo.png` and at `./src/assets/logo.png`.