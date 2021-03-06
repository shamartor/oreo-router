import { toDecorator } from './helper/decorate';

function beforeHandlerWrap(type) {
  return function beforeHandler(target, name, descriptor, constructor, decoratorName, middleware) {
    if (name && descriptor) {
      // Decorating target is function
      constructor.middlewareRegister.lPush(name, type, middleware);
    } else {
      // Decorating target is class
      constructor.middlewareRegister.lPush(type, middleware);
    }
  };
}

const UseBefore = toDecorator({
  name: 'UseBefore',
  maxDecorate: Number.MAX_SAFE_INTEGER,
  targetType: 'any',
  beforeHandler: beforeHandlerWrap('before'),
});

const Use = toDecorator({
  name: 'Use',
  maxDecorate: Number.MAX_SAFE_INTEGER,
  targetType: 'any',
  beforeHandler: beforeHandlerWrap('now'),
});

const UseAfter = toDecorator({
  name: 'UseAfter',
  maxDecorate: Number.MAX_SAFE_INTEGER,
  targetType: 'any',
  beforeHandler: beforeHandlerWrap('after'),
});

export {
  UseBefore,
  Use,
  UseAfter,
};
