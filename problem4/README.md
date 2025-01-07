# Problem 4: Architecture

Note: This was a "Three way to sum to n" problem and duplicated with problem 1. So I moved problem 6 (Architecture) to problem 4.
Duration: You should not spend more than 8 hours on this problem.
Time estimation is for internship roles, if you are a software professional you should spend significantly less time.

## Task

Write the specification for a software module on the API service (backend application server).

1. Create documentation for this module in a `README.md` file.
2. Create a diagram to illustrate the flow of execution.
3. Add additional comments for improvement you may have in the documentation.
4. Your specification will be given to a backend engineering team to implement.

### Software Requirements

1. We have a website with a scoreboard, which shows the top 10 users' scores.
   - Scoreboard
2. We want live updates of the scoreboard.
   - Using WebSockets to update the scoreboard.
3. Users can perform an action (which we do not need to specify), completing this action will increase the user's score.
   - Dispatch action from client to API gateway for determining the answer and updating the score.
4. Upon completion, the action will dispatch an API call to the application server to update the score.
5. We want to prevent malicious users from increasing scores without authorization.
   - The application should have authentication and authorization mechanisms.

# Solution

## Analyzing Requirements

1. The application should have a scoreboard that shows the top 10 users' scores.
   - The scoreboard should be updated in real-time on the client side.
2. Users can perform an action that will increase their score.
   - The action should be dispatched from the client to the API gateway. There should be a service responsible for determining the answer and updating the score in the database, which then updates the scoreboard.
3. The application scoreboard should be updated in real-time.
   - Using WebSockets to update the scoreboard.
   - Every user's action should be dispatched to the API gateway to update the score.
4. The application should have authentication and authorization mechanisms to prevent malicious users from increasing scores without authorization.

### Basic Use Case Diagram

![image](https://github.com/user-attachments/assets/2480078e-4f17-4c75-ac53-08a22755e177)

### Activities Architecture

![image](https://github.com/user-attachments/assets/6cbd541d-c69f-4618-9d93-700ae3e39c68)

## Epic: Real-Time Scoreboard

Assuming that the platform already has an auth, score and other services integrated.

### US: View Top Scores

- As a user:
  - I want to see the top 10 users’ scores on the scoreboard,
  - so that I can compare my performance with others.
- Acceptance Criteria:
  - API retrieves and returns the top 10 users and their scores.
  - The response time is optimized for quick rendering.
  - The leaderboard dynamically updates when scores change.
- Technical Tasks:
  - Implement the GET /api/scores/top endpoint.
  - Write efficient database queries to fetch and rank scores.

### US: Update User Score

- As a user:
  - I want to update my score after completing an action,
  - so that my achievements are reflected on the scoreboard.
- Acceptance Criteria:
  - API securely validates the action via JWT authentication.
  - API ensures only valid score updates are processed (e.g., within a permissible range).
  - The user’s score is updated in the database.
- Technical Tasks:
  - Implement the POST /api/score endpoint.
  - Add input validation and security checks.
  - Update the database with the new score.
  - Notify the WebSocket server about the score change.

### US: Receive Live Updates

- As a user:
  - I want to see live updates on the scoreboard when any score changes,
  - so that I can track changes in real-time.
- Acceptance Criteria:
  - WebSocket server broadcasts changes to all connected clients.
  - Users immediately see the updated leaderboard.
  - Handle cases where a user disconnects and reconnects.
- Technical Tasks:
  - Set up a WebSocket server to handle real-time communication.
  - Push updates to connected clients whenever scores are updated.
  - Reinitialize the leaderboard for users upon reconnection.

### US: Prevent Unauthorized Score Updates

- As a system:
  - I want to ensure that only authenticated and authorized actions can update scores,
  - so that the leaderboard reflects legitimate activity.
- Acceptance Criteria:
  - API validates user authentication using JWT tokens.
  - Prevent malicious users from inflating scores by rate-limiting updates.
  - Log all score updates for audit purposes.
- Technical Tasks:
  - Implement JWT validation middleware for secure API calls on submitting scores.
  - Add logging for all score updates for monitoring and audits.
