import { randomUUID } from 'crypto'
import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

// 钱包初始化
pool.initWallet = (userId: String) => {
  pool.getConnection((err, connection) => {
    if (err)
      throw err // not connected!
    // Use the connection
    connection.query('SELECT * FROM gpt_user_wallet where user_id = ?', userId, (error, results, fields) => {
      if (!results || results.length === 0) {
        connection.query('insert into gpt_user_wallet SET ?', { id: randomUUID(), create_time: new Date(), user_id: userId, balance: 0 }, (error, results, fields) => {
          if (error)
            throw error
          if (results.affectedRows <= 0)
            throw new Error('db update failed!')
        })
      }
      // When done with the connection, release it.
      connection.release()
      // Handle error after the release.
      if (error)
        throw error
    })
  })
}

// 检测余额
pool.checkConsume = (userId: String) => {
  let flag = null
  pool.getConnection((err, connection) => {
    if (err)
      throw err // not connected!
    // Use the connection
    connection.query('SELECT * FROM gpt_user_wallet where user_id = ?', userId, (error, results, fields) => {
      // When done with the connection, release it.
      connection.release()
      // Handle error after the release.
      if (error)
        throw error
      if (!results || results.length === 0) {
        pool.initWallet(userId)
        flag = false
      }
      if (results[0].balance < 1)
        flag = false
      flag = true
    })
  })
  return flag
}

// 插入消费记录
pool.insertConsumeRecord = (userId: String, total: Number, tokens: Number) => {
  pool.query('insert into gpt_consume_record SET ?',
    {
      id: randomUUID(),
      create_user: userId,
      create_time: new Date(),
      user_id: userId,
      total,
      tokens,
      model: 'gpt-3.5',
    },
    (error, results, fields) => {
      if (error)
        throw error
      if (results.affectedRows <= 0)
        throw new Error('db update failed!')
    })
}

export { pool }
