# Librarian

## Setup Instructions:
    To install the relevant node packages: `npm install`
    
    To get the database setup: 
    
    Y'all are smart people, just follow the tutorial (https://docs.mongodb.com/manual/administration/install-community/)
    
    

## Execution Instructions:
    Start the db: `sudo mongod`
    
    cd to the back_end directory (configs won't be recognized otherwise)

    Run the server: `node back_end/index.js`
    
## Example Request Sequence:
    
    ```
    curl -X PUT -H "Content-Type: application/json" -d '{"username":"ian", "password":"curtis"}' -c mySessionStore.txt -b mySessionStore.txt localhost:8080/Register
    
    curl -X PUT -H "Content-Type: application/json" -d '{"username":"ian", "password":"curtis"}' -c mySessionStore.txt -b mySessionStore.txt localhost:8080/Login
    
    curl -X PUT -H "Content-Type: application/json" -c mySessionStore.txt -b mySessionStore.txt -d '{"id":"2"}' localhost:8080/AddToCart
    ```
