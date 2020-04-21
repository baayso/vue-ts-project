import Mock from 'mockjs';

type MessageType = string | number;

const success = (msg: MessageType = '', data?: any) => {
  // 这里定义一个成功返回的统一方法，返回我们在axios封装时指定的三个字段
  return {
    code: 0,
    msg,
    data,
  };
};

const error = (code: number, msg: MessageType = '', data?: any) => {
  // 再定义一个返回错误状态的方法，一个必传参数是code，即错误码
  return {
    code,
    msg,
    data,
  };
};

interface PostRequestInterface {
  body: string;
  type: 'POST';
  url: string;
}

Mock.mock(/\/api\/user\/login/, loginRes);

function loginRes(req: PostRequestInterface) {
  const {username, password} = JSON.parse(req.body);

  if (username === 'baayso' && password === 'baayso') {
    return success('登录成功');
  } else {
    return error(1001, '用户名或密码错误');
  }
}
