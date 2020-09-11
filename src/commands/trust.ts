import {Command, flags} from '@oclif/command'
import {RippleAPI} from 'ripple-lib'

export default class Trust extends Command {
  static description = 'Create trust line: Trust an account up to the specified amount of currency'

  static examples = [
    `$ iou-issuer trust r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3 sawFJgo2bqcUBH2utvhSZV6FfsfSk \
  --issuer=rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD --value=100 --currency=USD
accepted: true
account_sequence_available: 10490189
account_sequence_next: 10490189
applied: true
broadcast: true
engine_result: tesSUCCESS
engine_result_code: 0
engine_result_message: The transaction was applied. Only final in a validated ledger.
kept: true
open_ledger_cost: 10
queued: false
tx_blob: 12001422800000002400A0114C201B00A023D163D5438D7EA4C680000000000000000000000000005553440000000000A02CAD0E2EDDACEA4B7C3AF520A0791E1DFDA04E68400000000000000C7321026E2F3E476282A3A6B3A2FDE75FF032BB7299336B4368B04B0BCFA58094AE933974473045022100FEA8F2E555EFB8128C3200ADE1D8EE7874A8FFD2F2FED617F2847A897806A52B02206E581D79A45AD9B2CA40DC14614305035E1E6779B8A153FA1D921FF9A14B508E811461E18EBCCCA6BC1A10B43DB3AB7C5AE939AFA161
tx_json: {"Account":"r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3","Fee":"12","Flags":2147483648,"LastLedgerSequence":10494929,"LimitAmount":{"currency":"USD","issuer":"rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD","value":"1000"},"Sequence":10490188,"SigningPubKey":"026E2F3E476282A3A6B3A2FDE75FF032BB7299336B4368B04B0BCFA58094AE9339","TransactionType":"TrustSet","TxnSignature":"3045022100FEA8F2E555EFB8128C3200ADE1D8EE7874A8FFD2F2FED617F2847A897806A52B02206E581D79A45AD9B2CA40DC14614305035E1E6779B8A153FA1D921FF9A14B508E","hash":"81675A683CE705357CE06B0A1BA53F0E61E79891ABADC6E3B2A1B004728E479E"}
validated_ledger_index: 10494926
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    issuer: flags.string({
      char: 'i',
      description: 'Issuer account address',
      required: true,
    }),
    value: flags.string({
      char: 'v',
      description: 'Limit of trust line',
      required: true,
    }),
    currency: flags.string({
      char: 'c',
      description: 'Currency of trust line',
      required: true,
    }),
    server: flags.string({
      char: 's',
      description: 'rippled server',
      default: 'wss://s.altnet.rippletest.net:51233',
    }),
  }

  static args = [
    {
      name: 'account',
      required: true,
      description: 'Account Address',
    },
    {
      name: 'secret',
      required: true,
      description: 'Secret',
    },
  ]

  async run() {
    const {args, flags} = this.parse(Trust)
    const {account, secret} = args
    const {issuer, value, currency, server} = flags

    const api = new RippleAPI({server})
    await api.connect()
    const tx = await api.prepareTrustline(account, {
      currency,
      counterparty: issuer,
      limit: value,
    })
    try {
      const signed = api.sign(tx.txJSON, secret)
      const result = await api.request('submit', {tx_blob: signed.signedTransaction, fail_hard: true})
      Object.entries(result).forEach(([key, value]) => {
        this.log(`${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
      })
    } catch (error) {
      Object.entries(error).forEach(([key, value]) => {
        this.log(`${key}: ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}`)
      })
    }

    return api.disconnect()
  }
}
