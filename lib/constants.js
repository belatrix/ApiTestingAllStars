function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}
function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}
//Constants
define("MAIN_URL", "https://allstars-belatrix.herokuapp.com:443/api/");
define("EMPLOYEE", "employee/");
define("CATEGORY", "category/");
define("STAR", "star/");
define("GIVESTARS", "/give/star/to/");
//Authentication Attributes
define("USERNAME", "sinfante");
define("PASSWORD", "allstars");
define("PASSWORD2", "allstarss");
//Stars Attributes
define("IDSERGIO", "1");
define("IDBOBBY", "16");

//https://allstars-belatrix.herokuapp.com:443/api/employee/1/give/star/to/16
//https://allstars-belatrix.herokuapp.com:443/api/stars/1/give/star/to/16
