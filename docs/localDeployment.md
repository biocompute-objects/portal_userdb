# BioCompute Portal Local Deployment Instructions/notes

## System Setup
### Requirements
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

`git switch <BRANCH NAME>` *(for whatever branch you need)*

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

### **Start service**

`npm run start`

This will open `http://localhost:3000/` in your default webbrowser if everything went according to plan. If not, see the [troubleshooting tips](troubleshooting.md).

This terminal will be serving the React frontend.

## BCO Portal Server deployment  (portal_userdb/server)

**Open a new terminal and retrun to the project root**

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
SERVER_VERSION=23.12.12
SERVER_URL=http://localhost:3000
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

`python manage.py loaddata tests/fixtures/testing_data.json`

---
#### Run Server
`python3 manage.py runserver 8080`

Make sure API is accessible via web browser. EX: 
````
https://localhost:8080/users/admin/ 
````
If it worked you should be able to see the API Documentation site at:

`http://localhost:8080/users/docs/`

## BCO_API

The BCO API repository contains a top-level folder “admin_only” which contains service definitions for gunicorn and django.  Thus, we can first clone the repository (only necessary to clone once since we can use the shell scripts in the repository after the initial cloning to administer the application), then we can perform a few administrative steps to start the API.

### Clone the repository
`git clone https://github.com/biocompute-objects/bco_api`

`cd bco_api`

Make sure you are on the desired branch (Check for latest branch):

`git switch 22.05`

Enter the repository, create a virtual environment, and install the required packages

`pyenv local 3.10.6`

`python3 -m venv env`

`source env/bin/activate`

`python -m pip install -r requirements.txt `

(You can use python3.9 if you’d like, but since you’re in the virtual environment you created python points to python3.9)

### Modify the Config files:
#### Check/Edit the server.conf file

*This is the main server configuration file for the BCO API.   (most of these values will NOT need to be changed for local deployment)*

`vim bco_api/bco_api/server.conf`

**Production and publishing flags**
 *NOTE:  Valid values are True or False (note the capitalization).* 

 ````
[PRODUCTION]
production=False
````

**DB Version**
````
[VERSION]
version=22.01
````
**Is this a publish-only server?**
````
[PUBLISHONLY]
publishonly=False
````


**Security settings**: Create a key for an anonymous public user.
````
[KEYS]
anon=627626823549f787c3ec763ff687169206626149
````
**Which host names do you want to associate with the server?** *Note: the local hostname (i.e. 127.0.0.1) should come at the end.*
````
[HOSTNAMES]
prod_names=test.portal.biochemistry.gwu.edu,127.0.0.1
names=127.0.0.1:8000,127.0.0.1
````
**Give the human-readable hostnames**
````
[HRHOSTNAME]
hrnames=BCO Server (Default)
````
**The public hostname of the server (i.e. the one to make requests to)**
````
[PUBLICHOSTNAME]
prod_name=https://test.portal.biochemistry.gwu.edu
name=http://127.0.0.1:8000
````
**Who gets to make requests?**
````
[REQUESTS_FROM]
portal=https://test.portal.biochemistry.gwu.edu
local_development_portal=http://127.0.0.1:3000,http://localhost:3000
public=true
````
**Namings**: *How do you want to name your objects?*
````
[OBJECT_NAMING]
prod_root_uri=https://test.portal.biochemistry.gwu.edu
root_uri=http://127.0.0.1:8000
prod_uri_regex=root_uri/prefix_(\d+)/(\d+).(\d+)
uri_regex=root_uri/prefix_(\d+)/(\d+).(\d+)
````
**Requests ** *Where are the request templates defined?*
````
[REQUESTS]
folder=../api/request_definitions/
````
**Where are the validation templates defined?** 
````
[VALIDATIONS]
folder=../api/validation_definitions/
````

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
