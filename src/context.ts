import { QuarrySDK } from '@quarryprotocol/quarry-sdk';
import { AnchorTypes, makeAnchorProvider } from '@saberhq/anchor-contrib';
import * as tokadaptGenerated from './tokadapt';
import * as anchor from '@project-serum/anchor';
import { PublicKey, SolanaProvider } from '@saberhq/solana-contrib';

export type TokadaptTypes = AnchorTypes<
  tokadaptGenerated.Tokadapt,
  {
    state: TokadaptStateData;
  }
>;

type TokadaptAccounts = TokadaptTypes['Accounts'];
export type TokadaptStateData = TokadaptAccounts['state'];
export type TokadaptProgram = TokadaptTypes['Program'];

export interface Context {
  quarry: QuarrySDK;
  tokadapt: TokadaptProgram;
}

const context: {
  quarry: QuarrySDK | null;
  tokadapt: TokadaptProgram | null;
} = {
  quarry: null,
  tokadapt: null,
};

export const setContext = ({ provider }: { provider: SolanaProvider }) => {
  context.quarry = QuarrySDK.load({ provider });
  const anchorProvider = makeAnchorProvider(provider);
  context.tokadapt = new anchor.Program(
    tokadaptGenerated.IDL,
    new PublicKey('tokdh9ZbWPxkFzqsKqeAwLDk6J6a8NBZtQanVuuENxa'),
    anchorProvider
  ) as unknown as TokadaptProgram;
};

export const useContext = () => {
  return context as Context;
};
