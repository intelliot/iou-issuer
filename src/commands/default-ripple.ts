import {Command, flags} from '@oclif/command'
import {RippleAPI} from 'ripple-lib'

export default class DefaultRipple extends Command {
  static description = 'Enable rippling on the trust lines of an account'

  static examples = [
    `$ iou-issuer default-ripple rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD sshcfshUQBZHVtTVrFCdYHcZzYefN
accepted: true
account_sequence_available: 10489006
account_sequence_next: 10489006
applied: true
broadcast: true
engine_result: tesSUCCESS
engine_result_code: 0
engine_result_message: The transaction was applied. Only final in a validated ledger.
kept: true
open_ledger_cost: 10
queued: false
tx_blob: 12000322800000002400A00CAD201B00A00F5C20210000000868400000000000000C732103424E00965CD2E2528E69A947BE148F7E0DFE99377F9F2A6F991BA53DDF83D51274473045022100D9274BBA67E14F6DB420E7BB29B74BDFDD2AF2290AA0ADC1759B33BAB8749CC602206AD6A1C58EF3DEF53807F000B0E15A087D79F34114C0DA9C37193BAD36A934638114A02CAD0E2EDDACEA4B7C3AF520A0791E1DFDA04E
tx_json: {"Account":"rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD","Fee":"12","Flags":2147483648,"LastLedgerSequence":10489692,"Sequence":10489005,"SetFlag":8,"SigningPubKey":"03424E00965CD2E2528E69A947BE148F7E0DFE99377F9F2A6F991BA53DDF83D512","TransactionType":"AccountSet","TxnSignature":"3045022100D9274BBA67E14F6DB420E7BB29B74BDFDD2AF2290AA0ADC1759B33BAB8749CC602206AD6A1C58EF3DEF53807F000B0E15A087D79F34114C0DA9C37193BAD36A93463","hash":"99D7251014D252B5CC18F91F49AF5C9340D3A822CAD548C923B94F65A49DFA4D"}
validated_ledger_index: 10489689
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    value: flags.string({
      char: 'v',
      description: 'Value of DefaultRipple',
      default: 'true',
      options: ['true', 'false'],
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
    const {args, flags} = this.parse(DefaultRipple)
    const {account, secret} = args
    const {value, server} = flags

    const api = new RippleAPI({server})
    await api.connect()
    const tx = await api.prepareSettings(account, {defaultRipple: value === 'true'})
    const signed = api.sign(tx.txJSON, secret)
    const result = await api.request('submit', {tx_blob: signed.signedTransaction, fail_hard: true})
    Object.entries(result).forEach(([key, value]) => {
      this.log(`${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
    })
    return api.disconnect()
  }
}
