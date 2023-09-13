import { aggregate, readItems, createItem, updateItem, updateItems, createItems, readItem, deleteItem, deleteItems, readMe, staticToken, uploadFiles } from '@directus/sdk';
export * from '@directus/sdk';
import { useState } from 'react';

function _asyncIterator(iterable) {
  var method,
    async,
    sync,
    retry = 2;
  for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) {
    if (async && null != (method = iterable[async])) return method.call(iterable);
    if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
    async = "@@asyncIterator", sync = "@@iterator";
  }
  throw new TypeError("Object is not async iterable");
}
function AsyncFromSyncIterator(s) {
  function AsyncFromSyncIteratorContinuation(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var done = r.done;
    return Promise.resolve(r.value).then(function (value) {
      return {
        value: value,
        done: done
      };
    });
  }
  return AsyncFromSyncIterator = function (s) {
    this.s = s, this.n = s.next;
  }, AsyncFromSyncIterator.prototype = {
    s: null,
    n: null,
    next: function () {
      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
    },
    return: function (value) {
      var ret = this.s.return;
      return void 0 === ret ? Promise.resolve({
        value: value,
        done: !0
      }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
    },
    throw: function (value) {
      var thr = this.s.return;
      return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
    }
  }, new AsyncFromSyncIterator(s);
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return {
          value: void 0,
          done: !0
        };
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable || "" === iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    throw new TypeError(typeof iterable + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var operators = {
  eq: "_eq",
  ne: "_neq",
  lt: "_lt",
  gt: "_gt",
  lte: "_lte",
  gte: "_gte",
  "in": "_in",
  nin: "_nin",
  contains: "_contains",
  containss: "_icontains",
  ncontains: "_ncontains",
  ncontainss: undefined,
  "null": "_null",
  nnull: "_nnull",
  between: "_between",
  nbetween: "_nbetween",
  startswith: "_starts_with",
  startswiths: undefined,
  nstartswith: "_nstarts_with",
  nstartswiths: undefined,
  endswith: "_ends_with",
  endswiths: undefined,
  nendswith: "_nends_with",
  nendswiths: undefined,
  or: "_or",
  and: "_and"
};
var strToObj = function strToObj(str, val) {
  var i,
    obj = {},
    strarr = str.split(".");
  var x = obj;
  for (i = 0; i < strarr.length - 1; i++) {
    x = x[strarr[i]] = {};
  }
  x[strarr[i]] = val;
  return obj;
};
var generateSort = function generateSort(sort) {
  var _sort = [];
  if (sort) {
    sort.map(function (item) {
      if (item.order) {
        item.order === "desc" ? _sort.push("-" + item.field) : _sort.push("" + item.field);
      }
    });
  }
  return _sort;
};
var generateFilter = function generateFilter(filters) {
  var queryFilters = {};
  var search = "";
  if (filters) {
    queryFilters["_and"] = [];
    filters.map(function (filter) {
      if (filter.operator !== "or" && filter.operator !== "and" && "field" in filter) {
        var field = filter.field,
          value = filter.value;
        if (value) {
          if (field === "search") {
            search = value;
          } else {
            var logicalFilter = generateLogicalFilter(filter);
            logicalFilter && queryFilters["_and"].push(logicalFilter);
          }
        }
      } else {
        var conditionalFilter = generateConditionalFilter(filter);
        conditionalFilter && queryFilters["_and"].push(conditionalFilter);
      }
    });
  }
  return {
    search: search,
    filters: queryFilters
  };
};
//Function to handle logical filters
var generateLogicalFilter = function generateLogicalFilter(item) {
  if (item === undefined) return null;
  var field = item.field,
    operator = item.operator,
    value = item.value;
  var directusOperator = operators[operator];
  var queryField = field + "." + directusOperator;
  var filterObj = strToObj(queryField, value);
  return filterObj;
};
//Function to handle conditional filters
var generateConditionalFilter = function generateConditionalFilter(item) {
  if (item === undefined) return null;
  var operator = item.operator,
    value = item.value;
  var directusOperator = operators[operator];
  var conditionalFilters = {};
  conditionalFilters[directusOperator] = [];
  value.map(function (item) {
    if ("field" in item) {
      var logicalFilter = generateLogicalFilter(item);
      logicalFilter && conditionalFilters[directusOperator].push(logicalFilter);
    } else {
      var conditionalFilter = generateConditionalFilter(item);
      conditionalFilter && conditionalFilters[directusOperator].push(conditionalFilter);
    }
  });
  return conditionalFilters;
};
var dataProvider = function dataProvider(directusClient) {
  return {
    getList: function () {
      var _getList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
        var resource, pagination, filters, sorters, meta, current, pageSize, _sort, paramsFilters, status, fields, search, params, sortString, _total$0$countDistinc, _total$, response, aggregateField, total;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              resource = _ref.resource, pagination = _ref.pagination, filters = _ref.filters, sorters = _ref.sorters, meta = _ref.meta;
              current = (pagination == null ? void 0 : pagination.current) || 1;
              pageSize = (pagination == null ? void 0 : pagination.pageSize) || 50;
              _sort = generateSort(sorters);
              paramsFilters = generateFilter(filters);
              status = {
                status: {
                  _neq: "archived"
                }
              }; //Assign copy of fields
              fields = meta != null && meta.fields ? [].concat(meta.fields) : ["*"]; //Delete fields from meta
              meta == null || delete meta.fields;
              if ((meta == null ? void 0 : meta.archived) === true) {
                status = {};
              }
              search = {};
              if (paramsFilters.search) {
                search = {
                  search: paramsFilters.search
                };
              }
              params = _extends({}, search, {
                filter: _extends({}, paramsFilters.filters, status),
                meta: "*",
                page: current,
                limit: pageSize
              }, meta);
              sortString = null;
              if (sorters && sorters.length > 0) {
                sortString = _sort.join(",");
              }
              if (sortString) {
                params["sort"] = sortString;
              }
              _context.prev = 15;
              _context.next = 18;
              return directusClient.request(readItems(resource, _extends({}, params, {
                fields: fields
              })));
            case 18:
              response = _context.sent;
              delete params["page"];
              aggregateField = meta != null && meta.aggregateField ? meta.aggregateField : "id";
              _context.next = 23;
              return directusClient.request(aggregate(resource, {
                query: params,
                aggregate: {
                  countDistinct: aggregateField
                }
              }));
            case 23:
              total = _context.sent;
              return _context.abrupt("return", {
                data: response,
                total: (_total$0$countDistinc = (_total$ = total[0]) == null || (_total$ = _total$.countDistinct) == null ? void 0 : _total$.id) != null ? _total$0$countDistinc : 0
              });
            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](15);
              console.log(_context.t0);
              throw new Error(_context.t0.errors && _context.t0.errors[0] && _context.t0.errors[0].message);
            case 31:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[15, 27]]);
      }));
      function getList(_x) {
        return _getList.apply(this, arguments);
      }
      return getList;
    }(),
    getMany: function () {
      var _getMany = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
        var resource, ids, meta, fields, params, _total$0$countDistinc2, _total$2, response, total;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              resource = _ref2.resource, ids = _ref2.ids, meta = _ref2.meta;
              fields = meta != null && meta.fields ? [].concat(meta.fields) : ["*"]; //Delete fields from meta
              meta == null || delete meta.fields;
              params = _extends({
                filter: {
                  id: {
                    _in: ids
                  }
                }
              }, meta);
              _context2.prev = 4;
              _context2.next = 7;
              return directusClient.request(readItems(resource, _extends({}, params, {
                fields: fields
              })));
            case 7:
              response = _context2.sent;
              delete params["page"];
              _context2.next = 11;
              return directusClient.request(aggregate(resource, {
                query: params,
                aggregate: {
                  countDistinct: "id"
                }
              }));
            case 11:
              total = _context2.sent;
              return _context2.abrupt("return", {
                data: response,
                total: (_total$0$countDistinc2 = (_total$2 = total[0]) == null || (_total$2 = _total$2.countDistinct) == null ? void 0 : _total$2.id) != null ? _total$0$countDistinc2 : 0
              });
            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](4);
              console.log(_context2.t0);
              throw new Error(_context2.t0.errors && _context2.t0.errors[0] && _context2.t0.errors[0].message);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 15]]);
      }));
      function getMany(_x2) {
        return _getMany.apply(this, arguments);
      }
      return getMany;
    }(),
    create: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref3) {
        var resource, variables, meta, params, response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              resource = _ref3.resource, variables = _ref3.variables, meta = _ref3.meta;
              params = _extends({}, variables, meta);
              _context3.prev = 2;
              _context3.next = 5;
              return directusClient.request(createItem(resource, params));
            case 5:
              response = _context3.sent;
              return _context3.abrupt("return", {
                data: response
              });
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              console.log(_context3.t0);
              throw new Error(_context3.t0.errors && _context3.t0.errors[0] && _context3.t0.errors[0].message);
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[2, 9]]);
      }));
      function create(_x3) {
        return _create.apply(this, arguments);
      }
      return create;
    }(),
    update: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref4) {
        var resource, id, variables, meta, params, response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              resource = _ref4.resource, id = _ref4.id, variables = _ref4.variables, meta = _ref4.meta;
              params = _extends({}, variables, meta);
              _context4.prev = 2;
              _context4.next = 5;
              return directusClient.request(updateItem(resource, id, params));
            case 5:
              response = _context4.sent;
              return _context4.abrupt("return", {
                data: response
              });
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              console.log(_context4.t0);
              throw new Error(_context4.t0.errors && _context4.t0.errors[0] && _context4.t0.errors[0].message);
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[2, 9]]);
      }));
      function update(_x4) {
        return _update.apply(this, arguments);
      }
      return update;
    }(),
    updateMany: function () {
      var _updateMany = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref5) {
        var resource, ids, variables, meta, idsFormatted, params, response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              resource = _ref5.resource, ids = _ref5.ids, variables = _ref5.variables, meta = _ref5.meta;
              idsFormatted = ids;
              params = _extends({}, variables, meta);
              _context5.prev = 3;
              _context5.next = 6;
              return directusClient.request(updateItems(resource, idsFormatted, params));
            case 6:
              response = _context5.sent;
              return _context5.abrupt("return", {
                data: response
              });
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](3);
              console.log(_context5.t0);
              throw new Error(_context5.t0.errors && _context5.t0.errors[0] && _context5.t0.errors[0].message);
            case 14:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[3, 10]]);
      }));
      function updateMany(_x5) {
        return _updateMany.apply(this, arguments);
      }
      return updateMany;
    }(),
    createMany: function () {
      var _createMany = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref6) {
        var resource, variables, meta, params, response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              resource = _ref6.resource, variables = _ref6.variables, meta = _ref6.meta;
              params = _extends({}, variables, meta);
              _context6.prev = 2;
              _context6.next = 5;
              return directusClient.request(createItems(resource, params));
            case 5:
              response = _context6.sent;
              return _context6.abrupt("return", {
                data: response
              });
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](2);
              console.log(_context6.t0);
              throw new Error(_context6.t0.errors && _context6.t0.errors[0] && _context6.t0.errors[0].message);
            case 13:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[2, 9]]);
      }));
      function createMany(_x6) {
        return _createMany.apply(this, arguments);
      }
      return createMany;
    }(),
    getOne: function () {
      var _getOne = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref7) {
        var resource, id, meta, params, response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              resource = _ref7.resource, id = _ref7.id, meta = _ref7.meta;
              params = _extends({}, meta);
              _context7.prev = 2;
              _context7.next = 5;
              return directusClient.request(readItem(resource, id, params));
            case 5:
              response = _context7.sent;
              return _context7.abrupt("return", {
                data: response
              });
            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](2);
              console.log(_context7.t0);
              throw new Error(_context7.t0.errors && _context7.t0.errors[0] && _context7.t0.errors[0].message);
            case 13:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[2, 9]]);
      }));
      function getOne(_x7) {
        return _getOne.apply(this, arguments);
      }
      return getOne;
    }(),
    deleteOne: function () {
      var _deleteOne = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref8) {
        var resource, id, meta, params, response, _response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              resource = _ref8.resource, id = _ref8.id, meta = _ref8.meta;
              _context8.prev = 1;
              if (!(meta && meta.deleteType === "archive")) {
                _context8.next = 10;
                break;
              }
              params = _extends({
                status: "archived"
              }, meta);
              _context8.next = 6;
              return directusClient.request(updateItem(resource, id, params));
            case 6:
              response = _context8.sent;
              return _context8.abrupt("return", {
                data: response
              });
            case 10:
              _context8.next = 12;
              return directusClient.request(deleteItem(resource, id));
            case 12:
              _response = _context8.sent;
              return _context8.abrupt("return", {
                data: _response
              });
            case 14:
              _context8.next = 20;
              break;
            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](1);
              console.log(_context8.t0);
              throw new Error(_context8.t0.errors && _context8.t0.errors[0] && _context8.t0.errors[0].message);
            case 20:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[1, 16]]);
      }));
      function deleteOne(_x8) {
        return _deleteOne.apply(this, arguments);
      }
      return deleteOne;
    }(),
    deleteMany: function () {
      var _deleteMany = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(_ref9) {
        var resource, ids, meta, idsFormatted, params, response, _response2;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              resource = _ref9.resource, ids = _ref9.ids, meta = _ref9.meta;
              _context9.prev = 1;
              idsFormatted = ids;
              if (!(meta && meta.deleteType === "archive")) {
                _context9.next = 11;
                break;
              }
              params = _extends({
                status: "archived"
              }, meta);
              _context9.next = 7;
              return directusClient.request(updateItems(resource, idsFormatted, params));
            case 7:
              response = _context9.sent;
              return _context9.abrupt("return", {
                data: response
              });
            case 11:
              _context9.next = 13;
              return directusClient.request(deleteItems(resource, idsFormatted));
            case 13:
              _response2 = _context9.sent;
              return _context9.abrupt("return", {
                data: _response2.data
              });
            case 15:
              _context9.next = 21;
              break;
            case 17:
              _context9.prev = 17;
              _context9.t0 = _context9["catch"](1);
              console.log(_context9.t0);
              throw new Error(_context9.t0.errors && _context9.t0.errors[0] && _context9.t0.errors[0].message);
            case 21:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[1, 17]]);
      }));
      function deleteMany(_x9) {
        return _deleteMany.apply(this, arguments);
      }
      return deleteMany;
    }(),
    getApiUrl: function getApiUrl() {
      var url = directusClient.url;
      return url;
    },
    custom: function () {
      var _custom = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref10) {
        var url, method, payload, query, headers, response;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              url = _ref10.url, method = _ref10.method, payload = _ref10.payload, query = _ref10.query, headers = _ref10.headers;
              _context10.t0 = method;
              _context10.next = _context10.t0 === "put" ? 4 : _context10.t0 === "post" ? 8 : _context10.t0 === "patch" ? 12 : _context10.t0 === "delete" ? 16 : 20;
              break;
            case 4:
              _context10.next = 6;
              return directusClient.request(function () {
                return {
                  path: url,
                  method: "PUT",
                  body: JSON.stringify(payload),
                  params: query
                };
              });
            case 6:
              response = _context10.sent;
              return _context10.abrupt("break", 24);
            case 8:
              _context10.next = 10;
              return directusClient.request(function () {
                return {
                  path: url,
                  method: "POST",
                  body: JSON.stringify(payload),
                  params: query
                };
              });
            case 10:
              response = _context10.sent;
              return _context10.abrupt("break", 24);
            case 12:
              _context10.next = 14;
              return directusClient.request(function () {
                return {
                  path: url,
                  method: "PATCH",
                  body: JSON.stringify(payload),
                  params: query
                };
              });
            case 14:
              response = _context10.sent;
              return _context10.abrupt("break", 24);
            case 16:
              _context10.next = 18;
              return directusClient.request(function () {
                return {
                  path: url,
                  method: "DELETE",
                  params: query
                };
              });
            case 18:
              response = _context10.sent;
              return _context10.abrupt("break", 24);
            case 20:
              _context10.next = 22;
              return directusClient.request(function () {
                return {
                  path: url,
                  method: "GET",
                  params: query
                };
              });
            case 22:
              response = _context10.sent;
              return _context10.abrupt("break", 24);
            case 24:
              return _context10.abrupt("return", _extends({}, response, {
                data: response.data
              }));
            case 25:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function custom(_x10) {
        return _custom.apply(this, arguments);
      }
      return custom;
    }()
  };
};

