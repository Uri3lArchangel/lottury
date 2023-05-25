Lottury is a decentralized lottery game which works off simple probablity to provide a fair outcome, this is coupled with a truly random number generator to ensure the winner selection is random but in a probability range.
it is based on Nextjs 13(pre-app directory), with the use of other libraries like web3js.

Folllow the following instructions to get started
#### Requirements
1. Nodejs 16 or higher.
2. NPM
3. [Metamask wallet](https://metamask.app.link/)

## Getting Started

First, clone the repo:
paste the following line in your terminal
```git clone https://github.com/Uri3lArchangel/lottury.git```
Move into the folder:
```cd lottury```
Install all all dependencies:
```npm i ```
or
```npm install```
Add enviromental variables:
1. create a file in your project root directory named `.env.local`
2. add the following lines:
```TIMERAPI="https://timercheck.io/{ANY_UNIQUE_KEY_OF_YOUR_CHOICE}"
MORALISAPI="{MORALIS_API_KEY}"
```
  The unique key used in the timerapi must be a complex one to ensure no one can mess up your timer by reseting it sending requests using your key.
  The moralis key can be gotten by signing up on [Moralis](https://admin.moralis.io/login)
Run your dev server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
