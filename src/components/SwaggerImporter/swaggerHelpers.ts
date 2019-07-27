import jsonSchemaRefParser from 'json-schema-ref-parser'
import { ListviewProps, FilterField } from '@laomao800/vue-listview'
import {
  PropertySchema,
  SwaggerPathData,
  NormalizedPathData,
  SwaggerDoc
} from '@/types/swagger'

/**
 * 解析 filterFields 时要忽略的参数名，
 * 可添加页码、排序相关等不需出现在搜索栏的搜索参数。
 */
const IGNORE_PROPERTIES = [
  'page_index',
  'page_size',
  'sort_name',
  'sort_order',
  'search_all'
]

function resolve(payload: any) {
  return Promise.resolve(payload)
}

function reject(msg: any) {
  return Promise.reject(new Error(msg))
}

/**
 * 从接口描述文字内解析 enum 数据
 * TODO: 支持解析原始 enum 属性
 * @param str 接口描述文字
 */
function parseEnums(str: string) {
  try {
    const enumsString = str.match(/(.+)\[enum: (.+)\]/)
    if (enumsString) {
      const options: any[] = []
      enumsString[2].split(' ').map(item => {
        const matchs = item.match(/(\d+)(.+)/)
        if (matchs) {
          options.push({
            value: parseInt(matchs[1], 10),
            label: matchs[2]
          })
        }
      })
      return {
        options,
        label: enumsString[1]
      }
    }
  } catch (e) {}
  return null
}

/**
 * 将 Swagger 单个接口参数解析为 Listview 的 filterFields 配置格式
 * @param prop 搜索条件提交字段名
 * @param propertySchema 搜索条件原始配置实体
 */
function getSingleFieldConfig(
  prop: string,
  propertySchema: PropertySchema
): FilterField {
  const { type, format, description } = propertySchema
  const propParamConfig: FilterField = {
    type: 'text',
    model: prop,
    label: description
  }
  switch (type) {
    case 'string':
      if (format === 'date-time') {
        propParamConfig.type = 'date'
      }
      break
    case 'integer':
      if (format === 'int64') {
        propParamConfig.type = 'text'
      } else if (format === 'int32') {
        const enums = parseEnums(description)
        if (enums) {
          const { options, label } = enums
          propParamConfig.options = options
          propParamConfig.type = 'select'
          propParamConfig.label = label
        }
      }
  }
  return propParamConfig
}

/**
 * 将 Swagger Path 实体内的参数 parameters 解析为 Listview 的 filterFields 配置格式
 * @param pathData Swagger path 接口配置实体
 */
function resolveFilterFields(
  pathData: NormalizedPathData
): Promise<ListviewProps['filterFields']> {
  const parameters = pathData.parameters
  if (!parameters) {
    return reject(`[filterFields 解析失败] 无法获取 parameters。`)
  }
  const schema = Array.isArray(parameters)
    ? parameters[0].schema
    : parameters.schema
  if (!schema) {
    return reject('[filterFields 解析失败] 所选接口不包含 schema 属性。')
  } else if (schema.type !== 'object') {
    return reject(
      // prettier-ignore
      `[filterFields 解析失败] 只支持解析 object 类型的 schema ，所选接口 schema type 为 ${schema.type} 。`
    )
  }

  const filterFields: ListviewProps['filterFields'] = []
  Object.entries(schema.properties).forEach(([prop, propConfig]) => {
    if (!IGNORE_PROPERTIES.includes(prop)) {
      const fieldConfig = getSingleFieldConfig(prop, propConfig)
      if (fieldConfig) {
        filterFields.push(fieldConfig)
      }
    }
  })
  return resolve(filterFields)
}

/**
 * 将 Swagger Path 实体内的响应（200） responses[200] 解析为 Listview 的 tableColumns 配置格式
 * @param pathData Swagger path 接口配置实体
 */
function resolveTableColumns(
  pathData: NormalizedPathData
): Promise<ListviewProps['tableColumns']> {
  return resolve([])
}

/**
 * 根据 Swagger 接口文档 tags 属性分类，并解析 $refs 引用
 * @param apiDocs 原始 Swagger api-docs JSON 实体
 */
export async function classifyPathDataWithTags(
  _apiDocs: any
): Promise<{ [tag: string]: NormalizedPathData }> {
  const apiDocs = await jsonSchemaRefParser.dereference(_apiDocs)
  const category: any = {}
  const paths = (apiDocs as SwaggerDoc).paths
  if (paths) {
    Object.entries(paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, pathData]) => {
        ;(pathData as SwaggerPathData).tags.forEach((tag: string) => {
          const target = category[tag] || (category[tag] = [])
          target.push({
            path,
            method,
            summary: pathData.summary,
            parameters: pathData.parameters,
            responses: pathData.responses
          })
        })
      })
    })
  }
  return category
}

export async function swaggerToListview(
  pathData: NormalizedPathData
): Promise<Partial<ListviewProps>> {
  try {
    const requestMethod = pathData.method
    const filterFields = await resolveFilterFields(pathData)
    const tableColumns = await resolveTableColumns(pathData)
    return resolve({ requestMethod, filterFields, tableColumns })
  } catch (e) {
    return reject(e)
  }
}