var eventsMap = {
  created: "create",
  updated: "update",
  deleted: "delete"
};
var liveProvider = function liveProvider(directusClient, options) {
  var openConnections = {};
  return {
    subscribe: function subscribe(_ref) {
      var channel = _ref.channel,
        types = _ref.types,
        params = _ref.params,
        callback = _ref.callback;
      var connectionId = channel ? channel : Date.now() + "_" + Math.random().toString(36).substring(2, 15);
      var options = {
        uid: connectionId
      };
      if (params != null && params.query) {
        options = _extends({}, options, {
          query: params.query
        });
      }
      if ((types == null ? void 0 : types.length) > 1) {
        throw new Error("Directus does not support multiple event types in a single subscription. Please create multiple subscriptions for each event type or do not pass any event type to subscribe to all events.");
      }
      if (types != null && types.length && eventsMap[types[0]]) {
        options = _extends({}, options, {
          event: eventsMap[types[0]]
        });
      }
      if (params != null && params.resource) {
        _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _yield$directusClient, subscription, unsubscribe, asyncGenerator;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return directusClient.subscribe(params == null ? void 0 : params.resource, options);
              case 2:
                _yield$directusClient = _context2.sent;
                subscription = _yield$directusClient.subscription;
                unsubscribe = _yield$directusClient.unsubscribe;
                asyncGenerator = /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(subscription) {
                    var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          _iteratorAbruptCompletion = false;
                          _didIteratorError = false;
                          _context.prev = 2;
                          _iterator = _asyncIterator(subscription);
                        case 4:
                          _context.next = 6;
                          return _iterator.next();
                        case 6:
                          if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
                            _context.next = 12;
                            break;
                          }
                          item = _step.value;
                          // this loop wil await new subscription events
                          callback(item);
                        case 9:
                          _iteratorAbruptCompletion = false;
                          _context.next = 4;
                          break;
                        case 12:
                          _context.next = 18;
                          break;
                        case 14:
                          _context.prev = 14;
                          _context.t0 = _context["catch"](2);
                          _didIteratorError = true;
                          _iteratorError = _context.t0;
                        case 18:
                          _context.prev = 18;
                          _context.prev = 19;
                          if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                            _context.next = 23;
                            break;
                          }
                          _context.next = 23;
                          return _iterator["return"]();
                        case 23:
                          _context.prev = 23;
                          if (!_didIteratorError) {
                            _context.next = 26;
                            break;
                          }
                          throw _iteratorError;
                        case 26:
                          return _context.finish(23);
                        case 27:
                          return _context.finish(18);
                        case 28:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee, null, [[2, 14, 18, 28], [19,, 23, 27]]);
                  }));
                  return function asyncGenerator(_x) {
                    return _ref3.apply(this, arguments);
                  };
                }();
                asyncGenerator(subscription); // create a generator
                openConnections[connectionId] = unsubscribe;
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
        return connectionId;
      } else throw new Error("resource is required");
    },
    unsubscribe: function () {
      var _unsubscribe2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_unsubscribe) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (_unsubscribe && openConnections[_unsubscribe]) {
                openConnections[_unsubscribe]();
                delete openConnections[_unsubscribe];
              }
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function unsubscribe(_x2) {
        return _unsubscribe2.apply(this, arguments);
      }
      return unsubscribe;
    }()
  };
};

