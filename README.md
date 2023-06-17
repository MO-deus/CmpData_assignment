## Volopay Assignment :

### Setup : 

#### Node modules

    -   git clone https://github.com/MO-deus/CmpData_assignment.git
    -   Open the terminal in the directory where you have downloaded the project
    -   In the command line install the following node_modules
        - npm i express
        - npm i express-async-handler
        - npm i mongoose
        - npm i config
        - npm i dotenv
  
#### MongoDB setup
    - Goto this link : https://www.mongodb.com/atlas/database
    - Create an user account
    - Setup the user and password
    - create a database and name of collection
    - Install MongoDB for Vscode
    - Click on the leaf icon on right of vscode
    - create a connection using the connection string
      - connection string can be obtained from the site by going to connect and selecting MongoDb for Vscode.
    - enter that string in the prompt above and connect to database.
    - now go to connect option again and select drivers
    - copy the string and replace <password> with the one you decided on.
    - and add the database name in the middle of ...mongodb.net/<database_name>?retryWrites=tru...
    - setup the .env file by naming CONNECTION_STRING = (the string copied above) and PORT = 3000.

#### Running the project
    - in the command line terminal go to the directory where the project is downloaded and type "npm run dev"
    - This would start the project and following lines will be given on the terminal : 
        - Server running on 3000
        - Database connected :  <database-name> <host-name>
    - if not follow the procedures again

### POSTMAN/Thunderclient for testing
    - setup POSTMAN/thunder client using the POSTMAN_setting.json
  