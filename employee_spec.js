
var frisby = require('./lib/frisby');

// Global setup for all tests
frisby.globalSetup({
  request: {
    headers:{'Accept': 'application/json'}
  }
});


frisby.create('Get Login reponse')
  .get('https://allstars-belatrix.herokuapp.com:443/api/employee/list')
  .expectStatus(403)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes({
    detail: String
  })
  .expectJSON({
    detail: 'Authentication credentials were not provided.'
  })
.toss();

frisby.create('Get Employee Authentication')
  .post('https://allstars-belatrix.herokuapp.com:443/api/employee/authenticate/', {"username": "sinfante" , "password":"allstars"})
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes({
    token: String,
    user_id : Number
  })
  .expectJSON({
    token: "2eebfabbaa7885a26ed984405a119ef147727c6f",
    user_id: 1
 })
.toss();
// This test will fail
frisby.create('Get Employee list')
  .get('https://allstars-belatrix.herokuapp.com:443/api/employee/list/')
  .addHeader('Authorization', 'Token 2eebfabbaa7885a26ed984405a119ef147727c6f')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON({
  count: 9,
  next: null,
  previous: null,
  results: [
    {
      pk: 5,
      username: 'acottini',
      email: 'acottini@belatrixsf.com',
      first_name: 'Anita',
      last_name: 'Cottini',
      level: 0,
      avatar: null,
      score: 9
    },
    {
      pk: 9,
      username: 'gyosida',
      email: 'gyosida@belatrixsf.com',
      first_name: 'Gianfranco',
      last_name: 'Yosida',
      level: 0,
      avatar: null,
      score: 4
    },
    {
      pk: 2,
      username: 'jvaldivia',
      email: 'jvaldivia@belatrixsf.com',
      first_name: 'Javier',
      last_name: 'Valdivia',
      level: 0,
      avatar: null,
      score: 3
    },
    {
      pk: 7,
      username: 'jgramaglia',
      email:'jgramaglia@belatrixsf.com',
      first_name: 'Jose',
      last_name: 'Gramaglia',
      level: 0,
      avatar: null,
      score: 4
    },
    {
      pk: 6,
      username: 'jizquierdo',
      email: 'jizquierdo@belatrixsf.com',
      first_name: 'Juliana',
      last_name: 'Izquierdo',
      level: 0,
      avatar: null,
      score: 0
    },
    {
      pk: 4,
      username: 'kcerron',
      email: 'kcerron@belatrixsf.com',
      first_name: 'Karla',
      last_name: 'Cerron',
      level: 0,
      avatar: null,
      score: 0
    },
    {
      pk: 8,
      username: 'marce',
      email: 'marce@belatrixsf.com',
      first_name: 'Marco',
      last_name: 'Arce',
      level: 0,
      avatar: null,
      score: 0
    },
    {
      pk: 3,
      username: 'pcarrillo',
      email: 'pcarrillo@belatrixsf.com',
      first_name: 'Pedro',
      last_name: 'Carrillo Chero',
      level: 0,
      avatar: null,
      score: 1
    },
    {
      pk: 1,
      username: 'sinfante',
      email: 'sinfante@belatrixsf.com',
      first_name: 'Sergio',
      last_name: 'Infante Montero',
      level: 0,
      avatar: null,
      score: 22
    }
  ]
 })
.toss();

frisby.create('Get employee list')
  .get('https://allstars-belatrix.herokuapp.com:443/api/employee/list/')
  .addHeader('Authorization', 'Token 2eebfabbaa7885a26ed984405a119ef147727c6f')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON({
  count: 9,
  next: null,
  previous: null,
  results: Array
 })
.toss();
