# Stacks Token Mint DApp

Simple fungible token minting DApp on Stacks.

## Repository Structure


## Contract

- `token.clar` — simple token contract
- Public functions:
  - `mint(recipient, amount)`
  - `get-balance(owner)`
  - `get-total-supply`

## Frontend

- Uses `@stacks/connect` for wallet connection
- Uses `@stacks/transactions` to call the contract
- UI allows minting tokens to any recipient

## Running Locally

1. Go to the frontend folder:
