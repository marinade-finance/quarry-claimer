# Quarry claimer

## One-liner
```bash
bash -c "$(curl -sSfL https://raw.githubusercontent.com/marinade-finance/quarry-claimer/main/scripts/claim-rewards.bash)" "" <~/.config/solana/YOUR_WALLET.json> <MINT_PUBKEY>
```

## Docker
To claim rewards using our pre-built docker image, run:
```bash
./scripts/claim-rewards.bash <~/.config/solana/YOUR_WALLET.json> <MINT_PUBKEY>
```

## Yarn
To claim rewards using yarn, run:
```bash
yarn install
yarn run cli \
    --cluster "https://api.mainnet-beta.solana.com" \
    --keypair <~/.config/solana/YOUR_WALLET.json> \
    claim \
    --mint <MINT_PUBKEY>
```