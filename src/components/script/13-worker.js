import { createChunk } from './13-createChunk.js'
onmessage = async (e) => {
  const { file, start, end, CHUNK_SIZE } = e.data

  const result = []
  for (let i = start; i < end; i++) {
    const prom = createChunk(file, i, CHUNK_SIZE)
    result.push(prom)
  }

  const chunks = await Promise.all(result)
  postMessage(chunks)
}
