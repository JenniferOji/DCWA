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
        var cursor = coll.find()  // Ensure 'coll' is the correct collection
        cursor.toArray()
            .then((documents) => {
                resolve(documents);  // Return the fetched documents
            })
            .catch((error) => {
                reject(error);  // Handle errors
            });
    });
}


module.exports = {findAll}

