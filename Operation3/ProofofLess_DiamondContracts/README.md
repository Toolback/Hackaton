# Proof Of Less Diamond Contracts

(This is an implementation for [EIP-2535 Diamond Standard](https://github.com/ethereum/EIPs/issues/2535).)

[WIP🪜]

## Current Mumbai Tests Contracts 

```
Diamond deploy transaction hash:0x5cf1f1411ddceefd954abecb2c86e9a98a15659b4d12b4411cd24013396037bb
ProofOfLessDiamond deployed: 0xa6ccE76B22Cf07e28fF7c92B465cb038ab14808B
Diamond owner: 0x25b3d91e2cbAe2397749f2F9A5598366Df26fA49
(~1 test matic)

Fake PUsdc deployed to: 0xb17ddD9426d3BCA925C48b24D9179B3B77162e51

```

## Set Up


```shell
cp .env-exemple .env
npm install
npx hardhat test (fork Polygon mainnet)
```

/!\ Do not send funds to the private key in the .env file (testing / null key)
