
//API:
var express = require('express');
var router = express.Router();
var topics = [
    { name: 'idName' },
    { name: 'title' },
    { name: 'description' },
    { name: 'timespent' },
    { name: 'master' },
    { name: 'startingdate' },
    { name: 'source' },
    { name: 'progress' },
    { name: 'completiondate' }
];

router.route('/topics').get((req, res) => {
    console.log("Ekaa Rest-Apia kutsuttu!");
    res.json(topics);
}).post((req, res) => {
    console.dir(req.body)
    let np = req.body;
   // np.id = uuid();
    topics.push(np);
    saveTopics();
    console.log("Luodaan uutta...")
    res.status(201);
    res.json(np);
})

//idnamella hakeminen?
router.route('/topics/:idName').get((req, res) => {
    console.log("Yksittäisen hakeminen");
    console.dir(req.params);
    //  res.send(req.params.id);
    for (let p of topics) {
        if (p.idName == req.params.idName) {
            res.json(p)
            return;
        }
    }
    res.json({ msg: "Ei löydy" });
}).delete((req, res) => {
    console.log("Delete: " + req.params.idName);
    for (let i=0; i<topics.length; i++) {
        if (people[i].idName == req.params.idName) {
            topics.splice(i, 1);
            res.json({msg:"deleted: " + req.params.idName})
            saveTopics();
            return;
        }
    }
    res.json({ msg: "Ei löydy" });
})
function saveTopics() {
    fs.writeFile("topics.json", JSON.stringify(topics), () => { console.log("Henkilöt tallennettu") })
}

module.exports = router;