
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.set('view engine', 'ejs');
let items = ["To be happy"];
let workitems = [];

app.get("/", function(req, res){
 
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      var currentDay = new Date().toLocaleString("en-US" , options);

    res.render('list', {listTitle: currentDay , newitems: items});
});

app.post("/" ,function(req ,res){
  console.log(req.body);
  // console.log(req.body); we did this to get button value and use it
  let item = req.body.newtodo;
  if (req.body.list === 'Work-list' ) { 
    workitems.push(item);
    res.redirect("/work");
  
  } else {
    items.push(item);
    res.redirect("/");
  }
 
  // let item = req.body.newtodo;
  // items.push(item);
  //    res.redirect("/");
});

app.get("/work" ,function(req ,res) {
    res.render('list', {listTitle: "Work-list" , newitems: workitems});

})

app.get("/about" ,function (req,res) {
  res.render("about");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
