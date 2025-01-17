# Problem 2: Fancy Form

Duration: You should not spend more than 16 hours on this problem.
Time estimation is for internship roles, if you are a software professional you should spend significantly less time.

## Task

Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

_You may use any third party plugin, library, and/or framework for this problem._

1. You may add input validation/error messages to make the form interactive.
2. Your submission will be rated on its usage intuitiveness and visual attractiveness.
3. Show us your frontend development and design skills, feel free to totally disregard the provided files for this problem.
4. You may use this [repo](https://github.com/Switcheo/token-icons/tree/main/tokens) for token images, e.g. [SVG image](https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg).
5. You may use this [URL](https://interview.switcheo.com/prices.json) for token price information and to compute exchange rates (not every token has a price, those that do not can be omitted).

<aside>
✨ Bonus: extra points if you use [Vite](https://vite.dev/) for this task!
</aside>

Please submit your solution using the files provided in the skeletal repo, including any additional files your solution may use.

<aside>
💡 Hint: feel free to simulate or mock interactions with a backend service, e.g. implement a loading indicator with a timeout delay for the submit button is good enough.
</aside>

# Solution

## Spike:

I assume that the user will be able to swap between two tokens. The user will select the token to swap from and the token to swap to. The user will then enter the amount of the token to swap from. The user will then see the amount of the token to swap to. The user will then click the swap button to complete the swap.
I decided to use notifyless approach for this form, which means theres no actual validation on the form but the 'CONFIRM SWAP' button will be disabled until the user selects the tokens and enters the amount to swap.

## Running the solution

Simply open the `index.html` file in your browser to view the solution.

Or you can install the dependencies and run the project using the following commands:

```
yarn install
```

```
yarn dev
```

The application will be running on `http://localhost:5173/`
