var frisby = require('./lib/frisby');
var cst = require('./lib/constants');
var token = "";

log('=====================================================');
log('Employee Test Authentication -- 1');

frisby.create('Authentication Test -- 1')
    .post(cst.MAIN_URL + cst.EMPLOYEE + 'authenticate/', {
        username: cst.USER_NAME,
        password: cst.USER_PASSWORD
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
            log('Employee Test Authentication Passed -- 1');
            log('=====================================================');
            log('Employee List Test -- 2');
            //GET /api/employee/list/ Returns the full employee list
            frisby.create('Employee List Test')
                .get(cst.MAIN_URL + cst.EMPLOYEE + cst.LIST)
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
                        log('Employee List Test Passed -- 2');
                        log('=====================================================');
                        log('Employee List Test ' + cst.EMP_TOTAL_SCORE + ' -- 3');

                        //GET /api/employee/list/top/{kind}/{quantity}/ Returns top {quantity} list, {kind} (total_score, level, last_month_score, current_month_score, last_year_score, current_year_score)
                        frisby.create('Employee List Test 2')
                            .get(cst.MAIN_URL + cst.EMPLOYEE + cst.LIST + cst.TOP + cst.EMP_TOTAL_SCORE + '/' +  cst.T1_QUANTITY)
                            .addHeader('Authorization', 'Token ' + token)
                            .expectStatus(200)
                            .expectHeaderContains('Content-Type', 'application/json')
                            .inspectRequest()
                            .inspectBody()
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
                                    log('Employee List Test ' + cst.EMP_TOTAL_SCORE + ' Passed -- 3');
                                    log('=====================================================');

                                    log('Employee DEACTIVATE Test 4');
                                    frisby.create('Employee ' + cst.EMP_TOTAL_SCORE + 'Test -- 4')
                                        .patch(cst.MAIN_URL + cst.EMPLOYEE + 2 +'/'+ cst.DEACTIVATE)
                                        .addHeader('Authorization', 'Token ' + token)
                                        .expectStatus(202)
                                        .expectHeaderContains('Content-Type', 'application/json')
                                        .inspectRequest()
                                        .inspectBody()
                                        .afterJSON(
                                            function() {
                                                log('Employee List Test DEACTIVATE Passed -- 4');
                                                log('=====================================================');

                                                log('Employee ACTIVATE Test 5');
                                                frisby.create('Employee ' + cst.EMP_TOTAL_SCORE + 'Test -- 5')
                                                    .patch(cst.MAIN_URL + cst.EMPLOYEE + 2 +'/'+ cst.ACTIVATE)
                                                    .addHeader('Authorization', 'Token ' + token)
                                                    .expectStatus(202)
                                                    .expectHeaderContains('Content-Type', 'application/json')
                                                    .inspectRequest()
                                                    .inspectBody()
                                                    .toss();
                                            })
                                        .toss();
                                })
                            .toss();
                    })
                .toss();
        })
    .toss();


function log(params) {
    console.log(params);
}
