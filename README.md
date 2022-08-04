# Description
This is an application of showing available products on the warehouse and registering user sales

# Requirements

## Features Roadmap
- Show the list of available products
- Show what articles are included in the product
- Create Sales list
- Calculate products amount based on all available articles
- add possibility to buy (register sale) a product => update sales list
- decrease the amount of available products and related articles
- show notification to user on successful sale

## Corner cases
- still product in the list if he's unavailable, but prohibit its sale
- not to be able to buy more products that are available in the list

## Non Functional requirements:
- Cover components with unit tests
- Business and tech documentation
- Meta tags for better SEO
- prettier for code formatting
- Responsive Design

# Start
## How to start FE:
1. `yarn install`
2. `yarn start`
3. open `http://localhost:3000`

## How to run unit tests:
2. `yarn run test`


# Technologies to be used
1. Framework: React
2. Language: TypeScript
3. Styles: scss modules for styles encapsulation
   In real world scenario I'd choose either Material-UI components library, or Tailwind with Headless-UI.
   But in sake of simplicity and to show the way I manage css, in this solution I'll focus in own css implementation


## Tech tasks that are out of scope, but I'd do them in next iterations
- add "Husky" and "Commitizen" dependencies for ensuring PR process
- add Jenkinsfile with pipeline for CI/CD
- Cypress e2e tests to ensure complete user flows

# Performance improvements:
1. Decrease bundle size: separation of devDependencies
