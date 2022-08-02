/* eslint-disable no-process-exit */
import { QuarrySDK } from '@quarryprotocol/quarry-sdk';
import { SignerWallet, SolanaProvider } from '@saberhq/solana-contrib';
import { Connection, Keypair } from '@solana/web3.js';
import { Command } from 'commander';
import { installClaim } from './claim';
import { setContext } from './context';
import { installInit } from './init';
import { parseKeypair } from './keyParser';
import { installShowRate } from './show-rate';

const program = new Command();

program
  .version('0.0.1')
  .allowExcessArguments(false)
  .option('-c, --cluster <cluster>', 'Solana cluster', 'http://localhost:8899')
  .option('--commitment <commitment>', 'Commitment', 'confirmed')
  .option('-k, --keypair <keypair>', 'Wallet keypair', parseKeypair)
  .hook('preAction', async (command: Command) => {
    const wallet = command.opts().keypair;
    const walletKP = wallet
      ? ((await wallet) as Keypair)
      : await parseKeypair('~/.config/solana/id.json');
    setContext({
      provider: SolanaProvider.init({
        connection: new Connection(command.opts().cluster as string),
        wallet: new SignerWallet(walletKP),
      }),
    });
  });

installInit(program);
installClaim(program);
installShowRate(program);

program.parseAsync(process.argv).then(
  () => process.exit(),
  (err: unknown) => {
    console.error(err);
    process.exit(-1);
  }
);
