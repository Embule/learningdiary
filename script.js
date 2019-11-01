

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

localStorage.setItem('topics', JSON.stringify(topics)) || [];
function getTopic(e) {
    e.preventDefault();
    var topics = document.getElementById('topics');
    // let topics = localStorage.getItem("topics");
    // if (topics) {
    //     this.topics = JSON.parse(topics) || [];
    // }
    var values = allStorage();
    console.dir(values);
    for (var i in values) {
        var p = document.createElement('p');
        p.innerHTML = i.value;
        topics.appendChild(p);
    }
    return JSON.parse(localStorage["topics"] || "null");
}


//hakee
function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
}

//window.localStorage.getItem('topics');
//JSON.parse(window.localStorage.getItem('topics'));

function saveData() {
    var idName = document.getElementById('idName').value;
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var timespent = document.getElementById('timespent').value;
    var master = document.getElementById('master').value;
    var startingdate = document.getElementById('startingdate').value;
    var source = document.getElementById('source').value;
    var progress = document.getElementById('progress').value;
    var completiondate = document.getElementById('completiondate').value;
    localStorage.setItem(idName, [idName, title, description, timespent, master, startingdate, source, progress, completiondate]);
}

module.exports = {topics, save}

