var frisby = require('./lib/frisby');
var constants = require('./lib/constants');
var token = "";

//Authentication Test
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

            //Give Stars Test
            frisby.create('Give Stars Test')
                .post(constants.MAIN_URL + constants.STAR + constants.IDSERGIO + constants.GIVESTARS + constants.IDBOBBY + '/' , {
                    "category": "1",
                    "subcategory": "1",
                    "text": "MVP"
                },  {
                    json: true
                })
                .addHeader('Authorization', 'Token ' + token)
                .expectStatus(201)
                .afterJSON(
                    function() {
                        frisby.globalSetup({
                            request: {
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }
                        });

                    })
                .toss();
        })
    .toss();


function log(params) {
    console.log(params);
}
