const fs = require('fs');
const uuidv1 = require('uuid/v1');
const path = require('path');
const querystring=require('querystring')
const filePath = path.normalize(__dirname + '/../data/wish.json');
const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';
let getdb=(callback)=>{
// const MongoClient = require('mongodb').MongoClient;


// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'liu';

//   MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);
//   }）
// }


let getRandom = (min,max)=> {	
	return Math.round(min + (max-min)*Math.random());
}

const colorArr = ['#f10','#ff0','#ff5600','#0f1'];

let add = (options,callback)=>{
options._id = uuidv1();
options.color = colorArr[getRandom(0,colorArr.length-1)];
const dbName = 'liu';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
      //插入
   //1创建集合
  const col=db.collection('documents')
  //插入
  col.insertOne(options,function(err,result){
  	if(!err){
  		callback(null,options);
  	}else{
  		callback(err)
  	}
  })
  client.close();
});

}

let get = (callback)=>{
	const dbName = 'liu';

	// Use connect method to connect to the server
	MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
	  console.log("Connected successfully to server");

	  const db = client.db(dbName);
	  const col = db.collection('documents');
	  // Find some documents
	  col.find({}).toArray(function(err, docs) {
	    if(!err){
	    	callback(null,docs);
	    }else{
	    	console.log(err)
	    }
	  });
	client.close();
	});
}

let remove = (id,callback)=>{
	const dbName = 'liu';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  //删除
   const col = db.collection('documents');
   col.deleteOne({_id:id}, function(err, result) {
    if(!err){
    	callback(null);
    }else{
    	callback(err);
    }
  });    
    client.close();
});
}

module.exports = {
	get:get,
	add:add,
	remove:remove
}