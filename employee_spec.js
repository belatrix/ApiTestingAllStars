var frisby = require('./lib/frisby');
var constants = require('./lib/constants');
var token = "";

log('=====================================================');
log('Employee Test Authentication');

frisby.create('Authentication Test')
    .post(constants.MAIN_URL + constants.EMPLOYEE + 'authenticate/', {
        username: constants.USER_NAME,
        password: constants.USER_PASSWORD
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
    .inspectRequest()
    .inspectHeaders()
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
            log('Employee Test Authentication Passed');
            log('=====================================================');
            log('Employee List Test');
            //GET /api/employee/list/ Returns the full employee list
            frisby.create('Employee List Test')
                .get(constants.MAIN_URL + constants.EMPLOYEE + constants.LIST)
                .addHeader('Authorization', 'Token ' + token)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectStatus(200)
                .expectJSONTypes({
                    count: Number,
                    next: String,
                    previous: function(value) {
                        if (value === "undefined") {
                            value = 0;
                        } else if (value === "null") {
                            value = 0;
                        }
                    },
                    results: Object
                })
                .inspectRequest()
                .expectJSONTypes('results.*', {
                    pk: Number,
                    username: String,
                    email: String,
                    first_name: String,
                    last_name: String,
                    level: Number,
                    avatar: String,
                    total_score: Number,
                    last_month_score: Number,
                    last_year_score: Number,
                    current_month_score: Number,
                    current_year_score: Number,
                    last_month_score: Number,
                    current_month_score: Number
                })
                .afterJSON(
                    function(res) {
                        log('Employee List Test Passed');
                        log('=====================================================');
                        log('Employee List Test 2');
                        //GET /api/employee/list/top/{kind}/{quantity}/ Returns top {quantity} list, {kind} (total_score, level, last_month_score, current_month_score, last_year_score, current_year_score)
                        frisby.create('Employee List Test 2')
                            .get(constants.MAIN_URL + constants.EMPLOYEE + constants.LIST + constants.TOP + constants.EMP_TOTAL_SCORE + '/2')
                            .addHeader('Authorization', 'Token ' + token)
                            .expectStatus(200)
                            .expectHeaderContains('Content-Type', 'application/json')
                            .inspectRequest()
                            .expectJSONTypes('?', {
                                "pk": Number,
                                "username": String,
                                "first_name": String,
                                "last_name": String,
                                "avatar": String,
                                "value": Number
                            })
                            .afterJSON(
                                function() {
                                    log('Employee List Test 2 Passed');
                                    log('=====================================================');

                                })
                            .toss();
                    })
                .toss();

        })
    .toss();


function log(params) {
    console.log(params);
}
