import {Command, flags} from '@oclif/command'
import {RippleAPI} from 'ripple-lib'

export default class Send extends Command {
  static description = 'Send payment'

  static examples = [
    `$ iou-issuer send rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD sshcfshUQBZHVtTVrFCdYHcZzYefN --destination=r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3 --value=100 --currency=USD
...
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
