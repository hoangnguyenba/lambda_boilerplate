import middy from "@middy/core"
import ssm from "@middy/ssm"
import {getInternal} from "@middy/util"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler) => {
  return middy(handler)
    .use(ssm({
      fetchData: {
        configs: '/sphtech/swg/dev/swg_check_envs'
      },
      cacheKey: 'ssm-configs'
    }))
    .use(middyJsonBodyParser())
    .before(async (request) => {
      const data = await getInternal(['configs'], request)
      Object.assign(request.context, data)
    })
}
