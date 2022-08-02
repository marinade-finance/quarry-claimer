import { QuarrySDK } from '@quarryprotocol/quarry-sdk';
import { PublicKey } from '@solana/web3.js';
import { Command } from 'commander';
import { parsePubkey } from './keyParser';
import * as st from '@saberhq/token-utils';
import { TokadaptProgram, useContext } from './context';
import { BN } from 'bn.js';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { TransactionEnvelope } from '@saberhq/solana-contrib';
import { encode } from '@project-serum/anchor/dist/cjs/utils/bytes/utf8';

const TOKADAPT_STATE_ID = new PublicKey(
  'taspunvVUXLG82PrsCCtQeknWrGHNHWcZmVQYNcQBDg'
);

const MNDE_ID = new PublicKey('MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey');

export function installClaim(program: Command) {
  program
    .command('claim')
    .requiredOption('--mint <mint>', 'Mint', parsePubkey)
    .option(
      '--rewarder <rewarder>',
      'Rewarder',
      parsePubkey,
      Promise.resolve(
        new PublicKey('J829VB5Fi7DMoMLK7bsVGFM82cRU61BKtiPz9PNFdL7b')
      )
    )
    .option('--target <target>', 'Target MNDE account', parsePubkey)
    .action(
      async ({
        mint,
        rewarder,
        target,
      }: {
        mint: Promise<PublicKey>;
        rewarder: Promise<PublicKey>;
        target?: Promise<PublicKey>;
      }) => {
        const context = useContext();
        await claim({
          quarry: context.quarry,
          tokadapt: context.tokadapt,
          mint: await mint,
          rewarder: await rewarder,
          target: await target,
        });
      }
    );
}

export async function claim({
  quarry,
  tokadapt,
  mint,
  rewarder,
  target,
}: {
  quarry: QuarrySDK;
  tokadapt: TokadaptProgram;
  mint: PublicKey;
  rewarder: PublicKey;
  target?: PublicKey;
}) {
  const rewarderWrapper = await quarry.mine.loadRewarderWrapper(rewarder);
  const mintInfo = st.Token.fromMint(mint, 0);
  const quarryWrapper = await rewarderWrapper.getQuarry(mintInfo);
  const minerWrapper = await quarryWrapper.getMinerActions();

  const tokadaptState = await tokadapt.account.state.fetch(TOKADAPT_STATE_ID);
  const tmpToken = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    rewarderWrapper.rewarderData.rewardsTokenMint,
    quarry.provider.walletKey
  );
  const mndeToken =
    target ||
    (await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      MNDE_ID,
      quarry.provider.walletKey
    ));
  let tx = new TransactionEnvelope(quarry.provider, []);
  if (!target && !(await quarry.provider.getAccountInfo(mndeToken))) {
    console.log(`Creating MNDE account ${mndeToken.toBase58()}`);
    tx.append(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        MNDE_ID,
        mndeToken,
        quarry.provider.walletKey,
        quarry.provider.walletKey
      )
    );
  }
  tx = tx.combine(await minerWrapper.claim());
  const [outputStorageAuthority] = await PublicKey.findProgramAddress(
    [encode('storage'), TOKADAPT_STATE_ID.toBytes()],
    tokadapt.programId
  );
  tx.append(
    await tokadapt.methods
      .swap(new BN('18446744073709551615'))
      .accounts({
        state: TOKADAPT_STATE_ID,
        input: tmpToken,
        inputAuthority: quarry.provider.walletKey,
        inputMint: rewarderWrapper.rewarderData.rewardsTokenMint,
        outputStorage: tokadaptState.outputStorage,
        outputStorageAuthority,
        target: mndeToken,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()
  );

  const r = await tx.confirm();
  console.log(`Tx: ${r.signature}`);
}