var AuthHelper = function AuthHelper(directusClient) {
  return {
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(identifier, password) {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return directusClient.login(identifier, password, {
                mode: "json"
              });
            case 2:
              response = _context.sent;
              return _context.abrupt("return", response);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }(),
    me: function () {
      var _me = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(metaData) {
        var me;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return directusClient.request(readMe(metaData));
            case 2:
              me = _context2.sent;
              return _context2.abrupt("return", me);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function me(_x3) {
        return _me.apply(this, arguments);
      }
      return me;
    }(),
    setToken: function () {
      var _setToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(token) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return directusClient["with"](staticToken(token));
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function setToken(_x4) {
        return _setToken.apply(this, arguments);
      }
      return setToken;
    }(),
    getToken: function getToken() {
      return directusClient.getToken();
    },
    logout: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return directusClient.logout();
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  };
};

var getValueProps = function getValueProps(valueProps) {
  var _data$fileList;
  var data = valueProps.data,
    imageUrl = valueProps.imageUrl,
    getFileUrl = valueProps.getFileUrl,
    getFileTitle = valueProps.getFileTitle;
  if (!data) {
    return {
      fileList: []
    };
  }
  var files = {
    file: data.file,
    fileList: (_data$fileList = data.fileList) != null ? _data$fileList : (Array.isArray(data) ? data : [data]).map(function (item) {
      var file = {
        name: getFileTitle ? getFileTitle(item) : item.title,
        url: getFileUrl ? getFileUrl(item) : imageUrl + "assets/" + item.id,
        percent: item.percent,
        size: item.filesize,
        status: 'done',
        type: item.type,
        uid: item.id
      };
      return file;
    })
  };
  return files;
};
var useDirectusUpload = function useDirectusUpload(mediaConfigList, directusClient) {
  var _useState = useState([]),
    uploadedFileIds = _useState[0];
  var _useState2 = useState([]),
    fileList = _useState2[0],
    setFileList = _useState2[1];
  var _beforeUpload = function beforeUpload(_file, files, maxCount) {
    var totalFiles = fileList.length;
    var filesCount = files.length;
    if (totalFiles + filesCount > maxCount) {
      var excessFileCount = totalFiles + filesCount - maxCount;
      // convert negative
      var deleteItemCount = excessFileCount - excessFileCount * 2;
      files.splice(deleteItemCount);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFileList([].concat(fileList, files));
    return true;
  };
  var customRequest = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var file, onError, onSuccess, form, data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            file = _ref.file, onError = _ref.onError, onSuccess = _ref.onSuccess;
            _context.prev = 1;
            form = new FormData();
            form.append("file", file);
            _context.next = 6;
            return directusClient.request(uploadFiles(form));
          case 6:
            data = _context.sent;
            onSuccess == null ? void 0 : onSuccess({
              data: data
            }, new XMLHttpRequest());
            _context.next = 13;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            onError == null ? void 0 : onError(new Error("Upload Error"));
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 10]]);
    }));
    return function customRequest(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var getUploadProps = function getUploadProps(fieldName) {
    var mediaConfig = mediaConfigList.filter(function (config) {
      return config.name === fieldName;
    })[0];
    return {
      uploadedFileIds: uploadedFileIds,
      beforeUpload: function beforeUpload(_file, files) {
        return _beforeUpload(_file, files, mediaConfig.maxCount);
      },
      fileList: fileList,
      maxCount: mediaConfig.maxCount,
      customRequest: customRequest
    };
  };
  return getUploadProps;
};
var mediaUploadMapper = function mediaUploadMapper(params, mediaConfigList) {
  var _loop = function _loop() {
    var item = _Object$keys[_i];
    if (params[item]) {
      var param = params[item].fileList;
      var isMediaField = Array.isArray(param);
      if (isMediaField) {
        var mediaConfig = mediaConfigList.filter(function (config) {
          return config.name === item;
        })[0];
        var ids = [];
        for (var _i2 = 0, _Object$keys2 = Object.keys(param); _i2 < _Object$keys2.length; _i2++) {
          var key = _Object$keys2[_i2];
          if (param[key].response) {
            if (mediaConfig.normalize) {
              ids.push(mediaConfig.normalize(param[key].response.data.id));
            } else {
              ids.push(param[key].response.data.id);
            }
          } else {
            ids.push(param[key].uid);
          }
        }
        if (mediaConfig.multiple) {
          params[item] = ids;
        } else {
          params[item] = ids[0] ? ids[0] : null;
        }
      }
    }
  };
  for (var _i = 0, _Object$keys = Object.keys(params); _i < _Object$keys.length; _i++) {
    _loop();
  }
  return params;
};

export { AuthHelper, dataProvider, getValueProps, liveProvider, mediaUploadMapper, useDirectusUpload };
//# sourceMappingURL=refine-directus.esm.js.map
