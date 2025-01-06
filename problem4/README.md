# Problem 4: Architecture

Note: This was a "Three way to sum to n" problem and duplicated with problem 1. So I move the problem 6 (Architecture) to problem 4.
Duration: You should not spend more than 8 hours on this problem.
Time estimation is for internship roles, if you are a software professional you should spend significantly less time.

## Task

Write the specification for a software module on the API service (backend application server).

1. Create a documentation for this module on a `README.md` file.
2. Create a diagram to illustrate the flow of execution.
3. Add additional comments for improvement you may have in the documentation.
4. Your specification will be given to a backend engineering team to implement.

### Software Requirements

1. We have a website with a score board, which shows the top 10 user’s scores.
   - Scoreboard
2. We want live update of the score board.
   - Using websockets to update the score board.
3. User can do an action (which we do not need to care what the action is), completing this action will increase the user’s score.
   - Dispatch action from client to API gateway for determining the answer and updating the score.
4. Upon completion the action will dispatch an API call to the application server to update the score.
5. We want to prevent malicious users from increasing scores without authorisation.
   - The application should have authentication and authorisation mechanism.

# Solution

## Analyzing requirements

1. The application should have a scoreboard that shows the top 10 user's scores.
   - The scoreboard should be updated in real-time on the client side.
2. The user can perform an action that will increase the user's score.
   - The action should be dispatched from the client to the API gateway, there should be a service that take responsibility for determining the answer and updating the score to the database -> update the scoreboard.
3. The application score board should be updated in real-time.
   - Using websockets to update the score board.
   - Every user's action should be dispatched to the API gateway to update the score.
4. The application should have an authentication and authorization mechanism to prevent malicious users from increasing scores without authorization.

### Basic usecase diagram

[insert action flow diagram here]

### activities diagram

[insert activities diagram here]

### API Documentation

TBD

## User Stories
