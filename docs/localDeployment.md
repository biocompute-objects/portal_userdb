# BioCompute Portal Local Deployment Instructions/notes

This README provides instructions to deploy the BioCompute Portal Locally

## Prerequisites

Before starting, ensure you have the following installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en)
- [Python 3](https://www.python.org/downloads/)
- [PyEnv](https://github.com/pyenv/pyenv) (optional but recommended)


## BCO Portal Client deployment  (portal_userdb/client)

- For HTTPS access: 

`git clone https://github.com/biocompute-objects/portal_userdb` 

- For SSH access*(RECCOMENDED)*: 

`git@github.com:biocompute-objects/portal_userdb.git` 

**Then**

`cd portal_userdb/`

**Make sure you are on the desired branch:**

`git switch <BRANCH NAME>` *(24.06.27 Reccomended)*

**Stash Any Local Changes**

`git stash
git stash drop`

### Enter the repository, create a environment file, and install the required packages

`cd portal_userdb/client/`

##### For Windows: 

`cd portal_userdb/client/`

**Install Node packages via Node Package Manager (NPM)**

`npm install`

**Set up the environment file**

`cp .env.example .env`

Then you will have to add values for the following:

	REACT_APP_USERDB_URL=http://localhost:8080/users/
	REACT_APP_BCOAPI_URL=http://127.0.0.1:8000/api/
	REACT_APP_GOOGLE_CLIENT_ID=******************************************
	REACT_APP_ORCID_URL=https://sandbox.orcid.org
	REACT_APP_ORCID_CLIENT_ID==******************************************
	REACT_APP_ORCID_CLIENT_SECRET==******************************************
	REACT_APP_SERVER_URL=http://localhost:3000
 	REACT_APP_BCOAPI_TOKEN=*****************
  
**Verify you are still in the right directory and install client dependencies**

`cd client`

`npm install`

### **Start service**

`npm run start`

This will open `http://localhost:3000/` in your default web browser if everything went according to plan. See the [troubleshooting tips](troubleshooting.md) if not.

This terminal will be serving the React frontend.

## BCO Portal Server deployment  (portal_userdb/server)

**Open a new terminal and return to the project root**

`cd PATH/TO/PROJECT/portal_userdb`

### Enter the server directory, create a virtual environment, and install the required packages

##### For Mac/Linux:

`cd server`

`pyenv local 3.10.6` *(optional)*

`python3 -m venv env`

`source env/bin/activate`

`pip3.9 install -r requirements.txt`

##### For Windows:

`cd server`

`python -m venv env`

`source env/Scripts/activate`

`pip install -r requirements.txt`

##### If Given the Error Failed Building Wheel For Ruamel.Yaml.Clib Run These Commands

`pyenv local (if pyenv was installed)`

`pyenv versions (if pyenv was installed)`

`pyenv local 3.10.6 (if pyenv was installed)`

`source ~/.zshrc (or specified terminal)`

`pip install --upgrade pip`

##### Rerun Installation of Requirements.txt

`pip install -r requirements.txt`

#### Generate the secrets file
----

- Copy the `.secrets.example` to `.secrets`

	`cp .secrets.example .secrets`

- On linux (or MAC) generate a 32-bytes long PSK key using the openssl command for the `DJANO_KEY`:

`openssl rand -base64 32`

- On Windows, generate a 32-bytes long PSK key using the PowerShell command for the `DJANGO_KEY`:
   
`[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])`


- Update the `.secrets` file with the required keys: 

```
[GOOGLE_KEYS]
DJANGO_GOOGLE_OAUTH2_CLIENT_ID=<your-client-id-here>
DJANGO_GOOGLE_OAUTH2_CLIENT_SECRET=<your-client-secret-here>

[DJANGO_KEYS]
SECRET_KEY=<your-Django-secret-key--here>

[ORCID_KEYS]
DJANGO_ORCID_OAUTH2_CLIENT_URL=http://localhost:3000
DJANGO_ORCID_OAUTH2_CLIENT_ID=<your-orcid-id-here>
DJANGO_ORCID_OAUTH2_CLIENT_SECRET=<your-orcid-secret-here>
DJANGO_ORCID_OAUTH2_URL=https://sandbox.orcid.org

[SERVER]
SERVER_VERSION=24.04
SERVER_URL=http://localhost:3000
SERVER_DB_URL=http://127.0.0.1:8000
#DATABASE=/Users/hadley_king/Data/userdb/db.sqlite3
DATABASE=db.sqlite3
```

#### Set up DB
---
##### Option #1: Use existing DB

`cp admin/db.sqlite3 .`

`python3 manage.py migrate`

````
superusername: bco_api_user
password: testing123
````

---
##### Option #2: Create a new DB with test data
Create a DB:

`python3 manage.py migrate`

Load the DB with test data:

`python manage.py loaddata config/fixtures/local_data/json`

---
#### Run Server
`python3 manage.py runserver 8080`

Make sure API is accessible via web browser. EX: 
````
http://localhost:8080/users/admin/ 
````
If it worked you should be able to see the API Documentation site at:

`http://localhost:8080/users/docs/`

## BCO_API

The BCO API repository contains a top-level folder “admin_only” which contains service definitions for gunicorn and django.  Thus, we can first clone the repository (only necessary to clone once since we can use the shell scripts in the repository after the initial cloning to administer the application), then we can perform a few administrative steps to start the API.

### Clone the repository
`git clone https://github.com/biocompute-objects/bco_api`

`cd bco_api`

Make sure you are on the desired branch (Check for latest branch):

`git switch 24.06.27`

Enter the repository, create a virtual environment, and install the required packages

`pyenv local 3.10.6`

`python3 -m venv env`

`source env/bin/activate`

`python -m pip install -r requirements.txt `

(You can use python3.9 if you’d like, but since you’re in the virtual environment you created python points to python3.9)

### Modify the .Secrets file:
#### Check/Edit the .secrets file

*This is the main server configuration file for the BCO API.   (most of these values will NOT need to be changed for local deployment)*

`nano .secrets`

**Add Given Fields and Contact Admin for Keys

```
[DJANGO_KEYS]
SECRET_KEY=***************
ANON_KEY=******************************
[SERVER]
PRODUCTION=False
DEBUG=True
ALLOWED_HOSTS=*
SERVER_VERSION=24.06.13
HOSTNAME=127.0.0.1:8000
HUMAN_READABLE_HOSTNAME=DEV BCODB
PUBLIC_HOSTNAME=http://127.0.0.1:8000
SERVER_URL=http://localhost:3000
DATABASE=db.sqlite3
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```


#### Set up DB

`cd bco_api/bco_api`

---
##### Option #1: Use existing DB

**Copy the dev db**

`cp ../admin_only/db.sqlite3.dev db.sqlite3`

````
superusername: bco_api_user
password: testing123
````

**Make Migrations**

`python3 manage.py migrate`

---
##### Option #2: Create a new DB

**Make Migrations**

`python3 manage.py migrate`

**Create a super user for the API:**

`python3 manage.py createsuperuser`

Then follow the prompts


---
#### Then:  Do a quick check to make sure the server can run


**Start the server**

`python3 manage.py runserver 8000`


**Make sure API is accessible via web browser.**

``[YOU WEB HOST HERE]/api/admin/``

EX: http://localhost:8000/api/admin/

*If it worked you should be able to login using the SuperUser credentials you created above*

**Log in with the superuser credentials you created or imported**

If you copied over the existing dbs you should be able to log in with any of the crednetials listed in `/portal_userdb/server/admin/users.tsv`

Otherwise you will have to register a new user. 
