import {Command, flags} from '@oclif/command'
import {RippleAPI} from 'ripple-lib'

export default class Send extends Command {
  static description = 'Send payment'

  static examples = [
    `$ iou-issuer send rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD sshcfshUQBZHVtTVrFCdYHcZzYefN \
  --destination=r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3 --value=100 --currency=USD
accepted: true
account_sequence_available: 10489010
account_sequence_next: 10489010
applied: true
broadcast: true
engine_result: tesSUCCESS
engine_result_code: 0
engine_result_message: The transaction was applied. Only final in a validated ledger.
kept: true
open_ledger_cost: 10
queued: false
tx_blob: 12000022800000002400A00CB1201B00A0243D61D5038D7EA4C680000000000000000000000000005553440000000000A02CAD0E2EDDACEA4B7C3AF520A0791E1DFDA04E68400000000000000C69D5038D7EA4C680000000000000000000000000005553440000000000A02CAD0E2EDDACEA4B7C3AF520A0791E1DFDA04E732103424E00965CD2E2528E69A947BE148F7E0DFE99377F9F2A6F991BA53DDF83D51274473045022100875E3E2DDBE2EA303B823760101AD25380E0BB75ABC9AC6A037B7D3F1E7C2A3E0220224732931413EE220D03BF8B58259CE6362E4D756D5490B8DCFC6D3314861CAE8114A02CAD0E2EDDACEA4B7C3AF520A0791E1DFDA04E831461E18EBCCCA6BC1A10B43DB3AB7C5AE939AFA161
tx_json: {"Account":"rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD","Amount":{"currency":"USD","issuer":"rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD","value":"100"},"Destination":"r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3","Fee":"12","Flags":2147483648,"LastLedgerSequence":10495037,"SendMax":{"currency":"USD","issuer":"rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD","value":"100"},"Sequence":10489009,"SigningPubKey":"03424E00965CD2E2528E69A947BE148F7E0DFE99377F9F2A6F991BA53DDF83D512","TransactionType":"Payment","TxnSignature":"3045022100875E3E2DDBE2EA303B823760101AD25380E0BB75ABC9AC6A037B7D3F1E7C2A3E0220224732931413EE220D03BF8B58259CE6362E4D756D5490B8DCFC6D3314861CAE","hash":"470BEAD95B008EE18431B2010898474D8A7A7FA2151A4ACB2D1A9A547F69908C"}
validated_ledger_index: 10495034
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    destination: flags.string({
      char: 'd',
      description: 'Destination account address',
      required: true,
    }),
    value: flags.string({
      char: 'v',
      description: 'Amount value to send',
      required: true,
    }),
    currency: flags.string({
      char: 'c',
      description: 'Amount currency to send',
      default: 'XRP',
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
    const {args, flags} = this.parse(Send)
    const {account, secret} = args
    const {destination, value, currency, server} = flags

    const api = new RippleAPI({server})
    await api.connect()
    const tx = await api.preparePayment(account, {
      source: {
        address: account,
        maxAmount: {
          value,
          currency,
          counterparty: account,
        },
      },
      destination: {
        address: destination,
        amount: {
          value,
          currency,
          counterparty: account,
        },
      },
    })
    const signed = api.sign(tx.txJSON, secret)
    const result = await api.request('submit', {tx_blob: signed.signedTransaction, fail_hard: true})
    Object.entries(result).forEach(([key, value]) => {
      this.log(`${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
    })
    return api.disconnect()
  }
}
