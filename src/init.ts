import { QuarrySDK } from '@quarryprotocol/quarry-sdk';
import { PublicKey } from '@solana/web3.js';
import { Command } from 'commander';
import { parsePubkey } from './keyParser';
import * as st from '@saberhq/token-utils';
import { useContext } from './context';

export function installInit(program: Command) {
  program
    .command('init')
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
      }) => {
        const context = useContext();
        await init({
          quarry: context.quarry,
          mint: await mint,
          rewarder: await rewarder,
        });
      }
    );
}

export async function init({
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
  const { wrapper: minerWrapper, tx: createMinerTx } =
    await quarryWrapper.createMiner();
  const tx = createMinerTx.combine(
    minerWrapper.stake(new st.TokenAmount(mintInfo, 1))
  );
  const r = await tx.confirm();
  console.log(`Tx: ${r.signature}`);
}
