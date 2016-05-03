var frisby = require('./lib/frisby');
var constants = require('./lib/constants');


frisby.create('Authentication Test')
    .post(constants.MAIN_URL + constants.EMPLOYEE +'authenticate/', {
        username : constants.USERNAME,
        password : constants.PASSWORD
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
            log('Autenticated username :'+ constants.USERNAME +' and with token : ' + res.token);
            frisby.create('Employee List Test')
                .get(constants.MAIN_URL + constants.EMPLOYEE + 'list/')
                .expectStatus(200)
                .addHeader('Authorization', 'Token ' + res.token)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectJSONTypes({
                    count: Number,
                    next: String,
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
                .afterJSON(
                        function(res) {
                            log('Employee List Test Passed');
                })
                .toss();
        })
    .toss();


function log(params){
    console.log(params);
}
