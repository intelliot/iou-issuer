import {Command, flags} from '@oclif/command'
import {RippleAPI} from 'ripple-lib'

export default class Trust extends Command {
  static description = 'Create trust line: Trust an account up to the specified amount of currency'

  static examples = [
    `$ iou-issuer trust r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3 sawFJgo2bqcUBH2utvhSZV6FfsfSk --issuer=rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD --value=100 --currency=USD
...
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
