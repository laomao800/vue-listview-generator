export default {
  swagger: '2.0',
  info: {
    description: '提供棒谷年会的游戏排行榜，签到，抽奖等接口。',
    version: '1.0.0',
    title: '2019棒谷年会',
    termsOfService: "[set termsOfServiceUrl via 'swagger.termsOfServiceUrl']",
    contact: { name: '协同系统' },
    license: {
      name: 'License',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  host: 'pps.banggood.cn:8320',
  basePath: '/',
  tags: [
    { name: 'am-message-controller', description: '年会消息推送管理' },
    { name: 'game-controller', description: '游戏二维码' },
    { name: 'game-rank-controller', description: '游戏排行榜管理' },
    { name: 'lottery-prize-controller', description: '奖品信息管理' },
    { name: 'lottery-round-controller', description: '抽奖轮数管理' },
    { name: 'lottery-setting-controller', description: '抽奖设置管理' },
    { name: 'lottery-user-controller', description: '中奖用户管理' },
    { name: 'permission-controller', description: 'Permission Controller' },
    { name: 'sign-controller', description: '签到管理' }
  ],
  paths: {
    '/am_lottery_prize/add': {
      post: {
        tags: ['lottery-prize-controller'],
        summary: '新增奖品信息',
        description: '新增奖品信息详情',
        operationId: 'addUsingPOST_1',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryPrizeDTO',
            description: 'lotteryPrizeDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryPrizeDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryPrizeVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_prize/delete': {
      post: {
        tags: ['lottery-prize-controller'],
        summary: '删除奖品信息',
        description: '删除奖品信息详情',
        operationId: 'deleteUsingPOST_1',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryPrizeDeleteDTO',
            description: 'lotteryPrizeDeleteDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryPrizeDeleteDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { type: 'integer', format: 'int32' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_prize/get': {
      get: {
        tags: ['lottery-prize-controller'],
        summary: '获取奖品信息',
        description: '根据奖品信息ID获取详情，查询不到则返回空',
        operationId: 'getUsingGET_1',
        produces: ['application/json'],
        parameters: [
          {
            name: 'lottery_prize_id',
            in: 'query',
            description: '奖品信息ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryPrizeVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_prize/search': {
      post: {
        tags: ['lottery-prize-controller'],
        summary: '获取奖品信息列表',
        description: '获取奖品信息列表详情',
        operationId: 'searchUsingPOST_2',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryPrizeSearchDTO',
            description: 'lotteryPrizeSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryPrizeSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«LotteryPrizeVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_prize/update': {
      post: {
        tags: ['lottery-prize-controller'],
        summary: '更新奖品信息',
        description: '更新奖品信息详情',
        operationId: 'updateUsingPOST_1',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryPrizeDTO',
            description: 'lotteryPrizeDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryPrizeDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryPrizeVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_round/add': {
      post: {
        tags: ['lottery-round-controller'],
        summary: '新增抽奖轮数',
        description: '新增抽奖轮数详情',
        operationId: 'addUsingPOST_2',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryRoundDTO',
            description: 'lotteryRoundDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryRoundDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryRoundVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_round/close_lottery_round': {
      post: {
        tags: ['lottery-round-controller'],
        summary: '结束抽奖',
        description: '结束抽奖',
        operationId: 'closeLotteryRoundUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'lottery_round_id',
            in: 'query',
            description: 'lottery_round_id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryRoundVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_round/search': {
      post: {
        tags: ['lottery-round-controller'],
        summary: '获取抽奖轮数列表',
        description: '获取抽奖轮数列表详情（开发补充）',
        operationId: 'searchUsingPOST_3',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryRoundSearchDTO',
            description: 'lotteryRoundSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryRoundSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«LotteryRoundVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_round/start_lottery_round': {
      post: {
        tags: ['lottery-round-controller'],
        summary: '开启抽奖',
        description: '开启抽奖',
        operationId: 'startLotteryRandomUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'lottery_round_id',
            in: 'query',
            description: 'lottery_round_id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryRoundVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_round/top_seckill_lottery': {
      get: {
        tags: ['lottery-round-controller'],
        summary: 'top秒杀抽奖',
        description: 'top秒杀抽奖',
        operationId: 'topSeckillLotteryUsingGET',
        produces: ['application/json'],
        parameters: [
          {
            name: 'lottery_round_id',
            in: 'query',
            description: 'lottery_round_id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '200': { description: 'OK', schema: { type: 'boolean' } },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_round/update': {
      post: {
        tags: ['lottery-round-controller'],
        summary: '更新抽奖轮数',
        description: '更新抽奖轮数详情（开发补充）',
        operationId: 'updateUsingPOST_2',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryRoundDTO',
            description: 'lotteryRoundDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryRoundDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryRoundVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_setting/InitialLotterySetting': {
      post: {
        tags: ['lottery-setting-controller'],
        summary: '初始化抽奖设置',
        description: '生成7个奖项设置数据',
        operationId: 'InitialLotterySettingUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              type: 'array',
              items: { $ref: '#/definitions/LotterySettingVO' }
            }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_setting/add': {
      post: {
        tags: ['lottery-setting-controller'],
        summary: '新增抽奖设置',
        description: '新增抽奖设置详情',
        operationId: 'addUsingPOST_3',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotterySettingDTO',
            description: 'lotterySettingDTO',
            required: true,
            schema: { $ref: '#/definitions/LotterySettingDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotterySettingVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_setting/delete': {
      post: {
        tags: ['lottery-setting-controller'],
        summary: '删除抽奖设置',
        description: '删除抽奖设置详情（开发补充）',
        operationId: 'deleteUsingPOST_2',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotterySettingDeleteDTO',
            description: 'lotterySettingDeleteDTO',
            required: true,
            schema: { $ref: '#/definitions/LotterySettingDeleteDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { type: 'integer', format: 'int32' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_setting/resetLotteryData': {
      post: {
        tags: ['lottery-setting-controller'],
        summary: '重置抽奖数据',
        description: '重置抽奖数据',
        operationId: 'resetLotteryDataUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        responses: {
          '200': { description: 'OK', schema: { type: 'boolean' } },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_setting/search': {
      post: {
        tags: ['lottery-setting-controller'],
        summary: '获取抽奖设置列表',
        description: '获取抽奖设置列表详情',
        operationId: 'searchUsingPOST_4',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotterySettingSearchDTO',
            description: 'lotterySettingSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/LotterySettingSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«LotterySettingVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_setting/update': {
      post: {
        tags: ['lottery-setting-controller'],
        summary: '更新抽奖设置',
        description: '更新抽奖设置详情',
        operationId: 'updateUsingPOST_3',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotterySettingDTO',
            description: 'lotterySettingDTO',
            required: true,
            schema: { $ref: '#/definitions/LotterySettingDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotterySettingVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_user/add': {
      post: {
        tags: ['lottery-user-controller'],
        summary: '新增中奖用户',
        description: '新增中奖用户详情（开发补充）',
        operationId: 'addUsingPOST_4',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryUserDTO',
            description: 'lotteryUserDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryUserDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryUserVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_user/cancel_lottery_user': {
      post: {
        tags: ['lottery-user-controller'],
        summary: '作废抽奖',
        description: '用户详情',
        operationId: 'addUsingPOST_5',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'cancelLotteryUserDTO',
            description: 'cancelLotteryUserDTO',
            required: true,
            schema: { $ref: '#/definitions/CancelLotteryUserDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryUserVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_user/get': {
      get: {
        tags: ['lottery-user-controller'],
        summary: '获取中奖用户',
        description: '根据中奖用户ID获取详情，查询不到则返回空',
        operationId: 'getUsingGET_2',
        produces: ['application/json'],
        parameters: [
          {
            name: 'lottery_user_id',
            in: 'query',
            description: '中奖用户ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryUserVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_user/get_lottery_user_result': {
      get: {
        tags: ['lottery-user-controller'],
        summary: '获取用户中奖结果',
        description: '中奖信息',
        operationId: 'lotteryUserResultUsingGET',
        produces: ['application/json'],
        parameters: [
          {
            name: 'lottery_round_id',
            in: 'query',
            description: 'lottery_round_id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryUserResultVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_user/lottery_user_verify': {
      post: {
        tags: ['lottery-user-controller'],
        summary: '用户确认中奖操作',
        description: '中奖信息',
        operationId: 'lotteryUserVerifyUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'lottery_round_id',
            in: 'query',
            description: 'lottery_round_id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryUserResultVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_user/search': {
      post: {
        tags: ['lottery-user-controller'],
        summary: '获取中奖用户列表',
        description: '获取中奖用户列表详情（开发补充）',
        operationId: 'searchUsingPOST_5',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryUserSearchDTO',
            description: 'lotteryUserSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryUserSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«LotteryUserVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_lottery_user/update': {
      post: {
        tags: ['lottery-user-controller'],
        summary: '更新中奖用户',
        description: '更新中奖用户详情（开发补充）',
        operationId: 'updateUsingPOST_4',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'lotteryUserDTO',
            description: 'lotteryUserDTO',
            required: true,
            schema: { $ref: '#/definitions/LotteryUserDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/LotteryUserVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_message/add': {
      post: {
        tags: ['am-message-controller'],
        summary: '新增年会消息推送',
        description: '新增年会消息推送详情（开发补充）',
        operationId: 'addUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'amMessageDTO',
            description: 'amMessageDTO',
            required: true,
            schema: { $ref: '#/definitions/AmMessageAddDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/AmMessageVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_message/delete': {
      post: {
        tags: ['am-message-controller'],
        summary: '删除年会消息推送',
        description: '删除年会消息推送详情（开发补充）',
        operationId: 'deleteUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'amMessageIdDTO',
            description: 'amMessageIdDTO',
            required: true,
            schema: { $ref: '#/definitions/AmMessageIdDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { type: 'integer', format: 'int32' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_message/get': {
      get: {
        tags: ['am-message-controller'],
        summary: '获取年会消息推送',
        description: '根据年会消息推送ID获取详情，查询不到则返回空',
        operationId: 'getUsingGET',
        produces: ['application/json'],
        parameters: [
          {
            name: 'am_message_id',
            in: 'query',
            description: '年会消息推送ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/AmMessageVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_message/search': {
      post: {
        tags: ['am-message-controller'],
        summary: '获取年会消息推送列表',
        description: '获取年会消息推送列表详情（开发补充）',
        operationId: 'searchUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'amMessageSearchDTO',
            description: 'amMessageSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/AmMessageSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«AmMessageVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_message/send': {
      post: {
        tags: ['am-message-controller'],
        summary: '发送消息',
        operationId: 'sendAmMessageUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'amMessageIdDTO',
            description: 'amMessageIdDTO',
            required: true,
            schema: { $ref: '#/definitions/AmMessageIdDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/AmMessageVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/am_message/update': {
      post: {
        tags: ['am-message-controller'],
        summary: '更新年会消息推送',
        description: '更新年会消息推送详情（开发补充）',
        operationId: 'updateUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'amMessageUpdateDTO',
            description: 'amMessageUpdateDTO',
            required: true,
            schema: { $ref: '#/definitions/AmMessageUpdateDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/AmMessageVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game/get_game_status': {
      get: {
        tags: ['game-controller'],
        summary: '获取游戏开始结束状态',
        operationId: 'getGameStatusUsingGET',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/GameStatusVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game/start_game': {
      get: {
        tags: ['game-controller'],
        summary: '管理员后台-开始游戏',
        operationId: 'startGameUsingGET',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/GameStatusVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game/stop_game': {
      get: {
        tags: ['game-controller'],
        summary: '管理员后台-结束游戏',
        operationId: 'stopGameUsingGET',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/GameStatusVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game_rank/get_user_rank': {
      get: {
        tags: ['game-rank-controller'],
        summary: '获取用户排行',
        description: '根据游戏排行榜ID获取详情，查询不到则返回空',
        operationId: 'getUserRankUsingGET',
        produces: ['application/json'],
        parameters: [
          {
            name: 'user_id',
            in: 'query',
            description: 'user_id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/GameRankVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game_rank/search': {
      post: {
        tags: ['game-rank-controller'],
        summary: '获取游戏排行榜-排名前20名玩家',
        description: '获取游戏排行榜列表详情',
        operationId: 'searchUsingPOST_1',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'gameRankSearchDTO',
            description: 'gameRankSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/GameRankSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«GameRankVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game_rank/search_lucky': {
      post: {
        tags: ['game-rank-controller'],
        summary: '获取游戏排行榜-排名带8结尾的幸运玩家',
        description: '获取游戏排行榜列表详情',
        operationId: 'searchLuckyUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'gameRankSearchDTO',
            description: 'gameRankSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/GameRankSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«GameRankVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game_rank/send_game_prize_message': {
      post: {
        tags: ['game-rank-controller'],
        summary: '发送小游戏的中奖消息通知',
        operationId: 'sendGamePrizeMessageUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        responses: {
          '200': { description: 'OK', schema: { type: 'boolean' } },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/game_rank/update_score': {
      post: {
        tags: ['game-rank-controller'],
        summary: '更新游戏分数',
        description: '更新用户的游戏分数，如还未提交分数，则新增一条记录。',
        operationId: 'updateScoreUsingPOST',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'gameRankDTO',
            description: 'gameRankDTO',
            required: true,
            schema: { $ref: '#/definitions/GameRankDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/GameRankVO' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/permission/hasPermissionByPermissionUri': {
      get: {
        tags: ['permission-controller'],
        summary: '是否有权限',
        operationId: 'hasPermissionByPermissionUriUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'permission_uri',
            in: 'query',
            description: '权限标签',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': { description: 'OK', schema: { type: 'boolean' } },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/sign/delete': {
      get: {
        tags: ['sign-controller'],
        summary: '删除签到（删除本人的签到，仅供测试用）',
        description: '删除本人的签到，仅供测试用',
        operationId: 'deleteUsingGET',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: { type: 'integer', format: 'int32' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/sign/download_sign_in_qrcode': {
      get: {
        tags: ['sign-controller'],
        summary: '下载签到二维码',
        description: '我要签到拿奖',
        operationId: 'downloadSignInQRcodeUsingGET',
        produces: ['*/*'],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/sign/search': {
      post: {
        tags: ['sign-controller'],
        summary: '获取签到列表',
        description: '获取签到列表详情（开发补充）',
        operationId: 'searchUsingPOST_6',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'signSearchDTO',
            description: 'signSearchDTO',
            required: true,
            schema: { $ref: '#/definitions/SignSearchDTO' }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/PagedResult«SignVO»' }
          },
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/sign/sign_in': {
      get: {
        tags: ['sign-controller'],
        summary: '我要签到',
        description: '我要签到拿奖',
        operationId: 'signInUsingGET',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/SignInResultVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    },
    '/sign/sync_wechat_tag_member': {
      get: {
        tags: ['sign-controller'],
        summary: '立即同步企业微信标签成员',
        operationId: 'syncWechatTagMemberUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: { $ref: '#/definitions/SyncWechatTagMemberResultVO' }
          },
          '401': { description: 'Unauthorized' },
          '403': { description: 'Forbidden' },
          '404': { description: 'Not Found' }
        }
      }
    }
  },
  definitions: {
    AmMessageAddDTO: {
      type: 'object',
      required: ['message_target_type', 'message_title', 'message_type'],
      properties: {
        message_content: {
          type: 'string',
          description: '消息内容',
          allowEmptyValue: false
        },
        message_link: {
          type: 'string',
          description: '消息详情链接',
          allowEmptyValue: false
        },
        message_subtitle: {
          type: 'string',
          description: '消息副标题',
          allowEmptyValue: false
        },
        message_target_id: {
          type: 'string',
          description: '消息发送对象ID',
          allowEmptyValue: false
        },
        message_target_type: {
          type: 'integer',
          format: 'int32',
          description:
            '消息发送对象类型[enum: 0全体企微成员 1年会成员 2指定企微标签ID的成员 3指定企微部门ID的成员 4指定人事UserID的成员]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        message_title: {
          type: 'string',
          description: '消息标题',
          allowEmptyValue: false
        },
        message_type: {
          type: 'string',
          description: '消息类型',
          allowEmptyValue: false
        }
      },
      title: 'AmMessageAddDTO'
    },
    AmMessageIdDTO: {
      type: 'object',
      required: ['am_message_id'],
      properties: {
        am_message_id: {
          type: 'integer',
          format: 'int64',
          description: '年会消息主键ID',
          allowEmptyValue: false
        }
      },
      title: 'AmMessageIdDTO'
    },
    AmMessageSearchDTO: {
      type: 'object',
      properties: {
        eq_am_message_id: {
          type: 'integer',
          format: 'int64',
          description: '年会消息主键ID',
          allowEmptyValue: false
        },
        eq_creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        eq_last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        eq_message_content: {
          type: 'string',
          description: '消息内容',
          allowEmptyValue: false
        },
        eq_message_link: {
          type: 'string',
          description: '消息详情链接',
          allowEmptyValue: false
        },
        eq_message_subtitle: {
          type: 'string',
          description: '消息副标题',
          allowEmptyValue: false
        },
        eq_message_target_id: {
          type: 'string',
          description: '消息发送对象ID',
          allowEmptyValue: false
        },
        eq_message_target_type: {
          type: 'integer',
          format: 'int32',
          description:
            '消息发送对象类型[enum: 0全体企微成员 1年会成员 2指定企微标签ID的成员 3指定企微部门ID的成员 4指定人事UserID的成员]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        eq_message_title: {
          type: 'string',
          description: '消息标题',
          allowEmptyValue: false
        },
        eq_message_type: {
          type: 'string',
          description: '消息类型',
          allowEmptyValue: false
        },
        eq_receipts: {
          type: 'integer',
          format: 'int32',
          description: '消息送达人数',
          allowEmptyValue: false
        },
        eq_sort: {
          type: 'integer',
          format: 'int32',
          description: '排序',
          allowEmptyValue: false
        },
        eq_status: {
          type: 'integer',
          format: 'int32',
          description: '消息发送状态[enum: 0待发送 1发送中 2已发送]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        gt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        gt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        gt_send_time: {
          type: 'string',
          format: 'date-time',
          description: '消息发送时间',
          allowEmptyValue: false
        },
        like_message_content: {
          type: 'string',
          description: '消息内容',
          allowEmptyValue: false
        },
        like_message_link: {
          type: 'string',
          description: '消息详情链接',
          allowEmptyValue: false
        },
        like_message_subtitle: {
          type: 'string',
          description: '消息副标题',
          allowEmptyValue: false
        },
        like_message_target_id: {
          type: 'string',
          description: '消息发送对象ID',
          allowEmptyValue: false
        },
        like_message_title: {
          type: 'string',
          description: '消息标题',
          allowEmptyValue: false
        },
        like_message_type: {
          type: 'string',
          description: '消息类型',
          allowEmptyValue: false
        },
        lt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        lt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        lt_send_time: {
          type: 'string',
          format: 'date-time',
          description: '消息发送时间',
          allowEmptyValue: false
        },
        page_index: {
          type: 'integer',
          format: 'int32',
          example: 'int,第几页',
          allowEmptyValue: false
        },
        page_size: {
          type: 'integer',
          format: 'int32',
          example: 'int,每页数量',
          allowEmptyValue: false
        },
        sort_name: {
          type: 'string',
          example: 'string,排序字段名',
          allowEmptyValue: false
        },
        sort_order: {
          type: 'string',
          example: 'string,排序顺序(asc|desc)',
          allowEmptyValue: false
        }
      },
      title: 'AmMessageSearchDTO'
    },
    AmMessageUpdateDTO: {
      type: 'object',
      required: ['am_message_id'],
      properties: {
        am_message_id: {
          type: 'integer',
          format: 'int64',
          description: '年会消息主键ID',
          allowEmptyValue: false
        },
        message_link: {
          type: 'string',
          description: '消息详情链接',
          allowEmptyValue: false
        },
        message_subtitle: {
          type: 'string',
          description: '消息副标题',
          allowEmptyValue: false
        },
        message_title: {
          type: 'string',
          description: '消息标题',
          allowEmptyValue: false
        },
        message_type: {
          type: 'string',
          description: '消息类型',
          allowEmptyValue: false
        },
        sort: {
          type: 'integer',
          format: 'int32',
          description: '排序',
          allowEmptyValue: false
        }
      },
      title: 'AmMessageUpdateDTO'
    },
    AmMessageVO: {
      type: 'object',
      properties: {
        am_message_id: {
          type: 'string',
          description: '年会消息主键ID',
          allowEmptyValue: false
        },
        creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        message_content: {
          type: 'string',
          description: '消息内容',
          allowEmptyValue: false
        },
        message_link: {
          type: 'string',
          description: '消息详情链接',
          allowEmptyValue: false
        },
        message_subtitle: {
          type: 'string',
          description: '消息副标题',
          allowEmptyValue: false
        },
        message_target_id: {
          type: 'string',
          description: '消息发送对象ID',
          allowEmptyValue: false
        },
        message_target_type: {
          type: 'integer',
          format: 'int32',
          description:
            '消息发送对象类型[enum: 0全体企微成员 1年会成员 2指定企微标签ID的成员 3指定企微部门ID的成员 4指定人事UserID的成员]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        message_title: {
          type: 'string',
          description: '消息标题',
          allowEmptyValue: false
        },
        message_type: {
          type: 'string',
          description: '消息类型',
          allowEmptyValue: false
        },
        receipts: {
          type: 'integer',
          format: 'int32',
          description: '消息送达人数',
          allowEmptyValue: false
        },
        send_time: {
          type: 'string',
          format: 'date-time',
          description: '消息发送时间',
          allowEmptyValue: false
        },
        sort: {
          type: 'integer',
          format: 'int32',
          description: '排序',
          allowEmptyValue: false
        },
        status: {
          type: 'integer',
          format: 'int32',
          description: '消息发送状态[enum: 0待发送 1发送中 2已发送]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        }
      },
      title: 'AmMessageVO'
    },
    CancelLotteryUserDTO: {
      type: 'object',
      properties: {
        lottery_round_id: {
          type: 'integer',
          format: 'int64',
          description: '抽奖id',
          allowEmptyValue: false
        },
        user_id: {
          type: 'string',
          description: '用户id',
          allowEmptyValue: false
        }
      },
      title: 'CancelLotteryUserDTO'
    },
    GameRankDTO: {
      type: 'object',
      required: ['max_score'],
      properties: {
        max_score: {
          type: 'integer',
          format: 'int64',
          description: '最高分数',
          allowEmptyValue: false
        }
      },
      title: 'GameRankDTO'
    },
    GameRankSearchDTO: {
      type: 'object',
      properties: {
        page_index: {
          type: 'integer',
          format: 'int32',
          example: 'int,第几页',
          allowEmptyValue: false
        },
        page_size: {
          type: 'integer',
          format: 'int32',
          example: 'int,每页数量',
          allowEmptyValue: false
        },
        sort_name: {
          type: 'string',
          example: 'string,排序字段名',
          allowEmptyValue: false
        },
        sort_order: {
          type: 'string',
          example: 'string,排序顺序(asc|desc)',
          allowEmptyValue: false
        }
      },
      title: 'GameRankSearchDTO'
    },
    GameRankVO: {
      type: 'object',
      properties: {
        max_score: {
          type: 'integer',
          format: 'int64',
          description: '最高分数',
          allowEmptyValue: false
        },
        rank: {
          type: 'integer',
          format: 'int64',
          description: '排行',
          allowEmptyValue: false
        },
        top_department_name: {
          type: 'string',
          description: '次顶级部门名称',
          allowEmptyValue: false
        },
        user_id: {
          type: 'string',
          description: '用户ID',
          allowEmptyValue: false
        },
        user_info: {
          description: '用户信息',
          allowEmptyValue: false,
          $ref: '#/definitions/用户信息'
        }
      },
      title: 'GameRankVO'
    },
    GameStatusVO: {
      type: 'object',
      properties: {
        activity_name: {
          type: 'string',
          description: '游戏活动名称',
          allowEmptyValue: false
        },
        begin_time: {
          type: 'string',
          format: 'date-time',
          description: '开始时间',
          allowEmptyValue: false
        },
        end_time: {
          type: 'string',
          format: 'date-time',
          description: '结束时间',
          allowEmptyValue: false
        },
        is_begin: {
          type: 'boolean',
          example: false,
          description: '是否开始',
          allowEmptyValue: false
        },
        is_end: {
          type: 'boolean',
          example: false,
          description: '是否结束',
          allowEmptyValue: false
        }
      },
      title: 'GameStatusVO'
    },
    LotteryPrizeDTO: {
      type: 'object',
      required: ['prize_name', 'total_quantity'],
      properties: {
        image_url: {
          type: 'string',
          description: '图片地址',
          allowEmptyValue: false
        },
        lottery_prize_id: {
          type: 'integer',
          format: 'int64',
          description: '奖品主键id',
          allowEmptyValue: false
        },
        prize_name: {
          type: 'string',
          description: '奖品名称',
          allowEmptyValue: false
        },
        total_quantity: {
          type: 'integer',
          format: 'int32',
          description: '总库存',
          allowEmptyValue: false
        }
      },
      title: 'LotteryPrizeDTO'
    },
    LotteryPrizeDeleteDTO: {
      type: 'object',
      required: ['lottery_prize_id'],
      properties: {
        lottery_prize_id: {
          type: 'integer',
          format: 'int64',
          description: '奖品主键id',
          allowEmptyValue: false
        }
      },
      title: 'LotteryPrizeDeleteDTO'
    },
    LotteryPrizeSearchDTO: {
      type: 'object',
      properties: {
        eq_creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        eq_image_url: {
          type: 'string',
          description: '图片地址',
          allowEmptyValue: false
        },
        eq_last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        eq_lottery_prize_id: {
          type: 'integer',
          format: 'int64',
          description: '奖品主键id',
          allowEmptyValue: false
        },
        eq_lottery_quantity: {
          type: 'integer',
          format: 'int32',
          description: '已抽个数',
          allowEmptyValue: false
        },
        eq_prize_name: {
          type: 'string',
          description: '奖品名称',
          allowEmptyValue: false
        },
        eq_surplus_quantity: {
          type: 'integer',
          format: 'int32',
          description: '剩余个数',
          allowEmptyValue: false
        },
        eq_total_quantity: {
          type: 'integer',
          format: 'int32',
          description: '总库存',
          allowEmptyValue: false
        },
        gt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        gt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        like_image_url: {
          type: 'string',
          description: '图片地址',
          allowEmptyValue: false
        },
        like_prize_name: {
          type: 'string',
          description: '奖品名称',
          allowEmptyValue: false
        },
        lt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        lt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        page_index: {
          type: 'integer',
          format: 'int32',
          example: 'int,第几页',
          allowEmptyValue: false
        },
        page_size: {
          type: 'integer',
          format: 'int32',
          example: 'int,每页数量',
          allowEmptyValue: false
        },
        sort_name: {
          type: 'string',
          example: 'string,排序字段名',
          allowEmptyValue: false
        },
        sort_order: {
          type: 'string',
          example: 'string,排序顺序(asc|desc)',
          allowEmptyValue: false
        }
      },
      title: 'LotteryPrizeSearchDTO'
    },
    LotteryPrizeVO: {
      type: 'object',
      properties: {
        creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        image_url: {
          type: 'string',
          description: '图片地址',
          allowEmptyValue: false
        },
        last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        lottery_prize_id: {
          type: 'string',
          description: '奖品主键id',
          allowEmptyValue: false
        },
        lottery_quantity: {
          type: 'integer',
          format: 'int32',
          description: '已抽个数',
          allowEmptyValue: false
        },
        prize_name: {
          type: 'string',
          description: '奖品名称',
          allowEmptyValue: false
        },
        surplus_quantity: {
          type: 'integer',
          format: 'int32',
          description: '剩余个数',
          allowEmptyValue: false
        },
        total_quantity: {
          type: 'integer',
          format: 'int32',
          description: '总库存',
          allowEmptyValue: false
        }
      },
      title: 'LotteryPrizeVO'
    },
    LotteryRoundDTO: {
      type: 'object',
      required: [
        'lottery_num',
        'lottery_prize_id',
        'lottery_setting_id',
        'lottery_type',
        'round_name'
      ],
      properties: {
        lottery_num: {
          type: 'integer',
          format: 'int32',
          description: '抽奖名额',
          allowEmptyValue: false
        },
        lottery_prize_id: {
          type: 'integer',
          format: 'int64',
          description: '对应奖品id',
          allowEmptyValue: false
        },
        lottery_round_id: {
          type: 'integer',
          format: 'int64',
          description: '抽奖轮数设置',
          allowEmptyValue: false
        },
        lottery_setting_id: {
          type: 'integer',
          format: 'int64',
          description: '关联抽奖设置id',
          allowEmptyValue: false
        },
        lottery_type: {
          type: 'integer',
          format: 'int32',
          description:
            '抽奖方式[enum: 1大屏幕滚动抽奖 2刮刮乐 3开宝箱 4砸金蛋 5开红包]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        lottery_user_id: {
          type: 'string',
          description: '抽奖人',
          allowEmptyValue: false
        },
        round_name: {
          type: 'string',
          description: '抽奖名称',
          allowEmptyValue: false
        }
      },
      title: 'LotteryRoundDTO'
    },
    LotteryRoundSearchDTO: {
      type: 'object',
      properties: {
        eq_creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        eq_is_send_message: {
          type: 'boolean',
          example: false,
          description: '已发消息',
          allowEmptyValue: false
        },
        eq_last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        eq_lottery_num: {
          type: 'integer',
          format: 'int32',
          description: '抽奖名额',
          allowEmptyValue: false
        },
        eq_lottery_prize_id: {
          type: 'integer',
          format: 'int64',
          description: '对应奖品id',
          allowEmptyValue: false
        },
        eq_lottery_round_id: {
          type: 'integer',
          format: 'int64',
          description: '抽奖轮数设置',
          allowEmptyValue: false
        },
        eq_lottery_setting_id: {
          type: 'integer',
          format: 'int64',
          description: '关联抽奖设置id',
          allowEmptyValue: false
        },
        eq_lottery_type: {
          type: 'integer',
          format: 'int32',
          description:
            '抽奖方式[enum: 1大屏幕滚动抽奖 2刮刮乐 3开宝箱 4砸金蛋 5开红包]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        eq_lottery_user_id: {
          type: 'string',
          description: '抽奖人',
          allowEmptyValue: false
        },
        eq_operate_type: {
          type: 'integer',
          format: 'int32',
          description: '操作类型[enum: 0初始化 1启动 2结束]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        eq_round_name: {
          type: 'string',
          description: '名称',
          allowEmptyValue: false
        },
        eq_round_num: {
          type: 'integer',
          format: 'int32',
          description: '第几轮',
          allowEmptyValue: false
        },
        eq_status: {
          type: 'integer',
          format: 'int32',
          description: '状态[enum: 1未开始 2进行中 3已结束]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        gt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        gt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        like_lottery_user_id: {
          type: 'string',
          description: '抽奖人',
          allowEmptyValue: false
        },
        like_round_name: {
          type: 'string',
          description: '名称',
          allowEmptyValue: false
        },
        lt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        lt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        page_index: {
          type: 'integer',
          format: 'int32',
          example: 'int,第几页',
          allowEmptyValue: false
        },
        page_size: {
          type: 'integer',
          format: 'int32',
          example: 'int,每页数量',
          allowEmptyValue: false
        },
        sort_name: {
          type: 'string',
          example: 'string,排序字段名',
          allowEmptyValue: false
        },
        sort_order: {
          type: 'string',
          example: 'string,排序顺序(asc|desc)',
          allowEmptyValue: false
        }
      },
      title: 'LotteryRoundSearchDTO'
    },
    LotteryRoundVO: {
      type: 'object',
      properties: {
        creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        is_send_message: {
          type: 'boolean',
          example: false,
          description: '已发消息',
          allowEmptyValue: false
        },
        last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        lottery_num: {
          type: 'integer',
          format: 'int32',
          description: '抽奖名额',
          allowEmptyValue: false
        },
        lottery_prize_id: {
          type: 'string',
          description: '对应奖品id',
          allowEmptyValue: false
        },
        lottery_round_id: {
          type: 'string',
          description: '抽奖轮数设置',
          allowEmptyValue: false
        },
        lottery_setting_id: {
          type: 'string',
          description: '关联抽奖设置id',
          allowEmptyValue: false
        },
        lottery_type: {
          type: 'integer',
          format: 'int32',
          description:
            '抽奖方式[enum: 1大屏幕滚动抽奖 2刮刮乐 3开宝箱 4砸金蛋 5开红包]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        lottery_user_id: {
          type: 'string',
          description: '抽奖人',
          allowEmptyValue: false
        },
        operate_type: {
          type: 'integer',
          format: 'int32',
          description: '操作类型[enum: 0初始化 1启动 2结束]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        prize_name: {
          type: 'string',
          description: '奖品名称',
          allowEmptyValue: false
        },
        prize_type: {
          type: 'integer',
          format: 'int32',
          description:
            '奖项类型[enum: 0特等奖 1一等奖 2二等奖 3三等奖 4锋芒奖 5幸运奖]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        round_name: {
          type: 'string',
          description: '名称',
          allowEmptyValue: false
        },
        round_num: {
          type: 'integer',
          format: 'int32',
          description: '第几轮',
          allowEmptyValue: false
        },
        status: {
          type: 'integer',
          format: 'int32',
          description: '状态[enum: 1未开始 2进行中 3已结束]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        }
      },
      title: 'LotteryRoundVO'
    },
    LotterySettingDTO: {
      type: 'object',
      required: [
        'lottery_name',
        'lottery_total_num',
        'prize_type',
        'receive_end_time',
        'receive_start_time'
      ],
      properties: {
        lottery_name: {
          type: 'string',
          description: '奖项名称',
          allowEmptyValue: false
        },
        lottery_round_count: {
          type: 'integer',
          format: 'int32',
          description: '抽奖次数',
          allowEmptyValue: false
        },
        lottery_setting_id: {
          type: 'integer',
          format: 'int64',
          description: '抽奖设置主键id',
          allowEmptyValue: false
        },
        lottery_total_num: {
          type: 'integer',
          format: 'int32',
          description: '中奖总名额',
          allowEmptyValue: false
        },
        prize_type: {
          type: 'integer',
          format: 'int32',
          description:
            '奖项类型[enum: 0特等奖 1一等奖 2二等奖 3三等奖 4锋芒奖 5幸运奖]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        receive_address: {
          type: 'string',
          description: '领奖地点',
          allowEmptyValue: false
        },
        receive_end_time: {
          type: 'string',
          format: 'date-time',
          description: '抽奖结束时间',
          allowEmptyValue: false
        },
        receive_start_time: {
          type: 'string',
          format: 'date-time',
          description: '抽奖开始时间',
          allowEmptyValue: false
        }
      },
      title: 'LotterySettingDTO'
    },
    LotterySettingDeleteDTO: {
      type: 'object',
      required: ['lottery_setting_id'],
      properties: {
        lottery_setting_id: {
          type: 'integer',
          format: 'int64',
          description: '抽奖设置主键id',
          allowEmptyValue: false
        }
      },
      title: 'LotterySettingDeleteDTO'
    },
    LotterySettingSearchDTO: {
      type: 'object',
      properties: {
        page_index: {
          type: 'integer',
          format: 'int32',
          example: 'int,第几页',
          allowEmptyValue: false
        },
        page_size: {
          type: 'integer',
          format: 'int32',
          example: 'int,每页数量',
          allowEmptyValue: false
        },
        sort_name: {
          type: 'string',
          example: 'string,排序字段名',
          allowEmptyValue: false
        },
        sort_order: {
          type: 'string',
          example: 'string,排序顺序(asc|desc)',
          allowEmptyValue: false
        }
      },
      title: 'LotterySettingSearchDTO'
    },
    LotterySettingVO: {
      type: 'object',
      properties: {
        allow_modify: {
          type: 'integer',
          format: 'int32',
          description: '允许修改(1为允许,0为不允许)',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        lottery_name: {
          type: 'string',
          description: '奖项名称',
          allowEmptyValue: false
        },
        lottery_round_count: {
          type: 'integer',
          format: 'int32',
          description: '抽奖次数',
          allowEmptyValue: false
        },
        lottery_setting_id: {
          type: 'string',
          description: '抽奖设置主键id',
          allowEmptyValue: false
        },
        lottery_total_count: {
          type: 'integer',
          format: 'int32',
          description: '中奖名单(已经中奖总数)',
          allowEmptyValue: false
        },
        lottery_total_num: {
          type: 'integer',
          format: 'int32',
          description: '中奖总名额',
          allowEmptyValue: false
        },
        prize_type: {
          type: 'integer',
          format: 'int32',
          description:
            '奖项类型[enum: 0特等奖 1一等奖 2二等奖 3三等奖 4锋芒奖 5幸运奖]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        receive_address: {
          type: 'string',
          description: '领奖地点',
          allowEmptyValue: false
        },
        receive_end_time: {
          type: 'string',
          format: 'date-time',
          description: '领奖结束时间',
          allowEmptyValue: false
        },
        receive_start_time: {
          type: 'string',
          format: 'date-time',
          description: '领奖开始时间',
          allowEmptyValue: false
        }
      },
      title: 'LotterySettingVO'
    },
    LotteryUserDTO: {
      type: 'object',
      required: [
        'is_verify',
        'lottery_round_id',
        'lottery_user_id',
        'prize_type',
        'user_id'
      ],
      properties: {
        is_verify: {
          type: 'boolean',
          example: false,
          description: '是否确认',
          allowEmptyValue: false
        },
        lottery_round_id: {
          type: 'integer',
          format: 'int64',
          description: '关联某轮中奖id',
          allowEmptyValue: false
        },
        lottery_user_id: {
          type: 'integer',
          format: 'int64',
          description: '中奖用户主键id',
          allowEmptyValue: false
        },
        prize_type: {
          type: 'integer',
          format: 'int32',
          description:
            '奖品类型[enum: 0特等奖 1一等奖 2二等奖 3三等奖 4锋芒奖 5幸运奖]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        user_id: {
          type: 'string',
          description: '用户id',
          allowEmptyValue: false
        }
      },
      title: 'LotteryUserDTO'
    },
    LotteryUserResultVO: {
      type: 'object',
      properties: {
        is_lottery: {
          type: 'boolean',
          example: false,
          description: '是否中奖',
          allowEmptyValue: false
        },
        is_verify: {
          type: 'boolean',
          example: false,
          description: '是否确认',
          allowEmptyValue: false
        },
        lottery_round_id: {
          type: 'string',
          description: '关联某轮中奖id',
          allowEmptyValue: false
        },
        prize_type: {
          type: 'integer',
          format: 'int32',
          description:
            '奖品类型[enum: 0特等奖 1一等奖 2二等奖 3三等奖 4锋芒奖 5幸运奖]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        user_id: {
          type: 'string',
          description: '用户id',
          allowEmptyValue: false
        },
        verify_time: {
          type: 'string',
          format: 'date-time',
          description: '确认时间',
          allowEmptyValue: false
        }
      },
      title: 'LotteryUserResultVO'
    },
    LotteryUserSearchDTO: {
      type: 'object',
      properties: {
        eq_creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        eq_is_verify: {
          type: 'boolean',
          example: false,
          description: '是否确认',
          allowEmptyValue: false
        },
        eq_last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        eq_lottery_round_id: {
          type: 'integer',
          format: 'int64',
          description: '关联某轮中奖id',
          allowEmptyValue: false
        },
        eq_lottery_user_id: {
          type: 'integer',
          format: 'int64',
          description: '中奖用户主键id',
          allowEmptyValue: false
        },
        eq_prize_type: {
          type: 'integer',
          format: 'int32',
          description:
            '奖品类型[enum: 0特等奖 1一等奖 2二等奖 3三等奖 4锋芒奖 5幸运奖]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        eq_user_id: {
          type: 'string',
          description: '用户id',
          allowEmptyValue: false
        },
        gt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        gt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        like_user_id: {
          type: 'string',
          description: '用户id',
          allowEmptyValue: false
        },
        lt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        lt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        page_index: {
          type: 'integer',
          format: 'int32',
          example: 'int,第几页',
          allowEmptyValue: false
        },
        page_size: {
          type: 'integer',
          format: 'int32',
          example: 'int,每页数量',
          allowEmptyValue: false
        },
        sort_name: {
          type: 'string',
          example: 'string,排序字段名',
          allowEmptyValue: false
        },
        sort_order: {
          type: 'string',
          example: 'string,排序顺序(asc|desc)',
          allowEmptyValue: false
        }
      },
      title: 'LotteryUserSearchDTO'
    },
    LotteryUserVO: {
      type: 'object',
      properties: {
        creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        is_cancel: {
          type: 'boolean',
          example: false,
          description: '是否作废',
          allowEmptyValue: false
        },
        is_receive: {
          type: 'boolean',
          example: false,
          description: '是否领取',
          allowEmptyValue: false
        },
        is_verify: {
          type: 'boolean',
          example: false,
          description: '是否确认',
          allowEmptyValue: false
        },
        last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        lottery_round_id: {
          type: 'string',
          description: '关联某轮中奖id',
          allowEmptyValue: false
        },
        lottery_user_id: {
          type: 'string',
          description: '中奖用户主键id',
          allowEmptyValue: false
        },
        prize_type: {
          type: 'integer',
          format: 'int32',
          description:
            '奖品类型[enum: 0特等奖 1一等奖 2二等奖 3三等奖 4锋芒奖 5幸运奖]',
          allowEmptyValue: false,
          minimum: -128,
          maximum: 127
        },
        receive_time: { type: 'string', format: 'date-time' },
        user_id: {
          type: 'string',
          description: '用户id',
          allowEmptyValue: false
        },
        verify_time: {
          type: 'string',
          format: 'date-time',
          description: '确认时间',
          allowEmptyValue: false
        }
      },
      title: 'LotteryUserVO'
    },
    'PagedResult«AmMessageVO»': {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/definitions/AmMessageVO' }
        },
        total_count: { type: 'integer', format: 'int64' }
      },
      title: 'PagedResult«AmMessageVO»'
    },
    'PagedResult«GameRankVO»': {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/definitions/GameRankVO' }
        },
        total_count: { type: 'integer', format: 'int64' }
      },
      title: 'PagedResult«GameRankVO»'
    },
    'PagedResult«LotteryPrizeVO»': {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/definitions/LotteryPrizeVO' }
        },
        total_count: { type: 'integer', format: 'int64' }
      },
      title: 'PagedResult«LotteryPrizeVO»'
    },
    'PagedResult«LotteryRoundVO»': {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/definitions/LotteryRoundVO' }
        },
        total_count: { type: 'integer', format: 'int64' }
      },
      title: 'PagedResult«LotteryRoundVO»'
    },
    'PagedResult«LotterySettingVO»': {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/definitions/LotterySettingVO' }
        },
        total_count: { type: 'integer', format: 'int64' }
      },
      title: 'PagedResult«LotterySettingVO»'
    },
    'PagedResult«LotteryUserVO»': {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/definitions/LotteryUserVO' }
        },
        total_count: { type: 'integer', format: 'int64' }
      },
      title: 'PagedResult«LotteryUserVO»'
    },
    'PagedResult«SignVO»': {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/definitions/SignVO' }
        },
        total_count: { type: 'integer', format: 'int64' }
      },
      title: 'PagedResult«SignVO»'
    },
    SignInResultVO: {
      type: 'object',
      properties: {
        sign_in_result: {
          type: 'string',
          description: '签到结果',
          allowEmptyValue: false
        },
        sign_time: {
          type: 'string',
          format: 'date-time',
          description: '签到时间',
          allowEmptyValue: false
        },
        sign_user_avatar: {
          type: 'string',
          description: '签到用户头像',
          allowEmptyValue: false
        },
        sign_user_id: {
          type: 'string',
          description: '签到用户ID',
          allowEmptyValue: false
        },
        sign_user_name: {
          type: 'string',
          description: '签到用户名称',
          allowEmptyValue: false
        }
      },
      title: 'SignInResultVO'
    },
    SignSearchDTO: {
      type: 'object',
      properties: {
        eq_creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        eq_is_sign: {
          type: 'boolean',
          example: false,
          description: '是否签到',
          allowEmptyValue: false
        },
        eq_last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        eq_sign_id: {
          type: 'integer',
          format: 'int64',
          description: '签到ID',
          allowEmptyValue: false
        },
        eq_sign_setting_id: {
          type: 'integer',
          format: 'int64',
          description: '签到设置ID',
          allowEmptyValue: false
        },
        eq_sign_user_id: {
          type: 'string',
          description: '签到用户ID',
          allowEmptyValue: false
        },
        eq_sign_user_name: {
          type: 'string',
          description: '签到用户名称',
          allowEmptyValue: false
        },
        gt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        gt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        gt_sign_time: {
          type: 'string',
          format: 'date-time',
          description: '签到时间',
          allowEmptyValue: false
        },
        like_sign_user_id: {
          type: 'string',
          description: '签到用户ID',
          allowEmptyValue: false
        },
        like_sign_user_name: {
          type: 'string',
          description: '签到用户名称',
          allowEmptyValue: false
        },
        lt_creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        lt_last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        lt_sign_time: {
          type: 'string',
          format: 'date-time',
          description: '签到时间',
          allowEmptyValue: false
        },
        page_index: {
          type: 'integer',
          format: 'int32',
          example: 'int,第几页',
          allowEmptyValue: false
        },
        page_size: {
          type: 'integer',
          format: 'int32',
          example: 'int,每页数量',
          allowEmptyValue: false
        },
        sort_name: {
          type: 'string',
          example: 'string,排序字段名',
          allowEmptyValue: false
        },
        sort_order: {
          type: 'string',
          example: 'string,排序顺序(asc|desc)',
          allowEmptyValue: false
        }
      },
      title: 'SignSearchDTO'
    },
    SignVO: {
      type: 'object',
      properties: {
        creation_time: {
          type: 'string',
          format: 'date-time',
          description: '创建时间',
          allowEmptyValue: false
        },
        creator_user_id: {
          type: 'string',
          description: '创建人ID',
          allowEmptyValue: false
        },
        department_path: {
          type: 'string',
          description: '部门名称路径',
          allowEmptyValue: false
        },
        is_sign: {
          type: 'boolean',
          example: false,
          description: '是否签到',
          allowEmptyValue: false
        },
        last_modification_time: {
          type: 'string',
          format: 'date-time',
          description: '最后修改时间',
          allowEmptyValue: false
        },
        last_modifier_user_id: {
          type: 'string',
          description: '最后修改人ID',
          allowEmptyValue: false
        },
        sign_id: {
          type: 'string',
          description: '签到ID',
          allowEmptyValue: false
        },
        sign_setting_id: {
          type: 'string',
          description: '签到设置ID',
          allowEmptyValue: false
        },
        sign_time: {
          type: 'string',
          format: 'date-time',
          description: '签到时间',
          allowEmptyValue: false
        },
        sign_user_avatar: {
          type: 'string',
          description: '签到用户头像',
          allowEmptyValue: false
        },
        sign_user_id: {
          type: 'string',
          description: '签到用户ID',
          allowEmptyValue: false
        },
        sign_user_name: {
          type: 'string',
          description: '签到用户名称',
          allowEmptyValue: false
        }
      },
      title: 'SignVO'
    },
    SyncWechatTagMemberResultVO: {
      type: 'object',
      properties: {
        add_result: { type: 'string' },
        del_result: { type: 'string' }
      },
      title: 'SyncWechatTagMemberResultVO'
    },
    用户信息: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          description: '微信头像',
          allowEmptyValue: false
        },
        job_name: {
          type: 'string',
          description: '岗位名',
          allowEmptyValue: false
        },
        user_id: {
          type: 'string',
          description: '用户id(人事)',
          allowEmptyValue: false
        },
        user_name: {
          type: 'string',
          description: '用户名',
          allowEmptyValue: false
        },
        wx_user_id: {
          type: 'string',
          description: '用户id(微信)',
          allowEmptyValue: false
        }
      },
      title: '用户信息'
    }
  }
}
