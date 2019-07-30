import _ from 'lodash'
import jsonSchemaRefParser from 'json-schema-ref-parser'
import {
  ListviewProps,
  FilterField,
  TableColumn
} from '@laomao800/vue-listview'
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
function parseEnums(str: any) {
  try {
    const enumsString = str.match(/(.+)\[enum: (.+)\]/)
    if (enumsString) {
      const options: any[] = []
      enumsString[2].split(' ').map((item: string) => {
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
  if (!(Array.isArray(parameters) && parameters.length > 0)) {
    return reject(`[filterFields 解析失败] 无法获取 parameters 。`)
  }
  const filterFields: ListviewProps['filterFields'] = []
  const isRefSchema = parameters.length === 1 && parameters[0].schema
  const properties = isRefSchema
    ? parameters[0].schema!.properties
    : _.keyBy(parameters, 'name')
  Object.entries(properties as PropertySchema).forEach(([prop, propConfig]) => {
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
  const successRes = pathData.responses['200']
  if (!successRes) {
    return reject(
      '[tableColumns 解析失败] 所选接口无法获取 responses[200] 响应内容。'
    )
  }

  const schema = successRes.schema
  if (!schema) {
    return reject('[tableColumns 解析失败] 所选接口不包含 schema 属性。')
  }

  let contentProps!: PropertySchema | undefined
  let contentPropName = null
  if (schema.type === 'object' && schema.properties) {
    const properties = schema.properties
    for (const prop in properties) {
      if (properties[prop]['type'] === 'array') {
        contentPropName = prop
        break
      }
    }
    if (contentPropName) {
      contentProps = properties[contentPropName][contentPropName].properties
    }
  } else if (schema.type === 'array') {
    contentProps = schema.items!.properties
  }
  if (!contentProps) {
    return reject(
      '[tableColumns 解析失败] 响应内容没有 type 为 "array" 的属性。'
    )
  }

  try {
    const tableColumns: ListviewProps['tableColumns'] = []
    Object.entries(contentProps).forEach(([prop, propConfig]) => {
      const { description } = propConfig
      const column: TableColumn = {}
      const enums = parseEnums(description)
      if (enums) {
        const { label } = enums
        column.label = label || prop
        // @ts-ignore
        column.fn$formatter = `function formatter(row) {\n  return row['${prop}']\n}`
      } else {
        column.label = description || prop
        column.prop = prop
      }
      tableColumns.push(column)
    })
    return resolve(tableColumns)
  } catch (e) {
    console.error(e)
    return reject('[tableColumns 解析失败] 无法获取 properties 。')
  }
}

export async function swaggerToListview(
  pathData: NormalizedPathData,
  baseUrl: string = ''
): Promise<
  Pick<
    ListviewProps,
    'requestUrl' | 'requestMethod' | 'filterFields' | 'tableColumns'
  >
> {
  try {
    const requestUrl = `${baseUrl}${pathData.path}`
    const requestMethod = pathData.method
    const filterFields = await resolveFilterFields(pathData)
    const tableColumns = await resolveTableColumns(pathData)
    return resolve({ requestUrl, requestMethod, filterFields, tableColumns })
  } catch (e) {
    throw e
  }
}

/**
 * 根据 Swagger 接口文档 tags 属性分类，并解析 $refs 引用
 * @param apiDocs 原始 Swagger api-docs JSON 实体
 */
export async function classifyPathDataByTags(
  _apiDocs: any
): Promise<{ [tag: string]: NormalizedPathData }> {
  const apiDocs = await jsonSchemaRefParser.dereference(_apiDocs)
  const category: any = {}
  const paths = (apiDocs as SwaggerDoc).paths
  if (paths) {
    Object.entries(paths).forEach(([path, methods]) => {
      Object.entries<SwaggerPathData>(methods).forEach(([method, pathData]) => {
        pathData.tags.forEach((tag: string) => {
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
