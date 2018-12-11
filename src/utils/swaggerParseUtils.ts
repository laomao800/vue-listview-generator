import _ from 'lodash'
import swaggerJson from '@/views/editor/api'

console.log(swaggerJson)

export function resolveFilterParams(
  swaggerJson: any,
  path: string,
  method: string
) {
  const parameterNames = swaggerJson.paths[path][method].parameters.map(
    (parameter: any) => _.upperFirst(parameter.name)
  )
  const parameterProps = _.flatten(
    parameterNames.map(
      (name: string) => swaggerJson.definitions[name].properties
    )
  )

  const flatProps = _.transform(
    parameterProps,
    function(result, value) {
      result = _.merge(result, value)
    },
    {}
  )

  console.log(parameterNames, flatProps)
}

resolveFilterParams(swaggerJson, '/am_lottery_round/search', 'post')
