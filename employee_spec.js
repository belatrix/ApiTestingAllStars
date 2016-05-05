var frisby = require('./lib/frisby');
var cst = require('./lib/constants');
var token = "";
var val;
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
            log('Employee List Test ');
            //GET /api/employee/list/ Returns the full employee list
            frisby.create('Employee List Test')
                .get(cst.MAIN_URL + cst.EMPLOYEE + cst.LIST)
                .addHeader('Authorization', 'Token ' + token)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectStatus(200)
                .inspectRequest()
                .afterJSON(
                    function(json) {
                        log(json);
                        log('Employee List Test Passed');
                        log('=====================================================');

                        for (var i = 0; i <= json.results.length - 1; i++){
                            val = json.results[i];
                            console.log(val.pk);

                            if (val.pk != '1') {
                                deactivate(val);
                            }

                            activate(val);

                            scoreApi(val);


                        }
                    })
                .toss();

        })
    .toss();

    function deactivate(val) {
        frisby.create('Employee ' + cst.DEACTIVATE + 'Test -- '+ val.pk)
            .patch(cst.MAIN_URL + cst.EMPLOYEE + val.pk + '/' + cst.DEACTIVATE)
            .addHeader('Authorization', 'Token ' + token)
            .expectStatus(202)
            .expectHeaderContains('Content-Type', 'application/json')
            .inspectRequest()
            .inspectBody()
            .toss();
    }
    function activate(val) {
        frisby.create('Employee ' + cst.ACTIVATE + 'Test -- ' + val.pk)
            .patch(cst.MAIN_URL + cst.EMPLOYEE + val.pk + '/' + cst.ACTIVATE)
            .addHeader('Authorization', 'Token ' + token)
            .expectStatus(202)
            .expectHeaderContains('Content-Type', 'application/json')
            .inspectRequest()
            .toss();
    }
    function scoreApi(val) {
    frisby.create('Employee SCORE Test ' + val.pk)
        .get(cst.MAIN_URL + cst.EMPLOYEE + cst.LIST + cst.TOP + cst.EMP_TOTAL_SCORE + '/' + val.pk + '/')
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
        .toss();
    }

function log(params) {
    console.log(params);
}
