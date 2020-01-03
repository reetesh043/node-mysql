###Tutorial on Postman for Login Create and Delete with JWT AUTH 

#### Login
    URL => localhost:9000/user/signin
    Method => POST
    Headers => [{"key":"Content-Type", "name":"Content-Type", "value":"application/json"]
    
    Body => Raw -> type JSON 
    {
        "email": "xxxx@hotmail.com",
        "password": "xxxx",
    }
    
#### Create Account

    URL => localhost:9000/user/signup
    Method => POST
    Headers => [{"key":"Content-Type", "name":"Content-Type", "value":"application/json"]
    
    Body => Raw -> type JSON 
    {
        "username": "fhumel",
        "email": "xxxx@hotmail.com",
        "password": "xxxx",
        "name": "fernando"
    }
 
#### Delete User
    
    URL => localhost:9000/user/ID
    Method => DELETE
    Body => Raw -> type JSON
    Headers => [{"key":"Content-Type", "name":"Content-Type", "value":"application/json"}
               {"key":"Authorization", "name":"Authorization", 
               "value":JWT TOKEN_HERE}]
   