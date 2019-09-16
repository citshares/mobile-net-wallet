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
  DataList.push({'head_block_number': dynamic.get('head_block_number')})
  DataList.push({'current_witness': dynamic.get('current_witness')})
  DataList.push({'recently_missed_count': dynamic.get('recently_missed_count')})
 
  let get_limit_orders = []
  get_limit_orders = Apis.instance()
             .db_api().exec("get_limit_orders", [
                  "1.3.1",
                  "1.3.0",
                  300
              ])
  get_limit_orders.then(results => {

  })

  return DataList
}

function ChainConnectMarket (callBack) {
  Apis.instance('wss://www.citshares.org/ws', true)

}

var DataList = []

function CleanDataList() {
   DataList = []
}


function GetDataMarket (startDate = new Date() , seq = 0, by_time = 1) {
  let bucketSize = 100

  let endDate = new Date()

  endDate.setDate(startDate.getDate() - 30)
  if (by_time) { 
     let get_market_history = []
     get_market_history = Apis.instance()
                .db_api().exec("get_trade_history", [
                     "1.3.1",
                     "1.3.0",
                     startDate.toISOString().slice(0, -5),
                     endDate.toISOString().slice(0, -5),
                     1
                 ])
     get_market_history.then(results => {
         DataList = results
         console.log("CitShares by time ", DataList)
     })
   }else{
     let get_market_history = []
     get_market_history = Apis.instance()
                .db_api().exec("get_trade_history_by_sequence", [
                     "1.3.1",
                     "1.3.0",
                     seq,
                     endDate.toISOString().slice(0, -5),
                     bucketSize
                 ])
     get_market_history.then(results => {
         DataList = results
         console.log("CitShares by seq ", DataList)
     })

  }
  return DataList
}



export {
  ChainConnect,
  GetData,
  ChainConnectMarket,
  GetDataMarket,
  CleanDataList
}
