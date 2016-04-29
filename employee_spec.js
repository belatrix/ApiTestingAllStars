var frisby = require('./lib/frisby');


frisby.create('Authentication')
    .post('https://allstars-belatrix.herokuapp.com:443/api/employee/authenticate/', {
        "username": "sinfante",
        "password": "allstars"
    }, {
        json: true
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSONTypes({
        token: String,
        user_id: Number
    })
    .afterJSON(
        function(res) {
            frisby.globalSetup({
                request: {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            });
            console.log("Autenticated with token : " + res.token);
            frisby.create('Get employee list 2')
                .get('https://allstars-belatrix.herokuapp.com:443/api/employee/list/')
                .expectStatus(200)
                .addHeader('Authorization', 'Token ' + res.token)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectJSONTypes({
                    count: Number,
                    next: null,
                    previous: null,
                    results: [{
                      pk: Number,
                      username: String,
                      email: String,
                      first_name: String,
                      last_name: String,
                      level: Number,
                      avatar: String,
                      score: Number,
                      last_month_score: Number,
                      current_month_score: Number
                  }]
                })
                .toss();
        })
    .toss();
