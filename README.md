# ecommerce-api
This is an ecommerce api created with nodejs, express and mongodb

## How to start
    ```
        - Ensure you have nodejs and mongodb installed
        - Clone the app or download it to your system
        - Change directory(cd) into the project folder
        - Run **npm install** to install the dependencies from the *package.json* file
        - To start the application run **npm start** to start running the application
    ```

## Routes
    Users
    ```
        - Register          {post}      /api/users/register
        - Login             {post}      /api/users/login
        - Products          {get}       /api/users/products
        - Cart              {get}       /api/users/cart
        - Add to cart       {post}      /api/users/cart/add/:id
        - Get cart item     {get}       /api/users/cart/:id
        - Delete Cart item  {patch}     /api/users/cart/delete/:id
        - Delete Cart       {delete}    /api/users/cart/delete
        - Orders            {get}       /api/users/orders
        - Create order      {post}      /api/users/orders/create/:id
        - Delete Order item {patch}     /api/users/orders/delete/:id
    ```
    Admin
    ```
        - Register              {post}      /api/admin/register
        - Login                 {post}      /api/admin/login
        - Products              {get}       /api/admin/products
        - Create product        {post}      /api/admin/create-product
        - Get product item      {get}       /api/admin/products/:id
        - Update product item   {patch}     /api/admin/products/:id
        - Delete product item   {delete}    /api/admin/products/delete/:id
    ```