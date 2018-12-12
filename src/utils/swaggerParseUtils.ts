// TODO: refactory
import _ from 'lodash'

const IGNORE_PROPERTIES = ['page_index', 'page_size', 'sort_name', 'sort_order']

function parseEnums(str: string) {
  try {
    const enumsString = str.match(/(.+)\[enum: (.+)\]/)
    if (enumsString) {
      const options: object[] = []
      enumsString[2].split(' ').map(item => {
        const matchs = item.match(/(\d+)(.+)/)
        if (matchs) {
          options.push({
            value: parseInt(matchs[1], 10),
            label: matchs[2]
          })
        }
      })
      return [options, enumsString[1]]
    }
  } catch (e) {}
  return []
}

export function resolveFilterFields(
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
  const flatProps = _.omit(
    _.transform(
      parameterProps,
      function(result, value) {
        result = _.merge(result, value)
      },
      {}
    ),
    IGNORE_PROPERTIES
  )

  return Object.keys(flatProps).map(prop => {
    const propValue: any = flatProps[prop]
    const propParamConfig: any = {
      type: 'text',
      model: prop,
      label: propValue.description
    }
    switch (propValue.type) {
      case 'string':
        if (propValue.format === 'date-time') {
          propParamConfig.type = 'date'
        }
        break
      case 'integer':
        if (propValue.format === 'int64') {
          propParamConfig.type = 'text'
        } else if (propValue.format === 'int32') {
          const [options, label] = parseEnums(propValue.description)
          if (options) {
            propParamConfig.options = options
            propParamConfig.type = 'select'
            propParamConfig.label = label
          }
        }
    }
    return propParamConfig
  })
}
