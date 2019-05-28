# wjbaker.com

## Secret Properties

These define properties that contains credentials that should be hidden publically.

Location: `/secret-properties.json`

Format:
```
{
    "db-wjbaker": {
        "host": "<host_name>",
        "user": "<username>",
        "password": "<password>",
        "database": "<database_name>"
    },
    "authentication": {
        "session-secret": "<secret_key>"
    }
}
```