'use strict'

const lots = require('../../data/lots.json')
const Promise = require('bluebird')

/**
 * To simulate real DB calls below functions return Promises
 */
const getLotById = lotId => Promise.resolve(lots[0])

const placeBid = (bid, lot) => new Promise((resolve, reject) => {
  if (lot.bidHistory.some(({ amount }) => amount >= bid.amount)) {
    return reject(new Error('Giá mới phải cao hơn giá cũ!'))
  }
  lot.currentPrice = bid.amount
  lot.bidHistory = [ bid, ...lot.bidHistory ]
  return resolve(bid)
})

exports.getLotById = getLotById
exports.placeBid = placeBid
