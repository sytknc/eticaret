#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'

function loadEnvFromFile(filePath) {
  if (!fs.existsSync(filePath)) return

  const lines = fs.readFileSync(filePath, 'utf8').split('\n')

  for (const line of lines) {
    if (!line || line.trim().startsWith('#')) continue

    const [key, ...rest] = line.split('=')
    if (!key || rest.length === 0) continue

    const value = rest.join('=').trim().replace(/^"|"$/g, '')
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

// DOTENV_CONFIG_PATH ile özel bir dosya belirtilebilir, yoksa .env.local veya .env kullanılır
const envPath =
  process.env.DOTENV_CONFIG_PATH ||
  (fs.existsSync('.env.local') ? '.env.local' : fs.existsSync('.env') ? '.env' : null)

if (envPath) {
  loadEnvFromFile(envPath)
}

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL

if (!connectionString) {
  console.error('POSTGRES_URL_NON_POOLING veya POSTGRES_PRISMA_URL tanımlı değil.')
  process.exit(1)
}

const pool = new Pool({ connectionString })

async function seed() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    await client.query(`
      create table if not exists public.products (
        id text primary key,
        name text not null,
        description text,
        price numeric not null,
        image text,
        images text[] default '{}'
      );

      create table if not exists public.orders (
        id text primary key,
        customer text not null,
        total numeric not null,
        status text not null,
        delivery_area text,
        payment text
      );
    `)

    const productsPath = path.join(process.cwd(), 'data', 'products.json')
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

    for (const product of products) {
      await client.query(
        `
          insert into public.products (id, name, description, price, image, images)
          values ($1, $2, $3, $4, $5, $6)
          on conflict (id) do update set
            name = excluded.name,
            description = excluded.description,
            price = excluded.price,
            image = excluded.image,
            images = excluded.images;
        `,
        [product.id, product.name, product.description, product.price, product.image, product.images || []]
      )
    }

    const demoOrders = [
      {
        id: '#ORD-5432',
        customer: 'Ayşe Yılmaz',
        total: 5400,
        status: 'teslim edildi',
        delivery_area: 'Beşiktaş',
        payment: 'kredi kartı'
      },
      {
        id: '#ORD-5431',
        customer: 'Efe Kara',
        total: 3250,
        status: 'yolda',
        delivery_area: 'Ataşehir',
        payment: 'kapıda ödeme'
      },
      {
        id: '#ORD-5428',
        customer: 'Melisa Tan',
        total: 2675,
        status: 'hazırlanıyor',
        delivery_area: 'Bağcılar',
        payment: 'havale'
      }
    ]

    for (const order of demoOrders) {
      await client.query(
        `
          insert into public.orders (id, customer, total, status, delivery_area, payment)
          values ($1, $2, $3, $4, $5, $6)
          on conflict (id) do update set
            customer = excluded.customer,
            total = excluded.total,
            status = excluded.status,
            delivery_area = excluded.delivery_area,
            payment = excluded.payment;
        `,
        [order.id, order.customer, order.total, order.status, order.delivery_area, order.payment]
      )
    }

    await client.query('COMMIT')
    console.log('Supabase/PostgreSQL demoları başarıyla yüklendi ✅')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Seed sırasında hata oluştu:', error)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
