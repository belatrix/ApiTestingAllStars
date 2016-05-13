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
                    "keyword": "1",
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

                    frisby.create('Get star')
                      .get(constants.MAIN_URL + constants.STAR + constants.STAR_ID)
                      .addHeader('Authorization', 'Token' + token)
                      .expectStatus(200)
                      .expectJSONTypes({
                          pk: Number,
                          date: String,
                          text: String,
                          from_user: Number,
                          to_user: Number,
                          category: Number,
                          subcategory: Number,
                          keyword: Number
                      })
                      .afterJSON(function (json){
                        console.log("\nStar:");
                        console.log("ID: " +json.pk+"\nFrom user: "+ json.from_user);

                          frisby.create('Get stars list from employee')
                            .get(constants.MAIN_URL + constants.STAR + constants.IDBOBBY + '/' + constants.LIST)
                            .expectStatus(200)
                            /*.expectJSONTypes({
                              pk: Number,
                              date: String,
                              text: String,
                              from_user: Number,
                              to_user: Number,
                              category: Number,
                              subcategory: Number,
                              keyword: Number
                            })*/
                            //.afterJSON(function (json){
                              //for(var i=0; i<json.length; i++){
                                //console.log(json.pk);
                              //}
                            //})
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
