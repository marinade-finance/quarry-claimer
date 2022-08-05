#!/bin/bash

WALLET="$1"
IS_WALLET_ABS_PATH=$(<<<"$WALLET" grep -c '^/')
MINT="$2"

if [[ -z $WALLET ]] || [[ $IS_WALLET_ABS_PATH -eq 0 ]] || [[ -z $MINT ]]
then
    echo "Usage: $0 <absolute-path-to-the-wallet> <mint>"
    exit 1
fi

if [[ ! -f $WALLET ]]
then
    echo "File $WALLET does not exist."
    exit 2
fi

docker run \
    --rm \
    --mount "type=bind,source=$WALLET,target=/wallet.json" \
    "public.ecr.aws/n0y9d4d4/marinade.finance/liquidity-minining-quarry-claimer:latest" \
    yarn run cli \
        --cluster "https://api.mainnet-beta.solana.com" \
        --keypair "/wallet.json" \
        claim \
        --mint "$MINT"
