import {Apis} from './bitsharesjs-ws/src'
import {ChainStore, PrivateKey, Aes, TransactionBuilder } from './bitsharesjs/lib'


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

function GetKeyFromBrain(password) {
   var priv = PrivateKey.fromSeed(password)
   var pubkey = priv.toPublicKey().toPublicKeyString()
   var privkey = priv.toHex() 
   return [pubkey, privkey]
}

function Enc(plain, key) {
   var aes_handler = Aes.fromSeed(key)
   var enctxt = aes_handler.encryptToHex(plain)
   return enctxt
}

function Dec(enc, key) {
   var aes_handler = Aes.fromSeed(key)
   var dectxt = aes_handler.decryptHexToText(enc)
   return dectxt 
}
var account_full = []
function GetAccount(account_name) {
  account_full = ChainStore.getAccount(account_name, false)
  return account_full
}

var CNY_balance = []
var CTS_balance = []
function GetCNYBalance(account) {
  CNY_balance = ChainStore.getAccountBalance(account, '1.3.1')
  return CNY_balance / 10000.0
}

function GetCTSBalance(account) {
  CTS_balance = ChainStore.getAccountBalance(account, '1.3.0')
  return CTS_balance / 100000.0
}



function Merge(src) {
   var l = []
   var last = src[0]['price']
   l.push({'price': src[0]['price'], 'count': parseFloat(src[0]['quote'])})
   for (var i = 1; i < src.length; i++) {
      if (src[i]['price'] == last) {
          var temp = l.pop()
          temp['count'] += parseFloat(src[i]['quote'])
          l.push(temp)
      }else {
          l.push({'price':src[i]['price'], 'count':parseFloat(src[i]['quote'])})
          last = src[i]['price']
      }
   }
   return l
}

var OrderBookRet = {}
function GetOrderBook() {
  var books=[]
  var order_book = Apis.instance()
        .db_api().exec("get_order_book", [
                     "CNY",
                     "CTS",
                     50,
                 ])
  order_book.then(results => {
         books = results
         var ask = Merge(books.asks)
         var bid = Merge(books.bids)
         OrderBookRet['ask'] = ask.reverse()
         OrderBookRet['bid'] = bid
  })
  return OrderBookRet
}

function Buy(account, cts, cny, priv_wif) {
    cny = parseInt(cny * 10000)
    cts = parseInt(cts * 100000)
    console.error("cny = ", cny)
    console.error("cts = ", cts)
    var tr = new TransactionBuilder()
    let priv = PrivateKey.fromWif(priv_wif)
    let now = new Date()
    let expiration = new Date()
    expiration.setDate(now.getDate() + 30)
    console.error("expiration ", expiration)
    tr.add_type_operation("limit_order_create", {
           fee: {
                amount: 578,
                asset_id: "1.3.0"
           },
           seller: account,
           amount_to_sell: {
             amount: cny,
             asset_id: "1.3.1"

           },
           min_to_receive: {
             amount: cts,
             asset_id: "1.3.0"
           },
           expiration: expiration,
           fill_or_kill: false
       })
             
       tr.add_signer(priv)
       tr.broadcast()

}


function Sell(account, buyAmount, sellAmount, priv_wif) {
    sellAmount = parseInt(sellAmount * 100000)
    buyAmount = parseInt(buyAmount * 10000)
    var tr = new TransactionBuilder()
    console.error("account = ",account)
    console.error("buyAmount = ",buyAmount)
    console.error("sellAmount = ", sellAmount)
    console.error("priv_wif =", priv_wif)
    let priv = PrivateKey.fromWif(priv_wif)
    let now = new Date()
    let expiration = new Date()
    expiration.setDate(now.getDate() + 30)
    console.error("expiration ", expiration)
    tr.add_type_operation("limit_order_create", {
           fee: {
                amount: 578,
                asset_id: "1.3.0"
           },
           seller: account,
           amount_to_sell: {
             amount: sellAmount,
             asset_id: "1.3.0"

           },
           min_to_receive: {
             amount: buyAmount,
             asset_id: "1.3.1"
           },
           expiration: expiration,
           fill_or_kill: false
       })
             
       tr.add_signer(priv)
       tr.broadcast()

}


export {
  ChainConnect,
  GetData,
  ChainConnectMarket,
  GetDataMarket,
  CleanDataList,
  GetKeyFromBrain,
  Enc,
  Dec,
  GetAccount,
  GetOrderBook,
  Sell,
  Buy,
  GetCNYBalance,
  GetCTSBalance
}
