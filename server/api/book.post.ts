export default defineEventHandler(async (evt) => {
  const body = await readBody(evt)
  console.log('body', body.roomId === '3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu')
  return {
    success: body.roomId === '3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu'
  }
})
