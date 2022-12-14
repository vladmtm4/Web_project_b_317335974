const express = require("express");
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const CRUD_operations = require("./CRUD_functions");
const app = express();
const sessions = require('express-session');
const db_creation = require("./db_creation");


app.use(express.static(path.join(__dirname,'static')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true
}));

app.get('/',(req,res)=>
{
  console.log("Cookie is: "+ GetUser(req,res));
  res.redirect('/home_page');
  
});

app.get('/home_page',(req,res)=>
{
    
    //res.sendFile(path.join(__dirname,'view/home_page.html'));
    res.render('home_page');
}
);

app.get('/log_in',(req,res)=>
{
    //res.sendFile(path.join(__dirname,'view/log_in.html'));
    res.clearCookie("UserEmail");
    res.render('log_in');

});

app.get('/sign_up',(req,res)=>
{
    //res.sendFile(path.join(__dirname,'view/sign_up.html'))
    res.render('sign_up');
});

app.get('/my_profile',CRUD_operations.get_user_data_session);

app.get('/meet_roomate',CRUD_operations.get_users_table);

app.post('/filter_table',CRUD_operations.get_users_table_filtered);

app.listen(port, ()=>
{
    console.log('this is the port you are on' + port)
});

app.post('/newUser' ,CRUD_operations.create_new_user);
app.post("/Check_login", CRUD_operations.Login);
app.post("/Update_user", CRUD_operations.update_user);
app.post("/Update_user_preference", CRUD_operations.update_user_preference);

app.get('/CreateTable',db_creation.CreateUsersTable);
app.get('/DropTable',db_creation.DropUsersTable);
app.get('/InsertData',db_creation.InsertDataToUsers);
app.get('/ShowTable',db_creation.ShowUsersTable);



function GetUser(req,res){
    if (req.get("Cookie"))
    {
       var session = req.get("Cookie");
       console.log("Session is +"+session)
       var splitSession = session.split(/=|;/);
       var email = splitSession[1];
       return email;
   }};
