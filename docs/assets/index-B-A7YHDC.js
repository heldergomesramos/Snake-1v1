function rf(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i &&
            Object.defineProperty(
              e,
              o,
              i.get ? i : { enumerable: !0, get: () => r[o] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const s of i.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function of(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Cc = { exports: {} },
  ci = {},
  Ec = { exports: {} },
  V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qr = Symbol.for("react.element"),
  sf = Symbol.for("react.portal"),
  lf = Symbol.for("react.fragment"),
  af = Symbol.for("react.strict_mode"),
  cf = Symbol.for("react.profiler"),
  uf = Symbol.for("react.provider"),
  df = Symbol.for("react.context"),
  ff = Symbol.for("react.forward_ref"),
  hf = Symbol.for("react.suspense"),
  pf = Symbol.for("react.memo"),
  gf = Symbol.for("react.lazy"),
  Zl = Symbol.iterator;
function mf(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Zl && e[Zl]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var xc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Nc = Object.assign,
  Ic = {};
function rr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ic),
    (this.updater = n || xc);
}
rr.prototype.isReactComponent = {};
rr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
rr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Bc() {}
Bc.prototype = rr.prototype;
function Zs(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ic),
    (this.updater = n || xc);
}
var $s = (Zs.prototype = new Bc());
$s.constructor = Zs;
Nc($s, rr.prototype);
$s.isPureReactComponent = !0;
var $l = Array.isArray,
  Rc = Object.prototype.hasOwnProperty,
  el = { current: null },
  Pc = { key: !0, ref: !0, __self: !0, __source: !0 };
function _c(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      Rc.call(t, r) && !Pc.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    o.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: qr,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: el.current,
  };
}
function Af(e, t) {
  return {
    $$typeof: qr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function tl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === qr;
}
function yf(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var ea = /\/+/g;
function Ii(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? yf("" + e.key)
    : t.toString(36);
}
function Co(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (i) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case qr:
          case sf:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (o = o(s)),
      (e = r === "" ? "." + Ii(s, 0) : r),
      $l(o)
        ? ((n = ""),
          e != null && (n = e.replace(ea, "$&/") + "/"),
          Co(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (tl(o) &&
            (o = Af(
              o,
              n +
                (!o.key || (s && s.key === o.key)
                  ? ""
                  : ("" + o.key).replace(ea, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), $l(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var a = r + Ii(i, l);
      s += Co(i, t, n, a, o);
    }
  else if (((a = mf(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(i = e.next()).done; )
      (i = i.value), (a = r + Ii(i, l++)), (s += Co(i, t, n, a, o));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return s;
}
function oo(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Co(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function vf(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var je = { current: null },
  Eo = { transition: null },
  wf = {
    ReactCurrentDispatcher: je,
    ReactCurrentBatchConfig: Eo,
    ReactCurrentOwner: el,
  };
function Tc() {
  throw Error("act(...) is not supported in production builds of React.");
}
V.Children = {
  map: oo,
  forEach: function (e, t, n) {
    oo(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      oo(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      oo(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!tl(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
V.Component = rr;
V.Fragment = lf;
V.Profiler = cf;
V.PureComponent = Zs;
V.StrictMode = af;
V.Suspense = hf;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wf;
V.act = Tc;
V.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Nc({}, e.props),
    o = e.key,
    i = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (s = el.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      Rc.call(t, a) &&
        !Pc.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: qr, type: e.type, key: o, ref: i, props: r, _owner: s };
};
V.createContext = function (e) {
  return (
    (e = {
      $$typeof: df,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: uf, _context: e }),
    (e.Consumer = e)
  );
};
V.createElement = _c;
V.createFactory = function (e) {
  var t = _c.bind(null, e);
  return (t.type = e), t;
};
V.createRef = function () {
  return { current: null };
};
V.forwardRef = function (e) {
  return { $$typeof: ff, render: e };
};
V.isValidElement = tl;
V.lazy = function (e) {
  return { $$typeof: gf, _payload: { _status: -1, _result: e }, _init: vf };
};
V.memo = function (e, t) {
  return { $$typeof: pf, type: e, compare: t === void 0 ? null : t };
};
V.startTransition = function (e) {
  var t = Eo.transition;
  Eo.transition = {};
  try {
    e();
  } finally {
    Eo.transition = t;
  }
};
V.unstable_act = Tc;
V.useCallback = function (e, t) {
  return je.current.useCallback(e, t);
};
V.useContext = function (e) {
  return je.current.useContext(e);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (e) {
  return je.current.useDeferredValue(e);
};
V.useEffect = function (e, t) {
  return je.current.useEffect(e, t);
};
V.useId = function () {
  return je.current.useId();
};
V.useImperativeHandle = function (e, t, n) {
  return je.current.useImperativeHandle(e, t, n);
};
V.useInsertionEffect = function (e, t) {
  return je.current.useInsertionEffect(e, t);
};
V.useLayoutEffect = function (e, t) {
  return je.current.useLayoutEffect(e, t);
};
V.useMemo = function (e, t) {
  return je.current.useMemo(e, t);
};
V.useReducer = function (e, t, n) {
  return je.current.useReducer(e, t, n);
};
V.useRef = function (e) {
  return je.current.useRef(e);
};
V.useState = function (e) {
  return je.current.useState(e);
};
V.useSyncExternalStore = function (e, t, n) {
  return je.current.useSyncExternalStore(e, t, n);
};
V.useTransition = function () {
  return je.current.useTransition();
};
V.version = "18.3.1";
Ec.exports = V;
var A = Ec.exports;
const Sf = of(A),
  kf = rf({ __proto__: null, default: Sf }, [A]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cf = A,
  Ef = Symbol.for("react.element"),
  xf = Symbol.for("react.fragment"),
  Nf = Object.prototype.hasOwnProperty,
  If = Cf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Bf = { key: !0, ref: !0, __self: !0, __source: !0 };
function jc(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) Nf.call(t, r) && !Bf.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: Ef,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: If.current,
  };
}
ci.Fragment = xf;
ci.jsx = jc;
ci.jsxs = jc;
Cc.exports = ci;
var c = Cc.exports,
  Dc = { exports: {} },
  Ye = {},
  Mc = { exports: {} },
  bc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(P, U) {
    var Q = P.length;
    P.push(U);
    e: for (; 0 < Q; ) {
      var Z = (Q - 1) >>> 1,
        ae = P[Z];
      if (0 < o(ae, U)) (P[Z] = U), (P[Q] = ae), (Q = Z);
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var U = P[0],
      Q = P.pop();
    if (Q !== U) {
      P[0] = Q;
      e: for (var Z = 0, ae = P.length, In = ae >>> 1; Z < In; ) {
        var vt = 2 * (Z + 1) - 1,
          _t = P[vt],
          ft = vt + 1,
          L = P[ft];
        if (0 > o(_t, Q))
          ft < ae && 0 > o(L, _t)
            ? ((P[Z] = L), (P[ft] = Q), (Z = ft))
            : ((P[Z] = _t), (P[vt] = Q), (Z = vt));
        else if (ft < ae && 0 > o(L, Q)) (P[Z] = L), (P[ft] = Q), (Z = ft);
        else break e;
      }
    }
    return U;
  }
  function o(P, U) {
    var Q = P.sortIndex - U.sortIndex;
    return Q !== 0 ? Q : P.id - U.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    u = [],
    f = 1,
    h = null,
    m = 3,
    v = !1,
    k = !1,
    C = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(P) {
    for (var U = n(u); U !== null; ) {
      if (U.callback === null) r(u);
      else if (U.startTime <= P)
        r(u), (U.sortIndex = U.expirationTime), t(a, U);
      else break;
      U = n(u);
    }
  }
  function y(P) {
    if (((C = !1), g(P), !k))
      if (n(a) !== null) (k = !0), yt(I);
      else {
        var U = n(u);
        U !== null && ln(y, U.startTime - P);
      }
  }
  function I(P, U) {
    (k = !1), C && ((C = !1), p(D), (D = -1)), (v = !0);
    var Q = m;
    try {
      for (
        g(U), h = n(a);
        h !== null && (!(h.expirationTime > U) || (P && !xe()));

      ) {
        var Z = h.callback;
        if (typeof Z == "function") {
          (h.callback = null), (m = h.priorityLevel);
          var ae = Z(h.expirationTime <= U);
          (U = e.unstable_now()),
            typeof ae == "function" ? (h.callback = ae) : h === n(a) && r(a),
            g(U);
        } else r(a);
        h = n(a);
      }
      if (h !== null) var In = !0;
      else {
        var vt = n(u);
        vt !== null && ln(y, vt.startTime - U), (In = !1);
      }
      return In;
    } finally {
      (h = null), (m = Q), (v = !1);
    }
  }
  var _ = !1,
    j = null,
    D = -1,
    q = 5,
    z = -1;
  function xe() {
    return !(e.unstable_now() - z < q);
  }
  function nt() {
    if (j !== null) {
      var P = e.unstable_now();
      z = P;
      var U = !0;
      try {
        U = j(!0, P);
      } finally {
        U ? H() : ((_ = !1), (j = null));
      }
    } else _ = !1;
  }
  var H;
  if (typeof d == "function")
    H = function () {
      d(nt);
    };
  else if (typeof MessageChannel < "u") {
    var ve = new MessageChannel(),
      sn = ve.port2;
    (ve.port1.onmessage = nt),
      (H = function () {
        sn.postMessage(null);
      });
  } else
    H = function () {
      x(nt, 0);
    };
  function yt(P) {
    (j = P), _ || ((_ = !0), H());
  }
  function ln(P, U) {
    D = x(function () {
      P(e.unstable_now());
    }, U);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (P) {
      P.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      k || v || ((k = !0), yt(I));
    }),
    (e.unstable_forceFrameRate = function (P) {
      0 > P || 125 < P
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (q = 0 < P ? Math.floor(1e3 / P) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (P) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = m;
      }
      var Q = m;
      m = U;
      try {
        return P();
      } finally {
        m = Q;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (P, U) {
      switch (P) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          P = 3;
      }
      var Q = m;
      m = P;
      try {
        return U();
      } finally {
        m = Q;
      }
    }),
    (e.unstable_scheduleCallback = function (P, U, Q) {
      var Z = e.unstable_now();
      switch (
        (typeof Q == "object" && Q !== null
          ? ((Q = Q.delay), (Q = typeof Q == "number" && 0 < Q ? Z + Q : Z))
          : (Q = Z),
        P)
      ) {
        case 1:
          var ae = -1;
          break;
        case 2:
          ae = 250;
          break;
        case 5:
          ae = 1073741823;
          break;
        case 4:
          ae = 1e4;
          break;
        default:
          ae = 5e3;
      }
      return (
        (ae = Q + ae),
        (P = {
          id: f++,
          callback: U,
          priorityLevel: P,
          startTime: Q,
          expirationTime: ae,
          sortIndex: -1,
        }),
        Q > Z
          ? ((P.sortIndex = Q),
            t(u, P),
            n(a) === null &&
              P === n(u) &&
              (C ? (p(D), (D = -1)) : (C = !0), ln(y, Q - Z)))
          : ((P.sortIndex = ae), t(a, P), k || v || ((k = !0), yt(I))),
        P
      );
    }),
    (e.unstable_shouldYield = xe),
    (e.unstable_wrapCallback = function (P) {
      var U = m;
      return function () {
        var Q = m;
        m = U;
        try {
          return P.apply(this, arguments);
        } finally {
          m = Q;
        }
      };
    });
})(bc);
Mc.exports = bc;
var Rf = Mc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pf = A,
  Je = Rf;
function E(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Uc = new Set(),
  Pr = {};
function Cn(e, t) {
  Kn(e, t), Kn(e + "Capture", t);
}
function Kn(e, t) {
  for (Pr[e] = t, e = 0; e < t.length; e++) Uc.add(t[e]);
}
var xt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ts = Object.prototype.hasOwnProperty,
  _f =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ta = {},
  na = {};
function Tf(e) {
  return ts.call(na, e)
    ? !0
    : ts.call(ta, e)
    ? !1
    : _f.test(e)
    ? (na[e] = !0)
    : ((ta[e] = !0), !1);
}
function jf(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Df(e, t, n, r) {
  if (t === null || typeof t > "u" || jf(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function De(e, t, n, r, o, i, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = s);
}
var Ee = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Ee[e] = new De(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Ee[t] = new De(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Ee[e] = new De(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Ee[e] = new De(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Ee[e] = new De(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Ee[e] = new De(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Ee[e] = new De(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Ee[e] = new De(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Ee[e] = new De(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var nl = /[\-:]([a-z])/g;
function rl(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(nl, rl);
    Ee[t] = new De(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(nl, rl);
    Ee[t] = new De(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(nl, rl);
  Ee[t] = new De(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Ee[e] = new De(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ee.xlinkHref = new De(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Ee[e] = new De(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ol(e, t, n, r) {
  var o = Ee.hasOwnProperty(t) ? Ee[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Df(t, n, o, r) && (n = null),
    r || o === null
      ? Tf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
      ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
      : ((t = o.attributeName),
        (r = o.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((o = o.type),
            (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Rt = Pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  io = Symbol.for("react.element"),
  Pn = Symbol.for("react.portal"),
  _n = Symbol.for("react.fragment"),
  il = Symbol.for("react.strict_mode"),
  ns = Symbol.for("react.profiler"),
  Oc = Symbol.for("react.provider"),
  Lc = Symbol.for("react.context"),
  sl = Symbol.for("react.forward_ref"),
  rs = Symbol.for("react.suspense"),
  os = Symbol.for("react.suspense_list"),
  ll = Symbol.for("react.memo"),
  Mt = Symbol.for("react.lazy"),
  Qc = Symbol.for("react.offscreen"),
  ra = Symbol.iterator;
function ar(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ra && e[ra]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var le = Object.assign,
  Bi;
function mr(e) {
  if (Bi === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Bi = (t && t[1]) || "";
    }
  return (
    `
` +
    Bi +
    e
  );
}
var Ri = !1;
function Pi(e, t) {
  if (!e || Ri) return "";
  Ri = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          s = o.length - 1,
          l = i.length - 1;
        1 <= s && 0 <= l && o[s] !== i[l];

      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (o[s] !== i[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || o[s] !== i[l])) {
                var a =
                  `
` + o[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    (Ri = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? mr(e) : "";
}
function Mf(e) {
  switch (e.tag) {
    case 5:
      return mr(e.type);
    case 16:
      return mr("Lazy");
    case 13:
      return mr("Suspense");
    case 19:
      return mr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Pi(e.type, !1)), e;
    case 11:
      return (e = Pi(e.type.render, !1)), e;
    case 1:
      return (e = Pi(e.type, !0)), e;
    default:
      return "";
  }
}
function is(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case _n:
      return "Fragment";
    case Pn:
      return "Portal";
    case ns:
      return "Profiler";
    case il:
      return "StrictMode";
    case rs:
      return "Suspense";
    case os:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Lc:
        return (e.displayName || "Context") + ".Consumer";
      case Oc:
        return (e._context.displayName || "Context") + ".Provider";
      case sl:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ll:
        return (
          (t = e.displayName || null), t !== null ? t : is(e.type) || "Memo"
        );
      case Mt:
        (t = e._payload), (e = e._init);
        try {
          return is(e(t));
        } catch {}
    }
  return null;
}
function bf(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return is(t);
    case 8:
      return t === il ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function $t(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function zc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Uf(e) {
  var t = zc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (s) {
          (r = "" + s), i.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function so(e) {
  e._valueTracker || (e._valueTracker = Uf(e));
}
function Fc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = zc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Mo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ss(e, t) {
  var n = t.checked;
  return le({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function oa(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = $t(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Hc(e, t) {
  (t = t.checked), t != null && ol(e, "checked", t, !1);
}
function ls(e, t) {
  Hc(e, t);
  var n = $t(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? as(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && as(e, t.type, $t(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ia(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function as(e, t, n) {
  (t !== "number" || Mo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ar = Array.isArray;
function Fn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + $t(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function cs(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
  return le({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function sa(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(E(92));
      if (Ar(n)) {
        if (1 < n.length) throw Error(E(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: $t(n) };
}
function Vc(e, t) {
  var n = $t(t.value),
    r = $t(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function la(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Gc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function us(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Gc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var lo,
  Jc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        lo = lo || document.createElement("div"),
          lo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = lo.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function _r(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Sr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Of = ["Webkit", "ms", "Moz", "O"];
Object.keys(Sr).forEach(function (e) {
  Of.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Sr[t] = Sr[e]);
  });
});
function Yc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Sr.hasOwnProperty(e) && Sr[e])
    ? ("" + t).trim()
    : t + "px";
}
function Kc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = Yc(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var Lf = le(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function ds(e, t) {
  if (t) {
    if (Lf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(E(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(E(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(E(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(E(62));
  }
}
function fs(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var hs = null;
function al(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var ps = null,
  Hn = null,
  Vn = null;
function aa(e) {
  if ((e = eo(e))) {
    if (typeof ps != "function") throw Error(E(280));
    var t = e.stateNode;
    t && ((t = pi(t)), ps(e.stateNode, e.type, t));
  }
}
function Xc(e) {
  Hn ? (Vn ? Vn.push(e) : (Vn = [e])) : (Hn = e);
}
function Wc() {
  if (Hn) {
    var e = Hn,
      t = Vn;
    if (((Vn = Hn = null), aa(e), t)) for (e = 0; e < t.length; e++) aa(t[e]);
  }
}
function qc(e, t) {
  return e(t);
}
function Zc() {}
var _i = !1;
function $c(e, t, n) {
  if (_i) return e(t, n);
  _i = !0;
  try {
    return qc(e, t, n);
  } finally {
    (_i = !1), (Hn !== null || Vn !== null) && (Zc(), Wc());
  }
}
function Tr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = pi(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(E(231, t, typeof n));
  return n;
}
var gs = !1;
if (xt)
  try {
    var cr = {};
    Object.defineProperty(cr, "passive", {
      get: function () {
        gs = !0;
      },
    }),
      window.addEventListener("test", cr, cr),
      window.removeEventListener("test", cr, cr);
  } catch {
    gs = !1;
  }
function Qf(e, t, n, r, o, i, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (f) {
    this.onError(f);
  }
}
var kr = !1,
  bo = null,
  Uo = !1,
  ms = null,
  zf = {
    onError: function (e) {
      (kr = !0), (bo = e);
    },
  };
function Ff(e, t, n, r, o, i, s, l, a) {
  (kr = !1), (bo = null), Qf.apply(zf, arguments);
}
function Hf(e, t, n, r, o, i, s, l, a) {
  if ((Ff.apply(this, arguments), kr)) {
    if (kr) {
      var u = bo;
      (kr = !1), (bo = null);
    } else throw Error(E(198));
    Uo || ((Uo = !0), (ms = u));
  }
}
function En(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function eu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function ca(e) {
  if (En(e) !== e) throw Error(E(188));
}
function Vf(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = En(e)), t === null)) throw Error(E(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return ca(o), e;
        if (i === r) return ca(o), t;
        i = i.sibling;
      }
      throw Error(E(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var s = !1, l = o.child; l; ) {
        if (l === n) {
          (s = !0), (n = o), (r = i);
          break;
        }
        if (l === r) {
          (s = !0), (r = o), (n = i);
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = i.child; l; ) {
          if (l === n) {
            (s = !0), (n = i), (r = o);
            break;
          }
          if (l === r) {
            (s = !0), (r = i), (n = o);
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(E(189));
      }
    }
    if (n.alternate !== r) throw Error(E(190));
  }
  if (n.tag !== 3) throw Error(E(188));
  return n.stateNode.current === n ? e : t;
}
function tu(e) {
  return (e = Vf(e)), e !== null ? nu(e) : null;
}
function nu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = nu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ru = Je.unstable_scheduleCallback,
  ua = Je.unstable_cancelCallback,
  Gf = Je.unstable_shouldYield,
  Jf = Je.unstable_requestPaint,
  de = Je.unstable_now,
  Yf = Je.unstable_getCurrentPriorityLevel,
  cl = Je.unstable_ImmediatePriority,
  ou = Je.unstable_UserBlockingPriority,
  Oo = Je.unstable_NormalPriority,
  Kf = Je.unstable_LowPriority,
  iu = Je.unstable_IdlePriority,
  ui = null,
  mt = null;
function Xf(e) {
  if (mt && typeof mt.onCommitFiberRoot == "function")
    try {
      mt.onCommitFiberRoot(ui, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var ct = Math.clz32 ? Math.clz32 : Zf,
  Wf = Math.log,
  qf = Math.LN2;
function Zf(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Wf(e) / qf) | 0)) | 0;
}
var ao = 64,
  co = 4194304;
function yr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Lo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~o;
    l !== 0 ? (r = yr(l)) : ((i &= s), i !== 0 && (r = yr(i)));
  } else (s = n & ~o), s !== 0 ? (r = yr(s)) : i !== 0 && (r = yr(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - ct(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function $f(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function eh(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var s = 31 - ct(i),
      l = 1 << s,
      a = o[s];
    a === -1
      ? (!(l & n) || l & r) && (o[s] = $f(l, t))
      : a <= t && (e.expiredLanes |= l),
      (i &= ~l);
  }
}
function As(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function su() {
  var e = ao;
  return (ao <<= 1), !(ao & 4194240) && (ao = 64), e;
}
function Ti(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Zr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - ct(t)),
    (e[t] = n);
}
function th(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - ct(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function ul(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - ct(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var Y = 0;
function lu(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var au,
  dl,
  cu,
  uu,
  du,
  ys = !1,
  uo = [],
  Vt = null,
  Gt = null,
  Jt = null,
  jr = new Map(),
  Dr = new Map(),
  Ut = [],
  nh =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function da(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Vt = null;
      break;
    case "dragenter":
    case "dragleave":
      Gt = null;
      break;
    case "mouseover":
    case "mouseout":
      Jt = null;
      break;
    case "pointerover":
    case "pointerout":
      jr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Dr.delete(t.pointerId);
  }
}
function ur(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = eo(t)), t !== null && dl(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function rh(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return (Vt = ur(Vt, e, t, n, r, o)), !0;
    case "dragenter":
      return (Gt = ur(Gt, e, t, n, r, o)), !0;
    case "mouseover":
      return (Jt = ur(Jt, e, t, n, r, o)), !0;
    case "pointerover":
      var i = o.pointerId;
      return jr.set(i, ur(jr.get(i) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return (
        (i = o.pointerId), Dr.set(i, ur(Dr.get(i) || null, e, t, n, r, o)), !0
      );
  }
  return !1;
}
function fu(e) {
  var t = un(e.target);
  if (t !== null) {
    var n = En(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = eu(n)), t !== null)) {
          (e.blockedOn = t),
            du(e.priority, function () {
              cu(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function xo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = vs(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (hs = r), n.target.dispatchEvent(r), (hs = null);
    } else return (t = eo(n)), t !== null && dl(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function fa(e, t, n) {
  xo(e) && n.delete(t);
}
function oh() {
  (ys = !1),
    Vt !== null && xo(Vt) && (Vt = null),
    Gt !== null && xo(Gt) && (Gt = null),
    Jt !== null && xo(Jt) && (Jt = null),
    jr.forEach(fa),
    Dr.forEach(fa);
}
function dr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    ys ||
      ((ys = !0),
      Je.unstable_scheduleCallback(Je.unstable_NormalPriority, oh)));
}
function Mr(e) {
  function t(o) {
    return dr(o, e);
  }
  if (0 < uo.length) {
    dr(uo[0], e);
    for (var n = 1; n < uo.length; n++) {
      var r = uo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Vt !== null && dr(Vt, e),
      Gt !== null && dr(Gt, e),
      Jt !== null && dr(Jt, e),
      jr.forEach(t),
      Dr.forEach(t),
      n = 0;
    n < Ut.length;
    n++
  )
    (r = Ut[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ut.length && ((n = Ut[0]), n.blockedOn === null); )
    fu(n), n.blockedOn === null && Ut.shift();
}
var Gn = Rt.ReactCurrentBatchConfig,
  Qo = !0;
function ih(e, t, n, r) {
  var o = Y,
    i = Gn.transition;
  Gn.transition = null;
  try {
    (Y = 1), fl(e, t, n, r);
  } finally {
    (Y = o), (Gn.transition = i);
  }
}
function sh(e, t, n, r) {
  var o = Y,
    i = Gn.transition;
  Gn.transition = null;
  try {
    (Y = 4), fl(e, t, n, r);
  } finally {
    (Y = o), (Gn.transition = i);
  }
}
function fl(e, t, n, r) {
  if (Qo) {
    var o = vs(e, t, n, r);
    if (o === null) Fi(e, t, r, zo, n), da(e, r);
    else if (rh(o, e, t, n, r)) r.stopPropagation();
    else if ((da(e, r), t & 4 && -1 < nh.indexOf(e))) {
      for (; o !== null; ) {
        var i = eo(o);
        if (
          (i !== null && au(i),
          (i = vs(e, t, n, r)),
          i === null && Fi(e, t, r, zo, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else Fi(e, t, r, null, n);
  }
}
var zo = null;
function vs(e, t, n, r) {
  if (((zo = null), (e = al(r)), (e = un(e)), e !== null))
    if (((t = En(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = eu(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (zo = e), null;
}
function hu(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Yf()) {
        case cl:
          return 1;
        case ou:
          return 4;
        case Oo:
        case Kf:
          return 16;
        case iu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Qt = null,
  hl = null,
  No = null;
function pu() {
  if (No) return No;
  var e,
    t = hl,
    n = t.length,
    r,
    o = "value" in Qt ? Qt.value : Qt.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
  return (No = o.slice(e, 1 < r ? 1 - r : void 0));
}
function Io(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function fo() {
  return !0;
}
function ha() {
  return !1;
}
function Ke(e) {
  function t(n, r, o, i, s) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = s),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? fo
        : ha),
      (this.isPropagationStopped = ha),
      this
    );
  }
  return (
    le(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = fo));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = fo));
      },
      persist: function () {},
      isPersistent: fo,
    }),
    t
  );
}
var or = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  pl = Ke(or),
  $r = le({}, or, { view: 0, detail: 0 }),
  lh = Ke($r),
  ji,
  Di,
  fr,
  di = le({}, $r, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: gl,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== fr &&
            (fr && e.type === "mousemove"
              ? ((ji = e.screenX - fr.screenX), (Di = e.screenY - fr.screenY))
              : (Di = ji = 0),
            (fr = e)),
          ji);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Di;
    },
  }),
  pa = Ke(di),
  ah = le({}, di, { dataTransfer: 0 }),
  ch = Ke(ah),
  uh = le({}, $r, { relatedTarget: 0 }),
  Mi = Ke(uh),
  dh = le({}, or, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  fh = Ke(dh),
  hh = le({}, or, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  ph = Ke(hh),
  gh = le({}, or, { data: 0 }),
  ga = Ke(gh),
  mh = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Ah = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  yh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function vh(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = yh[e]) ? !!t[e] : !1;
}
function gl() {
  return vh;
}
var wh = le({}, $r, {
    key: function (e) {
      if (e.key) {
        var t = mh[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Io(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Ah[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: gl,
    charCode: function (e) {
      return e.type === "keypress" ? Io(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Io(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Sh = Ke(wh),
  kh = le({}, di, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  ma = Ke(kh),
  Ch = le({}, $r, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: gl,
  }),
  Eh = Ke(Ch),
  xh = le({}, or, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Nh = Ke(xh),
  Ih = le({}, di, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Bh = Ke(Ih),
  Rh = [9, 13, 27, 32],
  ml = xt && "CompositionEvent" in window,
  Cr = null;
xt && "documentMode" in document && (Cr = document.documentMode);
var Ph = xt && "TextEvent" in window && !Cr,
  gu = xt && (!ml || (Cr && 8 < Cr && 11 >= Cr)),
  Aa = " ",
  ya = !1;
function mu(e, t) {
  switch (e) {
    case "keyup":
      return Rh.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Au(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Tn = !1;
function _h(e, t) {
  switch (e) {
    case "compositionend":
      return Au(t);
    case "keypress":
      return t.which !== 32 ? null : ((ya = !0), Aa);
    case "textInput":
      return (e = t.data), e === Aa && ya ? null : e;
    default:
      return null;
  }
}
function Th(e, t) {
  if (Tn)
    return e === "compositionend" || (!ml && mu(e, t))
      ? ((e = pu()), (No = hl = Qt = null), (Tn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return gu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var jh = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function va(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!jh[e.type] : t === "textarea";
}
function yu(e, t, n, r) {
  Xc(r),
    (t = Fo(t, "onChange")),
    0 < t.length &&
      ((n = new pl("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Er = null,
  br = null;
function Dh(e) {
  Ru(e, 0);
}
function fi(e) {
  var t = Mn(e);
  if (Fc(t)) return e;
}
function Mh(e, t) {
  if (e === "change") return t;
}
var vu = !1;
if (xt) {
  var bi;
  if (xt) {
    var Ui = "oninput" in document;
    if (!Ui) {
      var wa = document.createElement("div");
      wa.setAttribute("oninput", "return;"),
        (Ui = typeof wa.oninput == "function");
    }
    bi = Ui;
  } else bi = !1;
  vu = bi && (!document.documentMode || 9 < document.documentMode);
}
function Sa() {
  Er && (Er.detachEvent("onpropertychange", wu), (br = Er = null));
}
function wu(e) {
  if (e.propertyName === "value" && fi(br)) {
    var t = [];
    yu(t, br, e, al(e)), $c(Dh, t);
  }
}
function bh(e, t, n) {
  e === "focusin"
    ? (Sa(), (Er = t), (br = n), Er.attachEvent("onpropertychange", wu))
    : e === "focusout" && Sa();
}
function Uh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return fi(br);
}
function Oh(e, t) {
  if (e === "click") return fi(t);
}
function Lh(e, t) {
  if (e === "input" || e === "change") return fi(t);
}
function Qh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var dt = typeof Object.is == "function" ? Object.is : Qh;
function Ur(e, t) {
  if (dt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!ts.call(t, o) || !dt(e[o], t[o])) return !1;
  }
  return !0;
}
function ka(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ca(e, t) {
  var n = ka(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ka(n);
  }
}
function Su(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Su(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function ku() {
  for (var e = window, t = Mo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Mo(e.document);
  }
  return t;
}
function Al(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function zh(e) {
  var t = ku(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Su(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Al(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = Ca(n, i));
        var s = Ca(n, r);
        o &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Fh = xt && "documentMode" in document && 11 >= document.documentMode,
  jn = null,
  ws = null,
  xr = null,
  Ss = !1;
function Ea(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ss ||
    jn == null ||
    jn !== Mo(r) ||
    ((r = jn),
    "selectionStart" in r && Al(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (xr && Ur(xr, r)) ||
      ((xr = r),
      (r = Fo(ws, "onSelect")),
      0 < r.length &&
        ((t = new pl("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = jn))));
}
function ho(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Dn = {
    animationend: ho("Animation", "AnimationEnd"),
    animationiteration: ho("Animation", "AnimationIteration"),
    animationstart: ho("Animation", "AnimationStart"),
    transitionend: ho("Transition", "TransitionEnd"),
  },
  Oi = {},
  Cu = {};
xt &&
  ((Cu = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Dn.animationend.animation,
    delete Dn.animationiteration.animation,
    delete Dn.animationstart.animation),
  "TransitionEvent" in window || delete Dn.transitionend.transition);
function hi(e) {
  if (Oi[e]) return Oi[e];
  if (!Dn[e]) return e;
  var t = Dn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Cu) return (Oi[e] = t[n]);
  return e;
}
var Eu = hi("animationend"),
  xu = hi("animationiteration"),
  Nu = hi("animationstart"),
  Iu = hi("transitionend"),
  Bu = new Map(),
  xa =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function tn(e, t) {
  Bu.set(e, t), Cn(t, [e]);
}
for (var Li = 0; Li < xa.length; Li++) {
  var Qi = xa[Li],
    Hh = Qi.toLowerCase(),
    Vh = Qi[0].toUpperCase() + Qi.slice(1);
  tn(Hh, "on" + Vh);
}
tn(Eu, "onAnimationEnd");
tn(xu, "onAnimationIteration");
tn(Nu, "onAnimationStart");
tn("dblclick", "onDoubleClick");
tn("focusin", "onFocus");
tn("focusout", "onBlur");
tn(Iu, "onTransitionEnd");
Kn("onMouseEnter", ["mouseout", "mouseover"]);
Kn("onMouseLeave", ["mouseout", "mouseover"]);
Kn("onPointerEnter", ["pointerout", "pointerover"]);
Kn("onPointerLeave", ["pointerout", "pointerover"]);
Cn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Cn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Cn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Cn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Cn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Cn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var vr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Gh = new Set("cancel close invalid load scroll toggle".split(" ").concat(vr));
function Na(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Hf(r, t, void 0, e), (e.currentTarget = null);
}
function Ru(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== i && o.isPropagationStopped())) break e;
          Na(o, l, u), (i = a);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((l = r[s]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== i && o.isPropagationStopped())
          )
            break e;
          Na(o, l, u), (i = a);
        }
    }
  }
  if (Uo) throw ((e = ms), (Uo = !1), (ms = null), e);
}
function $(e, t) {
  var n = t[Ns];
  n === void 0 && (n = t[Ns] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Pu(t, e, 2, !1), n.add(r));
}
function zi(e, t, n) {
  var r = 0;
  t && (r |= 4), Pu(n, e, r, t);
}
var po = "_reactListening" + Math.random().toString(36).slice(2);
function Or(e) {
  if (!e[po]) {
    (e[po] = !0),
      Uc.forEach(function (n) {
        n !== "selectionchange" && (Gh.has(n) || zi(n, !1, e), zi(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[po] || ((t[po] = !0), zi("selectionchange", !1, t));
  }
}
function Pu(e, t, n, r) {
  switch (hu(t)) {
    case 1:
      var o = ih;
      break;
    case 4:
      o = sh;
      break;
    default:
      o = fl;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !gs ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
      ? e.addEventListener(t, n, { passive: o })
      : e.addEventListener(t, n, !1);
}
function Fi(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === o || (a.nodeType === 8 && a.parentNode === o))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = un(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = i = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  $c(function () {
    var u = i,
      f = al(n),
      h = [];
    e: {
      var m = Bu.get(e);
      if (m !== void 0) {
        var v = pl,
          k = e;
        switch (e) {
          case "keypress":
            if (Io(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = Sh;
            break;
          case "focusin":
            (k = "focus"), (v = Mi);
            break;
          case "focusout":
            (k = "blur"), (v = Mi);
            break;
          case "beforeblur":
          case "afterblur":
            v = Mi;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = pa;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = ch;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Eh;
            break;
          case Eu:
          case xu:
          case Nu:
            v = fh;
            break;
          case Iu:
            v = Nh;
            break;
          case "scroll":
            v = lh;
            break;
          case "wheel":
            v = Bh;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = ph;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = ma;
        }
        var C = (t & 4) !== 0,
          x = !C && e === "scroll",
          p = C ? (m !== null ? m + "Capture" : null) : m;
        C = [];
        for (var d = u, g; d !== null; ) {
          g = d;
          var y = g.stateNode;
          if (
            (g.tag === 5 &&
              y !== null &&
              ((g = y),
              p !== null && ((y = Tr(d, p)), y != null && C.push(Lr(d, y, g)))),
            x)
          )
            break;
          d = d.return;
        }
        0 < C.length &&
          ((m = new v(m, k, null, n, f)), h.push({ event: m, listeners: C }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          m &&
            n !== hs &&
            (k = n.relatedTarget || n.fromElement) &&
            (un(k) || k[Nt]))
        )
          break e;
        if (
          (v || m) &&
          ((m =
            f.window === f
              ? f
              : (m = f.ownerDocument)
              ? m.defaultView || m.parentWindow
              : window),
          v
            ? ((k = n.relatedTarget || n.toElement),
              (v = u),
              (k = k ? un(k) : null),
              k !== null &&
                ((x = En(k)), k !== x || (k.tag !== 5 && k.tag !== 6)) &&
                (k = null))
            : ((v = null), (k = u)),
          v !== k)
        ) {
          if (
            ((C = pa),
            (y = "onMouseLeave"),
            (p = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((C = ma),
              (y = "onPointerLeave"),
              (p = "onPointerEnter"),
              (d = "pointer")),
            (x = v == null ? m : Mn(v)),
            (g = k == null ? m : Mn(k)),
            (m = new C(y, d + "leave", v, n, f)),
            (m.target = x),
            (m.relatedTarget = g),
            (y = null),
            un(f) === u &&
              ((C = new C(p, d + "enter", k, n, f)),
              (C.target = g),
              (C.relatedTarget = x),
              (y = C)),
            (x = y),
            v && k)
          )
            t: {
              for (C = v, p = k, d = 0, g = C; g; g = Rn(g)) d++;
              for (g = 0, y = p; y; y = Rn(y)) g++;
              for (; 0 < d - g; ) (C = Rn(C)), d--;
              for (; 0 < g - d; ) (p = Rn(p)), g--;
              for (; d--; ) {
                if (C === p || (p !== null && C === p.alternate)) break t;
                (C = Rn(C)), (p = Rn(p));
              }
              C = null;
            }
          else C = null;
          v !== null && Ia(h, m, v, C, !1),
            k !== null && x !== null && Ia(h, x, k, C, !0);
        }
      }
      e: {
        if (
          ((m = u ? Mn(u) : window),
          (v = m.nodeName && m.nodeName.toLowerCase()),
          v === "select" || (v === "input" && m.type === "file"))
        )
          var I = Mh;
        else if (va(m))
          if (vu) I = Lh;
          else {
            I = Uh;
            var _ = bh;
          }
        else
          (v = m.nodeName) &&
            v.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (I = Oh);
        if (I && (I = I(e, u))) {
          yu(h, I, n, f);
          break e;
        }
        _ && _(e, m, u),
          e === "focusout" &&
            (_ = m._wrapperState) &&
            _.controlled &&
            m.type === "number" &&
            as(m, "number", m.value);
      }
      switch (((_ = u ? Mn(u) : window), e)) {
        case "focusin":
          (va(_) || _.contentEditable === "true") &&
            ((jn = _), (ws = u), (xr = null));
          break;
        case "focusout":
          xr = ws = jn = null;
          break;
        case "mousedown":
          Ss = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Ss = !1), Ea(h, n, f);
          break;
        case "selectionchange":
          if (Fh) break;
        case "keydown":
        case "keyup":
          Ea(h, n, f);
      }
      var j;
      if (ml)
        e: {
          switch (e) {
            case "compositionstart":
              var D = "onCompositionStart";
              break e;
            case "compositionend":
              D = "onCompositionEnd";
              break e;
            case "compositionupdate":
              D = "onCompositionUpdate";
              break e;
          }
          D = void 0;
        }
      else
        Tn
          ? mu(e, n) && (D = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (D = "onCompositionStart");
      D &&
        (gu &&
          n.locale !== "ko" &&
          (Tn || D !== "onCompositionStart"
            ? D === "onCompositionEnd" && Tn && (j = pu())
            : ((Qt = f),
              (hl = "value" in Qt ? Qt.value : Qt.textContent),
              (Tn = !0))),
        (_ = Fo(u, D)),
        0 < _.length &&
          ((D = new ga(D, e, null, n, f)),
          h.push({ event: D, listeners: _ }),
          j ? (D.data = j) : ((j = Au(n)), j !== null && (D.data = j)))),
        (j = Ph ? _h(e, n) : Th(e, n)) &&
          ((u = Fo(u, "onBeforeInput")),
          0 < u.length &&
            ((f = new ga("onBeforeInput", "beforeinput", null, n, f)),
            h.push({ event: f, listeners: u }),
            (f.data = j)));
    }
    Ru(h, t);
  });
}
function Lr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Fo(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = Tr(e, n)),
      i != null && r.unshift(Lr(e, i, o)),
      (i = Tr(e, t)),
      i != null && r.push(Lr(e, i, o))),
      (e = e.return);
  }
  return r;
}
function Rn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ia(e, t, n, r, o) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      o
        ? ((a = Tr(n, i)), a != null && s.unshift(Lr(n, a, l)))
        : o || ((a = Tr(n, i)), a != null && s.push(Lr(n, a, l)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Jh = /\r\n?/g,
  Yh = /\u0000|\uFFFD/g;
function Ba(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Jh,
      `
`
    )
    .replace(Yh, "");
}
function go(e, t, n) {
  if (((t = Ba(t)), Ba(e) !== t && n)) throw Error(E(425));
}
function Ho() {}
var ks = null,
  Cs = null;
function Es(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var xs = typeof setTimeout == "function" ? setTimeout : void 0,
  Kh = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ra = typeof Promise == "function" ? Promise : void 0,
  Xh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ra < "u"
      ? function (e) {
          return Ra.resolve(null).then(e).catch(Wh);
        }
      : xs;
function Wh(e) {
  setTimeout(function () {
    throw e;
  });
}
function Hi(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(o), Mr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  Mr(t);
}
function Yt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Pa(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var ir = Math.random().toString(36).slice(2),
  gt = "__reactFiber$" + ir,
  Qr = "__reactProps$" + ir,
  Nt = "__reactContainer$" + ir,
  Ns = "__reactEvents$" + ir,
  qh = "__reactListeners$" + ir,
  Zh = "__reactHandles$" + ir;
function un(e) {
  var t = e[gt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Nt] || n[gt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Pa(e); e !== null; ) {
          if ((n = e[gt])) return n;
          e = Pa(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function eo(e) {
  return (
    (e = e[gt] || e[Nt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Mn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(E(33));
}
function pi(e) {
  return e[Qr] || null;
}
var Is = [],
  bn = -1;
function nn(e) {
  return { current: e };
}
function te(e) {
  0 > bn || ((e.current = Is[bn]), (Is[bn] = null), bn--);
}
function X(e, t) {
  bn++, (Is[bn] = e.current), (e.current = t);
}
var en = {},
  Pe = nn(en),
  Le = nn(!1),
  An = en;
function Xn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return en;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Qe(e) {
  return (e = e.childContextTypes), e != null;
}
function Vo() {
  te(Le), te(Pe);
}
function _a(e, t, n) {
  if (Pe.current !== en) throw Error(E(168));
  X(Pe, t), X(Le, n);
}
function _u(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(E(108, bf(e) || "Unknown", o));
  return le({}, n, r);
}
function Go(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || en),
    (An = Pe.current),
    X(Pe, e),
    X(Le, Le.current),
    !0
  );
}
function Ta(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(E(169));
  n
    ? ((e = _u(e, t, An)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      te(Le),
      te(Pe),
      X(Pe, e))
    : te(Le),
    X(Le, n);
}
var St = null,
  gi = !1,
  Vi = !1;
function Tu(e) {
  St === null ? (St = [e]) : St.push(e);
}
function $h(e) {
  (gi = !0), Tu(e);
}
function rn() {
  if (!Vi && St !== null) {
    Vi = !0;
    var e = 0,
      t = Y;
    try {
      var n = St;
      for (Y = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (St = null), (gi = !1);
    } catch (o) {
      throw (St !== null && (St = St.slice(e + 1)), ru(cl, rn), o);
    } finally {
      (Y = t), (Vi = !1);
    }
  }
  return null;
}
var Un = [],
  On = 0,
  Jo = null,
  Yo = 0,
  We = [],
  qe = 0,
  yn = null,
  kt = 1,
  Ct = "";
function an(e, t) {
  (Un[On++] = Yo), (Un[On++] = Jo), (Jo = e), (Yo = t);
}
function ju(e, t, n) {
  (We[qe++] = kt), (We[qe++] = Ct), (We[qe++] = yn), (yn = e);
  var r = kt;
  e = Ct;
  var o = 32 - ct(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - ct(t) + o;
  if (30 < i) {
    var s = o - (o % 5);
    (i = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (o -= s),
      (kt = (1 << (32 - ct(t) + o)) | (n << o) | r),
      (Ct = i + e);
  } else (kt = (1 << i) | (n << o) | r), (Ct = e);
}
function yl(e) {
  e.return !== null && (an(e, 1), ju(e, 1, 0));
}
function vl(e) {
  for (; e === Jo; )
    (Jo = Un[--On]), (Un[On] = null), (Yo = Un[--On]), (Un[On] = null);
  for (; e === yn; )
    (yn = We[--qe]),
      (We[qe] = null),
      (Ct = We[--qe]),
      (We[qe] = null),
      (kt = We[--qe]),
      (We[qe] = null);
}
var Ge = null,
  He = null,
  re = !1,
  lt = null;
function Du(e, t) {
  var n = Ze(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function ja(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ge = e), (He = Yt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ge = e), (He = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = yn !== null ? { id: kt, overflow: Ct } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ze(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ge = e),
            (He = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Bs(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Rs(e) {
  if (re) {
    var t = He;
    if (t) {
      var n = t;
      if (!ja(e, t)) {
        if (Bs(e)) throw Error(E(418));
        t = Yt(n.nextSibling);
        var r = Ge;
        t && ja(e, t)
          ? Du(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (re = !1), (Ge = e));
      }
    } else {
      if (Bs(e)) throw Error(E(418));
      (e.flags = (e.flags & -4097) | 2), (re = !1), (Ge = e);
    }
  }
}
function Da(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ge = e;
}
function mo(e) {
  if (e !== Ge) return !1;
  if (!re) return Da(e), (re = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Es(e.type, e.memoizedProps))),
    t && (t = He))
  ) {
    if (Bs(e)) throw (Mu(), Error(E(418)));
    for (; t; ) Du(e, t), (t = Yt(t.nextSibling));
  }
  if ((Da(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(E(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              He = Yt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      He = null;
    }
  } else He = Ge ? Yt(e.stateNode.nextSibling) : null;
  return !0;
}
function Mu() {
  for (var e = He; e; ) e = Yt(e.nextSibling);
}
function Wn() {
  (He = Ge = null), (re = !1);
}
function wl(e) {
  lt === null ? (lt = [e]) : lt.push(e);
}
var ep = Rt.ReactCurrentBatchConfig;
function hr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(E(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(E(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (s) {
            var l = o.refs;
            s === null ? delete l[i] : (l[i] = s);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(E(284));
    if (!n._owner) throw Error(E(290, e));
  }
  return e;
}
function Ao(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      E(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ma(e) {
  var t = e._init;
  return t(e._payload);
}
function bu(e) {
  function t(p, d) {
    if (e) {
      var g = p.deletions;
      g === null ? ((p.deletions = [d]), (p.flags |= 16)) : g.push(d);
    }
  }
  function n(p, d) {
    if (!e) return null;
    for (; d !== null; ) t(p, d), (d = d.sibling);
    return null;
  }
  function r(p, d) {
    for (p = new Map(); d !== null; )
      d.key !== null ? p.set(d.key, d) : p.set(d.index, d), (d = d.sibling);
    return p;
  }
  function o(p, d) {
    return (p = qt(p, d)), (p.index = 0), (p.sibling = null), p;
  }
  function i(p, d, g) {
    return (
      (p.index = g),
      e
        ? ((g = p.alternate),
          g !== null
            ? ((g = g.index), g < d ? ((p.flags |= 2), d) : g)
            : ((p.flags |= 2), d))
        : ((p.flags |= 1048576), d)
    );
  }
  function s(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, d, g, y) {
    return d === null || d.tag !== 6
      ? ((d = qi(g, p.mode, y)), (d.return = p), d)
      : ((d = o(d, g)), (d.return = p), d);
  }
  function a(p, d, g, y) {
    var I = g.type;
    return I === _n
      ? f(p, d, g.props.children, y, g.key)
      : d !== null &&
        (d.elementType === I ||
          (typeof I == "object" &&
            I !== null &&
            I.$$typeof === Mt &&
            Ma(I) === d.type))
      ? ((y = o(d, g.props)), (y.ref = hr(p, d, g)), (y.return = p), y)
      : ((y = Do(g.type, g.key, g.props, null, p.mode, y)),
        (y.ref = hr(p, d, g)),
        (y.return = p),
        y);
  }
  function u(p, d, g, y) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== g.containerInfo ||
      d.stateNode.implementation !== g.implementation
      ? ((d = Zi(g, p.mode, y)), (d.return = p), d)
      : ((d = o(d, g.children || [])), (d.return = p), d);
  }
  function f(p, d, g, y, I) {
    return d === null || d.tag !== 7
      ? ((d = pn(g, p.mode, y, I)), (d.return = p), d)
      : ((d = o(d, g)), (d.return = p), d);
  }
  function h(p, d, g) {
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return (d = qi("" + d, p.mode, g)), (d.return = p), d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case io:
          return (
            (g = Do(d.type, d.key, d.props, null, p.mode, g)),
            (g.ref = hr(p, null, d)),
            (g.return = p),
            g
          );
        case Pn:
          return (d = Zi(d, p.mode, g)), (d.return = p), d;
        case Mt:
          var y = d._init;
          return h(p, y(d._payload), g);
      }
      if (Ar(d) || ar(d))
        return (d = pn(d, p.mode, g, null)), (d.return = p), d;
      Ao(p, d);
    }
    return null;
  }
  function m(p, d, g, y) {
    var I = d !== null ? d.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return I !== null ? null : l(p, d, "" + g, y);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case io:
          return g.key === I ? a(p, d, g, y) : null;
        case Pn:
          return g.key === I ? u(p, d, g, y) : null;
        case Mt:
          return (I = g._init), m(p, d, I(g._payload), y);
      }
      if (Ar(g) || ar(g)) return I !== null ? null : f(p, d, g, y, null);
      Ao(p, g);
    }
    return null;
  }
  function v(p, d, g, y, I) {
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return (p = p.get(g) || null), l(d, p, "" + y, I);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case io:
          return (p = p.get(y.key === null ? g : y.key) || null), a(d, p, y, I);
        case Pn:
          return (p = p.get(y.key === null ? g : y.key) || null), u(d, p, y, I);
        case Mt:
          var _ = y._init;
          return v(p, d, g, _(y._payload), I);
      }
      if (Ar(y) || ar(y)) return (p = p.get(g) || null), f(d, p, y, I, null);
      Ao(d, y);
    }
    return null;
  }
  function k(p, d, g, y) {
    for (
      var I = null, _ = null, j = d, D = (d = 0), q = null;
      j !== null && D < g.length;
      D++
    ) {
      j.index > D ? ((q = j), (j = null)) : (q = j.sibling);
      var z = m(p, j, g[D], y);
      if (z === null) {
        j === null && (j = q);
        break;
      }
      e && j && z.alternate === null && t(p, j),
        (d = i(z, d, D)),
        _ === null ? (I = z) : (_.sibling = z),
        (_ = z),
        (j = q);
    }
    if (D === g.length) return n(p, j), re && an(p, D), I;
    if (j === null) {
      for (; D < g.length; D++)
        (j = h(p, g[D], y)),
          j !== null &&
            ((d = i(j, d, D)), _ === null ? (I = j) : (_.sibling = j), (_ = j));
      return re && an(p, D), I;
    }
    for (j = r(p, j); D < g.length; D++)
      (q = v(j, p, D, g[D], y)),
        q !== null &&
          (e && q.alternate !== null && j.delete(q.key === null ? D : q.key),
          (d = i(q, d, D)),
          _ === null ? (I = q) : (_.sibling = q),
          (_ = q));
    return (
      e &&
        j.forEach(function (xe) {
          return t(p, xe);
        }),
      re && an(p, D),
      I
    );
  }
  function C(p, d, g, y) {
    var I = ar(g);
    if (typeof I != "function") throw Error(E(150));
    if (((g = I.call(g)), g == null)) throw Error(E(151));
    for (
      var _ = (I = null), j = d, D = (d = 0), q = null, z = g.next();
      j !== null && !z.done;
      D++, z = g.next()
    ) {
      j.index > D ? ((q = j), (j = null)) : (q = j.sibling);
      var xe = m(p, j, z.value, y);
      if (xe === null) {
        j === null && (j = q);
        break;
      }
      e && j && xe.alternate === null && t(p, j),
        (d = i(xe, d, D)),
        _ === null ? (I = xe) : (_.sibling = xe),
        (_ = xe),
        (j = q);
    }
    if (z.done) return n(p, j), re && an(p, D), I;
    if (j === null) {
      for (; !z.done; D++, z = g.next())
        (z = h(p, z.value, y)),
          z !== null &&
            ((d = i(z, d, D)), _ === null ? (I = z) : (_.sibling = z), (_ = z));
      return re && an(p, D), I;
    }
    for (j = r(p, j); !z.done; D++, z = g.next())
      (z = v(j, p, D, z.value, y)),
        z !== null &&
          (e && z.alternate !== null && j.delete(z.key === null ? D : z.key),
          (d = i(z, d, D)),
          _ === null ? (I = z) : (_.sibling = z),
          (_ = z));
    return (
      e &&
        j.forEach(function (nt) {
          return t(p, nt);
        }),
      re && an(p, D),
      I
    );
  }
  function x(p, d, g, y) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === _n &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case io:
          e: {
            for (var I = g.key, _ = d; _ !== null; ) {
              if (_.key === I) {
                if (((I = g.type), I === _n)) {
                  if (_.tag === 7) {
                    n(p, _.sibling),
                      (d = o(_, g.props.children)),
                      (d.return = p),
                      (p = d);
                    break e;
                  }
                } else if (
                  _.elementType === I ||
                  (typeof I == "object" &&
                    I !== null &&
                    I.$$typeof === Mt &&
                    Ma(I) === _.type)
                ) {
                  n(p, _.sibling),
                    (d = o(_, g.props)),
                    (d.ref = hr(p, _, g)),
                    (d.return = p),
                    (p = d);
                  break e;
                }
                n(p, _);
                break;
              } else t(p, _);
              _ = _.sibling;
            }
            g.type === _n
              ? ((d = pn(g.props.children, p.mode, y, g.key)),
                (d.return = p),
                (p = d))
              : ((y = Do(g.type, g.key, g.props, null, p.mode, y)),
                (y.ref = hr(p, d, g)),
                (y.return = p),
                (p = y));
          }
          return s(p);
        case Pn:
          e: {
            for (_ = g.key; d !== null; ) {
              if (d.key === _)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === g.containerInfo &&
                  d.stateNode.implementation === g.implementation
                ) {
                  n(p, d.sibling),
                    (d = o(d, g.children || [])),
                    (d.return = p),
                    (p = d);
                  break e;
                } else {
                  n(p, d);
                  break;
                }
              else t(p, d);
              d = d.sibling;
            }
            (d = Zi(g, p.mode, y)), (d.return = p), (p = d);
          }
          return s(p);
        case Mt:
          return (_ = g._init), x(p, d, _(g._payload), y);
      }
      if (Ar(g)) return k(p, d, g, y);
      if (ar(g)) return C(p, d, g, y);
      Ao(p, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        d !== null && d.tag === 6
          ? (n(p, d.sibling), (d = o(d, g)), (d.return = p), (p = d))
          : (n(p, d), (d = qi(g, p.mode, y)), (d.return = p), (p = d)),
        s(p))
      : n(p, d);
  }
  return x;
}
var qn = bu(!0),
  Uu = bu(!1),
  Ko = nn(null),
  Xo = null,
  Ln = null,
  Sl = null;
function kl() {
  Sl = Ln = Xo = null;
}
function Cl(e) {
  var t = Ko.current;
  te(Ko), (e._currentValue = t);
}
function Ps(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Jn(e, t) {
  (Xo = e),
    (Sl = Ln = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Oe = !0), (e.firstContext = null));
}
function et(e) {
  var t = e._currentValue;
  if (Sl !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Ln === null)) {
      if (Xo === null) throw Error(E(308));
      (Ln = e), (Xo.dependencies = { lanes: 0, firstContext: e });
    } else Ln = Ln.next = e;
  return t;
}
var dn = null;
function El(e) {
  dn === null ? (dn = [e]) : dn.push(e);
}
function Ou(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), El(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    It(e, r)
  );
}
function It(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var bt = !1;
function xl(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Lu(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Et(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Kt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), J & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      It(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), El(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    It(e, n)
  );
}
function Bo(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ul(e, n);
  }
}
function ba(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = s) : (i = i.next = s), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Wo(e, t, n, r) {
  var o = e.updateQueue;
  bt = !1;
  var i = o.firstBaseUpdate,
    s = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var a = l,
      u = a.next;
    (a.next = null), s === null ? (i = u) : (s.next = u), (s = a);
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (l = f.lastBaseUpdate),
      l !== s &&
        (l === null ? (f.firstBaseUpdate = u) : (l.next = u),
        (f.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var h = o.baseState;
    (s = 0), (f = u = a = null), (l = i);
    do {
      var m = l.lane,
        v = l.eventTime;
      if ((r & m) === m) {
        f !== null &&
          (f = f.next =
            {
              eventTime: v,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var k = e,
            C = l;
          switch (((m = t), (v = n), C.tag)) {
            case 1:
              if (((k = C.payload), typeof k == "function")) {
                h = k.call(v, h, m);
                break e;
              }
              h = k;
              break e;
            case 3:
              k.flags = (k.flags & -65537) | 128;
            case 0:
              if (
                ((k = C.payload),
                (m = typeof k == "function" ? k.call(v, h, m) : k),
                m == null)
              )
                break e;
              h = le({}, h, m);
              break e;
            case 2:
              bt = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (m = o.effects),
          m === null ? (o.effects = [l]) : m.push(l));
      } else
        (v = {
          eventTime: v,
          lane: m,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          f === null ? ((u = f = v), (a = h)) : (f = f.next = v),
          (s |= m);
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        (m = l),
          (l = m.next),
          (m.next = null),
          (o.lastBaseUpdate = m),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (f === null && (a = h),
      (o.baseState = a),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = f),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (s |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (wn |= s), (e.lanes = s), (e.memoizedState = h);
  }
}
function Ua(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(E(191, o));
        o.call(r);
      }
    }
}
var to = {},
  At = nn(to),
  zr = nn(to),
  Fr = nn(to);
function fn(e) {
  if (e === to) throw Error(E(174));
  return e;
}
function Nl(e, t) {
  switch ((X(Fr, t), X(zr, e), X(At, to), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : us(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = us(t, e));
  }
  te(At), X(At, t);
}
function Zn() {
  te(At), te(zr), te(Fr);
}
function Qu(e) {
  fn(Fr.current);
  var t = fn(At.current),
    n = us(t, e.type);
  t !== n && (X(zr, e), X(At, n));
}
function Il(e) {
  zr.current === e && (te(At), te(zr));
}
var oe = nn(0);
function qo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Gi = [];
function Bl() {
  for (var e = 0; e < Gi.length; e++)
    Gi[e]._workInProgressVersionPrimary = null;
  Gi.length = 0;
}
var Ro = Rt.ReactCurrentDispatcher,
  Ji = Rt.ReactCurrentBatchConfig,
  vn = 0,
  se = null,
  Ae = null,
  we = null,
  Zo = !1,
  Nr = !1,
  Hr = 0,
  tp = 0;
function Ne() {
  throw Error(E(321));
}
function Rl(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!dt(e[n], t[n])) return !1;
  return !0;
}
function Pl(e, t, n, r, o, i) {
  if (
    ((vn = i),
    (se = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ro.current = e === null || e.memoizedState === null ? ip : sp),
    (e = n(r, o)),
    Nr)
  ) {
    i = 0;
    do {
      if (((Nr = !1), (Hr = 0), 25 <= i)) throw Error(E(301));
      (i += 1),
        (we = Ae = null),
        (t.updateQueue = null),
        (Ro.current = lp),
        (e = n(r, o));
    } while (Nr);
  }
  if (
    ((Ro.current = $o),
    (t = Ae !== null && Ae.next !== null),
    (vn = 0),
    (we = Ae = se = null),
    (Zo = !1),
    t)
  )
    throw Error(E(300));
  return e;
}
function _l() {
  var e = Hr !== 0;
  return (Hr = 0), e;
}
function pt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return we === null ? (se.memoizedState = we = e) : (we = we.next = e), we;
}
function tt() {
  if (Ae === null) {
    var e = se.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ae.next;
  var t = we === null ? se.memoizedState : we.next;
  if (t !== null) (we = t), (Ae = e);
  else {
    if (e === null) throw Error(E(310));
    (Ae = e),
      (e = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null,
      }),
      we === null ? (se.memoizedState = we = e) : (we = we.next = e);
  }
  return we;
}
function Vr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Yi(e) {
  var t = tt(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = Ae,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var s = o.next;
      (o.next = i.next), (i.next = s);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var l = (s = null),
      a = null,
      u = i;
    do {
      var f = u.lane;
      if ((vn & f) === f)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var h = {
          lane: f,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((l = a = h), (s = r)) : (a = a.next = h),
          (se.lanes |= f),
          (wn |= f);
      }
      u = u.next;
    } while (u !== null && u !== i);
    a === null ? (s = r) : (a.next = l),
      dt(r, t.memoizedState) || (Oe = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (se.lanes |= i), (wn |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ki(e) {
  var t = tt(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = (o = o.next);
    do (i = e(i, s.action)), (s = s.next);
    while (s !== o);
    dt(i, t.memoizedState) || (Oe = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function zu() {}
function Fu(e, t) {
  var n = se,
    r = tt(),
    o = t(),
    i = !dt(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (Oe = !0)),
    (r = r.queue),
    Tl(Gu.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (we !== null && we.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Gr(9, Vu.bind(null, n, r, o, t), void 0, null),
      Se === null)
    )
      throw Error(E(349));
    vn & 30 || Hu(n, t, o);
  }
  return o;
}
function Hu(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (se.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Vu(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Ju(t) && Yu(e);
}
function Gu(e, t, n) {
  return n(function () {
    Ju(t) && Yu(e);
  });
}
function Ju(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !dt(e, n);
  } catch {
    return !0;
  }
}
function Yu(e) {
  var t = It(e, 1);
  t !== null && ut(t, e, 1, -1);
}
function Oa(e) {
  var t = pt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = op.bind(null, se, e)),
    [t.memoizedState, e]
  );
}
function Gr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (se.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Ku() {
  return tt().memoizedState;
}
function Po(e, t, n, r) {
  var o = pt();
  (se.flags |= e),
    (o.memoizedState = Gr(1 | t, n, void 0, r === void 0 ? null : r));
}
function mi(e, t, n, r) {
  var o = tt();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Ae !== null) {
    var s = Ae.memoizedState;
    if (((i = s.destroy), r !== null && Rl(r, s.deps))) {
      o.memoizedState = Gr(t, n, i, r);
      return;
    }
  }
  (se.flags |= e), (o.memoizedState = Gr(1 | t, n, i, r));
}
function La(e, t) {
  return Po(8390656, 8, e, t);
}
function Tl(e, t) {
  return mi(2048, 8, e, t);
}
function Xu(e, t) {
  return mi(4, 2, e, t);
}
function Wu(e, t) {
  return mi(4, 4, e, t);
}
function qu(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Zu(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), mi(4, 4, qu.bind(null, t, e), n)
  );
}
function jl() {}
function $u(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Rl(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function ed(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Rl(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function td(e, t, n) {
  return vn & 21
    ? (dt(n, t) || ((n = su()), (se.lanes |= n), (wn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Oe = !0)), (e.memoizedState = n));
}
function np(e, t) {
  var n = Y;
  (Y = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Ji.transition;
  Ji.transition = {};
  try {
    e(!1), t();
  } finally {
    (Y = n), (Ji.transition = r);
  }
}
function nd() {
  return tt().memoizedState;
}
function rp(e, t, n) {
  var r = Wt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    rd(e))
  )
    od(t, n);
  else if (((n = Ou(e, t, n, r)), n !== null)) {
    var o = Te();
    ut(n, e, r, o), id(n, t, r);
  }
}
function op(e, t, n) {
  var r = Wt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (rd(e)) od(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var s = t.lastRenderedState,
          l = i(s, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), dt(l, s))) {
          var a = t.interleaved;
          a === null
            ? ((o.next = o), El(t))
            : ((o.next = a.next), (a.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = Ou(e, t, o, r)),
      n !== null && ((o = Te()), ut(n, e, r, o), id(n, t, r));
  }
}
function rd(e) {
  var t = e.alternate;
  return e === se || (t !== null && t === se);
}
function od(e, t) {
  Nr = Zo = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function id(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ul(e, n);
  }
}
var $o = {
    readContext: et,
    useCallback: Ne,
    useContext: Ne,
    useEffect: Ne,
    useImperativeHandle: Ne,
    useInsertionEffect: Ne,
    useLayoutEffect: Ne,
    useMemo: Ne,
    useReducer: Ne,
    useRef: Ne,
    useState: Ne,
    useDebugValue: Ne,
    useDeferredValue: Ne,
    useTransition: Ne,
    useMutableSource: Ne,
    useSyncExternalStore: Ne,
    useId: Ne,
    unstable_isNewReconciler: !1,
  },
  ip = {
    readContext: et,
    useCallback: function (e, t) {
      return (pt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: et,
    useEffect: La,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Po(4194308, 4, qu.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Po(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Po(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = pt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = pt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = rp.bind(null, se, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = pt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Oa,
    useDebugValue: jl,
    useDeferredValue: function (e) {
      return (pt().memoizedState = e);
    },
    useTransition: function () {
      var e = Oa(!1),
        t = e[0];
      return (e = np.bind(null, e[1])), (pt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = se,
        o = pt();
      if (re) {
        if (n === void 0) throw Error(E(407));
        n = n();
      } else {
        if (((n = t()), Se === null)) throw Error(E(349));
        vn & 30 || Hu(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        La(Gu.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Gr(9, Vu.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = pt(),
        t = Se.identifierPrefix;
      if (re) {
        var n = Ct,
          r = kt;
        (n = (r & ~(1 << (32 - ct(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Hr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = tp++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  sp = {
    readContext: et,
    useCallback: $u,
    useContext: et,
    useEffect: Tl,
    useImperativeHandle: Zu,
    useInsertionEffect: Xu,
    useLayoutEffect: Wu,
    useMemo: ed,
    useReducer: Yi,
    useRef: Ku,
    useState: function () {
      return Yi(Vr);
    },
    useDebugValue: jl,
    useDeferredValue: function (e) {
      var t = tt();
      return td(t, Ae.memoizedState, e);
    },
    useTransition: function () {
      var e = Yi(Vr)[0],
        t = tt().memoizedState;
      return [e, t];
    },
    useMutableSource: zu,
    useSyncExternalStore: Fu,
    useId: nd,
    unstable_isNewReconciler: !1,
  },
  lp = {
    readContext: et,
    useCallback: $u,
    useContext: et,
    useEffect: Tl,
    useImperativeHandle: Zu,
    useInsertionEffect: Xu,
    useLayoutEffect: Wu,
    useMemo: ed,
    useReducer: Ki,
    useRef: Ku,
    useState: function () {
      return Ki(Vr);
    },
    useDebugValue: jl,
    useDeferredValue: function (e) {
      var t = tt();
      return Ae === null ? (t.memoizedState = e) : td(t, Ae.memoizedState, e);
    },
    useTransition: function () {
      var e = Ki(Vr)[0],
        t = tt().memoizedState;
      return [e, t];
    },
    useMutableSource: zu,
    useSyncExternalStore: Fu,
    useId: nd,
    unstable_isNewReconciler: !1,
  };
function it(e, t) {
  if (e && e.defaultProps) {
    (t = le({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function _s(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : le({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ai = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? En(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      o = Wt(e),
      i = Et(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = Kt(e, i, o)),
      t !== null && (ut(t, e, o, r), Bo(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      o = Wt(e),
      i = Et(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = Kt(e, i, o)),
      t !== null && (ut(t, e, o, r), Bo(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Te(),
      r = Wt(e),
      o = Et(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = Kt(e, o, r)),
      t !== null && (ut(t, e, r, n), Bo(t, e, r));
  },
};
function Qa(e, t, n, r, o, i, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Ur(n, r) || !Ur(o, i)
      : !0
  );
}
function sd(e, t, n) {
  var r = !1,
    o = en,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = et(i))
      : ((o = Qe(t) ? An : Pe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? Xn(e, o) : en)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ai),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function za(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ai.enqueueReplaceState(t, t.state, null);
}
function Ts(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = {}), xl(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (o.context = et(i))
    : ((i = Qe(t) ? An : Pe.current), (o.context = Xn(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (_s(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Ai.enqueueReplaceState(o, o.state, null),
      Wo(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function $n(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Mf(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Xi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function js(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var ap = typeof WeakMap == "function" ? WeakMap : Map;
function ld(e, t, n) {
  (n = Et(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ti || ((ti = !0), (Hs = r)), js(e, t);
    }),
    n
  );
}
function ad(e, t, n) {
  (n = Et(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        js(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        js(e, t),
          typeof r != "function" &&
            (Xt === null ? (Xt = new Set([this])) : Xt.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function Fa(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new ap();
    var o = new Set();
    r.set(t, o);
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = kp.bind(null, e, t, n)), t.then(e, e));
}
function Ha(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Va(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Et(-1, 1)), (t.tag = 2), Kt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var cp = Rt.ReactCurrentOwner,
  Oe = !1;
function _e(e, t, n, r) {
  t.child = e === null ? Uu(t, null, n, r) : qn(t, e.child, n, r);
}
function Ga(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    Jn(t, o),
    (r = Pl(e, t, n, r, i, o)),
    (n = _l()),
    e !== null && !Oe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Bt(e, t, o))
      : (re && n && yl(t), (t.flags |= 1), _e(e, t, r, o), t.child)
  );
}
function Ja(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !zl(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), cd(e, t, i, r, o))
      : ((e = Do(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var s = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Ur), n(s, r) && e.ref === t.ref)
    )
      return Bt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = qt(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function cd(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Ur(i, r) && e.ref === t.ref)
      if (((Oe = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (Oe = !0);
      else return (t.lanes = e.lanes), Bt(e, t, o);
  }
  return Ds(e, t, n, r, o);
}
function ud(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        X(zn, Fe),
        (Fe |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          X(zn, Fe),
          (Fe |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        X(zn, Fe),
        (Fe |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      X(zn, Fe),
      (Fe |= r);
  return _e(e, t, o, n), t.child;
}
function dd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ds(e, t, n, r, o) {
  var i = Qe(n) ? An : Pe.current;
  return (
    (i = Xn(t, i)),
    Jn(t, o),
    (n = Pl(e, t, n, r, i, o)),
    (r = _l()),
    e !== null && !Oe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Bt(e, t, o))
      : (re && r && yl(t), (t.flags |= 1), _e(e, t, n, o), t.child)
  );
}
function Ya(e, t, n, r, o) {
  if (Qe(n)) {
    var i = !0;
    Go(t);
  } else i = !1;
  if ((Jn(t, o), t.stateNode === null))
    _o(e, t), sd(t, n, r), Ts(t, n, r, o), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = et(u))
      : ((u = Qe(n) ? An : Pe.current), (u = Xn(t, u)));
    var f = n.getDerivedStateFromProps,
      h =
        typeof f == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    h ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== r || a !== u) && za(t, s, r, u)),
      (bt = !1);
    var m = t.memoizedState;
    (s.state = m),
      Wo(t, r, s, o),
      (a = t.memoizedState),
      l !== r || m !== a || Le.current || bt
        ? (typeof f == "function" && (_s(t, n, f, r), (a = t.memoizedState)),
          (l = bt || Qa(t, n, l, r, m, a, u))
            ? (h ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = u),
          (r = l))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Lu(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : it(t.type, l)),
      (s.props = u),
      (h = t.pendingProps),
      (m = s.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = et(a))
        : ((a = Qe(n) ? An : Pe.current), (a = Xn(t, a)));
    var v = n.getDerivedStateFromProps;
    (f =
      typeof v == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== h || m !== a) && za(t, s, r, a)),
      (bt = !1),
      (m = t.memoizedState),
      (s.state = m),
      Wo(t, r, s, o);
    var k = t.memoizedState;
    l !== h || m !== k || Le.current || bt
      ? (typeof v == "function" && (_s(t, n, v, r), (k = t.memoizedState)),
        (u = bt || Qa(t, n, u, r, m, k, a) || !1)
          ? (f ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, k, a),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, k, a)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (l === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = k)),
        (s.props = r),
        (s.state = k),
        (s.context = a),
        (r = u))
      : (typeof s.componentDidUpdate != "function" ||
          (l === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ms(e, t, n, r, i, o);
}
function Ms(e, t, n, r, o, i) {
  dd(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return o && Ta(t, n, !1), Bt(e, t, i);
  (r = t.stateNode), (cp.current = t);
  var l =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = qn(t, e.child, null, i)), (t.child = qn(t, null, l, i)))
      : _e(e, t, l, i),
    (t.memoizedState = r.state),
    o && Ta(t, n, !0),
    t.child
  );
}
function fd(e) {
  var t = e.stateNode;
  t.pendingContext
    ? _a(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && _a(e, t.context, !1),
    Nl(e, t.containerInfo);
}
function Ka(e, t, n, r, o) {
  return Wn(), wl(o), (t.flags |= 256), _e(e, t, n, r), t.child;
}
var bs = { dehydrated: null, treeContext: null, retryLane: 0 };
function Us(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function hd(e, t, n) {
  var r = t.pendingProps,
    o = oe.current,
    i = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    X(oe, o & 1),
    e === null)
  )
    return (
      Rs(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = s))
                : (i = wi(s, r, 0, null)),
              (e = pn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Us(n)),
              (t.memoizedState = bs),
              e)
            : Dl(t, s))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return up(e, t, s, r, l, o, n);
  if (i) {
    (i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = qt(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = qt(l, i)) : ((i = pn(i, s, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Us(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (i.memoizedState = s),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = bs),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = qt(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Dl(e, t) {
  return (
    (t = wi({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function yo(e, t, n, r) {
  return (
    r !== null && wl(r),
    qn(t, e.child, null, n),
    (e = Dl(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function up(e, t, n, r, o, i, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Xi(Error(E(422)))), yo(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (o = t.mode),
        (r = wi({ mode: "visible", children: r.children }, o, 0, null)),
        (i = pn(i, o, s, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && qn(t, e.child, null, s),
        (t.child.memoizedState = Us(s)),
        (t.memoizedState = bs),
        i);
  if (!(t.mode & 1)) return yo(e, t, s, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (i = Error(E(419))), (r = Xi(i, r, void 0)), yo(e, t, s, r);
  }
  if (((l = (s & e.childLanes) !== 0), Oe || l)) {
    if (((r = Se), r !== null)) {
      switch (s & -s) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (r.suspendedLanes | s) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), It(e, o), ut(r, e, o, -1));
    }
    return Ql(), (r = Xi(Error(E(421)))), yo(e, t, s, r);
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Cp.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (He = Yt(o.nextSibling)),
      (Ge = t),
      (re = !0),
      (lt = null),
      e !== null &&
        ((We[qe++] = kt),
        (We[qe++] = Ct),
        (We[qe++] = yn),
        (kt = e.id),
        (Ct = e.overflow),
        (yn = t)),
      (t = Dl(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Xa(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ps(e.return, t, n);
}
function Wi(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function pd(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((_e(e, t, r.children, n), (r = oe.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Xa(e, n, t);
        else if (e.tag === 19) Xa(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((X(oe, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && qo(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          Wi(t, !1, o, n, i);
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && qo(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        Wi(t, !0, n, null, i);
        break;
      case "together":
        Wi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function _o(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Bt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (wn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(E(153));
  if (t.child !== null) {
    for (
      e = t.child, n = qt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = qt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function dp(e, t, n) {
  switch (t.tag) {
    case 3:
      fd(t), Wn();
      break;
    case 5:
      Qu(t);
      break;
    case 1:
      Qe(t.type) && Go(t);
      break;
    case 4:
      Nl(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      X(Ko, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (X(oe, oe.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? hd(e, t, n)
          : (X(oe, oe.current & 1),
            (e = Bt(e, t, n)),
            e !== null ? e.sibling : null);
      X(oe, oe.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return pd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        X(oe, oe.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), ud(e, t, n);
  }
  return Bt(e, t, n);
}
var gd, Os, md, Ad;
gd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Os = function () {};
md = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), fn(At.current);
    var i = null;
    switch (n) {
      case "input":
        (o = ss(e, o)), (r = ss(e, r)), (i = []);
        break;
      case "select":
        (o = le({}, o, { value: void 0 })),
          (r = le({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (o = cs(e, o)), (r = cs(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Ho);
    }
    ds(n, r);
    var s;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var l = o[u];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Pr.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in a)
              a.hasOwnProperty(s) &&
                l[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else n || (i || (i = []), i.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (i = i || []).push(u, a))
            : u === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (i = i || []).push(u, "" + a)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (Pr.hasOwnProperty(u)
                ? (a != null && u === "onScroll" && $("scroll", e),
                  i || l === a || (i = []))
                : (i = i || []).push(u, a));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Ad = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function pr(e, t) {
  if (!re)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Ie(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function fp(e, t, n) {
  var r = t.pendingProps;
  switch ((vl(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Ie(t), null;
    case 1:
      return Qe(t.type) && Vo(), Ie(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Zn(),
        te(Le),
        te(Pe),
        Bl(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (mo(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), lt !== null && (Js(lt), (lt = null)))),
        Os(e, t),
        Ie(t),
        null
      );
    case 5:
      Il(t);
      var o = fn(Fr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        md(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(E(166));
          return Ie(t), null;
        }
        if (((e = fn(At.current)), mo(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[gt] = t), (r[Qr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              $("cancel", r), $("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              $("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < vr.length; o++) $(vr[o], r);
              break;
            case "source":
              $("error", r);
              break;
            case "img":
            case "image":
            case "link":
              $("error", r), $("load", r);
              break;
            case "details":
              $("toggle", r);
              break;
            case "input":
              oa(r, i), $("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                $("invalid", r);
              break;
            case "textarea":
              sa(r, i), $("invalid", r);
          }
          ds(n, i), (o = null);
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var l = i[s];
              s === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 &&
                      go(r.textContent, l, e),
                    (o = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (i.suppressHydrationWarning !== !0 &&
                      go(r.textContent, l, e),
                    (o = ["children", "" + l]))
                : Pr.hasOwnProperty(s) &&
                  l != null &&
                  s === "onScroll" &&
                  $("scroll", r);
            }
          switch (n) {
            case "input":
              so(r), ia(r, i, !0);
              break;
            case "textarea":
              so(r), la(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Ho);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Gc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = s.createElement(n, { is: r.is }))
                : ((e = s.createElement(n)),
                  n === "select" &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[gt] = t),
            (e[Qr] = r),
            gd(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = fs(n, r)), n)) {
              case "dialog":
                $("cancel", e), $("close", e), (o = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                $("load", e), (o = r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < vr.length; o++) $(vr[o], e);
                o = r;
                break;
              case "source":
                $("error", e), (o = r);
                break;
              case "img":
              case "image":
              case "link":
                $("error", e), $("load", e), (o = r);
                break;
              case "details":
                $("toggle", e), (o = r);
                break;
              case "input":
                oa(e, r), (o = ss(e, r)), $("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = le({}, r, { value: void 0 })),
                  $("invalid", e);
                break;
              case "textarea":
                sa(e, r), (o = cs(e, r)), $("invalid", e);
                break;
              default:
                o = r;
            }
            ds(n, o), (l = o);
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var a = l[i];
                i === "style"
                  ? Kc(e, a)
                  : i === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && Jc(e, a))
                  : i === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && _r(e, a)
                    : typeof a == "number" && _r(e, "" + a)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (Pr.hasOwnProperty(i)
                      ? a != null && i === "onScroll" && $("scroll", e)
                      : a != null && ol(e, i, a, s));
              }
            switch (n) {
              case "input":
                so(e), ia(e, r, !1);
                break;
              case "textarea":
                so(e), la(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + $t(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Fn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Fn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = Ho);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Ie(t), null;
    case 6:
      if (e && t.stateNode != null) Ad(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(E(166));
        if (((n = fn(Fr.current)), fn(At.current), mo(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[gt] = t),
            (i = r.nodeValue !== n) && ((e = Ge), e !== null))
          )
            switch (e.tag) {
              case 3:
                go(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  go(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[gt] = t),
            (t.stateNode = r);
      }
      return Ie(t), null;
    case 13:
      if (
        (te(oe),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (re && He !== null && t.mode & 1 && !(t.flags & 128))
          Mu(), Wn(), (t.flags |= 98560), (i = !1);
        else if (((i = mo(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(E(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(E(317));
            i[gt] = t;
          } else
            Wn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Ie(t), (i = !1);
        } else lt !== null && (Js(lt), (lt = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || oe.current & 1 ? ye === 0 && (ye = 3) : Ql())),
          t.updateQueue !== null && (t.flags |= 4),
          Ie(t),
          null);
    case 4:
      return (
        Zn(), Os(e, t), e === null && Or(t.stateNode.containerInfo), Ie(t), null
      );
    case 10:
      return Cl(t.type._context), Ie(t), null;
    case 17:
      return Qe(t.type) && Vo(), Ie(t), null;
    case 19:
      if ((te(oe), (i = t.memoizedState), i === null)) return Ie(t), null;
      if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (r) pr(i, !1);
        else {
          if (ye !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = qo(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    pr(i, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (s = i.alternate),
                    s === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = s.childLanes),
                        (i.lanes = s.lanes),
                        (i.child = s.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = s.memoizedProps),
                        (i.memoizedState = s.memoizedState),
                        (i.updateQueue = s.updateQueue),
                        (i.type = s.type),
                        (e = s.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return X(oe, (oe.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            de() > er &&
            ((t.flags |= 128), (r = !0), pr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = qo(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              pr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !s.alternate && !re)
            )
              return Ie(t), null;
          } else
            2 * de() - i.renderingStartTime > er &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), pr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = i.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (i.last = s));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = de()),
          (t.sibling = null),
          (n = oe.current),
          X(oe, r ? (n & 1) | 2 : n & 1),
          t)
        : (Ie(t), null);
    case 22:
    case 23:
      return (
        Ll(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Fe & 1073741824 && (Ie(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Ie(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(E(156, t.tag));
}
function hp(e, t) {
  switch ((vl(t), t.tag)) {
    case 1:
      return (
        Qe(t.type) && Vo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Zn(),
        te(Le),
        te(Pe),
        Bl(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Il(t), null;
    case 13:
      if (
        (te(oe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(E(340));
        Wn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return te(oe), null;
    case 4:
      return Zn(), null;
    case 10:
      return Cl(t.type._context), null;
    case 22:
    case 23:
      return Ll(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var vo = !1,
  Be = !1,
  pp = typeof WeakSet == "function" ? WeakSet : Set,
  T = null;
function Qn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ce(e, t, r);
      }
    else n.current = null;
}
function Ls(e, t, n) {
  try {
    n();
  } catch (r) {
    ce(e, t, r);
  }
}
var Wa = !1;
function gp(e, t) {
  if (((ks = Qo), (e = ku()), Al(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            u = 0,
            f = 0,
            h = e,
            m = null;
          t: for (;;) {
            for (
              var v;
              h !== n || (o !== 0 && h.nodeType !== 3) || (l = s + o),
                h !== i || (r !== 0 && h.nodeType !== 3) || (a = s + r),
                h.nodeType === 3 && (s += h.nodeValue.length),
                (v = h.firstChild) !== null;

            )
              (m = h), (h = v);
            for (;;) {
              if (h === e) break t;
              if (
                (m === n && ++u === o && (l = s),
                m === i && ++f === r && (a = s),
                (v = h.nextSibling) !== null)
              )
                break;
              (h = m), (m = h.parentNode);
            }
            h = v;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Cs = { focusedElem: e, selectionRange: n }, Qo = !1, T = t; T !== null; )
    if (((t = T), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (T = e);
    else
      for (; T !== null; ) {
        t = T;
        try {
          var k = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (k !== null) {
                  var C = k.memoizedProps,
                    x = k.memoizedState,
                    p = t.stateNode,
                    d = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? C : it(t.type, C),
                      x
                    );
                  p.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = "")
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(E(163));
            }
        } catch (y) {
          ce(t, t.return, y);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (T = e);
          break;
        }
        T = t.return;
      }
  return (k = Wa), (Wa = !1), k;
}
function Ir(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && Ls(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function yi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Qs(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function yd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), yd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[gt], delete t[Qr], delete t[Ns], delete t[qh], delete t[Zh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function vd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function qa(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || vd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function zs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ho));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (zs(e, t, n), e = e.sibling; e !== null; ) zs(e, t, n), (e = e.sibling);
}
function Fs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Fs(e, t, n), e = e.sibling; e !== null; ) Fs(e, t, n), (e = e.sibling);
}
var ke = null,
  st = !1;
function jt(e, t, n) {
  for (n = n.child; n !== null; ) wd(e, t, n), (n = n.sibling);
}
function wd(e, t, n) {
  if (mt && typeof mt.onCommitFiberUnmount == "function")
    try {
      mt.onCommitFiberUnmount(ui, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Be || Qn(n, t);
    case 6:
      var r = ke,
        o = st;
      (ke = null),
        jt(e, t, n),
        (ke = r),
        (st = o),
        ke !== null &&
          (st
            ? ((e = ke),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ke.removeChild(n.stateNode));
      break;
    case 18:
      ke !== null &&
        (st
          ? ((e = ke),
            (n = n.stateNode),
            e.nodeType === 8
              ? Hi(e.parentNode, n)
              : e.nodeType === 1 && Hi(e, n),
            Mr(e))
          : Hi(ke, n.stateNode));
      break;
    case 4:
      (r = ke),
        (o = st),
        (ke = n.stateNode.containerInfo),
        (st = !0),
        jt(e, t, n),
        (ke = r),
        (st = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Be &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            s = i.destroy;
          (i = i.tag),
            s !== void 0 && (i & 2 || i & 4) && Ls(n, t, s),
            (o = o.next);
        } while (o !== r);
      }
      jt(e, t, n);
      break;
    case 1:
      if (
        !Be &&
        (Qn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          ce(n, t, l);
        }
      jt(e, t, n);
      break;
    case 21:
      jt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Be = (r = Be) || n.memoizedState !== null), jt(e, t, n), (Be = r))
        : jt(e, t, n);
      break;
    default:
      jt(e, t, n);
  }
}
function Za(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new pp()),
      t.forEach(function (r) {
        var o = Ep.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function rt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (ke = l.stateNode), (st = !1);
              break e;
            case 3:
              (ke = l.stateNode.containerInfo), (st = !0);
              break e;
            case 4:
              (ke = l.stateNode.containerInfo), (st = !0);
              break e;
          }
          l = l.return;
        }
        if (ke === null) throw Error(E(160));
        wd(i, s, o), (ke = null), (st = !1);
        var a = o.alternate;
        a !== null && (a.return = null), (o.return = null);
      } catch (u) {
        ce(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Sd(t, e), (t = t.sibling);
}
function Sd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((rt(t, e), ht(e), r & 4)) {
        try {
          Ir(3, e, e.return), yi(3, e);
        } catch (C) {
          ce(e, e.return, C);
        }
        try {
          Ir(5, e, e.return);
        } catch (C) {
          ce(e, e.return, C);
        }
      }
      break;
    case 1:
      rt(t, e), ht(e), r & 512 && n !== null && Qn(n, n.return);
      break;
    case 5:
      if (
        (rt(t, e),
        ht(e),
        r & 512 && n !== null && Qn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          _r(o, "");
        } catch (C) {
          ce(e, e.return, C);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          s = n !== null ? n.memoizedProps : i,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === "input" && i.type === "radio" && i.name != null && Hc(o, i),
              fs(l, s);
            var u = fs(l, i);
            for (s = 0; s < a.length; s += 2) {
              var f = a[s],
                h = a[s + 1];
              f === "style"
                ? Kc(o, h)
                : f === "dangerouslySetInnerHTML"
                ? Jc(o, h)
                : f === "children"
                ? _r(o, h)
                : ol(o, f, h, u);
            }
            switch (l) {
              case "input":
                ls(o, i);
                break;
              case "textarea":
                Vc(o, i);
                break;
              case "select":
                var m = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var v = i.value;
                v != null
                  ? Fn(o, !!i.multiple, v, !1)
                  : m !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Fn(o, !!i.multiple, i.defaultValue, !0)
                      : Fn(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[Qr] = i;
          } catch (C) {
            ce(e, e.return, C);
          }
      }
      break;
    case 6:
      if ((rt(t, e), ht(e), r & 4)) {
        if (e.stateNode === null) throw Error(E(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (C) {
          ce(e, e.return, C);
        }
      }
      break;
    case 3:
      if (
        (rt(t, e), ht(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Mr(t.containerInfo);
        } catch (C) {
          ce(e, e.return, C);
        }
      break;
    case 4:
      rt(t, e), ht(e);
      break;
    case 13:
      rt(t, e),
        ht(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (Ul = de())),
        r & 4 && Za(e);
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Be = (u = Be) || f), rt(t, e), (Be = u)) : rt(t, e),
        ht(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !f && e.mode & 1)
        )
          for (T = e, f = e.child; f !== null; ) {
            for (h = T = f; T !== null; ) {
              switch (((m = T), (v = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ir(4, m, m.return);
                  break;
                case 1:
                  Qn(m, m.return);
                  var k = m.stateNode;
                  if (typeof k.componentWillUnmount == "function") {
                    (r = m), (n = m.return);
                    try {
                      (t = r),
                        (k.props = t.memoizedProps),
                        (k.state = t.memoizedState),
                        k.componentWillUnmount();
                    } catch (C) {
                      ce(r, n, C);
                    }
                  }
                  break;
                case 5:
                  Qn(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    ec(h);
                    continue;
                  }
              }
              v !== null ? ((v.return = m), (T = v)) : ec(h);
            }
            f = f.sibling;
          }
        e: for (f = null, h = e; ; ) {
          if (h.tag === 5) {
            if (f === null) {
              f = h;
              try {
                (o = h.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((l = h.stateNode),
                      (a = h.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = Yc("display", s)));
              } catch (C) {
                ce(e, e.return, C);
              }
            }
          } else if (h.tag === 6) {
            if (f === null)
              try {
                h.stateNode.nodeValue = u ? "" : h.memoizedProps;
              } catch (C) {
                ce(e, e.return, C);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            (h.child.return = h), (h = h.child);
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            f === h && (f = null), (h = h.return);
          }
          f === h && (f = null), (h.sibling.return = h.return), (h = h.sibling);
        }
      }
      break;
    case 19:
      rt(t, e), ht(e), r & 4 && Za(e);
      break;
    case 21:
      break;
    default:
      rt(t, e), ht(e);
  }
}
function ht(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (vd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(E(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (_r(o, ""), (r.flags &= -33));
          var i = qa(e);
          Fs(e, i, o);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = qa(e);
          zs(e, l, s);
          break;
        default:
          throw Error(E(161));
      }
    } catch (a) {
      ce(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function mp(e, t, n) {
  (T = e), kd(e);
}
function kd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; T !== null; ) {
    var o = T,
      i = o.child;
    if (o.tag === 22 && r) {
      var s = o.memoizedState !== null || vo;
      if (!s) {
        var l = o.alternate,
          a = (l !== null && l.memoizedState !== null) || Be;
        l = vo;
        var u = Be;
        if (((vo = s), (Be = a) && !u))
          for (T = o; T !== null; )
            (s = T),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? tc(o)
                : a !== null
                ? ((a.return = s), (T = a))
                : tc(o);
        for (; i !== null; ) (T = i), kd(i), (i = i.sibling);
        (T = o), (vo = l), (Be = u);
      }
      $a(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (T = i)) : $a(e);
  }
}
function $a(e) {
  for (; T !== null; ) {
    var t = T;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Be || yi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Be)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : it(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && Ua(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Ua(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var f = u.memoizedState;
                  if (f !== null) {
                    var h = f.dehydrated;
                    h !== null && Mr(h);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(E(163));
          }
        Be || (t.flags & 512 && Qs(t));
      } catch (m) {
        ce(t, t.return, m);
      }
    }
    if (t === e) {
      T = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (T = n);
      break;
    }
    T = t.return;
  }
}
function ec(e) {
  for (; T !== null; ) {
    var t = T;
    if (t === e) {
      T = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (T = n);
      break;
    }
    T = t.return;
  }
}
function tc(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            yi(4, t);
          } catch (a) {
            ce(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ce(t, o, a);
            }
          }
          var i = t.return;
          try {
            Qs(t);
          } catch (a) {
            ce(t, i, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Qs(t);
          } catch (a) {
            ce(t, s, a);
          }
      }
    } catch (a) {
      ce(t, t.return, a);
    }
    if (t === e) {
      T = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (T = l);
      break;
    }
    T = t.return;
  }
}
var Ap = Math.ceil,
  ei = Rt.ReactCurrentDispatcher,
  Ml = Rt.ReactCurrentOwner,
  $e = Rt.ReactCurrentBatchConfig,
  J = 0,
  Se = null,
  pe = null,
  Ce = 0,
  Fe = 0,
  zn = nn(0),
  ye = 0,
  Jr = null,
  wn = 0,
  vi = 0,
  bl = 0,
  Br = null,
  Ue = null,
  Ul = 0,
  er = 1 / 0,
  wt = null,
  ti = !1,
  Hs = null,
  Xt = null,
  wo = !1,
  zt = null,
  ni = 0,
  Rr = 0,
  Vs = null,
  To = -1,
  jo = 0;
function Te() {
  return J & 6 ? de() : To !== -1 ? To : (To = de());
}
function Wt(e) {
  return e.mode & 1
    ? J & 2 && Ce !== 0
      ? Ce & -Ce
      : ep.transition !== null
      ? (jo === 0 && (jo = su()), jo)
      : ((e = Y),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : hu(e.type))),
        e)
    : 1;
}
function ut(e, t, n, r) {
  if (50 < Rr) throw ((Rr = 0), (Vs = null), Error(E(185)));
  Zr(e, n, r),
    (!(J & 2) || e !== Se) &&
      (e === Se && (!(J & 2) && (vi |= n), ye === 4 && Ot(e, Ce)),
      ze(e, r),
      n === 1 && J === 0 && !(t.mode & 1) && ((er = de() + 500), gi && rn()));
}
function ze(e, t) {
  var n = e.callbackNode;
  eh(e, t);
  var r = Lo(e, e === Se ? Ce : 0);
  if (r === 0)
    n !== null && ua(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && ua(n), t === 1))
      e.tag === 0 ? $h(nc.bind(null, e)) : Tu(nc.bind(null, e)),
        Xh(function () {
          !(J & 6) && rn();
        }),
        (n = null);
    else {
      switch (lu(r)) {
        case 1:
          n = cl;
          break;
        case 4:
          n = ou;
          break;
        case 16:
          n = Oo;
          break;
        case 536870912:
          n = iu;
          break;
        default:
          n = Oo;
      }
      n = Pd(n, Cd.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Cd(e, t) {
  if (((To = -1), (jo = 0), J & 6)) throw Error(E(327));
  var n = e.callbackNode;
  if (Yn() && e.callbackNode !== n) return null;
  var r = Lo(e, e === Se ? Ce : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ri(e, r);
  else {
    t = r;
    var o = J;
    J |= 2;
    var i = xd();
    (Se !== e || Ce !== t) && ((wt = null), (er = de() + 500), hn(e, t));
    do
      try {
        wp();
        break;
      } catch (l) {
        Ed(e, l);
      }
    while (!0);
    kl(),
      (ei.current = i),
      (J = o),
      pe !== null ? (t = 0) : ((Se = null), (Ce = 0), (t = ye));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = As(e)), o !== 0 && ((r = o), (t = Gs(e, o)))), t === 1)
    )
      throw ((n = Jr), hn(e, 0), Ot(e, r), ze(e, de()), n);
    if (t === 6) Ot(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !yp(o) &&
          ((t = ri(e, r)),
          t === 2 && ((i = As(e)), i !== 0 && ((r = i), (t = Gs(e, i)))),
          t === 1))
      )
        throw ((n = Jr), hn(e, 0), Ot(e, r), ze(e, de()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(E(345));
        case 2:
          cn(e, Ue, wt);
          break;
        case 3:
          if (
            (Ot(e, r), (r & 130023424) === r && ((t = Ul + 500 - de()), 10 < t))
          ) {
            if (Lo(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              Te(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = xs(cn.bind(null, e, Ue, wt), t);
            break;
          }
          cn(e, Ue, wt);
          break;
        case 4:
          if ((Ot(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var s = 31 - ct(r);
            (i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i);
          }
          if (
            ((r = o),
            (r = de() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Ap(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = xs(cn.bind(null, e, Ue, wt), r);
            break;
          }
          cn(e, Ue, wt);
          break;
        case 5:
          cn(e, Ue, wt);
          break;
        default:
          throw Error(E(329));
      }
    }
  }
  return ze(e, de()), e.callbackNode === n ? Cd.bind(null, e) : null;
}
function Gs(e, t) {
  var n = Br;
  return (
    e.current.memoizedState.isDehydrated && (hn(e, t).flags |= 256),
    (e = ri(e, t)),
    e !== 2 && ((t = Ue), (Ue = n), t !== null && Js(t)),
    e
  );
}
function Js(e) {
  Ue === null ? (Ue = e) : Ue.push.apply(Ue, e);
}
function yp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!dt(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Ot(e, t) {
  for (
    t &= ~bl,
      t &= ~vi,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - ct(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function nc(e) {
  if (J & 6) throw Error(E(327));
  Yn();
  var t = Lo(e, 0);
  if (!(t & 1)) return ze(e, de()), null;
  var n = ri(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = As(e);
    r !== 0 && ((t = r), (n = Gs(e, r)));
  }
  if (n === 1) throw ((n = Jr), hn(e, 0), Ot(e, t), ze(e, de()), n);
  if (n === 6) throw Error(E(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    cn(e, Ue, wt),
    ze(e, de()),
    null
  );
}
function Ol(e, t) {
  var n = J;
  J |= 1;
  try {
    return e(t);
  } finally {
    (J = n), J === 0 && ((er = de() + 500), gi && rn());
  }
}
function Sn(e) {
  zt !== null && zt.tag === 0 && !(J & 6) && Yn();
  var t = J;
  J |= 1;
  var n = $e.transition,
    r = Y;
  try {
    if ((($e.transition = null), (Y = 1), e)) return e();
  } finally {
    (Y = r), ($e.transition = n), (J = t), !(J & 6) && rn();
  }
}
function Ll() {
  (Fe = zn.current), te(zn);
}
function hn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Kh(n)), pe !== null))
    for (n = pe.return; n !== null; ) {
      var r = n;
      switch ((vl(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Vo();
          break;
        case 3:
          Zn(), te(Le), te(Pe), Bl();
          break;
        case 5:
          Il(r);
          break;
        case 4:
          Zn();
          break;
        case 13:
          te(oe);
          break;
        case 19:
          te(oe);
          break;
        case 10:
          Cl(r.type._context);
          break;
        case 22:
        case 23:
          Ll();
      }
      n = n.return;
    }
  if (
    ((Se = e),
    (pe = e = qt(e.current, null)),
    (Ce = Fe = t),
    (ye = 0),
    (Jr = null),
    (bl = vi = wn = 0),
    (Ue = Br = null),
    dn !== null)
  ) {
    for (t = 0; t < dn.length; t++)
      if (((n = dn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var s = i.next;
          (i.next = o), (r.next = s);
        }
        n.pending = r;
      }
    dn = null;
  }
  return e;
}
function Ed(e, t) {
  do {
    var n = pe;
    try {
      if ((kl(), (Ro.current = $o), Zo)) {
        for (var r = se.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        Zo = !1;
      }
      if (
        ((vn = 0),
        (we = Ae = se = null),
        (Nr = !1),
        (Hr = 0),
        (Ml.current = null),
        n === null || n.return === null)
      ) {
        (ye = 1), (Jr = t), (pe = null);
        break;
      }
      e: {
        var i = e,
          s = n.return,
          l = n,
          a = t;
        if (
          ((t = Ce),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            f = l,
            h = f.tag;
          if (!(f.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var m = f.alternate;
            m
              ? ((f.updateQueue = m.updateQueue),
                (f.memoizedState = m.memoizedState),
                (f.lanes = m.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var v = Ha(s);
          if (v !== null) {
            (v.flags &= -257),
              Va(v, s, l, i, t),
              v.mode & 1 && Fa(i, u, t),
              (t = v),
              (a = u);
            var k = t.updateQueue;
            if (k === null) {
              var C = new Set();
              C.add(a), (t.updateQueue = C);
            } else k.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Fa(i, u, t), Ql();
              break e;
            }
            a = Error(E(426));
          }
        } else if (re && l.mode & 1) {
          var x = Ha(s);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Va(x, s, l, i, t),
              wl($n(a, l));
            break e;
          }
        }
        (i = a = $n(a, l)),
          ye !== 4 && (ye = 2),
          Br === null ? (Br = [i]) : Br.push(i),
          (i = s);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var p = ld(i, a, t);
              ba(i, p);
              break e;
            case 1:
              l = a;
              var d = i.type,
                g = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof d.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (Xt === null || !Xt.has(g))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var y = ad(i, l, t);
                ba(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Id(n);
    } catch (I) {
      (t = I), pe === n && n !== null && (pe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function xd() {
  var e = ei.current;
  return (ei.current = $o), e === null ? $o : e;
}
function Ql() {
  (ye === 0 || ye === 3 || ye === 2) && (ye = 4),
    Se === null || (!(wn & 268435455) && !(vi & 268435455)) || Ot(Se, Ce);
}
function ri(e, t) {
  var n = J;
  J |= 2;
  var r = xd();
  (Se !== e || Ce !== t) && ((wt = null), hn(e, t));
  do
    try {
      vp();
      break;
    } catch (o) {
      Ed(e, o);
    }
  while (!0);
  if ((kl(), (J = n), (ei.current = r), pe !== null)) throw Error(E(261));
  return (Se = null), (Ce = 0), ye;
}
function vp() {
  for (; pe !== null; ) Nd(pe);
}
function wp() {
  for (; pe !== null && !Gf(); ) Nd(pe);
}
function Nd(e) {
  var t = Rd(e.alternate, e, Fe);
  (e.memoizedProps = e.pendingProps),
    t === null ? Id(e) : (pe = t),
    (Ml.current = null);
}
function Id(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = hp(n, t)), n !== null)) {
        (n.flags &= 32767), (pe = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ye = 6), (pe = null);
        return;
      }
    } else if (((n = fp(n, t, Fe)), n !== null)) {
      pe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      pe = t;
      return;
    }
    pe = t = e;
  } while (t !== null);
  ye === 0 && (ye = 5);
}
function cn(e, t, n) {
  var r = Y,
    o = $e.transition;
  try {
    ($e.transition = null), (Y = 1), Sp(e, t, n, r);
  } finally {
    ($e.transition = o), (Y = r);
  }
  return null;
}
function Sp(e, t, n, r) {
  do Yn();
  while (zt !== null);
  if (J & 6) throw Error(E(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(E(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (th(e, i),
    e === Se && ((pe = Se = null), (Ce = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      wo ||
      ((wo = !0),
      Pd(Oo, function () {
        return Yn(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = $e.transition), ($e.transition = null);
    var s = Y;
    Y = 1;
    var l = J;
    (J |= 4),
      (Ml.current = null),
      gp(e, n),
      Sd(n, e),
      zh(Cs),
      (Qo = !!ks),
      (Cs = ks = null),
      (e.current = n),
      mp(n),
      Jf(),
      (J = l),
      (Y = s),
      ($e.transition = i);
  } else e.current = n;
  if (
    (wo && ((wo = !1), (zt = e), (ni = o)),
    (i = e.pendingLanes),
    i === 0 && (Xt = null),
    Xf(n.stateNode),
    ze(e, de()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
  if (ti) throw ((ti = !1), (e = Hs), (Hs = null), e);
  return (
    ni & 1 && e.tag !== 0 && Yn(),
    (i = e.pendingLanes),
    i & 1 ? (e === Vs ? Rr++ : ((Rr = 0), (Vs = e))) : (Rr = 0),
    rn(),
    null
  );
}
function Yn() {
  if (zt !== null) {
    var e = lu(ni),
      t = $e.transition,
      n = Y;
    try {
      if ((($e.transition = null), (Y = 16 > e ? 16 : e), zt === null))
        var r = !1;
      else {
        if (((e = zt), (zt = null), (ni = 0), J & 6)) throw Error(E(331));
        var o = J;
        for (J |= 4, T = e.current; T !== null; ) {
          var i = T,
            s = i.child;
          if (T.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (T = u; T !== null; ) {
                  var f = T;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ir(8, f, i);
                  }
                  var h = f.child;
                  if (h !== null) (h.return = f), (T = h);
                  else
                    for (; T !== null; ) {
                      f = T;
                      var m = f.sibling,
                        v = f.return;
                      if ((yd(f), f === u)) {
                        T = null;
                        break;
                      }
                      if (m !== null) {
                        (m.return = v), (T = m);
                        break;
                      }
                      T = v;
                    }
                }
              }
              var k = i.alternate;
              if (k !== null) {
                var C = k.child;
                if (C !== null) {
                  k.child = null;
                  do {
                    var x = C.sibling;
                    (C.sibling = null), (C = x);
                  } while (C !== null);
                }
              }
              T = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) (s.return = i), (T = s);
          else
            e: for (; T !== null; ) {
              if (((i = T), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ir(9, i, i.return);
                }
              var p = i.sibling;
              if (p !== null) {
                (p.return = i.return), (T = p);
                break e;
              }
              T = i.return;
            }
        }
        var d = e.current;
        for (T = d; T !== null; ) {
          s = T;
          var g = s.child;
          if (s.subtreeFlags & 2064 && g !== null) (g.return = s), (T = g);
          else
            e: for (s = d; T !== null; ) {
              if (((l = T), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      yi(9, l);
                  }
                } catch (I) {
                  ce(l, l.return, I);
                }
              if (l === s) {
                T = null;
                break e;
              }
              var y = l.sibling;
              if (y !== null) {
                (y.return = l.return), (T = y);
                break e;
              }
              T = l.return;
            }
        }
        if (
          ((J = o), rn(), mt && typeof mt.onPostCommitFiberRoot == "function")
        )
          try {
            mt.onPostCommitFiberRoot(ui, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (Y = n), ($e.transition = t);
    }
  }
  return !1;
}
function rc(e, t, n) {
  (t = $n(n, t)),
    (t = ld(e, t, 1)),
    (e = Kt(e, t, 1)),
    (t = Te()),
    e !== null && (Zr(e, 1, t), ze(e, t));
}
function ce(e, t, n) {
  if (e.tag === 3) rc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        rc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Xt === null || !Xt.has(r)))
        ) {
          (e = $n(n, e)),
            (e = ad(t, e, 1)),
            (t = Kt(t, e, 1)),
            (e = Te()),
            t !== null && (Zr(t, 1, e), ze(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function kp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Te()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Se === e &&
      (Ce & n) === n &&
      (ye === 4 || (ye === 3 && (Ce & 130023424) === Ce && 500 > de() - Ul)
        ? hn(e, 0)
        : (bl |= n)),
    ze(e, t);
}
function Bd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = co), (co <<= 1), !(co & 130023424) && (co = 4194304))
      : (t = 1));
  var n = Te();
  (e = It(e, t)), e !== null && (Zr(e, t, n), ze(e, n));
}
function Cp(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Bd(e, n);
}
function Ep(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(E(314));
  }
  r !== null && r.delete(t), Bd(e, n);
}
var Rd;
Rd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Le.current) Oe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Oe = !1), dp(e, t, n);
      Oe = !!(e.flags & 131072);
    }
  else (Oe = !1), re && t.flags & 1048576 && ju(t, Yo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      _o(e, t), (e = t.pendingProps);
      var o = Xn(t, Pe.current);
      Jn(t, n), (o = Pl(null, t, r, e, o, n));
      var i = _l();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Qe(r) ? ((i = !0), Go(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            xl(t),
            (o.updater = Ai),
            (t.stateNode = o),
            (o._reactInternals = t),
            Ts(t, r, e, n),
            (t = Ms(null, t, r, !0, i, n)))
          : ((t.tag = 0), re && i && yl(t), _e(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (_o(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = Np(r)),
          (e = it(r, e)),
          o)
        ) {
          case 0:
            t = Ds(null, t, r, e, n);
            break e;
          case 1:
            t = Ya(null, t, r, e, n);
            break e;
          case 11:
            t = Ga(null, t, r, e, n);
            break e;
          case 14:
            t = Ja(null, t, r, it(r.type, e), n);
            break e;
        }
        throw Error(E(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : it(r, o)),
        Ds(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : it(r, o)),
        Ya(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((fd(t), e === null)) throw Error(E(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          Lu(e, t),
          Wo(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = $n(Error(E(423)), t)), (t = Ka(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = $n(Error(E(424)), t)), (t = Ka(e, t, r, n, o));
            break e;
          } else
            for (
              He = Yt(t.stateNode.containerInfo.firstChild),
                Ge = t,
                re = !0,
                lt = null,
                n = Uu(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Wn(), r === o)) {
            t = Bt(e, t, n);
            break e;
          }
          _e(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Qu(t),
        e === null && Rs(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (s = o.children),
        Es(r, o) ? (s = null) : i !== null && Es(r, i) && (t.flags |= 32),
        dd(e, t),
        _e(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && Rs(t), null;
    case 13:
      return hd(e, t, n);
    case 4:
      return (
        Nl(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = qn(t, null, r, n)) : _e(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : it(r, o)),
        Ga(e, t, r, o, n)
      );
    case 7:
      return _e(e, t, t.pendingProps, n), t.child;
    case 8:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (s = o.value),
          X(Ko, r._currentValue),
          (r._currentValue = s),
          i !== null)
        )
          if (dt(i.value, s)) {
            if (i.children === o.children && !Le.current) {
              t = Bt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var l = i.dependencies;
              if (l !== null) {
                s = i.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      (a = Et(-1, n & -n)), (a.tag = 2);
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var f = u.pending;
                        f === null
                          ? (a.next = a)
                          : ((a.next = f.next), (f.next = a)),
                          (u.pending = a);
                      }
                    }
                    (i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      Ps(i.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((s = i.return), s === null)) throw Error(E(341));
                (s.lanes |= n),
                  (l = s.alternate),
                  l !== null && (l.lanes |= n),
                  Ps(s, n, t),
                  (s = i.sibling);
              } else s = i.child;
              if (s !== null) s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((i = s.sibling), i !== null)) {
                    (i.return = s.return), (s = i);
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        _e(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Jn(t, n),
        (o = et(o)),
        (r = r(o)),
        (t.flags |= 1),
        _e(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = it(r, t.pendingProps)),
        (o = it(r.type, o)),
        Ja(e, t, r, o, n)
      );
    case 15:
      return cd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : it(r, o)),
        _o(e, t),
        (t.tag = 1),
        Qe(r) ? ((e = !0), Go(t)) : (e = !1),
        Jn(t, n),
        sd(t, r, o),
        Ts(t, r, o, n),
        Ms(null, t, r, !0, e, n)
      );
    case 19:
      return pd(e, t, n);
    case 22:
      return ud(e, t, n);
  }
  throw Error(E(156, t.tag));
};
function Pd(e, t) {
  return ru(e, t);
}
function xp(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ze(e, t, n, r) {
  return new xp(e, t, n, r);
}
function zl(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Np(e) {
  if (typeof e == "function") return zl(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === sl)) return 11;
    if (e === ll) return 14;
  }
  return 2;
}
function qt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ze(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Do(e, t, n, r, o, i) {
  var s = 2;
  if (((r = e), typeof e == "function")) zl(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case _n:
        return pn(n.children, o, i, t);
      case il:
        (s = 8), (o |= 8);
        break;
      case ns:
        return (
          (e = Ze(12, n, t, o | 2)), (e.elementType = ns), (e.lanes = i), e
        );
      case rs:
        return (e = Ze(13, n, t, o)), (e.elementType = rs), (e.lanes = i), e;
      case os:
        return (e = Ze(19, n, t, o)), (e.elementType = os), (e.lanes = i), e;
      case Qc:
        return wi(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Oc:
              s = 10;
              break e;
            case Lc:
              s = 9;
              break e;
            case sl:
              s = 11;
              break e;
            case ll:
              s = 14;
              break e;
            case Mt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(E(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ze(s, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function pn(e, t, n, r) {
  return (e = Ze(7, e, r, t)), (e.lanes = n), e;
}
function wi(e, t, n, r) {
  return (
    (e = Ze(22, e, r, t)),
    (e.elementType = Qc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function qi(e, t, n) {
  return (e = Ze(6, e, null, t)), (e.lanes = n), e;
}
function Zi(e, t, n) {
  return (
    (t = Ze(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Ip(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ti(0)),
    (this.expirationTimes = Ti(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ti(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function Fl(e, t, n, r, o, i, s, l, a) {
  return (
    (e = new Ip(e, t, n, l, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Ze(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    xl(i),
    e
  );
}
function Bp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Pn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function _d(e) {
  if (!e) return en;
  e = e._reactInternals;
  e: {
    if (En(e) !== e || e.tag !== 1) throw Error(E(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Qe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(E(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Qe(n)) return _u(e, n, t);
  }
  return t;
}
function Td(e, t, n, r, o, i, s, l, a) {
  return (
    (e = Fl(n, r, !0, e, o, i, s, l, a)),
    (e.context = _d(null)),
    (n = e.current),
    (r = Te()),
    (o = Wt(n)),
    (i = Et(r, o)),
    (i.callback = t ?? null),
    Kt(n, i, o),
    (e.current.lanes = o),
    Zr(e, o, r),
    ze(e, r),
    e
  );
}
function Si(e, t, n, r) {
  var o = t.current,
    i = Te(),
    s = Wt(o);
  return (
    (n = _d(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Et(i, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Kt(o, t, s)),
    e !== null && (ut(e, o, s, i), Bo(e, o, s)),
    s
  );
}
function oi(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function oc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Hl(e, t) {
  oc(e, t), (e = e.alternate) && oc(e, t);
}
function Rp() {
  return null;
}
var jd =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Vl(e) {
  this._internalRoot = e;
}
ki.prototype.render = Vl.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(E(409));
  Si(e, t, null, null);
};
ki.prototype.unmount = Vl.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Sn(function () {
      Si(null, e, null, null);
    }),
      (t[Nt] = null);
  }
};
function ki(e) {
  this._internalRoot = e;
}
ki.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = uu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ut.length && t !== 0 && t < Ut[n].priority; n++);
    Ut.splice(n, 0, e), n === 0 && fu(e);
  }
};
function Gl(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ci(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function ic() {}
function Pp(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = oi(s);
        i.call(u);
      };
    }
    var s = Td(t, r, e, 0, null, !1, !1, "", ic);
    return (
      (e._reactRootContainer = s),
      (e[Nt] = s.current),
      Or(e.nodeType === 8 ? e.parentNode : e),
      Sn(),
      s
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = oi(a);
      l.call(u);
    };
  }
  var a = Fl(e, 0, !1, null, null, !1, !1, "", ic);
  return (
    (e._reactRootContainer = a),
    (e[Nt] = a.current),
    Or(e.nodeType === 8 ? e.parentNode : e),
    Sn(function () {
      Si(t, a, n, r);
    }),
    a
  );
}
function Ei(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof o == "function") {
      var l = o;
      o = function () {
        var a = oi(s);
        l.call(a);
      };
    }
    Si(t, s, e, o);
  } else s = Pp(n, t, e, o, r);
  return oi(s);
}
au = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = yr(t.pendingLanes);
        n !== 0 &&
          (ul(t, n | 1), ze(t, de()), !(J & 6) && ((er = de() + 500), rn()));
      }
      break;
    case 13:
      Sn(function () {
        var r = It(e, 1);
        if (r !== null) {
          var o = Te();
          ut(r, e, 1, o);
        }
      }),
        Hl(e, 1);
  }
};
dl = function (e) {
  if (e.tag === 13) {
    var t = It(e, 134217728);
    if (t !== null) {
      var n = Te();
      ut(t, e, 134217728, n);
    }
    Hl(e, 134217728);
  }
};
cu = function (e) {
  if (e.tag === 13) {
    var t = Wt(e),
      n = It(e, t);
    if (n !== null) {
      var r = Te();
      ut(n, e, t, r);
    }
    Hl(e, t);
  }
};
uu = function () {
  return Y;
};
du = function (e, t) {
  var n = Y;
  try {
    return (Y = e), t();
  } finally {
    Y = n;
  }
};
ps = function (e, t, n) {
  switch (t) {
    case "input":
      if ((ls(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = pi(r);
            if (!o) throw Error(E(90));
            Fc(r), ls(r, o);
          }
        }
      }
      break;
    case "textarea":
      Vc(e, n);
      break;
    case "select":
      (t = n.value), t != null && Fn(e, !!n.multiple, t, !1);
  }
};
qc = Ol;
Zc = Sn;
var _p = { usingClientEntryPoint: !1, Events: [eo, Mn, pi, Xc, Wc, Ol] },
  gr = {
    findFiberByHostInstance: un,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Tp = {
    bundleType: gr.bundleType,
    version: gr.version,
    rendererPackageName: gr.rendererPackageName,
    rendererConfig: gr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Rt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = tu(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: gr.findFiberByHostInstance || Rp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var So = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!So.isDisabled && So.supportsFiber)
    try {
      (ui = So.inject(Tp)), (mt = So);
    } catch {}
}
Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _p;
Ye.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Gl(t)) throw Error(E(200));
  return Bp(e, t, null, n);
};
Ye.createRoot = function (e, t) {
  if (!Gl(e)) throw Error(E(299));
  var n = !1,
    r = "",
    o = jd;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Fl(e, 1, !1, null, null, n, !1, r, o)),
    (e[Nt] = t.current),
    Or(e.nodeType === 8 ? e.parentNode : e),
    new Vl(t)
  );
};
Ye.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(E(188))
      : ((e = Object.keys(e).join(",")), Error(E(268, e)));
  return (e = tu(t)), (e = e === null ? null : e.stateNode), e;
};
Ye.flushSync = function (e) {
  return Sn(e);
};
Ye.hydrate = function (e, t, n) {
  if (!Ci(t)) throw Error(E(200));
  return Ei(null, e, t, !0, n);
};
Ye.hydrateRoot = function (e, t, n) {
  if (!Gl(e)) throw Error(E(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    s = jd;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = Td(t, null, e, 1, n ?? null, o, !1, i, s)),
    (e[Nt] = t.current),
    Or(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new ki(t);
};
Ye.render = function (e, t, n) {
  if (!Ci(t)) throw Error(E(200));
  return Ei(null, e, t, !1, n);
};
Ye.unmountComponentAtNode = function (e) {
  if (!Ci(e)) throw Error(E(40));
  return e._reactRootContainer
    ? (Sn(function () {
        Ei(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Nt] = null);
        });
      }),
      !0)
    : !1;
};
Ye.unstable_batchedUpdates = Ol;
Ye.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ci(n)) throw Error(E(200));
  if (e == null || e._reactInternals === void 0) throw Error(E(38));
  return Ei(e, t, n, !1, r);
};
Ye.version = "18.3.1-next-f1338f8080-20240426";
function Dd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Dd);
    } catch (e) {
      console.error(e);
    }
}
Dd(), (Dc.exports = Ye);
var jp = Dc.exports,
  Md,
  sc = jp;
(Md = sc.createRoot), sc.hydrateRoot;
/**
 * @remix-run/router v1.19.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Yr() {
  return (
    (Yr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Yr.apply(this, arguments)
  );
}
var Ft;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Ft || (Ft = {}));
const lc = "popstate";
function Dp(e) {
  e === void 0 && (e = {});
  function t(r, o) {
    let { pathname: i, search: s, hash: l } = r.location;
    return Ys(
      "",
      { pathname: i, search: s, hash: l },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default"
    );
  }
  function n(r, o) {
    return typeof o == "string" ? o : ii(o);
  }
  return bp(t, n, null, e);
}
function ge(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function bd(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Mp() {
  return Math.random().toString(36).substr(2, 8);
}
function ac(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Ys(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Yr(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? sr(t) : t,
      { state: n, key: (t && t.key) || r || Mp() }
    )
  );
}
function ii(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function sr(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function bp(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: i = !1 } = r,
    s = o.history,
    l = Ft.Pop,
    a = null,
    u = f();
  u == null && ((u = 0), s.replaceState(Yr({}, s.state, { idx: u }), ""));
  function f() {
    return (s.state || { idx: null }).idx;
  }
  function h() {
    l = Ft.Pop;
    let x = f(),
      p = x == null ? null : x - u;
    (u = x), a && a({ action: l, location: C.location, delta: p });
  }
  function m(x, p) {
    l = Ft.Push;
    let d = Ys(C.location, x, p);
    u = f() + 1;
    let g = ac(d, u),
      y = C.createHref(d);
    try {
      s.pushState(g, "", y);
    } catch (I) {
      if (I instanceof DOMException && I.name === "DataCloneError") throw I;
      o.location.assign(y);
    }
    i && a && a({ action: l, location: C.location, delta: 1 });
  }
  function v(x, p) {
    l = Ft.Replace;
    let d = Ys(C.location, x, p);
    u = f();
    let g = ac(d, u),
      y = C.createHref(d);
    s.replaceState(g, "", y),
      i && a && a({ action: l, location: C.location, delta: 0 });
  }
  function k(x) {
    let p = o.location.origin !== "null" ? o.location.origin : o.location.href,
      d = typeof x == "string" ? x : ii(x);
    return (
      (d = d.replace(/ $/, "%20")),
      ge(
        p,
        "No window.location.(origin|href) available to create URL for href: " +
          d
      ),
      new URL(d, p)
    );
  }
  let C = {
    get action() {
      return l;
    },
    get location() {
      return e(o, s);
    },
    listen(x) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(lc, h),
        (a = x),
        () => {
          o.removeEventListener(lc, h), (a = null);
        }
      );
    },
    createHref(x) {
      return t(o, x);
    },
    createURL: k,
    encodeLocation(x) {
      let p = k(x);
      return { pathname: p.pathname, search: p.search, hash: p.hash };
    },
    push: m,
    replace: v,
    go(x) {
      return s.go(x);
    },
  };
  return C;
}
var cc;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(cc || (cc = {}));
function Up(e, t, n) {
  return n === void 0 && (n = "/"), Op(e, t, n, !1);
}
function Op(e, t, n, r) {
  let o = typeof t == "string" ? sr(t) : t,
    i = Jl(o.pathname || "/", n);
  if (i == null) return null;
  let s = Ud(e);
  Lp(s);
  let l = null;
  for (let a = 0; l == null && a < s.length; ++a) {
    let u = Wp(i);
    l = Kp(s[a], u, r);
  }
  return l;
}
function Ud(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let o = (i, s, l) => {
    let a = {
      relativePath: l === void 0 ? i.path || "" : l,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: s,
      route: i,
    };
    a.relativePath.startsWith("/") &&
      (ge(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let u = Zt([r, a.relativePath]),
      f = n.concat(a);
    i.children &&
      i.children.length > 0 &&
      (ge(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".')
      ),
      Ud(i.children, t, f, u)),
      !(i.path == null && !i.index) &&
        t.push({ path: u, score: Jp(u, i.index), routesMeta: f });
  };
  return (
    e.forEach((i, s) => {
      var l;
      if (i.path === "" || !((l = i.path) != null && l.includes("?"))) o(i, s);
      else for (let a of Od(i.path)) o(i, s, a);
    }),
    t
  );
}
function Od(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    o = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return o ? [i, ""] : [i];
  let s = Od(r.join("/")),
    l = [];
  return (
    l.push(...s.map((a) => (a === "" ? i : [i, a].join("/")))),
    o && l.push(...s),
    l.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function Lp(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Yp(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const Qp = /^:[\w-]+$/,
  zp = 3,
  Fp = 2,
  Hp = 1,
  Vp = 10,
  Gp = -2,
  uc = (e) => e === "*";
function Jp(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(uc) && (r += Gp),
    t && (r += Fp),
    n
      .filter((o) => !uc(o))
      .reduce((o, i) => o + (Qp.test(i) ? zp : i === "" ? Hp : Vp), r)
  );
}
function Yp(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Kp(e, t, n) {
  let { routesMeta: r } = e,
    o = {},
    i = "/",
    s = [];
  for (let l = 0; l < r.length; ++l) {
    let a = r[l],
      u = l === r.length - 1,
      f = i === "/" ? t : t.slice(i.length) || "/",
      h = dc(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        f
      ),
      m = a.route;
    if (
      (!h &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (h = dc(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          f
        )),
      !h)
    )
      return null;
    Object.assign(o, h.params),
      s.push({
        params: o,
        pathname: Zt([i, h.pathname]),
        pathnameBase: eg(Zt([i, h.pathnameBase])),
        route: m,
      }),
      h.pathnameBase !== "/" && (i = Zt([i, h.pathnameBase]));
  }
  return s;
}
function dc(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Xp(e.path, e.caseSensitive, e.end),
    o = t.match(n);
  if (!o) return null;
  let i = o[0],
    s = i.replace(/(.)\/+$/, "$1"),
    l = o.slice(1);
  return {
    params: r.reduce((u, f, h) => {
      let { paramName: m, isOptional: v } = f;
      if (m === "*") {
        let C = l[h] || "";
        s = i.slice(0, i.length - C.length).replace(/(.)\/+$/, "$1");
      }
      const k = l[h];
      return (
        v && !k ? (u[m] = void 0) : (u[m] = (k || "").replace(/%2F/g, "/")), u
      );
    }, {}),
    pathname: i,
    pathnameBase: s,
    pattern: e,
  };
}
function Xp(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    bd(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, l, a) => (
            r.push({ paramName: l, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (o += "\\/*$")
      : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, t ? void 0 : "i"), r]
  );
}
function Wp(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      bd(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Jl(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function qp(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: o = "",
  } = typeof e == "string" ? sr(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Zp(n, t)) : t,
    search: tg(r),
    hash: ng(o),
  };
}
function Zp(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function $i(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function $p(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function Ld(e, t) {
  let n = $p(e);
  return t
    ? n.map((r, o) => (o === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Qd(e, t, n, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == "string"
    ? (o = sr(e))
    : ((o = Yr({}, e)),
      ge(
        !o.pathname || !o.pathname.includes("?"),
        $i("?", "pathname", "search", o)
      ),
      ge(
        !o.pathname || !o.pathname.includes("#"),
        $i("#", "pathname", "hash", o)
      ),
      ge(!o.search || !o.search.includes("#"), $i("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "",
    s = i ? "/" : o.pathname,
    l;
  if (s == null) l = n;
  else {
    let h = t.length - 1;
    if (!r && s.startsWith("..")) {
      let m = s.split("/");
      for (; m[0] === ".."; ) m.shift(), (h -= 1);
      o.pathname = m.join("/");
    }
    l = h >= 0 ? t[h] : "/";
  }
  let a = qp(o, l),
    u = s && s !== "/" && s.endsWith("/"),
    f = (i || s === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (u || f) && (a.pathname += "/"), a;
}
const Zt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  eg = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  tg = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  ng = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function rg(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const zd = ["post", "put", "patch", "delete"];
new Set(zd);
const og = ["get", ...zd];
new Set(og);
/**
 * React Router v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Kr() {
  return (
    (Kr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Kr.apply(this, arguments)
  );
}
const Yl = A.createContext(null),
  ig = A.createContext(null),
  xn = A.createContext(null),
  xi = A.createContext(null),
  Nn = A.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Fd = A.createContext(null);
function sg(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  no() || ge(!1);
  let { basename: r, navigator: o } = A.useContext(xn),
    { hash: i, pathname: s, search: l } = Vd(e, { relative: n }),
    a = s;
  return (
    r !== "/" && (a = s === "/" ? r : Zt([r, s])),
    o.createHref({ pathname: a, search: l, hash: i })
  );
}
function no() {
  return A.useContext(xi) != null;
}
function lr() {
  return no() || ge(!1), A.useContext(xi).location;
}
function Hd(e) {
  A.useContext(xn).static || A.useLayoutEffect(e);
}
function on() {
  let { isDataRoute: e } = A.useContext(Nn);
  return e ? vg() : lg();
}
function lg() {
  no() || ge(!1);
  let e = A.useContext(Yl),
    { basename: t, future: n, navigator: r } = A.useContext(xn),
    { matches: o } = A.useContext(Nn),
    { pathname: i } = lr(),
    s = JSON.stringify(Ld(o, n.v7_relativeSplatPath)),
    l = A.useRef(!1);
  return (
    Hd(() => {
      l.current = !0;
    }),
    A.useCallback(
      function (u, f) {
        if ((f === void 0 && (f = {}), !l.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let h = Qd(u, JSON.parse(s), i, f.relative === "path");
        e == null &&
          t !== "/" &&
          (h.pathname = h.pathname === "/" ? t : Zt([t, h.pathname])),
          (f.replace ? r.replace : r.push)(h, f.state, f);
      },
      [t, r, s, i, e]
    )
  );
}
function Vd(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = A.useContext(xn),
    { matches: o } = A.useContext(Nn),
    { pathname: i } = lr(),
    s = JSON.stringify(Ld(o, r.v7_relativeSplatPath));
  return A.useMemo(() => Qd(e, JSON.parse(s), i, n === "path"), [e, s, i, n]);
}
function ag(e, t) {
  return cg(e, t);
}
function cg(e, t, n, r) {
  no() || ge(!1);
  let { navigator: o } = A.useContext(xn),
    { matches: i } = A.useContext(Nn),
    s = i[i.length - 1],
    l = s ? s.params : {};
  s && s.pathname;
  let a = s ? s.pathnameBase : "/";
  s && s.route;
  let u = lr(),
    f;
  if (t) {
    var h;
    let x = typeof t == "string" ? sr(t) : t;
    a === "/" || ((h = x.pathname) != null && h.startsWith(a)) || ge(!1),
      (f = x);
  } else f = u;
  let m = f.pathname || "/",
    v = m;
  if (a !== "/") {
    let x = a.replace(/^\//, "").split("/");
    v = "/" + m.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let k = Up(e, { pathname: v }),
    C = pg(
      k &&
        k.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, l, x.params),
            pathname: Zt([
              a,
              o.encodeLocation
                ? o.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? a
                : Zt([
                    a,
                    o.encodeLocation
                      ? o.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          })
        ),
      i,
      n,
      r
    );
  return t && C
    ? A.createElement(
        xi.Provider,
        {
          value: {
            location: Kr(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              f
            ),
            navigationType: Ft.Pop,
          },
        },
        C
      )
    : C;
}
function ug() {
  let e = yg(),
    t = rg(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    o = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return A.createElement(
    A.Fragment,
    null,
    A.createElement("h2", null, "Unexpected Application Error!"),
    A.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? A.createElement("pre", { style: o }, n) : null,
    null
  );
}
const dg = A.createElement(ug, null);
class fg extends A.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? A.createElement(
          Nn.Provider,
          { value: this.props.routeContext },
          A.createElement(Fd.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function hg(e) {
  let { routeContext: t, match: n, children: r } = e,
    o = A.useContext(Yl);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = n.route.id),
    A.createElement(Nn.Provider, { value: t }, r)
  );
}
function pg(e, t, n, r) {
  var o;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let s = e,
    l = (o = n) == null ? void 0 : o.errors;
  if (l != null) {
    let f = s.findIndex(
      (h) => h.route.id && (l == null ? void 0 : l[h.route.id]) !== void 0
    );
    f >= 0 || ge(!1), (s = s.slice(0, Math.min(s.length, f + 1)));
  }
  let a = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < s.length; f++) {
      let h = s[f];
      if (
        ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (u = f),
        h.route.id)
      ) {
        let { loaderData: m, errors: v } = n,
          k =
            h.route.loader &&
            m[h.route.id] === void 0 &&
            (!v || v[h.route.id] === void 0);
        if (h.route.lazy || k) {
          (a = !0), u >= 0 ? (s = s.slice(0, u + 1)) : (s = [s[0]]);
          break;
        }
      }
    }
  return s.reduceRight((f, h, m) => {
    let v,
      k = !1,
      C = null,
      x = null;
    n &&
      ((v = l && h.route.id ? l[h.route.id] : void 0),
      (C = h.route.errorElement || dg),
      a &&
        (u < 0 && m === 0
          ? ((k = !0), (x = null))
          : u === m &&
            ((k = !0), (x = h.route.hydrateFallbackElement || null))));
    let p = t.concat(s.slice(0, m + 1)),
      d = () => {
        let g;
        return (
          v
            ? (g = C)
            : k
            ? (g = x)
            : h.route.Component
            ? (g = A.createElement(h.route.Component, null))
            : h.route.element
            ? (g = h.route.element)
            : (g = f),
          A.createElement(hg, {
            match: h,
            routeContext: { outlet: f, matches: p, isDataRoute: n != null },
            children: g,
          })
        );
      };
    return n && (h.route.ErrorBoundary || h.route.errorElement || m === 0)
      ? A.createElement(fg, {
          location: n.location,
          revalidation: n.revalidation,
          component: C,
          error: v,
          children: d(),
          routeContext: { outlet: null, matches: p, isDataRoute: !0 },
        })
      : d();
  }, null);
}
var Gd = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Gd || {}),
  si = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(si || {});
function gg(e) {
  let t = A.useContext(Yl);
  return t || ge(!1), t;
}
function mg(e) {
  let t = A.useContext(ig);
  return t || ge(!1), t;
}
function Ag(e) {
  let t = A.useContext(Nn);
  return t || ge(!1), t;
}
function Jd(e) {
  let t = Ag(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || ge(!1), n.route.id;
}
function yg() {
  var e;
  let t = A.useContext(Fd),
    n = mg(si.UseRouteError),
    r = Jd(si.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function vg() {
  let { router: e } = gg(Gd.UseNavigateStable),
    t = Jd(si.UseNavigateStable),
    n = A.useRef(!1);
  return (
    Hd(() => {
      n.current = !0;
    }),
    A.useCallback(
      function (o, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof o == "number"
              ? e.navigate(o)
              : e.navigate(o, Kr({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
function Lt(e) {
  ge(!1);
}
function wg(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: o = Ft.Pop,
    navigator: i,
    static: s = !1,
    future: l,
  } = e;
  no() && ge(!1);
  let a = t.replace(/^\/*/, "/"),
    u = A.useMemo(
      () => ({
        basename: a,
        navigator: i,
        static: s,
        future: Kr({ v7_relativeSplatPath: !1 }, l),
      }),
      [a, l, i, s]
    );
  typeof r == "string" && (r = sr(r));
  let {
      pathname: f = "/",
      search: h = "",
      hash: m = "",
      state: v = null,
      key: k = "default",
    } = r,
    C = A.useMemo(() => {
      let x = Jl(f, a);
      return x == null
        ? null
        : {
            location: { pathname: x, search: h, hash: m, state: v, key: k },
            navigationType: o,
          };
    }, [a, f, h, m, v, k, o]);
  return C == null
    ? null
    : A.createElement(
        xn.Provider,
        { value: u },
        A.createElement(xi.Provider, { children: n, value: C })
      );
}
function Yd(e) {
  let { children: t, location: n } = e;
  return ag(Ks(t), n);
}
new Promise(() => {});
function Ks(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    A.Children.forEach(e, (r, o) => {
      if (!A.isValidElement(r)) return;
      let i = [...t, o];
      if (r.type === A.Fragment) {
        n.push.apply(n, Ks(r.props.children, i));
        return;
      }
      r.type !== Lt && ge(!1), !r.props.index || !r.props.children || ge(!1);
      let s = {
        id: r.props.id || i.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (s.children = Ks(r.props.children, i)), n.push(s);
    }),
    n
  );
}
/**
 * React Router DOM v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Xs() {
  return (
    (Xs = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Xs.apply(this, arguments)
  );
}
function Sg(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function kg(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Cg(e, t) {
  return e.button === 0 && (!t || t === "_self") && !kg(e);
}
const Eg = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  xg = "6";
try {
  window.__reactRouterVersion = xg;
} catch {}
const Ng = "startTransition",
  fc = kf[Ng];
function Ig(e) {
  let { basename: t, children: n, future: r, window: o } = e,
    i = A.useRef();
  i.current == null && (i.current = Dp({ window: o, v5Compat: !0 }));
  let s = i.current,
    [l, a] = A.useState({ action: s.action, location: s.location }),
    { v7_startTransition: u } = r || {},
    f = A.useCallback(
      (h) => {
        u && fc ? fc(() => a(h)) : a(h);
      },
      [a, u]
    );
  return (
    A.useLayoutEffect(() => s.listen(f), [s, f]),
    A.createElement(wg, {
      basename: t,
      children: n,
      location: l.location,
      navigationType: l.action,
      navigator: s,
      future: r,
    })
  );
}
const Bg =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Rg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  wr = A.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: o,
        reloadDocument: i,
        replace: s,
        state: l,
        target: a,
        to: u,
        preventScrollReset: f,
        unstable_viewTransition: h,
      } = t,
      m = Sg(t, Eg),
      { basename: v } = A.useContext(xn),
      k,
      C = !1;
    if (typeof u == "string" && Rg.test(u) && ((k = u), Bg))
      try {
        let g = new URL(window.location.href),
          y = u.startsWith("//") ? new URL(g.protocol + u) : new URL(u),
          I = Jl(y.pathname, v);
        y.origin === g.origin && I != null
          ? (u = I + y.search + y.hash)
          : (C = !0);
      } catch {}
    let x = sg(u, { relative: o }),
      p = Pg(u, {
        replace: s,
        state: l,
        target: a,
        preventScrollReset: f,
        relative: o,
        unstable_viewTransition: h,
      });
    function d(g) {
      r && r(g), g.defaultPrevented || p(g);
    }
    return A.createElement(
      "a",
      Xs({}, m, { href: k || x, onClick: C || i ? r : d, ref: n, target: a })
    );
  });
var hc;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(hc || (hc = {}));
var pc;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(pc || (pc = {}));
function Pg(e, t) {
  let {
      target: n,
      replace: r,
      state: o,
      preventScrollReset: i,
      relative: s,
      unstable_viewTransition: l,
    } = t === void 0 ? {} : t,
    a = on(),
    u = lr(),
    f = Vd(e, { relative: s });
  return A.useCallback(
    (h) => {
      if (Cg(h, n)) {
        h.preventDefault();
        let m = r !== void 0 ? r : ii(u) === ii(f);
        a(e, {
          replace: m,
          state: o,
          preventScrollReset: i,
          relative: s,
          unstable_viewTransition: l,
        });
      }
    },
    [u, a, f, r, o, n, e, i, s, l]
  );
}
const Pt = A.createContext(null);
function _g({ children: e }) {
  const [t, n] = A.useState(null),
    r = (o) => {
      n((i) => ({
        ...i,
        wins: o.wins,
        losses: o.losses,
        color: o.color,
        ability: o.ability,
      }));
    };
  return (
    A.useEffect(() => {}, [t]),
    c.jsx(Pt.Provider, {
      value: { playerData: t, setPlayerData: n, setPlayerDataFields: r },
      children: e,
    })
  );
}
class gn extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(`${t}: Status code '${n}'`),
      (this.statusCode = n),
      (this.__proto__ = r);
  }
}
class Kl extends Error {
  constructor(t = "A timeout occurred.") {
    const n = new.target.prototype;
    super(t), (this.__proto__ = n);
  }
}
class at extends Error {
  constructor(t = "An abort occurred.") {
    const n = new.target.prototype;
    super(t), (this.__proto__ = n);
  }
}
class Tg extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t),
      (this.transport = n),
      (this.errorType = "UnsupportedTransportError"),
      (this.__proto__ = r);
  }
}
class jg extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t),
      (this.transport = n),
      (this.errorType = "DisabledTransportError"),
      (this.__proto__ = r);
  }
}
class Dg extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t),
      (this.transport = n),
      (this.errorType = "FailedToStartTransportError"),
      (this.__proto__ = r);
  }
}
class gc extends Error {
  constructor(t) {
    const n = new.target.prototype;
    super(t),
      (this.errorType = "FailedToNegotiateWithServerError"),
      (this.__proto__ = n);
  }
}
class Mg extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t), (this.innerErrors = n), (this.__proto__ = r);
  }
}
class Kd {
  constructor(t, n, r) {
    (this.statusCode = t), (this.statusText = n), (this.content = r);
  }
}
class Ni {
  get(t, n) {
    return this.send({ ...n, method: "GET", url: t });
  }
  post(t, n) {
    return this.send({ ...n, method: "POST", url: t });
  }
  delete(t, n) {
    return this.send({ ...n, method: "DELETE", url: t });
  }
  getCookieString(t) {
    return "";
  }
}
var S;
(function (e) {
  (e[(e.Trace = 0)] = "Trace"),
    (e[(e.Debug = 1)] = "Debug"),
    (e[(e.Information = 2)] = "Information"),
    (e[(e.Warning = 3)] = "Warning"),
    (e[(e.Error = 4)] = "Error"),
    (e[(e.Critical = 5)] = "Critical"),
    (e[(e.None = 6)] = "None");
})(S || (S = {}));
class Xr {
  constructor() {}
  log(t, n) {}
}
Xr.instance = new Xr();
const bg = "8.0.7";
class he {
  static isRequired(t, n) {
    if (t == null) throw new Error(`The '${n}' argument is required.`);
  }
  static isNotEmpty(t, n) {
    if (!t || t.match(/^\s*$/))
      throw new Error(`The '${n}' argument should not be empty.`);
  }
  static isIn(t, n, r) {
    if (!(t in n)) throw new Error(`Unknown ${r} value: ${t}.`);
  }
}
class ie {
  static get isBrowser() {
    return (
      !ie.isNode &&
      typeof window == "object" &&
      typeof window.document == "object"
    );
  }
  static get isWebWorker() {
    return !ie.isNode && typeof self == "object" && "importScripts" in self;
  }
  static get isReactNative() {
    return (
      !ie.isNode && typeof window == "object" && typeof window.document > "u"
    );
  }
  static get isNode() {
    return (
      typeof process < "u" && process.release && process.release.name === "node"
    );
  }
}
function Wr(e, t) {
  let n = "";
  return (
    kn(e)
      ? ((n = `Binary data of length ${e.byteLength}`),
        t && (n += `. Content: '${Ug(e)}'`))
      : typeof e == "string" &&
        ((n = `String data of length ${e.length}`),
        t && (n += `. Content: '${e}'`)),
    n
  );
}
function Ug(e) {
  const t = new Uint8Array(e);
  let n = "";
  return (
    t.forEach((r) => {
      const o = r < 16 ? "0" : "";
      n += `0x${o}${r.toString(16)} `;
    }),
    n.substr(0, n.length - 1)
  );
}
function kn(e) {
  return (
    e &&
    typeof ArrayBuffer < "u" &&
    (e instanceof ArrayBuffer ||
      (e.constructor && e.constructor.name === "ArrayBuffer"))
  );
}
async function Xd(e, t, n, r, o, i) {
  const s = {},
    [l, a] = tr();
  (s[l] = a),
    e.log(
      S.Trace,
      `(${t} transport) sending data. ${Wr(o, i.logMessageContent)}.`
    );
  const u = kn(o) ? "arraybuffer" : "text",
    f = await n.post(r, {
      content: o,
      headers: { ...s, ...i.headers },
      responseType: u,
      timeout: i.timeout,
      withCredentials: i.withCredentials,
    });
  e.log(
    S.Trace,
    `(${t} transport) request complete. Response status: ${f.statusCode}.`
  );
}
function Og(e) {
  return e === void 0
    ? new li(S.Information)
    : e === null
    ? Xr.instance
    : e.log !== void 0
    ? e
    : new li(e);
}
class Lg {
  constructor(t, n) {
    (this._subject = t), (this._observer = n);
  }
  dispose() {
    const t = this._subject.observers.indexOf(this._observer);
    t > -1 && this._subject.observers.splice(t, 1),
      this._subject.observers.length === 0 &&
        this._subject.cancelCallback &&
        this._subject.cancelCallback().catch((n) => {});
  }
}
class li {
  constructor(t) {
    (this._minLevel = t), (this.out = console);
  }
  log(t, n) {
    if (t >= this._minLevel) {
      const r = `[${new Date().toISOString()}] ${S[t]}: ${n}`;
      switch (t) {
        case S.Critical:
        case S.Error:
          this.out.error(r);
          break;
        case S.Warning:
          this.out.warn(r);
          break;
        case S.Information:
          this.out.info(r);
          break;
        default:
          this.out.log(r);
          break;
      }
    }
  }
}
function tr() {
  let e = "X-SignalR-User-Agent";
  return ie.isNode && (e = "User-Agent"), [e, Qg(bg, zg(), Hg(), Fg())];
}
function Qg(e, t, n, r) {
  let o = "Microsoft SignalR/";
  const i = e.split(".");
  return (
    (o += `${i[0]}.${i[1]}`),
    (o += ` (${e}; `),
    t && t !== "" ? (o += `${t}; `) : (o += "Unknown OS; "),
    (o += `${n}`),
    r ? (o += `; ${r}`) : (o += "; Unknown Runtime Version"),
    (o += ")"),
    o
  );
}
function zg() {
  if (ie.isNode)
    switch (process.platform) {
      case "win32":
        return "Windows NT";
      case "darwin":
        return "macOS";
      case "linux":
        return "Linux";
      default:
        return process.platform;
    }
  else return "";
}
function Fg() {
  if (ie.isNode) return process.versions.node;
}
function Hg() {
  return ie.isNode ? "NodeJS" : "Browser";
}
function es(e) {
  return e.stack ? e.stack : e.message ? e.message : `${e}`;
}
function Vg() {
  if (typeof globalThis < "u") return globalThis;
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("could not find global");
}
class Gg extends Ni {
  constructor(t) {
    if ((super(), (this._logger = t), typeof fetch > "u" || ie.isNode)) {
      const n =
        typeof __webpack_require__ == "function"
          ? __non_webpack_require__
          : require;
      (this._jar = new (n("tough-cookie").CookieJar)()),
        typeof fetch > "u"
          ? (this._fetchType = n("node-fetch"))
          : (this._fetchType = fetch),
        (this._fetchType = n("fetch-cookie")(this._fetchType, this._jar));
    } else this._fetchType = fetch.bind(Vg());
    if (typeof AbortController > "u") {
      const n =
        typeof __webpack_require__ == "function"
          ? __non_webpack_require__
          : require;
      this._abortControllerType = n("abort-controller");
    } else this._abortControllerType = AbortController;
  }
  async send(t) {
    if (t.abortSignal && t.abortSignal.aborted) throw new at();
    if (!t.method) throw new Error("No method defined.");
    if (!t.url) throw new Error("No url defined.");
    const n = new this._abortControllerType();
    let r;
    t.abortSignal &&
      (t.abortSignal.onabort = () => {
        n.abort(), (r = new at());
      });
    let o = null;
    if (t.timeout) {
      const a = t.timeout;
      o = setTimeout(() => {
        n.abort(),
          this._logger.log(S.Warning, "Timeout from HTTP request."),
          (r = new Kl());
      }, a);
    }
    t.content === "" && (t.content = void 0),
      t.content &&
        ((t.headers = t.headers || {}),
        kn(t.content)
          ? (t.headers["Content-Type"] = "application/octet-stream")
          : (t.headers["Content-Type"] = "text/plain;charset=UTF-8"));
    let i;
    try {
      i = await this._fetchType(t.url, {
        body: t.content,
        cache: "no-cache",
        credentials: t.withCredentials === !0 ? "include" : "same-origin",
        headers: { "X-Requested-With": "XMLHttpRequest", ...t.headers },
        method: t.method,
        mode: "cors",
        redirect: "follow",
        signal: n.signal,
      });
    } catch (a) {
      throw (
        r || (this._logger.log(S.Warning, `Error from HTTP request. ${a}.`), a)
      );
    } finally {
      o && clearTimeout(o), t.abortSignal && (t.abortSignal.onabort = null);
    }
    if (!i.ok) {
      const a = await mc(i, "text");
      throw new gn(a || i.statusText, i.status);
    }
    const l = await mc(i, t.responseType);
    return new Kd(i.status, i.statusText, l);
  }
  getCookieString(t) {
    let n = "";
    return (
      ie.isNode &&
        this._jar &&
        this._jar.getCookies(t, (r, o) => (n = o.join("; "))),
      n
    );
  }
}
function mc(e, t) {
  let n;
  switch (t) {
    case "arraybuffer":
      n = e.arrayBuffer();
      break;
    case "text":
      n = e.text();
      break;
    case "blob":
    case "document":
    case "json":
      throw new Error(`${t} is not supported.`);
    default:
      n = e.text();
      break;
  }
  return n;
}
class Jg extends Ni {
  constructor(t) {
    super(), (this._logger = t);
  }
  send(t) {
    return t.abortSignal && t.abortSignal.aborted
      ? Promise.reject(new at())
      : t.method
      ? t.url
        ? new Promise((n, r) => {
            const o = new XMLHttpRequest();
            o.open(t.method, t.url, !0),
              (o.withCredentials =
                t.withCredentials === void 0 ? !0 : t.withCredentials),
              o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              t.content === "" && (t.content = void 0),
              t.content &&
                (kn(t.content)
                  ? o.setRequestHeader(
                      "Content-Type",
                      "application/octet-stream"
                    )
                  : o.setRequestHeader(
                      "Content-Type",
                      "text/plain;charset=UTF-8"
                    ));
            const i = t.headers;
            i &&
              Object.keys(i).forEach((s) => {
                o.setRequestHeader(s, i[s]);
              }),
              t.responseType && (o.responseType = t.responseType),
              t.abortSignal &&
                (t.abortSignal.onabort = () => {
                  o.abort(), r(new at());
                }),
              t.timeout && (o.timeout = t.timeout),
              (o.onload = () => {
                t.abortSignal && (t.abortSignal.onabort = null),
                  o.status >= 200 && o.status < 300
                    ? n(
                        new Kd(
                          o.status,
                          o.statusText,
                          o.response || o.responseText
                        )
                      )
                    : r(
                        new gn(
                          o.response || o.responseText || o.statusText,
                          o.status
                        )
                      );
              }),
              (o.onerror = () => {
                this._logger.log(
                  S.Warning,
                  `Error from HTTP request. ${o.status}: ${o.statusText}.`
                ),
                  r(new gn(o.statusText, o.status));
              }),
              (o.ontimeout = () => {
                this._logger.log(S.Warning, "Timeout from HTTP request."),
                  r(new Kl());
              }),
              o.send(t.content);
          })
        : Promise.reject(new Error("No url defined."))
      : Promise.reject(new Error("No method defined."));
  }
}
class Yg extends Ni {
  constructor(t) {
    if ((super(), typeof fetch < "u" || ie.isNode))
      this._httpClient = new Gg(t);
    else if (typeof XMLHttpRequest < "u") this._httpClient = new Jg(t);
    else throw new Error("No usable HttpClient found.");
  }
  send(t) {
    return t.abortSignal && t.abortSignal.aborted
      ? Promise.reject(new at())
      : t.method
      ? t.url
        ? this._httpClient.send(t)
        : Promise.reject(new Error("No url defined."))
      : Promise.reject(new Error("No method defined."));
  }
  getCookieString(t) {
    return this._httpClient.getCookieString(t);
  }
}
class Ve {
  static write(t) {
    return `${t}${Ve.RecordSeparator}`;
  }
  static parse(t) {
    if (t[t.length - 1] !== Ve.RecordSeparator)
      throw new Error("Message is incomplete.");
    const n = t.split(Ve.RecordSeparator);
    return n.pop(), n;
  }
}
Ve.RecordSeparatorCode = 30;
Ve.RecordSeparator = String.fromCharCode(Ve.RecordSeparatorCode);
class Kg {
  writeHandshakeRequest(t) {
    return Ve.write(JSON.stringify(t));
  }
  parseHandshakeResponse(t) {
    let n, r;
    if (kn(t)) {
      const l = new Uint8Array(t),
        a = l.indexOf(Ve.RecordSeparatorCode);
      if (a === -1) throw new Error("Message is incomplete.");
      const u = a + 1;
      (n = String.fromCharCode.apply(
        null,
        Array.prototype.slice.call(l.slice(0, u))
      )),
        (r = l.byteLength > u ? l.slice(u).buffer : null);
    } else {
      const l = t,
        a = l.indexOf(Ve.RecordSeparator);
      if (a === -1) throw new Error("Message is incomplete.");
      const u = a + 1;
      (n = l.substring(0, u)), (r = l.length > u ? l.substring(u) : null);
    }
    const o = Ve.parse(n),
      i = JSON.parse(o[0]);
    if (i.type)
      throw new Error("Expected a handshake response from the server.");
    return [r, i];
  }
}
var O;
(function (e) {
  (e[(e.Invocation = 1)] = "Invocation"),
    (e[(e.StreamItem = 2)] = "StreamItem"),
    (e[(e.Completion = 3)] = "Completion"),
    (e[(e.StreamInvocation = 4)] = "StreamInvocation"),
    (e[(e.CancelInvocation = 5)] = "CancelInvocation"),
    (e[(e.Ping = 6)] = "Ping"),
    (e[(e.Close = 7)] = "Close"),
    (e[(e.Ack = 8)] = "Ack"),
    (e[(e.Sequence = 9)] = "Sequence");
})(O || (O = {}));
class Xg {
  constructor() {
    this.observers = [];
  }
  next(t) {
    for (const n of this.observers) n.next(t);
  }
  error(t) {
    for (const n of this.observers) n.error && n.error(t);
  }
  complete() {
    for (const t of this.observers) t.complete && t.complete();
  }
  subscribe(t) {
    return this.observers.push(t), new Lg(this, t);
  }
}
class Wg {
  constructor(t, n, r) {
    (this._bufferSize = 1e5),
      (this._messages = []),
      (this._totalMessageCount = 0),
      (this._waitForSequenceMessage = !1),
      (this._nextReceivingSequenceId = 1),
      (this._latestReceivedSequenceId = 0),
      (this._bufferedByteCount = 0),
      (this._reconnectInProgress = !1),
      (this._protocol = t),
      (this._connection = n),
      (this._bufferSize = r);
  }
  async _send(t) {
    const n = this._protocol.writeMessage(t);
    let r = Promise.resolve();
    if (this._isInvocationMessage(t)) {
      this._totalMessageCount++;
      let o = () => {},
        i = () => {};
      kn(n)
        ? (this._bufferedByteCount += n.byteLength)
        : (this._bufferedByteCount += n.length),
        this._bufferedByteCount >= this._bufferSize &&
          (r = new Promise((s, l) => {
            (o = s), (i = l);
          })),
        this._messages.push(new qg(n, this._totalMessageCount, o, i));
    }
    try {
      this._reconnectInProgress || (await this._connection.send(n));
    } catch {
      this._disconnected();
    }
    await r;
  }
  _ack(t) {
    let n = -1;
    for (let r = 0; r < this._messages.length; r++) {
      const o = this._messages[r];
      if (o._id <= t.sequenceId)
        (n = r),
          kn(o._message)
            ? (this._bufferedByteCount -= o._message.byteLength)
            : (this._bufferedByteCount -= o._message.length),
          o._resolver();
      else if (this._bufferedByteCount < this._bufferSize) o._resolver();
      else break;
    }
    n !== -1 && (this._messages = this._messages.slice(n + 1));
  }
  _shouldProcessMessage(t) {
    if (this._waitForSequenceMessage)
      return t.type !== O.Sequence
        ? !1
        : ((this._waitForSequenceMessage = !1), !0);
    if (!this._isInvocationMessage(t)) return !0;
    const n = this._nextReceivingSequenceId;
    return (
      this._nextReceivingSequenceId++,
      n <= this._latestReceivedSequenceId
        ? (n === this._latestReceivedSequenceId && this._ackTimer(), !1)
        : ((this._latestReceivedSequenceId = n), this._ackTimer(), !0)
    );
  }
  _resetSequence(t) {
    if (t.sequenceId > this._nextReceivingSequenceId) {
      this._connection.stop(
        new Error("Sequence ID greater than amount of messages we've received.")
      );
      return;
    }
    this._nextReceivingSequenceId = t.sequenceId;
  }
  _disconnected() {
    (this._reconnectInProgress = !0), (this._waitForSequenceMessage = !0);
  }
  async _resend() {
    const t =
      this._messages.length !== 0
        ? this._messages[0]._id
        : this._totalMessageCount + 1;
    await this._connection.send(
      this._protocol.writeMessage({ type: O.Sequence, sequenceId: t })
    );
    const n = this._messages;
    for (const r of n) await this._connection.send(r._message);
    this._reconnectInProgress = !1;
  }
  _dispose(t) {
    t ?? (t = new Error("Unable to reconnect to server."));
    for (const n of this._messages) n._rejector(t);
  }
  _isInvocationMessage(t) {
    switch (t.type) {
      case O.Invocation:
      case O.StreamItem:
      case O.Completion:
      case O.StreamInvocation:
      case O.CancelInvocation:
        return !0;
      case O.Close:
      case O.Sequence:
      case O.Ping:
      case O.Ack:
        return !1;
    }
  }
  _ackTimer() {
    this._ackTimerHandle === void 0 &&
      (this._ackTimerHandle = setTimeout(async () => {
        try {
          this._reconnectInProgress ||
            (await this._connection.send(
              this._protocol.writeMessage({
                type: O.Ack,
                sequenceId: this._latestReceivedSequenceId,
              })
            ));
        } catch {}
        clearTimeout(this._ackTimerHandle), (this._ackTimerHandle = void 0);
      }, 1e3));
  }
}
class qg {
  constructor(t, n, r, o) {
    (this._message = t),
      (this._id = n),
      (this._resolver = r),
      (this._rejector = o);
  }
}
const Zg = 30 * 1e3,
  $g = 15 * 1e3,
  em = 1e5;
var ne;
(function (e) {
  (e.Disconnected = "Disconnected"),
    (e.Connecting = "Connecting"),
    (e.Connected = "Connected"),
    (e.Disconnecting = "Disconnecting"),
    (e.Reconnecting = "Reconnecting");
})(ne || (ne = {}));
class Xl {
  static create(t, n, r, o, i, s, l) {
    return new Xl(t, n, r, o, i, s, l);
  }
  constructor(t, n, r, o, i, s, l) {
    (this._nextKeepAlive = 0),
      (this._freezeEventListener = () => {
        this._logger.log(
          S.Warning,
          "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep"
        );
      }),
      he.isRequired(t, "connection"),
      he.isRequired(n, "logger"),
      he.isRequired(r, "protocol"),
      (this.serverTimeoutInMilliseconds = i ?? Zg),
      (this.keepAliveIntervalInMilliseconds = s ?? $g),
      (this._statefulReconnectBufferSize = l ?? em),
      (this._logger = n),
      (this._protocol = r),
      (this.connection = t),
      (this._reconnectPolicy = o),
      (this._handshakeProtocol = new Kg()),
      (this.connection.onreceive = (a) => this._processIncomingData(a)),
      (this.connection.onclose = (a) => this._connectionClosed(a)),
      (this._callbacks = {}),
      (this._methods = {}),
      (this._closedCallbacks = []),
      (this._reconnectingCallbacks = []),
      (this._reconnectedCallbacks = []),
      (this._invocationId = 0),
      (this._receivedHandshakeResponse = !1),
      (this._connectionState = ne.Disconnected),
      (this._connectionStarted = !1),
      (this._cachedPingMessage = this._protocol.writeMessage({ type: O.Ping }));
  }
  get state() {
    return this._connectionState;
  }
  get connectionId() {
    return (this.connection && this.connection.connectionId) || null;
  }
  get baseUrl() {
    return this.connection.baseUrl || "";
  }
  set baseUrl(t) {
    if (
      this._connectionState !== ne.Disconnected &&
      this._connectionState !== ne.Reconnecting
    )
      throw new Error(
        "The HubConnection must be in the Disconnected or Reconnecting state to change the url."
      );
    if (!t) throw new Error("The HubConnection url must be a valid url.");
    this.connection.baseUrl = t;
  }
  start() {
    return (
      (this._startPromise = this._startWithStateTransitions()),
      this._startPromise
    );
  }
  async _startWithStateTransitions() {
    if (this._connectionState !== ne.Disconnected)
      return Promise.reject(
        new Error(
          "Cannot start a HubConnection that is not in the 'Disconnected' state."
        )
      );
    (this._connectionState = ne.Connecting),
      this._logger.log(S.Debug, "Starting HubConnection.");
    try {
      await this._startInternal(),
        ie.isBrowser &&
          window.document.addEventListener("freeze", this._freezeEventListener),
        (this._connectionState = ne.Connected),
        (this._connectionStarted = !0),
        this._logger.log(S.Debug, "HubConnection connected successfully.");
    } catch (t) {
      return (
        (this._connectionState = ne.Disconnected),
        this._logger.log(
          S.Debug,
          `HubConnection failed to start successfully because of error '${t}'.`
        ),
        Promise.reject(t)
      );
    }
  }
  async _startInternal() {
    (this._stopDuringStartError = void 0),
      (this._receivedHandshakeResponse = !1);
    const t = new Promise((n, r) => {
      (this._handshakeResolver = n), (this._handshakeRejecter = r);
    });
    await this.connection.start(this._protocol.transferFormat);
    try {
      let n = this._protocol.version;
      this.connection.features.reconnect || (n = 1);
      const r = { protocol: this._protocol.name, version: n };
      if (
        (this._logger.log(S.Debug, "Sending handshake request."),
        await this._sendMessage(
          this._handshakeProtocol.writeHandshakeRequest(r)
        ),
        this._logger.log(
          S.Information,
          `Using HubProtocol '${this._protocol.name}'.`
        ),
        this._cleanupTimeout(),
        this._resetTimeoutPeriod(),
        this._resetKeepAliveInterval(),
        await t,
        this._stopDuringStartError)
      )
        throw this._stopDuringStartError;
      (this.connection.features.reconnect || !1) &&
        ((this._messageBuffer = new Wg(
          this._protocol,
          this.connection,
          this._statefulReconnectBufferSize
        )),
        (this.connection.features.disconnected =
          this._messageBuffer._disconnected.bind(this._messageBuffer)),
        (this.connection.features.resend = () => {
          if (this._messageBuffer) return this._messageBuffer._resend();
        })),
        this.connection.features.inherentKeepAlive ||
          (await this._sendMessage(this._cachedPingMessage));
    } catch (n) {
      throw (
        (this._logger.log(
          S.Debug,
          `Hub handshake failed with error '${n}' during start(). Stopping HubConnection.`
        ),
        this._cleanupTimeout(),
        this._cleanupPingTimer(),
        await this.connection.stop(n),
        n)
      );
    }
  }
  async stop() {
    const t = this._startPromise;
    (this.connection.features.reconnect = !1),
      (this._stopPromise = this._stopInternal()),
      await this._stopPromise;
    try {
      await t;
    } catch {}
  }
  _stopInternal(t) {
    if (this._connectionState === ne.Disconnected)
      return (
        this._logger.log(
          S.Debug,
          `Call to HubConnection.stop(${t}) ignored because it is already in the disconnected state.`
        ),
        Promise.resolve()
      );
    if (this._connectionState === ne.Disconnecting)
      return (
        this._logger.log(
          S.Debug,
          `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
        ),
        this._stopPromise
      );
    const n = this._connectionState;
    return (
      (this._connectionState = ne.Disconnecting),
      this._logger.log(S.Debug, "Stopping HubConnection."),
      this._reconnectDelayHandle
        ? (this._logger.log(
            S.Debug,
            "Connection stopped during reconnect delay. Done reconnecting."
          ),
          clearTimeout(this._reconnectDelayHandle),
          (this._reconnectDelayHandle = void 0),
          this._completeClose(),
          Promise.resolve())
        : (n === ne.Connected && this._sendCloseMessage(),
          this._cleanupTimeout(),
          this._cleanupPingTimer(),
          (this._stopDuringStartError =
            t ||
            new at(
              "The connection was stopped before the hub handshake could complete."
            )),
          this.connection.stop(t))
    );
  }
  async _sendCloseMessage() {
    try {
      await this._sendWithProtocol(this._createCloseMessage());
    } catch {}
  }
  stream(t, ...n) {
    const [r, o] = this._replaceStreamingParams(n),
      i = this._createStreamInvocation(t, n, o);
    let s;
    const l = new Xg();
    return (
      (l.cancelCallback = () => {
        const a = this._createCancelInvocation(i.invocationId);
        return (
          delete this._callbacks[i.invocationId],
          s.then(() => this._sendWithProtocol(a))
        );
      }),
      (this._callbacks[i.invocationId] = (a, u) => {
        if (u) {
          l.error(u);
          return;
        } else
          a &&
            (a.type === O.Completion
              ? a.error
                ? l.error(new Error(a.error))
                : l.complete()
              : l.next(a.item));
      }),
      (s = this._sendWithProtocol(i).catch((a) => {
        l.error(a), delete this._callbacks[i.invocationId];
      })),
      this._launchStreams(r, s),
      l
    );
  }
  _sendMessage(t) {
    return this._resetKeepAliveInterval(), this.connection.send(t);
  }
  _sendWithProtocol(t) {
    return this._messageBuffer
      ? this._messageBuffer._send(t)
      : this._sendMessage(this._protocol.writeMessage(t));
  }
  send(t, ...n) {
    const [r, o] = this._replaceStreamingParams(n),
      i = this._sendWithProtocol(this._createInvocation(t, n, !0, o));
    return this._launchStreams(r, i), i;
  }
  invoke(t, ...n) {
    const [r, o] = this._replaceStreamingParams(n),
      i = this._createInvocation(t, n, !1, o);
    return new Promise((l, a) => {
      this._callbacks[i.invocationId] = (f, h) => {
        if (h) {
          a(h);
          return;
        } else
          f &&
            (f.type === O.Completion
              ? f.error
                ? a(new Error(f.error))
                : l(f.result)
              : a(new Error(`Unexpected message type: ${f.type}`)));
      };
      const u = this._sendWithProtocol(i).catch((f) => {
        a(f), delete this._callbacks[i.invocationId];
      });
      this._launchStreams(r, u);
    });
  }
  on(t, n) {
    !t ||
      !n ||
      ((t = t.toLowerCase()),
      this._methods[t] || (this._methods[t] = []),
      this._methods[t].indexOf(n) === -1 && this._methods[t].push(n));
  }
  off(t, n) {
    if (!t) return;
    t = t.toLowerCase();
    const r = this._methods[t];
    if (r)
      if (n) {
        const o = r.indexOf(n);
        o !== -1 && (r.splice(o, 1), r.length === 0 && delete this._methods[t]);
      } else delete this._methods[t];
  }
  onclose(t) {
    t && this._closedCallbacks.push(t);
  }
  onreconnecting(t) {
    t && this._reconnectingCallbacks.push(t);
  }
  onreconnected(t) {
    t && this._reconnectedCallbacks.push(t);
  }
  _processIncomingData(t) {
    if (
      (this._cleanupTimeout(),
      this._receivedHandshakeResponse ||
        ((t = this._processHandshakeResponse(t)),
        (this._receivedHandshakeResponse = !0)),
      t)
    ) {
      const n = this._protocol.parseMessages(t, this._logger);
      for (const r of n)
        if (
          !(
            this._messageBuffer && !this._messageBuffer._shouldProcessMessage(r)
          )
        )
          switch (r.type) {
            case O.Invocation:
              this._invokeClientMethod(r).catch((o) => {
                this._logger.log(
                  S.Error,
                  `Invoke client method threw error: ${es(o)}`
                );
              });
              break;
            case O.StreamItem:
            case O.Completion: {
              const o = this._callbacks[r.invocationId];
              if (o) {
                r.type === O.Completion &&
                  delete this._callbacks[r.invocationId];
                try {
                  o(r);
                } catch (i) {
                  this._logger.log(
                    S.Error,
                    `Stream callback threw error: ${es(i)}`
                  );
                }
              }
              break;
            }
            case O.Ping:
              break;
            case O.Close: {
              this._logger.log(
                S.Information,
                "Close message received from server."
              );
              const o = r.error
                ? new Error("Server returned an error on close: " + r.error)
                : void 0;
              r.allowReconnect === !0
                ? this.connection.stop(o)
                : (this._stopPromise = this._stopInternal(o));
              break;
            }
            case O.Ack:
              this._messageBuffer && this._messageBuffer._ack(r);
              break;
            case O.Sequence:
              this._messageBuffer && this._messageBuffer._resetSequence(r);
              break;
            default:
              this._logger.log(S.Warning, `Invalid message type: ${r.type}.`);
              break;
          }
    }
    this._resetTimeoutPeriod();
  }
  _processHandshakeResponse(t) {
    let n, r;
    try {
      [r, n] = this._handshakeProtocol.parseHandshakeResponse(t);
    } catch (o) {
      const i = "Error parsing handshake response: " + o;
      this._logger.log(S.Error, i);
      const s = new Error(i);
      throw (this._handshakeRejecter(s), s);
    }
    if (n.error) {
      const o = "Server returned handshake error: " + n.error;
      this._logger.log(S.Error, o);
      const i = new Error(o);
      throw (this._handshakeRejecter(i), i);
    } else this._logger.log(S.Debug, "Server handshake complete.");
    return this._handshakeResolver(), r;
  }
  _resetKeepAliveInterval() {
    this.connection.features.inherentKeepAlive ||
      ((this._nextKeepAlive =
        new Date().getTime() + this.keepAliveIntervalInMilliseconds),
      this._cleanupPingTimer());
  }
  _resetTimeoutPeriod() {
    if (
      (!this.connection.features ||
        !this.connection.features.inherentKeepAlive) &&
      ((this._timeoutHandle = setTimeout(
        () => this.serverTimeout(),
        this.serverTimeoutInMilliseconds
      )),
      this._pingServerHandle === void 0)
    ) {
      let t = this._nextKeepAlive - new Date().getTime();
      t < 0 && (t = 0),
        (this._pingServerHandle = setTimeout(async () => {
          if (this._connectionState === ne.Connected)
            try {
              await this._sendMessage(this._cachedPingMessage);
            } catch {
              this._cleanupPingTimer();
            }
        }, t));
    }
  }
  serverTimeout() {
    this.connection.stop(
      new Error(
        "Server timeout elapsed without receiving a message from the server."
      )
    );
  }
  async _invokeClientMethod(t) {
    const n = t.target.toLowerCase(),
      r = this._methods[n];
    if (!r) {
      this._logger.log(
        S.Warning,
        `No client method with the name '${n}' found.`
      ),
        t.invocationId &&
          (this._logger.log(
            S.Warning,
            `No result given for '${n}' method and invocation ID '${t.invocationId}'.`
          ),
          await this._sendWithProtocol(
            this._createCompletionMessage(
              t.invocationId,
              "Client didn't provide a result.",
              null
            )
          ));
      return;
    }
    const o = r.slice(),
      i = !!t.invocationId;
    let s, l, a;
    for (const u of o)
      try {
        const f = s;
        (s = await u.apply(this, t.arguments)),
          i &&
            s &&
            f &&
            (this._logger.log(
              S.Error,
              `Multiple results provided for '${n}'. Sending error to server.`
            ),
            (a = this._createCompletionMessage(
              t.invocationId,
              "Client provided multiple results.",
              null
            ))),
          (l = void 0);
      } catch (f) {
        (l = f),
          this._logger.log(
            S.Error,
            `A callback for the method '${n}' threw error '${f}'.`
          );
      }
    a
      ? await this._sendWithProtocol(a)
      : i
      ? (l
          ? (a = this._createCompletionMessage(t.invocationId, `${l}`, null))
          : s !== void 0
          ? (a = this._createCompletionMessage(t.invocationId, null, s))
          : (this._logger.log(
              S.Warning,
              `No result given for '${n}' method and invocation ID '${t.invocationId}'.`
            ),
            (a = this._createCompletionMessage(
              t.invocationId,
              "Client didn't provide a result.",
              null
            ))),
        await this._sendWithProtocol(a))
      : s &&
        this._logger.log(
          S.Error,
          `Result given for '${n}' method but server is not expecting a result.`
        );
  }
  _connectionClosed(t) {
    this._logger.log(
      S.Debug,
      `HubConnection.connectionClosed(${t}) called while in state ${this._connectionState}.`
    ),
      (this._stopDuringStartError =
        this._stopDuringStartError ||
        t ||
        new at(
          "The underlying connection was closed before the hub handshake could complete."
        )),
      this._handshakeResolver && this._handshakeResolver(),
      this._cancelCallbacksWithError(
        t ||
          new Error(
            "Invocation canceled due to the underlying connection being closed."
          )
      ),
      this._cleanupTimeout(),
      this._cleanupPingTimer(),
      this._connectionState === ne.Disconnecting
        ? this._completeClose(t)
        : this._connectionState === ne.Connected && this._reconnectPolicy
        ? this._reconnect(t)
        : this._connectionState === ne.Connected && this._completeClose(t);
  }
  _completeClose(t) {
    if (this._connectionStarted) {
      (this._connectionState = ne.Disconnected),
        (this._connectionStarted = !1),
        this._messageBuffer &&
          (this._messageBuffer._dispose(t ?? new Error("Connection closed.")),
          (this._messageBuffer = void 0)),
        ie.isBrowser &&
          window.document.removeEventListener(
            "freeze",
            this._freezeEventListener
          );
      try {
        this._closedCallbacks.forEach((n) => n.apply(this, [t]));
      } catch (n) {
        this._logger.log(
          S.Error,
          `An onclose callback called with error '${t}' threw error '${n}'.`
        );
      }
    }
  }
  async _reconnect(t) {
    const n = Date.now();
    let r = 0,
      o =
        t !== void 0
          ? t
          : new Error("Attempting to reconnect due to a unknown error."),
      i = this._getNextRetryDelay(r++, 0, o);
    if (i === null) {
      this._logger.log(
        S.Debug,
        "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."
      ),
        this._completeClose(t);
      return;
    }
    if (
      ((this._connectionState = ne.Reconnecting),
      t
        ? this._logger.log(
            S.Information,
            `Connection reconnecting because of error '${t}'.`
          )
        : this._logger.log(S.Information, "Connection reconnecting."),
      this._reconnectingCallbacks.length !== 0)
    ) {
      try {
        this._reconnectingCallbacks.forEach((s) => s.apply(this, [t]));
      } catch (s) {
        this._logger.log(
          S.Error,
          `An onreconnecting callback called with error '${t}' threw error '${s}'.`
        );
      }
      if (this._connectionState !== ne.Reconnecting) {
        this._logger.log(
          S.Debug,
          "Connection left the reconnecting state in onreconnecting callback. Done reconnecting."
        );
        return;
      }
    }
    for (; i !== null; ) {
      if (
        (this._logger.log(
          S.Information,
          `Reconnect attempt number ${r} will start in ${i} ms.`
        ),
        await new Promise((s) => {
          this._reconnectDelayHandle = setTimeout(s, i);
        }),
        (this._reconnectDelayHandle = void 0),
        this._connectionState !== ne.Reconnecting)
      ) {
        this._logger.log(
          S.Debug,
          "Connection left the reconnecting state during reconnect delay. Done reconnecting."
        );
        return;
      }
      try {
        if (
          (await this._startInternal(),
          (this._connectionState = ne.Connected),
          this._logger.log(
            S.Information,
            "HubConnection reconnected successfully."
          ),
          this._reconnectedCallbacks.length !== 0)
        )
          try {
            this._reconnectedCallbacks.forEach((s) =>
              s.apply(this, [this.connection.connectionId])
            );
          } catch (s) {
            this._logger.log(
              S.Error,
              `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${s}'.`
            );
          }
        return;
      } catch (s) {
        if (
          (this._logger.log(
            S.Information,
            `Reconnect attempt failed because of error '${s}'.`
          ),
          this._connectionState !== ne.Reconnecting)
        ) {
          this._logger.log(
            S.Debug,
            `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`
          ),
            this._connectionState === ne.Disconnecting && this._completeClose();
          return;
        }
        (o = s instanceof Error ? s : new Error(s.toString())),
          (i = this._getNextRetryDelay(r++, Date.now() - n, o));
      }
    }
    this._logger.log(
      S.Information,
      `Reconnect retries have been exhausted after ${
        Date.now() - n
      } ms and ${r} failed attempts. Connection disconnecting.`
    ),
      this._completeClose();
  }
  _getNextRetryDelay(t, n, r) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds: n,
        previousRetryCount: t,
        retryReason: r,
      });
    } catch (o) {
      return (
        this._logger.log(
          S.Error,
          `IRetryPolicy.nextRetryDelayInMilliseconds(${t}, ${n}) threw error '${o}'.`
        ),
        null
      );
    }
  }
  _cancelCallbacksWithError(t) {
    const n = this._callbacks;
    (this._callbacks = {}),
      Object.keys(n).forEach((r) => {
        const o = n[r];
        try {
          o(null, t);
        } catch (i) {
          this._logger.log(
            S.Error,
            `Stream 'error' callback called with '${t}' threw error: ${es(i)}`
          );
        }
      });
  }
  _cleanupPingTimer() {
    this._pingServerHandle &&
      (clearTimeout(this._pingServerHandle), (this._pingServerHandle = void 0));
  }
  _cleanupTimeout() {
    this._timeoutHandle && clearTimeout(this._timeoutHandle);
  }
  _createInvocation(t, n, r, o) {
    if (r)
      return o.length !== 0
        ? { arguments: n, streamIds: o, target: t, type: O.Invocation }
        : { arguments: n, target: t, type: O.Invocation };
    {
      const i = this._invocationId;
      return (
        this._invocationId++,
        o.length !== 0
          ? {
              arguments: n,
              invocationId: i.toString(),
              streamIds: o,
              target: t,
              type: O.Invocation,
            }
          : {
              arguments: n,
              invocationId: i.toString(),
              target: t,
              type: O.Invocation,
            }
      );
    }
  }
  _launchStreams(t, n) {
    if (t.length !== 0) {
      n || (n = Promise.resolve());
      for (const r in t)
        t[r].subscribe({
          complete: () => {
            n = n.then(() =>
              this._sendWithProtocol(this._createCompletionMessage(r))
            );
          },
          error: (o) => {
            let i;
            o instanceof Error
              ? (i = o.message)
              : o && o.toString
              ? (i = o.toString())
              : (i = "Unknown error"),
              (n = n.then(() =>
                this._sendWithProtocol(this._createCompletionMessage(r, i))
              ));
          },
          next: (o) => {
            n = n.then(() =>
              this._sendWithProtocol(this._createStreamItemMessage(r, o))
            );
          },
        });
    }
  }
  _replaceStreamingParams(t) {
    const n = [],
      r = [];
    for (let o = 0; o < t.length; o++) {
      const i = t[o];
      if (this._isObservable(i)) {
        const s = this._invocationId;
        this._invocationId++, (n[s] = i), r.push(s.toString()), t.splice(o, 1);
      }
    }
    return [n, r];
  }
  _isObservable(t) {
    return t && t.subscribe && typeof t.subscribe == "function";
  }
  _createStreamInvocation(t, n, r) {
    const o = this._invocationId;
    return (
      this._invocationId++,
      r.length !== 0
        ? {
            arguments: n,
            invocationId: o.toString(),
            streamIds: r,
            target: t,
            type: O.StreamInvocation,
          }
        : {
            arguments: n,
            invocationId: o.toString(),
            target: t,
            type: O.StreamInvocation,
          }
    );
  }
  _createCancelInvocation(t) {
    return { invocationId: t, type: O.CancelInvocation };
  }
  _createStreamItemMessage(t, n) {
    return { invocationId: t, item: n, type: O.StreamItem };
  }
  _createCompletionMessage(t, n, r) {
    return n
      ? { error: n, invocationId: t, type: O.Completion }
      : { invocationId: t, result: r, type: O.Completion };
  }
  _createCloseMessage() {
    return { type: O.Close };
  }
}
const tm = [0, 2e3, 1e4, 3e4, null];
class Ac {
  constructor(t) {
    this._retryDelays = t !== void 0 ? [...t, null] : tm;
  }
  nextRetryDelayInMilliseconds(t) {
    return this._retryDelays[t.previousRetryCount];
  }
}
class mn {}
mn.Authorization = "Authorization";
mn.Cookie = "Cookie";
class nm extends Ni {
  constructor(t, n) {
    super(), (this._innerClient = t), (this._accessTokenFactory = n);
  }
  async send(t) {
    let n = !0;
    this._accessTokenFactory &&
      (!this._accessToken || (t.url && t.url.indexOf("/negotiate?") > 0)) &&
      ((n = !1), (this._accessToken = await this._accessTokenFactory())),
      this._setAuthorizationHeader(t);
    const r = await this._innerClient.send(t);
    return n && r.statusCode === 401 && this._accessTokenFactory
      ? ((this._accessToken = await this._accessTokenFactory()),
        this._setAuthorizationHeader(t),
        await this._innerClient.send(t))
      : r;
  }
  _setAuthorizationHeader(t) {
    t.headers || (t.headers = {}),
      this._accessToken
        ? (t.headers[mn.Authorization] = `Bearer ${this._accessToken}`)
        : this._accessTokenFactory &&
          t.headers[mn.Authorization] &&
          delete t.headers[mn.Authorization];
  }
  getCookieString(t) {
    return this._innerClient.getCookieString(t);
  }
}
var me;
(function (e) {
  (e[(e.None = 0)] = "None"),
    (e[(e.WebSockets = 1)] = "WebSockets"),
    (e[(e.ServerSentEvents = 2)] = "ServerSentEvents"),
    (e[(e.LongPolling = 4)] = "LongPolling");
})(me || (me = {}));
var Re;
(function (e) {
  (e[(e.Text = 1)] = "Text"), (e[(e.Binary = 2)] = "Binary");
})(Re || (Re = {}));
let rm = class {
  constructor() {
    (this._isAborted = !1), (this.onabort = null);
  }
  abort() {
    this._isAborted || ((this._isAborted = !0), this.onabort && this.onabort());
  }
  get signal() {
    return this;
  }
  get aborted() {
    return this._isAborted;
  }
};
class yc {
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(t, n, r) {
    (this._httpClient = t),
      (this._logger = n),
      (this._pollAbort = new rm()),
      (this._options = r),
      (this._running = !1),
      (this.onreceive = null),
      (this.onclose = null);
  }
  async connect(t, n) {
    if (
      (he.isRequired(t, "url"),
      he.isRequired(n, "transferFormat"),
      he.isIn(n, Re, "transferFormat"),
      (this._url = t),
      this._logger.log(S.Trace, "(LongPolling transport) Connecting."),
      n === Re.Binary &&
        typeof XMLHttpRequest < "u" &&
        typeof new XMLHttpRequest().responseType != "string")
    )
      throw new Error(
        "Binary protocols over XmlHttpRequest not implementing advanced features are not supported."
      );
    const [r, o] = tr(),
      i = { [r]: o, ...this._options.headers },
      s = {
        abortSignal: this._pollAbort.signal,
        headers: i,
        timeout: 1e5,
        withCredentials: this._options.withCredentials,
      };
    n === Re.Binary && (s.responseType = "arraybuffer");
    const l = `${t}&_=${Date.now()}`;
    this._logger.log(S.Trace, `(LongPolling transport) polling: ${l}.`);
    const a = await this._httpClient.get(l, s);
    a.statusCode !== 200
      ? (this._logger.log(
          S.Error,
          `(LongPolling transport) Unexpected response code: ${a.statusCode}.`
        ),
        (this._closeError = new gn(a.statusText || "", a.statusCode)),
        (this._running = !1))
      : (this._running = !0),
      (this._receiving = this._poll(this._url, s));
  }
  async _poll(t, n) {
    try {
      for (; this._running; )
        try {
          const r = `${t}&_=${Date.now()}`;
          this._logger.log(S.Trace, `(LongPolling transport) polling: ${r}.`);
          const o = await this._httpClient.get(r, n);
          o.statusCode === 204
            ? (this._logger.log(
                S.Information,
                "(LongPolling transport) Poll terminated by server."
              ),
              (this._running = !1))
            : o.statusCode !== 200
            ? (this._logger.log(
                S.Error,
                `(LongPolling transport) Unexpected response code: ${o.statusCode}.`
              ),
              (this._closeError = new gn(o.statusText || "", o.statusCode)),
              (this._running = !1))
            : o.content
            ? (this._logger.log(
                S.Trace,
                `(LongPolling transport) data received. ${Wr(
                  o.content,
                  this._options.logMessageContent
                )}.`
              ),
              this.onreceive && this.onreceive(o.content))
            : this._logger.log(
                S.Trace,
                "(LongPolling transport) Poll timed out, reissuing."
              );
        } catch (r) {
          this._running
            ? r instanceof Kl
              ? this._logger.log(
                  S.Trace,
                  "(LongPolling transport) Poll timed out, reissuing."
                )
              : ((this._closeError = r), (this._running = !1))
            : this._logger.log(
                S.Trace,
                `(LongPolling transport) Poll errored after shutdown: ${r.message}`
              );
        }
    } finally {
      this._logger.log(S.Trace, "(LongPolling transport) Polling complete."),
        this.pollAborted || this._raiseOnClose();
    }
  }
  async send(t) {
    return this._running
      ? Xd(
          this._logger,
          "LongPolling",
          this._httpClient,
          this._url,
          t,
          this._options
        )
      : Promise.reject(
          new Error("Cannot send until the transport is connected")
        );
  }
  async stop() {
    this._logger.log(S.Trace, "(LongPolling transport) Stopping polling."),
      (this._running = !1),
      this._pollAbort.abort();
    try {
      await this._receiving,
        this._logger.log(
          S.Trace,
          `(LongPolling transport) sending DELETE request to ${this._url}.`
        );
      const t = {},
        [n, r] = tr();
      t[n] = r;
      const o = {
        headers: { ...t, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials,
      };
      let i;
      try {
        await this._httpClient.delete(this._url, o);
      } catch (s) {
        i = s;
      }
      i
        ? i instanceof gn &&
          (i.statusCode === 404
            ? this._logger.log(
                S.Trace,
                "(LongPolling transport) A 404 response was returned from sending a DELETE request."
              )
            : this._logger.log(
                S.Trace,
                `(LongPolling transport) Error sending a DELETE request: ${i}`
              ))
        : this._logger.log(
            S.Trace,
            "(LongPolling transport) DELETE request accepted."
          );
    } finally {
      this._logger.log(S.Trace, "(LongPolling transport) Stop finished."),
        this._raiseOnClose();
    }
  }
  _raiseOnClose() {
    if (this.onclose) {
      let t = "(LongPolling transport) Firing onclose event.";
      this._closeError && (t += " Error: " + this._closeError),
        this._logger.log(S.Trace, t),
        this.onclose(this._closeError);
    }
  }
}
class om {
  constructor(t, n, r, o) {
    (this._httpClient = t),
      (this._accessToken = n),
      (this._logger = r),
      (this._options = o),
      (this.onreceive = null),
      (this.onclose = null);
  }
  async connect(t, n) {
    return (
      he.isRequired(t, "url"),
      he.isRequired(n, "transferFormat"),
      he.isIn(n, Re, "transferFormat"),
      this._logger.log(S.Trace, "(SSE transport) Connecting."),
      (this._url = t),
      this._accessToken &&
        (t +=
          (t.indexOf("?") < 0 ? "?" : "&") +
          `access_token=${encodeURIComponent(this._accessToken)}`),
      new Promise((r, o) => {
        let i = !1;
        if (n !== Re.Text) {
          o(
            new Error(
              "The Server-Sent Events transport only supports the 'Text' transfer format"
            )
          );
          return;
        }
        let s;
        if (ie.isBrowser || ie.isWebWorker)
          s = new this._options.EventSource(t, {
            withCredentials: this._options.withCredentials,
          });
        else {
          const l = this._httpClient.getCookieString(t),
            a = {};
          a.Cookie = l;
          const [u, f] = tr();
          (a[u] = f),
            (s = new this._options.EventSource(t, {
              withCredentials: this._options.withCredentials,
              headers: { ...a, ...this._options.headers },
            }));
        }
        try {
          (s.onmessage = (l) => {
            if (this.onreceive)
              try {
                this._logger.log(
                  S.Trace,
                  `(SSE transport) data received. ${Wr(
                    l.data,
                    this._options.logMessageContent
                  )}.`
                ),
                  this.onreceive(l.data);
              } catch (a) {
                this._close(a);
                return;
              }
          }),
            (s.onerror = (l) => {
              i
                ? this._close()
                : o(
                    new Error(
                      "EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."
                    )
                  );
            }),
            (s.onopen = () => {
              this._logger.log(S.Information, `SSE connected to ${this._url}`),
                (this._eventSource = s),
                (i = !0),
                r();
            });
        } catch (l) {
          o(l);
          return;
        }
      })
    );
  }
  async send(t) {
    return this._eventSource
      ? Xd(this._logger, "SSE", this._httpClient, this._url, t, this._options)
      : Promise.reject(
          new Error("Cannot send until the transport is connected")
        );
  }
  stop() {
    return this._close(), Promise.resolve();
  }
  _close(t) {
    this._eventSource &&
      (this._eventSource.close(),
      (this._eventSource = void 0),
      this.onclose && this.onclose(t));
  }
}
class im {
  constructor(t, n, r, o, i, s) {
    (this._logger = r),
      (this._accessTokenFactory = n),
      (this._logMessageContent = o),
      (this._webSocketConstructor = i),
      (this._httpClient = t),
      (this.onreceive = null),
      (this.onclose = null),
      (this._headers = s);
  }
  async connect(t, n) {
    he.isRequired(t, "url"),
      he.isRequired(n, "transferFormat"),
      he.isIn(n, Re, "transferFormat"),
      this._logger.log(S.Trace, "(WebSockets transport) Connecting.");
    let r;
    return (
      this._accessTokenFactory && (r = await this._accessTokenFactory()),
      new Promise((o, i) => {
        t = t.replace(/^http/, "ws");
        let s;
        const l = this._httpClient.getCookieString(t);
        let a = !1;
        if (ie.isNode || ie.isReactNative) {
          const u = {},
            [f, h] = tr();
          (u[f] = h),
            r && (u[mn.Authorization] = `Bearer ${r}`),
            l && (u[mn.Cookie] = l),
            (s = new this._webSocketConstructor(t, void 0, {
              headers: { ...u, ...this._headers },
            }));
        } else
          r &&
            (t +=
              (t.indexOf("?") < 0 ? "?" : "&") +
              `access_token=${encodeURIComponent(r)}`);
        s || (s = new this._webSocketConstructor(t)),
          n === Re.Binary && (s.binaryType = "arraybuffer"),
          (s.onopen = (u) => {
            this._logger.log(S.Information, `WebSocket connected to ${t}.`),
              (this._webSocket = s),
              (a = !0),
              o();
          }),
          (s.onerror = (u) => {
            let f = null;
            typeof ErrorEvent < "u" && u instanceof ErrorEvent
              ? (f = u.error)
              : (f = "There was an error with the transport"),
              this._logger.log(S.Information, `(WebSockets transport) ${f}.`);
          }),
          (s.onmessage = (u) => {
            if (
              (this._logger.log(
                S.Trace,
                `(WebSockets transport) data received. ${Wr(
                  u.data,
                  this._logMessageContent
                )}.`
              ),
              this.onreceive)
            )
              try {
                this.onreceive(u.data);
              } catch (f) {
                this._close(f);
                return;
              }
          }),
          (s.onclose = (u) => {
            if (a) this._close(u);
            else {
              let f = null;
              typeof ErrorEvent < "u" && u instanceof ErrorEvent
                ? (f = u.error)
                : (f =
                    "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled."),
                i(new Error(f));
            }
          });
      })
    );
  }
  send(t) {
    return this._webSocket &&
      this._webSocket.readyState === this._webSocketConstructor.OPEN
      ? (this._logger.log(
          S.Trace,
          `(WebSockets transport) sending data. ${Wr(
            t,
            this._logMessageContent
          )}.`
        ),
        this._webSocket.send(t),
        Promise.resolve())
      : Promise.reject("WebSocket is not in the OPEN state");
  }
  stop() {
    return this._webSocket && this._close(void 0), Promise.resolve();
  }
  _close(t) {
    this._webSocket &&
      ((this._webSocket.onclose = () => {}),
      (this._webSocket.onmessage = () => {}),
      (this._webSocket.onerror = () => {}),
      this._webSocket.close(),
      (this._webSocket = void 0)),
      this._logger.log(S.Trace, "(WebSockets transport) socket closed."),
      this.onclose &&
        (this._isCloseEvent(t) && (t.wasClean === !1 || t.code !== 1e3)
          ? this.onclose(
              new Error(
                `WebSocket closed with status code: ${t.code} (${
                  t.reason || "no reason given"
                }).`
              )
            )
          : t instanceof Error
          ? this.onclose(t)
          : this.onclose());
  }
  _isCloseEvent(t) {
    return t && typeof t.wasClean == "boolean" && typeof t.code == "number";
  }
}
const vc = 100;
class sm {
  constructor(t, n = {}) {
    if (
      ((this._stopPromiseResolver = () => {}),
      (this.features = {}),
      (this._negotiateVersion = 1),
      he.isRequired(t, "url"),
      (this._logger = Og(n.logger)),
      (this.baseUrl = this._resolveUrl(t)),
      (n = n || {}),
      (n.logMessageContent =
        n.logMessageContent === void 0 ? !1 : n.logMessageContent),
      typeof n.withCredentials == "boolean" || n.withCredentials === void 0)
    )
      n.withCredentials = n.withCredentials === void 0 ? !0 : n.withCredentials;
    else
      throw new Error(
        "withCredentials option was not a 'boolean' or 'undefined' value"
      );
    n.timeout = n.timeout === void 0 ? 100 * 1e3 : n.timeout;
    let r = null,
      o = null;
    if (ie.isNode && typeof require < "u") {
      const i =
        typeof __webpack_require__ == "function"
          ? __non_webpack_require__
          : require;
      (r = i("ws")), (o = i("eventsource"));
    }
    !ie.isNode && typeof WebSocket < "u" && !n.WebSocket
      ? (n.WebSocket = WebSocket)
      : ie.isNode && !n.WebSocket && r && (n.WebSocket = r),
      !ie.isNode && typeof EventSource < "u" && !n.EventSource
        ? (n.EventSource = EventSource)
        : ie.isNode && !n.EventSource && typeof o < "u" && (n.EventSource = o),
      (this._httpClient = new nm(
        n.httpClient || new Yg(this._logger),
        n.accessTokenFactory
      )),
      (this._connectionState = "Disconnected"),
      (this._connectionStarted = !1),
      (this._options = n),
      (this.onreceive = null),
      (this.onclose = null);
  }
  async start(t) {
    if (
      ((t = t || Re.Binary),
      he.isIn(t, Re, "transferFormat"),
      this._logger.log(
        S.Debug,
        `Starting connection with transfer format '${Re[t]}'.`
      ),
      this._connectionState !== "Disconnected")
    )
      return Promise.reject(
        new Error(
          "Cannot start an HttpConnection that is not in the 'Disconnected' state."
        )
      );
    if (
      ((this._connectionState = "Connecting"),
      (this._startInternalPromise = this._startInternal(t)),
      await this._startInternalPromise,
      this._connectionState === "Disconnecting")
    ) {
      const n = "Failed to start the HttpConnection before stop() was called.";
      return (
        this._logger.log(S.Error, n),
        await this._stopPromise,
        Promise.reject(new at(n))
      );
    } else if (this._connectionState !== "Connected") {
      const n =
        "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
      return this._logger.log(S.Error, n), Promise.reject(new at(n));
    }
    this._connectionStarted = !0;
  }
  send(t) {
    return this._connectionState !== "Connected"
      ? Promise.reject(
          new Error(
            "Cannot send data if the connection is not in the 'Connected' State."
          )
        )
      : (this._sendQueue || (this._sendQueue = new Wl(this.transport)),
        this._sendQueue.send(t));
  }
  async stop(t) {
    if (this._connectionState === "Disconnected")
      return (
        this._logger.log(
          S.Debug,
          `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnected state.`
        ),
        Promise.resolve()
      );
    if (this._connectionState === "Disconnecting")
      return (
        this._logger.log(
          S.Debug,
          `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
        ),
        this._stopPromise
      );
    (this._connectionState = "Disconnecting"),
      (this._stopPromise = new Promise((n) => {
        this._stopPromiseResolver = n;
      })),
      await this._stopInternal(t),
      await this._stopPromise;
  }
  async _stopInternal(t) {
    this._stopError = t;
    try {
      await this._startInternalPromise;
    } catch {}
    if (this.transport) {
      try {
        await this.transport.stop();
      } catch (n) {
        this._logger.log(
          S.Error,
          `HttpConnection.transport.stop() threw error '${n}'.`
        ),
          this._stopConnection();
      }
      this.transport = void 0;
    } else
      this._logger.log(
        S.Debug,
        "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed."
      );
  }
  async _startInternal(t) {
    let n = this.baseUrl;
    (this._accessTokenFactory = this._options.accessTokenFactory),
      (this._httpClient._accessTokenFactory = this._accessTokenFactory);
    try {
      if (this._options.skipNegotiation)
        if (this._options.transport === me.WebSockets)
          (this.transport = this._constructTransport(me.WebSockets)),
            await this._startTransport(n, t);
        else
          throw new Error(
            "Negotiation can only be skipped when using the WebSocket transport directly."
          );
      else {
        let r = null,
          o = 0;
        do {
          if (
            ((r = await this._getNegotiationResponse(n)),
            this._connectionState === "Disconnecting" ||
              this._connectionState === "Disconnected")
          )
            throw new at("The connection was stopped during negotiation.");
          if (r.error) throw new Error(r.error);
          if (r.ProtocolVersion)
            throw new Error(
              "Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details."
            );
          if ((r.url && (n = r.url), r.accessToken)) {
            const i = r.accessToken;
            (this._accessTokenFactory = () => i),
              (this._httpClient._accessToken = i),
              (this._httpClient._accessTokenFactory = void 0);
          }
          o++;
        } while (r.url && o < vc);
        if (o === vc && r.url)
          throw new Error("Negotiate redirection limit exceeded.");
        await this._createTransport(n, this._options.transport, r, t);
      }
      this.transport instanceof yc && (this.features.inherentKeepAlive = !0),
        this._connectionState === "Connecting" &&
          (this._logger.log(
            S.Debug,
            "The HttpConnection connected successfully."
          ),
          (this._connectionState = "Connected"));
    } catch (r) {
      return (
        this._logger.log(S.Error, "Failed to start the connection: " + r),
        (this._connectionState = "Disconnected"),
        (this.transport = void 0),
        this._stopPromiseResolver(),
        Promise.reject(r)
      );
    }
  }
  async _getNegotiationResponse(t) {
    const n = {},
      [r, o] = tr();
    n[r] = o;
    const i = this._resolveNegotiateUrl(t);
    this._logger.log(S.Debug, `Sending negotiation request: ${i}.`);
    try {
      const s = await this._httpClient.post(i, {
        content: "",
        headers: { ...n, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials,
      });
      if (s.statusCode !== 200)
        return Promise.reject(
          new Error(
            `Unexpected status code returned from negotiate '${s.statusCode}'`
          )
        );
      const l = JSON.parse(s.content);
      return (
        (!l.negotiateVersion || l.negotiateVersion < 1) &&
          (l.connectionToken = l.connectionId),
        l.useStatefulReconnect && this._options._useStatefulReconnect !== !0
          ? Promise.reject(
              new gc(
                "Client didn't negotiate Stateful Reconnect but the server did."
              )
            )
          : l
      );
    } catch (s) {
      let l = "Failed to complete negotiation with the server: " + s;
      return (
        s instanceof gn &&
          s.statusCode === 404 &&
          (l =
            l +
            " Either this is not a SignalR endpoint or there is a proxy blocking the connection."),
        this._logger.log(S.Error, l),
        Promise.reject(new gc(l))
      );
    }
  }
  _createConnectUrl(t, n) {
    return n ? t + (t.indexOf("?") === -1 ? "?" : "&") + `id=${n}` : t;
  }
  async _createTransport(t, n, r, o) {
    let i = this._createConnectUrl(t, r.connectionToken);
    if (this._isITransport(n)) {
      this._logger.log(
        S.Debug,
        "Connection was provided an instance of ITransport, using that directly."
      ),
        (this.transport = n),
        await this._startTransport(i, o),
        (this.connectionId = r.connectionId);
      return;
    }
    const s = [],
      l = r.availableTransports || [];
    let a = r;
    for (const u of l) {
      const f = this._resolveTransportOrError(
        u,
        n,
        o,
        (a == null ? void 0 : a.useStatefulReconnect) === !0
      );
      if (f instanceof Error) s.push(`${u.transport} failed:`), s.push(f);
      else if (this._isITransport(f)) {
        if (((this.transport = f), !a)) {
          try {
            a = await this._getNegotiationResponse(t);
          } catch (h) {
            return Promise.reject(h);
          }
          i = this._createConnectUrl(t, a.connectionToken);
        }
        try {
          await this._startTransport(i, o),
            (this.connectionId = a.connectionId);
          return;
        } catch (h) {
          if (
            (this._logger.log(
              S.Error,
              `Failed to start the transport '${u.transport}': ${h}`
            ),
            (a = void 0),
            s.push(new Dg(`${u.transport} failed: ${h}`, me[u.transport])),
            this._connectionState !== "Connecting")
          ) {
            const m = "Failed to select transport before stop() was called.";
            return this._logger.log(S.Debug, m), Promise.reject(new at(m));
          }
        }
      }
    }
    return s.length > 0
      ? Promise.reject(
          new Mg(
            `Unable to connect to the server with any of the available transports. ${s.join(
              " "
            )}`,
            s
          )
        )
      : Promise.reject(
          new Error(
            "None of the transports supported by the client are supported by the server."
          )
        );
  }
  _constructTransport(t) {
    switch (t) {
      case me.WebSockets:
        if (!this._options.WebSocket)
          throw new Error("'WebSocket' is not supported in your environment.");
        return new im(
          this._httpClient,
          this._accessTokenFactory,
          this._logger,
          this._options.logMessageContent,
          this._options.WebSocket,
          this._options.headers || {}
        );
      case me.ServerSentEvents:
        if (!this._options.EventSource)
          throw new Error(
            "'EventSource' is not supported in your environment."
          );
        return new om(
          this._httpClient,
          this._httpClient._accessToken,
          this._logger,
          this._options
        );
      case me.LongPolling:
        return new yc(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${t}.`);
    }
  }
  _startTransport(t, n) {
    return (
      (this.transport.onreceive = this.onreceive),
      this.features.reconnect
        ? (this.transport.onclose = async (r) => {
            let o = !1;
            if (this.features.reconnect)
              try {
                this.features.disconnected(),
                  await this.transport.connect(t, n),
                  await this.features.resend();
              } catch {
                o = !0;
              }
            else {
              this._stopConnection(r);
              return;
            }
            o && this._stopConnection(r);
          })
        : (this.transport.onclose = (r) => this._stopConnection(r)),
      this.transport.connect(t, n)
    );
  }
  _resolveTransportOrError(t, n, r, o) {
    const i = me[t.transport];
    if (i == null)
      return (
        this._logger.log(
          S.Debug,
          `Skipping transport '${t.transport}' because it is not supported by this client.`
        ),
        new Error(
          `Skipping transport '${t.transport}' because it is not supported by this client.`
        )
      );
    if (lm(n, i))
      if (t.transferFormats.map((l) => Re[l]).indexOf(r) >= 0) {
        if (
          (i === me.WebSockets && !this._options.WebSocket) ||
          (i === me.ServerSentEvents && !this._options.EventSource)
        )
          return (
            this._logger.log(
              S.Debug,
              `Skipping transport '${me[i]}' because it is not supported in your environment.'`
            ),
            new Tg(`'${me[i]}' is not supported in your environment.`, i)
          );
        this._logger.log(S.Debug, `Selecting transport '${me[i]}'.`);
        try {
          return (
            (this.features.reconnect = i === me.WebSockets ? o : void 0),
            this._constructTransport(i)
          );
        } catch (l) {
          return l;
        }
      } else
        return (
          this._logger.log(
            S.Debug,
            `Skipping transport '${me[i]}' because it does not support the requested transfer format '${Re[r]}'.`
          ),
          new Error(`'${me[i]}' does not support ${Re[r]}.`)
        );
    else
      return (
        this._logger.log(
          S.Debug,
          `Skipping transport '${me[i]}' because it was disabled by the client.`
        ),
        new jg(`'${me[i]}' is disabled by the client.`, i)
      );
  }
  _isITransport(t) {
    return t && typeof t == "object" && "connect" in t;
  }
  _stopConnection(t) {
    if (
      (this._logger.log(
        S.Debug,
        `HttpConnection.stopConnection(${t}) called while in state ${this._connectionState}.`
      ),
      (this.transport = void 0),
      (t = this._stopError || t),
      (this._stopError = void 0),
      this._connectionState === "Disconnected")
    ) {
      this._logger.log(
        S.Debug,
        `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is already in the disconnected state.`
      );
      return;
    }
    if (this._connectionState === "Connecting")
      throw (
        (this._logger.log(
          S.Warning,
          `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is still in the connecting state.`
        ),
        new Error(
          `HttpConnection.stopConnection(${t}) was called while the connection is still in the connecting state.`
        ))
      );
    if (
      (this._connectionState === "Disconnecting" && this._stopPromiseResolver(),
      t
        ? this._logger.log(
            S.Error,
            `Connection disconnected with error '${t}'.`
          )
        : this._logger.log(S.Information, "Connection disconnected."),
      this._sendQueue &&
        (this._sendQueue.stop().catch((n) => {
          this._logger.log(
            S.Error,
            `TransportSendQueue.stop() threw error '${n}'.`
          );
        }),
        (this._sendQueue = void 0)),
      (this.connectionId = void 0),
      (this._connectionState = "Disconnected"),
      this._connectionStarted)
    ) {
      this._connectionStarted = !1;
      try {
        this.onclose && this.onclose(t);
      } catch (n) {
        this._logger.log(
          S.Error,
          `HttpConnection.onclose(${t}) threw error '${n}'.`
        );
      }
    }
  }
  _resolveUrl(t) {
    if (t.lastIndexOf("https://", 0) === 0 || t.lastIndexOf("http://", 0) === 0)
      return t;
    if (!ie.isBrowser) throw new Error(`Cannot resolve '${t}'.`);
    const n = window.document.createElement("a");
    return (
      (n.href = t),
      this._logger.log(S.Information, `Normalizing '${t}' to '${n.href}'.`),
      n.href
    );
  }
  _resolveNegotiateUrl(t) {
    const n = new URL(t);
    n.pathname.endsWith("/")
      ? (n.pathname += "negotiate")
      : (n.pathname += "/negotiate");
    const r = new URLSearchParams(n.searchParams);
    return (
      r.has("negotiateVersion") ||
        r.append("negotiateVersion", this._negotiateVersion.toString()),
      r.has("useStatefulReconnect")
        ? r.get("useStatefulReconnect") === "true" &&
          (this._options._useStatefulReconnect = !0)
        : this._options._useStatefulReconnect === !0 &&
          r.append("useStatefulReconnect", "true"),
      (n.search = r.toString()),
      n.toString()
    );
  }
}
function lm(e, t) {
  return !e || (t & e) !== 0;
}
class Wl {
  constructor(t) {
    (this._transport = t),
      (this._buffer = []),
      (this._executing = !0),
      (this._sendBufferedData = new ko()),
      (this._transportResult = new ko()),
      (this._sendLoopPromise = this._sendLoop());
  }
  send(t) {
    return (
      this._bufferData(t),
      this._transportResult || (this._transportResult = new ko()),
      this._transportResult.promise
    );
  }
  stop() {
    return (
      (this._executing = !1),
      this._sendBufferedData.resolve(),
      this._sendLoopPromise
    );
  }
  _bufferData(t) {
    if (this._buffer.length && typeof this._buffer[0] != typeof t)
      throw new Error(
        `Expected data to be of type ${typeof this
          ._buffer} but was of type ${typeof t}`
      );
    this._buffer.push(t), this._sendBufferedData.resolve();
  }
  async _sendLoop() {
    for (;;) {
      if ((await this._sendBufferedData.promise, !this._executing)) {
        this._transportResult &&
          this._transportResult.reject("Connection stopped.");
        break;
      }
      this._sendBufferedData = new ko();
      const t = this._transportResult;
      this._transportResult = void 0;
      const n =
        typeof this._buffer[0] == "string"
          ? this._buffer.join("")
          : Wl._concatBuffers(this._buffer);
      this._buffer.length = 0;
      try {
        await this._transport.send(n), t.resolve();
      } catch (r) {
        t.reject(r);
      }
    }
  }
  static _concatBuffers(t) {
    const n = t.map((i) => i.byteLength).reduce((i, s) => i + s),
      r = new Uint8Array(n);
    let o = 0;
    for (const i of t) r.set(new Uint8Array(i), o), (o += i.byteLength);
    return r.buffer;
  }
}
class ko {
  constructor() {
    this.promise = new Promise(
      (t, n) => ([this._resolver, this._rejecter] = [t, n])
    );
  }
  resolve() {
    this._resolver();
  }
  reject(t) {
    this._rejecter(t);
  }
}
const am = "json";
class cm {
  constructor() {
    (this.name = am), (this.version = 2), (this.transferFormat = Re.Text);
  }
  parseMessages(t, n) {
    if (typeof t != "string")
      throw new Error(
        "Invalid input for JSON hub protocol. Expected a string."
      );
    if (!t) return [];
    n === null && (n = Xr.instance);
    const r = Ve.parse(t),
      o = [];
    for (const i of r) {
      const s = JSON.parse(i);
      if (typeof s.type != "number") throw new Error("Invalid payload.");
      switch (s.type) {
        case O.Invocation:
          this._isInvocationMessage(s);
          break;
        case O.StreamItem:
          this._isStreamItemMessage(s);
          break;
        case O.Completion:
          this._isCompletionMessage(s);
          break;
        case O.Ping:
          break;
        case O.Close:
          break;
        case O.Ack:
          this._isAckMessage(s);
          break;
        case O.Sequence:
          this._isSequenceMessage(s);
          break;
        default:
          n.log(
            S.Information,
            "Unknown message type '" + s.type + "' ignored."
          );
          continue;
      }
      o.push(s);
    }
    return o;
  }
  writeMessage(t) {
    return Ve.write(JSON.stringify(t));
  }
  _isInvocationMessage(t) {
    this._assertNotEmptyString(
      t.target,
      "Invalid payload for Invocation message."
    ),
      t.invocationId !== void 0 &&
        this._assertNotEmptyString(
          t.invocationId,
          "Invalid payload for Invocation message."
        );
  }
  _isStreamItemMessage(t) {
    if (
      (this._assertNotEmptyString(
        t.invocationId,
        "Invalid payload for StreamItem message."
      ),
      t.item === void 0)
    )
      throw new Error("Invalid payload for StreamItem message.");
  }
  _isCompletionMessage(t) {
    if (t.result && t.error)
      throw new Error("Invalid payload for Completion message.");
    !t.result &&
      t.error &&
      this._assertNotEmptyString(
        t.error,
        "Invalid payload for Completion message."
      ),
      this._assertNotEmptyString(
        t.invocationId,
        "Invalid payload for Completion message."
      );
  }
  _isAckMessage(t) {
    if (typeof t.sequenceId != "number")
      throw new Error("Invalid SequenceId for Ack message.");
  }
  _isSequenceMessage(t) {
    if (typeof t.sequenceId != "number")
      throw new Error("Invalid SequenceId for Sequence message.");
  }
  _assertNotEmptyString(t, n) {
    if (typeof t != "string" || t === "") throw new Error(n);
  }
}
const um = {
  trace: S.Trace,
  debug: S.Debug,
  info: S.Information,
  information: S.Information,
  warn: S.Warning,
  warning: S.Warning,
  error: S.Error,
  critical: S.Critical,
  none: S.None,
};
function dm(e) {
  const t = um[e.toLowerCase()];
  if (typeof t < "u") return t;
  throw new Error(`Unknown log level: ${e}`);
}
class fm {
  configureLogging(t) {
    if ((he.isRequired(t, "logging"), hm(t))) this.logger = t;
    else if (typeof t == "string") {
      const n = dm(t);
      this.logger = new li(n);
    } else this.logger = new li(t);
    return this;
  }
  withUrl(t, n) {
    return (
      he.isRequired(t, "url"),
      he.isNotEmpty(t, "url"),
      (this.url = t),
      typeof n == "object"
        ? (this.httpConnectionOptions = { ...this.httpConnectionOptions, ...n })
        : (this.httpConnectionOptions = {
            ...this.httpConnectionOptions,
            transport: n,
          }),
      this
    );
  }
  withHubProtocol(t) {
    return he.isRequired(t, "protocol"), (this.protocol = t), this;
  }
  withAutomaticReconnect(t) {
    if (this.reconnectPolicy)
      throw new Error("A reconnectPolicy has already been set.");
    return (
      t
        ? Array.isArray(t)
          ? (this.reconnectPolicy = new Ac(t))
          : (this.reconnectPolicy = t)
        : (this.reconnectPolicy = new Ac()),
      this
    );
  }
  withServerTimeout(t) {
    return (
      he.isRequired(t, "milliseconds"),
      (this._serverTimeoutInMilliseconds = t),
      this
    );
  }
  withKeepAliveInterval(t) {
    return (
      he.isRequired(t, "milliseconds"),
      (this._keepAliveIntervalInMilliseconds = t),
      this
    );
  }
  withStatefulReconnect(t) {
    return (
      this.httpConnectionOptions === void 0 &&
        (this.httpConnectionOptions = {}),
      (this.httpConnectionOptions._useStatefulReconnect = !0),
      (this._statefulReconnectBufferSize = t == null ? void 0 : t.bufferSize),
      this
    );
  }
  build() {
    const t = this.httpConnectionOptions || {};
    if ((t.logger === void 0 && (t.logger = this.logger), !this.url))
      throw new Error(
        "The 'HubConnectionBuilder.withUrl' method must be called before building the connection."
      );
    const n = new sm(this.url, t);
    return Xl.create(
      n,
      this.logger || Xr.instance,
      this.protocol || new cm(),
      this.reconnectPolicy,
      this._serverTimeoutInMilliseconds,
      this._keepAliveIntervalInMilliseconds,
      this._statefulReconnectBufferSize
    );
  }
}
function hm(e) {
  return e.log !== void 0;
}
const pm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAALJJREFUSIljYBgFo2BkA0ZKNAdwcPynlkPwgQ0/fuB0J0keQHfwkvJyct1EEojp7MTpCbweIOTg29u3U+w4bKDx0iUGBgYGhno9PQYGBgYGVU9PnJ5gwWVIAAfHf3o5GB3AHM7AwMBw9skTBgY89uL0AAMD/RxMCcDpgQ0/fjAyXLqEkoR8hIRQ1BjLyNDEUchJyFhGBhILOABFmRjdQ7QCW969Iy8TEwKDoRgdBaNgpAMADd47kjDZOq4AAAAASUVORK5CYII=",
  gm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAALZJREFUSIljYBgFo2BkA0ZKNAeocPynlkPwgQ13fuB0J0keQHfwotlp5LqJJBCXOgunJ/B6gJCDX2zYQ7HjsIGyrfcYGBgYGLq8lRgYGBgYJAJccHqCBZchASoc/+nlYHQAczgDAwPDoWsfGOwYcNuL0wMMDPRzMCUApwc23PnByLD1HkoS8lEUQlFjpyVAE0chJyE7LQGGQ9c+4FRLUSZG9xCtwJb778jLxITAYChGR8EoGOkAAFk0O1+Fb4cLAAAAAElFTkSuQmCC",
  mm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAALRJREFUSIljYBgFo2BkA0ZKNAeYcPynlkPwgQ1nfuB0J0keQHfwmn3TyXUTSSDEKROnJ/B6gJCDn52rothx2EBeyXsGBgYGhkk9ggwMDAwMUkZtOD3BgsuQABOO//RyMDqAOZyBgYFh1w5GBjcG3Pbi9AADA/0cTAnA6YENZ34wMpS8R0lCPi5CKGrcPGiTh5GTkJvHf4ZdO3CndIoyMbqHaAW27HlHXiYmBAZDMToKRsFIBwD+TztiwyUI1QAAAABJRU5ErkJggg==",
  Am =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAAKdJREFUSIljYBgFo2BkA0ZKNCsEcPynlkPwgQcbfuB0J0keQHfw4lWt5LqJJBAbVo3TE3g9QMjBu170UOw4bGBx3nsGBgYGhthJggwMDAwMbhIlOD3BgssQhQCO//RyMDqAOZyBgYHhzIr3DAwRuO3F6QEGBvo5mBJAUhLStEKVN4kQZKAFQE9CZ1a8Z7h+DHtmpigTo3uIVgCX4xkYhkExOgpGwUgHAC3TOfsBRpvyAAAAAElFTkSuQmCC",
  ym =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAALVJREFUSIljYBgFo2BkA0ZKNHMEuPynlkPwgR8b9uB0J0keQHfwyvVzyHUTSSA8MAWnJ/B6gJCDOx/cothx2MC5wi4GBgYGBqP+MgYGBgaGcgU1nJ5gwWUIR4DLf3o5GB3AHM7AwMDwYuVths5w3GpxeoCBgX4OpgTg9MCPDXsYzzEwoCQhKYtAFDUS4ao0cRRyEpIIV2V4sfI2TrUUZWJ0D9EKPDuxnrxMTAgMhmJ0FIyCkQ4A9UU7Ew7GQqUAAAAASUVORK5CYII=",
  vm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAAKtJREFUSIljYBgFo2BkA0ZKNHNwBPynlkPwgR8/NuB0J0keQHdwZvsqct1EEpheGYbTE3g9QMjBB7c9pdhx2MC1w4UMDAwMDFq2/QwMDAwM9l7SOD3BgssQDo6A//RyMDqAOZyBgYHh4715DAe3JeFUi9MDDAz0czAlgKQkJC2tiyLPr4Q7ZCgB6Eno4715DE+fXsaahCjKxOgeohXA5XgGhmFQjI6CUTDSAQBJrzz8i6rlfwAAAABJRU5ErkJggg==",
  wm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAAKpJREFUSIljYBgFo2BkA0ZKNMuyOf2nlkPwgce/9uF0JwspBqE7uMq1mlw3kQTadjP8x+UJvDFAyMEnHlyl2HHYwL7bGxgYGBgYnFQDGBgYGBgsFLQZ2na3Yo0JnDEgy+b0n14ORgcwhzMwMDBcf3sZr1q8SYheDqYEkJSEJIWUUeQ1hXVp4CTMJHT97WWG5+/uYk1CJJVChDxEK4DL8QwMw6AYHQWjYKQDAA+mO3Jtb9D8AAAAAElFTkSuQmCC",
  Sm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAAKZJREFUSIljYBgFo2BkA0ZKNLuy2f2nlkPwgd2/DuF0J0keQHfwopZ15LqJJBBXE4TTE3g9QMjB57afpNhx2MCEo50MDAwMDAXW5QwMDAwMRp7mOD3BgssQVza7//RyMDqAOZyBgYFhx631eNXi9AADA/0cTAkgKQlpiKqhyHuoBdLASZhJaMet9Qw3Xt/CmoQoysToHqIVwOV4BoZhUIyOglEw0gEAjtc7auuly6kAAAAASUVORK5CYII=",
  km =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYdJREFUWIXtVy1zhDAQfXROYHGVuM75qvsBp6OYmvwFVKcGjemc4i/E3KDQ9wNQ55k65DksLhXM8hlCoGXoTHlqhyybl83mbWK9JB8SG+Jpy8kB4EDGF/u0TH5wmS2PJ+D1zel8Pz+/g3sB8qQ0ikOZ3zwDO4HDtMsyuMzunK6x2lhMQPgFeOTU9jlW+MRhbXMvkCoiq2UAAG6Py4AM9wLZJqEk4DJbTh0nWn3fbuN+Lerjyr1A6TMoQjrn/T0cm+B+LZRjeVJaWVrZwi9wPDXf236zt6AKYEugWZ1OhMYIKgm4zJY8ciD8QqtoRCJLq+AC4wqYpY0/jxwIFNM1YAITyTXx2VyIdgI7AS0Bl9lSJ0hT47MJ5ElpkWqRIuom55EDEYeTqkmxVPqizUD/2rUGBkoIVOpFDabKwnRz0oGUUBVjkAERh50+/ltZMLqQ5Elp0cWhTUKg20rb9XF7XCDicNDnTTHoBRSEiKyN0Wb0kz2fg78tRCqoXkZUB0tEafMMWP/+dfwNRNDBR+tgi0MAAAAASUVORK5CYII=",
  Cm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqhJREFUWIXll79PIkEUxz9zwBYCRgzEtbPiYkG1iR02tiZuS4KNoSD+AfdHXHKtoSAUdyZeSUFLZXcJFYnmrrJcghETEXOomSt01tl1ZXe5y3HJvWrI/Ph+3nsz7y3iffuDZIH2bpHiAEk1+G5/FH9TWEU+GbYwyHrjSWDarMxSbCfmAlBCX4YjCbBfyM0dvVAA5a3fOymlG4WqlFIIIaLsiw1wdvczUPT48tqzTp8TQgh9328B7BdyQkopq1JKXfRi+uBZp88pGH9U5gKQmrAuejocexcWMq9gZEBqYgEocSWsi5YLGfe3PtZhji+vQyEiFyJdYOrcYueyTJ1bzzhobZi9CaB7rx+4t77M49U9ADulNXZKawA8Xt3zqbjugbiYPrhRiA0QZHvry2xn00ydCbVGDzuXxc5lqTV6TJ0JgAciikUuRFPnlq9n13x2JjTrFrsHJ1C3AHC+/aDTqlBr9DDMJRKrKQwzPT+AP/zlQgb72bNao8fuwQmdVoV8MgFAp1Vh9+AEc6vIkb0JQHt085S6QmbmZYwUgdPhmG5/wE5pjWbdgrpFPpnATL1s77QqrnC3P4gcgX+nHc8yfwpUzpVdPjy6KWjWLezt7EsK5gEQQgi3Aj4XmW5/4D4/lXMFoca1Ro/D9rl7CcuFDBtGkmp+5c2yHPkVGGaacinjPjtzq+jOmVtFao0ezboV2fPYAPBS4QxziSN7k/boBoBm3eKwfR5bHGZcQiGEqOZX2DCSlLVGczock1hNAdDtD+j2BwAkVlOvekVY+GcC+E2HMMw07dENhpn2jIPWhtnMFHguI3haru6tKlbKNoynY8O8DwXQIcD3FeTzUokqYbU37PxIl1AdNOuTTIlGFY4FEHSwv8XGEZ0b4E8I+m3hvWDhAOK//3f8Cys+ac2Qvw47AAAAAElFTkSuQmCC",
  Em =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOtJREFUWIXtlz8OwiAUxj9MBxI35u4ewGt06AF6DlnriOfoAbr1HmzGO3QzYcPFElsLSE18g3wLJDz4fjz+BXboTxaE2lGaA0AxVa71hf3SeMo8eQYyQAbIABmgiIf4VXMefUd6Y4I3bBLA0rCTcjWuUcq1NUrZEEQQIGZ4G4a3PmetZ3GdlEEIL0DNuf3E0Kd92wIA7s/Sp2AGUgy3ygvQG8Og9WwJKiFmMcey9A4cm3kUwEG8ahyju74SYrkJgych6RSkADVKrff5BiAKtEHkN2EGyABkAIwxAIwOwFoAsNRLQJgBh/D3v+MH/i5WOxez3zcAAAAASUVORK5CYII=",
  xm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAMhJREFUOI2VUUsOgjAQfVOqBMRtr+AhTDiDe9ecirV7z8AtuEJN3GhC+NaFYkrbtPBWnXmf6bQEDUMFhQDGCIjPoLlmIYOJaFzWtHayCzwH0VBB8XxbkK5frDA+s6DZ1Gx+AxNWgO8WLo73tQAgV4fo6GsBlhSSmlJs/oWmFCopJDG9MXXA1H3rPe295vlMFnFowdLRdv0wPVIkhfz7yBSE1tHNQTSlUKFA7iN3J+mjAThWAID2njmnxpe3pbca6nb0Xpmur4XnAw2bSxnrYAOiAAAAAElFTkSuQmCC",
  Nm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAKZJREFUOI2tks0RxSAIhJdMurABzynEAizQAiiELqiDd9LBn5jMvHwns7K4ZCAMmJmNmoeIyH+fo1lVd36Ymfkm5C+ezJUQQktyvHJsOACAmV+/DgCqCma2TxKco1BKaeec861W+T5BjHEqWmm3Da7rmopWWqXtATPbrtAjIkgpPe9BKaX7gStag5QSiUh3GWOc5vevA26Eym6U0dwlWMVfnUf+3oMfGztG1jQg8/sAAAAASUVORK5CYII=",
  Im =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAn9JREFUWIXFVzFLHEEYfSuLhJAUYpNAIGDhEZRr9TgS48LJdTZuYUDDdlYWLhi2uHNyVywJXMDORg5MIMXa+AfOJuGM/0ArrYKNja2yFufMzc7OzM56G/LguN3Z2Xnv++Z9M7MWDNF0KrFp31avb5n2tU2JG92O6ZiA58emQpQdROLbyxNjfvv1PACg7fmZIqQPm04llhGHJGLXAXGNhLQ9H4A6G6lGSi5GHJIIn5ZfsvsvR3+ZCJ2wrGyMmZCLeFquJYR9bjxhP14MMMjg7eUJGt2O1MhMgEgekig1mEgu4u6d2qgqEdIqCEmEzekSuw6Ii4C4A0FHBwDSqdaR62AByeh5cgCYfFvHzv6u1nQyD6h8QY1J/ZC5DphAFBeSCNcbUwCA+sISwtU9ZQC2OPc01ZvTJWn0f36fSQeaq5ak7SKoF+D5cavXt6QZYPN9fpZKX09iTJWI+sISTjXRA5opkNVzxsoWUxE0gNM9PTkA2K1e34LnG9W/Dg/CEiKA7NWzEBOqEJIIV9+Oh/dbiwiIm/CBzdR7fuzUyqARiOBfYu/kwNzsOC4k7SwDfAqlA1RLQxEAc7EpuQqJKeAGVAt5+OdLSdU3IC7CrUUWubEHFIMyUYlsGIhIkXIVZWxCMTuiCGCQlbznh9xVIJYb7wuRfOLVd+5+TSpiLNXyCNA9X4WZ98+UzwoRMAoKX4jovDe6HbS9NQDArx9DDxSyHYs+4MnXb5oABmdAk4NrYVPAkwPA9srP1JFOtqH9dw8UJiAgLg6etwAAL7w3+Hq4qj2KUeTaUEQ0nUrs1MopH1BBWeTAP6iCvAeZkQTQaqh++Kjsk/V9ONIUUOg+3bO27HuTxnsbqaiN6AAAAABJRU5ErkJggg==",
  Bm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAS1JREFUWIW9lb0RwjAMhV84ihSUyQCMQxfWgHkyB3SMwwC0FHSi0h3YkmPJP69Kco6l771YGeDQcRnJ8x7ref8MfL33FD/dDu7ij/P7797cAGvFy/zOFXP0zN2AtqEmreFBfKqI7V/xwhVzZKekcP1v/kChAwCiDVPNamuzdFxGutBEREQXmih1Eixrd+6OEsWrkvOmOUQWclY1B5qQ88ZbVB5yVrEDIblVSYu2bJWKa7NBi6N4DoSS/hM5AyuSNXtNW99EFQe07HN+WNlj1CLLccxyQMs13LjaLNjKVsrVOwuSDkjZSrmWkKsNSLlLUTQbwWERyd6SEcxyj+Iu5FwopKxBznI50IUckOlrkbNMDnQjB2L62uSsbAe6kQMxfQvy7Aa6Fw+b4HPfqs4XPbvMcnIvDiMAAAAASUVORK5CYII=",
  Rm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAx5JREFUeJztmk1u2kAUx/+gCFDrGoRkNVKLFC8q9rFyhIgzdJVz9Bq5ARsO0EWkKDdAYlNlg7oAqSmiIkIJpRJBEc2CejoeJrbHng9j/N84MTOe937z8caeV/ry/fNfHLDKpg2QLc9yhcqnBiDaoKhKCerQNkXVTw2gN+kHGvQsVyoUkfm5Yf73LBenEbZInQKe5aI36aM36ct8bKx2PctFGSBt+50QZUtqAG3bIaOgN+mjbTto207axwrp6v4WwNZp3x5g63wrwpZSXqLAz/VvHG3KeF97K1TvSJE92vWh8i5RvdyFQVFpA6A6XPIUJ4RqAeAvkGnqJ9EpJySzoVIZgNeMTuoMWy/Oc9iQCABnDBRlANgNkm9IkpHAcySOWlRIHC5mpL4fNgGFAOj9wWA5SrU3oGM7EB/kGwCfbIe0f3V/i6/zb4FQqTUMpgWRRHQP8/YIudkIJVVm9gEmwiSQIQDAfwiy3yjDlBkA7KKm640yMwB80W+VOpQZAHSo0xkpMgMA2Do+WI60tpkpACZUADBtgGkVAEwbYFoFANMGmFYBwLQBplUAMG2AaQkBMPXRQqVCAdAHC3l0HogAEOdgYd8VCoB31l6G3k9WqhUKoMWctbdth3u4sM8S/iz+a/UHz+VN4uPorEn4YEQ0ASHrKvYBUQWSpKntkwIAkqSZ7bsIAM9yccbk+wH6DihMiQCgU82GixmAeGlm+65AGGRTzTbI/yoZCINsbM+788Bh+BiqAoBpA0yrAGDaANNSliXmjhs790YnD6qaC1Wnfg4AuH682flNGgDW4eaxtVtovL3oBNGpn6O67v77+2IHghQA7rjBdxjAfLokv5Ey4+1FJgheLw8XM3Tq4fWUrwHNYwvz6RLz6TJwT7bz1XUX1XWXgBguZmjbDq4fb/BUucBTZbf3AUkjYHTygOaKPwIA/nRwxw1tU4HnuC9jUeC1KZNEdC9f/uiR+/5LXZikLYKD2h281UdyDSunQrxejpNtJnUE+M6xTqpymlWcHmelbAqwMAa1O+Ug6B6Pm2uodA3Q1fO0RJMsD34rfPAAXgAo8PyaSy1bAgAAAABJRU5ErkJggg==",
  Pm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACyVJREFUeJzVW2+IW1kV/70/aTbz8l5SpzUzyexOUJbC2oFqQRBEln4RWVBZ3aIVFtmxILhVwbp+EbZVFqwsorgKgtPa/TCIYFeF/SR0q5/cDosdprtQR+ykk2Qm0xknTTodO5P3nh9ezn333dz38l6SivuDwOTNPe+cc++5f87vnijv/Pr77tTUFACgXq+DYJpZ5HJ5AEC1WmXPs1kDpmkBANbW1uA4Dt7P8mo6nUYU3jj9CgDAtm3p//vJE/5f5dXDhw+HCr1x+hWcmJvDwvnLOPuP3yObNXpeGCUPAJVKhRnaTz6bNQJtksoPol+lB2L4fO36Rdy4cAxXZ2dx48IxPHX8CE4vXIJpWlBVFRsbGwFFvLyqstdC0zQAQKfTAQBYlgVFAXRdQ7E4CcBlH8uyYFlWIHxF+Tj6k8jrYo8tnL+ME69+A3dXt9Ga2MVfv3kEqO3CKmVwd3UbANBqtaAoClzXFcVDkc0asCwLrVarb1vLsqTyhEH1y+QDHbBw/jJOzM3h6uws8IngCz7/5Cz+gr8BAB48eABFUaSGEmgEAGBsLMOcr1TuRBo6Pf0EWq0WLMvC6moVmqZhbCwDAGzxiqMf8MK/n7wK+OEzfzKDq7Oz3qgDeP7pF9nL/rA8BwBwXQedTgeGYbBQJ3lFUaCqKgxjjMlNTU0hn88HnG80GtKPZ7TfQY8/7q3u/JTqp980s6wthX+UvOr/w8Xd1W3cuHAMzz/9IkqlEl6/9lpPr9brdfbiTCYDXl5RlJ72AHqcDwPfCTRVKHS90XNj6afos22bPQuTV1XVa0AN/7mwilfnz+GDxUPs5Xwk6HoKb798Ca7rAHDByxvGGBt9x7HhODaaze0e55s7u9IPoVScYOEdDHMFup6Cqiqh+gnVahW6rgeeSeVpIVEUBX/8wnewvHgby4u3sVHfZGJ8JLz98iWcmJvDW9/9JVzXBS9Pvc/Pf0LUyIvtavV1LC3dZFFgmt7Osb6+DkVRoOs6TNMM1c/c5UZflDcMA67rQq3VvPlDoXb9pQv43cmvY3nxdo9xpVKJbY3zJ73wE+UBYGXFlyUjCoUCCoVCYKRFUCRQZ5mmBVroNzc34bouHMfBwYMHmUyYflVV2eInyqdSKfZc5XvR3zu9zYEP/VZtF2dPnQMAlK/8HHdXt9kIhMl7Tpgol6dRLk+HOi6iUCigVJzA9r830W63oCjA/n4Htm1jYqLA2kXpdxybdSLgy+fzeaRSKWia5kWA4ziBxatarbLv4iL4+rXX0KrtsueNRgNh8hS+rut1AiFvZBAF+n+tvo5afZ099878pUDbKP3ZbDbQltp1Oh04jgPbttFoNHoPQlHYqG+yqXH9pR+h0Wig05GfsQn377cBACsrlVg6mju7QKOBQsEb6UrlDqann+ieGn1omgZd1yP108q/ubkVeH7gwAGkUinoug5d07TA3nnxzWX2N78QAsDy4m08e/hzOHAgBdu2sbe3D1Ee8E99g0LshM7+Xk+bKP0ELzAU7O/vB06OmqYxeXYOMIwsfjr/DhN+9tBn2Y5An2esT7P//+y3fw8oMwy5EaZpsnWAkDcy7BPZCfCTHUVRUKvVcf/+jrR9mP5+0B3HYQvFFz9VwMU3u2d1BTg1dRIA0Gpz53fXBaDgW1/6KMvHSZ7PuwFAVb0DBy1IgLfA8Vsi3wnkdOBZcxvFYrH7PrW7f/t7f5h+71SqCfb0yutiPv3CM08C6CUUbNuGpmkBQgGQ5+M0Svn8wUBHxEVzZ5d1wv5+J7JtEj6AToA89Dj5tKZpSKfTeOwxX1lUPi7m9IRyeRorK5XIswCPBrcOiO9NwgdE2c92gXj5dJrl02trawFFJE9G5vMH4Tg22u1kuwCPQqGA8fHxwLN++pPaH3sbTJKPU+i32+2A47f+tRJsJyyCfGTwI29ZVvc8YcXSn8T+yA6Ik0+HKbl3rxlw/uGD+4G2UTvAkQ+V2cgXi5MQ/RwlH6ADwXyadyIqn7YsqycfB/zQFx1vtv3tS+a8bF3gned3Dtu2pfoHsT/ABwyST/PyMjTbOwHnpW0E5xuNBra2trpOeR9+SoySD9CHzqe7vcufxmjhE5E3Mol2AACBqUBnCJn+Qe3Xk+TTa2vrUFU1kE/zI0+LHyBf9eM6z58DKBKoE8R8flj7e/gAz/j4+TTJE/j5D/ihyzsfpyN4XiD4frn+kfMBcfNpMQoIYv7fLw0WQe35TqjX1zA5ORGqf6R8QNx8WpSnY6+YAEV1gvic/543vZHlp0KU/qT2q4iAn08H02I+nwZ6j748ARKG2OuBZAcR9Ychjv1qv3xaUfx8msDn07SliJS4eArsB1lWSBAPUZqmoVK5E4sP6Gd/gA8YBrw87zw/h0XHxO9hUyQ91t+2Qe1XKZ9WVVWaT/OpbDCfVlg+blk5th/zu0BcKjwOxsfHUSxOdrlGBVNTUwE+YFD7e/iAMITl03HlZYhKhgKJUcQ7hrU/sj4ASH4/z/c4fxfAOyTSYTImiG8b5pBMvwgq8EhcH5D0fr7Vuodmc5t9j3MXwHeMrBPyRoZxAhT+SeoD+AKPM0vzUvsjt0EesnyaB09W5nL50K2QHJRtg3G3Rpl+Ec/9+SfSAg9RfqR8AA8+IYpKgsSpEDUdiBiJo//u6jZwHKzAgz1DRH3AIPfrJC+SIYCXECXZCcLm+9bWFur1NdTra1AURNYHLJy/LH0HXfNF1gcMwwcAQTLk1nvvxnY8CtSB/FE4jA+4fu43XoXL2V8A8KpaCHSd98j4AEK73cat995Feizrs0Ex5zYhLBLoeiyMD5g/mQG6FS6l+qa0wCOyPgBIfr8uZoKmaeLIUx/xnTGNRJmgbL2gKKjXu0xuCB/AV7iEFXj0rQ8AhuMD+iFpNMgQxQdQhQsPPhJE+3V+BOPk04cOHYKiePPQcRy4rhuajPTjAgH0HJBk4M8Cu7v/Yfk86Sdce+GH+PiPv8e+81HAdOTzAftHwgd4L/YvQga5BImLfnzElVNncOXUGSwv3g6Efph85Dkgzv26YcivwYZJhPhIIEqtWJxEtVpDLpcL6BfrA+h6f/fOB3qmwoPNvR77e+oDeMS5X0+n0wEyNImT/dYDcn5m5ijq9TVWIeK6rrQ+gL/e/8rHPokri38KvI+u93n7WQQMyweEIezIG3Y5ErUFLi3dZGuBuPsYRhbfPnUcP/jVW+zZl0vPAQDa3SqVr37mwz3v1Ye9X48C8XnkXBzwnUC3w0tLNyUtlQAfQPaHXe8TRPv7/l6AEFZv//DhHlsICeXyNHM+bxrImwbKE8EVuV+5HHu/QIeJeKS/FwAGr9cXaaxmeyfRgYilye0daSc88t8LJOUDiAugNLhcnkZ6LMs+cSFdG7rnCZr/ijK63wuMjA/gwXcCkSK0osvuAPoVTImIwweICLM/sgMofML4gFwu12MYgarDZBckYRDZoDCE6R/E/pHxATwjxJMh/MmQLYwJR53kKBsc5e8FdP8ffmrJ8wF0+8LzAbruJROy+gDxajzOLVGPw0aGOU3rx8zMUQCUpsv1D2K/Ojwf4MvzKTWlrj3OmfKjcxSoRsB1Jfn8kPaPrD5AJh+GuJ1Ao0+hv76eTP//tD5AJk+g8I0L2jpnZo6y0R9Efxz7R8IHhMnTr794x+KAvwegQqlB9MexX3ccJ3Bl5PMBwTDl+QBNU2HbNjY2NtBPnuzjoyBsfeBL4vnfGwyjv5/9Q/MBcev19/b24LoucrlcT+0/QVU1lrj4Ncmj0R8mPzAfUKncgaqqA9Xru66LarUGVVUDe7e4gD4q/bz8I6kPeD/J/xcRit1w/+Fl1wAAAABJRU5ErkJggg==",
  _m =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAB2lJREFUeJzlW01v2zYYfijJsi07sJumboKtQGFgQ4Yi110G5DzsR+x/7LDLsOv+TrFzfkAuRdCsh6BYNrR10ixubcfWF3eQKFESSX3RyYA9gGBLpEi+L18+78sPkb2vvqX4H8N46AaUwex0YHY6Wyv/P6+AwPMA6FNEvhxLlKFqo+4LZfVRQjL3hIbsXyaNUFooq6CANsKVKa+sbNX7Ze/2nYE07W61lKYVFNAGbS2j6fuWZcFzN8p03/fFaaqCe4Nh4dl6uajZvO1DJhwQgFACSuRUJ1QAE1ykVZZWVREis9YxzPgyCJV5cqMkXaIAlXCyxosapsqvQpHUAFALIJ52AtbGAbobxpPa3WoJED9ShGZkFFDHndSBjN1lSsuTmmVZCFwApJmS8/Xz9RYsoKk7UaGudQjzk+IjHfVnFNDGnTw0VL2sQkYBbdyJqBGyhlBCCsOoqQBN8zNkFNDGnbRpRNV3eSXpIl2tkeC2sY05yIPMBut6kW3i3i1gvPe0NM/V29foDHeFaaG7gmE72tqjRQGM1EI3cpOkm84hHj2eZPLOLl6Vltd1dtCxIuO8Wy1gdAcgNITZsRGsfZidTmY4VCVfEdFqs4DeYIjVJgqhTRpVbll2QeD5z7fRHwcAP9fiou/RT8Bm9RkAMNzdBwC4PrCZXyUN51GVG0T5iGpNsCrr8vk2tx/QHT+FSQMsbt6nAjMwwUeV2ozRj2MAwGR6hOs//4DljLUOA6UCqoOCEgrAhP9pBsM0Efh+JHwQh3AHXDV54edILWBYzPPbr3388qaLrrMDz93AsOyMAmQdVSW20KQArpLVjVh4UY+f5+LbWfx7TIv5Tg2Mft/BcHcfrh9CFxIOqDthESFcz7PCH1DgHYku5JTAhD/khD0EcEKAlySyhCx/AgCc8RMYd8va6xEyOZI4IPA84VUHu19+nd6wXj+gcgs4FBjfMQWm8X9mEafZcMVzNwjWnyq1qUyO7ccBMrJjws/j+wVScjykAEikgNNirOYt5wh9H6QBGeb5QqsCVrdX6c0IkTkzMHPO9/oo98tDYuWh74IYhlD4MuIrXRZXFagypfHeU8wuXmH+/edo/L+ME74TmD8b/zPuWZ74mBUgLFoBDUFMcdPrDttSBagKZKtEdLPE/P3bNOE1gC6Kwp+TVOhJfB3SyFJOiEQJAFPC/Nk1Rhev0HV2EITVnVetFaGqYMIHq1vQwAOsnBeRCc+E5nEcK+GcRGlzKBH4LmBk61NZqqoTG88GCaUglMLqj2DaDnrDR2niNyia/QUiQQ9iAfkrj3ckep9dFdDUc2mZDpcy8QkB2EqbLCBaIOp9fphIYOYiwTbQth7gjJ9kH/A9vADwmEtjSmAsP0PR9zPko0UAo/3nbZqaQWs3GLor9Jxh5AGeXSNiPxR7mo/q/kbk87+I73ny+4hUWUx4QSygC8KS2R46f0kLsB2sF/+U13QR/86RTnjy458JzCuECX+2wehyD5PpEW6vZwDVc2hCaAF1icS0bPj8cvqpASBM2X6KVAEyUjsnUZ5ueX2UQNtOkXAyVHdKWRnMzeVxQlI+mBaT82izUyQMhVUzJq0rsa8BzARbPGweIIoRBAg8T7pTpNpYTd7lYLCHbQT13A0m0yOMLveAs3gonBrZKe8PNOsJeEimvgni8d91dnD19qy0PX1nkFyUANSQ72bV9gKi8wGGZePmrzfFzHkuOKZCt5agpPe9zQpmif+vu7FaSwG9wTApvDcYJkowbAf+8qP8RX7sVzDx5J0cDNNC4K6VQVDdjdUMB5QVyvd6nijN8T5MGmB0CcxxDbyI6Tzx4ZwlqKyAQeD7TcsGhad1i8zSUUiioMUNTMvC6HIvUgLDi246HIB6gQ03/t27BUBMeMu5tlBY64IIMQyEgQfL7kaEGCNVRgUnf5bdnmfCU6uPzk4f/ipaZte1NJ5RQBvTCt0ViGEANFoS7zo76PQG8NZLjC6jPBmrkIBXHIA48vuQ3OeXxNsio4Cy7SZRPgBJr7BNi9B3Qa1+tHxt9TGZPgcAjCpsi02mR5l7XnhAPfNsErRJh0DtpSUn2sExbAeh72bSmBCT6RHm79/Cd+9g2f20Lt9Fb/gIzvhJQWCGKsv2TbhM+8ZIFYTuCgAQuGvpLvB94UEOSDAzbjuWRUdtarel1dsPiHzM3xSls8EmjWlyvjBbvys9kJVObvScVksUUPeQUv6dtucLVfWLTo3qQi0OqHqyU5Te9HyhbHKjmuHVKj//oMkucdvzhSrky45WgfRxt5YvRtqeL8yjLLdpA4CeU6tSVW7jUKIKoo8zGPIcsrUhsE2hVSe5zE6nlEOS9hCKELTN2els2aIGidD2yw9V3nxaxq3SMBHW7NjRLwCZ9dd1yZXZ5L4/lUtADAAUoBSB50b/YSlXeeq4ZG102sZCyoYeBQFJqNGIT6SJUdcll3wxgsySsgrbOCneJLiq65KVX4xs81sdFQillYhRJGxdl6z8YqTttzpNQQnZanDFo9wL5Mim7NydDrBeEs34CNU7gf0XokT0FT4JpCkAAAAASUVORK5CYII=",
  Tm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAx5JREFUeJztmk1u2kAUx/+gCFDrGoRkNVKLFC8q9rFyhIgzdJVz9Bq5ARsO0EWkKDdAYlNlg7oAqSmiIkIJpRJBEc2CejoeJrbHng9j/N84MTOe937z8caeV/ry/fNfHLDKpg2QLc9yhcqnBiDaoKhKCerQNkXVTw2gN+kHGvQsVyoUkfm5Yf73LBenEbZInQKe5aI36aM36ct8bKx2PctFGSBt+50QZUtqAG3bIaOgN+mjbTto207axwrp6v4WwNZp3x5g63wrwpZSXqLAz/VvHG3KeF97K1TvSJE92vWh8i5RvdyFQVFpA6A6XPIUJ4RqAeAvkGnqJ9EpJySzoVIZgNeMTuoMWy/Oc9iQCABnDBRlANgNkm9IkpHAcySOWlRIHC5mpL4fNgGFAOj9wWA5SrU3oGM7EB/kGwCfbIe0f3V/i6/zb4FQqTUMpgWRRHQP8/YIudkIJVVm9gEmwiSQIQDAfwiy3yjDlBkA7KKm640yMwB80W+VOpQZAHSo0xkpMgMA2Do+WI60tpkpACZUADBtgGkVAEwbYFoFANMGmFYBwLQBplUAMG2AaQkBMPXRQqVCAdAHC3l0HogAEOdgYd8VCoB31l6G3k9WqhUKoMWctbdth3u4sM8S/iz+a/UHz+VN4uPorEn4YEQ0ASHrKvYBUQWSpKntkwIAkqSZ7bsIAM9yccbk+wH6DihMiQCgU82GixmAeGlm+65AGGRTzTbI/yoZCINsbM+788Bh+BiqAoBpA0yrAGDaANNSliXmjhs790YnD6qaC1Wnfg4AuH682flNGgDW4eaxtVtovL3oBNGpn6O67v77+2IHghQA7rjBdxjAfLokv5Ey4+1FJgheLw8XM3Tq4fWUrwHNYwvz6RLz6TJwT7bz1XUX1XWXgBguZmjbDq4fb/BUucBTZbf3AUkjYHTygOaKPwIA/nRwxw1tU4HnuC9jUeC1KZNEdC9f/uiR+/5LXZikLYKD2h281UdyDSunQrxejpNtJnUE+M6xTqpymlWcHmelbAqwMAa1O+Ug6B6Pm2uodA3Q1fO0RJMsD34rfPAAXgAo8PyaSy1bAgAAAABJRU5ErkJggg==",
  jm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAqxJREFUeJztmE1u2zAQRt8M5TiOpLiLZOej9ii9Us/QqFCdH3iVRRaxSHbhiLKAVHWrtAwRzsoY+ZHAgKb8Pvn65bPfbDYAbLdb+qrrivX6EwBt24Z+VZXU9SUAt7e3OOdImdflcskpZa19tZ86X1xfX0+CTdNgjGG5XHJ+PmzWL5g6r33jV8fHGANA13Uvzy5RVR4eHkYbpcorJ1ZVleHz4+MjInIq+q75yQE0TQPAxcUKIFweT09PiAjr9Xpy0xR4heH4iAh1XYUF+uOjOszJe0fXdZRlGfop8zo88OFY9L8fa23oHabn2W63YeHVakXqvKpKmF5ZXoQF27alKIpRD4SiWKAqeO8AT/K89z4scDy9415dXyICd3d3iMjLwiXee1Ln9cePw+/n+Ja8ufmGqobLA2C32+G9xznHYrEI/dT5op/g8fSMKXDOhukB7Pcd1lqurq4QOVwwzjlS59U5N3qntm2LiFBVw20K0H+v6zqcc1hrub+/J3V+8n9Af3PudrtR/+zsjMViQVEUU3gSvBpjRu/O4xI5XCT7/X40ZWMM1lqen/ekzocTUJavL3JqpcoXzrlwURx7s4igakZfVtWX9+fw7k2dz3lAbB+Pzec8gBPrvfr8XD7nAZC2z8/lcx4Q3cdj87F9PDaf84DYPh6bz3kAE5WCz8/li9/5NAw+3R+3P/Hxf8U3zXdUdfb+Hz4P0N6nVfVVnz526rFPy8jH/ze/2WzeZP+cB8T28dh8zgM4sd6rz8/lcx4Aafv8XD7nAdF9PDYf28dj8zkPiO3jsfmcBzBRKfj8XD5aHvBWPp/zgJl8tDzgrXw+5wE5D8h5wCw+5wFTUAo+P5fPecDwIE2fn8vnPCC2j8fmcx4Q28dj8zkPYKJS8Pm5/F/nAXN9/r3wHz4P+AkG643Ulk1LZwAAAABJRU5ErkJggg==",
  Dm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABFNJREFUeJzlW1162yAQnLVQmtR57BV6hd7/UE3SWra2D7JsJMHCwiInX+fJFhKCgf1lRT9+/mL8xzg8egApdH2Pru+b9f/pCbgMAwA7Itb9uNANuYPaC6n3MdHiP/E4/1q0EfOmrw0BNZNLkZfqW3o+9ezL92O07eP9Ldq2IaAGtTuj9HnnHIbTX7H9fD6H26SOn4+vm2t/3n4rh9cesckBFxATmOKqLkjAPPEQq3NbLhGhbW0hZn4fxDFLfki0RwiQJhcbfGhg0v0StkoNADuABnMFbKYDrAfmK7WP9zeAzhMRxlgQoDEnGsS0e4y0tVJzzuFyAkBlJK/f7793swNKzYkE7e4I3k/bSxbvXxBQY04eDWmVJSwIqDEnoUHEBsJEGzEqnUDp/TMWBNSYk5pB5D7rk2SldE09wdZoEYM8JBrUWpGW+PThcGuYiMBdqfH1/5LXrBXnHqAzOGLuiEd0/dPtvy8Ouco3pGjNdEAocAKWvoOk6fkwWaCNBxi5P+d6zn0iAblaV/IfnHO3Z6U+aHTonrDxAFv7HSIB+cyewMQAumC76MSxT3JcBCTEFirHtzASAQIxYdYBukeHBQkxMOJE1ojGjQBtwLIHpLhEm4+IBl7zj0dOFDRghMOBxutOmgYuxSVd32eNOXXPrp7gRia9ELfvCcBk5i7DadIrAOCZVAsHaq0vdiVgsxrkt10AnO8XiVASA6cUXzItLnVYktbOFS0mBvEBN2cqMvnUeLSinCRA6nDOEs1bs1iPcI+X47dos+8QlbxDlRHKxTp9VgM+nDGc4u2+MxWDtDOyM0IaWEZ0NLqkM4VAEsWHSUJkDwTtMg2YnamQJ9gyfN6dgPVKSaJEzKaiFsLDM0Kh1fVzhq2TJ0ECtOYsJ+jQ9LmetHRSVIsgAS0ysrWudquTomAwpA0pLSDaasOToqArLEVM1o5HjGjpPZqTopS4BF1h61VVTwa2OX+NuKitQG59QCoOX8PsoEMpLioCno+vt86fj69FdQStoT1YXeiAVKf+hHPk2go1xVMpmOiAWh+hpv9aNPcE8/MB7ZwdCQsCardy7WrvVRbjY0FA6rgpdF/O9VCfG3ts4OyULEBUBFrIXY2zk5O2Lxnzw6PBXLRShF/6eNwiV/BlCbBKlCSjwZLBlNQXLt9/ihZk3c2jzamx6mhM0rK19YXS+0Pm0QoqJZhb2RlqLz3nj5nHuaCiFtlfjEgrVFtfKGHd9+QY2Rkvky9GausL10jd3T0BgE31SJTK1hHeGrEaIyBQK9RKBFpOWsoKp2oBFkdjxBijR6d6RGOBNWq//NC4wQuzyuNtsnOZXAcgtvu1JjlbmzysgoSuR+bMuAyn6TecmOXRmGQzdVqzQ1KixyDQTTUeroeoYWhNcuKLEWQnJVpUipc4V1qTLH4xsldSYg1izlKMoclqTbL4xUjttzqlYKKmzpWPtBVYKRttvr8E8yqFIr6pjsgO/wACtSUfxlFepAAAAABJRU5ErkJggg==",
  Ht = "https://snake1v1-gvfug6g0bwcfgjeu.spaincentral-01.azurewebsites.net",
  Mm = "/Snake-1v1",
  nr = [
    "#cf3636",
    "#da6f2a",
    "#e2c019",
    "#7de219",
    "#3adfba",
    "#3245df",
    "#5f2b92",
    "#b541b5",
  ],
  Wd = [pm, gm, mm, Am, ym, vm, wm, Sm],
  qd = [
    {
      id: 0,
      name: "Head-Tail Swap",
      img: km,
      description: c.jsx(c.Fragment, {
        children: "Swaps the snake's head and tail.",
      }),
      cooldown: 7,
    },
    {
      id: 1,
      name: "Freeze Time",
      img: Cm,
      description: c.jsx(c.Fragment, {
        children: "Freezes the opponent for a few turns.",
      }),
      cooldown: 12,
    },
    {
      id: 2,
      name: "Cut Tail",
      img: Em,
      description: c.jsxs(c.Fragment, {
        children: [
          "Requires 4+ size.",
          c.jsx("br", {}),
          "Converts tail into meat.",
        ],
      }),
      cooldown: 15,
    },
  ],
  Ws = [
    { img: Rm, name: "Plains", tileset: Tm },
    { img: Pm, name: "Desert", tileset: jm },
    { img: _m, name: "Volcano", tileset: Dm },
  ],
  Zd = xm,
  $d = Nm,
  bm = Im,
  Um = Bm,
  ef = A.createContext(),
  Om = ({ children: e }) => {
    const [t, n] = A.useState(null),
      [r, o] = A.useState("Disconnected"),
      [i, s] = A.useState(""),
      { playerData: l } = A.useContext(Pt);
    return (
      A.useEffect(() => {
        const a = new fm()
          .withUrl(`${Ht}/gameHub?playerId=${l.playerId}`, {
            withCredentials: !1,
          })
          .withAutomaticReconnect()
          .build();
        return (
          n(a),
          a.onclose((u) => {
            o("Disconnected");
          }),
          a.onreconnecting((u) => {
            o("Reconnecting");
          }),
          a.onreconnected(() => {
            o("Connected");
          }),
          a
            .start()
            .then(() => {
              o("Connected");
            })
            .catch((u) => {
              o("Disconnected"), s("Failed to connect to the SignalR hub.");
            }),
          () => {
            a && a.stop();
          }
        );
      }, []),
      c.jsx(ef.Provider, {
        value: { connection: t, connectionState: r, errorMessage: i },
        children: e,
      })
    );
  },
  ql = () => A.useContext(ef),
  Lm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAulJREFUeJztm71uqzAUx8+96uAxYmaNxBRFyt4dqUPGO2TtMzC1FWXiPfIAd4jUnT1SxFTprsyoI1s6XLkyrm1s/Nng3wYJ+Phvg30+AIhEIkvml+jHPUJXF0b8HQahHTbhNrxH6HosCidGHOp6dGxCEHrwePdknsSd//f2BgAAZdsCAMDLZqNrF5N1no+OdQWh7V/nORzqmnkfrgAvmw2cuw52aarSthFYgsiKQHb+3HUAALBLU64Id6aMNgkeOV1kBo8rADn6th8BPFKYU9+PjhuUVTBclO5Ztu2XvWXbwpGaVRimAA3KKujfn/DxQ5IwDTUFs8ME/cfl2UrDwBGg/7g8N6stkCLYxEaHydkqmrncR+BLBAfYHOEphC9Bn4a54rdvA3wTBfBtgG+iAL4N8M3iBdDyBWTjBT79/SmUBKA7LBsvONT1NVQRhAJMdZjntdHO07EoZomA27cpHlcAVkRI1k0l997nrgOY4d6S7ducQcIZYMovn4uL9rkCNCiryrYdeYPYLcbwAg7kI7BLU2tutAnUvEFJ95iOH5z6flZQwwVK3uBcQRqUVSqeJR3UnPsSlUFpGZwURPK6kNDaCIXcMVkWvxUOTgD6+Qf4vxwei8JKqi44AVxzcwI0KKsOdT3KLuGsEB19BrhBAVRZvADMZdBWXUCILvE3g2zWBchkefcIXR+SBE59P8rt4XMyIiar7ev98P5EXs/bjXI3QqY9MTrlHQrBvgNkc3u6BFkfgCELHHSuFxGcAGRqHnf83HVKLjWd3RZ5o0oCyAY2dMpqSOPJugFVl5qMZ4iukxZgnedQUsVLPP48Pmq9RFnBmDmep8w1yo8AaztJcj+YKapw5WorCzBpGEJOqkpMEewy6IoogG8DfBMF8G2AbxYvgPIy6OobAldIC4Ajs7L//SkwBeB1QKdjoYqy+HdAFIB10kY+P9QaAeEHE0vgmwD0xxImCbFIghliTlbbVxuN3UI6PRK5MT4BejSWRIkFWKkAAAAASUVORK5CYII=",
  Qm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAvZJREFUeJztm7ty4jAUhs/upKD0MBS0yVAwVDyBKzooXGS2pINHoNiZpAhdHsF0PEEK3KXyE1AxKTLQbsF4XG7HFhltZEWSJesarK8z2NbRL1/0nyMDBAKBNvOD92cy6FxsBPHy/pcbh0mYDSeDzmW7WVoJYr5IK9s6BCEHj3VO6o+o839eXgEAYJUdAQDgeXqnGheVfjKpbKsKQsbfTyYwX6TU8zAFeJ7eQX4oIR5FMm1rgSaIqAh45/NDCQAA8ShiinCjK2idoJFTRWTwmALgo2/6FkAjhdidiur/5+EaYC91zlV2/B/vKjvCNqHvRxXgo8G3B7Q9u+1SA9UFvcOfFOX+0UjDwBCgKPePOYwBF8EkJjqMX628K5d5C3yKYB6TI1wH9yHoMjBb/HQdgGuCAK4DcE0QwHUArmm9AEpeQDRf4NLv1yElANlh0XzBfJFefBWBK0Bdh1mujTRP282ykQiofZPiMQWgZYREbSo+984PJcQgb2/x9k1eQdwrQJcvb4qN9tn5gPNwvcqqbhDZYgQr4YDfAvEoMmajdSDpBsXsMZk/2J2KRkkNG0i5waaC5OfhWsZZkknNpg9REaReg/WCiB3nE0oTIZ87Jkrrp8LeCUDe/wAfr8PtZmmkVOedALa5OgHy83A9X6SV6hKqCpHZZ4ArFECW1gtAfQ2aWhfgoyX+EpDJdQEiVd5k0LnMbruwOxWV2h76TUTEbjR+intvD/jxrNkocyKk24mRJW9f8PYZIFrbU8XL9QEIfIGDyvE8vBMAL82jjueHUspSk9VtnhuVEkA0saGyrAYPHl83IGup8XwG7zhhAfrJBHZZWr8jAPz6fa/0EKUlY5o4T5FjpG8B2nQSJ+7pWVRhy2pLC1AbWK9jZVWJLrx9DdoiCOA6ANcEAVwH4JrWCyD9GrT1DYEthAVAmVnRfb8LVAFYHVDpmK+itP4ZEASg/Wiinu/rGgHuBxNt4IsA5McSOvFxkQQ1xdyNxk8mGruGcnogcGX8A37YmJWDw9UFAAAAAElFTkSuQmCC",
  zm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAv9JREFUeJztm69v4zAUx19PBwq3wOKBwqoqHqimqmCgoH/A0ZCioEkbWKWioZH+EwUHAqqqKgg+nQoHggfTwbEMdL46ru3YcfzjGn9Y0jh+/jr+8d5zATweT5Np8X6cDNq5CSN+//nk2qETZsWTQTtf7ZZGjJgOw8J1HYKQncd6J/Umavz73wcAAJhFBwAAeH25VrWLSqe/KFyrCkLa3+kvYDoMqe9hCvD6cg2bdQtGYyOjoABNEFER8MZv1scio3HOFOFnXUbXCeo5VUQ6jykA3vu6hwDqKUS8zQrXSdqdA+yl3jmLDv/snUUHWO3oz1EFOFb49ggQAADA/V3wbaiUDcLQG3wi+9g/6amZIUD2sX9K0h4cRdCPjgbjXyvvy2UOgZMI+tHZw2VwJ0Gbhpnih20DbOMFsG2AbbwAtg2wTeMFUPIFROMFNv39MqQEIBssGi+YDsPcVRG4ApQ1mOW1kc7TaresJAKqX6d4TAFoESFRNxXfe2/WLRiBvHuL16/zC+J+AXX55VUxUT9TgCTtzmdR0RtEbjGCFXDAh8BonJ/5+y4h6Q2S7nEANMj4QbzNKgU1TCDlDZYLQidJu3MZz5IMaladREWQWgbLBREr5xJKGyGXGyZK47fCzglAjn+A43K42i21pOqcE8A0FydAknbn02FYyC6hrBAZfQa4QAFkabwA1GVQ17kAF13iM4N0ngsQyfJOBu38/i6AeJsVcnvonoiIwVXv+fbm7REvz9qNMjdCdXtiZMrbFZydA0Rze6o4eT4AgR9wUCnPwzkB8NQ8avhm3ZJyqcnsNs8blRJANLChcqwGNz7enu7LutR4PINXTliATn8BcRSWPwgAvx6WSpMoLRhTxfMUKSM9BGjbSZzbm3oOVZhytaUFKDesbeRUSV04uwyawgtg2wDbeAFsG2CbxgsgvQya+g+BKYQFQJFZ0Wf/F6gCsBqg0jBXRWn8HOAFoN3Ukc939YwA9w8TTeBMgFNEpn5cPCRB7ebgqveso7JLSKd7PBfGF8DamJXS8QvmAAAAAElFTkSuQmCC",
  Fm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAvZJREFUeJztmy1z4zAQhvduDgRlmqLAQJcFBBUVBQdlQvwXMgeCztOCesIO9S+YZIKKi4yCAsJSePBQ3TE6lgMeXWRFkiXr82I9LP7S7itL1u4qAIFAoMt84Z0czXonG0b8ev3DtcMkzIZHs94p266tGBHPk9pvHYKQncd6JvUgcv7t908AAMiWRWXoy0DVLirT4ar2W1UQ0v7pcAXxPKE+hylA/DKA/aaAycKM0zxogoiKgDu/31QdN1kMmCJ802W0TlDPqSLSeUwB8N43PQRQTyGOu/r5Mo9SgIPUM7Nl8c/ebFnAdEu/jipAmUfpEd4fASrD7u7phuqC7vCZj8/Dk5GGgSHAx+fhCfIxVCKYx4TD+NvKe3OZQwCJYAOTPdwEdxJ0aZgtvro2wDVBANcGuCYI4NoA13ReAKVYQDRf4DLeb0JKANJh0XxBPE9OvorAFaDJYVbURgZP2XbdSgTUvknxmALQMkKiYSq+9t5vCoCFfHiLt2/yDeK+Abri8rbYaJ8pQJlHabasR4MoLEawEg74EJgsBsbCaB1IRYOX4THdMTJ/cNy1S2rYQC4abBSETplHqUxkeZGUbTmJiiD1GWwSRPg+j1BaCPnsmCidXwp7JwA5/gGqz2G2XRsp1XkngG2uToAyj9J4ntSqS6gqRGafAa5QAFk6LwD1M2hqX4CPIfGFQSb3BYhUeUez3unuvlo+47U9dExExNub8XP/4f0Rv5+1GmUuhHRHYmTJ2xe8nQNEa3uqeLk/AIFvcFC5n4d3AuCleeT4flNIhdRkdZsXjUoJIJrYUNlWgxt/3J3bkw2p8XwG7z5hAabDFWS7pPlCAPjxfaU0idKSMW0iT5F7pIcAbTmJ03/Qs6nCVqgtLUCTYX3oWdlVogtvP4O2CAK4NsA1QQDXBrim8wJIfwZt/YfAFsICoMys6LX/C1QBWA6oOOarKJ2fA4IAtIMm6vm+7hHg/mGiC1wIcM7I6MfHTRLUFPPtzfjZRGPXUE4PBK6Mvx7lmp5kKxvYAAAAAElFTkSuQmCC",
  Hm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAwJJREFUeJztmy1y4zAUx9/uLMgYdTIFmaKQBGeKCgtygBj5ArlASINaUKOa5AK5gJH3AAsMjTLFDSnyBHg6RZ2yLOhoKyuSLVmfG+vH7ETW01/Wx3tPBvB4PH3mR9OPg8X8aMKIz99/Gu3QCbPiwWJ+TLOtESOicFm7ViEI2XmsZ1JvosY/vb4AAMBulQAAwPXmTtYuKuvxtHYtKwhp/3o8hShcUp/DFOB6cweHdA+jaCJStxJogvCKgDf+kO4BAGAUTZgi/FJltEpQz8nC03lMAfDe1z0EUE8hyiKrXQd5FX8KPnO3Sv7Zu1slAIz5jCpAkFdxCdk9QAgAAFc3IdVQVdAajF+/vT8/aKkYGAK8vT8/DPMZfImgHx0Nxt/WpjeXOQSQCCbQ2cNtNE6CNg0zxU/bBtjGC2DbANt4AWwbYJveCyDlC/DGC2z6+20ICUA2mDdeEIXLo6siNArQ1mCW10Y6T2m27SQCql+neEwBaBEhXjcV33sf0j08ReKG4fXrfIMa3wBVfnlXTNTPFCDIq3i3SmreIHKLEayAAz4ERtFEmxutAiFv8NQ9rguCIOMHZZF1CmqYQMgbbBeETpBXsYhnSQY1u06iPAgtg22C8JZzCamNkMsN46X3W2HnBCDHP8DXcphmWy2pOucEMM3ZCRDkVRyFy1p2CWWFyOgzwBkKIErvBaAug7rOBbjoEp8YpPNcAE+Wd7CYH69uQiiLrJbbQ/d4RBxezB4/bi/v8fKs3ShzI6TaEyNT3q7g7BzAm9uTxcnzAQj8gINM+SacEwBPzaOGH9K9kEtNZrebvFEhAXgDGzLHanDjy+L7vqhLjcczmspxC7AeTyEqEq7/btZbqUmUFozp4nnylBEeArTtJM7H7aWSQxWmXG1hAdoMG8DcyKkSVTi7DJrCC2DbANt4AWwbYJveCyC8DJr6hsAU3AKgyCzvf/8XqAKwGiDTMFdF6f0c4AWg3dSRz3f1jEDjBxN94ESA74iMelw8JEENMQ8vZo86KjuHdLrHc2b8BZorn4PYvfOfAAAAAElFTkSuQmCC",
  Vm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAv9JREFUeJztm71u6jAUx8+9uoOVBcSapWKsVKkvULEzXDHxAGxIXTIytEMZGDuy8QBMnbpXvEAlJEaUxWtVliobHZB7HWMndvx5iX9bAonP+Tuxfc5xACKRSJv5VfUjQqOjCyOK4qXSDpsIG0ZodJwu1k6MWM7GpWMTgrCdJ7on9yRx/u0VAwDAbpMBAMD13bOuXVwGw7R0rCsIa/9gmMJyNubeRyjA9d0zHPYr6PQnKm0bgSeIrAi084f9CgAAOv2JUIQ/pow2Cek5XWQ6TygA3fu2XwHSUwSMt6XjBOXzolC7526T/di722QwGPLHM64ACcrnGMMDwMmwNL3hGmoKnsP08cfn+6OVhkEgwMfn+2OvC3ASwT42HKaf1qonV/gKEBFcYLOH66gcBH0a5orfvg3wTRTAtwG+iQL4NsA3rRdAKxaQzRf4jPfrUBKAdVg2X7CcjY+hilApQJ3DoqiNDZ6mi3UjEUj7NsUTCsDLCMmGqfTa+7Bfwdurek6Bbt/mE1T5BJiKy5vion2hAAnK57tNVooGSVhMECUc6Feg059YC6NNoBQNnofHfMfY/AHG20ZJDRcoRYP1gvBJUD5XiSzZpGbTQVQGpWmwThDZ60JCayEUsmOytH4pHJwA7PsPcJoOp4u1lVJdcAK45uIESFA+X87GpeoSqQqx2WeACxRAldYLwJ0Gbe0LCDEkPjPI5r4AmSovQqNjmt4AxttSbY+ckxGx1719+iquHujrRatR4ULIdCTGlrxDIdgxQLa2p0uQ+wMI9AYHneurCE4AujRPHD/sV0ohNVvdropGlQSQTWzobKuhjcc4+zmvGlLT+Yyq66QFOK2mtvV/BIC/96nWIMpLxjSJPGWuUX4FeMtJmq/iysimClehtrIAdYYhZEYAVwQ7DboiCuDbAN9EAXwb4JvWC6A8Dbr6hsAV0gKQzKzsf/8XuAKIHNBxLFRRWj8GRAF4J23U80PdI1D5wUQbOBPgX0bGPCFukuCmmHvd2ycbjV1COT0SuTC+AW75kZMUitWPAAAAAElFTkSuQmCC",
  Gm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAvdJREFUeJztmz2L2zAYx5+W4sFZgjPdEAgcN4QQCHTJbMh+Y9d+jYS74czl82QPeO54EEqGECh0yBRxi2+4xR1aHbIiyZJlvTTWb8uLrUd/Wbb+zyMDBAKBLvNJ9OMwSksbQfx+z4VxmOQL74dhlJbLxcpKEOstVIRuQxB68HjnZAqAO//j108AAMgPGwAASO/udeNiQgutKwgd/3w0gfUWStZ5mCceRmmZ3t3D/ryD8WCq0nYrzEeTyuf19llaBLLz+/MOAADGg+k/ES7Pw50CLsEjp4vM4HEFIEff9BTAI4U5oWPlcxGjDN7VzpkfNh/x5ofNxVWFYQpQxCg7IXjAn2+SW2agbcHsMAF6fXk00jBwBECvL4/QnwEpgklMdJi8WkVXLncKYBFsYHKE6xDeBF0GZovPrgNwTRDAdQCuCQK4DsA1nRdAywvI5gtc+v06lASgOyybL+BZUR8QClDXYZ5ro83TcrFqJAJu36R4ShkhWZtKrr2bGiiyfZNXkPAKaMuXN8VG+1wBihhl+WFTcYPYFmN4CQdyCowHU2M2ug2U3KCsPabzByd0bJTUsIGaG2woSBGjTMVZ0knNpjdRGZQeg3WCSB/nEVoLIZ87Jkvnl8LeCUDPf4C/j8PlYmWkVOedALa5OgGKGGXr7XOlDoCrQnT2GeAKBVCl8wJwq8MmGvPREl8EZHJfgEyVdxil5U1yCyd0rNT28HcyIib92VPvLXkgj+etRrkLobadGK846Rpv7wGytT1dvNwfgCE3OOgcL8I7AcjSPO74/rxTstR0dVvkRpUEkE1s6GyrIYMn9w2oWmoynyE6TlqA+Wjykemp4/vXb1o3UVYyponzlDlGeQqwlpMkvbeklU0Vtqy2sgB1gfWi1Mqukrbw9jFoiyCA6wBcEwRwHYBrOi+A8mPQ1jsEtpAWAGdmZf/7v8AUgNcBnY75Kkrn7wFBANaXJur5vu4REL4w0QUuBKBflmgTHzdJMFPMSX/2ZKKxayinBwJXxh9YAZr0eY+lZwAAAABJRU5ErkJggg==",
  Jm =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAwJJREFUeJztm79v4jAUx9+dKoYMFarUfyHqiOjAUIkNCUb4A/gXrlulE+3QsGTjb+APgPGQbjuJoUOqjij/QqSqytChCzcgc46xHTv+eSSfLWkdv/d1Yvu9ZwAaGhrqzDfeHwet/t6GEb+//nDtMAmz40Grv1/OV1aMmM4mhWsdgpCDx3om9SZy/vXXCwAALLYxAADc3z2o2kWlO+oVrlUFIe3vjnownU2oz2EKcH/3AJt0DcNwLNO3FmiCiIqAO79J1wAAMAzHTBEudBmtEzRyqogMHlMAfPRNfwJopBC7LC1cJ0EewZfcMxfb+GjvYhvDckSfz6gCJEEeQZY+AhwMu7kOqYbqguowxvvH25ORjoEhwPvH21PS7sBBBPOYcBh/W3lvLvMTOIpgAZMjXAZ3EnRpmC2+uzbANY0Arg1wTSOAawNcU3sBlGIB0XyBy3i/DCkBSIdF8wXT2WTvqwhcAcocZkVtZPC0nK8qiYD6NykeUwBaRkg0TMX33lUDKLx/k28Q9w3QFZdXxUb/TAGSII8W27gQDaKwGMFKOOCfwDAcGwujdSAXDZ6Ex3THyPzBLksrJTVsIBUNlgtCJwnySCayJJOaVSdREaSWwVJBBNv5hNJGyGfHRKn9Vtg7AcjvH+CwHC7nKyOlOu8EsM3ZCZAEeTSdTQrVJVQVIrPPAGcogCy1F4C6DJo6F+BjSHxikMlzASJV3kGrv7+5DmGXpYXaHronIuJVu/N8+3n5iLdn7UaZGyHdkRhZ8vYFb+cA0dqeKl6eD0DgBxxU2vPwTgC8NI8c36RrqZCarG7zolEpAUQTGyrHanDjd1l8vC8bUuP5DF47YQG6o94x01PGzx89pUmUloypEnmKtJH+BGjbSZzbz0sthypshdrSApQa1upbOVWiC2+XQVs0Arg2wDWNAK4NcE3tBZBeBm39hsAWwgKgzKzo//4vUAVgOaDimK+i1H4OaASg3TRRz/f1jAD3BxN14ESAfxkZ/fh4SIKaYr5qd55NdHYO5fSGhjPjLwalogii0A2IAAAAAElFTkSuQmCC",
  wc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACPRJREFUeJztm1+IXFcdxz+bZJMtBKs2Cx6X1tQM21SQsSZCNZpBaq4SKq2MSpQQ6ZaAQZh9UhBpHlJfNA+afakYN3lowH0ZVBqU3qjtRJaGasShYNJ1Y2uT4aQ1JqRNzZbd2fjw+525Z+7cO3Nnd0Imcb8w3HvPPffe8/ud399zfgMrWMEK/p8x0O5maO0z3uU0wIfXrn0W4PriItcXF9m4di1v63n9xo3a6oGB+TUDA/+cv3Fjxj14bXHx8YXFxXPAK8CXgef87wTG7OsVQd0ilQEe8dPAE8CHgIvAUW3f5t0nMOYYwBtXrjxTW1j47DsLC4eBrcBDwAwwERhTCa3d7b4RGHNMvzOtTR8ELrt3LQehtSXvMhcYU0rqtybl4T94l9OBMY/owJ/Q3www6rUTWlsAODs3NzU8OPgf1qzZ+s7CwqPAG8BbwL36vs3ACWWGI/58YEzF+77PFLpliI4lB8zqkdDavwXGfCLeN1ECQmsvAK86Qmme9e2IJPj3ziuBm4H7gL+sXr36B/V6/TLwAeC/CON2eMS/CrwODAGXgAlvCPnAmMZ1aG3Jv85A/AGgGhhT0usikHdtfv9ECVDiHY5656PAxaFVqx6YW1ycUQnwVeWEfujr9Xr9eeCjwJ+BzwC/Av4EnAit/SFwDXgWYR5OAlSiLvuqskSUY9d3J3ValfKwM2CjOrhjKoYzwMyagYGr3mCn1Ih9H9gFXAZ+FhizB3glMGbP8ODgFPACYJTQTwfGbEEkagdwb2jtbp2tbYgtaPyyzr6H/UBR35fX3xFEJZrQzgju1sFMe0eAbZuHhrYDJ8/OzU17jzjbMKXXOwCGBwcB+Pf8/FvAPuDvwBlEWnYQSU0DjmBnV3z70AmhtQVVsRJQADYB5wJjiqG1E3EVyOwGNw8NOUaMIh7hpLt3YX5++7V6/aLXPrp5aOgoMU9xfn7+a+/W6wD3AA8AT/sE9wKe9S/q8VJgTFHvVQJjCn7/NBuADizun7t1T/H+y3ZvGVAAKsAInmENrZ1AjG0T0mzA7Y4fIUa2CpEqJeFOZMAmoK4+P59wrwltVeA2xmk9Vr22Igle4E6UgCPQIvaTwClaY4M7kgE5ZOad+BcRe5Doae5EBox4vr4IfEPP4/YAuDMZsEGPYwgDfgmcI4oLmtA2EOqE0NoKkW99WI+nvEGUobeBToYx1YDrejkRGDOh9mBSx5Lz+2dmgJdVjWhTBeEySPSXR5hR0Y/6YtiIxm42vEmZIBJ75w0OdBUJxixpKU5EaC0IE8rAbGymq0AJycKq3aS03vtL0LUE3U0klW62faPYhFQb4JIKvcwDtYRuOWCY1vy9gBC/ARjX5sQVmTbfLxEtZnTz7FVEOh2c76/SHBcAnSXADaIcz9CI0swykPPafTXZr5lZIvczYJY2s5cCn8gRWtWgCakM0IEXgZ1APrT2EhJKrkf86jmnT8qoQ4g0nCJa/ytoEgIpfrgDUmP4NhhBGJfX8Y4QBUAtjOyUDZbwRDe0toyoQktEhbiak/rBvDJvBBHHajc5vSKHqJBb28uKGpH9OaLHghrmls7LdYOZZqhb4pXRmxAC/MXNcqd36bNO2vL6nFPVYldeoBOWMKtZUdNf1XOpO9OWtmPYQES4k5wy4q2uxjv3ayQ4i9geH4mLmgkY8Y5VIkOa+I5+ZYDz37/x4oeW2UvBNcR4OrftiD+Z1LnvGKDiXgaeRAY/pm21jPHAScR+OE8ANAz6+njnvmOAwkWc+xFpGFPjlejLY5hF1wSIJMnhyXjnfmSAIz6PxBaDRNFkR6i6OEs/q+8rxiLbBvqRAc5tPUUUWE12+Y4a6vuJjGIi+pEBp/RYA76JiP019e9ZQ+JZYIOzHbQJpNJ2hwvIBsgYkT45jCI7QB8B/uW1z8T67dD73wZ+h26KZhj8JsTiO7GfRYziIb3OElJXETXws8FEtDDA05VKaO1XA2MOJ/RxaWrSPbel9gXgJeAnwJnAmNNpehjDOZojOZeXjJNRFZISsLTvdlKBC6G1B0NrtyTcW+e3h9Zu8Yj/OHAFmbUzgTGnE55vhzR399su3uFmPe4JmpDEgFHv/AXgY8iub/zlx2NtD+pxGFiNbIQSI36UbGjawFCJK9HBoKWgbSLVSQK2IQQ1JT4qTnlgPLR2MrT2KeB+/d2FFETEic+KCmIDJhEblCOSiKRFmbbotJrUbkXIFSg8B7wHPBrrch14E6kH2Eokns8jNQNLId4NuEwkwnsQwisZkyH3ngqyFNfW7qR5gSm9Vw2MeVp1fVzbjyMz/RrCmPuQ7e4fAy8CjwHfyzrQlMG7ldz1wLuubQnv6eh1WtYDQmv3Ao8DC4Exj8XulZDZfhMpbfGXq74I/BrR83XAy/HiptDavUme41YiSQIeRjj/Moh198VZS198OC67NcODSD1gEFrbqPBK8SS3HGkLIr8nOf3MkowcR1LSzwHfCa2937t3sbvh3XwkGUGL6Pe0inzcBXaESswh4B+IF1m3nEHeTLRzgw96S+HdiG8RGkwIgfcjIfH7kACpr5DEgE+hhk0JP05U7JQJbilc9T9EXObb+usrJDHAVYgCDVeS6zIb80vcXI3ha4BZ3nB7j06Fko6QbtblQbxAMV4YTZTq9g2SGOC2k74CfEvPq4iba5tYKByz3oOmiLIvkeQGa7Gjc315ZMfH3xv0GeI2L2YDYw5r1PhJ4CVlwpmejrxHSGJAnliRIdE6nR/5jQHjsTJ3P2HapUzIIeHyXT0cd8+QpAJua8kRWvLO3SZDATgL7EvYHvOXoncFxuxCQudR4Eu9G3pvkMQAfyHB1QWUibbIS8BGxKc/hKzXNTEhfh0Y812kiLrv1CDNC+TxdBrd3fXKz18Hfgr8Efg5WhkeK6hIwm3hBp3VzyElZxOOMI/AGvBX4BdIBniPZ+2rQCFl57h1f/oWI8kIukLDxvKTZ8V3Ibk/iIUHSXA2AntDaz+P+PoacCC09hjwCHBQ+57o8fiXjbT/DDXqcxKwk+assKLXbrncwalBjqhc7mZtpy8Z3ZbJuT8e9R0hK1jBCpaE/wF/DprWjtmIZwAAAABJRU5ErkJggg==",
  Ym =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABChJREFUeJztmrFrG0kUxr8nVERe2QOCWy0uJKTkfHCygi3QNcakMcH9bhm45v6EK9ydqnCVu+uucLBItS4D5ipBcKOAE/C6sWKHNCGKYUFJFJHqXeGdvZVsX2zt2NGg/TXSvtl5+2Z2d+btN4NNy+LtUok922aJZ9u8AcCzbd60LG4AkOc0InYEyDoAsGlZ4f+LbNK+XSqFx7K8ESlrROwylmh826XSUAzjknq4soJHJycAgCezs/S6WKSK62LRMAAAP2QyqAuB5VoNFdfFQiYT2iVERBXXPWevuC4aEVsjYl+u1cLzZPlCJhOW1YUI7YuGgYrr4nWxSE9mZwkAHp2c4OHKStz2nyF7t22aoa1tmmgaBjzb5rZpgpm5JQRaQgzd8ct8yeNnQoS2p5HOiZ4jy6P+26YJz7a5aRgYjev/rn9tGsFvp1AAV6tDZfJiF9X7lr0ZPEFRHy0hQttVfZ07t1pFp1AYij0O5Nk2V1wXRETjOJCdRgcH5zowvMjBAVpC4EEQ+GjZWNdl5kPHweLOzlhxh0QHwFiObpHoQBjXV/r4zRvK+T6+5PMqYrsVXuTzdPr1K457vdi+UnOWxX4uxzOrq1o8BczMM6ur7OdyPKdgGkzLqeTV7i7p8BS8yOfpqN/H8vr6WeN3duI53MDZiD062k4ycoreUOFMtwFQoiwXYGbuXDA9TTqdQuHS/OE6pIiI9nz/LGG5ZB6fJLhaRds0sef7Y+cuww4jvajbk6Dk1Z32REhrHqtw8rsKJxqTmh8RRL53QFdB6Svg2bZWjY8O1LrEfCMoS4SiasxUotv7D6j9FtBOD2ibJo76fSytr/MSgD9jKkLpOctiP5NBsVYDx5DGbot6t8szjoOX+/s4HQxi+9NODyAiapsmcooUIS31AOV5gE4DIIBvrk1cCx31gJYQeJrJKFkXAABsZbPa6AGqSTMzExHh82d07tz53vFcCbkoAmD6FkZUrw6r+aZO0BjdXgFAcR6gU8MB9XpAiohIp2nwnhBomya2sll1srhuiRCgbmFEy1QYUKgI6fgxpFIQIdmLr3Z3acEw8MuHDwrc3hxRQQRQkAmO7hNUEuUNojoTTH98/55+EgJfnj/HhItBANQLIqm7pRIX19a43u1O/N2X1LtdLq6t8d1pFUQAhbNAI/iNs1FynI2OcetHY4/NuFtl/8BfQ/UBjLXVNW59JY33bJu3stnw7sjGb5dKPLrfd/RDRM4iwH+P5jMhQnvTMMKMcyubHWrwb/PzY9dX0Qnpf/b28LJcxnKthl8/fWIAOHQceP0+lgCcDgY47vXg7+8DjoOjwQD3A/tjAH7wX3IYaPbHvR7mgs3RXr+PQ8dB5e1b/pGIPADNchkA8Pe7d/jZsq5c/15wTrNcVrIukJCQkJCQkJCQkJCQkJCQMH38C/aUlP0X0ILkAAAAAElFTkSuQmCC",
  Sc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABUZJREFUeJztmW1sU1UYx//dvazt1nZdQ7d13L1ZceKCzkBQidlmDH4xJIT4iZgsCokSMBqTbYoOknUDEw2RCBrfYokZ35xAwgeyaOcWzSzIy0QJuqYFytqF0dW2tN162+OH0dL23ru3tmsJ55c0TZ/z/E+f8/Q5997zFKA83MikBj6wvEIAQP7179h/4qakXxytVguv17tsfb5g0w3xwIfP/QEAaJq6u6QJM9UXHG++pCOL8dNqtRnp84VkaZLejpTAZR9+PG8Zp28BR+cuwkeB/itjULAsus78VrDbQADp7SB2vT7llZ6QdJIrwNG5i/xSsZocNehIe42W/PT+28Rx+EBBVkJRuoH0dhDHEbPA0XHELKgKMUhvB7luPgl30ZxrmJl7X712I8jZkwWXBEFZ2vX6eYNsuH1btJTjWyCuvyyPwRklsCijeLayBq+1bYV6xw7I168vqK0guAtkdfIioGJWhtHJm3D1f4F2vyeXX7csBFtgIKKSdJ5vLN1HH5VhHASzDFDHy2BnCA6f+jGDUHMDk244r6hn9DHSuo6ZTbEPRFToQ5kpFHZbxCZSKBQIh8MJPdgZrCEytMYYMCxQ4S3HN7N6SX2+ECQgFHZb4ou4GitG/NWHMpPHe2m/1ETxBMT1zTxafbwcTl6O8IxiQX2+kLwg6bTNPcmfFwo+/TlgqfoHHqknwUJHcBGkUB4ustYPyLZ+paD9gIXI9Dz/4PYDApbUfoDqhSWVsWPsOOFjQP/3p6FQyNHVd6Igt4HoYYgELASu3QLbYpPgGDtO+EkTrJdm4LKH0f56Oxx/DZD6pu0FlwRhP0Bk8QAA125BVYhBAhbCT5pwc4IHANwNxgAAdbWlIOF/Cm47CB+ExBa/mLEkH2M9C/m92opECC6etwChcwCiy4syh+S8H7CmmsXwiB0u52fY+cZULr9uWQgqYGRQL+k831i6T7WBxdXxCMJhgrUNq3BtPILPPzmdQai5QXAcPvWrjtncUN5aZwym2EcG9di2z7/geT6u94S8qONYvPxiCRgArU8+hs6vZAXXDxC9Kuu0zT0nD6q7k23b9vkXfZ7PVL+SZK0fkG09hUKhUFYAybvAuMkk+dz+aHf3goeagb07yWW3Hc/XPgH/bAgAMBnwolKlxfaj3xbMoUgQSHzhkzabpKjSaJRMwuC7e8mE/w6i0z4AgIaVY3ImACWzCqVMMW6EpmGsNRZMElKCmDKbRX/1a0NDAptYEs4e6CI//22FXlMOPhpFMcsiNDsDQ3Bu2lKmGJyyDBe8t/Bc0wZs7Pso70lIHIamzGYSnJgQdWpsaxMkIb1CDrZvJYMXR7C6RI0N5RwAwB2Yhj8qw/ViP8i0D02aKgBAhVwFy5+j2VzHsikC5hZvs1oFgy6nEy6nE8GJCTS2tUlO8sN7bxH8F8DThgY8wzUCAIy6KjxSpMZTygq0VTciolYCAC54b4FTlmGzrj77q1kGiQowcBxcTicAYNOxY3PGQ4ckhTbP/b+6786E8OqmLXP6II8r66pR2bIFhjODCZ+NLAFvd6JCrhLo8wkLADarFQaOg4HjUgZdTmfCllwhNo8H7wzfMMU/l3gCsDFuGO/5qlu2CPRF7jvglGWi+nwi2hCx7tmTSEjyIoD7wScfbmpKdTDoqhI+/i+/g4HjoErSV5dowQeDovp8wgDAwL8R5nHG31p/b6EBnw9qjQYAoNZoMDQ6ijs+H6ZDIdHgM9Xnk8RtSKdt7vm0pbZbzCm5XKWCz1SfL1Luw+ln+DhLaYRkoqdQKBQKhUKhUCgUCoVCoVByz/8A5ZTC+ajJ5gAAAABJRU5ErkJggg==",
  Xe =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACgRJREFUeJztm01s3MYVx3+UFElVLFKWlaWlRAW9URIZifrhk9Mihi5OjAa5Fe2tgNFcijaXFAVaGe3NRoECQYG4PfQDAXpqz2lSQUYBwT2kh8ZBuwkiJ86KgBLLu7YVcaWoXlkSexgOOSSHu9SK6xhB/wCxJGc4nPf4vmcW/o+Dw7SdZ3L2+2G357Jf9BQ1kGk7V1q0PRMQ/+j9xgSjqIFM2/kLcBmgVJ65qOtTr1Z+BHy/UXNPFPXegyIXA0zb8Rs1t2Vf03Y+AB5r1adUnqFerXwI/BV4GLjYqLn/yDvZbqAvq8G0nYVGzX02zyCBWD/mvbweb9gGDgMlcWm9VAF4p1FzX+5otl1ASxtg2s6cPJ96+gVf1ye4f9F7eR0aBnyN6BgHmoAlDu/VdYDv3E92oBUDFoGzpu343pkN6tVKJhMyMQk0gH8F1xZ4L3oAF/c9VpeQyYBGzb0AvCavvTkvHxNWlN8VBBMGgXeD+1/18V7MOdY9QDs3OKu7adrOQsunVgAPQfwk8BSwiZCEfxfmeApBOwYsZtw/Jk+uvfW6USrPYL0yIm4sG4L4pzRPbQnirT9YlMozXHvr9c+dG5leAKBUnjlfr1bCa2/Ow7pQoa9/YEr7wMc9MAywF0QEmvb7DC0ZkIXBQ4dj19feet0wbee31vzwDwC8Mxva56z5YXn6Rr1ayYwc7yUyGTD19At+vVoRxJzYg3EfVoXEDo08pHvkceDPwKg1P5wVP6wDN4G/NWrubw429WKQYsB+AiDlmT8iApyfmLYzXSrPvK/rV69WFoC/N2ru7zqbbvHQScBiB+P8qlFzlwAaNXcpK2xW84X7BVqrZNrOQr1aORfeuNl6EEl8OzRq7nfz9r1XiEmAaTtqYHKMLiBP8FOvVq41aq42sTJtZy4I0gpBSgW8Mxvw/C7WSyN6V9cCMndQJ5gkWHWrWRgYGp6aOH7SB9hcu3EuQfAs0B0GNGquYc07vscG3pwnLD+Aa4hjoO14swCm7QBwaPTo+STB3s+DjHEIOKQ0bEan1s+gubURjnFo9Oj56+//02gbgXaALGPlx9wfhAywLrSO4kzb+bBRcx+bOH7S31y7EREsIQm38k3Q+p6IMINawqVGzX22SDXIDM2s+WG40hP6fhrtiQ8wcfjhqYj4XUMcJcShI94DPgkOLzhk05/W+cXjTerVCgNDw6eLlgItA0rlmbYPmrYzr7vf29c3tLuzExEPQoqCmkCM+CVDHKsGbBjwkSGSpQSDfvztO3hnNmhubXBo9OjprhrBTATB39b6TUzbuYqSKkuMTj7h72w3I+Jl9LhqAH6aeIBpxUZOA5cNeNMQklJKTyMjCu0YWglIhcAAy+LnzuanAKO650YfeTy6kF993I/Ok5jWeMRTPpTlRILfK+lpFqUKnaZnbzdq7i9z9UyKvYQkXuq81H/ZJr++nvg54JhasusU+VTANWBQpsMWA0PDz+m6ba0rIaOFEGcJSVDyq1uJXxWbmnsCs8ByEbYgvw04EWWDDww+mGqOZY+7BrwZNHxTI/5S/+vKvVMJxkz7CC+9p5OCY4RKeTD0QLZFD7EWv7x757PYtWk7c94NN7ohc8Ek8UuGkApJeImI8Msazzrti+PEHgDe5C3pDqfoLGlLIZQA03auNmruE6kerpFh8sLnFoATuzvb8QYd8XUE0Uk1OOULBiwZos2jJVLvOgB6ABo19wywbNrOvGk7kSK/C1wFPo4/ZB11wvOgdvBKrEp0nLTYVxGEjvuR4UsEPSFWDX3c0AXElCtgRIQHgeeUUDgDbY3RZUMskICeoCVDGLxpP5KUFujt62//zpwIbYBC/Nthq0yIHyFmB2LWPkAqQFG/8CZwRGmTTJBWvk7a90sspRmvSuBBkS8OkGUCTWHEtJ25ieMnhQeYvBU1JEVYjeo+CX4fDtpP+ZFduK30k8RrYoGioNoAkucxbEWndzY/JbAXP23U3AtBdNga1eDXI0qDk/ovCVZdoiT+vSbWyljh6wn544BHEOt8CB1cW7kaMqq3r5+d7WbU90oPsBd91TIRA7KM2pIh+rSvORSK/LKlVMt0gVAuaPQZEEZSMqis79ItJGuCYaHBmh/GQ0mI/mNg/f6AS1rvA3XNo5tE2Z8uQeoiUhIQJBhbmr6ZaG5tXCqVZ7BWxuC9QBWu9MRT3m/5cU+gIiP1DRHo/8DQMPVq5XaLnvtGigGl8sx54Hqq522xwSGjqLm49vEH6bsqE0AYN1kZSh7Q9uvfbW4BvNKy0z6hFeXUstgqQlm+IiZovTRCcvFjZOJRf293V7jCJxVLFsTx+xZt1QUGEtDXP8DOdjOzZN4J2nsB6fsfAt7ohed3gXR9fv36R8bE8ZO+tQIeChNCH654hSxjqELj+wNvU0gWKNGeAZvAN0QqHBrGrK5rN6719vVNWStjggkSTw5ErhH2F9go+t/c2rhLUAgpKhROMSAm/pN7oe+XkEvcGRNY3t3ZmejrHxiyVsbCmxEzcjj595qxS0n8zeWKAVEprCgmtJaA24h8YDUS2aA+fy3ZVSlPXd/Zbh4eGBo+8sDgg9y98xlWsG8oJhUZUBkn35dwu4v3rip8BBEAraZ0NlYRll9FLloAszeXK+ESu1wes3IsiyVL8smYo0jioR0D1ARP0VvdJOSegkbNvWDazqzaJomYevoF37vhsrP9X/r6vxS27+5sM3joMEMjD93zfUOpl6VcIMCVHqz54cISEUVdzhbp0jpBR3uEDgpFggoV506Qzx8lLPMXCSkGxHaGdLEQcb9AR+EsEEtqAtd06fPa2GjazlwRq0A67McG7GvLTOAaj/X1D0xJC98KOZh7Lth4cRZ4rSh3GHtpMOlZRPx3RNb4AgnInYSo22LybIkB/ZK8d8MN1wD8vV2OfPl4rL0IidQxYBHBhNNJBpCD89KNSnhzGasc6mrTIFi/3v8CQKugSbdfSYesbS4LBAyQ+p9na0oYQ+iIHlfSYXXXzO1gc/U4ogxzR2kbVM6H0kNaF1JMu4Siqnkkdl8MyBpE3V7nTd6CsV5xYSsmRgZVKtYAyxcVoZGMwdcRGekWYjOuikSInsEQaJE/ZOqQaTu+woDkVrVMJPYahgjXDMZ644wJ6guafCOClIwH/DQTdAjGSjBEa8My36rocm7jF+jdWUSyNAssBiW2TGPovbouJqzGHNIFJ5k1vhfPqLMWbeVYtR24JRicyDLPgbAPbRnQ7u9yEsqWFa24JTzDOQSjprw5L8w12iG28pRkjgLdWNJgJj1Hu/8Ctv2/YCcIbczXxYqS9c7h2CQB6tXKFnC9VJ6ZUu7lfcVtIPw/Qiv71S4QOtemfV9Q3OwicJpbu1grY6GUNWqu2neuVJ45r36xVvuMA6maDS5nKaJw0q3wMxjbzzKYMvTt9P2m7Sx0Y1vtFxL/A+XoVKBAbvs1AAAAAElFTkSuQmCC",
  ot =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABW9JREFUeJztWT1oW1cU/lwCwT8phhfyiB7BJrTIZKkhdOoiOmXMlMGDF00B48keW0Q7iXprIJDixYPJFDJmMCYYOmmRhkwSKCCsVLGFjGtLuIs6yOflvKtzf96P2+V9YHi6956/7577dwzkyJEjR44cOXLkyJEjR44cOXJkjFdLS+P/Uz4V0hgvba+MXy0tjVsHB+Okerh8aXvlRoj4ymT8x91dJDFe2l4ZP3pcRL26isNyGfXqKpLo4PKPHhdj63CBSEBa4yedAQDg/HiEo80izo9HYZsNlC0nnUFEnuvNEiIBZIiMxwmA8PTbsthuWg4861z1pUWEAJ1z66WN2IrfNnen5E0BAsD+s1kclss42ixO2eX6skRIgOocZ3zv/QsnZbrA9t6/QBAEONos4rBcxv6zWVH+pDNAvbqK9dIGgiBwtpsGIQGc/STGpdnlM3ivcBfrpQ3Uq6vG5dSqdbCzX8G9wt2wTc3ALI/GkADOvsm4DkRgvboatqkk7uxX0Kp1tDo+vO7NNBttNBttfO6einpsyygubvEfrVoHO7Uo+66ZcNIZYPnNH6g3dxEEwVT/5+4pmo02AKB9MJjR6WF9Y+4HAARBgHr1AUDL6Dcn14wIM0DHfhwQWVtrlfDoAiZZ1Gy00T4YzJiCV8Gz7/x4hK21CgBg+c3vmR2JkQzg7G+tVWLtAx9e92aGp7UxALS+6yTKIhWqHP3eO85uc4wQ8PXs9z9NvlrY2a9EBg5P/7EqM6VvFnBdRnEQEvAleKD/5zc/A61f+MBJW82ojBMoLSPqPx/Vfk2io9loX/sB2HxxRYRFToIKk9OSrPeDRKBZXxY64iKTNCKYCORwy4DkOnLEQKwM6L17ab18+E+eZ5pVNw2rsy5Bu4LIkXRy4nj/TRMai4Bu95NVYaFwP6VLeqgkZUGOUQEFT4H3+32rQs/ztH1EjkQkJ4732whNS8It2wDV2avhRfh99velkxEixURkoXA/YstGNhFDk5R0CWk7e+9ejiWHOQGATMLinfnw+/bcQvjteV5EV6/Xmzjp+2L/1fAiIk9jOHiG+E+ez9j2FxViB099dSbUDDi7HGFxPlrgIAI4ORQk8CXwUM+1Dt/3p/pUWYKJCGkJ6UiYalSD57NE3zzAs8vJq08lgQfGA5GCJ0g6dFBJ8Twvsoxo4qgdkEmINEibnjQjwISEj3+5PZtNgXECXGUIRAItFcoKnrXUpiNBS0C/3zdueCbHpT4ekK2fxrjoIkhLjO8tgEzC1M7JZ/9qeBErcBW6sTZZU9DSnqOTo30F0JMgHoNS8KZgdA7pZtAmawtQJUFn4+xyBPR68H0f/X5fvKNo/zXmgsX52SlHpFlwkbXBNZsk6PYxwOEiROApyCE5pp4MroEmORHSEAOkzACb8TjO2Yh12SeSIBYBaYzS8uB/Np1pSXDJolQZQEZshtISp9rLEto94PbcAuD42Ikzi659ScZxFB8uO40LM4BfDjzPg+d5U9dN3WynnZWs1rMKfuzpnulObwHXy4+UruqJECfY8BS5Mx95d0j6OYoPl6feBoB8E7Qeg77vA9fnqO2YMp350rfL+qYs9OcW4EM+020ZqD6ZeZ/Tc9h0kUgD00sSmAQvPXBUf9SlejW8QOHB0lQ1yfoa5JAKItyw9EY3EUVprMpKOnvX11cg+sw1VYmkNW6rBQCWJUCG1UoN1QN0GwuvG1BF52p4EflN4GSQHd5GQbgWW03pLsG5KKqyzwsNBN04aeZ0FR2ug2yYyuk6uBZLncviUsFSRwKHuhPzdgk0Vpe+JhKSVIidBFSj6tHiOkPd7icxcJ38f/FfptT/GpOcVEvVcSq1Upk7R44cN4Z/Ab6Ywqsesxf5AAAAAElFTkSuQmCC",
  Dt =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABXJJREFUeJztWt1qG0cU/lZ1a6zVKpsqZmwVKlESAq1F36IkD5Bc96qQPkByV3wbP0ANuSi+Th4gJi8RjJyAiSl2wIqXVPVaW9W0Try92JzRmdHsalc/9Qj8wYK0sxrN+eb8zwJXuMLU8Obp4/jN08fxZa+jCBZMN3e21mPXLePmvYeOPhZsb86VgKNQyhp8/+KJImywvRn3ej2MuuaJJKMGAMDNew8dTgAJf3j4NnPCRuNrSYK482BIg2zD0AJ3ttbj739cd4CBBlxcfAQXPggC42RCCAAJCdVqNblnOQmKCexsrccAsP9sQ1HhPMLzscPDt+j1egASxzjNBU8bxt3Zf7YRe54HwCx82D8zTua7SxBC4Kv6Cr6s3ZD3bdYCoxM0ev+MndefO+oco93elVpw/HzYKR4//9UKzciMAgDgOAkXQggIIVJ3H0g0I+yfSbI8r4rYIKYtwgM5CPA8D81mA81mI/ekZAYnf/6BKOrBYfpkk/BABgFkt+LOA4f8AZDYeRZo/KhzjKPOsTJmm/BACgEvf/tFLnT/2UYcRREODg5zTchNABhEBF34lbs/W+EYjQRUKu5E2ZxOwofzf5VxW4QHMjJBIFF/IqLZbEgt4GaQ5hTD/hkEgOXlZQCJM7UxHI50gvqiKdsj+O6SvPR7ABCGJ1j4/IupLHYWMBJw6/4jh2L4+xdP4lLps0KTcq04P/8wwfJmD6MJUPqqV4NkBlm5AEcQBEMaYxuGCCDhff86Li4+IooiAMgdBTiEEKjVapOucaYwaoDvXwcA6OFv7/cD9TktJ+CawXe+Wk0yQkqJV+7a4wwVAnjldnoaKsL/8/dfyg+zEqLb3zTlztfrqzIdtklwwpAGkOoTSPAw6g+eMQhv8gtc+CAIZLlN/QYbMDIMhlFfEd74jCZ8EATodrsAAMdJLpuE5pAEcPUnx6djVB3AEQQB2u1ddDrv0Om8Q7C9GdtIgmIC5PwAs9fPG/7C/pkkizQBgJV9wiET4PYPDLw5Fz4PEXo9YCtSfYBe/xdRf/48J4FModBEM8YQAZT2UiOEI40E/b5SF3guANUUbEIJGO7c8gZIGnL7gxER5LIhNeDW/UfO8g8/SQdVpAkCZJfIehJlExQToOKHC89tWBdM/55mIovlyhSWOhuUgGT36QaPAtP04rVaDfX6qnVNkcyO0ChkFUNKYTTJn8wYqVEAUM8CuEB6B4jGTCZQNHz+31BS4TA8kQN5zgI4MSYS6KjMVvUHtChAn69d81NDoez1GcJg3tBoE1IzQV4QZamx3hTNMgfbskAgpRo8PQ0BJAVRkUiQRlS321WqwrFXOwMoGsCbIXuvX03lD4hAq1NhjiiKsPf6FRbLlUE3qKBtp2lCvb46xhJniyECPM/D7W+/k999zy0Uynx3ydghApJq0DaMbInpmEdPn4UFIP09njyVnJ4gmWBzLiA1gB+EjHMIMq8ope3+JIUQ1wRqqdm4+8AnDeDN0LzI4xhJ+FZrTR61W50HmKAXQnQv7dk0BNubMbXJbSIhsxymfh4wXkucTofb7d0JljhblPRWGJBUgiS877nwPRfNlRvKD0e9LkewuR0GZJiA3sYKo36hhEiWyVHfahIkAdQLoDK42WxgsVyRV14YD04/5RM25gJGDeAkUFOEPLrpDEDvEM0TFALovSAgIYGuvG+J6t2geYCxI8SbITwzlI6x4K7T7+aiGtTtM88pkQ7fXZLRQwiBxXIFrdaacf7LRuZiKGGhOG56WyQNtOuL5YqVzo8w1rkAT5CyQNHDVuGBnP0AUt+8oNDZaq1Z/5rcyF3RzSAPuMrb+FYIR+6F8QImrbXFvbzNQnOMtci0am5ehL7CFQb4D0mE3LWkw7H/AAAAAElFTkSuQmCC",
  Km = "/assets/Type-CnV3hhmi.ogg",
  Xm = "/assets/Delete-CR5MHQ7G.ogg",
  Wm = "./Hover-Crcsz5sx.wav",
  qm = "./Click-BiUBcJEy.wav",
  Zm = "/assets/Error-ZxX82U01.wav",
  $m = "/assets/Eat-KVl-xGXf.wav",
  eA = "/assets/Timer-DJgwqpxa.wav",
  tA = "/assets/Go-Ae4SAGAT.wav",
  nA = "/assets/Collision-DuX17eOk.wav",
  rA = "/assets/TimeOut-CfrbdAu4.wav",
  oA = "/assets/Swap-mr4Xzcz5.wav",
  iA = "/assets/Freeze-tNSRaGOp.wav",
  sA = "/assets/CutTail-D1rdNqyt.wav",
  lA = "/assets/MusicEdited-BrSYswKN.ogg";
class aA {
  constructor() {
    (this.typeVolume = 0.16),
      (this.deleteVolume = 0.16),
      (this.hoverVolume = 0.11),
      (this.clickVolume = 1),
      (this.errorVolume = 0.16),
      (this.eatVolume = 0.15),
      (this.timerVolume = 0.22),
      (this.goVolume = 0.35),
      (this.collisionVolume = 0.35),
      (this.timeOutVolume = 0.35),
      (this.swapVolume = 0.35),
      (this.freezeVolume = 1),
      (this.cutTailVolume = 0.5),
      (this.isMuted = !1),
      (this.isGameMusicPlaying = !1),
      (this.musicVolume = 0.35),
      (this.music = new Audio(lA)),
      (this.music.loop = !0),
      (this.music.volume = this.musicVolume),
      this.loadMuteState();
  }
  loadMuteState() {
    const t = localStorage.getItem("isMuted");
    (this.isMuted = t ? JSON.parse(t) : !1), this.updateMuteState();
  }
  toggleMute() {
    (this.isMuted = !this.isMuted),
      localStorage.setItem("isMuted", JSON.stringify(this.isMuted)),
      this.updateMuteState();
  }
  updateMuteState() {
    this.music.volume = this.isMuted ? 0 : this.musicVolume;
  }
  playSound(t, n) {
    const r = new Audio(t);
    (r.volume = this.isMuted ? 0 : n),
      (r.currentTime = 0),
      r
        .play()
        .catch((o) => console.error("CUSTOM ERROR: " + JSON.stringify(o)));
  }
  playTypeSound() {
    this.playSound(Km, this.typeVolume);
  }
  playDeleteSound() {
    this.playSound(Xm, this.deleteVolume);
  }
  playHoverSound() {
    this.playSound(Wm, this.hoverVolume);
  }
  playClickSound() {
    this.playSound(qm, this.clickVolume);
  }
  playErrorSound() {
    this.playSound(Zm, this.errorVolume);
  }
  playEatSound() {
    this.playSound($m, this.eatVolume);
  }
  playTimerSound() {
    this.playSound(eA, this.timerVolume);
  }
  playGoSound() {
    this.playSound(tA, this.goVolume);
  }
  playCollisionSound() {
    this.playSound(nA, this.collisionVolume);
  }
  playTimeOutSound() {
    this.playSound(rA, this.timeOutVolume);
  }
  playSwapSound() {
    this.playSound(oA, this.swapVolume);
  }
  playFreezeSound() {
    this.playSound(iA, this.freezeVolume);
  }
  playCutTailSound() {
    this.playSound(sA, this.cutTailVolume);
  }
  playMusic() {
    this.isGameMusicPlaying ||
      ((this.music.currentTime = 0),
      this.music.play(),
      (this.isGameMusicPlaying = !0));
  }
  stopMusic() {
    this.music.pause(), (this.isGameMusicPlaying = !1);
  }
}
const ue = new aA();
function kc(e) {
  const t = Math.floor(e / 60),
    n = e % 60,
    r = t < 10 ? `0${t}` : t,
    o = n < 10 ? `0${n}` : n;
  return `${r}:${o}`;
}
const ai = (e, t, n) => {
    const r = e.target.value,
      o = String(n.current ?? "");
    r.length > o.length
      ? ue.playTypeSound()
      : r.length < o.length && ue.playDeleteSound(),
      (n.current = r),
      t(r);
  },
  W = () => {
    ue.playHoverSound();
  },
  ee = () => {
    ue.playClickSound();
  },
  K = (e, t) => {
    e(t), ue.playErrorSound();
  },
  cA = ({
    cause: e,
    result: t,
    yourScore: n,
    opponentName: r,
    opponentScore: o,
    time: i,
    moves: s,
    optionalMessage: l,
    onLeave: a,
    onRematch: u,
    rematchState: f,
    isSinglePlayer: h,
    onPlayAgain: m,
  }) =>
    c.jsx("div", {
      className: "overlay",
      children: c.jsxs("div", {
        className: "overlay-content border-gradient-normal",
        children: [
          c.jsx("p", { className: "overlay-cause", children: e }),
          !h &&
            c.jsx("p", {
              className: `overlay-result ${t}`,
              children:
                t === "win" ? "You Win!" : t === "lose" ? "You Lose!" : "Draw!",
            }),
          c.jsx("p", { children: h ? `Score: ${n}` : `Your Score: ${n}` }),
          !h && c.jsxs("p", { children: [r, "'s score: ", o] }),
          c.jsxs("p", { children: ["Time Left: ", i] }),
          c.jsxs("p", { children: ["Moves: ", s] }),
          c.jsxs("div", {
            className: "button-group",
            children: [
              c.jsx("button", {
                className:
                  "button-default button-height-less button-width-less",
                onClick: a,
                onMouseEnter: W,
                children: "Leave",
              }),
              c.jsx("button", {
                onClick: h ? m : u,
                onMouseEnter: W,
                className: `button-default button-height-less button-width-less ${
                  h ? "" : `overlay-rematch ${f}`
                }`,
                disabled: !h && f === "disabled",
                children: h
                  ? "Play Again"
                  : f === "lockedIn"
                  ? "Locked In"
                  : "Rematch",
              }),
            ],
          }),
          l && c.jsx("p", { children: l }),
        ],
      }),
    });
function uA() {
  var ft;
  const e = on(),
    { playerData: t, setPlayerData: n } = A.useContext(Pt),
    { connection: r } = ql(),
    i = (ft = lr().state) == null ? void 0 : ft.gameData,
    [s, l] = A.useState(i),
    a = A.useRef(null),
    [u, f] = A.useState(16),
    [h, m] = A.useState("normal"),
    [v, k] = A.useState(0),
    [C, x] = A.useState(!1),
    p = Sc,
    d = 25,
    g = 12.5,
    y = [Lm, Qm, zm, Fm, Hm, Vm, Gm, Jm];
  let I = null;
  A.useEffect(() => {
    const L = () => {
      if (!a.current) return;
      const { clientWidth: F, clientHeight: Me } = a.current,
        fe = s.lobby.gameSettings.height,
        G = s.lobby.gameSettings.width,
        b = Math.floor(F / G),
        M = Math.floor(Me / fe),
        B = Math.min(b, M);
      f(B);
    };
    return (
      L(),
      window.addEventListener("resize", L),
      () => window.removeEventListener("resize", L)
    );
  }, [s]),
    A.useEffect(() => {
      ue.playTimerSound();
    }, []),
    A.useEffect(() => {
      if (r) {
        r.off("UpdateGameState"),
          r.off("FoodEaten"),
          r.off("AbilitySfx"),
          r.off("LeaveGame"),
          r.off("RematchResponse"),
          r.off("Pong"),
          r.on("UpdateGameState", (F) => {
            l(F),
              m("normal"),
              F.gameState === "Waiting"
                ? F.time > 0
                  ? ue.playTimerSound()
                  : (ue.playGoSound(), ue.playMusic())
                : F.gameState === "Finished" &&
                  (F.finishedState.includes("TimeOut")
                    ? ue.playTimeOutSound()
                    : F.finishedState.includes("Collision") &&
                      ue.playCollisionSound(),
                  ue.stopMusic());
          }),
          r.on("FoodEaten", () => {
            ue.playEatSound();
          }),
          r.on("AbilitySfx", (F) => {
            F == 1
              ? ue.playSwapSound()
              : F == 2
              ? ue.playFreezeSound()
              : F == 3 && ue.playCutTailSound();
          }),
          r.on("LeaveGame", () => {
            e("/main-menu"), ue.stopMusic();
          }),
          r.on("RematchResponse", (F) => {
            m(F);
          }),
          r.on("Pong", () => {
            const F = Date.now();
            k(F - I);
          });
        const L = setInterval(() => {
          r && ((I = Date.now()), r.invoke("Ping"));
        }, 1e3);
        return () => clearInterval(L);
      }
    }, [r, e]);
  const _ = () => {
      x(!0), W();
    },
    j = () => {
      x(!1);
    },
    D = async (L) => {
      L.preventDefault(), ee(), r && r.invoke("LeaveGame").catch(() => {});
    },
    q = async (L) => {
      L.preventDefault(), ee(), r && r.invoke("AskRematch").catch(() => {});
    },
    z = async (L) => {
      L.preventDefault(), ee(), r && r.invoke("PlayAgain").catch(() => {});
    },
    xe = async (L) => {
      s.lobby.gameSettings.abilities &&
        (L.preventDefault(),
        ee(),
        r && r.invoke("ActivateAbility").catch(() => {}));
    },
    nt = (L) => {
      let F = null;
      switch (L.key) {
        case "w":
        case "ArrowUp":
          F = "u";
          break;
        case "a":
        case "ArrowLeft":
          F = "l";
          break;
        case "s":
        case "ArrowDown":
          F = "d";
          break;
        case "d":
        case "ArrowRight":
          F = "r";
          break;
        case " ":
          if (!s.lobby.gameSettings.abilities) return;
          r && r.invoke("ActivateAbility").catch(() => {});
          return;
        default:
          return;
      }
      F && r && r.invoke("UpdateDirectionCommand", F).catch(() => {});
    };
  A.useEffect(
    () => (
      window.addEventListener("keydown", nt),
      () => {
        window.removeEventListener("keydown", nt);
      }
    ),
    [r, s]
  );
  const H = (L) => {
      const G = Math.floor(L / 4),
        M = (L % 4) * 25,
        B = G * 25,
        w = M + 25,
        N = B + 25,
        R = 12.5 - M,
        be = 12.5 - B;
      return {
        clipPath: `polygon(${M}% ${B}%, ${w}% ${B}%, ${w}% ${N}%, ${M}% ${N}%)`,
        transform: `translate(${R}%, ${be}%)`,
      };
    },
    ve = (L) => {
      switch (L) {
        case "Player1Disconnected":
          return `${s.lobby.player1.username} disconnected`;
        case "Player2Disconnected":
          return `${s.lobby.player2.username} disconnected`;
        case "Player1WonByTimeOut":
        case "Player2WonByTimeOut":
          return "Time out!";
        case "Player1WonByCollision":
        case "Player2WonByCollision":
          return "Snake collision!";
        case "DrawByTimeOut":
          return "Time out!";
        case "DrawByCollision":
          return "Snake collision!";
        case "SinglePlayerTimeOut":
          return "Time out!";
        case "SinglePlayerCollision":
          return "Snake collision!";
        default:
          return "";
      }
    },
    sn = (L) => {
      if (s.isSinglePlayer) return "";
      switch (L) {
        case "Player2Disconnected":
        case "Player1WonByTimeOut":
        case "Player1WonByCollision":
          return t.playerId === s.lobby.player1.playerId ? "win" : "lose";
        case "Player1Disconnected":
        case "Player2WonByTimeOut":
        case "Player2WonByCollision":
          return t.playerId === s.lobby.player2.playerId ? "win" : "lose";
        case "DrawByTimeOut":
        case "DrawByCollision":
          return "draw";
        default:
          return "";
      }
    },
    yt = () => {
      const L = s.lobby.gameSettings.height,
        F = s.lobby.gameSettings.width,
        Me = Ws[s.lobby.gameSettings.map].tileset;
      return c.jsx("div", {
        ref: a,
        className: "game-grid container-center",
        style: {
          display: "grid",
          gridTemplateRows: `repeat(${L}, ${u}px)`,
          gridTemplateColumns: `repeat(${F}, ${u}px)`,
          transform: `translate(${-u / 2}px, ${u}px)`,
          zIndex: 0,
        },
        children: s.groundLayer.map((fe, G) =>
          fe.map((b, M) => {
            const { clipPath: B, transform: w } = H(b);
            return c.jsx(
              "img",
              {
                className: "tile pixel-art",
                src: Me,
                alt: `Tile ${b}`,
                style: {
                  clipPath: B,
                  transform: w,
                  width: `${u * 4}px`,
                  height: `${u * 4}px`,
                },
              },
              `${G}-${M}`
            );
          })
        ),
      });
    },
    ln = () => {
      const L = s.lobby.gameSettings.height,
        F = s.lobby.gameSettings.width,
        Me = s.lobby.player1,
        fe = s.lobby.player2;
      Me == null || y[Me.color], fe == null || y[fe.color];
      const G = (b) => {
        let M = null,
          B = 0,
          w = 0;
        switch (b) {
          case "empty":
            (M = p), (B = 3), (w = 3);
            break;
          case "quicksand-vertical-0":
            (M = Dt), (B = 0), (w = 0);
            break;
          case "quicksand-vertical-1":
            (M = Dt), (B = 1), (w = 0);
            break;
          case "quicksand-vertical-2":
            (M = Dt), (B = 0), (w = 1);
            break;
          case "quicksand-vertical-3":
            (M = Dt), (B = 1), (w = 1);
            break;
          case "quicksand-vertical-4":
            (M = Dt), (B = 0), (w = 2);
            break;
          case "quicksand-vertical-5":
            (M = Dt), (B = 1), (w = 2);
            break;
          case "quicksand-vertical-6":
            (M = Dt), (B = 0), (w = 3);
            break;
          case "quicksand-vertical-7":
            (M = Dt), (B = 1), (w = 3);
            break;
          case "quicksand-horizontal-0":
            (M = ot), (B = 0), (w = 2);
            break;
          case "quicksand-horizontal-1":
            (M = ot), (B = 1), (w = 2);
            break;
          case "quicksand-horizontal-2":
            (M = ot), (B = 2), (w = 2);
            break;
          case "quicksand-horizontal-3":
            (M = ot), (B = 3), (w = 2);
            break;
          case "quicksand-horizontal-4":
            (M = ot), (B = 0), (w = 3);
            break;
          case "quicksand-horizontal-5":
            (M = ot), (B = 1), (w = 3);
            break;
          case "quicksand-horizontal-6":
            (M = ot), (B = 2), (w = 3);
            break;
          case "quicksand-horizontal-7":
            (M = ot), (B = 3), (w = 3);
            break;
        }
        (B = B * d), (w = w * d);
        let N = B + d,
          R = w + d,
          be = g - B,
          Tt = g - w;
        return {
          sprite: M,
          clipPath: `polygon(${B}% ${w}%, ${N}% ${w}%, ${N}% ${R}%, ${B}% ${R}%)`,
          transform: `translate(${be}%, ${Tt}%)`,
        };
      };
      return c.jsx("div", {
        className: "game-grid container-center",
        style: {
          display: "grid",
          gridTemplateRows: `repeat(${L}, ${u}px)`,
          gridTemplateColumns: `repeat(${F}, ${u}px)`,
          transform: `translate(${-u / 2}px, ${u}px)`,
          zIndex: 1,
        },
        children: s.specialGroundLayer.map((b, M) =>
          b.map((B, w) => {
            const { sprite: N, clipPath: R, transform: be } = G(B);
            return c.jsx(
              "img",
              {
                className: "tile pixel-art",
                src: N,
                alt: `Entity ${B}`,
                style: {
                  clipPath: R,
                  transform: be,
                  width: `${u * 4}px`,
                  height: `${u * 4}px`,
                },
              },
              `${M}-${w}`
            );
          })
        ),
      });
    },
    P = () => {
      const L = s.lobby.gameSettings.height,
        F = s.lobby.gameSettings.width,
        Me = s.lobby.player1,
        fe = s.lobby.player2,
        G = Me == null ? null : y[Me.color],
        b = fe == null ? null : y[fe.color],
        M = (B) => {
          let w = null,
            N = 0,
            R = 0;
          switch (B) {
            case "empty":
              (w = p), (N = 3), (R = 3);
              break;
            case "apple":
              (w = p), (N = 0), (R = 0);
              break;
            case "apple-rot":
              (w = p), (N = 1), (R = 0);
              break;
            case "golden-apple":
              (w = p), (N = 0), (R = 1);
              break;
            case "golden-apple-rot":
              (w = p), (N = 1), (R = 1);
              break;
            case "snake-meat":
              (w = p), (N = 0), (R = 2);
              break;
            case "snake-meat-rot":
              (w = p), (N = 1), (R = 2);
              break;
            case "snake1-head-l":
              (w = G), (N = 0), (R = 0);
              break;
            case "snake1-head-u":
              (w = G), (N = 3), (R = 0);
              break;
            case "snake1-head-r":
              (w = G), (N = 1), (R = 1);
              break;
            case "snake1-head-d":
              (w = G), (N = 2), (R = 2);
              break;
            case "snake1-body-h":
              (w = G), (N = 1), (R = 0);
              break;
            case "snake1-body-v":
              (w = G), (N = 3), (R = 1);
              break;
            case "snake1-body-lu":
              (w = G), (N = 1), (R = 3);
              break;
            case "snake1-body-ld":
              (w = G), (N = 1), (R = 2);
              break;
            case "snake1-body-ru":
              (w = G), (N = 0), (R = 3);
              break;
            case "snake1-body-rd":
              (w = G), (N = 0), (R = 2);
              break;
            case "snake1-tail-l":
              (w = G), (N = 2), (R = 0);
              break;
            case "snake1-tail-u":
              (w = G), (N = 3), (R = 2);
              break;
            case "snake1-tail-r":
              (w = G), (N = 0), (R = 1);
              break;
            case "snake1-tail-d":
              (w = G), (N = 2), (R = 1);
              break;
            case "snake2-head-l":
              (w = b), (N = 0), (R = 0);
              break;
            case "snake2-head-u":
              (w = b), (N = 3), (R = 0);
              break;
            case "snake2-head-r":
              (w = b), (N = 1), (R = 1);
              break;
            case "snake2-head-d":
              (w = b), (N = 2), (R = 2);
              break;
            case "snake2-body-h":
              (w = b), (N = 1), (R = 0);
              break;
            case "snake2-body-v":
              (w = b), (N = 3), (R = 1);
              break;
            case "snake2-body-lu":
              (w = b), (N = 1), (R = 3);
              break;
            case "snake2-body-ld":
              (w = b), (N = 1), (R = 2);
              break;
            case "snake2-body-ru":
              (w = b), (N = 0), (R = 3);
              break;
            case "snake2-body-rd":
              (w = b), (N = 0), (R = 2);
              break;
            case "snake2-tail-l":
              (w = b), (N = 2), (R = 0);
              break;
            case "snake2-tail-u":
              (w = b), (N = 3), (R = 2);
              break;
            case "snake2-tail-r":
              (w = b), (N = 0), (R = 1);
              break;
            case "snake2-tail-d":
              (w = b), (N = 2), (R = 1);
              break;
            case "lava-vertical-0":
              (w = Xe), (N = 0), (R = 0);
              break;
            case "lava-vertical-1":
              (w = Xe), (N = 0), (R = 1);
              break;
            case "lava-vertical-2":
              (w = Xe), (N = 0), (R = 2);
              break;
            case "lava-vertical-3":
              (w = Xe), (N = 0), (R = 3);
              break;
            case "lava-horizontal-0":
              (w = Xe), (N = 1), (R = 3);
              break;
            case "lava-horizontal-1":
              (w = Xe), (N = 2), (R = 3);
              break;
            case "lava-horizontal-2":
              (w = Xe), (N = 3), (R = 3);
              break;
            case "lava-circle-large-0":
              (w = Xe), (N = 1), (R = 1);
              break;
            case "lava-circle-large-1":
              (w = Xe), (N = 2), (R = 1);
              break;
            case "lava-circle-large-2":
              (w = Xe), (N = 1), (R = 2);
              break;
            case "lava-circle-large-3":
              (w = Xe), (N = 2), (R = 2);
              break;
            case "lava-circle-small":
              (w = Xe), (N = 1), (R = 0);
              break;
            case "cactus-0":
              (w = ot), (N = 0), (R = 1);
              break;
            case "cactus-1":
              (w = ot), (N = 1), (R = 1);
              break;
            case "cactus-2":
              (w = ot), (N = 2), (R = 1);
              break;
          }
          (N = N * d), (R = R * d);
          let be = N + d,
            Tt = R + d,
            Bn = g - N,
            ro = g - R;
          return {
            sprite: w,
            clipPath: `polygon(${N}% ${R}%, ${be}% ${R}%, ${be}% ${Tt}%, ${N}% ${Tt}%)`,
            transform: `translate(${Bn}%, ${ro}%)`,
          };
        };
      return c.jsx("div", {
        className: "game-grid container-center",
        style: {
          display: "grid",
          gridTemplateRows: `repeat(${L}, ${u}px)`,
          gridTemplateColumns: `repeat(${F}, ${u}px)`,
          transform: `translate(${-u / 2}px, ${u}px)`,
          zIndex: 2,
        },
        children: s.entityLayer.map((B, w) =>
          B.map((N, R) => {
            const { sprite: be, clipPath: Tt, transform: Bn } = M(N);
            return c.jsx(
              "img",
              {
                className: "tile pixel-art",
                src: be,
                alt: `Entity ${N}`,
                style: {
                  clipPath: Tt,
                  transform: Bn,
                  width: `${u * 4}px`,
                  height: `${u * 4}px`,
                },
              },
              `${w}-${R}`
            );
          })
        ),
      });
    },
    U = () => {
      const L = s.lobby.gameSettings.height,
        F = s.lobby.gameSettings.width,
        Me = s.player1Frozen,
        fe = s.player2Frozen,
        G = (b) => {
          let M = Sc,
            B = 3,
            w = 3;
          if (b.startsWith("snake1") && Me) M = wc;
          else if (b.startsWith("snake2") && fe) M = wc;
          else {
            (B = B * d), (w = w * d);
            let Bn = B + d,
              ro = w + d,
              tf = g - B,
              nf = g - w;
            return {
              sprite: M,
              clipPath: `polygon(${B}% ${w}%, ${Bn}% ${w}%, ${Bn}% ${ro}%, ${B}% ${ro}%)`,
              transform: `translate(${tf}%, ${nf}%)`,
            };
          }
          switch (b) {
            case "snake1-head-l":
            case "snake2-head-l":
              (B = 0), (w = 0);
              break;
            case "snake1-head-u":
            case "snake2-head-u":
              (B = 3), (w = 0);
              break;
            case "snake1-head-r":
            case "snake2-head-r":
              (B = 1), (w = 1);
              break;
            case "snake1-head-d":
            case "snake2-head-d":
              (B = 2), (w = 2);
              break;
            case "snake1-body-h":
            case "snake2-body-h":
              (B = 1), (w = 0);
              break;
            case "snake1-body-v":
            case "snake2-body-v":
              (B = 3), (w = 1);
              break;
            case "snake1-body-lu":
            case "snake2-body-lu":
              (B = 1), (w = 3);
              break;
            case "snake1-body-ld":
            case "snake2-body-ld":
              (B = 1), (w = 2);
              break;
            case "snake1-body-ru":
            case "snake2-body-ru":
              (B = 0), (w = 3);
              break;
            case "snake1-body-rd":
            case "snake2-body-rd":
              (B = 0), (w = 2);
              break;
            case "snake1-tail-l":
            case "snake2-tail-l":
              (B = 2), (w = 0);
              break;
            case "snake1-tail-u":
            case "snake2-tail-u":
              (B = 3), (w = 2);
              break;
            case "snake1-tail-r":
            case "snake2-tail-r":
              (B = 0), (w = 1);
              break;
            case "snake1-tail-d":
            case "snake2-tail-d":
              (B = 2), (w = 1);
              break;
          }
          (B = B * d), (w = w * d);
          let N = B + d,
            R = w + d,
            be = g - B,
            Tt = g - w;
          return {
            sprite: M,
            clipPath: `polygon(${B}% ${w}%, ${N}% ${w}%, ${N}% ${R}%, ${B}% ${R}%)`,
            transform: `translate(${be}%, ${Tt}%)`,
          };
        };
      return c.jsx("div", {
        className: "game-grid container-center",
        style: {
          display: "grid",
          gridTemplateRows: `repeat(${L}, ${u}px)`,
          gridTemplateColumns: `repeat(${F}, ${u}px)`,
          transform: `translate(${-u / 2}px, ${u}px)`,
          zIndex: 3,
        },
        children: s.entityLayer.map((b, M) =>
          b.map((B, w) => {
            const { sprite: N, clipPath: R, transform: be } = G(B);
            return N
              ? c.jsx(
                  "img",
                  {
                    className: "tile pixel-art",
                    src: N,
                    alt: "Frozen Entity",
                    style: {
                      clipPath: R,
                      transform: be,
                      width: `${u * 4}px`,
                      height: `${u * 4}px`,
                    },
                  },
                  `frozen-${M}-${w}`
                )
              : null;
          })
        ),
      });
    },
    Q = () => {
      if (!s.lobby.gameSettings.borders) return null;
      const L = s.lobby.gameSettings.height,
        F = s.lobby.gameSettings.width,
        Me = (fe, G) => {
          let b = 0,
            M = 0;
          fe === 0 && G === 0
            ? ((b = 0), (M = 0))
            : fe === 0 && G === F - 1
            ? ((b = 2), (M = 0))
            : fe === 0
            ? ((b = 1), (M = 0))
            : fe === L - 1 && G === 0
            ? ((b = 0), (M = 2))
            : fe === L - 1 && G === F - 1
            ? ((b = 2), (M = 2))
            : fe === L - 1
            ? ((b = 1), (M = 2))
            : G === 0
            ? ((b = 0), (M = 1))
            : G === F - 1
            ? ((b = 2), (M = 1))
            : ((b = 1), (M = 1)),
            (b = b * d),
            (M = M * d);
          let B = b + d,
            w = M + d,
            N = g - b,
            R = g - M;
          return {
            sprite: Ym,
            clipPath: `polygon(${b}% ${M}%, ${B}% ${M}%, ${B}% ${w}%, ${b}% ${w}%)`,
            transform: `translate(${N}%, ${R}%)`,
          };
        };
      return c.jsx("div", {
        className: "game-grid container-center",
        style: {
          display: "grid",
          gridTemplateRows: `repeat(${L}, ${u}px)`,
          gridTemplateColumns: `repeat(${F}, ${u}px)`,
          transform: `translate(${-u / 2}px, ${u}px)`,
          zIndex: 4,
        },
        children: Array.from({ length: L }).map((fe, G) =>
          Array.from({ length: F }).map((b, M) => {
            const { sprite: B, clipPath: w, transform: N } = Me(G, M);
            return c.jsx(
              "img",
              {
                className: "tile pixel-art",
                src: B,
                alt: "Border Tile",
                style: {
                  clipPath: w,
                  transform: N,
                  width: `${u * 4}px`,
                  height: `${u * 4}px`,
                },
              },
              `border-${G}-${M}`
            );
          })
        ),
      });
    },
    Z = s.lobby.player1,
    ae = s.lobby.player2,
    In = s.player1Score,
    vt = s.player2Score,
    _t = qd[t.ability];
  return c.jsxs("div", {
    className: "container-center",
    children: [
      c.jsxs("div", {
        className: "game-info",
        children: [
          Z
            ? c.jsxs("div", {
                className: "game-player-info left",
                children: [
                  c.jsx("p", {
                    className: "game-player-name gradient-text-dynamic",
                    style: { "--player-color": nr[Z.color] },
                    children: Z.username,
                  }),
                  c.jsxs("p", {
                    className: "game-player-name",
                    children: ["Score: ", In || 0],
                  }),
                ],
              })
            : c.jsx("div", { className: "empty" }),
          c.jsx("div", {
            className: "game-timer",
            children:
              s.time === 0 && s.gameTick == 0
                ? c.jsx("p", { children: "GO!" })
                : s.gameTick === 0
                ? c.jsx("p", { children: s.time })
                : c.jsxs(c.Fragment, {
                    children: [
                      c.jsx("p", { children: kc(s.time) }),
                      c.jsx("p", { children: s.gameTick }),
                    ],
                  }),
          }),
          ae
            ? c.jsxs("div", {
                className: "game-player-info right",
                children: [
                  c.jsx("p", {
                    className: "game-player-name gradient-text-dynamic",
                    style: { "--player-color": nr[ae.color] },
                    children: ae.username,
                  }),
                  c.jsxs("p", {
                    className: "game-player-name",
                    children: ["Score: ", vt || 0],
                  }),
                ],
              })
            : c.jsx("div", { className: "empty" }),
        ],
      }),
      c.jsxs("div", {
        className: "game-board",
        children: [
          c.jsx(yt, {}),
          c.jsx(ln, {}),
          c.jsx(P, {}),
          c.jsx(U, {}),
          c.jsx(Q, {}),
        ],
      }),
      c.jsx("div", {
        className: "game-ability container-center",
        children:
          s.lobby.gameSettings.abilities &&
          c.jsxs("div", {
            className: "game-ability-button",
            children: [
              c.jsx("img", {
                src: _t.img,
                alt: "Ability Icon",
                className: "game-ability-button-image pixel-art",
                onClick: xe,
                onMouseEnter: _,
                onMouseLeave: j,
              }),
              C &&
                c.jsxs("div", {
                  className: "tooltip border-gradient-normal",
                  style: { display: "block" },
                  children: [
                    c.jsx("p", {
                      className: "tooltip-name",
                      children: _t.name,
                    }),
                    c.jsx("p", {
                      className: "tooltip-description",
                      children: _t.description,
                    }),
                    c.jsxs("p", {
                      className: "tooltip-description",
                      children: ["Cooldown: ", _t.cooldown, "s"],
                    }),
                    c.jsx("p", {
                      className: "tooltip-description text-color-soft",
                      children: "Press [Space] to use.",
                    }),
                  ],
                }),
              s.lobby.player1 != null &&
                s.lobby.player1.playerId === t.playerId &&
                s.player1Cooldown > 0 &&
                c.jsx("div", {
                  className:
                    "game-ability-button-cooldown-overlay unselectable",
                  children: String(s.player1Cooldown).padStart(2, "0"),
                }),
              s.lobby.player2 != null &&
                s.lobby.player2.playerId === t.playerId &&
                s.player2Cooldown > 0 &&
                c.jsx("div", {
                  className: "game-ability-button-cooldown-overlay",
                  children: String(s.player2Cooldown).padStart(2, "0"),
                }),
            ],
          }),
      }),
      c.jsx("div", {
        className: "game-buttons container-center",
        children: c.jsx("button", {
          className: "button-default button-height-less button-width-less",
          onClick: D,
          onMouseEnter: W,
          children: "Leave",
        }),
      }),
      s.finishedState != "NotFinished" &&
        c.jsx(cA, {
          cause: ve(s.finishedState),
          result: sn(s.finishedState),
          yourScore:
            t.playerId === s.lobby.player1.playerId
              ? s.player1Score
              : s.player2Score,
          opponentName: s.isSinglePlayer
            ? ""
            : t.playerId === s.lobby.player1.playerId
            ? s.lobby.player2.username
            : s.lobby.player1.username,
          opponentScore: s.isSinglePlayer
            ? null
            : t.playerId === s.lobby.player1.playerId
            ? s.player2Score
            : s.player1Score,
          time: kc(s.time),
          moves: s.gameTick,
          optionalMessage: "",
          onLeave: D,
          onRematch: q,
          rematchState: h,
          isSinglePlayer: s.isSinglePlayer,
          onPlayAgain: z,
        }),
      c.jsxs("p", {
        className: "version",
        children: ["Ping: ", v !== null ? `${v} ms` : "Calculating..."],
      }),
    ],
  });
}
function dA() {
  const e = A.useRef(""),
    t = A.useRef(""),
    [n, r] = A.useState(""),
    [o, i] = A.useState(""),
    [s, l] = A.useState(""),
    [a, u] = A.useState(""),
    [f, h] = A.useState(0),
    m = on(),
    { setPlayerData: v } = A.useContext(Pt);
  A.useEffect(() => {
    (async () => {
      try {
        const p = await fetch(Ht + "/api/app/ping", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (p.ok) {
          const d = await p.json();
        }
      } catch {}
    })();
  }, []);
  const k = async (x) => {
      if ((x.preventDefault(), f !== 0)) return;
      if ((h(a === "login" ? 1 : 2), l(""), !n || !o)) {
        K(l, "Username and password cannot be empty");
        return;
      }
      if (n.length > 12) {
        K(l, "Username cannot exceed 12 characters");
        return;
      }
      if (n.startsWith("Guest")) {
        K(l, 'Usernames cannot start with "Guest"');
        return;
      }
      ee();
      const p =
        a === "login" ? Ht + "/api/player/login" : Ht + "/api/player/register";
      try {
        const d = await fetch(p, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: n, password: o }),
          }),
          g = await d.json();
        if ((h(0), d.ok)) v(g), m("/main-menu");
        else
          switch (d.status) {
            case 400:
              K(l, "Invalid request, please check your data");
              break;
            case 401:
              K(l, "Wrong Credentials");
              break;
            case 403:
              K(l, "Player is already logged in");
              break;
            case 409:
              K(l, "Username already exists");
              break;
            case 500:
              K(l, "Server error, please try again later");
              break;
            default:
              K(l, "An unexpected error occurred, please try again");
          }
      } catch {
        K(l, "Failed to connect to the server");
      }
    },
    C = async () => {
      if (f == 0) {
        h(3), l(""), ee();
        try {
          const x = await fetch(Ht + "/api/player/guest", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }),
            p = await x.json();
          h(!1),
            x.ok
              ? (v(p.player), m("/main-menu"))
              : K(
                  l,
                  "An error occurred while joining as a guest, please try again"
                );
        } catch {
          K(l, "Failed to connect to the server");
        }
      }
    };
  return c.jsxs(c.Fragment, {
    children: [
      c.jsxs("div", {
        className: "container-center",
        children: [
          c.jsx("div", {
            className: "title-section",
            children: c.jsx("p", {
              className: "title gradient-text",
              children: "Snake 1v1",
            }),
          }),
          c.jsxs("form", {
            onSubmit: k,
            children: [
              c.jsx("input", {
                type: "text",
                value: n,
                onChange: (x) => ai(x, r, e),
                placeholder: "username",
                maxLength: 14,
                required: !0,
              }),
              c.jsx("input", {
                type: "password",
                value: o,
                onChange: (x) => ai(x, i, t),
                placeholder: "password",
                required: !0,
              }),
              c.jsxs("div", {
                className: "buttons-login",
                children: [
                  c.jsx("button", {
                    type: "submit",
                    className:
                      "button-default button-height-less button-width-less",
                    onClick: () => u("login"),
                    onMouseEnter: W,
                    children: f === 1 ? "Logging in..." : "Login",
                  }),
                  c.jsx("button", {
                    type: "submit",
                    className:
                      "button-default button-height-less button-width-less",
                    onClick: () => u("register"),
                    onMouseEnter: W,
                    children: f === 2 ? "Registering..." : "Register",
                  }),
                ],
              }),
            ],
          }),
          c.jsx("button", {
            type: "button",
            className: "button-default button-height-less",
            onClick: C,
            onMouseEnter: W,
            children: f === 3 ? "Joining..." : "Join as Guest",
          }),
        ],
      }),
      c.jsx("br", {}),
      c.jsx("div", {
        className: "container-center",
        children: s && c.jsx("p", { className: "error-text", children: s }),
      }),
      c.jsx("div", { className: "version", children: "v.1.1" }),
    ],
  });
}
const fA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIxJREFUOI3Fk0sOgzAMRJ8rzlCqskSCA+R0OYHPGCSWRU0uka5AlP6S0Kqzs6XxPNkJ/FsCcKzPscQc/CTVXPRdm2V2wwjAoSR5racDrLVJvd8RrFNfJc9arrBd4taoqne1G0aCn+Qtgao+GJMJPimJIEXLQzLGZBPAF84oADFG6lOT9R/89SIisjcfbmKVKxocV80MAAAAAElFTkSuQmCC",
  hA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIVJREFUOI3Fk00Kg0AMRl9kzlClLgv1AHO6nCBntNBlxfES05XiKjKjYHYhfF8e+YG7QwAe7TPXiJc0SViT4f0qEo+fLwBNTed9uAaqiqrWGeyFnolLYGaYmUsQvOIR/iUE2x3UrHFJk5xe4zaDGGMxAVxwSAKQc6bt+qJ/SPNPRORsf/gDEBMlsvEN3egAAAAASUVORK5CYII=",
  pA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIBJREFUOI1jYBhowMjAwMAgJi71nxzNr14+Y2SBcdTVlEnSfPPWXQYGBgYGJnJsRgYsuCQqKytR+O3t7aQZgE8T0QYguwKXYTjDoL29nTIXoIcByQYQYzsDAzWj0djYmCSNVEtIjAwMDAz///9nEJeQJik/vHzxlJGRkZFS+xkYAIVwHw+wggG3AAAAAElFTkSuQmCC",
  gA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIJJREFUOI1jYBhowMjAwMAgJi71nxzNr14+Y2SBcdTVlEnSfPPWXQYGBgYGJnJsRgYsuCQqKyvh7Pb2dpwGEHRBe3s7imEkG0AI0N6AyspKvGGAMxDxaSLJBYQA3AXGxsYkaaRaQmJkYGBg+P//P4O4hDRJ+eHli6eMjIyMlNrPwAAA4UAb34q8Z0wAAAAASUVORK5CYII=",
  mA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIFJREFUOI3Fk0EKAjEMRV+GnsGKLgU9QE+XE/SMM+BSsV6iroQummJbYf4uCf/9LBLYWwJw8Kc8Yn6np7hvcbteuszrdgdgGUku1QSoKqo6BiiNLUgVUDNYkCogxvhTzwT0aBrgrIG1sgkIIXQl/+2QBCDnjD+eu/4hvR4iIrP58AHrjR6Jbd3a2gAAAABJRU5ErkJggg==",
  AA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIlJREFUOI1jYBhowMjAwMAgJi71nxzNr14+Y2SBcdTVlEnSfPPWXQYGBgYGJnJsRgY4DaisrCTKABZsgjDN6Ia0t7cTdgGxNuM0AJst+ABWL7S3tzNUVlYSZRjOQCTWJRRHI9wLxsbGJGmkWkJiZGBgYPj//z+DuIQ0Sfnh5YunjIyMjJTaz8AAACjGIEpsAY+TAAAAAElFTkSuQmCC",
  yA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIJJREFUOI1jYBhowMjAwMAgJi71nxzNr14+Y2SBcdTVlEnSfPPWXQYGBgYGJnJsRgYsuCQqKytR+O3t7VjVUewC2hiA7nxcYjgNwOZfksMAWQMuzQwMeGKBkEYMA4yNjQkqRgZUS0iMDAwMDP///2cQl5AmKT+8fPGUkZGRkVL7GRgAYYAfCXxIR+4AAAAASUVORK5CYII=",
  vA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIVJREFUOI1jYBhowMjAwMAgJi71nxzNr14+Y2SBcdTVlEnSfPPWXQYGBgYGJnJsRgZEGVBZWYlTjgWbIDYNlZWVDO3t7eS5AJ/BJBmAzQVYvYCuEJfziXYBLs1EG4APwL1gbGxMkkaqJSRGBgYGhv///zOIS0iTlB9evnjKyMjISKn9DAwAe7MgShHFcG0AAAAASUVORK5CYII=",
  wA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAAXNSR0IArs4c6QAAAHtJREFUSIljYBjpgJGBgYFBTFzq/0BY/urlM0YWGEddTZmult+8dZeBgYGBgYmutmIBow7A64DKykqKLSBkBgteWSo5gmwHtLe309RyBobBngboAeBRYGxsTFeLB01BxMjAwMDw//9/BnEJabrWBy9fPGVkZGSkp5XYAQCiVBcg2CszcwAAAABJRU5ErkJggg==",
  SA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAALBJREFUOI1jYBhowIhLonp/yH8GBgYG9tknGeqWPcapjgWXxkOnzzIwMDAwaL/5SpkTM9yE/uOTx+m0/y2lKBoZa7pxqsWq+b6oKApGN5AkzfgMwXDWfVFRvDYpvn6NooeJKGfhARgGrPvNg1MxNjlmdIEzHArMov/+22sy/8LQ3MrA3/z9x4v9eA34/uPFfpgh1/+xMcBwKwN/87sPF+rQ1eOMWyEBgyZkPjbNgwMAAJ9pWd3FMSILAAAAAElFTkSuQmCC",
  kA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAUJJREFUOI3NkrFLQlEYxX/v3QfPIcik11BQgjS1OLS79Rc0Ri4OzUE2BEJZa9DUUIOLjWVDQ0MYDVJoEdUYpBhkECJF+Hw9322wobw+l4b6lo97zvkO597vwl+X5kes5GclgLlzQWqv6qsz/AbPipcATL28/y7iwkxI9uN9o5WTCem2IXt3Q8AwWD4q9NT2BMvJhKxkctwKj6LhMT8XJ2IFCS+uKnq9G5DrS7KSyVHTO8lt0enDk9PI45xyHcWgvJVhXGqYX8/r6nB1eoJdKOCMRpS0yhZ+kDqMOBrnz1WestvE3+qKRkmw/zEAgNXWuEfiCJhwNR6EZPPwQDEQ3UApEBaWJ2MYLcakRswTCANGGkPsOla6adfyfQ2adi1fCoRF1CX26po8uiZ2K8AGg+l64zrVrff9B6FgdO37udfw/6hPt5VuE/pCWSYAAAAASUVORK5CYII=",
  CA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAKVJREFUOI1jYBhowIhLonp/yH8GBgYG9tknGeqWPcapjgWXxkOnzzIwMDAwaL/5SpkTM9yE/uOTx+m0/1/2o2hk5HHEqhbDC3DNzzMxxLAZgiGATTMcSE7HcAmmAbc18PtZ9QaKHiZ8iokBGAYc3i2KUzE2OQwDAqo+N2NTeHi3KENA1edmdHGsUSMkYNC0oY23Ft3gdx8u1BFlAMwQZD42zYMDAADxejyUMhom5QAAAABJRU5ErkJggg==",
  EA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATlJREFUOI3Nkr9LAmEYxz/qxUkR2EFDV2QStQThWkMOQUtLQ/9BQ/UPFPTDwaOmtqChpogco1wdDpSGsiiCiEJQMDJBRCjz4My3peHy7mpoqGd7nu8Pvu/7PPDX5XEDVvVZASDvnRGNF1x5kpswlbkEYKRc+13EhSlFfIe7Rsvf7ItGEw4PEvj9MssbcUeu11Vc0jhPrlHMpZgYU8nfHjkmsRmIV100ShqFpwYAtbcmAMH+DoTxYDOxJyguMjggIX9+r2kKri50qGeAdxvdtoUvoBd6VYlUOkfxcZu5+fLPT0gnuwFQeyTusiaGIRgKtXGfNdnZStgMfK2Dk1PFNx7qilTqVYJ9EtOT7fiAyOgwS7serW4861a+42qUQDh2vNm5bp3NrLxolep1tJXregdKIByz9k7i/1EfgrFqHtZGC0sAAAAASUVORK5CYII=",
  xA = ({ setGuide: e }) =>
    c.jsx("div", {
      className: "overlay",
      children: c.jsxs("div", {
        className: "htp-overlay-content border-gradient-normal",
        children: [
          c.jsxs("div", {
            className: "htp-guide-container",
            children: [
              c.jsxs("div", {
                className: "htp-section",
                children: [
                  c.jsx("p", {
                    className: "htp-section-title gradient-text",
                    children: "Controls",
                  }),
                  c.jsx("br", {}),
                  c.jsxs("div", {
                    className: "controls-row",
                    children: [
                      c.jsx("img", {
                        src: fA,
                        alt: "W key",
                        className: "control-key pixel-art",
                      }),
                      c.jsx("img", {
                        src: hA,
                        alt: "A key",
                        className: "control-key pixel-art",
                      }),
                      c.jsx("img", {
                        src: pA,
                        alt: "S key",
                        className: "control-key pixel-art",
                      }),
                      c.jsx("img", {
                        src: gA,
                        alt: "D key",
                        className: "control-key pixel-art",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "controls-row",
                    children: [
                      c.jsx("img", {
                        src: mA,
                        alt: "Up key",
                        className: "control-key pixel-art",
                      }),
                      c.jsx("img", {
                        src: AA,
                        alt: "Left key",
                        className: "control-key pixel-art",
                      }),
                      c.jsx("img", {
                        src: yA,
                        alt: "Down key",
                        className: "control-key pixel-art",
                      }),
                      c.jsx("img", {
                        src: vA,
                        alt: "Right key",
                        className: "control-key pixel-art",
                      }),
                    ],
                  }),
                  c.jsx("p", { children: "Control Snake" }),
                  c.jsx("br", {}),
                  c.jsx("div", {
                    className: "controls-row",
                    children: c.jsx("img", {
                      src: wA,
                      alt: "Space key",
                      className: "control-key pixel-art",
                    }),
                  }),
                  c.jsx("p", { children: "Use Ability" }),
                ],
              }),
              c.jsxs("div", {
                className: "htp-section",
                children: [
                  c.jsx("p", {
                    className: "htp-section-title gradient-text",
                    children: "Objective",
                  }),
                  c.jsxs("div", {
                    className: "text-align-center",
                    children: [
                      c.jsx("p", {
                        children: "Survive until the time runs out.",
                      }),
                      c.jsx("p", { children: "Avoid snakes and obstacles." }),
                      c.jsx("p", { children: "Win by having more points." }),
                      c.jsx("br", {}),
                      c.jsxs("div", {
                        className: "htp-objective-apples-row",
                        children: [
                          c.jsxs("div", {
                            className: "htp-objective-apples-column",
                            children: [
                              c.jsx("img", {
                                className: "htp-apple-image pixel-art",
                                src: CA,
                                alt: "Golden Apple",
                              }),
                              c.jsx("p", { children: "300" }),
                            ],
                          }),
                          c.jsxs("div", {
                            className: "htp-objective-apples-column",
                            children: [
                              c.jsx("img", {
                                className: "htp-apple-image pixel-art",
                                src: SA,
                                alt: "Red Apple",
                              }),
                              c.jsx("p", { children: "100" }),
                            ],
                          }),
                          c.jsxs("div", {
                            className: "htp-objective-apples-column",
                            children: [
                              c.jsx("img", {
                                className: "htp-apple-image pixel-art",
                                src: EA,
                                alt: "Golden Apple Rotten",
                              }),
                              c.jsx("p", { children: "50" }),
                            ],
                          }),
                          c.jsxs("div", {
                            className: "htp-objective-apples-column",
                            children: [
                              c.jsx("img", {
                                className: "htp-apple-image pixel-art",
                                src: kA,
                                alt: "Red Apple Rotten",
                              }),
                              c.jsx("p", { children: "50" }),
                            ],
                          }),
                        ],
                      }),
                      c.jsx("br", {}),
                      c.jsx("p", { children: "Apples rot after a while." }),
                    ],
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "htp-section",
                children: [
                  c.jsx("p", {
                    className: "htp-section-title gradient-text",
                    children: "Lobbies",
                  }),
                  c.jsx("p", {
                    className: "text-color-soft",
                    children: "Private Lobby",
                  }),
                  c.jsx("p", { children: "Customize settings." }),
                  c.jsx("p", { children: "Play alone or invite a friend." }),
                  c.jsx("br", {}),
                  c.jsx("p", {
                    className: "text-color-soft",
                    children: "Public Lobby",
                  }),
                  c.jsxs("p", {
                    children: [
                      "Opponent: ",
                      c.jsx("span", {
                        className: "text-color-alternate",
                        children: "Random",
                      }),
                    ],
                  }),
                  c.jsxs("p", {
                    children: [
                      "Map: ",
                      c.jsx("span", {
                        className: "text-color-alternate",
                        children: "Random",
                      }),
                    ],
                  }),
                  c.jsxs("p", {
                    children: [
                      "Map Size: ",
                      c.jsx("span", {
                        className: "text-color-alternate",
                        children: "Random",
                      }),
                    ],
                  }),
                  c.jsxs("p", {
                    children: [
                      "Speed: ",
                      c.jsx("span", {
                        className: "text-color-alternate",
                        children: "Random",
                      }),
                    ],
                  }),
                  c.jsx("p", { children: "Time Limit: 120s" }),
                  c.jsxs("p", {
                    children: [
                      "Borders: ",
                      c.jsx("span", {
                        className: "text-color-alternate",
                        children: "Random",
                      }),
                    ],
                  }),
                  c.jsxs("p", {
                    children: [
                      "Abilities: ",
                      c.jsx("span", {
                        className: "text-color-green",
                        children: "ON",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          c.jsx("br", {}),
          c.jsx("button", {
            className: "button-default button-height-less button-width-less",
            onMouseEnter: W,
            onClick: () => {
              e(!1), ee();
            },
            children: "Close",
          }),
        ],
      }),
    });
function NA() {
  const { playerData: e, setPlayerData: t } = A.useContext(Pt),
    n = on(),
    [r, o] = A.useState(""),
    [i, s] = A.useState(!1),
    [l, a] = A.useState(!1);
  A.useEffect(() => {
    e === null && n("/");
  }, [e, n]);
  const u = () => {
      t(null), ee();
    },
    f = () => {
      a(!0), ee();
    },
    h = async (m) => {
      m.preventDefault(), o(""), s(!0), ee();
      const v = `${Ht}/api/lobby/create-private-lobby`;
      try {
        const k = await fetch(v, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId: e.playerId }),
        });
        if ((s(!1), k.ok)) {
          const C = await k.json();
          n("/create-private-lobby", { state: { lobby: C } });
        } else
          switch (k.status) {
            case 400:
              K(o, "Request body cannot be null or Player Id is required");
              break;
            case 404:
              K(o, "Real-time connection not yet established, try again");
              break;
            case 409:
              K(o, "Player is already in a lobby");
              break;
            case 500:
              K(o, "Failed to create lobby");
              break;
            default:
              K(o, "An unexpected error occurred, please try again.");
          }
      } catch {
        K(o, "Failed to connect to the server"), s(!1);
      }
    };
  return c.jsxs("div", {
    className: "container-center",
    children: [
      l && c.jsx(xA, { setGuide: a }),
      c.jsxs("div", {
        className: "title-section",
        children: [
          c.jsxs("p", {
            className: "section__text__p2",
            children: ["Welcome, ", e == null ? void 0 : e.username],
          }),
          c.jsx("p", {
            className: "title gradient-text",
            children: "Pick your poison",
          }),
        ],
      }),
      c.jsxs("div", {
        className: "buttons-main-menu-container",
        children: [
          c.jsx(wr, {
            children: c.jsx("button", {
              className: "button-default",
              onMouseEnter: W,
              onClick: h,
              children: i ? "Creating..." : "Create Private Game",
            }),
          }),
          c.jsx(wr, {
            to: "/join-private-lobby",
            children: c.jsx("button", {
              className: "button-default",
              onMouseEnter: W,
              onClick: ee,
              children: "Join Private Game",
            }),
          }),
          c.jsx(wr, {
            to: "/public-queue",
            children: c.jsx("button", {
              className: "button-default",
              onMouseEnter: W,
              onClick: ee,
              children: "Join Public Game",
            }),
          }),
          c.jsx("button", {
            className: "button-default",
            onMouseEnter: W,
            onClick: f,
            children: "How to Play",
          }),
          c.jsx(wr, {
            children: c.jsx("button", {
              className: "button-default",
              onMouseEnter: W,
              onClick: u,
              children: "Log Out",
            }),
          }),
        ],
      }),
      c.jsx("br", {}),
      c.jsx("div", {
        className: "container-center",
        children: r && c.jsx("p", { className: "error-text", children: r }),
      }),
    ],
  });
}
const IA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAW1JREFUWIXtl8GSwiAMhn+wJw9M676e4933ss8ncbxpyJ7YZbTQxNY97O4/w6EUwkcSaAr8dTnNoBCCaA1eLheVTZNCCHI8HiWl1GwhBLHAAoBfC9K5741bIEwAzrlqy4oxmiC6qU6rG0uJCM7nM4ZhQAhB5nKi6oHD4QAiAhGZIZxzX/PmNlMFYGaI2B2RwyEiqnBMhqA0ZoGIMaLve/X4WYAMoVXp+iy+M3Yfu+qc5il4JQSP851vb2DWA48QS6HMAKVSShiGQT2eiJA4rQfgvUeM0ZyciwBaSSgiT+/LZw1kFaA22XLMiGjdJBQREBGu1yu8b39GttutCrJqpeue2XLsmVllXKOqB1JKk8lmCUG+il8CyCqTiu+sMlpKUjsRTfXAptuYFgcAv2kvYQJY+xYEDBfROI4Yx/HnAW63G/b7vdnw6XR6vULOVbCIzFbCU42Z1dVxNQeW3PemGmKqc0lRWuotPyn/+nX6BEVG/w/hVwvBAAAAAElFTkSuQmCC",
  qs = ({ connection: e, playerData: t, invokeMethod: n }) => {
    const [r, o] = A.useState(!1),
      [i, s] = A.useState(null),
      l = A.useRef(null),
      a = A.useRef(null),
      u = () => {
        o(!r), m(!1), ee();
      },
      f = (d) => {
        ee();
        const g = nr.indexOf(d);
        s(d), e && e.invoke(n, g, t.ability).catch(() => {});
      },
      [h, m] = A.useState(!1),
      v = A.useRef(null),
      k = A.useRef(null),
      C = () => {
        m(!h), o(!1), ee();
      },
      x = (d) => {
        ee(), e && e.invoke(n, t.color, d.id).catch(() => {});
      };
    A.useEffect(() => {
      const d = (y) => {
          l.current && !l.current.contains(y.target) && o(!1),
            k.current.contains(y.target) && C();
        },
        g = (y) => {
          v.current && !v.current.contains(y.target) && m(!1),
            a.current.contains(y.target) && u();
        };
      return (
        r && document.addEventListener("mousedown", d),
        h && document.addEventListener("mousedown", g),
        () => {
          document.removeEventListener("mousedown", d),
            document.removeEventListener("mousedown", g);
        }
      );
    }, [r, h]);
    const p = () =>
      c.jsx("div", {
        children: c.jsxs("div", {
          className: "container-center cpl-player-buttons-container",
          children: [
            c.jsxs("div", {
              className: "cpl-player-pallete-container",
              children: [
                c.jsx("img", {
                  src: Um,
                  alt: "Powerup",
                  className: "pixel-art cpl-player-button",
                  onClick: C,
                  onMouseEnter: W,
                  ref: k,
                  style: { pointerEvents: h ? "none" : "auto" },
                }),
                h &&
                  c.jsx("div", {
                    className: "color-menu-container",
                    ref: v,
                    children: c.jsx("div", {
                      className: "ability-menu",
                      children: qd.map((d) =>
                        c.jsxs(
                          "div",
                          {
                            className: "ability-container",
                            children: [
                              c.jsxs("label", {
                                style: { backgroundImage: `url(${d.img})` },
                                className: "ability-button pixel-art",
                                onMouseEnter: W,
                                children: [
                                  c.jsx("input", {
                                    type: "radio",
                                    name: "ability",
                                    value: d.id,
                                    checked: t.ability === d.id,
                                    onChange: () => x(d),
                                    style: { display: "none" },
                                  }),
                                  t.ability === d.id &&
                                    c.jsx("div", {
                                      className: "ability-selected-indicator",
                                    }),
                                ],
                              }),
                              c.jsxs("div", {
                                className: "tooltip border-gradient-normal",
                                style: {
                                  transform: `translateX(-${(d.id + 1) * 25}%)`,
                                },
                                children: [
                                  c.jsx("p", {
                                    className: "tooltip-name",
                                    children: d.name,
                                  }),
                                  c.jsx("p", {
                                    className: "tooltip-description",
                                    children: d.description,
                                  }),
                                  c.jsxs("p", {
                                    className: "tooltip-description",
                                    children: ["Cooldown: ", d.cooldown, "s"],
                                  }),
                                  c.jsx("p", {
                                    className:
                                      "tooltip-description text-color-soft",
                                    children: "Press [Space] to use.",
                                  }),
                                ],
                              }),
                            ],
                          },
                          d.id
                        )
                      ),
                    }),
                  }),
              ],
            }),
            c.jsxs("div", {
              className: "cpl-player-pallete-container",
              children: [
                c.jsx("img", {
                  src: bm,
                  alt: "Palette",
                  className: "pixel-art cpl-player-button",
                  ref: a,
                  onClick: u,
                  onMouseEnter: W,
                  style: { pointerEvents: r ? "none" : "auto" },
                }),
                r &&
                  c.jsx("div", {
                    className: "color-menu-container",
                    ref: l,
                    children: c.jsx("div", {
                      className: "color-menu",
                      children: nr.map((d) =>
                        c.jsxs(
                          "label",
                          {
                            className: "color-button",
                            style: { backgroundColor: d },
                            onMouseEnter: W,
                            children: [
                              c.jsx("input", {
                                type: "radio",
                                name: "color",
                                value: d,
                                checked: i === d,
                                onChange: () => f(d),
                                style: { display: "none" },
                              }),
                              i === d &&
                                c.jsx("div", {
                                  className: "color-selected-indicator",
                                }),
                            ],
                          },
                          d
                        )
                      ),
                    }),
                  }),
              ],
            }),
          ],
        }),
      });
    return c.jsx(p, {});
  };
function BA() {
  var nt;
  const e = on(),
    [t, n] = A.useState(""),
    { playerData: r, setPlayerDataFields: o } = A.useContext(Pt),
    { connection: i } = ql(),
    l = (nt = lr().state) == null ? void 0 : nt.lobby.lobby,
    [a, u] = A.useState(l),
    [f, h] = A.useState(a.gameSettings),
    [m, v] = A.useState(f),
    [k, C] = A.useState(l.player1.playerId === r.playerId),
    [x, p] = A.useState(!1),
    [d, g] = A.useState(!1),
    y = A.useRef({}),
    I = () => {
      x ||
        (navigator.clipboard.writeText(a.code),
        g(!1),
        p(!0),
        setTimeout(() => {
          g(!0),
            setTimeout(() => {
              p(!1);
            }, 500);
        }, 1e3));
    };
  A.useEffect(() => {
    C(a.player1 != null && a.player1.playerId === r.playerId);
  }, [a]),
    A.useEffect(() => {
      for (const H in m) m.hasOwnProperty(H) && (y.current[H] = m[H] || "");
    }, [m]),
    A.useEffect(() => {
      i &&
        (i.on("LobbyUpdated", (H) => {
          H.player1 != null && H.player1.playerId === r.playerId
            ? o(H.player1)
            : H.player2 != null && o(H.player2),
            u(H),
            h(H.gameSettings),
            v(H.gameSettings);
        }),
        i.on("StartGame", (H) => {
          e("/game", { state: { gameData: H } });
        }));
    }, [i]);
  const _ = (H) => {
      const { name: ve, value: sn, type: yt, checked: ln } = H.target;
      if (yt === "checkbox") {
        const P = { ...m, [ve]: ln };
        h(P),
          ee(),
          i && i.invoke("UpdatePrivateLobbySettings", P).catch(() => {});
      } else
        y.current[ve] || (y.current[ve] = ""),
          ai(
            H,
            (P) => {
              v({ ...m, [ve]: P });
            },
            { current: y.current[ve] }
          ),
          (y.current[ve] = sn);
    },
    j = () => {
      h(m), i && i.invoke("UpdatePrivateLobbySettings", m).catch(() => {});
    },
    D = (H) => {
      ee();
      const ve = f.map,
        sn = H === "left" ? ve - 1 : ve + 1,
        yt = { ...f, map: sn };
      i && i.invoke("UpdatePrivateLobbySettings", yt).catch(() => {});
    },
    q = async (H) => {
      H.preventDefault(), n(""), ee();
      try {
        (
          await fetch(`${Ht}/api/lobby/leave-private-lobby`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerId: r.playerId }),
          })
        ).ok
          ? e("/main-menu")
          : K(n, "An unexpected error occurred, please try again");
      } catch {
        K(n, "Failed to connect to the server");
      }
    },
    z = async (H) => {
      ee(), i && i.invoke("StartGame").catch(() => {});
    },
    xe = ({ player: H, playerNumber: ve }) =>
      c.jsx(c.Fragment, {
        children: c.jsx("div", {
          className: "cpl-player-info border-gradient-normal",
          children:
            H == null
              ? c.jsxs("div", {
                  style: { position: "relative" },
                  children: [
                    c.jsx("div", {
                      children: c.jsx("p", {
                        className: "cpl-player-name gradient-text",
                        children: "Invite",
                      }),
                    }),
                    c.jsxs("div", {
                      className: "cpl-code-container",
                      children: [
                        c.jsx("p", {
                          className: "text-color-weaker",
                          children: "Code: ",
                        }),
                        c.jsx("p", { children: a.code }),
                        c.jsx("img", {
                          src: IA,
                          alt: "Copy code",
                          className: "pixel-art cpl-copy-icon",
                          onClick: I,
                          style: { cursor: "pointer" },
                        }),
                      ],
                    }),
                    x &&
                      c.jsx("p", {
                        className: `copy-message ${d ? "fade-out" : ""}`,
                        children: "Copied to clipboard!",
                      }),
                  ],
                })
              : c.jsxs("div", {
                  className: "cpl-player-info",
                  children: [
                    c.jsx("div", {
                      children: c.jsx("p", {
                        className: "cpl-player-name gradient-text-dynamic",
                        style: { "--player-color": nr[H.color] },
                        children: H.username,
                      }),
                    }),
                    c.jsx("div", {
                      className:
                        "cpl-player-info-snake-container container-center ",
                      children: c.jsx("img", {
                        src: Wd[H.color],
                        alt: "Player Snake",
                        className: `cpl-player-info-snake-image cpl-player-info-snake-image-${ve} pixel-art`,
                      }),
                    }),
                    c.jsxs("div", {
                      className: "cpl-player-stats",
                      children: [
                        c.jsxs("div", {
                          className: "cpl-player-stats-group",
                          children: [
                            c.jsx("img", {
                              src: Zd,
                              alt: "Wins",
                              className: "pixel-art cpl-player-stats-icon",
                            }),
                            c.jsx("p", {
                              className: "text-color-green",
                              children: H.wins,
                            }),
                          ],
                        }),
                        c.jsxs("div", {
                          className: "cpl-player-stats-group",
                          children: [
                            c.jsx("img", {
                              src: $d,
                              alt: "Losses",
                              className: "pixel-art cpl-player-stats-icon",
                            }),
                            c.jsx("p", {
                              className: "text-color-red",
                              children: H.losses,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
        }),
      });
  return c.jsxs("div", {
    className: "cpl-container",
    children: [
      c.jsxs("div", {
        className: "cpl-top-section-container border-gradient-normal",
        children: [
          c.jsxs("div", {
            className: "cpl-top-section cpl-top-section-1",
            children: [
              c.jsx(xe, { player: a.player1, playerNumber: 1 }),
              c.jsx("img", {
                className:
                  "pixel-art cpl-map-preview-image border-gradient-normal",
                src: Ws[f.map].img,
                alt: "Map Image",
              }),
              c.jsx(xe, { player: a.player2, playerNumber: 2 }),
            ],
          }),
          c.jsxs("div", {
            className: "cpl-top-section cpl-top-section-2",
            children: [
              c.jsx("div", {
                children:
                  k &&
                  c.jsx(qs, {
                    connection: i,
                    playerData: r,
                    invokeMethod: "UpdatePlayerInPrivateLobby",
                  }),
              }),
              c.jsx("div", {
                className: "cpl-map-preview-container",
                children: c.jsxs("div", {
                  className: "cpl-map-navigation-container",
                  children: [
                    c.jsx("button", {
                      className: "button-default button-square",
                      onClick: () => D("left"),
                      onMouseEnter: W,
                      children: "<",
                    }),
                    c.jsx("p", {
                      className: "cpl-map-name gradient-text",
                      children: Ws[f.map].name,
                    }),
                    c.jsx("button", {
                      className: "button-default button-square",
                      onClick: () => D("right"),
                      onMouseEnter: W,
                      children: ">",
                    }),
                  ],
                }),
              }),
              c.jsx("div", {
                children:
                  !k &&
                  c.jsx(qs, {
                    connection: i,
                    playerData: r,
                    invokeMethod: "UpdatePlayerInPrivateLobby",
                  }),
              }),
            ],
          }),
        ],
      }),
      c.jsxs("div", {
        className: "cpl-map-settings border-gradient-normal",
        children: [
          c.jsxs("div", {
            className: "cpl-setting-container",
            children: [
              c.jsx("p", { className: "cpl-label", children: "Height" }),
              c.jsx("input", {
                className: "cpl-input",
                type: "number",
                name: "height",
                value: m.height,
                onChange: _,
                onBlur: j,
              }),
            ],
          }),
          c.jsxs("div", {
            className: "cpl-setting-container",
            children: [
              c.jsx("p", { className: "cpl-label", children: "Time (s)" }),
              c.jsx("input", {
                className: "cpl-input",
                type: "number",
                name: "time",
                value: m.time,
                onChange: _,
                onBlur: j,
              }),
            ],
          }),
          c.jsxs("div", {
            className: "cpl-setting-container",
            children: [
              c.jsx("p", { className: "cpl-label", children: "Borders" }),
              c.jsxs("div", {
                className: "checkbox_wrapper",
                children: [
                  c.jsx("input", {
                    type: "checkbox",
                    name: "borders",
                    checked: m.borders,
                    onChange: _,
                  }),
                  c.jsx("label", {}),
                ],
              }),
            ],
          }),
          c.jsxs("div", {
            className: "cpl-setting-container",
            children: [
              c.jsx("p", { className: "cpl-label", children: "Width" }),
              c.jsx("input", {
                className: "cpl-input",
                type: "number",
                name: "width",
                value: m.width,
                onChange: _,
                onBlur: j,
              }),
            ],
          }),
          c.jsxs("div", {
            className: "cpl-setting-container",
            children: [
              c.jsx("p", { className: "cpl-label", children: "Speed" }),
              c.jsx("input", {
                className: "cpl-input",
                type: "number",
                name: "speed",
                value: m.speed,
                onChange: _,
                onBlur: j,
              }),
            ],
          }),
          c.jsxs("div", {
            className: "cpl-setting-container",
            children: [
              c.jsx("p", { className: "cpl-label", children: "Abilities" }),
              c.jsxs("div", {
                className: "checkbox_wrapper",
                children: [
                  c.jsx("input", {
                    type: "checkbox",
                    name: "abilities",
                    checked: m.abilities,
                    onChange: _,
                  }),
                  c.jsx("label", {}),
                ],
              }),
            ],
          }),
        ],
      }),
      c.jsxs("div", {
        className: "buttons-login-container container-center",
        children: [
          c.jsx("button", {
            className: "button-default button-height-less",
            onClick: q,
            onMouseEnter: W,
            children: "Leave",
          }),
          c.jsx("button", {
            className: "button-default button-height-less",
            onClick: z,
            onMouseEnter: W,
            children: "Start",
          }),
        ],
      }),
      c.jsx("div", {
        className: "container-center",
        children: t && c.jsx("p", { className: "error-text", children: t }),
      }),
    ],
  });
}
function RA() {
  const [e, t] = A.useState(""),
    [n, r] = A.useState(!1),
    o = A.useRef(""),
    [i, s] = A.useState(""),
    { playerData: l } = A.useContext(Pt),
    a = on(),
    u = async (f) => {
      f.preventDefault(), t(""), r(!0), ee();
      const h = `${Ht}/api/lobby/join-private-lobby`;
      try {
        const m = await fetch(h, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId: l.playerId, lobbyCode: i }),
        });
        if ((r(!1), m.ok)) {
          const v = await m.json();
          a("/create-private-lobby", { state: { lobby: v } });
        } else
          switch (m.status) {
            case 400:
              K(t, "Invalid request");
              break;
            case 404:
              K(t, "Lobby not found");
              break;
            case 409:
              K(t, "You are already in a lobby");
              break;
            case 500:
              K(t, "Server error, please try again later");
              break;
            default:
              K(t, "An unexpected error occurred, please try again");
          }
      } catch {
        K(t, "Failed to connect to the server"), r(!1);
      }
    };
  return c.jsxs("div", {
    className: "container-center",
    children: [
      c.jsx("p", {
        className: "title gradient-text title-section",
        children: "Join Private Game",
      }),
      c.jsxs("form", {
        onSubmit: u,
        children: [
          c.jsx("input", {
            type: "text",
            placeholder: "6 character code",
            value: i,
            minLength: 6,
            maxLength: 6,
            onChange: (f) => ai(f, s, o),
            required: !0,
          }),
          c.jsx("div", {
            className: "buttons-login",
            children: c.jsx("button", {
              type: "submit",
              className: "button-default button-height-less",
              onMouseEnter: W,
              disabled: n,
              children: n ? "Joining..." : "Join",
            }),
          }),
        ],
      }),
      c.jsx("div", {
        className: "btn-container",
        children: c.jsx(wr, {
          to: "/main-menu",
          children: c.jsx("button", {
            className: "button-default button-height-less",
            onMouseEnter: W,
            onClick: ee,
            children: "Leave",
          }),
        }),
      }),
      c.jsx("br", {}),
      c.jsx("div", {
        className: "container-center",
        children: e && c.jsx("p", { className: "error-text", children: e }),
      }),
    ],
  });
}
function PA() {
  const e = on(),
    [t, n] = A.useState(""),
    [r, o] = A.useState(0),
    { playerData: i, setPlayerDataFields: s } = A.useContext(Pt),
    { connection: l } = ql();
  A.useEffect(() => {
    l &&
      (l.on("PlayerUpdated", (v) => {
        s(v);
      }),
      l.on("StartGame", (v) => {
        e("/game", { state: { gameData: v } });
      }));
  }, [l]);
  const a = async (v) => {
      ee(), e("/main-menu");
    },
    u = async (v) => {
      ee(), o(1), l && l.invoke("JoinPublicLobby").catch(() => {});
    },
    f = async (v) => {
      ee(), l && (o(0), l.invoke("StopQueue").catch(() => {}));
    },
    h = () =>
      c.jsx("div", {
        className: "cpl-player-info border-gradient-normal",
        children: c.jsxs("div", {
          className: "player-info",
          children: [
            c.jsx("div", {
              children: c.jsx("p", {
                className: "cpl-player-name gradient-text-dynamic",
                style: { "--player-color": nr[i.color] },
                children: i.username,
              }),
            }),
            c.jsx("div", {
              className: "container-center",
              children: c.jsx("img", {
                src: Wd[i.color],
                alt: "Player Snake",
                className:
                  "cpl-player-info-snake-image cpl-player-info-snake-image-1 pixel-art",
              }),
            }),
            c.jsxs("div", {
              className: "cpl-player-stats",
              children: [
                c.jsxs("div", {
                  className: "cpl-player-stats-group",
                  children: [
                    c.jsx("img", {
                      src: Zd,
                      alt: "Wins",
                      className: "pixel-art cpl-player-stats-icon",
                    }),
                    c.jsx("p", {
                      className: "text-color-green",
                      children: i.wins,
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "cpl-player-stats-group",
                  children: [
                    c.jsx("img", {
                      src: $d,
                      alt: "Losses",
                      className: "pixel-art cpl-player-stats-icon",
                    }),
                    c.jsx("p", {
                      className: "text-color-red",
                      children: i.losses,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    m = () =>
      c.jsxs("div", {
        className: "container-center",
        children: [
          c.jsx("p", {
            className: "title gradient-text title-section",
            children: "Looking for an opponent...",
          }),
          c.jsx("button", {
            className: "button-default button-height-less",
            onClick: f,
            onMouseEnter: W,
            children: "Stop",
          }),
        ],
      });
  return c.jsxs("div", {
    className: "container-center",
    children: [
      r === 0 &&
        c.jsxs("div", {
          className: "container-center",
          children: [
            c.jsx("div", {
              className: "pq-player-info",
              children: c.jsx(h, {}),
            }),
            c.jsx("div", {
              className: "pq-player-buttons",
              children: c.jsx(qs, {
                connection: l,
                playerData: i,
                invokeMethod: "UpdatePlayer",
              }),
            }),
            c.jsxs("div", {
              className: "buttons-login-container container-center",
              children: [
                c.jsx("button", {
                  className: "button-default button-height-less",
                  onClick: a,
                  onMouseEnter: W,
                  children: "Leave",
                }),
                c.jsx("button", {
                  className: "button-default button-height-less",
                  onClick: u,
                  onMouseEnter: W,
                  children: "Find Game",
                }),
                c.jsx("div", {
                  className: "container-center",
                  children:
                    t && c.jsx("p", { className: "error-text", children: t }),
                }),
              ],
            }),
          ],
        }),
      r === 1 && c.jsx(m, {}),
    ],
  });
}
const _A =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHZJREFUOI1jzPov8p+BAsDCwMDAsEaciSzNIS//MZCnEwngNSDk5T/yDSBGM04DcGnGJs6ELAnDuDSuEWfCkCcqELFpJMkAfIBiA1hgDOTEhO7ckJf/cCY2rKLoimF8bAbh9AI2G7GJ4Q0DYvIIdQKR2GSLDQAABWcsjm2c838AAAAASUVORK5CYII=",
  TA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHVJREFUOI2lk1EKACEIBd9KRwi6//G8xGu/khJy3RL8EJoh055ea8dFFABoIkewkjgjpwgFSp4LMvBWkIUXgZKWX8K5Tj1iEzFIyWVq6SkMiR95WjBg344JmojlDp5vEt7AS6J620J2vcNTGcn1XyjAv83z8QIUNjUv/ZUXfQAAAABJRU5ErkJggg==";
function jA() {
  const [e, t] = A.useState(ue.isMuted),
    n = () => {
      ue.playHoverSound();
    },
    r = () => {
      ue.toggleMute(), t(ue.isMuted);
    };
  return c.jsx("button", {
    onClick: r,
    onMouseEnter: n,
    className: "pixel-art",
    style: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      zIndex: 1e3,
    },
    children: c.jsx("img", {
      src: e ? TA : _A,
      alt: e ? "Sound off" : "Sound on",
      style: { width: "50px", height: "50px" },
    }),
  });
}
function DA() {
  return c.jsx(_g, {
    children: c.jsxs(Ig, {
      basename: Mm,
      children: [
        c.jsxs(Yd, {
          children: [
            c.jsx(Lt, { path: "/", element: c.jsx(dA, {}) }),
            c.jsx(Lt, {
              path: "/*",
              element: c.jsx(bA, {
                children: c.jsx(Om, { children: c.jsx(MA, {}) }),
              }),
            }),
          ],
        }),
        c.jsx(jA, {}),
      ],
    }),
  });
}
function MA() {
  return c.jsxs(Yd, {
    children: [
      c.jsx(Lt, { path: "/main-menu", element: c.jsx(NA, {}) }),
      c.jsx(Lt, { path: "/create-private-lobby", element: c.jsx(BA, {}) }),
      c.jsx(Lt, { path: "/join-private-lobby", element: c.jsx(RA, {}) }),
      c.jsx(Lt, { path: "/public-queue", element: c.jsx(PA, {}) }),
      c.jsx(Lt, { path: "/game", element: c.jsx(uA, {}) }),
    ],
  });
}
function bA({ children: e }) {
  const { playerData: t } = A.useContext(Pt),
    n = on();
  return (
    A.useEffect(() => {
      t || n("/");
    }, [t, n]),
    t ? e : null
  );
}
Md(document.getElementById("root")).render(c.jsx(DA, {}));
