const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'liu';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // client.close();


/*
   //插入
   //1创建集合
  const col=db.collection('documents')
  //插入
  col.insertMany([{content:"我想变帅"},{content:"我想变高"}],function(err,result){
  	if(!err){
  		console.log(result)
  	}else{
  		console.log(err)
  	}
  })
  client.close();
  */




/*
  //查询
  // Get the documents collection
  const col = db.collection('documents');
  // Find some documents
  col.find({content:"我想变帅"}).toArray(function(err, docs) {
    // console.log("Found the following records");
    // console.log(docs)
    // callback(docs);
    if(!err){
    	console.log(docs)
    }else{
    	console.log(err)
    }
  });
client.close();
*/

/*
//更新
 const col = db.collection('documents');
  col.updateOne({content:"我想变帅"}
    , { $set: {color:"red"} }, function(err, result) {
    if(!err){
    	console.log(result)
    }else{
    	console.log(err)
    }
  });  
  client.close();
*/

  //删除
   const col = db.collection('documents');
   col.deleteOne({content:"我想变帅"}, function(err, result) {
    if(!err){
    	console.log(result)
    }else{
    	console.log(err)
    }
  });    
    client.close();
 })