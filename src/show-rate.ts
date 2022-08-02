import { QuarrySDK } from '@quarryprotocol/quarry-sdk';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Command } from 'commander';
import { parsePubkey } from './keyParser';
import * as st from '@saberhq/token-utils';
import { useContext } from './context';

export function installShowRate(program: Command) {
  program
    .command('show-rate')
    .requiredOption('--mint <mint>', 'Mint', parsePubkey)
    .option(
      '--rewarder <rewarder>',
      'Rewarder',
      parsePubkey,
      Promise.resolve(
        new PublicKey('J829VB5Fi7DMoMLK7bsVGFM82cRU61BKtiPz9PNFdL7b')
      )
    )
    .action(
      async ({
        mint,
        rewarder,
      }: {
        mint: Promise<PublicKey>;
        rewarder: Promise<PublicKey>;
        gaugemeister: Promise<PublicKey>;
      }) => {
        const context = useContext();
        await showRate({
          quarry: context.quarry,
          mint: await mint,
          rewarder: await rewarder,
        });
      }
    );
}

export async function showRate({
  quarry,
  mint,
  rewarder,
}: {
  quarry: QuarrySDK;
  mint: PublicKey;
  rewarder: PublicKey;
}) {
  const rewarderWrapper = await quarry.mine.loadRewarderWrapper(rewarder);
  const mintInfo = st.Token.fromMint(mint, 0);
  const quarryWrapper = await rewarderWrapper.getQuarry(mintInfo);
  const rate =
    quarryWrapper.quarryData.annualRewardsRate.divn(365).toNumber() /
    LAMPORTS_PER_SOL;

  console.log(rate);
}
