import {Apis} from './bitsharesjs-ws/src'
import {ChainStore} from './bitsharesjs/lib'

function ChainConnect () {
  Apis.instance('wss://www.citshares.org/ws', true).init_promise.then((res) => {
    console.log('connected to ', res[0].network)
    ChainStore.init().then(() => {
      ChainStore.subscribe(GetData)
    })
  })
}



function GetData () {
  var DataList = []
  var dynamic = ChainStore.getObject('2.1.0')
  console.log("CitShares: dynamic['head_block_number'] ", dynamic.get('head_block_number'))
  DataList.push({'head_block_number': dynamic.get('head_block_number')})
  DataList.push({'current_witness': dynamic.get('current_witness')})
  DataList.push({'recently_missed_count': dynamic.get('recently_missed_count')})


  return DataList
}

export {
ChainConnect,
GetData
}
