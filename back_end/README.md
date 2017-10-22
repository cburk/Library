# Librarian

## Setup Instructions:
    To install the relevant node packages:
    
    `npm install`
    
    To get the database setup:
    
    ``

## Execution Instructions:
    
    `node back_end/index.js`
    
## Example Request Sequence:
    
    `curl -X PUT -H "Content-Type: application/json" -d '{"username":"jim", "password":"bob"}' -c mySessionStore.txt -b mySessionStore.txt localhost:8080/Register`
    
    `curl -X PUT -H "Content-Type: application/json" -d '{"username":"jim", "password":"bob"}' -c mySessionStore.txt -b mySessionStore.txt localhost:8080/Login`
    
    `curl -X PUT -H "Content-Type: application/json" -c mySessionStore.txt -b mySessionStore.txt -d '{"id":"2"}' localhost:8080/AddToCart`
