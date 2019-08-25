import {Apis} from './bitsharesjs-ws/src'
import {ChainStore} from './bitsharesjs/lib'

function ChainConnect () {
  Apis.instance('wss://www.citshares.org/ws', true).init_promise.then((res) => {
    console.log('connected to ', res[0].network)
    ChainStore.init().then(() => {
      ChainStore.subscribe(updateState)
    })
  })
}

function updateState (object) {
  var account = ChainStore.getObject('2.1.0')
  console.log('get account 2.1.0\n', account)
}

function test () {
  ChainConnect()
  return 'hello chaindata'
}

export {
test
}
