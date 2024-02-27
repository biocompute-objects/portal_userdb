# Troubleshooting Tips

Logfiles are located at  `/var/log/gunicorn`
each service has a `*_stdout.log` and `*_stderr.log`

```shell
-rw-r--r--. 1 bco_api_user nginx   609262 Feb 19 06:30 api_sandbox_stderr.log
-rw-r--r--. 1 bco_api_user nginx   927788 Feb 19 06:30 api_sandbox_stdout.log
-rw-r--r--. 1 bco_api_user nginx  6431322 Feb 27 16:57 api_stderr.log
-rw-r--r--. 1 bco_api_user nginx 14045756 Feb 27 16:57 api_stdout.log
-rw-r--r--. 1 bco_api_user nginx  2169511 Feb 27 16:42 userdb_stderr.log
-rw-r--r--. 1 bco_api_user nginx  6256003 Feb 27 16:42 userdb_stdout.log
```

## BCO Portal Server (AKA UserDB)
The [`SERVER`](server/README.md) directory contains the UserDB application. It utilizes Django (Python) and a SQLite3 DB.

## BCO Portal Client (AKA Portal)
 The [`CLIENT`](client/README.md) directory contains the UI application. It utilizes React and Redux ToolKit. 