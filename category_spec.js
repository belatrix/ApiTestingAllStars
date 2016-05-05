var frisby = require('./lib/frisby');
var constants = require('./lib/constants');



            frisby.create('Returns full category list ordered by weight')
                .get(constants.MAIN_URL + constants.CAT + constants.LIST)
                .expectStatus(200)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectJSONTypes({
                    pk: undefined,
                    name: undefined,
                    weight: undefined,
                    comment_required: undefined
                })

                .afterJSON(function(json) {
                    var value = json[0];
                    console.log(value.pk);
                    console.log(json.length);
                    console.log(json);
                    var sizej = json.length;
                    console.log(sizej);
                    


              frisby.create('Returns full subcategory list according to category id')
              .get(constants.MAIN_URL + constants.CAT + value.pk +'/' + constants.SUBC + constants.LIST)
              .expectStatus(200)
              .expectHeaderContains('Content-Type', 'application/json')
              .expectJSONTypes({
                  pk: undefined,
                  name: undefined
              })

              .afterJSON(
                      function(res) {
                          log('Sub category List Test according category id - Passed');
              })
            .toss();
/*
            frisby.create('Returns full subcategory list ordered by name')
            .get(constants.MAIN_URL + constants.CAT + constants.SUBC + constants.LIST)
            .expectStatus(200)
            .addHeader('Authorization', 'Token ' + res.token)
            .expectHeaderContains('Content-Type', 'application/json')
            .expectJSONTypes({
                pk: Number,
                name: String
            })

            .afterJSON(
                    function(res) {
                        log('Sub category List Test ordered by name - Passed');
            })
            .toss();

            frisby.create('Returns subcategory detail category list')
            .get(constants.MAIN_URL + constants.CAT + constants.SUBC)
            .expectStatus(200)
            .addHeader('Authorization', 'Token ' + res.token)
            .expectHeaderContains('Content-Type', 'application/json')
            .expectJSONTypes({
                pk: Number,
                name: String,
                category: String
            })

            .expectJSONTypes('category.*',{
              id: Number,
              name: String,
              weight: Number,
              comment_required: Boolean
            })
            .afterJSON(
                    function(res) {
                        log('Sub category List Detail Test - Passed');
            })
           .toss();
*/
    })
    .toss();


function log(params){
    console.log(params);
}
