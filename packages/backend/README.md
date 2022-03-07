# Blockchain backend

## Setting up a Local Blockchain

```
npx hardhat node
```

## Compiling
```
npx hardhat compile
```

## Deploying a Smart Contract
```
npx hardhat run --network localhost scripts/deploy.js

Deploying Box...
Box deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Interacting from the Console

We need to specify the address of our Box contract we displayed in our deploy script.

```
npx hardhat console --network localhost

> const Box = await ethers.getContractFactory('Box');
> const box = await Box.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3')
> await box.store(42)
> await box.retrieve()
> (await box.retrieve()).toString()
```

## Interacting programmatically

```
npx hardhat run --network localhost ./scripts/simple-test.js
```

## Writing automated smart contract tests

### About testing
When it comes to smart contract development though, practice has shown that contract unit testing is exceptionally worthwhile. These tests are simple to write and quick to run, and let you add features and fix bugs in your code with confidence.

```
npx hardhat test
```
