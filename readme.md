# Kanban-Beta DOCUMENTATION

> RESTful endpoint for todo's CRUD operation with JSON formatted response

## Restful Endpoints

1. POST : /register
2. POST : /login
3. POST : /google
4. POST : /tasks
5. GET : /tasks
6. PUT : /tasks/:id
7. DELETE : /tasks/:id
8. PATCH : /tasks/:id
9. GET : /tasks/:id


## GLOBAL ERROR
```json
  { 
    "errors": "Server currently unable to handle this request"
  }
```

## POST /register

Request body:

```json
{
  "email": "test@email.com",
  "password": "test123"
}
```

Response(201 - Created):

```json
{
  "token":"token"
}
```

Response(400 - SequelizeValidationError)

```json
{
    "errors": [
        "Validation error: only email!,",
        "Validation error: please input email!,",
        "Validation error: please input password"
    ]
}
```


Response(400 - INVALID EMAIL REGISTER)

```json
{
  "errors": [
        "Email already registered"
    ]
}
```

## POST /login

Request body:

```json
{
  "email": "test@email.com",
  "password": "test123"
}
```

Response(200 - Ok):

```json
{
  "token": "<user token>"
}
```

Response(400 - EMAIL NOT FOUND)

```json
{
  "errors": [
        "invalid email or password"
    ]
}
```

## POST /google

Request body:

```json
{
  "idToken": "id_token",
  "audience": "<your client_id>"
}
```

Response(200 - Ok):

```json
{
  "token": "<user token>"
}
```

## POST /tasks

Request headers:

```json
{
  "token": "<token>"
}
```

Request body:

```json
{
    "id": 4,
    "title": "lari pagi guys",
    "category": "todo",
    "description": "ok",
    "UserId": 3,
}
```

Response(201 - Created):

```json
{
   "id": 4,
    "title": "lari pagi guys",
    "category": "todo",
    "description": "ok",
    "UserId": 3,
    "updatedAt": "2020-07-17T16:29:18.306Z",
    "createdAt": "2020-07-17T16:29:18.306Z"
}
```

Response(400 - SequelizeValidationError)

```json
{
   "errors": [
        "Validation error: please input title,",
        "Validation error: please input category,",
        "Validation error: please input description"
    ]
}
```

## GET /tasks

Request headers:

```json
{
  "token": "<token>"
}
```

Request body:
Not Needed

Response(200 - Ok):

```json
[
  {
        "id": 4,
        "title": "lari pagi guys",
        "category": "todo",
        "description": "ok",
        "UserId": 3,
        "createdAt": "2020-07-17T16:29:18.306Z",
        "updatedAt": "2020-07-17T16:29:18.306Z",
        "User": {
            "id": 3,
            "email": "herlian@gmail.com",
            "password": "$2b$10$qGEmFz70pbYQwhYL5euJxeb.dk1eYQs8t7I/Z3as.XsacvBaEpVz6",
            "createdAt": "2020-07-17T15:16:08.352Z",
            "updatedAt": "2020-07-17T15:16:08.352Z"
        }
    },
    {
        "id": 1,
        "title": "aaa",
        "category": "backlog",
        "description": "siang",
        "UserId": 3,
        "createdAt": "2020-07-17T15:24:16.678Z",
        "updatedAt": "2020-07-17T15:24:25.620Z",
        "User": {
            "id": 3,
            "email": "herlian@gmail.com",
            "password": "$2b$10$qGEmFz70pbYQwhYL5euJxeb.dk1eYQs8t7I/Z3as.XsacvBaEpVz6",
            "createdAt": "2020-07-17T15:16:08.352Z",
            "updatedAt": "2020-07-17T15:16:08.352Z"
        }
    },
    {
        "id": 2,
        "title": "makan",
        "category": "done",
        "description": "Sore",
        "UserId": 14,
        "createdAt": "2020-07-17T15:42:08.435Z",
        "updatedAt": "2020-07-17T15:42:08.435Z",
        "User": {
            "id": 14,
            "email": "makanEnak@gmail.com",
            "password": "$2b$10$.J3Z3DUo6kNXEeDaT81MTe/TMKhcL656bm37MrhRqVlYVXA6Z.MtW",
            "createdAt": "2020-07-17T15:41:56.169Z",
            "updatedAt": "2020-07-17T15:41:56.169Z"
        }
    },
    ...
]
```

## GET /tasks/:id

Request headers:

```json
{
  "token": "<token>"
}
```

Request params:

```json
{
  "id": "<params_id>"
}
```

Request body:
not needed

Response(200 - Ok):

```json
{
    "id": 1,
    "title": "aaa",
    "category": "backlog",
    "description": "siang",
    "UserId": 3,
    "createdAt": "2020-07-17T15:24:16.678Z",
    "updatedAt": "2020-07-17T15:24:25.620Z"
}
```

## DELETE /tasks/:id

Request headers:

```json
{
  "token": "<token>"
}
```

Request params:

```json
{
  "id": "<params_id>"
}
```

Request body:
not needed

Response(200 - Ok):

```json
{
"title":"title"
}
```

Response(403 - AUTH)

```json
{
  "errors": [
        "Not Access"
    ]
}
```

## PUT /tasks/:id

Request headers:

```json
{
  "token": "<token>"
}
```

Request params:

```json
{
  "id": "params.id",
  "UserId": "req.user.id" 
}
```

Request body:

```json
{
    "id": 1,
    "title": "aaa",
    "category": "backlog",
    "description": "siang",
    "UserId": 18
}
```

Response(200 - OK):

```json
{
    "id": 1,
    "title": "malam",
    "category": "backlog",
    "description": "tidur",
    "UserId": 18,
    "createdAt": "2020-07-11T10:22:24.565Z",
    "updatedAt": "2020-07-11T10:30:22.430Z"
}
```

Response(403 - AUTH)

```json
{
  "errors": [
        "Not Access"
    ]
}
```
