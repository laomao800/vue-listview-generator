interface Response {
  description: string
  schema?: {
    type: string
    title: string
    properties: {
      [k: string]: any
    }
  }
}

interface Schema {
  properties: PropertySchema
  title: string
  type: string
}

interface PropertySchema {
  type: string
  description: string
  format?: string
}

export interface Parameter {
  name: string
  in: string
  description: string
  required: boolean
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
  parameters?: Parameter | Parameter[]
  summary?: string
  description?: string
}

export interface NormalizedPathData extends SwaggerPathData {
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'
}
