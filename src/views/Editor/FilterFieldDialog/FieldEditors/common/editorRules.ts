export default {
  label: [{ required: true, message: '请输入字段标签', trigger: 'blur' }],
  model: [
    { required: true, message: '请输入字段参数名称', trigger: 'blur' },
    {
      validator(
        rule: object | object[],
        value: any,
        callback: (e?: any) => void,
        source: object,
        options: object
      ) {
        const reg = /^[a-zA-Z]\w*$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('以字母开头，支持英文字母、下划线与数字'))
        }
      }
    }
  ],
  width: [
    {
      validator(
        rule: object | object[],
        value: any,
        callback: (e?: any) => void,
        source: object,
        options: object
      ) {
        if (value && typeof value !== 'number') {
          callback(new Error('请输入数字'))
        }
        if (value) {
          const num = parseInt(value, 10)
          if (num < 100 || num > 400) {
            callback(new Error('宽度限制 100px ~ 400px'))
          }
        }
        callback()
      }
    }
  ]
}
