
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
router.route('/topics/:id').get((req, res) => {
    console.log("Yksittäisen hakeminen");
    console.dir(req.params);
    //  res.send(req.params.id);
    for (let p of topics) {
        if (p.id == req.params.id) {
            res.json(p)
            return;
        }
    }
    res.json({ msg: "Ei löydy" });
}).delete((req, res) => {
    console.log("Delete: " + req.params.id);
    for (let i=0; i<topics.length; i++) {
        if (people[i].id == req.params.id) {
            topics.splice(i, 1);
            res.json({msg:"deleted: " + req.params.id})
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