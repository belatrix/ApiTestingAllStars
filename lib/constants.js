function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

//URL'S
define("MAIN_URL", "https://allstars-belatrix.herokuapp.com:443/api/");
define("EMPLOYEE", "employee/");
define("CATEGORY", "category/");
define("STAR", "star/");
define("GIVESTARS", "/give/star/to/");
define("AUTHENTICATE", "authenticate/");
define("AUTH", "auth/");
define("PASSWORD", "password/");
/* TEST VALUES*/

//Authentication Attributes

define("USER_NAME", "sinfante");
define("USER_PASSWORD", "allstars");
define("USER_PASSWORD2", "allstarss");
define("IDSERGIO", "1");
define("IDBOBBY", "16");


/* MODEL ATTRIBUTES */

//Employee
define("EMP_PK", "pk");
define("EMP_USER_NAME", "username");
define("EMP_FIRST_NAME", "first_name");
define("EMP_LAST_NAME", "last_name");
define("EMP_ROLE", "role");
define("EMP_SKYPE_ID", "skype_id");
define("EMP_LAST_MONTH_SCORE", "last_month_score");
define("EMP_LAST_YEAR_SCORE", "last_year_score");
define("EMP_CURRENT_MONTH_SCORE", "current_month_score");
define("EMP_CURRENT_YEAR_SCORE", "current_year_score");
define("EMP_LEVEL", "level");
define("EMP_TOTAL_SCORE", "total_score");
define("EMP_IS_ACTIVE", "is_active");
define("EMP_LAST_LOGIN", "last_login");

//Category
define("CAT_PK", "pk");
define("CAT_NAME", "name");
define("CAT_WEIGHT", "weight");
define("CAT_COMMENT", "comment_required");

//Subcategory
define("SUBCAT_PK", "pk");
define("SUBCAT_NAME", "name");
define("SUBCAT_CATEGORY", "category");

//Stars
define("STAR_PK", "pk");
define("STAR_DATE", "date");
define("STAR_TEXT", "text");
define("STAR_FROM_USER", "from_user");
define("STAR_TO_USER", "to_user");
define("STAR_CATEGORY", "category");
define("STAR_SUBCATEGORY", "subcategory");
