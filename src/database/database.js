import pg from 'pg'

const {Pool} = pg

export const database = new Pool()