# Problem 3: Messy React

Duration: You should not spend more than 6 hours on this problem.
Time estimation is for internship roles, if you are a software professional you should spend significantly less time.

## Task

List out the computational inefficiencies and anti-patterns found in the code block below.

1. This code block uses
   a. ReactJS with TypeScript.
   b. Functional components.
   c.React Hooks
2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.

```
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```

# Solution

## Investigating the issues:

For more details please take a look at the comments in `@/components/WalletPage.tsx` file. I managed to let it run, and during the process, I found the following issues:

- `lhsPriority` is not defined in the `sortedBalances` function, which cause typo error.
- the filter and sort functions was implemented in a wrong way, which cause the function to return an empty array.
- interms of single responsibility principle, the `WalletPage` component is doing too much, it should be broken down into smaller components.
- formattedBalances is delacred but forgot to use it.
- even with the rows rendering, the `ammount` is uneceesary because we already have the `formattedAmount` which is the same as `amount` but in string format, and for displaying total Assets table it still missing the currency symbol which is critical for the user to understand the value of the assets.
- the `WalletPage` itself take responsibility for displaying assets, and that should be data table component, using div and try to make it look like a table is not a good practice for accessibility and SEO.
- using `{chilren, ...rest}` ambiguity, it's better to use `props` directly and destructure it.

## Refactoring:

As I mentioned above, I had to managed to keep the "original" code running, and for the better comparison I decided to set up a Nextjs project with 2 slots, one for the original code and the other for the refactored code (although the origin code would returns nothing because of the wrong implementation of sort.filter balance function).

But anyways, you can find the original and the refactored code inside the `@/components` folder, and if you're interested with how its integrated with Nextjs, you can take a look at the `@/app/layout` file.

## Running the project:

### Pre-requisites:

- Nodejs, (any package manager you prefer, I used `yarn`).

### Installation:

In the project directory, you can run:

```bash
yarn install
# or
npm run install
# or
...
```

for installing the dependencies.

### Running the project:

```bash
npm run dev
# or
yarn dev
# or
...
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result with the Origin component on the left and the refactored component on the right.

I use my own boilerplate for this project, and it comes along with storybook as well, so you can run the storybook by running:

```bash
  yarn sb
```
