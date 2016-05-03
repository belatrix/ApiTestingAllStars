var frisby = require('./lib/frisby');
var constants = require('./lib/constants');
var token = "";
//Authentication Test
frisby.create('Authentication Test')
    .post(constants.MAIN_URL + constants.EMPLOYEE + 'authenticate/', {
        username: constants.USERNAME,
        password: constants.PASSWORD
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
            token = res.token;
            log(token);
            //Change Password Test
            frisby.create('Change Password Test')
                .post(constants.MAIN_URL + 'auth/password/', {
                    new_password: constants.PASSWORD2,
                    re_new_password: constants.PASSWORD2,
                    current_password: constants.PASSWORD
                })
                .addHeader('Authorization', 'Token ' + token)
                .expectStatus(200)
                .after(
                    function() {
                        frisby.globalSetup({
                            request: {
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }
                        });
                        //Give Stars Test
                        frisby.create('Change Password Test 2')
                            .post(constants.MAIN_URL + 'auth/password/', {
                                new_password : constants.PASSWORD,
                                re_new_password : constants.PASSWORD,
                                current_password : constants.PASSWORD2
                            })
                            .addHeader('Authorization', 'Token ' + token)
                            .expectStatus(200)
                            .toss();
                    })
                .toss();
        })
    .toss();


function log(params) {
    console.log(params);
}
