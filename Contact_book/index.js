var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

// DB setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// DB schema
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phoneNum:{type:String}
});

// db에 contact라는 이름의 collection 연결, 없다면 생성 후 연결
var Contact = mongoose.model('contact', contactSchema);

// Routes - Home
app.get('/', function(req, res){
  res.redirect('/contacts'); //메인 페이지가 /contacts 페이지
});

// Contacts - Index - find : db에 검색 조건에 맞는 data 서치 ({} : 검색 조건 비어있음, 모든 데이터 return)
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts}); 
    //render: 템플릿(html, ejs)을 불러옴, redirect: url로 이동
  });
});

// Contacts - New
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});

// Contacts - create : db에 data 생성
app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
