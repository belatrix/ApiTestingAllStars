var frisby = require('./lib/frisby');
var constants = require('./lib/constants');

 //////////////// Category List
            frisby.create('Returns full category list ordered by weight')
                .get(constants.MAIN_URL + constants.CAT + constants.LIST)
                .expectStatus(200)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectJSONTypes('?',{
                    pk: Number,
                    name: String,
                    weight: Number,
                    comment_required: Boolean
                })


                .afterJSON(function(json) {
                  console.log(json.pk);
                  for (var i =0 ; i<json.length; i++) {
                      console.log("For " + i);
                      var val = json[i];
                      subcategoryList(val);
                  }


        //////////////// Subcategory List according de ID
                function subcategoryList(val){
                    console.log("Category: " + val.name + " - id: " +val.pk);
                    frisby.create('Returns full subcategory list according to category id')
                    .get(constants.MAIN_URL + constants.CAT + val.pk +'/' + constants.SUBC + constants.LIST)
                    .expectStatus(200)
                    .expectHeaderContains('Content-Type', 'application/json')
                    .expectJSONTypes('?',{
                        pk: Number,
                        name: String
                    })

                    .afterJSON(
                      console.log('Returns full subcategory list according to category id - Passed')
                    );

                  }

                })
                .toss();

//////////////// Keyword List
                  frisby.create('Returns full keyword list ordered by name')
                  .get(constants.MAIN_URL + constants.CAT + constants.KEY + constants.LIST)
                  .expectStatus(200)
                  .expectHeaderContains('Content-Type', 'application/json')
                  .expectJSONTypes('?',{
                      pk: Number,
                      name: String
                  })

                  .toss();



//////////////// Subcategory List

            frisby.create('Returns full subcategory list ordered by name')
            .get(constants.MAIN_URL + constants.CAT + constants.SUBC + constants.LIST)
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .expectJSONTypes('?',{
                pk: Number,
                name: String
            })

            .afterJSON(function(json) {
              console.log(json.pk);
              console.log("----");
              for (var i =0 ; i<json.length; i++) {
                  console.log("On the for " + i);
                  var val = json[i];
                  subcategoryDetail(val);
              }

////////////// Subcategory - Category
            function subcategoryDetail(val){
                console.log("Category: " + val.name + " - id: " +val.pk);
                frisby.create('Returns full subcategory list according to category id')
                .get(constants.MAIN_URL + constants.CAT + constants.SUBC + val.pk +'/')
                .expectStatus(200)
                .expectHeaderContains('Content-Type', 'application/json')
                .expectJSONTypes('*',{
                    pk: String,
                    name: String,
                    category: {
                      id: Number,
                      name: String,
                      weight: Number,
                      comment_required: Boolean
                    }
                });
                }
              })
              .toss();
