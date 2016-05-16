var frisby = require('./lib/frisby');
var cst = require('./lib/constants');
var token = '';
var val;


frisby.create('Employee Create')
    .post(cst.MAIN_URL + cst.EMPLOYEE + cst.CREATE, {
        email: cst.EMAIL_TEST
    })
    .timeout(10000)
    .expectStatus(201)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectBodyContains('Successful user creation')
    .inspectRequest()
    .inspectBody()
    .toss();


frisby.create('Authentication Test')
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

            //GET /api/employee/list/ Returns the full employee list
            frisby.create('Employee List Test')
                .get(cst.MAIN_URL + cst.EMPLOYEE + cst.LIST)
                .addHeader('Authorization', 'Token ' + token)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectStatus(200)
                .afterJSON(
                    function(json) {

                        for (var i = 0; i <= json.results.length - 1; i++) {
                            val = json.results[i];
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
    frisby.create('Employee Deactivate Test -- ' + val.pk)
        .patch(cst.MAIN_URL + cst.EMPLOYEE + val.pk + '/' + cst.DEACTIVATE)
        .addHeader('Authorization', 'Token ' + token)
        .expectStatus(202)
        .expectHeaderContains('Content-Type', 'application/json')
        .toss();
}

function activate(val) {
    frisby.create('Employee Activate Test -- ' + val.pk)
        .patch(cst.MAIN_URL + cst.EMPLOYEE + val.pk + '/' + cst.ACTIVATE)
        .addHeader('Authorization', 'Token ' + token)
        .expectStatus(202)
        .expectHeaderContains('Content-Type', 'application/json')
        .toss();
}

function scoreApi(val) {
    frisby.create('Employee Sccore Test ' + val.pk)
        .get(cst.MAIN_URL + cst.EMPLOYEE + cst.LIST + cst.TOP + cst.EMP_TOTAL_SCORE + '/' + val.pk + '/')
        .addHeader('Authorization', 'Token ' + token)
        .expectStatus(200)
        .expectHeaderContains('Content-Type', 'application/json')
        .expectJSONTypes('?', {
            'pk': Number,
            'username': String,
            'first_name': String,
            'last_name': String,
            'avatar': String,
            'value': Number
        })
        .toss();
}