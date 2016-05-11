# ApiTestingAllStars

AllStarts Api Testing

Preconditions: Have node installed

## Running the tests

Install Frisby
```bash
$ npm install --save-dev frisby
```

Install Jasmine

```bash
$ npm install -g jasmine
```

## Running the tests

Finally, on the folder where the test file is located run the following command

```bash
$ jasmine-node (test)_spec.js
```

For more reference, check documentation

Node:
https://nodejs.org/en/

Frisby:
http://frisbyjs.com/

Jasmine:
https://www.npmjs.com/package/jasmine


## Local Server

Put on .bash_profile
```bash
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Code
source /usr/local/bin/virtualenvwrapper.sh
```

Install:
```bash
pip install -r requirements/local.txt
```

```bash
workon allstars
rm AllStars/db.sqlite3
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata sample_data/*.json
python manage.py runserver
```

To exit

```bash
deactivate
```
