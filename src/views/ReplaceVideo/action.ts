import { Endpoint } from 'payload'
import { addDataAndFileToRequest } from '@payloadcms/next/utilities'

export const ReplaceVideoEndpoint: Endpoint = {
  path: '/replace-video',
  method: 'get',
  handler: async (req) => {
    // `data` is not automatically appended to the request
    // if you would like to read the body of the request
    // you can use `data = await req.json()`
    // Debug what we have available

    // await addDataAndFileToRequest(req)
    // const data = req.data as any
    const url = new URL(req.url as string)
    const beforeLink = url.searchParams.get('beforeLink') as string
    const afterLink = url.searchParams.get('afterLink') as string

    console.log('beforeLink:', beforeLink)
    console.log('afterLink:', afterLink)

    const data = {
      beforeLink,
      afterLink,
    }

    const res = await req.payload.update({
      collection: 'post',
      where: {
        youtubeLink: {
          equals: data.beforeLink,
        },
      },
      data: {
        youtubeLink: data.afterLink,
      },
    })

    const count = res.docs.length

    return Response.json({
      count,
    })
  },
}
