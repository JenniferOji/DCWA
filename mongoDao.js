const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://127.0.0.1:27017')
    .then((client) => {
        db = client.db('proj2024MongoDB')
        coll = db.collection('lecturers')
    })
        .catch((error) => {
        console.log(error.message)
    })

var findAll = function() {
    return new Promise((resolve, reject) => {
        var cursor = coll.find().sort({_id: 1}) 
        cursor.toArray()
            .then((documents) => {
                resolve(documents);  //returning the fetched documents
            })
            .catch((error) => {
                reject(error);  //handling errors 
            });
    });
}

var deleteLecturer = function(id){
    return new Promise((resolve, reject) => {
        db.collection('lecturers').deleteOne({ _id: id }) 
            .then((documents) => {
                resolve(documents);  //returning the fetched documents
                console.log("deleted successfully")
            })
            .catch((error) => {
                reject(error);  //handling errors
            });
    });
}

module.exports = {findAll, deleteLecturer}

