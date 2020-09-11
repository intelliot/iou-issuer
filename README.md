iou-issuer
==========

Issue and send IOUs on the XRP Ledger

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/iou-issuer.svg)](https://npmjs.org/package/iou-issuer)
[![Downloads/week](https://img.shields.io/npm/dw/iou-issuer.svg)](https://npmjs.org/package/iou-issuer)
[![License](https://img.shields.io/npm/l/iou-issuer.svg)](https://github.com/intelliot/iou-issuer/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g iou-issuer
$ iou-issuer COMMAND
running command...
$ iou-issuer (-v|--version|version)
iou-issuer/0.0.1 darwin-x64 node-v12.18.3
$ iou-issuer --help [COMMAND]
USAGE
  $ iou-issuer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`iou-issuer default-ripple ACCOUNT SECRET`](#iou-issuer-default-ripple-account-secret)
* [`iou-issuer hello [FILE]`](#iou-issuer-hello-file)
* [`iou-issuer help [COMMAND]`](#iou-issuer-help-command)
* [`iou-issuer send ACCOUNT SECRET`](#iou-issuer-send-account-secret)
* [`iou-issuer trust ACCOUNT SECRET`](#iou-issuer-trust-account-secret)

## `iou-issuer default-ripple ACCOUNT SECRET`

Enable rippling on the trust lines of an account

```
USAGE
  $ iou-issuer default-ripple ACCOUNT SECRET

ARGUMENTS
  ACCOUNT  Account Address
  SECRET   Secret

OPTIONS
  -h, --help              show CLI help
  -s, --server=server     [default: wss://s.altnet.rippletest.net:51233] rippled server
  -v, --value=true|false  [default: true] Value of DefaultRipple

EXAMPLE
  $ iou-issuer default-ripple rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD sshcfshUQBZHVtTVrFCdYHcZzYefN
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
  tx_blob: 
  12000322800000002400A00CAD201B00A00F5C20210000000868400000000000000C732103424E00965CD2E2528E69A947BE148F7E0DFE99377F9F
  2A6F991BA53DDF83D51274473045022100D9274BBA67E14F6DB420E7BB29B74BDFDD2AF2290AA0ADC1759B33BAB8749CC602206AD6A1C58EF3DEF5
  3807F000B0E15A087D79F34114C0DA9C37193BAD36A934638114A02CAD0E2EDDACEA4B7C3AF520A0791E1DFDA04E
  tx_json: 
  {"Account":"rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD","Fee":"12","Flags":2147483648,"LastLedgerSequence":10489692,"Sequence"
  :10489005,"SetFlag":8,"SigningPubKey":"03424E00965CD2E2528E69A947BE148F7E0DFE99377F9F2A6F991BA53DDF83D512","Transactio
  nType":"AccountSet","TxnSignature":"3045022100D9274BBA67E14F6DB420E7BB29B74BDFDD2AF2290AA0ADC1759B33BAB8749CC602206AD6
  A1C58EF3DEF53807F000B0E15A087D79F34114C0DA9C37193BAD36A93463","hash":"99D7251014D252B5CC18F91F49AF5C9340D3A822CAD548C9
  23B94F65A49DFA4D"}
  validated_ledger_index: 10489689
```

_See code: [src/commands/default-ripple.ts](https://github.com/intelliot/iou-issuer/blob/v0.0.1/src/commands/default-ripple.ts)_

## `iou-issuer hello [FILE]`

describe the command here

```
USAGE
  $ iou-issuer hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ iou-issuer hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/intelliot/iou-issuer/blob/v0.0.1/src/commands/hello.ts)_

## `iou-issuer help [COMMAND]`

display help for iou-issuer

```
USAGE
  $ iou-issuer help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `iou-issuer send ACCOUNT SECRET`

Send payment

```
USAGE
  $ iou-issuer send ACCOUNT SECRET

ARGUMENTS
  ACCOUNT  Account Address
  SECRET   Secret

OPTIONS
  -c, --currency=currency        [default: XRP] Amount currency to send
  -d, --destination=destination  (required) Destination account address
  -h, --help                     show CLI help
  -s, --server=server            [default: wss://s.altnet.rippletest.net:51233] rippled server
  -v, --value=value              (required) Amount value to send

EXAMPLE
  $ iou-issuer send rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD sshcfshUQBZHVtTVrFCdYHcZzYefN 
  --destination=r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3 --value=100 --currency=USD
  ...
```

_See code: [src/commands/send.ts](https://github.com/intelliot/iou-issuer/blob/v0.0.1/src/commands/send.ts)_

## `iou-issuer trust ACCOUNT SECRET`

Create trust line: Trust an account up to the specified amount of currency

```
USAGE
  $ iou-issuer trust ACCOUNT SECRET

ARGUMENTS
  ACCOUNT  Account Address
  SECRET   Secret

OPTIONS
  -c, --currency=currency  (required) Currency of trust line
  -h, --help               show CLI help
  -i, --issuer=issuer      (required) Issuer account address
  -s, --server=server      [default: wss://s.altnet.rippletest.net:51233] rippled server
  -v, --value=value        (required) Limit of trust line

EXAMPLE
  $ iou-issuer trust r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3 sawFJgo2bqcUBH2utvhSZV6FfsfSk 
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
  tx_blob: 
  12001422800000002400A0114C201B00A023D163D5438D7EA4C680000000000000000000000000005553440000000000A02CAD0E2EDDACEA4B7C3A
  F520A0791E1DFDA04E68400000000000000C7321026E2F3E476282A3A6B3A2FDE75FF032BB7299336B4368B04B0BCFA58094AE9339744730450221
  00FEA8F2E555EFB8128C3200ADE1D8EE7874A8FFD2F2FED617F2847A897806A52B02206E581D79A45AD9B2CA40DC14614305035E1E6779B8A153FA
  1D921FF9A14B508E811461E18EBCCCA6BC1A10B43DB3AB7C5AE939AFA161
  tx_json: 
  {"Account":"r9vYkdnueogdPSZ4pT9tyXpxtjX2P31nP3","Fee":"12","Flags":2147483648,"LastLedgerSequence":10494929,"LimitAmou
  nt":{"currency":"USD","issuer":"rEbvdqTyRZVvYun1zdNU5pqZgWdNZRYQBD","value":"1000"},"Sequence":10490188,"SigningPubKey
  ":"026E2F3E476282A3A6B3A2FDE75FF032BB7299336B4368B04B0BCFA58094AE9339","TransactionType":"TrustSet","TxnSignature":"30
  45022100FEA8F2E555EFB8128C3200ADE1D8EE7874A8FFD2F2FED617F2847A897806A52B02206E581D79A45AD9B2CA40DC14614305035E1E6779B8
  A153FA1D921FF9A14B508E","hash":"81675A683CE705357CE06B0A1BA53F0E61E79891ABADC6E3B2A1B004728E479E"}
  validated_ledger_index: 10494926
```

_See code: [src/commands/trust.ts](https://github.com/intelliot/iou-issuer/blob/v0.0.1/src/commands/trust.ts)_
<!-- commandsstop -->
