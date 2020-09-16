import type { Request, Response } from 'express'

export async function get(_req: Request, res: Response) {
  res.end(JSON.stringify({ hello: 'there' }))
}
