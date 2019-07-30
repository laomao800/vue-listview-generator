interface Response {
  description?: string
  schema?: Schema
}

interface Schema {
  type: string
  title?: string
  items?: Schema
  properties?: PropertySchema
}

interface PropertySchema {
  [k: string]: any
  type: string
  description?: string
  format?: string
}

export interface Parameter {
  name: string
  in?: string
  description?: string
  required?: boolean
  type?: string
  schema?: Schema
}

export interface SwaggerDoc {
  paths: {
    [path: string]: {
      [method: string]: SwaggerPathData
    }
  }
}

export interface SwaggerPathData {
  tags: string[]
  responses: { [code: string]: Response }
  parameters?: Parameter[]
  summary?: string
  description?: string
}

export interface NormalizedPathData extends SwaggerPathData {
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'
  path: string
}
