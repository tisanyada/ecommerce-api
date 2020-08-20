define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "/home/tisan/Documents/Binary/[api]/ECOMMERCE/ecommerce-api/docs/main.js",
    "groupTitle": "/home/tisan/Documents/Binary/[api]/ECOMMERCE/ecommerce-api/docs/main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/api/admin/login",
    "title": "Login",
    "name": "Login",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "./routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/admin/register",
    "title": "Register/Signup",
    "name": "Register/Signup",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "./routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "Login",
    "name": "Login",
    "group": "Users",
    "version": "0.0.0",
    "filename": "./routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users/register",
    "title": "Register/Signup",
    "name": "Register/Signup",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/user.js",
    "groupTitle": "Users"
  }
] });