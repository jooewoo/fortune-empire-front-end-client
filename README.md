# Fortune Empire Front End Client
## Capstone Project for General Assembly Web Development Immersive Program
This is a full stack capstone project built with React and Express. Fortune Empire keeps track of your personal finances, and to display your personal spending habits. The ultimate goal for this app is to help a user visualize their spending habits, and better manage their finances, while increasing their financial literacy. As a person who struggles to manage his own finances, I had the inspiration to build this app to help myself and others towards financial literacy.

## Try the app!
To try the app, click on the deployed url above. Use the following credentials <strong>Username:</strong> hello@hello <strong>Password:</strong> world

[Front-End Picture](./public/front-end-picture.PNG)

## Front End Installation (Current Repo)
1.  Fork and clone this repository.
1.  Install dependencies with `npm install`.
1.  Create a new branch, `training`, for your work.
1.  Checkout to the `training` branch.
1.  Run the development server with `npm start`.

## Development Process | Problem Solving Strategy
Before I even began coding, I decided to narrow down what I specifically wnat for my application. Therefore, I drafted my user stories, database structure, the time allocated to build this project, and the steps I needed to get this into production.

My first step was to divided my user stories into four aspects: What information does my user need, what does my model for my server need, what RESTful APIs does the user need, and what design is best to accurately display to the user. Aftewards, I worked in concert with an instructor to hash out my Entity Relationship Diagram.

Once I had a finalized plan, I began working on the back end API, by setting up the Bills model and routes. To check if I successfully my work, I added curl scripts in order to see the information was correctly being added.

Finally, I progressed to working on the front end client to try and achieve minimum viable product. Once I confirmed the application was functional, I began working on the design.

### User Stories
#### Auth
* As an unregistered user, I would like to sign up with email and password.
* As a registered user, I would like to sign in with email and password.
* As a signed in user, I would like to change password.
* As a signed in user, I would like to sign out.

#### Bill
* As a signed in user, I would like to create a bill.
* As a signed in user, I would like to see all my bills.
* As a signed in user, I would like to update my bill.
* As a signed in user, I would like to delete my bill

### Wireframes
[Wireframe](https://github.com/jooewoo/fortune-empire-front-end-client/tree/master/wireframes)
## Future Intentions
* As a signed in user, I would like to create a profile.
* As a signed in user, I would like to update my profile.
* As a signed in user, I would like to upload a photo of my receipt, and extract the spending from the image
* As a signed in user, I would like to create a bill with the location of this transaction.
* As a signed in user, I would like to input my total income for a year, my location to extract the applicable tax brackets, and know the disposable income available.
* As a signed, in user, I would like to assign budget goals, and display progress goals per month.


## Links
* [Front-End Repository](https://github.com/jooewoo/fortune-empire-front-end-client)
* [Back-End Repository](https://github.com/jooewoo/fortune-empire-back-end)
* [Front-End Deployed Site](https://jooewoo.github.io/fortune-empire-front-end-client/)
* [Heroku Deployment](https://arcane-atoll-72181.herokuapp.com/)

## Technologies Used
* React
* HTML
* Sass
* JSX
* JavaScript
* Node.js
* Bootstrap

## Author
Made by Joseph Woo
