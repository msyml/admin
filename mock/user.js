export default [
    {
      url: '/api/getUserInfor',
      method: 'get',
      response: () => {
        return {
          code: 0,
          message: 'ok',
          data: {"name":"张三","age":18},
        };
      },
    },
  ];