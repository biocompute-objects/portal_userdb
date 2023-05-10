# BCO Portal Server (AKA UserDB)

This directory contains the UserDB application. It utilizes Django (Python) and a SQLite3 DB. Below are a few genral rules for how th ecode is structured and maintained.

- All deployment specific modifications should be made in the `.secrets` file. This is also where the keys for other applications are kept. This file should be created by copying the `.secrets.example` and filling in the fields. 
- Each model has it's own directory. The [protaluserdb](server/protaluserdb/) directory is the main project directory contains the main `urls.py` and the `settings.py` files.
- Within each model there may be the following files:
    - `__init__.py`: Indicates this is a package directory.
    - `admin.py`: If a model is included in the Django admin pannel this file is present.
    - `apis.py`: The API functions for this model. 
    - `apps.py`: If a model is included in the Django admin pannel this file is present.
    - `migrations`: Directory containing all the migrations for this model.
    - `models.py`: Model properties. 
    - `README.md`: Information about the Model.
    - `selectors.py`: functions, that mostly take care of fetching things from the database.
    - `services.py`: functions, that mostly take care of writing things to the database.
    - `tests.py`: Model specific tests, i.e. tests for each API.
    - `urls.py`: The available URLs for the model.
- 