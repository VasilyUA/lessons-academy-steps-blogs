module.exports = function (param, msg, value) {
  const namespace = param.split('.');
  const root = namespace.shift();

  while (namespace.length) `${root}[${root}]`;
  return {
    param: root,
    msg: msg,
    value: value,
  };
};
