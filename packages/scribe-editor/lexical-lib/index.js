var Ig = Object.defineProperty;
var Rg = (t, e, r) => e in t ? Ig(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var $ = (t, e, r) => Rg(t, typeof e != "symbol" ? e + "" : e, r);
import * as Os from "react";
import Md, { createContext as Od, useContext as Id, useEffect as J, useMemo as Be, useLayoutEffect as Vr, forwardRef as Ji, useState as se, useCallback as me, useRef as Le, Suspense as Pg, memo as Lg, Children as Fg, isValidElement as qg, cloneElement as Bg, useImperativeHandle as jg } from "react";
import * as $g from "react-dom";
import { flushSync as Ug, createPortal as nu } from "react-dom";
var ma = { exports: {} }, ti = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tl;
function Vg() {
  if (Tl) return ti;
  Tl = 1;
  var t = Md, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(a, u, l) {
    var c, d = {}, f = null, g = null;
    l !== void 0 && (f = "" + l), u.key !== void 0 && (f = "" + u.key), u.ref !== void 0 && (g = u.ref);
    for (c in u) n.call(u, c) && !s.hasOwnProperty(c) && (d[c] = u[c]);
    if (a && a.defaultProps) for (c in u = a.defaultProps, u) d[c] === void 0 && (d[c] = u[c]);
    return { $$typeof: e, type: a, key: f, ref: g, props: d, _owner: i.current };
  }
  return ti.Fragment = r, ti.jsx = o, ti.jsxs = o, ti;
}
var ri = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kl;
function Wg() {
  return kl || (kl = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Md, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), a = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), h = Symbol.iterator, p = "@@iterator";
    function m(b) {
      if (b === null || typeof b != "object")
        return null;
      var I = h && b[h] || b[p];
      return typeof I == "function" ? I : null;
    }
    var _ = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(b) {
      {
        for (var I = arguments.length, q = new Array(I > 1 ? I - 1 : 0), G = 1; G < I; G++)
          q[G - 1] = arguments[G];
        v("error", b, q);
      }
    }
    function v(b, I, q) {
      {
        var G = _.ReactDebugCurrentFrame, ue = G.getStackAddendum();
        ue !== "" && (I += "%s", q = q.concat([ue]));
        var fe = q.map(function(ne) {
          return String(ne);
        });
        fe.unshift("Warning: " + I), Function.prototype.apply.call(console[b], console, fe);
      }
    }
    var C = !1, T = !1, k = !1, N = !1, A = !1, D;
    D = Symbol.for("react.module.reference");
    function L(b) {
      return !!(typeof b == "string" || typeof b == "function" || b === n || b === s || A || b === i || b === l || b === c || N || b === g || C || T || k || typeof b == "object" && b !== null && (b.$$typeof === f || b.$$typeof === d || b.$$typeof === o || b.$$typeof === a || b.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      b.$$typeof === D || b.getModuleId !== void 0));
    }
    function W(b, I, q) {
      var G = b.displayName;
      if (G)
        return G;
      var ue = I.displayName || I.name || "";
      return ue !== "" ? q + "(" + ue + ")" : q;
    }
    function U(b) {
      return b.displayName || "Context";
    }
    function M(b) {
      if (b == null)
        return null;
      if (typeof b.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
        return b.displayName || b.name || null;
      if (typeof b == "string")
        return b;
      switch (b) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case s:
          return "Profiler";
        case i:
          return "StrictMode";
        case l:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case a:
            var I = b;
            return U(I) + ".Consumer";
          case o:
            var q = b;
            return U(q._context) + ".Provider";
          case u:
            return W(b, b.render, "ForwardRef");
          case d:
            var G = b.displayName || null;
            return G !== null ? G : M(b.type) || "Memo";
          case f: {
            var ue = b, fe = ue._payload, ne = ue._init;
            try {
              return M(ne(fe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, Y = 0, Z, de, ae, V, he, je, ze;
    function lt() {
    }
    lt.__reactDisabledLog = !0;
    function tn() {
      {
        if (Y === 0) {
          Z = console.log, de = console.info, ae = console.warn, V = console.error, he = console.group, je = console.groupCollapsed, ze = console.groupEnd;
          var b = {
            configurable: !0,
            enumerable: !0,
            value: lt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: b,
            log: b,
            warn: b,
            error: b,
            group: b,
            groupCollapsed: b,
            groupEnd: b
          });
        }
        Y++;
      }
    }
    function rn() {
      {
        if (Y--, Y === 0) {
          var b = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, b, {
              value: Z
            }),
            info: P({}, b, {
              value: de
            }),
            warn: P({}, b, {
              value: ae
            }),
            error: P({}, b, {
              value: V
            }),
            group: P({}, b, {
              value: he
            }),
            groupCollapsed: P({}, b, {
              value: je
            }),
            groupEnd: P({}, b, {
              value: ze
            })
          });
        }
        Y < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var rt = _.ReactCurrentDispatcher, _r;
    function Tt(b, I, q) {
      {
        if (_r === void 0)
          try {
            throw Error();
          } catch (ue) {
            var G = ue.stack.trim().match(/\n( *(at )?)/);
            _r = G && G[1] || "";
          }
        return `
` + _r + b;
      }
    }
    var Zt = !1, vr;
    {
      var ug = typeof WeakMap == "function" ? WeakMap : Map;
      vr = new ug();
    }
    function cl(b, I) {
      if (!b || Zt)
        return "";
      {
        var q = vr.get(b);
        if (q !== void 0)
          return q;
      }
      var G;
      Zt = !0;
      var ue = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var fe;
      fe = rt.current, rt.current = null, tn();
      try {
        if (I) {
          var ne = function() {
            throw Error();
          };
          if (Object.defineProperty(ne.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ne, []);
            } catch (Ke) {
              G = Ke;
            }
            Reflect.construct(b, [], ne);
          } else {
            try {
              ne.call();
            } catch (Ke) {
              G = Ke;
            }
            b.call(ne.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ke) {
            G = Ke;
          }
          b();
        }
      } catch (Ke) {
        if (Ke && G && typeof Ke.stack == "string") {
          for (var re = Ke.stack.split(`
`), $e = G.stack.split(`
`), xe = re.length - 1, Te = $e.length - 1; xe >= 1 && Te >= 0 && re[xe] !== $e[Te]; )
            Te--;
          for (; xe >= 1 && Te >= 0; xe--, Te--)
            if (re[xe] !== $e[Te]) {
              if (xe !== 1 || Te !== 1)
                do
                  if (xe--, Te--, Te < 0 || re[xe] !== $e[Te]) {
                    var nt = `
` + re[xe].replace(" at new ", " at ");
                    return b.displayName && nt.includes("<anonymous>") && (nt = nt.replace("<anonymous>", b.displayName)), typeof b == "function" && vr.set(b, nt), nt;
                  }
                while (xe >= 1 && Te >= 0);
              break;
            }
        }
      } finally {
        Zt = !1, rt.current = fe, rn(), Error.prepareStackTrace = ue;
      }
      var sn = b ? b.displayName || b.name : "", br = sn ? Tt(sn) : "";
      return typeof b == "function" && vr.set(b, br), br;
    }
    function lg(b, I, q) {
      return cl(b, !1);
    }
    function cg(b) {
      var I = b.prototype;
      return !!(I && I.isReactComponent);
    }
    function hs(b, I, q) {
      if (b == null)
        return "";
      if (typeof b == "function")
        return cl(b, cg(b));
      if (typeof b == "string")
        return Tt(b);
      switch (b) {
        case l:
          return Tt("Suspense");
        case c:
          return Tt("SuspenseList");
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case u:
            return lg(b.render);
          case d:
            return hs(b.type, I, q);
          case f: {
            var G = b, ue = G._payload, fe = G._init;
            try {
              return hs(fe(ue), I, q);
            } catch {
            }
          }
        }
      return "";
    }
    var Zn = Object.prototype.hasOwnProperty, dl = {}, fl = _.ReactDebugCurrentFrame;
    function ps(b) {
      if (b) {
        var I = b._owner, q = hs(b.type, b._source, I ? I.type : null);
        fl.setExtraStackFrame(q);
      } else
        fl.setExtraStackFrame(null);
    }
    function dg(b, I, q, G, ue) {
      {
        var fe = Function.call.bind(Zn);
        for (var ne in b)
          if (fe(b, ne)) {
            var re = void 0;
            try {
              if (typeof b[ne] != "function") {
                var $e = Error((G || "React class") + ": " + q + " type `" + ne + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[ne] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              re = b[ne](I, ne, G, q, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (xe) {
              re = xe;
            }
            re && !(re instanceof Error) && (ps(ue), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", G || "React class", q, ne, typeof re), ps(null)), re instanceof Error && !(re.message in dl) && (dl[re.message] = !0, ps(ue), y("Failed %s type: %s", q, re.message), ps(null));
          }
      }
    }
    var fg = Array.isArray;
    function Vo(b) {
      return fg(b);
    }
    function hg(b) {
      {
        var I = typeof Symbol == "function" && Symbol.toStringTag, q = I && b[Symbol.toStringTag] || b.constructor.name || "Object";
        return q;
      }
    }
    function pg(b) {
      try {
        return hl(b), !1;
      } catch {
        return !0;
      }
    }
    function hl(b) {
      return "" + b;
    }
    function pl(b) {
      if (pg(b))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", hg(b)), hl(b);
    }
    var ei = _.ReactCurrentOwner, gg = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, gl, ml, Wo;
    Wo = {};
    function mg(b) {
      if (Zn.call(b, "ref")) {
        var I = Object.getOwnPropertyDescriptor(b, "ref").get;
        if (I && I.isReactWarning)
          return !1;
      }
      return b.ref !== void 0;
    }
    function yg(b) {
      if (Zn.call(b, "key")) {
        var I = Object.getOwnPropertyDescriptor(b, "key").get;
        if (I && I.isReactWarning)
          return !1;
      }
      return b.key !== void 0;
    }
    function _g(b, I) {
      if (typeof b.ref == "string" && ei.current && I && ei.current.stateNode !== I) {
        var q = M(ei.current.type);
        Wo[q] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', M(ei.current.type), b.ref), Wo[q] = !0);
      }
    }
    function vg(b, I) {
      {
        var q = function() {
          gl || (gl = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
        };
        q.isReactWarning = !0, Object.defineProperty(b, "key", {
          get: q,
          configurable: !0
        });
      }
    }
    function bg(b, I) {
      {
        var q = function() {
          ml || (ml = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
        };
        q.isReactWarning = !0, Object.defineProperty(b, "ref", {
          get: q,
          configurable: !0
        });
      }
    }
    var Eg = function(b, I, q, G, ue, fe, ne) {
      var re = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: b,
        key: I,
        ref: q,
        props: ne,
        // Record the component responsible for creating this element.
        _owner: fe
      };
      return re._store = {}, Object.defineProperty(re._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(re, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.defineProperty(re, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ue
      }), Object.freeze && (Object.freeze(re.props), Object.freeze(re)), re;
    };
    function xg(b, I, q, G, ue) {
      {
        var fe, ne = {}, re = null, $e = null;
        q !== void 0 && (pl(q), re = "" + q), yg(I) && (pl(I.key), re = "" + I.key), mg(I) && ($e = I.ref, _g(I, ue));
        for (fe in I)
          Zn.call(I, fe) && !gg.hasOwnProperty(fe) && (ne[fe] = I[fe]);
        if (b && b.defaultProps) {
          var xe = b.defaultProps;
          for (fe in xe)
            ne[fe] === void 0 && (ne[fe] = xe[fe]);
        }
        if (re || $e) {
          var Te = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
          re && vg(ne, Te), $e && bg(ne, Te);
        }
        return Eg(b, re, $e, ue, G, ei.current, ne);
      }
    }
    var Ho = _.ReactCurrentOwner, yl = _.ReactDebugCurrentFrame;
    function nn(b) {
      if (b) {
        var I = b._owner, q = hs(b.type, b._source, I ? I.type : null);
        yl.setExtraStackFrame(q);
      } else
        yl.setExtraStackFrame(null);
    }
    var zo;
    zo = !1;
    function Ko(b) {
      return typeof b == "object" && b !== null && b.$$typeof === e;
    }
    function _l() {
      {
        if (Ho.current) {
          var b = M(Ho.current.type);
          if (b)
            return `

Check the render method of \`` + b + "`.";
        }
        return "";
      }
    }
    function Cg(b) {
      return "";
    }
    var vl = {};
    function Tg(b) {
      {
        var I = _l();
        if (!I) {
          var q = typeof b == "string" ? b : b.displayName || b.name;
          q && (I = `

Check the top-level render call using <` + q + ">.");
        }
        return I;
      }
    }
    function bl(b, I) {
      {
        if (!b._store || b._store.validated || b.key != null)
          return;
        b._store.validated = !0;
        var q = Tg(I);
        if (vl[q])
          return;
        vl[q] = !0;
        var G = "";
        b && b._owner && b._owner !== Ho.current && (G = " It was passed a child from " + M(b._owner.type) + "."), nn(b), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', q, G), nn(null);
      }
    }
    function El(b, I) {
      {
        if (typeof b != "object")
          return;
        if (Vo(b))
          for (var q = 0; q < b.length; q++) {
            var G = b[q];
            Ko(G) && bl(G, I);
          }
        else if (Ko(b))
          b._store && (b._store.validated = !0);
        else if (b) {
          var ue = m(b);
          if (typeof ue == "function" && ue !== b.entries)
            for (var fe = ue.call(b), ne; !(ne = fe.next()).done; )
              Ko(ne.value) && bl(ne.value, I);
        }
      }
    }
    function kg(b) {
      {
        var I = b.type;
        if (I == null || typeof I == "string")
          return;
        var q;
        if (typeof I == "function")
          q = I.propTypes;
        else if (typeof I == "object" && (I.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        I.$$typeof === d))
          q = I.propTypes;
        else
          return;
        if (q) {
          var G = M(I);
          dg(q, b.props, "prop", G, b);
        } else if (I.PropTypes !== void 0 && !zo) {
          zo = !0;
          var ue = M(I);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ue || "Unknown");
        }
        typeof I.getDefaultProps == "function" && !I.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ag(b) {
      {
        for (var I = Object.keys(b.props), q = 0; q < I.length; q++) {
          var G = I[q];
          if (G !== "children" && G !== "key") {
            nn(b), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", G), nn(null);
            break;
          }
        }
        b.ref !== null && (nn(b), y("Invalid attribute `ref` supplied to `React.Fragment`."), nn(null));
      }
    }
    var xl = {};
    function Cl(b, I, q, G, ue, fe) {
      {
        var ne = L(b);
        if (!ne) {
          var re = "";
          (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (re += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $e = Cg();
          $e ? re += $e : re += _l();
          var xe;
          b === null ? xe = "null" : Vo(b) ? xe = "array" : b !== void 0 && b.$$typeof === e ? (xe = "<" + (M(b.type) || "Unknown") + " />", re = " Did you accidentally export a JSX literal instead of a component?") : xe = typeof b, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", xe, re);
        }
        var Te = xg(b, I, q, ue, fe);
        if (Te == null)
          return Te;
        if (ne) {
          var nt = I.children;
          if (nt !== void 0)
            if (G)
              if (Vo(nt)) {
                for (var sn = 0; sn < nt.length; sn++)
                  El(nt[sn], b);
                Object.freeze && Object.freeze(nt);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              El(nt, b);
        }
        if (Zn.call(I, "key")) {
          var br = M(b), Ke = Object.keys(I).filter(function(Og) {
            return Og !== "key";
          }), Jo = Ke.length > 0 ? "{key: someKey, " + Ke.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!xl[br + Jo]) {
            var Mg = Ke.length > 0 ? "{" + Ke.join(": ..., ") + ": ...}" : "{}";
            y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Jo, br, Mg, br), xl[br + Jo] = !0;
          }
        }
        return b === n ? Ag(Te) : kg(Te), Te;
      }
    }
    function wg(b, I, q) {
      return Cl(b, I, q, !0);
    }
    function Dg(b, I, q) {
      return Cl(b, I, q, !1);
    }
    var Sg = Dg, Ng = wg;
    ri.Fragment = n, ri.jsx = Sg, ri.jsxs = Ng;
  }()), ri;
}
process.env.NODE_ENV === "production" ? ma.exports = Vg() : ma.exports = Wg();
var w = ma.exports;
const Rd = Od(null);
function Hg(t, e) {
  let r = null;
  return { getTheme: function() {
    return e ?? (r != null ? r.getTheme() : null);
  } };
}
function be() {
  const t = Id(Rd);
  return t == null && function(e, ...r) {
    const n = new URL("https://lexical.dev/docs/error"), i = new URLSearchParams();
    i.append("code", e);
    for (const s of r) i.append("v", s);
    throw n.search = i.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
function zg({ defaultSelection: t }) {
  const [e] = be();
  return J(() => {
    e.focus(() => {
      const r = document.activeElement, n = e.getRootElement();
      n === null || r !== null && n.contains(r) || n.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
function O(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const i of e) n.append("v", i);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Et = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Kg = Et && "documentMode" in document ? document.documentMode : null, ct = Et && /Mac|iPod|iPhone|iPad/.test(navigator.platform), sr = Et && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent), js = !(!Et || !("InputEvent" in window) || Kg) && "getTargetRanges" in new window.InputEvent("input"), Ai = Et && /Version\/[\d.]+.*Safari/.test(navigator.userAgent), kn = Et && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, Jg = Et && /Android/.test(navigator.userAgent), Pd = Et && /^(?=.*Chrome).*/i.test(navigator.userAgent), Al = Et && Jg && Pd, $s = Et && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && !Pd;
function Us(...t) {
  const e = [];
  for (const r of t) if (r && typeof r == "string") for (const [n] of r.matchAll(/\S+/g)) e.push(n);
  return e;
}
const Gg = 1, Yg = 3, Xg = 9, Qg = 11, Or = 0, Ld = 1, An = 2, Zg = 0, em = 1, tm = 2, Vs = 4, Ws = 8, iu = 128, rm = 1792 | (112 | (3 | Vs | Ws) | iu), su = 1, ou = 2, au = 3, uu = 4, lu = 5, cu = 6, fo = Ai || kn || $s ? " " : "​", Kt = `

`, nm = sr ? " " : fo, Fd = "֑-߿יִ-﷽ﹰ-ﻼ", qd = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", im = new RegExp("^[^" + qd + "]*[" + Fd + "]"), sm = new RegExp("^[^" + Fd + "]*[" + qd + "]"), Ve = { bold: 1, capitalize: 1024, code: 16, highlight: iu, italic: 2, lowercase: 256, strikethrough: Vs, subscript: 32, superscript: 64, underline: Ws, uppercase: 512 }, om = { directionless: 1, unmergeable: 2 }, wl = { center: ou, end: cu, justify: uu, left: su, right: au, start: lu }, am = { [ou]: "center", [cu]: "end", [uu]: "justify", [su]: "left", [au]: "right", [lu]: "start" }, um = { normal: 0, segmented: 2, token: 1 }, lm = { [Zg]: "normal", [tm]: "segmented", [em]: "token" }, cm = "$";
function Bd(t, e, r, n, i, s) {
  let o = t.getFirstChild();
  for (; o !== null; ) {
    const a = o.__key;
    o.__parent === e && (S(o) && Bd(o, a, r, n, i, s), r.has(a) || s.delete(a), i.push(a)), o = o.getNextSibling();
  }
}
const dm = 100;
let ya = !1, du = 0;
function fm(t) {
  du = t.timeStamp;
}
function Go(t, e, r) {
  const n = t.nodeName === "BR", i = e.__lexicalLineBreak;
  return i && (t === i || n && t.previousSibling === i) || n && xo(t, r) !== void 0;
}
function hm(t, e, r) {
  const n = gt(at(r));
  let i = null, s = null;
  n !== null && n.anchorNode === t && (i = n.anchorOffset, s = n.focusOffset);
  const o = t.nodeValue;
  o !== null && wu(e, o, i, s, !1);
}
function pm(t, e, r) {
  if (R(t)) {
    const n = t.anchor.getNode();
    if (n.is(r) && t.format !== n.getFormat()) return !1;
  }
  return Xt(e) && r.isAttached();
}
function gm(t, e, r, n) {
  for (let i = t; i && !l2(i); i = is(i)) {
    const s = xo(i, e);
    if (s !== void 0) {
      const o = ge(s, r);
      if (o) return le(o) || !Ae(i) ? void 0 : [i, o];
    } else if (i === n) return [n, Rf(r)];
  }
}
function jd(t, e, r) {
  ya = !0;
  const n = performance.now() - du > dm;
  try {
    it(t, () => {
      const i = B() || function(f) {
        return f.getEditorState().read(() => {
          const g = B();
          return g !== null ? g.clone() : null;
        });
      }(t), s = /* @__PURE__ */ new Map(), o = t.getRootElement(), a = t._editorState, u = t._blockCursorElement;
      let l = !1, c = "";
      for (let f = 0; f < e.length; f++) {
        const g = e[f], h = g.type, p = g.target, m = gm(p, t, a, o);
        if (!m) continue;
        const [_, y] = m;
        if (h === "characterData") n && F(y) && Xt(p) && pm(i, p, y) && hm(p, y, t);
        else if (h === "childList") {
          l = !0;
          const v = g.addedNodes;
          for (let k = 0; k < v.length; k++) {
            const N = v[k], A = Of(N), D = N.parentNode;
            if (D != null && N !== u && A === null && !Go(N, D, t)) {
              if (sr) {
                const L = (Ae(N) ? N.innerText : null) || N.nodeValue;
                L && (c += L);
              }
              D.removeChild(N);
            }
          }
          const C = g.removedNodes, T = C.length;
          if (T > 0) {
            let k = 0;
            for (let N = 0; N < T; N++) {
              const A = C[N];
              (Go(A, p, t) || u === A) && (p.appendChild(A), k++);
            }
            T !== k && s.set(_, y);
          }
        }
      }
      if (s.size > 0) for (const [f, g] of s) g.reconcileObservedMutation(f, t);
      const d = r.takeRecords();
      if (d.length > 0) {
        for (let f = 0; f < d.length; f++) {
          const g = d[f], h = g.addedNodes, p = g.target;
          for (let m = 0; m < h.length; m++) {
            const _ = h[m], y = _.parentNode;
            y == null || _.nodeName !== "BR" || Go(_, p, t) || y.removeChild(_);
          }
        }
        r.takeRecords();
      }
      i !== null && (l && et(i), sr && qf(t) && i.insertRawText(c));
    });
  } finally {
    ya = !1;
  }
}
function $d(t) {
  const e = t._observer;
  e !== null && jd(t, e.takeRecords(), e);
}
function Ud(t) {
  (function(e) {
    du === 0 && at(e).addEventListener("textInput", fm, !0);
  })(t), t._observer = new MutationObserver((e, r) => {
    jd(t, e, r);
  });
}
let mm = class Vd {
  constructor(e, r = /* @__PURE__ */ new Map(), n = void 0, i = /* @__PURE__ */ new Map(), s = void 0) {
    this.node = e, this.sharedConfigMap = r, this.unknownState = n, this.knownState = i;
    const o = s !== void 0 ? s : function(a, u, l) {
      let c = l.size;
      if (u) for (const d in u) {
        const f = a.get(d);
        f && l.has(f) || c++;
      }
      return c;
    }(r, n, i);
    this.size = o;
  }
  getValue(e) {
    const r = this.knownState.get(e);
    if (r !== void 0) return r;
    this.sharedConfigMap.set(e.key, e);
    let n = e.defaultValue;
    if (this.unknownState && e.key in this.unknownState) {
      const i = this.unknownState[e.key];
      i !== void 0 && (n = e.parse(i)), this.updateFromKnown(e, n);
    }
    return n;
  }
  getInternalState() {
    return [this.unknownState, this.knownState];
  }
  toJSON() {
    const e = { ...this.unknownState };
    for (const [r, n] of this.knownState) r.isEqual(n, r.defaultValue) ? delete e[r.key] : e[r.key] = r.unparse(n);
    return gs(e) ? { [cm]: e } : {};
  }
  getWritable(e) {
    if (this.node === e) return this;
    const r = new Map(this.knownState), n = gs(i = this.unknownState) && { ...i };
    var i;
    if (n) for (const s of r.keys()) delete n[s.key];
    return new Vd(e, this.sharedConfigMap, gs(n), r, this.size);
  }
  updateFromKnown(e, r) {
    const n = e.key;
    this.sharedConfigMap.set(n, e);
    const { knownState: i, unknownState: s } = this;
    i.has(e) || s && n in s || this.size++, i.set(e, r);
  }
  updateFromUnknown(e, r) {
    const n = this.sharedConfigMap.get(e);
    n ? this.updateFromKnown(n, n.parse(r)) : (this.unknownState = this.unknownState || {}, e in this.unknownState || this.size++, this.unknownState[e] = r);
  }
  updateFromJSON(e) {
    const { knownState: r } = this;
    for (const n of r.keys()) r.set(n, n.defaultValue);
    if (this.size = r.size, this.unknownState = {}, e) for (const [n, i] of Object.entries(e)) this.updateFromUnknown(n, i);
    this.unknownState = gs(this.unknownState);
  }
};
function gs(t) {
  if (t) for (const e in t) return t;
}
function ym(t) {
  const e = t.getWritable(), r = e.__state ? e.__state.getWritable(e) : new mm(e);
  return e.__state = r, r;
}
function Dl(t, e) {
  const r = t.__mode, n = t.__format, i = t.__style, s = e.__mode, o = e.__format, a = e.__style, u = t.__state, l = e.__state;
  return (r === null || r === s) && (n === null || n === o) && (i === null || i === a) && (t.__state === null || u === l || function(c, d) {
    if (c === d) return !0;
    if (c && d && c.size !== d.size) return !1;
    const f = /* @__PURE__ */ new Set(), g = (p, m) => {
      for (const [_, y] of p.knownState) {
        if (f.has(_.key)) continue;
        f.add(_.key);
        const v = m ? m.getValue(_) : _.defaultValue;
        if (v !== y && !_.isEqual(v, y)) return !0;
      }
      return !1;
    }, h = (p, m) => {
      const { unknownState: _ } = p, y = m ? m.unknownState : void 0;
      if (_) {
        for (const [v, C] of Object.entries(_)) if (!f.has(v) && (f.add(v), C !== (y ? y[v] : void 0))) return !0;
      }
      return !1;
    };
    return !(c && g(c, d) || d && g(d, c) || c && h(c, d) || d && h(d, c));
  }(u, l));
}
function Sl(t, e) {
  const r = t.mergeWithSibling(e), n = ye()._normalizedNodes;
  return n.add(t.__key), n.add(e.__key), r;
}
function Nl(t) {
  let e, r, n = t;
  if (n.__text !== "" || !n.isSimpleText() || n.isUnmergeable()) {
    for (; (e = n.getPreviousSibling()) !== null && F(e) && e.isSimpleText() && !e.isUnmergeable(); ) {
      if (e.__text !== "") {
        if (Dl(e, n)) {
          n = Sl(e, n);
          break;
        }
        break;
      }
      e.remove();
    }
    for (; (r = n.getNextSibling()) !== null && F(r) && r.isSimpleText() && !r.isUnmergeable(); ) {
      if (r.__text !== "") {
        if (Dl(n, r)) {
          n = Sl(n, r);
          break;
        }
        break;
      }
      r.remove();
    }
  } else n.remove();
}
function Hs(t) {
  return Ml(t.anchor), Ml(t.focus), t;
}
function Ml(t) {
  for (; t.type === "element"; ) {
    const e = t.getNode(), r = t.offset;
    let n, i;
    if (r === e.getChildrenSize() ? (n = e.getChildAtIndex(r - 1), i = !0) : (n = e.getChildAtIndex(r), i = !1), F(n)) {
      t.set(n.__key, i ? n.getTextContentSize() : 0, "text", !0);
      break;
    }
    if (!S(n)) break;
    t.set(n.__key, i ? n.getChildrenSize() : 0, "element", !0);
  }
}
let or, He, wi, ho, _a, va, Ir, ht, ba, Di, De = "", We = "", kt = null, At = "", Vt = "", Wd = !1, Si = !1, Is = null;
function zs(t, e) {
  const r = Ir.get(t);
  if (e !== null) {
    const n = Ca(t);
    n.parentNode === e && e.removeChild(n);
  }
  if (ht.has(t) || He._keyToDOMMap.delete(t), S(r)) {
    const n = Js(r, Ir);
    Ea(n, 0, n.length - 1, null);
  }
  r !== void 0 && Du(Di, wi, ho, r, "destroyed");
}
function Ea(t, e, r, n) {
  let i = e;
  for (; i <= r; ++i) {
    const s = t[i];
    s !== void 0 && zs(s, n);
  }
}
function Er(t, e) {
  t.setProperty("text-align", e);
}
const _m = "40px";
function Hd(t, e) {
  const r = or.theme.indent;
  if (typeof r == "string") {
    const i = t.classList.contains(r);
    e > 0 && !i ? t.classList.add(r) : e < 1 && i && t.classList.remove(r);
  }
  const n = getComputedStyle(t).getPropertyValue("--lexical-indent-base-value") || _m;
  t.style.setProperty("padding-inline-start", e === 0 ? "" : `calc(${e} * ${n})`);
}
function zd(t, e) {
  const r = t.style;
  e === 0 ? Er(r, "") : e === su ? Er(r, "left") : e === ou ? Er(r, "center") : e === au ? Er(r, "right") : e === uu ? Er(r, "justify") : e === lu ? Er(r, "start") : e === cu && Er(r, "end");
}
function Ks(t, e) {
  const r = ht.get(t);
  r === void 0 && O(60);
  const n = r.createDOM(or, He);
  if (function(i, s, o) {
    const a = o._keyToDOMMap;
    (function(u, l, c) {
      const d = `__lexicalKey_${l._key}`;
      u[d] = c;
    })(s, o, i), a.set(i, s);
  }(t, n, He), F(r) ? n.setAttribute("data-lexical-text", "true") : le(r) && n.setAttribute("data-lexical-decorator", "true"), S(r)) {
    const i = r.__indent, s = r.__size;
    if (i !== 0 && Hd(n, i), s !== 0) {
      const a = s - 1;
      (function(u, l, c, d) {
        const f = We;
        We = "", xa(u, c, 0, l, c.getDOMSlot(d)), Jd(c, d), We = f;
      })(Js(r, ht), a, r, n);
    }
    const o = r.__format;
    o !== 0 && zd(n, o), r.isInline() || Kd(null, r, n), Co(r) && (De += Kt, Vt += Kt);
  } else {
    const i = r.getTextContent();
    if (le(r)) {
      const s = r.decorate(He, or);
      s !== null && Gd(t, s), n.contentEditable = "false";
    } else F(r) && (r.isDirectionless() || (We += i));
    De += i, Vt += i;
  }
  return e !== null && e.insertChild(n), Du(Di, wi, ho, r, "created"), n;
}
function xa(t, e, r, n, i) {
  const s = De;
  De = "";
  let o = r;
  for (; o <= n; ++o) {
    Ks(t[o], i);
    const a = ht.get(t[o]);
    a !== null && F(a) && (kt === null && (kt = a.getFormat()), At === "" && (At = a.getStyle()));
  }
  Co(e) && (De += Kt), i.element.__lexicalTextContent = De, De = s + De;
}
function Ol(t, e) {
  if (t) {
    const r = t.__last;
    if (r) {
      const n = e.get(r);
      if (n) return _i(n) ? "line-break" : le(n) && n.isInline() ? "decorator" : null;
    }
    return "empty";
  }
  return null;
}
function Kd(t, e, r) {
  const n = Ol(t, Ir), i = Ol(e, ht);
  n !== i && e.getDOMSlot(r).setManagedLineBreak(i);
}
function Jd(t, e) {
  const r = e.__lexicalDirTextContent || "", n = e.__lexicalDir || "";
  if (r !== We || n !== Is) {
    const i = We === "", s = i ? Is : function(o) {
      return im.test(o) ? "rtl" : sm.test(o) ? "ltr" : null;
    }(We);
    if (s !== n) {
      const o = e.classList, a = or.theme;
      let u = n !== null ? a[n] : void 0, l = s !== null ? a[s] : void 0;
      if (u !== void 0) {
        if (typeof u == "string") {
          const c = Us(u);
          u = a[n] = c;
        }
        o.remove(...u);
      }
      if (s === null || i && s === "ltr") e.removeAttribute("dir");
      else {
        if (l !== void 0) {
          if (typeof l == "string") {
            const c = Us(l);
            l = a[s] = c;
          }
          l !== void 0 && o.add(...l);
        }
        e.dir = s;
      }
      Si || (t.getWritable().__dir = s);
    }
    Is = s, e.__lexicalDirTextContent = We, e.__lexicalDir = s;
  }
}
function vm(t, e, r) {
  const n = We;
  var i;
  We = "", kt = null, At = "", function(s, o, a) {
    const u = De, l = s.__size, c = o.__size;
    De = "";
    const d = a.element;
    if (l === 1 && c === 1) {
      const f = s.__first, g = o.__first;
      if (f === g) li(f, d);
      else {
        const p = Ca(f), m = Ks(g, null);
        try {
          d.replaceChild(m, p);
        } catch (_) {
          if (typeof _ == "object" && _ != null) {
            const y = `${_.toString()} Parent: ${d.tagName}, new child: {tag: ${m.tagName} key: ${g}}, old child: {tag: ${p.tagName}, key: ${f}}.`;
            throw new Error(y);
          }
          throw _;
        }
        zs(f, null);
      }
      const h = ht.get(g);
      F(h) && (kt === null && (kt = h.getFormat()), At === "" && (At = h.getStyle()));
    } else {
      const f = Js(s, Ir), g = Js(o, ht);
      if (f.length !== l && O(227), g.length !== c && O(228), l === 0) c !== 0 && xa(g, o, 0, c - 1, a);
      else if (c === 0) {
        if (l !== 0) {
          const h = a.after == null && a.before == null && a.element.__lexicalLineBreak == null;
          Ea(f, 0, l - 1, h ? null : d), h && (d.textContent = "");
        }
      } else (function(h, p, m, _, y, v) {
        const C = _ - 1, T = y - 1;
        let k, N, A = v.getFirstChild(), D = 0, L = 0;
        for (; D <= C && L <= T; ) {
          const M = p[D], P = m[L];
          if (M === P) A = Yo(li(P, v.element)), D++, L++;
          else {
            k === void 0 && (k = new Set(p)), N === void 0 && (N = new Set(m));
            const Z = N.has(M), de = k.has(P);
            if (Z) if (de) {
              const ae = Sn(He, P);
              ae === A ? A = Yo(li(P, v.element)) : (v.withBefore(A).insertChild(ae), li(P, v.element)), D++, L++;
            } else Ks(P, v.withBefore(A)), L++;
            else A = Yo(Ca(M)), zs(M, v.element), D++;
          }
          const Y = ht.get(P);
          Y !== null && F(Y) && (kt === null && (kt = Y.getFormat()), At === "" && (At = Y.getStyle()));
        }
        const W = D > C, U = L > T;
        if (W && !U) {
          const M = m[T + 1], P = M === void 0 ? null : He.getElementByKey(M);
          xa(m, h, L, T, v.withBefore(P));
        } else U && !W && Ea(p, D, C, v.element);
      })(o, f, g, l, c, a);
    }
    Co(o) && (De += Kt), d.__lexicalTextContent = De, De = u + De;
  }(t, e, e.getDOMSlot(r)), Jd(e, r), i = e, kt == null || kt === i.__textFormat || Si || i.setTextFormat(kt), function(s) {
    At === "" || At === s.__textStyle || Si || s.setTextStyle(At);
  }(e), We = n;
}
function Js(t, e) {
  const r = [];
  let n = t.__first;
  for (; n !== null; ) {
    const i = e.get(n);
    i === void 0 && O(101), r.push(n), n = i.__next;
  }
  return r;
}
function li(t, e) {
  const r = Ir.get(t);
  let n = ht.get(t);
  r !== void 0 && n !== void 0 || O(61);
  const i = Wd || va.has(t) || _a.has(t), s = Sn(He, t);
  if (r === n && !i) {
    if (S(r)) {
      const o = s.__lexicalTextContent;
      o !== void 0 && (De += o, Vt += o);
      const a = s.__lexicalDirTextContent;
      a !== void 0 && (We += a);
    } else {
      const o = r.getTextContent();
      F(r) && !r.isDirectionless() && (We += o), Vt += o, De += o;
    }
    return s;
  }
  if (r !== n && i && Du(Di, wi, ho, n, "updated"), n.updateDOM(r, s, or)) {
    const o = Ks(t, null);
    return e === null && O(62), e.replaceChild(o, s), zs(t, null), o;
  }
  if (S(r) && S(n)) {
    const o = n.__indent;
    o !== r.__indent && Hd(s, o);
    const a = n.__format;
    a !== r.__format && zd(s, a), i && (vm(r, n, s), qe(n) || n.isInline() || Kd(r, n, s)), Co(n) && (De += Kt, Vt += Kt);
  } else {
    const o = n.getTextContent();
    if (le(n)) {
      const a = n.decorate(He, or);
      a !== null && Gd(t, a);
    } else F(n) && !n.isDirectionless() && (We += o);
    De += o, Vt += o;
  }
  if (!Si && qe(n) && n.__cachedText !== Vt) {
    const o = n.getWritable();
    o.__cachedText = Vt, n = o;
  }
  return s;
}
function Gd(t, e) {
  let r = He._pendingDecorators;
  const n = He._decorators;
  if (r === null) {
    if (n[t] === e) return;
    r = If(He);
  }
  r[t] = e;
}
function Yo(t) {
  let e = t.nextSibling;
  return e !== null && e === He._blockCursorElement && (e = e.nextSibling), e;
}
function bm(t, e, r, n, i, s) {
  De = "", Vt = "", We = "", Wd = n === An, Is = null, He = r, or = r._config, wi = r._nodes, ho = He._listeners.mutation, _a = i, va = s, Ir = t._nodeMap, ht = e._nodeMap, Si = e._readOnly, ba = new Map(r._keyToDOMMap);
  const o = /* @__PURE__ */ new Map();
  return Di = o, li("root", null), He = void 0, wi = void 0, _a = void 0, va = void 0, Ir = void 0, ht = void 0, or = void 0, ba = void 0, Di = void 0, o;
}
function Ca(t) {
  const e = ba.get(t);
  return e === void 0 && O(75, t), e;
}
function Yd(t) {
  return {};
}
const po = {}, Em = {}, Xd = {}, wr = {}, yn = {}, Gs = {}, _n = {}, Gi = {}, Ta = {}, Ni = {}, Mi = {}, rr = {}, Yi = {}, Xi = {}, go = {}, Qd = {}, xm = {}, Zd = {}, Cm = {}, fu = {}, hu = {}, Oi = {}, ef = {}, tf = {}, pu = {}, rf = {}, gu = {}, Tm = {}, km = {}, Il = {}, nf = {}, Am = {}, sf = {}, of = {}, wm = {}, Wr = {}, jn = {}, ka = {}, Dm = {}, af = {}, ci = {}, di = {}, Sm = {}, Nm = {}, Mm = {}, jt = Object.freeze({}), Aa = 30, wa = [["keydown", function(t, e) {
  if (mi = t.timeStamp, Da = t.key, e.isComposing()) return;
  const { key: r, shiftKey: n, ctrlKey: i, metaKey: s, altKey: o } = t;
  if (!j(e, go, t) && r != null) {
    if (Xo && on(Da)) return it(e, () => {
      ms(e, Qo);
    }), Xo = !1, void (Qo = "");
    if (function(a, u, l, c) {
      return oc(a) && !u && !c && !l;
    }(r, i, o, s)) j(e, Qd, t);
    else if (function(a, u, l, c, d) {
      return oc(a) && !c && !l && (u || d);
    }(r, i, n, o, s)) j(e, xm, t);
    else if (function(a, u, l, c) {
      return sc(a) && !u && !c && !l;
    }(r, i, o, s)) j(e, Zd, t);
    else if (function(a, u, l, c, d) {
      return sc(a) && !c && !l && (u || d);
    }(r, i, n, o, s)) j(e, Cm, t);
    else if (/* @__PURE__ */ function(a, u, l) {
      return /* @__PURE__ */ function(c) {
        return c === "ArrowUp";
      }(a) && !u && !l;
    }(r, i, s)) j(e, fu, t);
    else if (/* @__PURE__ */ function(a, u, l) {
      return /* @__PURE__ */ function(c) {
        return c === "ArrowDown";
      }(a) && !u && !l;
    }(r, i, s)) j(e, hu, t);
    else if (function(a, u) {
      return ac(a) && u;
    }(r, n)) yi = !0, j(e, Oi, t);
    else if (/* @__PURE__ */ function(a) {
      return a === " ";
    }(r)) j(e, ef, t);
    else if (function(a, u) {
      return ct && u && a.toLowerCase() === "o";
    }(r, i)) t.preventDefault(), yi = !0, j(e, yn, !0);
    else if (function(a, u) {
      return ac(a) && !u;
    }(r, n)) yi = !1, j(e, Oi, t);
    else if (function(a, u, l, c) {
      return ct ? !u && !l && (on(a) || a.toLowerCase() === "h" && c) : c || u || l ? !1 : on(a);
    }(r, o, s, i)) on(r) ? j(e, tf, t) : (t.preventDefault(), j(e, wr, !0));
    else if (/* @__PURE__ */ function(a) {
      return a === "Escape";
    }(r)) j(e, pu, t);
    else if (function(a, u, l, c, d) {
      return ct ? !(l || c || d) && (ii(a) || a.toLowerCase() === "d" && u) : u || c || d ? !1 : ii(a);
    }(r, i, n, o, s)) ii(r) ? j(e, rf, t) : (t.preventDefault(), j(e, wr, !1));
    else if (function(a, u, l) {
      return on(a) && (ct ? u : l);
    }(r, o, i)) t.preventDefault(), j(e, Ni, !0);
    else if (function(a, u, l) {
      return ii(a) && (ct ? u : l);
    }(r, o, i)) t.preventDefault(), j(e, Ni, !1);
    else if (function(a, u) {
      return ct && u && on(a);
    }(r, s)) t.preventDefault(), j(e, Mi, !0);
    else if (function(a, u) {
      return ct && u && ii(a);
    }(r, s)) t.preventDefault(), j(e, Mi, !1);
    else if (function(a, u, l, c) {
      return a.toLowerCase() === "b" && !u && fi(l, c);
    }(r, o, s, i)) t.preventDefault(), j(e, rr, "bold");
    else if (function(a, u, l, c) {
      return a.toLowerCase() === "u" && !u && fi(l, c);
    }(r, o, s, i)) t.preventDefault(), j(e, rr, "underline");
    else if (function(a, u, l, c) {
      return a.toLowerCase() === "i" && !u && fi(l, c);
    }(r, o, s, i)) t.preventDefault(), j(e, rr, "italic");
    else if (/* @__PURE__ */ function(a, u, l, c) {
      return a === "Tab" && !u && !l && !c;
    }(r, o, i, s)) j(e, gu, t);
    else if (function(a, u, l, c) {
      return a.toLowerCase() === "z" && !u && fi(l, c);
    }(r, n, s, i)) t.preventDefault(), j(e, Yi, void 0);
    else if (function(a, u, l, c) {
      return ct ? a.toLowerCase() === "z" && l && u : a.toLowerCase() === "y" && c || a.toLowerCase() === "z" && c && u;
    }(r, n, s, i)) t.preventDefault(), j(e, Xi, void 0);
    else {
      const a = e._editorState._selection;
      a === null || R(a) ? !sr && uc(r, s, i) && (t.preventDefault(), j(e, ka, t)) : function(u, l, c, d) {
        return l ? !1 : u.toLowerCase() === "c" ? ct ? c : d : !1;
      }(r, n, s, i) ? (t.preventDefault(), j(e, Wr, t)) : function(u, l, c, d) {
        return l ? !1 : u.toLowerCase() === "x" ? ct ? c : d : !1;
      }(r, n, s, i) ? (t.preventDefault(), j(e, jn, t)) : uc(r, s, i) && (t.preventDefault(), j(e, ka, t));
    }
    /* @__PURE__ */ (function(a, u, l, c) {
      return a || u || l || c;
    })(i, n, o, s) && j(e, Mm, t);
  }
}], ["pointerdown", function(t, e) {
  const r = t.target, n = t.pointerType;
  Kr(r) && n !== "touch" && t.button === 0 && it(e, () => {
    le(Dn(r)) || (Na = !0);
  });
}], ["compositionstart", function(t, e) {
  it(e, () => {
    const r = B();
    if (R(r) && !e.isComposing()) {
      const n = r.anchor, i = r.anchor.getNode();
      Pe(n.key), (t.timeStamp < mi + Aa || n.type === "element" || !r.isCollapsed() || i.getFormat() !== r.format || F(i) && i.getStyle() !== r.style) && j(e, _n, nm);
    }
  });
}], ["compositionend", function(t, e) {
  sr ? ni = !0 : kn || !Ai && !$s ? it(e, () => {
    ms(e, t.data);
  }) : (Xo = !0, Qo = t.data);
}], ["input", function(t, e) {
  t.stopPropagation(), it(e, () => {
    const r = B(), n = t.data, i = ff(t);
    if (n != null && R(r) && cf(r, i, n, t.timeStamp, !1)) {
      ni && (ms(e, n), ni = !1);
      const s = r.anchor.getNode(), o = gt(at(e));
      if (o === null) return;
      const a = r.isBackward(), u = a ? r.anchor.offset : r.focus.offset, l = a ? r.focus.offset : r.anchor.offset;
      js && !r.isCollapsed() && F(s) && o.anchorNode !== null && s.getTextContent().slice(0, u) + n + s.getTextContent().slice(u + l) === Ff(o.anchorNode) || j(e, _n, n);
      const c = n.length;
      sr && c > 1 && t.inputType === "insertCompositionText" && !e.isComposing() && (r.anchor.offset -= c), Ai || kn || $s || !e.isComposing() || (mi = 0, Pe(null));
    } else
      Au(!1, e, n !== null ? n : void 0), ni && (ms(e, n || void 0), ni = !1);
    (function() {
      Fe();
      const s = ye();
      $d(s);
    })();
  }, { event: t }), fn = null;
}], ["click", function(t, e) {
  it(e, () => {
    const r = B(), n = gt(at(e)), i = es();
    if (n) {
      if (R(r)) {
        const s = r.anchor, o = s.getNode();
        if (s.type === "element" && s.offset === 0 && r.isCollapsed() && !qe(o) && pe().getChildrenSize() === 1 && o.getTopLevelElementOrThrow().isEmpty() && i !== null && r.is(i)) n.removeAllRanges(), r.dirty = !0;
        else if (t.detail === 3 && !r.isCollapsed() && o !== r.focus.getNode()) {
          const a = function(u, l) {
            let c = u;
            for (; c !== pe() && c != null; ) {
              if (l(c)) return c;
              c = c.getParent();
            }
            return null;
          }(o, (u) => S(u) && !u.isInline());
          S(a) && a.select(0);
        }
      } else if (t.pointerType === "touch") {
        const s = n.anchorNode;
        (Ae(s) || Xt(s)) && et(yu(i, n, e, t));
      }
    }
    j(e, Xd, t);
  });
}], ["cut", jt], ["copy", jt], ["dragstart", jt], ["dragover", jt], ["dragend", jt], ["paste", jt], ["focus", jt], ["blur", jt], ["drop", jt]];
js && wa.push(["beforeinput", (t, e) => function(r, n) {
  const i = r.inputType, s = ff(r);
  i === "deleteCompositionText" || sr && qf(n) || i !== "insertCompositionText" && it(n, () => {
    const o = B();
    if (i === "deleteContentBackward") {
      if (o === null) {
        const g = es();
        if (!R(g)) return;
        et(g.clone());
      }
      if (R(o)) {
        const g = o.anchor.key === o.focus.key;
        if (a = r.timeStamp, Da === "MediaLast" && a < mi + Aa && n.isComposing() && g) {
          if (Pe(null), mi = 0, setTimeout(() => {
            it(n, () => {
              Pe(null);
            });
          }, Aa), R(o)) {
            const h = o.anchor.getNode();
            h.markDirty(), F(h) || O(142), df(o, h);
          }
        } else {
          Pe(null), r.preventDefault();
          const h = o.anchor.getNode(), p = h.getTextContent(), m = h.canInsertTextAfter(), _ = o.anchor.offset === 0 && o.focus.offset === p.length;
          let y = Al && g && !_ && m;
          if (y && o.isCollapsed() && (y = !le(Pa(o.anchor, !0))), !y) {
            j(n, wr, !0);
            const v = B();
            Al && R(v) && v.isCollapsed() && (Tr = v, setTimeout(() => Tr = null));
          }
        }
        return;
      }
    }
    var a;
    if (!R(o)) return;
    const u = r.data;
    fn !== null && Au(!1, n, fn), o.dirty && fn === null || !o.isCollapsed() || qe(o.anchor.getNode()) || s === null || o.applyDOMRange(s), fn = null;
    const l = o.anchor, c = o.focus, d = l.getNode(), f = c.getNode();
    if (i !== "insertText" && i !== "insertTranspose") switch (r.preventDefault(), i) {
      case "insertFromYank":
      case "insertFromDrop":
      case "insertReplacementText":
        j(n, _n, r);
        break;
      case "insertFromComposition":
        Pe(null), j(n, _n, r);
        break;
      case "insertLineBreak":
        Pe(null), j(n, yn, !1);
        break;
      case "insertParagraph":
        Pe(null), yi && !kn ? (yi = !1, j(n, yn, !1)) : j(n, Gs, void 0);
        break;
      case "insertFromPaste":
      case "insertFromPasteAsQuotation":
        j(n, Gi, r);
        break;
      case "deleteByComposition":
        (function(g, h) {
          return g !== h || S(g) || S(h) || !g.isToken() || !h.isToken();
        })(d, f) && j(n, Ta, r);
        break;
      case "deleteByDrag":
      case "deleteByCut":
        j(n, Ta, r);
        break;
      case "deleteContent":
        j(n, wr, !1);
        break;
      case "deleteWordBackward":
        j(n, Ni, !0);
        break;
      case "deleteWordForward":
        j(n, Ni, !1);
        break;
      case "deleteHardLineBackward":
      case "deleteSoftLineBackward":
        j(n, Mi, !0);
        break;
      case "deleteContentForward":
      case "deleteHardLineForward":
      case "deleteSoftLineForward":
        j(n, Mi, !1);
        break;
      case "formatStrikeThrough":
        j(n, rr, "strikethrough");
        break;
      case "formatBold":
        j(n, rr, "bold");
        break;
      case "formatItalic":
        j(n, rr, "italic");
        break;
      case "formatUnderline":
        j(n, rr, "underline");
        break;
      case "historyUndo":
        j(n, Yi, void 0);
        break;
      case "historyRedo":
        j(n, Xi, void 0);
    }
    else {
      if (u === `
`) r.preventDefault(), j(n, yn, !1);
      else if (u === Kt) r.preventDefault(), j(n, Gs, void 0);
      else if (u == null && r.dataTransfer) {
        const g = r.dataTransfer.getData("text/plain");
        r.preventDefault(), o.insertRawText(g);
      } else u != null && cf(o, s, u, r.timeStamp, !0) ? (r.preventDefault(), j(n, _n, u)) : fn = u;
      uf = r.timeStamp;
    }
  });
}(t, e)]);
let mi = 0, Da = null, uf = 0, fn = null;
const Ys = /* @__PURE__ */ new WeakMap();
let Sa = !1, Na = !1, yi = !1, ni = !1, Xo = !1, Qo = "", Tr = null, lf = [0, "", 0, "root", 0];
function cf(t, e, r, n, i) {
  const s = t.anchor, o = t.focus, a = s.getNode(), u = ye(), l = gt(at(u)), c = l !== null ? l.anchorNode : null, d = s.key, f = u.getElementByKey(d), g = r.length;
  return d !== o.key || !F(a) || (!i && (!js || uf < n + 50) || a.isDirty() && g < 2 || Pf(r)) && s.offset !== o.offset && !a.isComposing() || hn(a) || a.isDirty() && g > 1 || (i || !js) && f !== null && !a.isComposing() && c !== wn(f) || l !== null && e !== null && (!e.collapsed || e.startContainer !== l.anchorNode || e.startOffset !== l.anchorOffset) || a.getFormat() !== t.format || a.getStyle() !== t.style || function(h, p) {
    if (p.isSegmented()) return !0;
    if (!h.isCollapsed()) return !1;
    const m = h.anchor.offset, _ = p.getParentOrThrow(), y = p.isToken();
    return m === 0 ? !p.canInsertTextBefore() || !_.canInsertTextBefore() && !p.isComposing() || y || function(v) {
      const C = v.getPreviousSibling();
      return (F(C) || S(C) && C.isInline()) && !C.canInsertTextAfter();
    }(p) : m === p.getTextContentSize() && (!p.canInsertTextAfter() || !_.canInsertTextAfter() && !p.isComposing() || y);
  }(t, a);
}
function Rl(t, e) {
  return Xt(t) && t.nodeValue !== null && e !== 0 && e !== t.nodeValue.length;
}
function Pl(t, e, r) {
  const { anchorNode: n, anchorOffset: i, focusNode: s, focusOffset: o } = t;
  Sa && (Sa = !1, Rl(n, i) && Rl(s, o) && !Tr) || it(e, () => {
    if (!r) return void et(null);
    if (!ns(e, n, s)) return;
    let a = B();
    if (Tr && R(a) && a.isCollapsed()) {
      const u = a.anchor, l = Tr.anchor;
      (u.key === l.key && u.offset === l.offset + 1 || u.offset === 1 && l.getNode().is(u.getNode().getPreviousSibling())) && (a = Tr.clone(), et(a));
    }
    if (Tr = null, R(a)) {
      const u = a.anchor, l = u.getNode();
      if (a.isCollapsed()) {
        t.type === "Range" && t.anchorNode === t.focusNode && (a.dirty = !0);
        const c = at(e).event, d = c ? c.timeStamp : performance.now(), [f, g, h, p, m] = lf, _ = pe(), y = e.isComposing() === !1 && _.getTextContent() === "";
        if (d < m + 200 && u.offset === h && u.key === p) Rs(a, f, g);
        else if (u.type === "text") F(l) || O(141), df(a, l);
        else if (u.type === "element" && !y) {
          S(l) || O(259);
          const v = u.getNode();
          v.isEmpty() ? function(C, T) {
            const k = T.getTextFormat(), N = T.getTextStyle();
            Rs(C, k, N);
          }(a, v) : Rs(a, 0, "");
        }
      } else {
        const c = u.key, d = a.focus.key, f = a.getNodes(), g = f.length, h = a.isBackward(), p = h ? o : i, m = h ? i : o, _ = h ? d : c, y = h ? c : d;
        let v = rm, C = !1;
        for (let T = 0; T < g; T++) {
          const k = f[T], N = k.getTextContentSize();
          if (F(k) && N !== 0 && !(T === 0 && k.__key === _ && p === N || T === g - 1 && k.__key === y && m === 0) && (C = !0, v &= k.getFormat(), v === 0)) break;
        }
        a.format = C ? v : 0;
      }
    }
    j(e, po, void 0);
  });
}
function Rs(t, e, r) {
  t.format === e && t.style === r || (t.format = e, t.style = r, t.dirty = !0);
}
function df(t, e) {
  Rs(t, e.getFormat(), e.getStyle());
}
function ff(t) {
  if (!t.getTargetRanges) return null;
  const e = t.getTargetRanges();
  return e.length === 0 ? null : e[0];
}
function ms(t, e) {
  const r = t._compositionKey;
  if (Pe(null), r !== null && e != null) {
    if (e === "") {
      const n = ge(r), i = wn(t.getElementByKey(r));
      return void (i !== null && i.nodeValue !== null && F(n) && wu(n, i.nodeValue, null, null, !0));
    }
    if (e[e.length - 1] === `
`) {
      const n = B();
      if (R(n)) {
        const i = n.focus;
        return n.anchor.set(i.key, i.offset, i.type), void j(t, Oi, null);
      }
    }
  }
  Au(!0, t, e);
}
function hf(t) {
  let e = t.__lexicalEventHandles;
  return e === void 0 && (e = [], t.__lexicalEventHandles = e), e;
}
const vn = /* @__PURE__ */ new Map();
function pf(t) {
  const e = s2(t.target);
  if (e === null) return;
  const r = Mf(e.anchorNode);
  if (r === null) return;
  Na && (Na = !1, it(r, () => {
    const u = es(), l = e.anchorNode;
    (Ae(l) || Xt(l)) && et(yu(u, e, r, t));
  }));
  const n = ku(r), i = n[n.length - 1], s = i._key, o = vn.get(s), a = o || i;
  a !== r && Pl(e, a, !1), Pl(e, r, !0), r !== i ? vn.set(s, r) : o && vn.delete(s);
}
function Ll(t) {
  t._lexicalHandled = !0;
}
function Fl(t) {
  return t._lexicalHandled === !0;
}
function Om(t) {
  const e = t.ownerDocument, r = Ys.get(e);
  r === void 0 && O(162);
  const n = r - 1;
  n >= 0 || O(164), Ys.set(e, n), n === 0 && e.removeEventListener("selectionchange", pf);
  const i = Eo(t);
  Tu(i) ? (function(o) {
    if (o._parentEditor !== null) {
      const a = ku(o), u = a[a.length - 1]._key;
      vn.get(u) === o && vn.delete(u);
    } else vn.delete(o._key);
  }(i), t.__lexicalEditor = null) : i && O(198);
  const s = hf(t);
  for (let o = 0; o < s.length; o++) s[o]();
  t.__lexicalEventHandles = [];
}
function Ma(t, e, r) {
  Fe();
  const n = t.__key, i = t.getParent();
  if (i === null) return;
  const s = function(a) {
    const u = B();
    if (!R(u) || !S(a)) return u;
    const { anchor: l, focus: c } = u, d = l.getNode(), f = c.getNode();
    return La(d, a) && l.set(a.__key, 0, "element"), La(f, a) && c.set(a.__key, 0, "element"), u;
  }(t);
  let o = !1;
  if (R(s) && e) {
    const a = s.anchor, u = s.focus;
    a.key === n && (Qs(a, t, i, t.getPreviousSibling(), t.getNextSibling()), o = !0), u.key === n && (Qs(u, t, i, t.getPreviousSibling(), t.getNextSibling()), o = !0);
  } else wt(s) && e && t.isSelected() && t.selectPrevious();
  if (R(s) && e && !o) {
    const a = t.getIndexWithinParent();
    Dr(t), Xs(s, i, a, -1);
  } else Dr(t);
  r || Qt(i) || i.canBeEmpty() || !i.isEmpty() || Ma(i, e), e && qe(i) && i.isEmpty() && i.selectEnd();
}
class mo {
  static getType() {
    O(64, this.name);
  }
  static clone(e) {
    O(65, this.name);
  }
  afterCloneFrom(e) {
    this.__parent = e.__parent, this.__next = e.__next, this.__prev = e.__prev, this.__state = e.__state;
  }
  constructor(e) {
    this.__type = this.constructor.getType(), this.__parent = null, this.__prev = null, this.__next = null, Object.defineProperty(this, "__state", { configurable: !0, enumerable: !1, value: void 0, writable: !0 }), Qm(this, e);
  }
  getType() {
    return this.__type;
  }
  isInline() {
    O(137, this.constructor.name);
  }
  isAttached() {
    let e = this.__key;
    for (; e !== null; ) {
      if (e === "root") return !0;
      const r = ge(e);
      if (r === null) break;
      e = r.__parent;
    }
    return !1;
  }
  isSelected(e) {
    const r = e || B();
    if (r == null) return !1;
    const n = r.getNodes().some((i) => i.__key === this.__key);
    if (F(this)) return n;
    if (R(r) && r.anchor.type === "element" && r.focus.type === "element") {
      if (r.isCollapsed()) return !1;
      const i = this.getParent();
      if (le(this) && this.isInline() && i) {
        const s = r.isBackward() ? r.focus : r.anchor;
        if (i.is(s.getNode()) && s.offset === i.getChildrenSize() && this.is(i.getLastChild())) return !1;
      }
    }
    return n;
  }
  getKey() {
    return this.__key;
  }
  getIndexWithinParent() {
    const e = this.getParent();
    if (e === null) return -1;
    let r = e.getFirstChild(), n = 0;
    for (; r !== null; ) {
      if (this.is(r)) return n;
      n++, r = r.getNextSibling();
    }
    return -1;
  }
  getParent() {
    const e = this.getLatest().__parent;
    return e === null ? null : ge(e);
  }
  getParentOrThrow() {
    const e = this.getParent();
    return e === null && O(66, this.__key), e;
  }
  getTopLevelElement() {
    let e = this;
    for (; e !== null; ) {
      const r = e.getParent();
      if (Qt(r)) return S(e) || e === this && le(e) || O(194), e;
      e = r;
    }
    return null;
  }
  getTopLevelElementOrThrow() {
    const e = this.getTopLevelElement();
    return e === null && O(67, this.__key), e;
  }
  getParents() {
    const e = [];
    let r = this.getParent();
    for (; r !== null; ) e.push(r), r = r.getParent();
    return e;
  }
  getParentKeys() {
    const e = [];
    let r = this.getParent();
    for (; r !== null; ) e.push(r.__key), r = r.getParent();
    return e;
  }
  getPreviousSibling() {
    const e = this.getLatest().__prev;
    return e === null ? null : ge(e);
  }
  getPreviousSiblings() {
    const e = [], r = this.getParent();
    if (r === null) return e;
    let n = r.getFirstChild();
    for (; n !== null && !n.is(this); ) e.push(n), n = n.getNextSibling();
    return e;
  }
  getNextSibling() {
    const e = this.getLatest().__next;
    return e === null ? null : ge(e);
  }
  getNextSiblings() {
    const e = [];
    let r = this.getNextSibling();
    for (; r !== null; ) e.push(r), r = r.getNextSibling();
    return e;
  }
  getCommonAncestor(e) {
    const r = S(this) ? this : this.getParent(), n = S(e) ? e : e.getParent(), i = r && n ? Ei(r, n) : null;
    return i ? i.commonAncestor : null;
  }
  is(e) {
    return e != null && this.__key === e.__key;
  }
  isBefore(e) {
    const r = Ei(this, e);
    return r !== null && (r.type === "descendant" || (r.type === "branch" ? Uf(r) === -1 : (r.type !== "same" && r.type !== "ancestor" && O(279), !1)));
  }
  isParentOf(e) {
    const r = Ei(this, e);
    return r !== null && r.type === "ancestor";
  }
  getNodesBetween(e) {
    const r = this.isBefore(e), n = [], i = /* @__PURE__ */ new Set();
    let s = this;
    for (; s !== null; ) {
      const o = s.__key;
      if (i.has(o) || (i.add(o), n.push(s)), s === e) break;
      const a = S(s) ? r ? s.getFirstChild() : s.getLastChild() : null;
      if (a !== null) {
        s = a;
        continue;
      }
      const u = r ? s.getNextSibling() : s.getPreviousSibling();
      if (u !== null) {
        s = u;
        continue;
      }
      const l = s.getParentOrThrow();
      if (i.has(l.__key) || n.push(l), l === e) break;
      let c = null, d = l;
      do {
        if (d === null && O(68), c = r ? d.getNextSibling() : d.getPreviousSibling(), d = d.getParent(), d === null) break;
        c !== null || i.has(d.__key) || n.push(d);
      } while (c === null);
      s = c;
    }
    return r || n.reverse(), n;
  }
  isDirty() {
    const e = ye()._dirtyLeaves;
    return e !== null && e.has(this.__key);
  }
  getLatest() {
    const e = ge(this.__key);
    return e === null && O(113), e;
  }
  getWritable() {
    Fe();
    const e = hr(), r = ye(), n = e._nodeMap, i = this.__key, s = this.getLatest(), o = r._cloneNotNeeded, a = B();
    if (a !== null && a.setCachedNodes(null), o.has(i)) return eo(s), s;
    const u = Nu(s);
    return o.add(i), eo(u), n.set(i, u), u;
  }
  getTextContent() {
    return "";
  }
  getTextContentSize() {
    return this.getTextContent().length;
  }
  createDOM(e, r) {
    O(70);
  }
  updateDOM(e, r, n) {
    O(71);
  }
  exportDOM(e) {
    return { element: this.createDOM(e._config, e) };
  }
  exportJSON() {
    const e = this.__state ? this.__state.toJSON() : void 0;
    return { type: this.__type, version: 1, ...e };
  }
  static importJSON(e) {
    O(18, this.name);
  }
  updateFromJSON(e) {
    return function(r, n) {
      const i = r.getWritable();
      return (n || i.__state) && ym(r).updateFromJSON(n), i;
    }(this, e.$);
  }
  static transform() {
    return null;
  }
  remove(e) {
    Ma(this, !0, e);
  }
  replace(e, r) {
    Fe();
    let n = B();
    n !== null && (n = n.clone()), ia(this, e);
    const i = this.getLatest(), s = this.__key, o = e.__key, a = e.getWritable(), u = this.getParentOrThrow().getWritable(), l = u.__size;
    Dr(a);
    const c = i.getPreviousSibling(), d = i.getNextSibling(), f = i.__prev, g = i.__next, h = i.__parent;
    if (Ma(i, !1, !0), c === null ? u.__first = o : c.getWritable().__next = o, a.__prev = f, d === null ? u.__last = o : d.getWritable().__prev = o, a.__next = g, a.__parent = h, u.__size = l, r && (S(this) && S(a) || O(139), this.getChildren().forEach((p) => {
      a.append(p);
    })), R(n)) {
      et(n);
      const p = n.anchor, m = n.focus;
      p.key === s && $l(p, a), m.key === s && $l(m, a);
    }
    return nr() === s && Pe(o), a;
  }
  insertAfter(e, r = !0) {
    Fe(), ia(this, e);
    const n = this.getWritable(), i = e.getWritable(), s = i.getParent(), o = B();
    let a = !1, u = !1;
    if (s !== null) {
      const g = e.getIndexWithinParent();
      if (Dr(i), R(o)) {
        const h = s.__key, p = o.anchor, m = o.focus;
        a = p.type === "element" && p.key === h && p.offset === g + 1, u = m.type === "element" && m.key === h && m.offset === g + 1;
      }
    }
    const l = this.getNextSibling(), c = this.getParentOrThrow().getWritable(), d = i.__key, f = n.__next;
    if (l === null ? c.__last = d : l.getWritable().__prev = d, c.__size++, n.__next = d, i.__next = f, i.__prev = n.__key, i.__parent = n.__parent, r && R(o)) {
      const g = this.getIndexWithinParent();
      Xs(o, c, g + 1);
      const h = c.__key;
      a && o.anchor.set(h, g + 2, "element"), u && o.focus.set(h, g + 2, "element");
    }
    return e;
  }
  insertBefore(e, r = !0) {
    Fe(), ia(this, e);
    const n = this.getWritable(), i = e.getWritable(), s = i.__key;
    Dr(i);
    const o = this.getPreviousSibling(), a = this.getParentOrThrow().getWritable(), u = n.__prev, l = this.getIndexWithinParent();
    o === null ? a.__first = s : o.getWritable().__next = s, a.__size++, n.__prev = s, i.__prev = u, i.__next = n.__key, i.__parent = n.__parent;
    const c = B();
    return r && R(c) && Xs(c, this.getParentOrThrow(), l), e;
  }
  isParentRequired() {
    return !1;
  }
  createParentElementNode() {
    return Mt();
  }
  selectStart() {
    return this.selectPrevious();
  }
  selectEnd() {
    return this.selectNext(0, 0);
  }
  selectPrevious(e, r) {
    Fe();
    const n = this.getPreviousSibling(), i = this.getParentOrThrow();
    if (n === null) return i.select(0, 0);
    if (S(n)) return n.select();
    if (!F(n)) {
      const s = n.getIndexWithinParent() + 1;
      return i.select(s, s);
    }
    return n.select(e, r);
  }
  selectNext(e, r) {
    Fe();
    const n = this.getNextSibling(), i = this.getParentOrThrow();
    if (n === null) return i.select();
    if (S(n)) return n.select(0, 0);
    if (!F(n)) {
      const s = n.getIndexWithinParent();
      return i.select(s, s);
    }
    return n.select(e, r);
  }
  markDirty() {
    this.getWritable();
  }
  reconcileObservedMutation(e, r) {
    this.markDirty();
  }
}
class Hr extends mo {
  static getType() {
    return "linebreak";
  }
  static clone(e) {
    return new Hr(e.__key);
  }
  constructor(e) {
    super(e);
  }
  getTextContent() {
    return `
`;
  }
  createDOM() {
    return document.createElement("br");
  }
  updateDOM() {
    return !1;
  }
  isInline() {
    return !0;
  }
  static importDOM() {
    return { br: (e) => function(r) {
      const n = r.parentElement;
      if (n !== null && to(n)) {
        const i = n.firstChild;
        if (i === r || i.nextSibling === r && ys(i)) {
          const s = n.lastChild;
          if (s === r || s.previousSibling === r && ys(s)) return !0;
        }
      }
      return !1;
    }(e) || function(r) {
      const n = r.parentElement;
      if (n !== null && to(n)) {
        const i = n.firstChild;
        if (i === r || i.nextSibling === r && ys(i)) return !1;
        const s = n.lastChild;
        if (s === r || s.previousSibling === r && ys(s)) return !0;
      }
      return !1;
    }(e) ? null : { conversion: Im, priority: 0 } };
  }
  static importJSON(e) {
    return Rr().updateFromJSON(e);
  }
}
function Im(t) {
  return { node: Rr() };
}
function Rr() {
  return ke(new Hr());
}
function _i(t) {
  return t instanceof Hr;
}
function ys(t) {
  return Xt(t) && /^( |\t|\r?\n)+$/.test(t.textContent || "");
}
function Zo(t, e) {
  return 16 & e ? "code" : e & iu ? "mark" : 32 & e ? "sub" : 64 & e ? "sup" : null;
}
function ea(t, e) {
  return 1 & e ? "strong" : 2 & e ? "em" : "span";
}
function gf(t, e, r, n, i) {
  const s = n.classList;
  let o = bn(i, "base");
  o !== void 0 && s.add(...o), o = bn(i, "underlineStrikethrough");
  let a = !1;
  const u = e & Ws && e & Vs;
  o !== void 0 && (r & Ws && r & Vs ? (a = !0, u || s.add(...o)) : u && s.remove(...o));
  for (const l in Ve) {
    const c = Ve[l];
    if (o = bn(i, l), o !== void 0) if (r & c) {
      if (a && (l === "underline" || l === "strikethrough")) {
        e & c && s.remove(...o);
        continue;
      }
      e & c && (!u || l !== "underline") && l !== "strikethrough" || s.add(...o);
    } else e & c && s.remove(...o);
  }
}
function mf(t, e, r) {
  const n = e.firstChild, i = r.isComposing(), s = t + (i ? fo : "");
  if (n == null) e.textContent = s;
  else {
    const o = n.nodeValue;
    if (o !== s) if (i || sr) {
      const [a, u, l] = function(c, d) {
        const f = c.length, g = d.length;
        let h = 0, p = 0;
        for (; h < f && h < g && c[h] === d[h]; ) h++;
        for (; p + h < f && p + h < g && c[f - p - 1] === d[g - p - 1]; ) p++;
        return [h, f - h - p, d.slice(h, g - p)];
      }(o, s);
      u !== 0 && n.deleteData(a, u), n.insertData(a, l);
    } else n.nodeValue = s;
  }
}
function ql(t, e, r, n, i, s) {
  mf(i, t, e);
  const o = s.theme.text;
  o !== void 0 && gf(0, 0, n, t, o);
}
function _s(t, e) {
  const r = document.createElement(e);
  return r.appendChild(t), r;
}
class xt extends mo {
  static getType() {
    return "text";
  }
  static clone(e) {
    return new xt(e.__text, e.__key);
  }
  afterCloneFrom(e) {
    super.afterCloneFrom(e), this.__text = e.__text, this.__format = e.__format, this.__style = e.__style, this.__mode = e.__mode, this.__detail = e.__detail;
  }
  constructor(e = "", r) {
    super(r), this.__text = e, this.__format = 0, this.__style = "", this.__mode = 0, this.__detail = 0;
  }
  getFormat() {
    return this.getLatest().__format;
  }
  getDetail() {
    return this.getLatest().__detail;
  }
  getMode() {
    const e = this.getLatest();
    return lm[e.__mode];
  }
  getStyle() {
    return this.getLatest().__style;
  }
  isToken() {
    return this.getLatest().__mode === 1;
  }
  isComposing() {
    return this.__key === nr();
  }
  isSegmented() {
    return this.getLatest().__mode === 2;
  }
  isDirectionless() {
    return !!(1 & this.getLatest().__detail);
  }
  isUnmergeable() {
    return !!(2 & this.getLatest().__detail);
  }
  hasFormat(e) {
    const r = Ve[e];
    return !!(this.getFormat() & r);
  }
  isSimpleText() {
    return this.__type === "text" && this.__mode === 0;
  }
  getTextContent() {
    return this.getLatest().__text;
  }
  getFormatFlags(e, r) {
    return Zs(this.getLatest().__format, e, r);
  }
  canHaveFormat() {
    return !0;
  }
  isInline() {
    return !0;
  }
  createDOM(e, r) {
    const n = this.__format, i = Zo(0, n), s = ea(0, n), o = i === null ? s : i, a = document.createElement(o);
    let u = a;
    this.hasFormat("code") && a.setAttribute("spellcheck", "false"), i !== null && (u = document.createElement(s), a.appendChild(u)), ql(u, this, 0, n, this.__text, e);
    const l = this.__style;
    return l !== "" && (a.style.cssText = l), a;
  }
  updateDOM(e, r, n) {
    const i = this.__text, s = e.__format, o = this.__format, a = Zo(0, s), u = Zo(0, o), l = ea(0, s), c = ea(0, o);
    if ((a === null ? l : a) !== (u === null ? c : u)) return !0;
    if (a === u && l !== c) {
      const p = r.firstChild;
      p == null && O(48);
      const m = document.createElement(c);
      return ql(m, this, 0, o, i, n), r.replaceChild(m, p), !1;
    }
    let d = r;
    u !== null && a !== null && (d = r.firstChild, d == null && O(49)), mf(i, d, this);
    const f = n.theme.text;
    f !== void 0 && s !== o && gf(0, s, o, d, f);
    const g = e.__style, h = this.__style;
    return g !== h && (r.style.cssText = h), !1;
  }
  static importDOM() {
    return { "#text": () => ({ conversion: Fm, priority: 0 }), b: () => ({ conversion: Pm, priority: 0 }), code: () => ({ conversion: $t, priority: 0 }), em: () => ({ conversion: $t, priority: 0 }), i: () => ({ conversion: $t, priority: 0 }), mark: () => ({ conversion: $t, priority: 0 }), s: () => ({ conversion: $t, priority: 0 }), span: () => ({ conversion: Rm, priority: 0 }), strong: () => ({ conversion: $t, priority: 0 }), sub: () => ({ conversion: $t, priority: 0 }), sup: () => ({ conversion: $t, priority: 0 }), u: () => ({ conversion: $t, priority: 0 }) };
  }
  static importJSON(e) {
    return Re().updateFromJSON(e);
  }
  updateFromJSON(e) {
    return super.updateFromJSON(e).setTextContent(e.text).setFormat(e.format).setDetail(e.detail).setMode(e.mode).setStyle(e.style);
  }
  exportDOM(e) {
    let { element: r } = super.exportDOM(e);
    return Ae(r) || O(132), r.style.whiteSpace = "pre-wrap", this.hasFormat("bold") && (r = _s(r, "b")), this.hasFormat("italic") && (r = _s(r, "i")), this.hasFormat("strikethrough") && (r = _s(r, "s")), this.hasFormat("underline") && (r = _s(r, "u")), { element: r };
  }
  exportJSON() {
    return { detail: this.getDetail(), format: this.getFormat(), mode: this.getMode(), style: this.getStyle(), text: this.getTextContent(), ...super.exportJSON() };
  }
  selectionTransform(e, r) {
  }
  setFormat(e) {
    const r = this.getWritable();
    return r.__format = typeof e == "string" ? Ve[e] : e, r;
  }
  setDetail(e) {
    const r = this.getWritable();
    return r.__detail = typeof e == "string" ? om[e] : e, r;
  }
  setStyle(e) {
    const r = this.getWritable();
    return r.__style = e, r;
  }
  toggleFormat(e) {
    const r = Zs(this.getFormat(), e, null);
    return this.setFormat(r);
  }
  toggleDirectionless() {
    const e = this.getWritable();
    return e.__detail ^= 1, e;
  }
  toggleUnmergeable() {
    const e = this.getWritable();
    return e.__detail ^= 2, e;
  }
  setMode(e) {
    const r = um[e];
    if (this.__mode === r) return this;
    const n = this.getWritable();
    return n.__mode = r, n;
  }
  setTextContent(e) {
    if (this.__text === e) return this;
    const r = this.getWritable();
    return r.__text = e, r;
  }
  select(e, r) {
    Fe();
    let n = e, i = r;
    const s = B(), o = this.getTextContent(), a = this.__key;
    if (typeof o == "string") {
      const u = o.length;
      n === void 0 && (n = u), i === void 0 && (i = u);
    } else n = 0, i = 0;
    if (!R(s)) return vf(a, n, a, i, "text", "text");
    {
      const u = nr();
      u !== s.anchor.key && u !== s.focus.key || Pe(a), s.setTextNodeRange(this, n, this, i);
    }
    return s;
  }
  selectStart() {
    return this.select(0, 0);
  }
  selectEnd() {
    const e = this.getTextContentSize();
    return this.select(e, e);
  }
  spliceText(e, r, n, i) {
    const s = this.getWritable(), o = s.__text, a = n.length;
    let u = e;
    u < 0 && (u = a + u, u < 0 && (u = 0));
    const l = B();
    if (i && R(l)) {
      const d = e + a;
      l.setTextNodeRange(s, d, s, d);
    }
    const c = o.slice(0, u) + n + o.slice(u + r);
    return s.__text = c, s;
  }
  canInsertTextBefore() {
    return !0;
  }
  canInsertTextAfter() {
    return !0;
  }
  splitText(...e) {
    Fe();
    const r = this.getLatest(), n = r.getTextContent();
    if (n === "") return [];
    const i = r.__key, s = nr(), o = n.length;
    e.sort((A, D) => A - D), e.push(o);
    const a = [], u = e.length;
    for (let A = 0, D = 0; A < o && D <= u; D++) {
      const L = e[D];
      L > A && (a.push(n.slice(A, L)), A = L);
    }
    const l = a.length;
    if (l === 1) return [r];
    const c = a[0], d = r.getParent();
    let f;
    const g = r.getFormat(), h = r.getStyle(), p = r.__detail;
    let m = !1, _ = null, y = null;
    const v = B();
    if (R(v)) {
      const [A, D] = v.isBackward() ? [v.focus, v.anchor] : [v.anchor, v.focus];
      A.type === "text" && A.key === i && (_ = A), D.type === "text" && D.key === i && (y = D);
    }
    r.isSegmented() ? (f = Re(c), f.__format = g, f.__style = h, f.__detail = p, m = !0) : (f = r.getWritable(), f.__text = c);
    const C = [f];
    for (let A = 1; A < l; A++) {
      const D = Re(a[A]);
      D.__format = g, D.__style = h, D.__detail = p;
      const L = D.__key;
      s === i && Pe(L), C.push(D);
    }
    const T = _ ? _.offset : null, k = y ? y.offset : null;
    let N = 0;
    for (const A of C) {
      if (!_ && !y) break;
      const D = N + A.getTextContentSize();
      if (_ !== null && T !== null && T <= D && T >= N && (_.set(A.getKey(), T - N, "text"), T < D && (_ = null)), y !== null && k !== null && k <= D && k >= N) {
        y.set(A.getKey(), k - N, "text");
        break;
      }
      N = D;
    }
    if (d !== null) {
      (function(L) {
        const W = L.getPreviousSibling(), U = L.getNextSibling();
        W !== null && eo(W), U !== null && eo(U);
      })(this);
      const A = d.getWritable(), D = this.getIndexWithinParent();
      m ? (A.splice(D, 0, C), this.remove()) : A.splice(D, 1, C), R(v) && Xs(v, d, D, l - 1);
    }
    return C;
  }
  mergeWithSibling(e) {
    const r = e === this.getPreviousSibling();
    r || e === this.getNextSibling() || O(50);
    const n = this.__key, i = e.__key, s = this.__text, o = s.length;
    nr() === i && Pe(n);
    const a = B();
    if (R(a)) {
      const d = a.anchor, f = a.focus;
      d !== null && d.key === i && Jl(d, r, n, e, o), f !== null && f.key === i && Jl(f, r, n, e, o);
    }
    const u = e.__text, l = r ? u + s : s + u;
    this.setTextContent(l);
    const c = this.getWritable();
    return e.remove(), c;
  }
  isTextEntity() {
    return !1;
  }
}
function Rm(t) {
  return { forChild: mu(t.style), node: null };
}
function Pm(t) {
  const e = t, r = e.style.fontWeight === "normal";
  return { forChild: mu(e.style, r ? void 0 : "bold"), node: null };
}
const Bl = /* @__PURE__ */ new WeakMap();
function Lm(t) {
  if (!Ae(t)) return !1;
  if (t.nodeName === "PRE") return !0;
  const e = t.style.whiteSpace;
  return typeof e == "string" && e.startsWith("pre");
}
function Fm(t) {
  const e = t;
  t.parentElement === null && O(129);
  let r = e.textContent || "";
  if (function(n) {
    let i, s = n.parentNode;
    const o = [n];
    for (; s !== null && (i = Bl.get(s)) === void 0 && !Lm(s); ) o.push(s), s = s.parentNode;
    const a = i === void 0 ? s : i;
    for (let u = 0; u < o.length; u++) Bl.set(o[u], a);
    return a;
  }(e) !== null) {
    const n = r.split(/(\r?\n|\t)/), i = [], s = n.length;
    for (let o = 0; o < s; o++) {
      const a = n[o];
      a === `
` || a === `\r
` ? i.push(Rr()) : a === "	" ? i.push(Zi()) : a !== "" && i.push(Re(a));
    }
    return { node: i };
  }
  if (r = r.replace(/\r/g, "").replace(/[ \t\n]+/g, " "), r === "") return { node: null };
  if (r[0] === " ") {
    let n = e, i = !0;
    for (; n !== null && (n = jl(n, !1)) !== null; ) {
      const s = n.textContent || "";
      if (s.length > 0) {
        /[ \t\n]$/.test(s) && (r = r.slice(1)), i = !1;
        break;
      }
    }
    i && (r = r.slice(1));
  }
  if (r[r.length - 1] === " ") {
    let n = e, i = !0;
    for (; n !== null && (n = jl(n, !0)) !== null; )
      if ((n.textContent || "").replace(/^( |\t|\r?\n)+/, "").length > 0) {
        i = !1;
        break;
      }
    i && (r = r.slice(0, r.length - 1));
  }
  return r === "" ? { node: null } : { node: Re(r) };
}
function jl(t, e) {
  let r = t;
  for (; ; ) {
    let n;
    for (; (n = e ? r.nextSibling : r.previousSibling) === null; ) {
      const s = r.parentElement;
      if (s === null) return null;
      r = s;
    }
    if (r = n, Ae(r)) {
      const s = r.style.display;
      if (s === "" && !Ba(r) || s !== "" && !s.startsWith("inline")) return null;
    }
    let i = r;
    for (; (i = e ? r.firstChild : r.lastChild) !== null; ) r = i;
    if (Xt(r)) return r;
    if (r.nodeName === "BR") return null;
  }
}
const qm = { code: "code", em: "italic", i: "italic", mark: "highlight", s: "strikethrough", strong: "bold", sub: "subscript", sup: "superscript", u: "underline" };
function $t(t) {
  const e = qm[t.nodeName.toLowerCase()];
  return e === void 0 ? { node: null } : { forChild: mu(t.style, e), node: null };
}
function Re(t = "") {
  return ke(new xt(t));
}
function F(t) {
  return t instanceof xt;
}
function mu(t, e) {
  const r = t.fontWeight, n = t.textDecoration.split(" "), i = r === "700" || r === "bold", s = n.includes("line-through"), o = t.fontStyle === "italic", a = n.includes("underline"), u = t.verticalAlign;
  return (l) => (F(l) && (i && !l.hasFormat("bold") && l.toggleFormat("bold"), s && !l.hasFormat("strikethrough") && l.toggleFormat("strikethrough"), o && !l.hasFormat("italic") && l.toggleFormat("italic"), a && !l.hasFormat("underline") && l.toggleFormat("underline"), u !== "sub" || l.hasFormat("subscript") || l.toggleFormat("subscript"), u !== "super" || l.hasFormat("superscript") || l.toggleFormat("superscript"), e && !l.hasFormat(e) && l.toggleFormat(e)), l);
}
class Qi extends xt {
  static getType() {
    return "tab";
  }
  static clone(e) {
    return new Qi(e.__key);
  }
  constructor(e) {
    super("	", e), this.__detail = 2;
  }
  static importDOM() {
    return null;
  }
  createDOM(e) {
    const r = super.createDOM(e), n = bn(e.theme, "tab");
    return n !== void 0 && r.classList.add(...n), r;
  }
  static importJSON(e) {
    return Zi().updateFromJSON(e);
  }
  setTextContent(e) {
    return e !== "	" && e !== "" && O(126), super.setTextContent(e);
  }
  setDetail(e) {
    return e !== 2 && O(127), this;
  }
  setMode(e) {
    return e !== "normal" && O(128), this;
  }
  canInsertTextBefore() {
    return !1;
  }
  canInsertTextAfter() {
    return !1;
  }
}
function Zi() {
  return ke(new Qi());
}
function Bm(t) {
  return t instanceof Qi;
}
class jm {
  constructor(e, r, n) {
    this._selection = null, this.key = e, this.offset = r, this.type = n;
  }
  is(e) {
    return this.key === e.key && this.offset === e.offset && this.type === e.type;
  }
  isBefore(e) {
    return this.key === e.key ? this.offset < e.offset : $f(St(ar(this, "next")), St(ar(e, "next"))) < 0;
  }
  getNode() {
    const e = ge(this.key);
    return e === null && O(20), e;
  }
  set(e, r, n, i) {
    const s = this._selection, o = this.key;
    i && this.key === e && this.offset === r && this.type === n || (this.key = e, this.offset = r, this.type = n, ts() || (nr() === o && Pe(e), s !== null && (s.setCachedNodes(null), s.dirty = !0)));
  }
}
function Rt(t, e, r) {
  return new jm(t, e, r);
}
function ta(t, e) {
  let r = e.__key, n = t.offset, i = "element";
  if (F(e)) {
    i = "text";
    const s = e.getTextContentSize();
    n > s && (n = s);
  } else if (!S(e)) {
    const s = e.getNextSibling();
    if (F(s)) r = s.__key, n = 0, i = "text";
    else {
      const o = e.getParent();
      o && (r = o.__key, n = e.getIndexWithinParent() + 1);
    }
  }
  t.set(r, n, i);
}
function $l(t, e) {
  if (S(e)) {
    const r = e.getLastDescendant();
    S(r) || F(r) ? ta(t, r) : ta(t, e);
  } else ta(t, e);
}
class yo {
  constructor(e) {
    this._cachedNodes = null, this._nodes = e, this.dirty = !1;
  }
  getCachedNodes() {
    return this._cachedNodes;
  }
  setCachedNodes(e) {
    this._cachedNodes = e;
  }
  is(e) {
    if (!wt(e)) return !1;
    const r = this._nodes, n = e._nodes;
    return r.size === n.size && Array.from(r).every((i) => n.has(i));
  }
  isCollapsed() {
    return !1;
  }
  isBackward() {
    return !1;
  }
  getStartEndPoints() {
    return null;
  }
  add(e) {
    this.dirty = !0, this._nodes.add(e), this._cachedNodes = null;
  }
  delete(e) {
    this.dirty = !0, this._nodes.delete(e), this._cachedNodes = null;
  }
  clear() {
    this.dirty = !0, this._nodes.clear(), this._cachedNodes = null;
  }
  has(e) {
    return this._nodes.has(e);
  }
  clone() {
    return new yo(new Set(this._nodes));
  }
  extract() {
    return this.getNodes();
  }
  insertRawText(e) {
  }
  insertText() {
  }
  insertNodes(e) {
    const r = this.getNodes(), n = r.length, i = r[n - 1];
    let s;
    if (F(i)) s = i.select();
    else {
      const o = i.getIndexWithinParent() + 1;
      s = i.getParentOrThrow().select(o, o);
    }
    s.insertNodes(e);
    for (let o = 0; o < n; o++) r[o].remove();
  }
  getNodes() {
    const e = this._cachedNodes;
    if (e !== null) return e;
    const r = this._nodes, n = [];
    for (const i of r) {
      const s = ge(i);
      s !== null && n.push(s);
    }
    return ts() || (this._cachedNodes = n), n;
  }
  getTextContent() {
    const e = this.getNodes();
    let r = "";
    for (let n = 0; n < e.length; n++) r += e[n].getTextContent();
    return r;
  }
}
function R(t) {
  return t instanceof zr;
}
class zr {
  constructor(e, r, n, i) {
    this.anchor = e, this.focus = r, e._selection = this, r._selection = this, this._cachedNodes = null, this.format = n, this.style = i, this.dirty = !1;
  }
  getCachedNodes() {
    return this._cachedNodes;
  }
  setCachedNodes(e) {
    this._cachedNodes = e;
  }
  is(e) {
    return !!R(e) && this.anchor.is(e.anchor) && this.focus.is(e.focus) && this.format === e.format && this.style === e.style;
  }
  isCollapsed() {
    return this.anchor.is(this.focus);
  }
  getNodes() {
    const e = this._cachedNodes;
    if (e !== null) return e;
    const r = function(n) {
      const i = [], [s, o] = n.getTextSlices();
      s && i.push(s.caret.origin);
      const a = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
      for (const l of n) if (pt(l)) {
        const { origin: c } = l;
        i.length === 0 ? a.add(c) : (u.add(c), i.push(c));
      } else {
        const { origin: c } = l;
        S(c) && u.has(c) || i.push(c);
      }
      if (o && i.push(o.caret.origin), Nn(n.focus) && S(n.focus.origin) && n.focus.getNodeAtCaret() === null) for (let l = Jt(n.focus.origin, "previous"); pt(l) && a.has(l.origin) && !l.origin.isEmpty() && l.origin.is(i[i.length - 1]); l = Mn(l)) a.delete(l.origin), i.pop();
      for (; i.length > 1; ) {
        const l = i[i.length - 1];
        if (!S(l) || u.has(l) || l.isEmpty() || a.has(l)) break;
        i.pop();
      }
      if (i.length === 0 && n.isCollapsed()) {
        const l = St(n.anchor), c = St(n.anchor.getFlipped()), d = (g) => Sr(g) ? g.origin : g.getNodeAtCaret(), f = d(l) || d(c) || (n.anchor.getNodeAtCaret() ? l.origin : c.origin);
        i.push(f);
      }
      return i;
    }(Wf(pc(this), "next"));
    return ts() || (this._cachedNodes = r), r;
  }
  setTextNodeRange(e, r, n, i) {
    this.anchor.set(e.__key, r, "text"), this.focus.set(n.__key, i, "text");
  }
  getTextContent() {
    const e = this.getNodes();
    if (e.length === 0) return "";
    const r = e[0], n = e[e.length - 1], i = this.anchor, s = this.focus, o = i.isBefore(s), [a, u] = Oa(this);
    let l = "", c = !0;
    for (let d = 0; d < e.length; d++) {
      const f = e[d];
      if (S(f) && !f.isInline()) c || (l += `
`), c = !f.isEmpty();
      else if (c = !1, F(f)) {
        let g = f.getTextContent();
        f === r ? f === n ? i.type === "element" && s.type === "element" && s.offset !== i.offset || (g = a < u ? g.slice(a, u) : g.slice(u, a)) : g = o ? g.slice(a) : g.slice(u) : f === n && (g = o ? g.slice(0, u) : g.slice(0, a)), l += g;
      } else !le(f) && !_i(f) || f === n && this.isCollapsed() || (l += f.getTextContent());
    }
    return l;
  }
  applyDOMRange(e) {
    const r = ye(), n = r.getEditorState()._selection, i = _f(e.startContainer, e.startOffset, e.endContainer, e.endOffset, r, n);
    if (i === null) return;
    const [s, o] = i;
    this.anchor.set(s.key, s.offset, s.type, !0), this.focus.set(o.key, o.offset, o.type, !0), Hs(this);
  }
  clone() {
    const e = this.anchor, r = this.focus;
    return new zr(Rt(e.key, e.offset, e.type), Rt(r.key, r.offset, r.type), this.format, this.style);
  }
  toggleFormat(e) {
    this.format = Zs(this.format, e, null), this.dirty = !0;
  }
  setStyle(e) {
    this.style = e, this.dirty = !0;
  }
  hasFormat(e) {
    const r = Ve[e];
    return !!(this.format & r);
  }
  insertRawText(e) {
    const r = e.split(/(\r?\n|\t)/), n = [], i = r.length;
    for (let s = 0; s < i; s++) {
      const o = r[s];
      o === `
` || o === `\r
` ? n.push(Rr()) : o === "	" ? n.push(Zi()) : n.push(Re(o));
    }
    this.insertNodes(n);
  }
  insertText(e) {
    const r = this.anchor, n = this.focus, i = this.format, s = this.style;
    let o = r, a = n;
    !this.isCollapsed() && n.isBefore(r) && (o = n, a = r), o.type === "element" && function(m, _, y, v) {
      const C = m.getNode(), T = C.getChildAtIndex(m.offset), k = Re(), N = qe(C) ? Mt().append(k) : k;
      k.setFormat(y), k.setStyle(v), T === null ? C.append(N) : T.insertBefore(N), m.is(_) && _.set(k.__key, 0, "text"), m.set(k.__key, 0, "text");
    }(o, a, i, s), a.type === "element" && Ri(a, St(ar(a, "next")));
    const u = o.offset;
    let l = a.offset;
    const c = this.getNodes(), d = c.length;
    let f = c[0];
    F(f) || O(26);
    const g = f.getTextContent().length, h = f.getParentOrThrow();
    let p = c[d - 1];
    if (d === 1 && a.type === "element" && (l = g, a.set(o.key, l, "text")), this.isCollapsed() && u === g && (f.isSegmented() || f.isToken() || !f.canInsertTextAfter() || !h.canInsertTextAfter() && f.getNextSibling() === null)) {
      let m = f.getNextSibling();
      if (F(m) && m.canInsertTextBefore() && !hn(m) || (m = Re(), m.setFormat(i), m.setStyle(s), h.canInsertTextAfter() ? f.insertAfter(m) : h.insertAfter(m)), m.select(0, 0), f = m, e !== "") return void this.insertText(e);
    } else if (this.isCollapsed() && u === 0 && (f.isSegmented() || f.isToken() || !f.canInsertTextBefore() || !h.canInsertTextBefore() && f.getPreviousSibling() === null)) {
      let m = f.getPreviousSibling();
      if (F(m) && !hn(m) || (m = Re(), m.setFormat(i), h.canInsertTextBefore() ? f.insertBefore(m) : h.insertBefore(m)), m.select(), f = m, e !== "") return void this.insertText(e);
    } else if (f.isSegmented() && u !== g) {
      const m = Re(f.getTextContent());
      m.setFormat(i), f.replace(m), f = m;
    } else if (!this.isCollapsed() && e !== "") {
      const m = p.getParent();
      if (!h.canInsertTextBefore() || !h.canInsertTextAfter() || S(m) && (!m.canInsertTextBefore() || !m.canInsertTextAfter())) return this.insertText(""), yf(this.anchor, this.focus, null), void this.insertText(e);
    }
    if (d === 1) {
      if (f.isToken()) {
        const v = Re(e);
        return v.select(), void f.replace(v);
      }
      const m = f.getFormat(), _ = f.getStyle();
      if (u !== l || m === i && _ === s) {
        if (Bm(f)) {
          const v = Re(e);
          return v.setFormat(i), v.setStyle(s), v.select(), void f.replace(v);
        }
      } else {
        if (f.getTextContent() !== "") {
          const v = Re(e);
          if (v.setFormat(i), v.setStyle(s), v.select(), u === 0) f.insertBefore(v, !1);
          else {
            const [C] = f.splitText(u);
            C.insertAfter(v, !1);
          }
          return void (v.isComposing() && this.anchor.type === "text" && (this.anchor.offset -= e.length));
        }
        f.setFormat(i), f.setStyle(s);
      }
      const y = l - u;
      f = f.spliceText(u, y, e, !0), f.getTextContent() === "" ? f.remove() : this.anchor.type === "text" && (f.isComposing() ? this.anchor.offset -= e.length : (this.format = m, this.style = _));
    } else {
      const m = /* @__PURE__ */ new Set([...f.getParentKeys(), ...p.getParentKeys()]), _ = S(f) ? f : f.getParentOrThrow();
      let y = S(p) ? p : p.getParentOrThrow(), v = p;
      if (!_.is(y) && y.isInline()) do
        v = y, y = y.getParentOrThrow();
      while (y.isInline());
      if (a.type === "text" && (l !== 0 || p.getTextContent() === "") || a.type === "element" && p.getIndexWithinParent() < l) if (F(p) && !p.isToken() && l !== p.getTextContentSize()) {
        if (p.isSegmented()) {
          const A = Re(p.getTextContent());
          p.replace(A), p = A;
        }
        qe(a.getNode()) || a.type !== "text" || (p = p.spliceText(0, l, "")), m.add(p.__key);
      } else {
        const A = p.getParentOrThrow();
        A.canBeEmpty() || A.getChildrenSize() !== 1 ? p.remove() : A.remove();
      }
      else m.add(p.__key);
      const C = y.getChildren(), T = new Set(c), k = _.is(y), N = _.isInline() && f.getNextSibling() === null ? _ : f;
      for (let A = C.length - 1; A >= 0; A--) {
        const D = C[A];
        if (D.is(f) || S(D) && D.isParentOf(f)) break;
        D.isAttached() && (!T.has(D) || D.is(v) ? k || N.insertAfter(D, !1) : D.remove());
      }
      if (!k) {
        let A = y, D = null;
        for (; A !== null; ) {
          const L = A.getChildren(), W = L.length;
          (W === 0 || L[W - 1].is(D)) && (m.delete(A.__key), D = A), A = A.getParent();
        }
      }
      if (f.isToken()) if (u === g) f.select();
      else {
        const A = Re(e);
        A.select(), f.replace(A);
      }
      else f = f.spliceText(u, g - u, e, !0), f.getTextContent() === "" ? f.remove() : f.isComposing() && this.anchor.type === "text" && (this.anchor.offset -= e.length);
      for (let A = 1; A < d; A++) {
        const D = c[A], L = D.__key;
        m.has(L) || D.remove();
      }
    }
  }
  removeText() {
    const e = B() === this;
    aa(this, m2(pc(this))), e && B() !== this && et(this);
  }
  formatText(e, r = null) {
    if (this.isCollapsed()) return this.toggleFormat(e), void Pe(null);
    const n = this.getNodes(), i = [];
    for (const C of n) F(C) && i.push(C);
    const s = (C) => {
      n.forEach((T) => {
        if (S(T)) {
          const k = T.getFormatFlags(e, C);
          T.setTextFormat(k);
        }
      });
    }, o = i.length;
    if (o === 0) return this.toggleFormat(e), Pe(null), void s(r);
    const a = this.anchor, u = this.focus, l = this.isBackward(), c = l ? u : a, d = l ? a : u;
    let f = 0, g = i[0], h = c.type === "element" ? 0 : c.offset;
    if (c.type === "text" && h === g.getTextContentSize() && (f = 1, g = i[1], h = 0), g == null) return;
    const p = g.getFormatFlags(e, r);
    s(p);
    const m = o - 1;
    let _ = i[m];
    const y = d.type === "text" ? d.offset : _.getTextContentSize();
    if (g.is(_)) {
      if (h === y) return;
      if (hn(g) || h === 0 && y === g.getTextContentSize()) g.setFormat(p);
      else {
        const C = g.splitText(h, y), T = h === 0 ? C[0] : C[1];
        T.setFormat(p), c.type === "text" && c.set(T.__key, 0, "text"), d.type === "text" && d.set(T.__key, y - h, "text");
      }
      return void (this.format = p);
    }
    h === 0 || hn(g) || ([, g] = g.splitText(h), h = 0), g.setFormat(p);
    const v = _.getFormatFlags(e, p);
    y > 0 && (y === _.getTextContentSize() || hn(_) || ([_] = _.splitText(y)), _.setFormat(v));
    for (let C = f + 1; C < m; C++) {
      const T = i[C], k = T.getFormatFlags(e, v);
      T.setFormat(k);
    }
    c.type === "text" && c.set(g.__key, h, "text"), d.type === "text" && d.set(_.__key, y, "text"), this.format = p | v;
  }
  insertNodes(e) {
    if (e.length === 0) return;
    if (this.isCollapsed() || this.removeText(), this.anchor.key === "root") {
      this.insertParagraph();
      const h = B();
      return R(h) || O(134), h.insertNodes(e);
    }
    const r = (this.isBackward() ? this.focus : this.anchor).getNode(), n = oa(r, tr), i = e[e.length - 1];
    if (S(n) && "__language" in n) {
      if ("__language" in e[0]) this.insertText(e[0].getTextContent());
      else {
        const h = ra(this);
        n.splice(h, 0, e), i.selectEnd();
      }
      return;
    }
    if (!e.some((h) => (S(h) || le(h)) && !h.isInline())) {
      S(n) || O(211, r.constructor.name, r.getType());
      const h = ra(this);
      return n.splice(h, 0, e), void i.selectEnd();
    }
    const s = function(h) {
      const p = Mt();
      let m = null;
      for (let _ = 0; _ < h.length; _++) {
        const y = h[_], v = _i(y);
        if (v || le(y) && y.isInline() || S(y) && y.isInline() || F(y) || y.isParentRequired()) {
          if (m === null && (m = y.createParentElementNode(), p.append(m), v)) continue;
          m !== null && m.append(y);
        } else p.append(y), m = null;
      }
      return p;
    }(e), o = s.getLastDescendant(), a = s.getChildren(), u = !S(n) || !n.isEmpty() ? this.insertParagraph() : null, l = a[a.length - 1];
    let c = a[0];
    var d;
    S(d = c) && tr(d) && !d.isEmpty() && S(n) && (!n.isEmpty() || n.canMergeWhenEmpty()) && (S(n) || O(211, r.constructor.name, r.getType()), n.append(...c.getChildren()), c = a[1]), c && (n === null && O(212, r.constructor.name, r.getType()), function(h, p, m) {
      const _ = p.getParentOrThrow().getLastChild();
      let y = p;
      const v = [p];
      for (; y !== _; ) y.getNextSibling() || O(140), y = y.getNextSibling(), v.push(y);
      let C = h;
      for (const T of v) C = C.insertAfter(T);
    }(n, c));
    const f = oa(o, tr);
    u && S(f) && (u.canMergeWhenEmpty() || tr(l)) && (f.append(...u.getChildren()), u.remove()), S(n) && n.isEmpty() && n.remove(), o.selectEnd();
    const g = S(n) ? n.getLastChild() : null;
    _i(g) && f !== n && g.remove();
  }
  insertParagraph() {
    if (this.anchor.key === "root") {
      const o = Mt();
      return pe().splice(this.anchor.offset, 0, [o]), o.select(), o;
    }
    const e = ra(this), r = oa(this.anchor.getNode(), tr);
    S(r) || O(213);
    const n = r.getChildAtIndex(e), i = n ? [n, ...n.getNextSiblings()] : [], s = r.insertNewAfter(this, !1);
    return s ? (s.append(...i), s.selectStart(), s) : null;
  }
  insertLineBreak(e) {
    const r = Rr();
    if (this.insertNodes([r]), e) {
      const n = r.getParentOrThrow(), i = r.getIndexWithinParent();
      n.select(i, i);
    }
  }
  extract() {
    const e = this.getNodes(), r = e.length, n = r - 1, i = this.anchor, s = this.focus;
    let o = e[0], a = e[n];
    const [u, l] = Oa(this);
    if (r === 0) return [];
    if (r === 1) {
      if (F(o) && !this.isCollapsed()) {
        const d = u > l ? l : u, f = u > l ? u : l, g = o.splitText(d, f), h = d === 0 ? g[0] : g[1];
        return h != null ? [h] : [];
      }
      return [o];
    }
    const c = i.isBefore(s);
    if (F(o)) {
      const d = c ? u : l;
      d === o.getTextContentSize() ? e.shift() : d !== 0 && ([, o] = o.splitText(d), e[0] = o);
    }
    if (F(a)) {
      const d = a.getTextContent().length, f = c ? l : u;
      f === 0 ? e.pop() : f !== d && ([a] = a.splitText(f), e[n] = a);
    }
    return e;
  }
  modify(e, r, n) {
    if (Gl(this, e, r, n)) return;
    const i = e === "move", s = ye(), o = gt(at(s));
    if (!o) return;
    const a = s._blockCursorElement, u = s._rootElement, l = this.focus.getNode();
    if (u === null || a === null || !S(l) || l.isInline() || l.canBeEmpty() || Fa(a, s, u), this.dirty) {
      let c = Sn(s, this.anchor.key), d = Sn(s, this.focus.key);
      this.anchor.type === "text" && (c = wn(c)), this.focus.type === "text" && (d = wn(d)), c && d && xf(o, c, this.anchor.offset, d, this.focus.offset);
    }
    if (function(c, d, f, g) {
      c.modify(d, f, g);
    }(o, e, r ? "backward" : "forward", n), o.rangeCount > 0) {
      const c = o.getRangeAt(0), d = this.anchor.getNode(), f = qe(d) ? d : n2(d);
      if (this.applyDOMRange(c), this.dirty = !0, !i) {
        const g = this.getNodes(), h = [];
        let p = !1;
        for (let m = 0; m < g.length; m++) {
          const _ = g[m];
          La(_, f) ? h.push(_) : p = !0;
        }
        if (p && h.length > 0) if (r) {
          const m = h[0];
          S(m) ? m.selectStart() : m.getParentOrThrow().selectStart();
        } else {
          const m = h[h.length - 1];
          S(m) ? m.selectEnd() : m.getParentOrThrow().selectEnd();
        }
        o.anchorNode === c.startContainer && o.anchorOffset === c.startOffset || function(m) {
          const _ = m.focus, y = m.anchor, v = y.key, C = y.offset, T = y.type;
          y.set(_.key, _.offset, _.type, !0), _.set(v, C, T, !0);
        }(this);
      }
    }
    n === "lineboundary" && Gl(this, e, r, n, "decorators");
  }
  forwardDeletion(e, r, n) {
    if (!n && (e.type === "element" && S(r) && e.offset === r.getChildrenSize() || e.type === "text" && e.offset === r.getTextContentSize())) {
      const i = r.getParent(), s = r.getNextSibling() || (i === null ? null : i.getNextSibling());
      if (S(s) && s.isShadowRoot()) return !0;
    }
    return !1;
  }
  deleteCharacter(e) {
    const r = this.isCollapsed();
    if (this.isCollapsed()) {
      const n = this.anchor;
      let i = n.getNode();
      if (this.forwardDeletion(n, i, e)) return;
      const s = Ru(ar(n, e ? "previous" : "next"));
      if (s.getTextSlices().every((a) => a === null || a.distance === 0)) {
        let a = { type: "initial" };
        for (const u of s.iterNodeCarets("shadowRoot")) if (pt(u)) {
          if (!u.origin.isInline()) {
            if (u.origin.isShadowRoot()) {
              if (a.type === "merge-block") break;
              if (S(s.anchor.origin) && s.anchor.origin.isEmpty()) {
                const l = St(u);
                aa(this, On(l, l)), s.anchor.origin.remove();
              }
              return;
            }
            a.type !== "merge-next-block" && a.type !== "merge-block" || (a = { block: a.block, caret: u, type: "merge-block" });
          }
        } else {
          if (a.type === "merge-block") break;
          if (Nn(u)) {
            if (S(u.origin)) {
              if (u.origin.isInline()) {
                if (!u.origin.isParentOf(s.anchor.origin)) break;
              } else a = { block: u.origin, type: "merge-next-block" };
              continue;
            }
            if (le(u.origin)) {
              if (!u.origin.isIsolated()) if (a.type === "merge-next-block" && (u.origin.isKeyboardSelectable() || !u.origin.isInline()) && S(s.anchor.origin) && s.anchor.origin.isEmpty()) {
                s.anchor.origin.remove();
                const l = Ef();
                l.add(u.origin.getKey()), et(l);
              } else u.origin.remove();
              return;
            }
            break;
          }
        }
        if (a.type === "merge-block") {
          const { caret: u, block: l } = a;
          return aa(this, On(!u.origin.isEmpty() && l.isEmpty() ? Lu(Oe(l, u.direction)) : s.anchor, u)), this.removeText();
        }
      }
      const o = this.focus;
      if (this.modify("extend", e, "character"), this.isCollapsed()) {
        if (e && n.offset === 0 && Vl(this, n.getNode())) return;
      } else {
        const a = o.type === "text" ? o.getNode() : null;
        if (i = n.type === "text" ? n.getNode() : null, a !== null && a.isSegmented()) {
          const u = o.offset, l = a.getTextContentSize();
          if (a.is(i) || e && u !== l || !e && u !== 0) return void Wl(a, e, u);
        } else if (i !== null && i.isSegmented()) {
          const u = n.offset, l = i.getTextContentSize();
          if (i.is(a) || e && u !== 0 || !e && u !== l) return void Wl(i, e, u);
        }
        (function(u, l) {
          const c = u.anchor, d = u.focus, f = c.getNode(), g = d.getNode();
          if (f === g && c.type === "text" && d.type === "text") {
            const h = c.offset, p = d.offset, m = h < p, _ = m ? h : p, y = m ? p : h, v = y - 1;
            _ !== v && function(C) {
              return !(Pf(C) || $m(C));
            }(f.getTextContent().slice(_, y)) && (l ? d.set(d.key, v, d.type) : c.set(c.key, v, c.type));
          }
        })(this, e);
      }
    }
    if (this.removeText(), e && !r && this.isCollapsed() && this.anchor.type === "element" && this.anchor.offset === 0) {
      const n = this.anchor.getNode();
      n.isEmpty() && qe(n.getParent()) && n.getPreviousSibling() === null && Vl(this, n);
    }
  }
  deleteLine(e) {
    this.isCollapsed() && this.modify("extend", e, "lineboundary"), this.isCollapsed() ? this.deleteCharacter(e) : this.removeText();
  }
  deleteWord(e) {
    if (this.isCollapsed()) {
      const r = this.anchor, n = r.getNode();
      if (this.forwardDeletion(r, n, e)) return;
      this.modify("extend", e, "word");
    }
    this.removeText();
  }
  isBackward() {
    return this.focus.isBefore(this.anchor);
  }
  getStartEndPoints() {
    return [this.anchor, this.focus];
  }
}
function wt(t) {
  return t instanceof yo;
}
function Ul(t) {
  const e = t.offset;
  if (t.type === "text") return e;
  const r = t.getNode();
  return e === r.getChildrenSize() ? r.getTextContent().length : 0;
}
function Oa(t) {
  const e = t.getStartEndPoints();
  if (e === null) return [0, 0];
  const [r, n] = e;
  return r.type === "element" && n.type === "element" && r.key === n.key && r.offset === n.offset ? [0, 0] : [Ul(r), Ul(n)];
}
function Vl(t, e) {
  for (let r = e; r; r = r.getParent()) {
    if (S(r)) {
      if (r.collapseAtStart(t)) return !0;
      if (Qt(r)) break;
    }
    if (r.getPreviousSibling()) break;
  }
  return !1;
}
const $m = (() => {
  try {
    const t = new RegExp("\\p{Emoji}", "u"), e = t.test.bind(t);
    if (e("❤️") && e("#️⃣") && e("👍")) return e;
  } catch {
  }
  return () => !1;
})();
function Wl(t, e, r) {
  const n = t, i = n.getTextContent().split(/(?=\s)/g), s = i.length;
  let o = 0, a = 0;
  for (let l = 0; l < s; l++) {
    const c = l === s - 1;
    if (a = o, o += i[l].length, e && o === r || o > r || c) {
      i.splice(l, 1), c && (a = void 0);
      break;
    }
  }
  const u = i.join("").trim();
  u === "" ? n.remove() : (n.setTextContent(u), n.select(a, a));
}
function Hl(t, e, r, n) {
  let i, s = e;
  if (Ae(t)) {
    let o = !1;
    const a = t.childNodes, u = a.length, l = n._blockCursorElement;
    s === u && (o = !0, s = u - 1);
    let c = a[s], d = !1;
    if (c === l) c = a[s + 1], d = !0;
    else if (l !== null) {
      const f = l.parentNode;
      t === f && e > Array.prototype.indexOf.call(f.children, l) && s--;
    }
    if (i = gn(c), F(i)) s = ic(i, o);
    else {
      let f = gn(t);
      if (f === null) return null;
      if (S(f)) {
        const g = n.getElementByKey(f.getKey());
        g === null && O(214), [f, s] = f.getDOMSlot(g).resolveChildIndex(f, g, t, e), S(f) || O(215), o && s >= f.getChildrenSize() && (s = Math.max(0, f.getChildrenSize() - 1));
        let p = f.getChildAtIndex(s);
        if (S(p) && function(m, _, y) {
          const v = m.getParent();
          return y === null || v === null || !v.canBeEmpty() || v !== y.getNode();
        }(p, 0, r)) {
          const m = o ? p.getLastDescendant() : p.getFirstDescendant();
          m === null ? f = p : (p = m, f = S(p) ? p : p.getParentOrThrow()), s = 0;
        }
        F(p) ? (i = p, f = null, s = ic(p, o)) : p !== f && o && !d && (S(f) || O(216), s = Math.min(f.getChildrenSize(), s + 1));
      } else {
        const g = f.getIndexWithinParent();
        s = e === 0 && le(f) && gn(t) === f ? g : g + 1, f = f.getParentOrThrow();
      }
      if (S(f)) return Rt(f.__key, s, "element");
    }
  } else i = gn(t);
  return F(i) ? Rt(i.__key, s, "text") : null;
}
function zl(t, e, r) {
  const n = t.offset, i = t.getNode();
  if (n === 0) {
    const s = i.getPreviousSibling(), o = i.getParent();
    if (e) {
      if ((r || !e) && s === null && S(o) && o.isInline()) {
        const a = o.getPreviousSibling();
        F(a) && t.set(a.__key, a.getTextContent().length, "text");
      }
    } else S(s) && !r && s.isInline() ? t.set(s.__key, s.getChildrenSize(), "element") : F(s) && t.set(s.__key, s.getTextContent().length, "text");
  } else if (n === i.getTextContent().length) {
    const s = i.getNextSibling(), o = i.getParent();
    if (e && S(s) && s.isInline()) t.set(s.__key, 0, "element");
    else if ((r || e) && s === null && S(o) && o.isInline() && !o.canInsertTextAfter()) {
      const a = o.getNextSibling();
      F(a) && t.set(a.__key, 0, "text");
    }
  }
}
function yf(t, e, r) {
  if (t.type === "text" && e.type === "text") {
    const n = t.isBefore(e), i = t.is(e);
    zl(t, n, i), zl(e, !n, i), i && e.set(t.key, t.offset, t.type);
    const s = ye();
    if (s.isComposing() && s._compositionKey !== t.key && R(r)) {
      const o = r.anchor, a = r.focus;
      t.set(o.key, o.offset, o.type, !0), e.set(a.key, a.offset, a.type, !0);
    }
  }
}
function _f(t, e, r, n, i, s) {
  if (t === null || r === null || !ns(i, t, r)) return null;
  const o = Hl(t, e, R(s) ? s.anchor : null, i);
  if (o === null) return null;
  const a = Hl(r, n, R(s) ? s.focus : null, i);
  if (a === null) return null;
  if (o.type === "element" && a.type === "element") {
    const u = gn(t), l = gn(r);
    if (le(u) && le(l)) return null;
  }
  return yf(o, a, s), [o, a];
}
function Ia(t) {
  return S(t) && !t.isInline();
}
function vf(t, e, r, n, i, s) {
  const o = hr(), a = new zr(Rt(t, e, i), Rt(r, n, s), 0, "");
  return a.dirty = !0, o._selection = a, a;
}
function bf() {
  const t = Rt("root", 0, "element"), e = Rt("root", 0, "element");
  return new zr(t, e, 0, "");
}
function Ef() {
  return new yo(/* @__PURE__ */ new Set());
}
function yu(t, e, r, n) {
  const i = r._window;
  if (i === null) return null;
  const s = n || i.event, o = s ? s.type : void 0, a = o === "selectionchange", u = !ya && (a || o === "beforeinput" || o === "compositionstart" || o === "compositionend" || o === "click" && s && s.detail === 3 || o === "drop" || o === void 0);
  let l, c, d, f;
  if (R(t) && !u) return t.clone();
  if (e === null) return null;
  if (l = e.anchorNode, c = e.focusNode, d = e.anchorOffset, f = e.focusOffset, a && R(t) && !ns(r, l, c)) return t.clone();
  const g = _f(l, d, c, f, r, t);
  if (g === null) return null;
  const [h, p] = g;
  return new zr(h, p, R(t) ? t.format : 0, R(t) ? t.style : "");
}
function B() {
  return hr()._selection;
}
function es() {
  return ye()._editorState._selection;
}
function Xs(t, e, r, n = 1) {
  const i = t.anchor, s = t.focus, o = i.getNode(), a = s.getNode();
  if (!e.is(o) && !e.is(a)) return;
  const u = e.__key;
  if (t.isCollapsed()) {
    const l = i.offset;
    if (r <= l && n > 0 || r < l && n < 0) {
      const c = Math.max(0, l + n);
      i.set(u, c, "element"), s.set(u, c, "element"), Kl(t);
    }
  } else {
    const l = t.isBackward(), c = l ? s : i, d = c.getNode(), f = l ? i : s, g = f.getNode();
    if (e.is(d)) {
      const h = c.offset;
      (r <= h && n > 0 || r < h && n < 0) && c.set(u, Math.max(0, h + n), "element");
    }
    if (e.is(g)) {
      const h = f.offset;
      (r <= h && n > 0 || r < h && n < 0) && f.set(u, Math.max(0, h + n), "element");
    }
  }
  Kl(t);
}
function Kl(t) {
  const e = t.anchor, r = e.offset, n = t.focus, i = n.offset, s = e.getNode(), o = n.getNode();
  if (t.isCollapsed()) {
    if (!S(s)) return;
    const a = s.getChildrenSize(), u = r >= a, l = u ? s.getChildAtIndex(a - 1) : s.getChildAtIndex(r);
    if (F(l)) {
      let c = 0;
      u && (c = l.getTextContentSize()), e.set(l.__key, c, "text"), n.set(l.__key, c, "text");
    }
  } else {
    if (S(s)) {
      const a = s.getChildrenSize(), u = r >= a, l = u ? s.getChildAtIndex(a - 1) : s.getChildAtIndex(r);
      if (F(l)) {
        let c = 0;
        u && (c = l.getTextContentSize()), e.set(l.__key, c, "text");
      }
    }
    if (S(o)) {
      const a = o.getChildrenSize(), u = i >= a, l = u ? o.getChildAtIndex(a - 1) : o.getChildAtIndex(i);
      if (F(l)) {
        let c = 0;
        u && (c = l.getTextContentSize()), n.set(l.__key, c, "text");
      }
    }
  }
}
function Qs(t, e, r, n, i) {
  let s = null, o = 0, a = null;
  n !== null ? (s = n.__key, F(n) ? (o = n.getTextContentSize(), a = "text") : S(n) && (o = n.getChildrenSize(), a = "element")) : i !== null && (s = i.__key, F(i) ? a = "text" : S(i) && (a = "element")), s !== null && a !== null ? t.set(s, o, a) : (o = e.getIndexWithinParent(), o === -1 && (o = r.getChildrenSize()), t.set(r.__key, o, "element"));
}
function Jl(t, e, r, n, i) {
  t.type === "text" ? t.set(r, t.offset + (e ? 0 : i), "text") : t.offset > n.getIndexWithinParent() && t.set(t.key, t.offset - 1, "element");
}
function xf(t, e, r, n, i) {
  try {
    t.setBaseAndExtent(e, r, n, i);
  } catch {
  }
}
function Um(t, e, r, n, i, s, o) {
  const a = n.anchorNode, u = n.focusNode, l = n.anchorOffset, c = n.focusOffset, d = document.activeElement;
  if (i.has("collaboration") && d !== s || d !== null && Cu(d)) return;
  if (!R(e)) return void (t !== null && ns(r, a, u) && n.removeAllRanges());
  const f = e.anchor, g = e.focus, h = f.key, p = g.key, m = Sn(r, h), _ = Sn(r, p), y = f.offset, v = g.offset, C = e.format, T = e.style, k = e.isCollapsed();
  let N = m, A = _, D = !1;
  if (f.type === "text") {
    N = wn(m);
    const Y = f.getNode();
    D = Y.getFormat() !== C || Y.getStyle() !== T;
  } else R(t) && t.anchor.type === "text" && (D = !0);
  var L, W, U, M, P;
  if (g.type === "text" && (A = wn(_)), N !== null && A !== null && (k && (t === null || D || R(t) && (t.format !== C || t.style !== T)) && (L = C, W = T, U = y, M = h, P = performance.now(), lf = [L, W, U, M, P]), l !== y || c !== v || a !== N || u !== A || n.type === "Range" && k || (d !== null && s.contains(d) || s.focus({ preventScroll: !0 }), f.type === "element"))) {
    if (xf(n, N, y, A, v), !i.has("skip-scroll-into-view") && e.isCollapsed() && s !== null && s === document.activeElement) {
      const Y = R(e) && e.anchor.type === "element" ? N.childNodes[y] || null : n.rangeCount > 0 ? n.getRangeAt(0) : null;
      if (Y !== null) {
        let Z;
        if (Y instanceof Text) {
          const de = document.createRange();
          de.selectNode(Y), Z = de.getBoundingClientRect();
        } else Z = Y.getBoundingClientRect();
        (function(de, ae, V) {
          const he = Bf(V), je = Su(he);
          if (he === null || je === null) return;
          let { top: ze, bottom: lt } = ae, tn = 0, rn = 0, rt = V;
          for (; rt !== null; ) {
            const _r = rt === he.body;
            if (_r) tn = 0, rn = at(de).innerHeight;
            else {
              const Zt = rt.getBoundingClientRect();
              tn = Zt.top, rn = Zt.bottom;
            }
            let Tt = 0;
            if (ze < tn ? Tt = -(tn - ze) : lt > rn && (Tt = lt - rn), Tt !== 0) if (_r) je.scrollBy(0, Tt);
            else {
              const Zt = rt.scrollTop;
              rt.scrollTop += Tt;
              const vr = rt.scrollTop - Zt;
              ze -= vr, lt -= vr;
            }
            if (_r) break;
            rt = is(rt);
          }
        })(r, Z, s);
      }
    }
    Sa = !0;
  }
}
function Vm(t) {
  let e = B() || es();
  e === null && (e = pe().selectEnd()), e.insertNodes(t);
}
function ra(t) {
  let e = t;
  t.isCollapsed() || e.removeText();
  const r = B();
  R(r) && (e = r), R(e) || O(161);
  const n = e.anchor;
  let i = n.getNode(), s = n.offset;
  for (; !tr(i); ) {
    const o = i;
    if ([i, s] = Wm(i, s), o.is(i)) break;
  }
  return s;
}
function Wm(t, e) {
  const r = t.getParent();
  if (!r) {
    const i = Mt();
    return pe().append(i), i.select(), [pe(), 0];
  }
  if (F(t)) {
    const i = t.splitText(e);
    if (i.length === 0) return [r, t.getIndexWithinParent()];
    const s = e === 0 ? 0 : 1;
    return [r, i[0].getIndexWithinParent() + s];
  }
  if (!S(t) || e === 0) return [r, t.getIndexWithinParent()];
  const n = t.getChildAtIndex(e);
  if (n) {
    const i = new zr(Rt(t.__key, e, "element"), Rt(t.__key, e, "element"), 0, ""), s = t.insertNewAfter(i);
    s && s.append(n, ...n.getNextSiblings());
  }
  return [r, t.getIndexWithinParent() + 1];
}
function Gl(t, e, r, n, i = "decorators-and-blocks") {
  if (e === "move" && n === "character" && !t.isCollapsed()) {
    const [c, d] = r === t.isBackward() ? [t.focus, t.anchor] : [t.anchor, t.focus];
    return d.set(c.key, c.offset, c.type), !0;
  }
  const s = ar(t.focus, r ? "previous" : "next"), o = n === "lineboundary", a = e === "move";
  let u = s, l = i === "decorators-and-blocks";
  if (!Vf(u)) {
    for (const c of u) {
      l = !1;
      const { origin: d } = c;
      if (!le(d) || d.isIsolated() || (u = c, !o || !d.isInline())) break;
    }
    if (l) for (const c of Ru(s).iterNodeCarets(e === "extend" ? "shadowRoot" : "root")) {
      if (pt(c)) c.origin.isInline() || (u = c);
      else {
        if (S(c.origin)) continue;
        le(c.origin) && !c.origin.isInline() && (u = c);
      }
      break;
    }
  }
  if (u === s) return !1;
  if (a && !o && le(u.origin) && u.origin.isKeyboardSelectable()) {
    const c = Ef();
    return c.add(u.origin.getKey()), et(c), !0;
  }
  return u = St(u), a && Ri(t.anchor, u), Ri(t.focus, u), l || !o;
}
let Me = null, Se = null, Je = !1, na = !1, Ps = 0;
const Yl = { characterData: !0, childList: !0, subtree: !0 };
function ts() {
  return Je || Me !== null && Me._readOnly;
}
function Fe() {
  Je && O(13);
}
function Cf() {
  Ps > 99 && O(14);
}
function hr() {
  return Me === null && O(195, Tf()), Me;
}
function ye() {
  return Se === null && O(196, Tf()), Se;
}
function Tf() {
  let t = 0;
  const e = /* @__PURE__ */ new Set(), r = bo.version;
  if (typeof window < "u") for (const i of document.querySelectorAll("[contenteditable]")) {
    const s = Eo(i);
    if (Tu(s)) t++;
    else if (s) {
      let o = String(s.constructor.version || "<0.17.1");
      o === r && (o += " (separately built, likely a bundler configuration issue)"), e.add(o);
    }
  }
  let n = ` Detected on the page: ${t} compatible editor(s) with version ${r}`;
  return e.size && (n += ` and incompatible editors with versions ${Array.from(e).join(", ")}`), n;
}
function Hm() {
  return Se;
}
function Xl(t, e, r) {
  const n = e.__type, i = function(a, u) {
    const l = a._nodes.get(u);
    return l === void 0 && O(30, u), l;
  }(t, n);
  let s = r.get(n);
  s === void 0 && (s = Array.from(i.transforms), r.set(n, s));
  const o = s.length;
  for (let a = 0; a < o && (s[a](e), e.isAttached()); a++) ;
}
function Ql(t, e) {
  return t !== void 0 && t.__key !== e && t.isAttached();
}
function kf(t, e) {
  if (!e) return;
  const r = t._updateTags;
  let n = e;
  Array.isArray(e) || (n = [e]);
  for (const i of n) r.add(i);
}
function Af(t) {
  return _u(t, ye()._nodes);
}
function _u(t, e) {
  const r = t.type, n = e.get(r);
  n === void 0 && O(17, r);
  const i = n.klass;
  t.type !== i.getType() && O(18, i.name);
  const s = i.importJSON(t), o = t.children;
  if (S(s) && Array.isArray(o)) for (let a = 0; a < o.length; a++) {
    const u = _u(o[a], e);
    s.append(u);
  }
  return s;
}
function Zl(t, e, r) {
  const n = Me, i = Je, s = Se;
  Me = e, Je = !0, Se = t;
  try {
    return r();
  } finally {
    Me = n, Je = i, Se = s;
  }
}
function Wt(t, e) {
  const r = t._pendingEditorState, n = t._rootElement, i = t._headless || n === null;
  if (r === null) return;
  const s = t._editorState, o = s._selection, a = r._selection, u = t._dirtyType !== Or, l = Me, c = Je, d = Se, f = t._updating, g = t._observer;
  let h = null;
  if (t._pendingEditorState = null, t._editorState = r, !i && u && g !== null) {
    Se = t, Me = r, Je = !1, t._updating = !0;
    try {
      const k = t._dirtyType, N = t._dirtyElements, A = t._dirtyLeaves;
      g.disconnect(), h = bm(s, r, t, k, N, A);
    } catch (k) {
      if (k instanceof Error && t._onError(k), na) throw k;
      return Nf(t, null, n, r), Ud(t), t._dirtyType = An, na = !0, Wt(t, s), void (na = !1);
    } finally {
      g.observe(n, Yl), t._updating = f, Me = l, Je = c, Se = d;
    }
  }
  r._readOnly || (r._readOnly = !0);
  const p = t._dirtyLeaves, m = t._dirtyElements, _ = t._normalizedNodes, y = t._updateTags, v = t._deferred;
  u && (t._dirtyType = Or, t._cloneNotNeeded.clear(), t._dirtyLeaves = /* @__PURE__ */ new Set(), t._dirtyElements = /* @__PURE__ */ new Map(), t._normalizedNodes = /* @__PURE__ */ new Set(), t._updateTags = /* @__PURE__ */ new Set()), function(k, N) {
    const A = k._decorators;
    let D = k._pendingDecorators || A;
    const L = N._nodeMap;
    let W;
    for (W in D) L.has(W) || (D === A && (D = If(k)), delete D[W]);
  }(t, r);
  const C = i ? null : gt(at(t));
  if (t._editable && C !== null && (u || a === null || a.dirty) && n !== null && !y.has("skip-dom-selection")) {
    Se = t, Me = r;
    try {
      if (g !== null && g.disconnect(), u || a === null || a.dirty) {
        const k = t._blockCursorElement;
        k !== null && Fa(k, t, n), Um(o, a, t, C, y, n);
      }
      (function(k, N, A) {
        let D = k._blockCursorElement;
        if (R(A) && A.isCollapsed() && A.anchor.type === "element" && N.contains(document.activeElement)) {
          const L = A.anchor, W = L.getNode(), U = L.offset;
          let M = !1, P = null;
          if (U === W.getChildrenSize())
            sa(W.getChildAtIndex(U - 1)) && (M = !0);
          else {
            const Y = W.getChildAtIndex(U);
            if (Y !== null && sa(Y)) {
              const Z = Y.getPreviousSibling();
              (Z === null || sa(Z)) && (M = !0, P = k.getElementByKey(Y.__key));
            }
          }
          if (M) {
            const Y = k.getElementByKey(W.__key);
            return D === null && (k._blockCursorElement = D = function(Z) {
              const de = Z.theme, ae = document.createElement("div");
              ae.contentEditable = "false", ae.setAttribute("data-lexical-cursor", "true");
              let V = de.blockCursor;
              if (V !== void 0) {
                if (typeof V == "string") {
                  const he = Us(V);
                  V = de.blockCursor = he;
                }
                V !== void 0 && ae.classList.add(...V);
              }
              return ae;
            }(k._config)), N.style.caretColor = "transparent", void (P === null ? Y.appendChild(D) : Y.insertBefore(D, P));
          }
        }
        D !== null && Fa(D, k, N);
      })(t, n, a);
    } finally {
      g !== null && g.observe(n, Yl), Se = d, Me = l;
    }
  }
  h !== null && function(k, N, A, D, L) {
    const W = Array.from(k._listeners.mutation), U = W.length;
    for (let M = 0; M < U; M++) {
      const [P, Y] = W[M], Z = N.get(Y);
      Z !== void 0 && P(Z, { dirtyLeaves: D, prevEditorState: L, updateTags: A });
    }
  }(t, h, y, p, s), R(a) || a === null || o !== null && o.is(a) || t.dispatchCommand(po, void 0);
  const T = t._pendingDecorators;
  T !== null && (t._decorators = T, t._pendingDecorators = null, vi("decorator", t, !0, T)), function(k, N, A) {
    const D = nc(N), L = nc(A);
    D !== L && vi("textcontent", k, !0, L);
  }(t, e || s, r), vi("update", t, !0, { dirtyElements: m, dirtyLeaves: p, editorState: r, normalizedNodes: _, prevEditorState: e || s, tags: y }), function(k, N) {
    if (k._deferred = [], N.length !== 0) {
      const A = k._updating;
      k._updating = !0;
      try {
        for (let D = 0; D < N.length; D++) N[D]();
      } finally {
        k._updating = A;
      }
    }
  }(t, v), function(k) {
    const N = k._updates;
    if (N.length !== 0) {
      const A = N.shift();
      if (A) {
        const [D, L] = A;
        vu(k, D, L);
      }
    }
  }(t);
}
function vi(t, e, r, ...n) {
  const i = e._updating;
  e._updating = r;
  try {
    const s = Array.from(e._listeners[t]);
    for (let o = 0; o < s.length; o++) s[o].apply(null, n);
  } finally {
    e._updating = i;
  }
}
function wf(t, e, r) {
  if (t._updating === !1 || Se !== t) {
    let i = !1;
    return t.update(() => {
      i = wf(t, e, r);
    }), i;
  }
  const n = ku(t);
  for (let i = 4; i >= 0; i--) for (let s = 0; s < n.length; s++) {
    const o = n[s]._commands.get(e);
    if (o !== void 0) {
      const a = o[i];
      if (a !== void 0) {
        const u = Array.from(a), l = u.length;
        for (let c = 0; c < l; c++) if (u[c](r, t) === !0) return !0;
      }
    }
  }
  return !1;
}
function ec(t, e) {
  const r = t._updates;
  let n = e || !1;
  for (; r.length !== 0; ) {
    const i = r.shift();
    if (i) {
      const [s, o] = i;
      let a;
      if (o !== void 0) {
        if (a = o.onUpdate, o.skipTransforms && (n = !0), o.discrete) {
          const u = t._pendingEditorState;
          u === null && O(191), u._flushSync = !0;
        }
        a && t._deferred.push(a), kf(t, o.tag);
      }
      s();
    }
  }
  return n;
}
function vu(t, e, r) {
  const n = t._updateTags;
  let i, s = !1, o = !1;
  r !== void 0 && (i = r.onUpdate, kf(t, r.tag), s = r.skipTransforms || !1, o = r.discrete || !1), i && t._deferred.push(i);
  const a = t._editorState;
  let u = t._pendingEditorState, l = !1;
  (u === null || u._readOnly) && (u = t._pendingEditorState = Df(u || a), l = !0), u._flushSync = o;
  const c = Me, d = Je, f = Se, g = t._updating;
  Me = u, Je = !1, t._updating = !0, Se = t;
  const h = t._headless || t.getRootElement() === null;
  try {
    l && (h ? a._selection !== null && (u._selection = a._selection.clone()) : u._selection = function(y, v) {
      const C = y.getEditorState()._selection, T = gt(at(y));
      return R(C) || C == null ? yu(C, T, y, v) : C.clone();
    }(t, r && r.event || null));
    const m = t._compositionKey;
    e(), s = ec(t, s), function(y, v) {
      const C = v.getEditorState()._selection, T = y._selection;
      if (R(T)) {
        const k = T.anchor, N = T.focus;
        let A;
        if (k.type === "text" && (A = k.getNode(), A.selectionTransform(C, T)), N.type === "text") {
          const D = N.getNode();
          A !== D && D.selectionTransform(C, T);
        }
      }
    }(u, t), t._dirtyType !== Or && (s ? function(y, v) {
      const C = v._dirtyLeaves, T = y._nodeMap;
      for (const k of C) {
        const N = T.get(k);
        F(N) && N.isAttached() && N.isSimpleText() && !N.isUnmergeable() && Nl(N);
      }
    }(u, t) : function(y, v) {
      const C = v._dirtyLeaves, T = v._dirtyElements, k = y._nodeMap, N = nr(), A = /* @__PURE__ */ new Map();
      let D = C, L = D.size, W = T, U = W.size;
      for (; L > 0 || U > 0; ) {
        if (L > 0) {
          v._dirtyLeaves = /* @__PURE__ */ new Set();
          for (const M of D) {
            const P = k.get(M);
            F(P) && P.isAttached() && P.isSimpleText() && !P.isUnmergeable() && Nl(P), P !== void 0 && Ql(P, N) && Xl(v, P, A), C.add(M);
          }
          if (D = v._dirtyLeaves, L = D.size, L > 0) {
            Ps++;
            continue;
          }
        }
        v._dirtyLeaves = /* @__PURE__ */ new Set(), v._dirtyElements = /* @__PURE__ */ new Map();
        for (const M of W) {
          const P = M[0], Y = M[1];
          if (P !== "root" && !Y) continue;
          const Z = k.get(P);
          Z !== void 0 && Ql(Z, N) && Xl(v, Z, A), T.set(P, Y);
        }
        D = v._dirtyLeaves, L = D.size, W = v._dirtyElements, U = W.size, Ps++;
      }
      v._dirtyLeaves = C, v._dirtyElements = T;
    }(u, t), ec(t), function(y, v, C, T) {
      const k = y._nodeMap, N = v._nodeMap, A = [];
      for (const [D] of T) {
        const L = N.get(D);
        L !== void 0 && (L.isAttached() || (S(L) && Bd(L, D, k, N, A, T), k.has(D) || T.delete(D), A.push(D)));
      }
      for (const D of A) N.delete(D);
      for (const D of C) {
        const L = N.get(D);
        L === void 0 || L.isAttached() || (k.has(D) || C.delete(D), N.delete(D));
      }
    }(a, u, t._dirtyLeaves, t._dirtyElements)), m !== t._compositionKey && (u._flushSync = !0);
    const _ = u._selection;
    if (R(_)) {
      const y = u._nodeMap, v = _.anchor.key, C = _.focus.key;
      y.get(v) !== void 0 && y.get(C) !== void 0 || O(19);
    } else wt(_) && _._nodes.size === 0 && (u._selection = null);
  } catch (m) {
    return m instanceof Error && t._onError(m), t._pendingEditorState = a, t._dirtyType = An, t._cloneNotNeeded.clear(), t._dirtyLeaves = /* @__PURE__ */ new Set(), t._dirtyElements.clear(), void Wt(t);
  } finally {
    Me = c, Je = d, Se = f, t._updating = g, Ps = 0;
  }
  t._dirtyType !== Or || t._deferred.length > 0 || function(m, _) {
    const y = _.getEditorState()._selection, v = m._selection;
    if (v !== null) {
      if (v.dirty || !v.is(y)) return !0;
    } else if (y !== null) return !0;
    return !1;
  }(u, t) ? u._flushSync ? (u._flushSync = !1, Wt(t)) : l && Ym(() => {
    Wt(t);
  }) : (u._flushSync = !1, l && (n.clear(), t._deferred = [], t._pendingEditorState = null));
}
function it(t, e, r) {
  t._updating ? Se === t ? e() : t._updates.push([e, r]) : vu(t, e, r);
}
class bi {
  constructor(e, r, n) {
    this.element = e, this.before = r || null, this.after = n || null;
  }
  withBefore(e) {
    return new bi(this.element, e, this.after);
  }
  withAfter(e) {
    return new bi(this.element, this.before, e);
  }
  withElement(e) {
    return new bi(e, this.before, this.after);
  }
  insertChild(e) {
    const r = this.before || this.getManagedLineBreak();
    return r !== null && r.parentElement !== this.element && O(222), this.element.insertBefore(e, r), this;
  }
  removeChild(e) {
    return e.parentElement !== this.element && O(223), this.element.removeChild(e), this;
  }
  replaceChild(e, r) {
    return r.parentElement !== this.element && O(224), this.element.replaceChild(e, r), this;
  }
  getFirstChild() {
    const e = this.after ? this.after.nextSibling : this.element.firstChild;
    return e === this.before || e === this.getManagedLineBreak() ? null : e;
  }
  getManagedLineBreak() {
    return this.element.__lexicalLineBreak || null;
  }
  setManagedLineBreak(e) {
    if (e === null) this.removeManagedLineBreak();
    else {
      const r = e === "decorator" && (kn || Ai);
      this.insertManagedLineBreak(r);
    }
  }
  removeManagedLineBreak() {
    const e = this.getManagedLineBreak();
    if (e) {
      const r = this.element, n = e.nodeName === "IMG" ? e.nextSibling : null;
      n && r.removeChild(n), r.removeChild(e), r.__lexicalLineBreak = void 0;
    }
  }
  insertManagedLineBreak(e) {
    const r = this.getManagedLineBreak();
    if (r) {
      if (e === (r.nodeName === "IMG")) return;
      this.removeManagedLineBreak();
    }
    const n = this.element, i = this.before, s = document.createElement("br");
    if (n.insertBefore(s, i), e) {
      const o = document.createElement("img");
      o.setAttribute("data-lexical-linebreak", "true"), o.style.cssText = "display: inline !important; border: 0px !important; margin: 0px !important;", o.alt = "", n.insertBefore(o, s), n.__lexicalLineBreak = o;
    } else n.__lexicalLineBreak = s;
  }
  getFirstChildOffset() {
    let e = 0;
    for (let r = this.after; r !== null; r = r.previousSibling) e++;
    return e;
  }
  resolveChildIndex(e, r, n, i) {
    if (n === this.element) {
      const u = this.getFirstChildOffset();
      return [e, Math.min(u + e.getChildrenSize(), Math.max(u, i))];
    }
    const s = tc(r, n);
    s.push(i);
    const o = tc(r, this.element);
    let a = e.getIndexWithinParent();
    for (let u = 0; u < o.length; u++) {
      const l = s[u], c = o[u];
      if (l === void 0 || l < c) break;
      if (l > c) {
        a += 1;
        break;
      }
    }
    return [e.getParentOrThrow(), a];
  }
}
function tc(t, e) {
  const r = [];
  let n = e;
  for (; n !== t && n !== null; n = e.parentNode) {
    let i = 0;
    for (let s = n.previousSibling; s !== null; s = s.previousSibling) i++;
    r.push(i);
  }
  return n !== t && O(225), r.reverse();
}
class Yt extends mo {
  constructor(e) {
    super(e), this.__first = null, this.__last = null, this.__size = 0, this.__format = 0, this.__style = "", this.__indent = 0, this.__dir = null, this.__textFormat = 0, this.__textStyle = "";
  }
  afterCloneFrom(e) {
    super.afterCloneFrom(e), this.__first = e.__first, this.__last = e.__last, this.__size = e.__size, this.__indent = e.__indent, this.__format = e.__format, this.__style = e.__style, this.__dir = e.__dir, this.__textFormat = e.__textFormat, this.__textStyle = e.__textStyle;
  }
  getFormat() {
    return this.getLatest().__format;
  }
  getFormatType() {
    const e = this.getFormat();
    return am[e] || "";
  }
  getStyle() {
    return this.getLatest().__style;
  }
  getIndent() {
    return this.getLatest().__indent;
  }
  getChildren() {
    const e = [];
    let r = this.getFirstChild();
    for (; r !== null; ) e.push(r), r = r.getNextSibling();
    return e;
  }
  getChildrenKeys() {
    const e = [];
    let r = this.getFirstChild();
    for (; r !== null; ) e.push(r.__key), r = r.getNextSibling();
    return e;
  }
  getChildrenSize() {
    return this.getLatest().__size;
  }
  isEmpty() {
    return this.getChildrenSize() === 0;
  }
  isDirty() {
    const e = ye()._dirtyElements;
    return e !== null && e.has(this.__key);
  }
  isLastChild() {
    const e = this.getLatest(), r = this.getParentOrThrow().getLastChild();
    return r !== null && r.is(e);
  }
  getAllTextNodes() {
    const e = [];
    let r = this.getFirstChild();
    for (; r !== null; ) {
      if (F(r) && e.push(r), S(r)) {
        const n = r.getAllTextNodes();
        e.push(...n);
      }
      r = r.getNextSibling();
    }
    return e;
  }
  getFirstDescendant() {
    let e = this.getFirstChild();
    for (; S(e); ) {
      const r = e.getFirstChild();
      if (r === null) break;
      e = r;
    }
    return e;
  }
  getLastDescendant() {
    let e = this.getLastChild();
    for (; S(e); ) {
      const r = e.getLastChild();
      if (r === null) break;
      e = r;
    }
    return e;
  }
  getDescendantByIndex(e) {
    const r = this.getChildren(), n = r.length;
    if (e >= n) {
      const s = r[n - 1];
      return S(s) && s.getLastDescendant() || s || null;
    }
    const i = r[e];
    return S(i) && i.getFirstDescendant() || i || null;
  }
  getFirstChild() {
    const e = this.getLatest().__first;
    return e === null ? null : ge(e);
  }
  getFirstChildOrThrow() {
    const e = this.getFirstChild();
    return e === null && O(45, this.__key), e;
  }
  getLastChild() {
    const e = this.getLatest().__last;
    return e === null ? null : ge(e);
  }
  getLastChildOrThrow() {
    const e = this.getLastChild();
    return e === null && O(96, this.__key), e;
  }
  getChildAtIndex(e) {
    const r = this.getChildrenSize();
    let n, i;
    if (e < r / 2) {
      for (n = this.getFirstChild(), i = 0; n !== null && i <= e; ) {
        if (i === e) return n;
        n = n.getNextSibling(), i++;
      }
      return null;
    }
    for (n = this.getLastChild(), i = r - 1; n !== null && i >= e; ) {
      if (i === e) return n;
      n = n.getPreviousSibling(), i--;
    }
    return null;
  }
  getTextContent() {
    let e = "";
    const r = this.getChildren(), n = r.length;
    for (let i = 0; i < n; i++) {
      const s = r[i];
      e += s.getTextContent(), S(s) && i !== n - 1 && !s.isInline() && (e += Kt);
    }
    return e;
  }
  getTextContentSize() {
    let e = 0;
    const r = this.getChildren(), n = r.length;
    for (let i = 0; i < n; i++) {
      const s = r[i];
      e += s.getTextContentSize(), S(s) && i !== n - 1 && !s.isInline() && (e += Kt.length);
    }
    return e;
  }
  getDirection() {
    return this.getLatest().__dir;
  }
  getTextFormat() {
    return this.getLatest().__textFormat;
  }
  hasFormat(e) {
    if (e !== "") {
      const r = wl[e];
      return !!(this.getFormat() & r);
    }
    return !1;
  }
  hasTextFormat(e) {
    const r = Ve[e];
    return !!(this.getTextFormat() & r);
  }
  getFormatFlags(e, r) {
    return Zs(this.getLatest().__textFormat, e, r);
  }
  getTextStyle() {
    return this.getLatest().__textStyle;
  }
  select(e, r) {
    Fe();
    const n = B();
    let i = e, s = r;
    const o = this.getChildrenSize();
    if (!this.canBeEmpty()) {
      if (e === 0 && r === 0) {
        const u = this.getFirstChild();
        if (F(u) || S(u)) return u.select(0, 0);
      } else if (!(e !== void 0 && e !== o || r !== void 0 && r !== o)) {
        const u = this.getLastChild();
        if (F(u) || S(u)) return u.select();
      }
    }
    i === void 0 && (i = o), s === void 0 && (s = o);
    const a = this.__key;
    return R(n) ? (n.anchor.set(a, i, "element"), n.focus.set(a, s, "element"), n.dirty = !0, n) : vf(a, i, a, s, "element", "element");
  }
  selectStart() {
    const e = this.getFirstDescendant();
    return e ? e.selectStart() : this.select();
  }
  selectEnd() {
    const e = this.getLastDescendant();
    return e ? e.selectEnd() : this.select();
  }
  clear() {
    const e = this.getWritable();
    return this.getChildren().forEach((r) => r.remove()), e;
  }
  append(...e) {
    return this.splice(this.getChildrenSize(), 0, e);
  }
  setDirection(e) {
    const r = this.getWritable();
    return r.__dir = e, r;
  }
  setFormat(e) {
    return this.getWritable().__format = e !== "" ? wl[e] : 0, this;
  }
  setStyle(e) {
    return this.getWritable().__style = e || "", this;
  }
  setTextFormat(e) {
    const r = this.getWritable();
    return r.__textFormat = e, r;
  }
  setTextStyle(e) {
    const r = this.getWritable();
    return r.__textStyle = e, r;
  }
  setIndent(e) {
    return this.getWritable().__indent = e, this;
  }
  splice(e, r, n) {
    const i = n.length, s = this.getChildrenSize(), o = this.getWritable();
    e + r <= s || O(226, String(e), String(r), String(s));
    const a = o.__key, u = [], l = [], c = this.getChildAtIndex(e + r);
    let d = null, f = s - r + i;
    if (e !== 0) if (e === s) d = this.getLastChild();
    else {
      const h = this.getChildAtIndex(e);
      h !== null && (d = h.getPreviousSibling());
    }
    if (r > 0) {
      let h = d === null ? this.getFirstChild() : d.getNextSibling();
      for (let p = 0; p < r; p++) {
        h === null && O(100);
        const m = h.getNextSibling(), _ = h.__key;
        Dr(h.getWritable()), l.push(_), h = m;
      }
    }
    let g = d;
    for (let h = 0; h < i; h++) {
      const p = n[h];
      g !== null && p.is(g) && (d = g = g.getPreviousSibling());
      const m = p.getWritable();
      m.__parent === a && f--, Dr(m);
      const _ = p.__key;
      if (g === null) o.__first = _, m.__prev = null;
      else {
        const y = g.getWritable();
        y.__next = _, m.__prev = y.__key;
      }
      p.__key === a && O(76), m.__parent = a, u.push(_), g = p;
    }
    if (e + r === s)
      g !== null && (g.getWritable().__next = null, o.__last = g.__key);
    else if (c !== null) {
      const h = c.getWritable();
      if (g !== null) {
        const p = g.getWritable();
        h.__prev = g.__key, p.__next = c.__key;
      } else h.__prev = null;
    }
    if (o.__size = f, l.length) {
      const h = B();
      if (R(h)) {
        const p = new Set(l), m = new Set(u), { anchor: _, focus: y } = h;
        rc(_, p, m) && Qs(_, _.getNode(), this, d, c), rc(y, p, m) && Qs(y, y.getNode(), this, d, c), f !== 0 || this.canBeEmpty() || Qt(this) || this.remove();
      }
    }
    return o;
  }
  getDOMSlot(e) {
    return new bi(e);
  }
  exportDOM(e) {
    const { element: r } = super.exportDOM(e);
    if (Ae(r)) {
      const n = this.getIndent();
      n > 0 && (r.style.paddingInlineStart = 40 * n + "px");
      const i = this.getDirection();
      i && (r.dir = i);
    }
    return { element: r };
  }
  exportJSON() {
    const e = { children: [], direction: this.getDirection(), format: this.getFormatType(), indent: this.getIndent(), ...super.exportJSON() }, r = this.getTextFormat(), n = this.getTextStyle();
    return r !== 0 && (e.textFormat = r), n !== "" && (e.textStyle = n), e;
  }
  updateFromJSON(e) {
    return super.updateFromJSON(e).setFormat(e.format).setIndent(e.indent).setDirection(e.direction).setTextFormat(e.textFormat || 0).setTextStyle(e.textStyle || "");
  }
  insertNewAfter(e, r) {
    return null;
  }
  canIndent() {
    return !0;
  }
  collapseAtStart(e) {
    return !1;
  }
  excludeFromCopy(e) {
    return !1;
  }
  canReplaceWith(e) {
    return !0;
  }
  canInsertAfter(e) {
    return !0;
  }
  canBeEmpty() {
    return !0;
  }
  canInsertTextBefore() {
    return !0;
  }
  canInsertTextAfter() {
    return !0;
  }
  isInline() {
    return !1;
  }
  isShadowRoot() {
    return !1;
  }
  canMergeWith(e) {
    return !1;
  }
  extractWithChild(e, r, n) {
    return !1;
  }
  canMergeWhenEmpty() {
    return !1;
  }
  reconcileObservedMutation(e, r) {
    const n = this.getDOMSlot(e);
    let i = n.getFirstChild();
    for (let s = this.getFirstChild(); s; s = s.getNextSibling()) {
      const o = r.getElementByKey(s.getKey());
      o !== null && (i == null ? (n.insertChild(o), i = o) : i !== o && n.replaceChild(o, i), i = i.nextSibling);
    }
  }
}
function S(t) {
  return t instanceof Yt;
}
function rc(t, e, r) {
  let n = t.getNode();
  for (; n; ) {
    const i = n.__key;
    if (e.has(i) && !r.has(i)) return !0;
    n = n.getParent();
  }
  return !1;
}
class $n extends mo {
  decorate(e, r) {
    O(47);
  }
  isIsolated() {
    return !1;
  }
  isInline() {
    return !0;
  }
  isKeyboardSelectable() {
    return !0;
  }
}
function le(t) {
  return t instanceof $n;
}
class rs extends Yt {
  static getType() {
    return "root";
  }
  static clone() {
    return new rs();
  }
  constructor() {
    super("root"), this.__cachedText = null;
  }
  getTopLevelElementOrThrow() {
    O(51);
  }
  getTextContent() {
    const e = this.__cachedText;
    return !ts() && ye()._dirtyType !== Or || e === null ? super.getTextContent() : e;
  }
  remove() {
    O(52);
  }
  replace(e) {
    O(53);
  }
  insertBefore(e) {
    O(54);
  }
  insertAfter(e) {
    O(55);
  }
  updateDOM(e, r) {
    return !1;
  }
  append(...e) {
    for (let r = 0; r < e.length; r++) {
      const n = e[r];
      S(n) || le(n) || O(56);
    }
    return super.append(...e);
  }
  static importJSON(e) {
    return pe().updateFromJSON(e);
  }
  collapseAtStart() {
    return !0;
  }
}
function qe(t) {
  return t instanceof rs;
}
function Df(t) {
  return new _o(new Map(t._nodeMap));
}
function bu() {
  return new _o(/* @__PURE__ */ new Map([["root", new rs()]]));
}
function Sf(t) {
  const e = t.exportJSON(), r = t.constructor;
  if (e.type !== r.getType() && O(130, r.name), S(t)) {
    const n = e.children;
    Array.isArray(n) || O(59, r.name);
    const i = t.getChildren();
    for (let s = 0; s < i.length; s++) {
      const o = Sf(i[s]);
      n.push(o);
    }
  }
  return e;
}
class _o {
  constructor(e, r) {
    this._nodeMap = e, this._selection = r || null, this._flushSync = !1, this._readOnly = !1;
  }
  isEmpty() {
    return this._nodeMap.size === 1 && this._selection === null;
  }
  read(e, r) {
    return Zl(r && r.editor || null, this, e);
  }
  clone(e) {
    const r = new _o(this._nodeMap, e === void 0 ? this._selection : e);
    return r._readOnly = !0, r;
  }
  toJSON() {
    return Zl(null, this, () => ({ root: Sf(pe()) }));
  }
}
class Eu extends Yt {
  static getType() {
    return "artificial";
  }
  createDOM(e) {
    return document.createElement("div");
  }
}
class pr extends Yt {
  static getType() {
    return "paragraph";
  }
  static clone(e) {
    return new pr(e.__key);
  }
  createDOM(e) {
    const r = document.createElement("p"), n = bn(e.theme, "paragraph");
    return n !== void 0 && r.classList.add(...n), r;
  }
  updateDOM(e, r, n) {
    return !1;
  }
  static importDOM() {
    return { p: (e) => ({ conversion: zm, priority: 0 }) };
  }
  exportDOM(e) {
    const { element: r } = super.exportDOM(e);
    if (Ae(r)) {
      this.isEmpty() && r.append(document.createElement("br"));
      const n = this.getFormatType();
      r.style.textAlign = n;
    }
    return { element: r };
  }
  static importJSON(e) {
    return Mt().updateFromJSON(e);
  }
  exportJSON() {
    return { ...super.exportJSON(), textFormat: this.getTextFormat(), textStyle: this.getTextStyle() };
  }
  insertNewAfter(e, r) {
    const n = Mt();
    n.setTextFormat(e.format), n.setTextStyle(e.style);
    const i = this.getDirection();
    return n.setDirection(i), n.setFormat(this.getFormatType()), n.setStyle(this.getStyle()), this.insertAfter(n, r), n;
  }
  collapseAtStart() {
    const e = this.getChildren();
    if (e.length === 0 || F(e[0]) && e[0].getTextContent().trim() === "") {
      if (this.getNextSibling() !== null) return this.selectNext(), this.remove(), !0;
      if (this.getPreviousSibling() !== null) return this.selectPrevious(), this.remove(), !0;
    }
    return !1;
  }
}
function zm(t) {
  const e = Mt();
  return t.style && (e.setFormat(t.style.textAlign), u2(t, e)), { node: e };
}
function Mt() {
  return ke(new pr());
}
function Km(t) {
  return t instanceof pr;
}
const oe = 0, vo = 1, xu = 3, Ra = 4;
function Nf(t, e, r, n) {
  const i = t._keyToDOMMap;
  i.clear(), t._editorState = bu(), t._pendingEditorState = n, t._compositionKey = null, t._dirtyType = Or, t._cloneNotNeeded.clear(), t._dirtyLeaves = /* @__PURE__ */ new Set(), t._dirtyElements.clear(), t._normalizedNodes = /* @__PURE__ */ new Set(), t._updateTags = /* @__PURE__ */ new Set(), t._updates = [], t._blockCursorElement = null;
  const s = t._observer;
  s !== null && (s.disconnect(), t._observer = null), e !== null && (e.textContent = ""), r !== null && (r.textContent = "", i.set("root", r));
}
function Jm(t) {
  const e = t || {}, r = Hm(), n = e.theme || {}, i = t === void 0 ? r : e.parentEditor || null, s = e.disableEvents || !1, o = bu(), a = e.namespace || (i !== null ? i._config.namespace : Lf()), u = e.editorState, l = [rs, xt, Hr, Qi, pr, Eu, ...e.nodes || []], { onError: c, html: d } = e, f = e.editable === void 0 || e.editable;
  let g;
  if (t === void 0 && r !== null) g = r._nodes;
  else {
    g = /* @__PURE__ */ new Map();
    for (let p = 0; p < l.length; p++) {
      let m = l[p], _ = null, y = null;
      if (typeof m != "function") {
        const k = m;
        m = k.replace, _ = k.with, y = k.withKlass || null;
      }
      const v = m.getType(), C = m.transform(), T = /* @__PURE__ */ new Set();
      C !== null && T.add(C), g.set(v, { exportDOM: d && d.export ? d.export.get(m) : void 0, klass: m, replace: _, replaceWithKlass: y, transforms: T });
    }
  }
  const h = new bo(o, i, g, { disableEvents: s, namespace: a, theme: n }, c || console.error, function(p, m) {
    const _ = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set(), v = (C) => {
      Object.keys(C).forEach((T) => {
        let k = _.get(T);
        k === void 0 && (k = [], _.set(T, k)), k.push(C[T]);
      });
    };
    return p.forEach((C) => {
      const T = C.klass.importDOM;
      if (T == null || y.has(T)) return;
      y.add(T);
      const k = T.call(C.klass);
      k !== null && v(k);
    }), m && v(m), _;
  }(g, d ? d.import : void 0), f);
  return u !== void 0 && (h._pendingEditorState = u, h._dirtyType = An), h;
}
class bo {
  constructor(e, r, n, i, s, o, a) {
    this._parentEditor = r, this._rootElement = null, this._editorState = e, this._pendingEditorState = null, this._compositionKey = null, this._deferred = [], this._keyToDOMMap = /* @__PURE__ */ new Map(), this._updates = [], this._updating = !1, this._listeners = { decorator: /* @__PURE__ */ new Set(), editable: /* @__PURE__ */ new Set(), mutation: /* @__PURE__ */ new Map(), root: /* @__PURE__ */ new Set(), textcontent: /* @__PURE__ */ new Set(), update: /* @__PURE__ */ new Set() }, this._commands = /* @__PURE__ */ new Map(), this._config = i, this._nodes = n, this._decorators = {}, this._pendingDecorators = null, this._dirtyType = Or, this._cloneNotNeeded = /* @__PURE__ */ new Set(), this._dirtyLeaves = /* @__PURE__ */ new Set(), this._dirtyElements = /* @__PURE__ */ new Map(), this._normalizedNodes = /* @__PURE__ */ new Set(), this._updateTags = /* @__PURE__ */ new Set(), this._observer = null, this._key = Lf(), this._onError = s, this._htmlConversions = o, this._editable = a, this._headless = r !== null && r._headless, this._window = null, this._blockCursorElement = null;
  }
  isComposing() {
    return this._compositionKey != null;
  }
  registerUpdateListener(e) {
    const r = this._listeners.update;
    return r.add(e), () => {
      r.delete(e);
    };
  }
  registerEditableListener(e) {
    const r = this._listeners.editable;
    return r.add(e), () => {
      r.delete(e);
    };
  }
  registerDecoratorListener(e) {
    const r = this._listeners.decorator;
    return r.add(e), () => {
      r.delete(e);
    };
  }
  registerTextContentListener(e) {
    const r = this._listeners.textcontent;
    return r.add(e), () => {
      r.delete(e);
    };
  }
  registerRootListener(e) {
    const r = this._listeners.root;
    return e(this._rootElement, null), r.add(e), () => {
      e(null, this._rootElement), r.delete(e);
    };
  }
  registerCommand(e, r, n) {
    n === void 0 && O(35);
    const i = this._commands;
    i.has(e) || i.set(e, [/* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set()]);
    const s = i.get(e);
    s === void 0 && O(36, String(e));
    const o = s[n];
    return o.add(r), () => {
      o.delete(r), s.every((a) => a.size === 0) && i.delete(e);
    };
  }
  registerMutationListener(e, r, n) {
    const i = this.resolveRegisteredNodeAfterReplacements(this.getRegisteredNode(e)).klass, s = this._listeners.mutation;
    s.set(r, i);
    const o = n && n.skipInitialization;
    return o !== void 0 && o || this.initializeMutationListener(r, i), () => {
      s.delete(r);
    };
  }
  getRegisteredNode(e) {
    const r = this._nodes.get(e.getType());
    return r === void 0 && O(37, e.name), r;
  }
  resolveRegisteredNodeAfterReplacements(e) {
    for (; e.replaceWithKlass; ) e = this.getRegisteredNode(e.replaceWithKlass);
    return e;
  }
  initializeMutationListener(e, r) {
    const n = this._editorState, i = dc(n).get(r.getType());
    if (!i) return;
    const s = /* @__PURE__ */ new Map();
    for (const o of i.keys()) s.set(o, "created");
    s.size > 0 && e(s, { dirtyLeaves: /* @__PURE__ */ new Set(), prevEditorState: n, updateTags: /* @__PURE__ */ new Set(["registerMutationListener"]) });
  }
  registerNodeTransformToKlass(e, r) {
    const n = this.getRegisteredNode(e);
    return n.transforms.add(r), n;
  }
  registerNodeTransform(e, r) {
    const n = this.registerNodeTransformToKlass(e, r), i = [n], s = n.replaceWithKlass;
    if (s != null) {
      const o = this.registerNodeTransformToKlass(s, r);
      i.push(o);
    }
    return function(o, a) {
      const u = dc(o.getEditorState()), l = [];
      for (const c of a) {
        const d = u.get(c);
        d && l.push(d);
      }
      l.length !== 0 && o.update(() => {
        for (const c of l) for (const d of c.keys()) {
          const f = ge(d);
          f && f.markDirty();
        }
      }, o._pendingEditorState === null ? { tag: "history-merge" } : void 0);
    }(this, i.map((o) => o.klass.getType())), () => {
      i.forEach((o) => o.transforms.delete(r));
    };
  }
  hasNode(e) {
    return this._nodes.has(e.getType());
  }
  hasNodes(e) {
    return e.every(this.hasNode.bind(this));
  }
  dispatchCommand(e, r) {
    return j(this, e, r);
  }
  getDecorators() {
    return this._decorators;
  }
  getRootElement() {
    return this._rootElement;
  }
  getKey() {
    return this._key;
  }
  setRootElement(e) {
    const r = this._rootElement;
    if (e !== r) {
      const n = bn(this._config.theme, "root"), i = this._pendingEditorState || this._editorState;
      if (this._rootElement = e, Nf(this, r, e, i), r !== null && (this._config.disableEvents || Om(r), n != null && r.classList.remove(...n)), e !== null) {
        const s = Su(e), o = e.style;
        o.userSelect = "text", o.whiteSpace = "pre-wrap", o.wordBreak = "break-word", e.setAttribute("data-lexical-editor", "true"), this._window = s, this._dirtyType = An, Ud(this), this._updateTags.add("history-merge"), Wt(this), this._config.disableEvents || function(a, u) {
          const l = a.ownerDocument, c = Ys.get(l);
          (c === void 0 || c < 1) && l.addEventListener("selectionchange", pf), Ys.set(l, (c || 0) + 1), a.__lexicalEditor = u;
          const d = hf(a);
          for (let f = 0; f < wa.length; f++) {
            const [g, h] = wa[f], p = typeof h == "function" ? (m) => {
              Fl(m) || (Ll(m), (u.isEditable() || g === "click") && h(m, u));
            } : (m) => {
              if (Fl(m)) return;
              Ll(m);
              const _ = u.isEditable();
              switch (g) {
                case "cut":
                  return _ && j(u, jn, m);
                case "copy":
                  return j(u, Wr, m);
                case "paste":
                  return _ && j(u, Gi, m);
                case "dragstart":
                  return _ && j(u, sf, m);
                case "dragover":
                  return _ && j(u, of, m);
                case "dragend":
                  return _ && j(u, wm, m);
                case "focus":
                  return _ && j(u, Sm, m);
                case "blur":
                  return _ && j(u, Nm, m);
                case "drop":
                  return _ && j(u, nf, m);
              }
            };
            a.addEventListener(g, p), d.push(() => {
              a.removeEventListener(g, p);
            });
          }
        }(e, this), n != null && e.classList.add(...n);
      } else this._window = null, this._updateTags.add("history-merge"), Wt(this);
      vi("root", this, !1, e, r);
    }
  }
  getElementByKey(e) {
    return this._keyToDOMMap.get(e) || null;
  }
  getEditorState() {
    return this._editorState;
  }
  setEditorState(e, r) {
    e.isEmpty() && O(38);
    let n = e;
    n._readOnly && (n = Df(e), n._selection = e._selection ? e._selection.clone() : null), $d(this);
    const i = this._pendingEditorState, s = this._updateTags, o = r !== void 0 ? r.tag : null;
    i === null || i.isEmpty() || (o != null && s.add(o), Wt(this)), this._pendingEditorState = n, this._dirtyType = An, this._dirtyElements.set("root", !1), this._compositionKey = null, o != null && s.add(o), this._updating || Wt(this);
  }
  parseEditorState(e, r) {
    return function(n, i, s) {
      const o = bu(), a = Me, u = Je, l = Se, c = i._dirtyElements, d = i._dirtyLeaves, f = i._cloneNotNeeded, g = i._dirtyType;
      i._dirtyElements = /* @__PURE__ */ new Map(), i._dirtyLeaves = /* @__PURE__ */ new Set(), i._cloneNotNeeded = /* @__PURE__ */ new Set(), i._dirtyType = 0, Me = o, Je = !1, Se = i;
      try {
        const h = i._nodes;
        _u(n.root, h), s && s(), o._readOnly = !0;
      } catch (h) {
        h instanceof Error && i._onError(h);
      } finally {
        i._dirtyElements = c, i._dirtyLeaves = d, i._cloneNotNeeded = f, i._dirtyType = g, Me = a, Je = u, Se = l;
      }
      return o;
    }(typeof e == "string" ? JSON.parse(e) : e, this, r);
  }
  read(e) {
    return Wt(this), this.getEditorState().read(e, { editor: this });
  }
  update(e, r) {
    (function(n, i, s) {
      n._updating ? n._updates.push([i, s]) : vu(n, i, s);
    })(this, e, r);
  }
  focus(e, r = {}) {
    const n = this._rootElement;
    n !== null && (n.setAttribute("autocapitalize", "off"), it(this, () => {
      const i = B(), s = pe();
      i !== null ? i.dirty = !0 : s.getChildrenSize() !== 0 && (r.defaultSelection === "rootStart" ? s.selectStart() : s.selectEnd()), t2("focus"), r2(() => {
        n.removeAttribute("autocapitalize"), e && e();
      });
    }), this._pendingEditorState === null && n.removeAttribute("autocapitalize"));
  }
  blur() {
    const e = this._rootElement;
    e !== null && e.blur();
    const r = gt(this._window);
    r !== null && r.removeAllRanges();
  }
  isEditable() {
    return this._editable;
  }
  setEditable(e) {
    this._editable !== e && (this._editable = e, vi("editable", this, !0, e));
  }
  toJSON() {
    return { editorState: this._editorState.toJSON() };
  }
}
bo.version = "0.27.2+prod.esm";
let Gm = 1;
const Ym = typeof queueMicrotask == "function" ? queueMicrotask : (t) => {
  Promise.resolve().then(t);
};
function Cu(t) {
  const e = document.activeElement;
  if (!Ae(e)) return !1;
  const r = e.nodeName;
  return le(Dn(t)) && (r === "INPUT" || r === "TEXTAREA" || e.contentEditable === "true" && Eo(e) == null);
}
function ns(t, e, r) {
  const n = t.getRootElement();
  try {
    return n !== null && n.contains(e) && n.contains(r) && e !== null && !Cu(e) && Mf(e) === t;
  } catch {
    return !1;
  }
}
function Tu(t) {
  return t instanceof bo;
}
function Mf(t) {
  let e = t;
  for (; e != null; ) {
    const r = Eo(e);
    if (Tu(r)) return r;
    e = is(e);
  }
  return null;
}
function Eo(t) {
  return t ? t.__lexicalEditor : null;
}
function hn(t) {
  return t.isToken() || t.isSegmented();
}
function Xt(t) {
  return Kr(t) && t.nodeType === Yg;
}
function Xm(t) {
  return Kr(t) && t.nodeType === Xg;
}
function wn(t) {
  let e = t;
  for (; e != null; ) {
    if (Xt(e)) return e;
    e = e.firstChild;
  }
  return null;
}
function Zs(t, e, r) {
  const n = Ve[e];
  if (r !== null && (t & n) == (r & n)) return t;
  let i = t ^ n;
  return e === "subscript" ? i &= ~Ve.superscript : e === "superscript" ? i &= ~Ve.subscript : e === "lowercase" ? (i &= ~Ve.uppercase, i &= ~Ve.capitalize) : e === "uppercase" ? (i &= ~Ve.lowercase, i &= ~Ve.capitalize) : e === "capitalize" && (i &= ~Ve.lowercase, i &= ~Ve.uppercase), i;
}
function Qm(t, e) {
  if (e != null) return void (t.__key = e);
  Fe(), Cf();
  const r = ye(), n = hr(), i = "" + Gm++;
  n._nodeMap.set(i, t), S(t) ? r._dirtyElements.set(i, !0) : r._dirtyLeaves.add(i), r._cloneNotNeeded.add(i), r._dirtyType = Ld, t.__key = i;
}
function Dr(t) {
  const e = t.getParent();
  if (e !== null) {
    const r = t.getWritable(), n = e.getWritable(), i = t.getPreviousSibling(), s = t.getNextSibling();
    if (i === null) if (s !== null) {
      const o = s.getWritable();
      n.__first = s.__key, o.__prev = null;
    } else n.__first = null;
    else {
      const o = i.getWritable();
      if (s !== null) {
        const a = s.getWritable();
        a.__prev = o.__key, o.__next = a.__key;
      } else o.__next = null;
      r.__prev = null;
    }
    if (s === null) if (i !== null) {
      const o = i.getWritable();
      n.__last = i.__key, o.__next = null;
    } else n.__last = null;
    else {
      const o = s.getWritable();
      if (i !== null) {
        const a = i.getWritable();
        a.__next = o.__key, o.__prev = a.__key;
      } else o.__prev = null;
      r.__next = null;
    }
    n.__size--, r.__parent = null;
  }
}
function eo(t) {
  Cf();
  const e = t.getLatest(), r = e.__parent, n = hr(), i = ye(), s = n._nodeMap, o = i._dirtyElements;
  r !== null && function(u, l, c) {
    let d = u;
    for (; d !== null; ) {
      if (c.has(d)) return;
      const f = l.get(d);
      if (f === void 0) break;
      c.set(d, !1), d = f.__parent;
    }
  }(r, s, o);
  const a = e.__key;
  i._dirtyType = Ld, S(t) ? o.set(a, !0) : i._dirtyLeaves.add(a);
}
function Pe(t) {
  Fe();
  const e = ye(), r = e._compositionKey;
  if (t !== r) {
    if (e._compositionKey = t, r !== null) {
      const n = ge(r);
      n !== null && n.getWritable();
    }
    if (t !== null) {
      const n = ge(t);
      n !== null && n.getWritable();
    }
  }
}
function nr() {
  return ts() ? null : ye()._compositionKey;
}
function ge(t, e) {
  const r = (e || hr())._nodeMap.get(t);
  return r === void 0 ? null : r;
}
function Of(t, e) {
  const r = xo(t, ye());
  return r !== void 0 ? ge(r, e) : null;
}
function xo(t, e) {
  return t[`__lexicalKey_${e._key}`];
}
function Dn(t, e) {
  let r = t;
  for (; r != null; ) {
    const n = Of(r, e);
    if (n !== null) return n;
    r = is(r);
  }
  return null;
}
function If(t) {
  const e = t._decorators, r = Object.assign({}, e);
  return t._pendingDecorators = r, r;
}
function nc(t) {
  return t.read(() => pe().getTextContent());
}
function pe() {
  return Rf(hr());
}
function Rf(t) {
  return t._nodeMap.get("root");
}
function et(t) {
  Fe();
  const e = hr();
  t !== null && (t.dirty = !0, t.setCachedNodes(null)), e._selection = t;
}
function gn(t) {
  const e = ye(), r = function(n, i) {
    let s = n;
    for (; s != null; ) {
      const o = xo(s, i);
      if (o !== void 0) return o;
      s = is(s);
    }
    return null;
  }(t, e);
  return r === null ? t === e.getRootElement() ? ge("root") : null : ge(r);
}
function ic(t, e) {
  return e ? t.getTextContentSize() : 0;
}
function Pf(t) {
  return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(t);
}
function ku(t) {
  const e = [];
  let r = t;
  for (; r !== null; ) e.push(r), r = r._parentEditor;
  return e;
}
function Lf() {
  return Math.random().toString(36).replace(/[^a-z]+/g, "").substring(0, 5);
}
function Ff(t) {
  return Xt(t) ? t.nodeValue : null;
}
function Au(t, e, r) {
  const n = gt(at(e));
  if (n === null) return;
  const i = n.anchorNode;
  let { anchorOffset: s, focusOffset: o } = n;
  if (i !== null) {
    let a = Ff(i);
    const u = Dn(i);
    if (a !== null && F(u)) {
      if (a === fo && r) {
        const l = r.length;
        a = r, s = l, o = l;
      }
      a !== null && wu(u, a, s, o, t);
    }
  }
}
function wu(t, e, r, n, i) {
  let s = t;
  if (s.isAttached() && (i || !s.isDirty())) {
    const o = s.isComposing();
    let a = e;
    (o || i) && e[e.length - 1] === fo && (a = e.slice(0, -1));
    const u = s.getTextContent();
    if (i || a !== u) {
      if (a === "") {
        if (Pe(null), Ai || kn || $s) s.remove();
        else {
          const p = ye();
          setTimeout(() => {
            p.update(() => {
              s.isAttached() && s.remove();
            });
          }, 20);
        }
        return;
      }
      const l = s.getParent(), c = es(), d = s.getTextContentSize(), f = nr(), g = s.getKey();
      if (s.isToken() || f !== null && g === f && !o || R(c) && (l !== null && !l.canInsertTextBefore() && c.anchor.offset === 0 || c.anchor.key === t.__key && c.anchor.offset === 0 && !s.canInsertTextBefore() && !o || c.focus.key === t.__key && c.focus.offset === d && !s.canInsertTextAfter() && !o)) return void s.markDirty();
      const h = B();
      if (!R(h) || r === null || n === null) return void s.setTextContent(a);
      if (h.setTextNodeRange(s, r, s, n), s.isSegmented()) {
        const p = Re(s.getTextContent());
        s.replace(p), s = p;
      }
      s.setTextContent(a);
    }
  }
}
function sc(t) {
  return t === "ArrowLeft";
}
function oc(t) {
  return t === "ArrowRight";
}
function fi(t, e) {
  return ct ? t : e;
}
function ac(t) {
  return t === "Enter";
}
function on(t) {
  return t === "Backspace";
}
function ii(t) {
  return t === "Delete";
}
function uc(t, e, r) {
  return t.toLowerCase() === "a" && fi(e, r);
}
function Zm(t) {
  const e = pe();
  if (R(t)) {
    const r = t.anchor, n = t.focus, i = r.getNode().getTopLevelElementOrThrow().getParentOrThrow();
    return r.set(i.getKey(), 0, "element"), n.set(i.getKey(), i.getChildrenSize(), "element"), Hs(t), t;
  }
  {
    const r = e.select(0, e.getChildrenSize());
    return et(Hs(r)), r;
  }
}
function bn(t, e) {
  t.__lexicalClassNameCache === void 0 && (t.__lexicalClassNameCache = {});
  const r = t.__lexicalClassNameCache, n = r[e];
  if (n !== void 0) return n;
  const i = t[e];
  if (typeof i == "string") {
    const s = Us(i);
    return r[e] = s, s;
  }
  return i;
}
function Du(t, e, r, n, i) {
  if (r.size === 0) return;
  const s = n.__type, o = n.__key, a = e.get(s);
  a === void 0 && O(33, s);
  const u = a.klass;
  let l = t.get(u);
  l === void 0 && (l = /* @__PURE__ */ new Map(), t.set(u, l));
  const c = l.get(o), d = c === "destroyed" && i === "created";
  (c === void 0 || d) && l.set(o, d ? "updated" : i);
}
function lc(t, e, r) {
  const n = t.getParent();
  let i = r, s = t;
  return n !== null && (e && r === 0 ? (i = s.getIndexWithinParent(), s = n) : e || r !== s.getChildrenSize() || (i = s.getIndexWithinParent() + 1, s = n)), s.getChildAtIndex(e ? i - 1 : i);
}
function Pa(t, e) {
  const r = t.offset;
  if (t.type === "element")
    return lc(t.getNode(), e, r);
  {
    const n = t.getNode();
    if (e && r === 0 || !e && r === n.getTextContentSize()) {
      const i = e ? n.getPreviousSibling() : n.getNextSibling();
      return i === null ? lc(n.getParentOrThrow(), e, n.getIndexWithinParent() + (e ? 0 : 1)) : i;
    }
  }
  return null;
}
function qf(t) {
  const e = at(t).event, r = e && e.inputType;
  return r === "insertFromPaste" || r === "insertFromPasteAsQuotation";
}
function j(t, e, r) {
  return wf(t, e, r);
}
function Co(t) {
  return !qe(t) && !t.isLastChild() && !t.isInline();
}
function Sn(t, e) {
  const r = t._keyToDOMMap.get(e);
  return r === void 0 && O(75, e), r;
}
function is(t) {
  const e = t.assignedSlot || t.parentElement;
  return qa(e) ? e.host : e;
}
function Bf(t) {
  return Xm(t) ? t : Ae(t) ? t.ownerDocument : null;
}
function e2(t) {
  return ye()._updateTags.has(t);
}
function t2(t) {
  Fe(), ye()._updateTags.add(t);
}
function r2(t) {
  Fe(), ye()._deferred.push(t);
}
function La(t, e) {
  let r = t.getParent();
  for (; r !== null; ) {
    if (r.is(e)) return !0;
    r = r.getParent();
  }
  return !1;
}
function Su(t) {
  const e = Bf(t);
  return e ? e.defaultView : null;
}
function at(t) {
  const e = t._window;
  return e === null && O(78), e;
}
function n2(t) {
  let e = t.getParentOrThrow();
  for (; e !== null; ) {
    if (Qt(e)) return e;
    e = e.getParentOrThrow();
  }
  return e;
}
function Qt(t) {
  return qe(t) || S(t) && t.isShadowRoot();
}
function ke(t) {
  const e = ye(), r = t.constructor.getType(), n = e._nodes.get(r);
  n === void 0 && O(200, t.constructor.name, r);
  const { replace: i, replaceWithKlass: s } = n;
  if (i !== null) {
    const o = i(t), a = o.constructor;
    return s !== null ? o instanceof s || O(201, s.name, s.getType(), a.name, a.getType(), t.constructor.name, r) : o instanceof t.constructor && a !== t.constructor || O(202, a.name, a.getType(), t.constructor.name, r), o.__key === t.__key && O(203, t.constructor.name, r, a.name, a.getType()), o;
  }
  return t;
}
function ia(t, e) {
  !qe(t.getParent()) || S(e) || le(e) || O(99);
}
function i2(t) {
  const e = ge(t);
  return e === null && O(63, t), e;
}
function sa(t) {
  return (le(t) || S(t) && !t.canBeEmpty()) && !t.isInline();
}
function Fa(t, e, r) {
  r.style.removeProperty("caret-color"), e._blockCursorElement = null;
  const n = t.parentElement;
  n !== null && n.removeChild(t);
}
function gt(t) {
  return Et ? (t || window).getSelection() : null;
}
function s2(t) {
  const e = Su(t);
  return e ? e.getSelection() : null;
}
function Ae(t) {
  return Kr(t) && t.nodeType === Gg;
}
function Kr(t) {
  return typeof t == "object" && t !== null && "nodeType" in t && typeof t.nodeType == "number";
}
function qa(t) {
  return Kr(t) && t.nodeType === Qg;
}
function Ba(t) {
  const e = new RegExp(/^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|mark|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var|#text)$/, "i");
  return t.nodeName.match(e) !== null;
}
function to(t) {
  const e = new RegExp(/^(address|article|aside|blockquote|canvas|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hr|li|main|nav|noscript|ol|p|pre|section|table|td|tfoot|ul|video)$/, "i");
  return t.nodeName.match(e) !== null;
}
function tr(t) {
  if (le(t) && !t.isInline()) return !0;
  if (!S(t) || Qt(t)) return !1;
  const e = t.getFirstChild(), r = e === null || _i(e) || F(e) || e.isInline();
  return !t.isInline() && t.canBeEmpty() !== !1 && r;
}
function oa(t, e) {
  let r = t;
  for (; r !== null && r.getParent() !== null && !e(r); ) r = r.getParentOrThrow();
  return e(r) ? r : null;
}
function o2() {
  return ye();
}
const cc = /* @__PURE__ */ new WeakMap(), a2 = /* @__PURE__ */ new Map();
function dc(t) {
  if (!t._readOnly && t.isEmpty()) return a2;
  t._readOnly || O(192);
  let e = cc.get(t);
  return e || (e = function(r) {
    const n = /* @__PURE__ */ new Map();
    for (const [i, s] of r._nodeMap) {
      const o = s.__type;
      let a = n.get(o);
      a || (a = /* @__PURE__ */ new Map(), n.set(o, a)), a.set(i, s);
    }
    return n;
  }(t), cc.set(t, e)), e;
}
function Nu(t) {
  const e = t.constructor.clone(t);
  return e.afterCloneFrom(t), e;
}
function u2(t, e) {
  const r = (parseInt(t.style.paddingInlineStart, 10) || 0) / 40;
  e.setIndent(r);
}
function l2(t) {
  return t.__lexicalUnmanaged === !0;
}
const c2 = { next: "previous", previous: "next" };
class Mu {
  constructor(e) {
    this.origin = e;
  }
  [Symbol.iterator]() {
    return Pu({ hasNext: Nn, initial: this.getAdjacentCaret(), map: (e) => e, step: (e) => e.getAdjacentCaret() });
  }
  getAdjacentCaret() {
    return Oe(this.getNodeAtCaret(), this.direction);
  }
  getSiblingCaret() {
    return Oe(this.origin, this.direction);
  }
  remove() {
    const e = this.getNodeAtCaret();
    return e && e.remove(), this;
  }
  replaceOrInsert(e, r) {
    const n = this.getNodeAtCaret();
    return e.is(this.origin) || e.is(n) || (n === null ? this.insert(e) : n.replace(e, r)), this;
  }
  splice(e, r, n = "next") {
    const i = n === this.direction ? r : Array.from(r).reverse();
    let s = this;
    const o = this.getParentAtCaret(), a = /* @__PURE__ */ new Map();
    for (let u = s.getAdjacentCaret(); u !== null && a.size < e; u = u.getAdjacentCaret()) {
      const l = u.origin.getWritable();
      a.set(l.getKey(), l);
    }
    for (const u of i) {
      if (a.size > 0) {
        const l = s.getNodeAtCaret();
        if (l) {
          if (a.delete(l.getKey()), a.delete(u.getKey()), !(l.is(u) || s.origin.is(u))) {
            const c = u.getParent();
            c && c.is(o) && u.remove(), l.replace(u);
          }
        } else l === null && O(263, Array.from(a).join(" "));
      } else s.insert(u);
      s = Oe(u, this.direction);
    }
    for (const u of a.values()) u.remove();
    return this;
  }
}
class Ii extends Mu {
  constructor() {
    super(...arguments);
    $(this, "type", "child");
  }
  getLatest() {
    const r = this.origin.getLatest();
    return r === this.origin ? this : Jt(r, this.direction);
  }
  getParentCaret(r = "root") {
    return Oe(Ou(this.getParentAtCaret(), r), this.direction);
  }
  getFlipped() {
    const r = Un(this.direction);
    return Oe(this.getNodeAtCaret(), r) || Jt(this.origin, r);
  }
  getParentAtCaret() {
    return this.origin;
  }
  getChildCaret() {
    return this;
  }
  isSameNodeCaret(r) {
    return r instanceof Ii && this.direction === r.direction && this.origin.is(r.origin);
  }
  isSamePointCaret(r) {
    return this.isSameNodeCaret(r);
  }
}
const d2 = { root: qe, shadowRoot: Qt };
function Un(t) {
  return c2[t];
}
function Ou(t, e = "root") {
  return d2[e](t) ? null : t;
}
class Pr extends Mu {
  constructor() {
    super(...arguments);
    $(this, "type", "sibling");
  }
  getLatest() {
    const r = this.origin.getLatest();
    return r === this.origin ? this : Oe(r, this.direction);
  }
  getSiblingCaret() {
    return this;
  }
  getParentAtCaret() {
    return this.origin.getParent();
  }
  getChildCaret() {
    return S(this.origin) ? Jt(this.origin, this.direction) : null;
  }
  getParentCaret(r = "root") {
    return Oe(Ou(this.getParentAtCaret(), r), this.direction);
  }
  getFlipped() {
    const r = Un(this.direction);
    return Oe(this.getNodeAtCaret(), r) || Jt(this.origin.getParentOrThrow(), r);
  }
  isSamePointCaret(r) {
    return r instanceof Pr && this.direction === r.direction && this.origin.is(r.origin);
  }
  isSameNodeCaret(r) {
    return (r instanceof Pr || r instanceof Lr) && this.direction === r.direction && this.origin.is(r.origin);
  }
}
class Lr extends Mu {
  constructor(r, n) {
    super(r);
    $(this, "type", "text");
    this.offset = n;
  }
  getLatest() {
    const r = this.origin.getLatest();
    return r === this.origin ? this : Fr(r, this.direction, this.offset);
  }
  getParentAtCaret() {
    return this.origin.getParent();
  }
  getChildCaret() {
    return null;
  }
  getParentCaret(r = "root") {
    return Oe(Ou(this.getParentAtCaret(), r), this.direction);
  }
  getFlipped() {
    return Fr(this.origin, Un(this.direction), this.offset);
  }
  isSamePointCaret(r) {
    return r instanceof Lr && this.direction === r.direction && this.origin.is(r.origin) && this.offset === r.offset;
  }
  isSameNodeCaret(r) {
    return (r instanceof Pr || r instanceof Lr) && this.direction === r.direction && this.origin.is(r.origin);
  }
  getSiblingCaret() {
    return Oe(this.origin, this.direction);
  }
}
function Sr(t) {
  return t instanceof Lr;
}
function Nn(t) {
  return t instanceof Pr;
}
function pt(t) {
  return t instanceof Ii;
}
const f2 = { next: class extends Lr {
  constructor() {
    super(...arguments);
    $(this, "direction", "next");
  }
  getNodeAtCaret() {
    return this.origin.getNextSibling();
  }
  insert(e) {
    return this.origin.insertAfter(e), this;
  }
}, previous: class extends Lr {
  constructor() {
    super(...arguments);
    $(this, "direction", "previous");
  }
  getNodeAtCaret() {
    return this.origin.getPreviousSibling();
  }
  insert(e) {
    return this.origin.insertBefore(e), this;
  }
} }, h2 = { next: class extends Pr {
  constructor() {
    super(...arguments);
    $(this, "direction", "next");
  }
  getNodeAtCaret() {
    return this.origin.getNextSibling();
  }
  insert(e) {
    return this.origin.insertAfter(e), this;
  }
}, previous: class extends Pr {
  constructor() {
    super(...arguments);
    $(this, "direction", "previous");
  }
  getNodeAtCaret() {
    return this.origin.getPreviousSibling();
  }
  insert(e) {
    return this.origin.insertBefore(e), this;
  }
} }, p2 = { next: class extends Ii {
  constructor() {
    super(...arguments);
    $(this, "direction", "next");
  }
  getNodeAtCaret() {
    return this.origin.getFirstChild();
  }
  insert(e) {
    return this.origin.splice(0, 0, [e]), this;
  }
}, previous: class extends Ii {
  constructor() {
    super(...arguments);
    $(this, "direction", "previous");
  }
  getNodeAtCaret() {
    return this.origin.getLastChild();
  }
  insert(e) {
    return this.origin.splice(this.origin.getChildrenSize(), 0, [e]), this;
  }
} };
function Oe(t, e) {
  return t ? new h2[e](t) : null;
}
function Fr(t, e, r) {
  return t ? new f2[e](t, To(t, r)) : null;
}
function To(t, e) {
  const r = t.getTextContentSize(), n = e === "next" ? r : e === "previous" ? 0 : e;
  return n >= 0 && n <= r || O(274, String(e), String(r)), n;
}
function fc(t, e) {
  return new g2(t, e);
}
function Jt(t, e) {
  return S(t) ? new p2[e](t) : null;
}
function jf(t) {
  return t && t.getChildCaret() || t;
}
function Mn(t) {
  return t && jf(t.getAdjacentCaret());
}
class Iu {
  constructor(e, r, n) {
    $(this, "type", "node-caret-range");
    this.anchor = e, this.focus = r, this.direction = n;
  }
  getLatest() {
    const e = this.anchor.getLatest(), r = this.focus.getLatest();
    return e === this.anchor && r === this.focus ? this : new Iu(e, r, this.direction);
  }
  isCollapsed() {
    return this.anchor.isSamePointCaret(this.focus);
  }
  getTextSlices() {
    const e = (i) => {
      const s = this[i].getLatest();
      return Sr(s) ? function(o, a) {
        const { direction: u, origin: l } = o, c = To(l, a === "focus" ? Un(u) : u);
        return fc(o, c - o.offset);
      }(s, i) : null;
    }, r = e("anchor"), n = e("focus");
    if (r && n) {
      const { caret: i } = r, { caret: s } = n;
      if (i.isSameNodeCaret(s)) return [fc(i, s.offset - i.offset), null];
    }
    return [r, n];
  }
  iterNodeCarets(e = "root") {
    const r = Sr(this.anchor) ? this.anchor.getSiblingCaret() : this.anchor.getLatest(), n = this.focus.getLatest(), i = Sr(n), s = (o) => o.isSameNodeCaret(n) ? null : Mn(o) || o.getParentCaret(e);
    return Pu({ hasNext: (o) => o !== null && !(i && n.isSameNodeCaret(o)), initial: r.isSameNodeCaret(n) ? null : s(r), map: (o) => o, step: s });
  }
  [Symbol.iterator]() {
    return this.iterNodeCarets("root");
  }
}
class g2 {
  constructor(e, r) {
    $(this, "type", "slice");
    this.caret = e, this.distance = r;
  }
  getSliceIndices() {
    const { distance: e, caret: { offset: r } } = this, n = r + e;
    return n < r ? [n, r] : [r, n];
  }
  getTextContent() {
    const [e, r] = this.getSliceIndices();
    return this.caret.origin.getTextContent().slice(e, r);
  }
  getTextContentSize() {
    return Math.abs(this.distance);
  }
  removeTextSlice() {
    const { caret: { origin: e, direction: r } } = this, [n, i] = this.getSliceIndices(), s = e.getTextContent();
    return Fr(e.setTextContent(s.slice(0, n) + s.slice(i)), r, n);
  }
}
function Ru(t) {
  return On(t, Oe(pe(), t.direction));
}
function On(t, e) {
  return t.direction !== e.direction && O(265), new Iu(t, e, t.direction);
}
function Pu(t) {
  const { initial: e, hasNext: r, step: n, map: i } = t;
  let s = e;
  return { [Symbol.iterator]() {
    return this;
  }, next() {
    if (!r(s)) return { done: !0, value: void 0 };
    const o = { done: !1, value: i(s) };
    return s = n(s), o;
  } };
}
function $f(t, e) {
  const r = Ei(t.origin, e.origin);
  switch (r === null && O(275, t.origin.getKey(), e.origin.getKey()), r.type) {
    case "same": {
      const n = t.type === "text", i = e.type === "text";
      return n && i ? function(s, o) {
        return Math.sign(s - o);
      }(t.offset, e.offset) : t.type === e.type ? 0 : n ? -1 : i ? 1 : t.type === "child" ? -1 : 1;
    }
    case "ancestor":
      return t.type === "child" ? -1 : 1;
    case "descendant":
      return e.type === "child" ? 1 : -1;
    case "branch":
      return Uf(r);
  }
}
function Uf(t) {
  const { a: e, b: r } = t, n = e.__key, i = r.__key;
  let s = e, o = r;
  for (; s && o; s = s.getNextSibling(), o = o.getNextSibling()) {
    if (s.__key === i) return -1;
    if (o.__key === n) return 1;
  }
  return s === null ? 1 : -1;
}
function vs(t, e) {
  return e.is(t);
}
function hc(t) {
  return S(t) ? [t.getLatest(), null] : [t.getParent(), t.getLatest()];
}
function Ei(t, e) {
  if (t.is(e)) return { commonAncestor: t, type: "same" };
  const r = /* @__PURE__ */ new Map();
  for (let [n, i] = hc(t); n; i = n, n = n.getParent()) r.set(n, i);
  for (let [n, i] = hc(e); n; i = n, n = n.getParent()) {
    const s = r.get(n);
    if (s !== void 0) return s === null ? (vs(t, n) || O(276), { commonAncestor: n, type: "ancestor" }) : i === null ? (vs(e, n) || O(277), { commonAncestor: n, type: "descendant" }) : ((S(s) || vs(t, s)) && (S(i) || vs(e, i)) && n.is(s.getParent()) && n.is(i.getParent()) || O(278), { a: s, b: i, commonAncestor: n, type: "branch" });
  }
  return null;
}
function ar(t, e) {
  const { type: r, key: n, offset: i } = t, s = i2(t.key);
  return r === "text" ? (F(s) || O(266, s.getType(), n), Fr(s, e, i)) : (S(s) || O(267, s.getType(), n), y2(s, t.offset, e));
}
function Ri(t, e) {
  const { origin: r, direction: n } = e, i = n === "next";
  Sr(e) ? t.set(r.getKey(), e.offset, "text") : Nn(e) ? F(r) ? t.set(r.getKey(), To(r, n), "text") : t.set(r.getParentOrThrow().getKey(), r.getIndexWithinParent() + (i ? 1 : 0), "element") : (pt(e) && S(r) || O(268), t.set(r.getKey(), i ? 0 : r.getChildrenSize(), "element"));
}
function aa(t, e) {
  Ri(t.anchor, e.anchor), Ri(t.focus, e.focus);
}
function pc(t) {
  const { anchor: e, focus: r } = t, n = ar(e, "next"), i = ar(r, "next"), s = $f(n, i) <= 0 ? "next" : "previous";
  return On(In(n, s), In(i, s));
}
function Lu(t) {
  const { direction: e, origin: r } = t, n = Oe(r, Un(e)).getNodeAtCaret();
  return n ? Oe(n, e) : Jt(r.getParentOrThrow(), e);
}
function gc(t, e = "root") {
  const r = [t];
  for (let n = pt(t) ? t.getParentCaret(e) : t.getSiblingCaret(); n !== null; n = n.getParentCaret(e)) r.push(Lu(n));
  return r;
}
function ua(t) {
  return !!t && t.origin.isAttached();
}
function m2(t, e = "removeEmptySlices") {
  if (t.isCollapsed()) return t;
  const r = "root", n = "next";
  let i = e;
  const s = Wf(t, n), o = gc(s.anchor, r), a = gc(s.focus.getFlipped(), r), u = /* @__PURE__ */ new Set(), l = [];
  for (const h of s.iterNodeCarets(r)) if (pt(h)) u.add(h.origin.getKey());
  else if (Nn(h)) {
    const { origin: p } = h;
    S(p) && !u.has(p.getKey()) || l.push(p);
  }
  for (const h of l) h.remove();
  for (const h of s.getTextSlices()) {
    if (!h) continue;
    const { origin: p } = h.caret, m = p.getTextContentSize(), _ = Lu(Oe(p, n)), y = p.getMode();
    if (Math.abs(h.distance) === m && i === "removeEmptySlices" || y === "token" && h.distance !== 0) _.remove();
    else if (h.distance !== 0) {
      i = "removeEmptySlices";
      let v = h.removeTextSlice();
      const C = h.caret.origin;
      if (y === "segmented") {
        const T = v.origin, k = Re(T.getTextContent()).setStyle(T.getStyle()).setFormat(T.getFormat());
        _.replaceOrInsert(k), v = Fr(k, n, v.offset);
      }
      C.is(o[0].origin) && (o[0] = v), C.is(a[0].origin) && (a[0] = v.getFlipped());
    }
  }
  let c, d;
  for (const h of o) if (ua(h)) {
    c = St(h);
    break;
  }
  for (const h of a) if (ua(h)) {
    d = St(h);
    break;
  }
  const f = function(h, p, m) {
    if (!h || !p) return null;
    const _ = h.getParentAtCaret(), y = p.getParentAtCaret();
    if (!_ || !y) return null;
    const v = _.getParents().reverse();
    v.push(_);
    const C = y.getParents().reverse();
    C.push(y);
    const T = Math.min(v.length, C.length);
    let k;
    for (k = 0; k < T && v[k] === C[k]; k++) ;
    const N = (L, W) => {
      let U;
      for (let M = k; M < L.length; M++) {
        const P = L[M];
        if (Qt(P)) return;
        !U && W(P) && (U = P);
      }
      return U;
    }, A = N(v, tr), D = A && N(C, (L) => m.has(L.getKey()) && tr(L));
    return A && D ? [A, D] : null;
  }(c, d, u);
  if (f) {
    const [h, p] = f;
    Jt(h, "previous").splice(0, p.getChildren()), p.remove();
  }
  const g = [c, d, ...o, ...a].find(ua);
  if (g) {
    const h = In(St(g), t.direction);
    return On(h, h);
  }
  O(269, JSON.stringify(o.map((h) => h.origin.__key)));
}
function St(t) {
  const e = function(i) {
    let s = i;
    for (; pt(s); ) {
      const o = Mn(s);
      if (!pt(o)) break;
      s = o;
    }
    return s;
  }(t.getLatest()), { direction: r } = e;
  if (F(e.origin)) return Sr(e) ? e : Fr(e.origin, r, r);
  const n = e.getAdjacentCaret();
  return Nn(n) && F(n.origin) ? Fr(n.origin, r, Un(r)) : e;
}
function Vf(t) {
  return Sr(t) && t.offset !== To(t.origin, t.direction);
}
function In(t, e) {
  return t.direction === e ? t : t.getFlipped();
}
function Wf(t, e) {
  return t.direction === e ? t : On(In(t.focus, e), In(t.anchor, e));
}
function y2(t, e, r) {
  let n = Jt(t, "next");
  for (let i = 0; i < e; i++) {
    const s = n.getAdjacentCaret();
    if (s === null) break;
    n = s;
  }
  return In(n, r);
}
const Hf = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, _2 = Hf ? Vr : J, bs = { tag: "history-merge" };
function zf({ initialConfig: t, children: e }) {
  const r = Be(() => {
    const { theme: n, namespace: i, nodes: s, onError: o, editorState: a, html: u } = t, l = Hg(null, n), c = Jm({ editable: t.editable, html: u, namespace: i, nodes: s, onError: (d) => o(d, c), theme: n });
    return function(d, f) {
      if (f !== null) {
        if (f === void 0) d.update(() => {
          const g = pe();
          if (g.isEmpty()) {
            const h = Mt();
            g.append(h);
            const p = Hf ? document.activeElement : null;
            (B() !== null || p !== null && p === d.getRootElement()) && h.select();
          }
        }, bs);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const g = d.parseEditorState(f);
            d.setEditorState(g, bs);
            break;
          }
          case "object":
            d.setEditorState(f, bs);
            break;
          case "function":
            d.update(() => {
              pe().isEmpty() && f(d);
            }, bs);
        }
      }
    }(c, a), [c, l];
  }, []);
  return _2(() => {
    const n = t.editable, [i] = r;
    i.setEditable(n === void 0 || n);
  }, []), w.jsx(Rd.Provider, { value: r, children: e });
}
function v2() {
  return pe().getTextContent();
}
function b2(t, e = !0) {
  if (t) return !1;
  let r = v2();
  return e && (r = r.trim()), r === "";
}
function E2(t) {
  if (!b2(t, !1)) return !1;
  const e = pe().getChildren(), r = e.length;
  if (r > 1) return !1;
  for (let n = 0; n < r; n++) {
    const i = e[n];
    if (le(i)) return !1;
    if (S(i)) {
      if (!Km(i) || i.__indent !== 0) return !1;
      const s = i.getChildren(), o = s.length;
      for (let a = 0; a < o; a++) {
        const u = s[n];
        if (!F(u)) return !1;
      }
    }
  }
  return !0;
}
function Kf(t) {
  return () => E2(t);
}
const x2 = /* @__PURE__ */ new Map();
function C2(t) {
  const e = {};
  if (!t) return e;
  const r = t.split(";");
  for (const n of r) if (n !== "") {
    const [i, s] = n.split(/:([^]+)/);
    i && s && (e[i.trim()] = s.trim());
  }
  return e;
}
function Jf(t, e) {
  const r = t.getStartEndPoints();
  if (e.isSelected(t) && !e.isSegmented() && !e.isToken() && r !== null) {
    const [n, i] = r, s = t.isBackward(), o = n.getNode(), a = i.getNode(), u = e.is(o), l = e.is(a);
    if (u || l) {
      const [c, d] = Oa(t), f = o.is(a), g = e.is(s ? a : o), h = e.is(s ? o : a);
      let p, m = 0;
      return f ? (m = c > d ? d : c, p = c > d ? c : d) : g ? (m = s ? d : c, p = void 0) : h && (m = 0, p = s ? c : d), e.__text = e.__text.slice(m, p), e;
    }
  }
  return e;
}
function T2(t) {
  const e = t.getStyle(), r = C2(e);
  x2.set(e, r);
}
function mc(t, e) {
  const r = ar(t.focus, e ? "previous" : "next");
  if (Vf(r)) return !1;
  for (const n of Ru(r)) {
    if (pt(n)) return !n.origin.isInline();
    if (!S(n.origin)) {
      if (le(n.origin)) return !0;
      break;
    }
  }
  return !1;
}
function k2(t, e, r, n) {
  t.modify(e ? "extend" : "move", r, n);
}
function A2(t) {
  const e = t.anchor.getNode();
  return (qe(e) ? e : e.getParentOrThrow()).getDirection() === "rtl";
}
function yc(t, e, r) {
  const n = A2(t);
  k2(t, e, r ? !n : n, "character");
}
function w2(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const i of e) n.append("v", i);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ss = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, D2 = ss && "documentMode" in document ? document.documentMode : null, S2 = ss && /Mac|iPod|iPhone|iPad/.test(navigator.platform), N2 = ss && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
!(!ss || !("InputEvent" in window) || D2) && "getTargetRanges" in new window.InputEvent("input");
function Gf(...t) {
  const e = [];
  for (const r of t) if (r && typeof r == "string") for (const [n] of r.matchAll(/\S+/g)) e.push(n);
  return e;
}
function Pt(...t) {
  return () => {
    for (let e = t.length - 1; e >= 0; e--) t[e]();
    t.length = 0;
  };
}
const M2 = ss, Yf = S2, O2 = N2;
function Es(t, ...e) {
  const r = Gf(...e);
  r.length > 0 && t.classList.add(...r);
}
function _c(t, ...e) {
  const r = Gf(...e);
  r.length > 0 && t.classList.remove(...r);
}
function I2(t, e) {
  return Array.from(R2(t, e));
}
function R2(t, e) {
  return P2("next", t, e);
}
function P2(t, e, r) {
  const n = pe(), i = e || n, s = S(i) ? Jt(i, t) : Oe(i, t), o = L2(i), a = r ? Mn(jf(Oe(r, t))) : function(l, c) {
    const d = vc(Oe(l, c));
    return d && d[0];
  }(i, t);
  let u = o;
  return Pu({ hasNext: (l) => l !== null, initial: s, map: (l) => ({ depth: u, node: l.origin }), step: (l) => {
    if (l.isSameNodeCaret(a)) return null;
    pt(l) && u++;
    const c = vc(l);
    return !c || c[0].isSameNodeCaret(a) ? null : (u += c[1], c[0]);
  } });
}
function L2(t) {
  let e = -1;
  for (let r = t; r !== null; r = r.getParent()) e++;
  return e;
}
function F2(t) {
  const e = ko(t, (r) => S(r) && !r.isInline());
  return S(e) || w2(4, t.__key), e;
}
const ko = (t, e) => {
  let r = t;
  for (; r !== pe() && r != null; ) {
    if (e(r)) return r;
    r = r.getParent();
  }
  return null;
};
function Ar(t, e) {
  return t !== null && Object.getPrototypeOf(t).constructor.name === e.name;
}
let la = !(O2 || !M2) && void 0;
function q2(t) {
  let e = 1;
  if (function() {
    if (la === void 0) {
      const r = document.createElement("div");
      r.style.cssText = "position: absolute; opacity: 0; width: 100px; left: -1000px;", document.body.appendChild(r);
      const n = r.getBoundingClientRect();
      r.style.setProperty("zoom", "2"), la = r.getBoundingClientRect().width === n.width, document.body.removeChild(r);
    }
    return la;
  }()) for (; t; ) e *= Number(window.getComputedStyle(t).getPropertyValue("zoom")), t = t.parentElement;
  return e;
}
function vc(t, e = "root") {
  let r = 0, n = t, i = Mn(n);
  for (; i === null; ) {
    if (r--, i = n.getParentCaret(e), !i) return null;
    n = i, i = Mn(n);
  }
  return i && [i, r];
}
const Xf = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vr : J;
function B2({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: r, ariaControls: n, ariaDescribedBy: i, ariaErrorMessage: s, ariaExpanded: o, ariaInvalid: a, ariaLabel: u, ariaLabelledBy: l, ariaMultiline: c, ariaOwns: d, ariaRequired: f, autoCapitalize: g, className: h, id: p, role: m = "textbox", spellCheck: _ = !0, style: y, tabIndex: v, "data-testid": C, ...T }, k) {
  const [N, A] = se(t.isEditable()), D = me((W) => {
    W && W.ownerDocument && W.ownerDocument.defaultView ? t.setRootElement(W) : t.setRootElement(null);
  }, [t]), L = Be(() => /* @__PURE__ */ function(...W) {
    return (U) => {
      W.forEach((M) => {
        typeof M == "function" ? M(U) : M != null && (M.current = U);
      });
    };
  }(k, D), [D, k]);
  return Xf(() => (A(t.isEditable()), t.registerEditableListener((W) => {
    A(W);
  })), [t]), w.jsx("div", { "aria-activedescendant": N ? e : void 0, "aria-autocomplete": N ? r : "none", "aria-controls": N ? n : void 0, "aria-describedby": i, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": N && m === "combobox" ? !!o : void 0, ...a != null ? { "aria-invalid": a } : {}, "aria-label": u, "aria-labelledby": l, "aria-multiline": c, "aria-owns": N ? d : void 0, "aria-readonly": !N || void 0, "aria-required": f, autoCapitalize: g, className: h, contentEditable: N, "data-testid": C, id: p, ref: L, role: N ? m : void 0, spellCheck: _, style: y, tabIndex: v, ...T });
}
const j2 = Ji(B2);
function bc(t) {
  return t.getEditorState().read(Kf(t.isComposing()));
}
const Qf = Ji($2);
function $2(t, e) {
  const { placeholder: r, ...n } = t, [i] = be();
  return w.jsxs(w.Fragment, { children: [w.jsx(j2, { editor: i, ...n, ref: e }), r != null && w.jsx(U2, { editor: i, content: r })] });
}
function U2({ content: t, editor: e }) {
  const r = function(o) {
    const [a, u] = se(() => bc(o));
    return Xf(() => {
      function l() {
        const c = bc(o);
        u(c);
      }
      return l(), Pt(o.registerUpdateListener(() => {
        l();
      }), o.registerEditableListener(() => {
        l();
      }));
    }, [o]), a;
  }(e), [n, i] = se(e.isEditable());
  if (Vr(() => (i(e.isEditable()), e.registerEditableListener((o) => {
    i(o);
  })), [e]), !r) return null;
  let s = null;
  return typeof t == "function" ? s = t(n) : t !== null && (s = t), s === null ? null : w.jsx("div", { "aria-hidden": !0, children: s });
}
function ja(t, e) {
  return ja = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, ja(t, e);
}
var Ec = { error: null }, V2 = function(t) {
  var e, r;
  function n() {
    for (var s, o = arguments.length, a = new Array(o), u = 0; u < o; u++) a[u] = arguments[u];
    return (s = t.call.apply(t, [this].concat(a)) || this).state = Ec, s.resetErrorBoundary = function() {
      for (var l, c = arguments.length, d = new Array(c), f = 0; f < c; f++) d[f] = arguments[f];
      s.props.onReset == null || (l = s.props).onReset.apply(l, d), s.reset();
    }, s;
  }
  r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, ja(e, r), n.getDerivedStateFromError = function(s) {
    return { error: s };
  };
  var i = n.prototype;
  return i.reset = function() {
    this.setState(Ec);
  }, i.componentDidCatch = function(s, o) {
    var a, u;
    (a = (u = this.props).onError) == null || a.call(u, s, o);
  }, i.componentDidUpdate = function(s, o) {
    var a, u, l, c, d = this.state.error, f = this.props.resetKeys;
    d !== null && o.error !== null && ((l = s.resetKeys) === void 0 && (l = []), (c = f) === void 0 && (c = []), l.length !== c.length || l.some(function(g, h) {
      return !Object.is(g, c[h]);
    })) && ((a = (u = this.props).onResetKeysChange) == null || a.call(u, s.resetKeys, f), this.reset());
  }, i.render = function() {
    var s = this.state.error, o = this.props, a = o.fallbackRender, u = o.FallbackComponent, l = o.fallback;
    if (s !== null) {
      var c = { error: s, resetErrorBoundary: this.resetErrorBoundary };
      if (Os.isValidElement(l)) return l;
      if (typeof a == "function") return a(c);
      if (u) return Os.createElement(u, c);
      throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
    }
    return this.props.children;
  }, n;
}(Os.Component);
function W2({ children: t, onError: e }) {
  return w.jsx(V2, { fallback: w.jsx("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const xs = 0, $a = 1, Ua = 2, dt = 0, H2 = 1, xc = 2, z2 = 3, K2 = 4;
function J2(t, e, r, n, i) {
  if (t === null || r.size === 0 && n.size === 0 && !i) return dt;
  const s = e._selection, o = t._selection;
  if (i) return H2;
  if (!(R(s) && R(o) && o.isCollapsed() && s.isCollapsed())) return dt;
  const a = function(_, y, v) {
    const C = _._nodeMap, T = [];
    for (const k of y) {
      const N = C.get(k);
      N !== void 0 && T.push(N);
    }
    for (const [k, N] of v) {
      if (!N) continue;
      const A = C.get(k);
      A === void 0 || qe(A) || T.push(A);
    }
    return T;
  }(e, r, n);
  if (a.length === 0) return dt;
  if (a.length > 1) {
    const _ = e._nodeMap, y = _.get(s.anchor.key), v = _.get(o.anchor.key);
    return y && v && !t._nodeMap.has(y.__key) && F(y) && y.__text.length === 1 && s.anchor.offset === 1 ? xc : dt;
  }
  const u = a[0], l = t._nodeMap.get(u.__key);
  if (!F(l) || !F(u) || l.__mode !== u.__mode) return dt;
  const c = l.__text, d = u.__text;
  if (c === d) return dt;
  const f = s.anchor, g = o.anchor;
  if (f.key !== g.key || f.type !== "text") return dt;
  const h = f.offset, p = g.offset, m = d.length - c.length;
  return m === 1 && p === h - 1 ? xc : m === -1 && p === h + 1 ? z2 : m === -1 && p === h ? K2 : dt;
}
function G2(t, e) {
  let r = Date.now(), n = dt;
  return (i, s, o, a, u, l) => {
    const c = Date.now();
    if (l.has("historic")) return n = dt, r = c, Ua;
    const d = J2(i, s, a, u, t.isComposing()), f = (() => {
      const g = o === null || o.editor === t, h = l.has("history-push");
      if (!h && g && l.has("history-merge")) return xs;
      if (i === null) return $a;
      const p = s._selection;
      return a.size > 0 || u.size > 0 ? h === !1 && d !== dt && d === n && c < r + e && g || a.size === 1 && function(m, _, y) {
        const v = _._nodeMap.get(m), C = y._nodeMap.get(m), T = _._selection, k = y._selection;
        return !(R(T) && R(k) && T.anchor.type === "element" && T.focus.type === "element" && k.anchor.type === "text" && k.focus.type === "text" || !F(v) || !F(C) || v.__parent !== C.__parent) && JSON.stringify(_.read(() => v.exportJSON())) === JSON.stringify(y.read(() => C.exportJSON()));
      }(Array.from(a)[0], i, s) ? xs : $a : p !== null ? xs : Ua;
    })();
    return r = c, n = d, f;
  };
}
function Cc(t) {
  t.undoStack = [], t.redoStack = [], t.current = null;
}
function Y2(t, e, r) {
  const n = G2(t, r);
  return Pt(t.registerCommand(Yi, () => (function(s, o) {
    const a = o.redoStack, u = o.undoStack;
    if (u.length !== 0) {
      const l = o.current, c = u.pop();
      l !== null && (a.push(l), s.dispatchCommand(ci, !0)), u.length === 0 && s.dispatchCommand(di, !1), o.current = c || null, c && c.editor.setEditorState(c.editorState, { tag: "historic" });
    }
  }(t, e), !0), oe), t.registerCommand(Xi, () => (function(s, o) {
    const a = o.redoStack, u = o.undoStack;
    if (a.length !== 0) {
      const l = o.current;
      l !== null && (u.push(l), s.dispatchCommand(di, !0));
      const c = a.pop();
      a.length === 0 && s.dispatchCommand(ci, !1), o.current = c || null, c && c.editor.setEditorState(c.editorState, { tag: "historic" });
    }
  }(t, e), !0), oe), t.registerCommand(Dm, () => (Cc(e), !1), oe), t.registerCommand(af, () => (Cc(e), t.dispatchCommand(ci, !1), t.dispatchCommand(di, !1), !0), oe), t.registerUpdateListener(({ editorState: s, prevEditorState: o, dirtyLeaves: a, dirtyElements: u, tags: l }) => {
    const c = e.current, d = e.redoStack, f = e.undoStack, g = c === null ? null : c.editorState;
    if (c !== null && s === g) return;
    const h = n(o, s, c, a, u, l);
    if (h === $a) d.length !== 0 && (e.redoStack = [], t.dispatchCommand(ci, !1)), c !== null && (f.push({ ...c }), t.dispatchCommand(di, !0));
    else if (h === Ua) return;
    e.current = { editor: t, editorState: s };
  }));
}
function X2() {
  return { current: null, redoStack: [], undoStack: [] };
}
function Q2({ delay: t, externalHistoryState: e }) {
  const [r] = be();
  return function(n, i, s = 1e3) {
    const o = Be(() => i || X2(), [i]);
    J(() => Y2(n, o, s), [s, n, o]);
  }(r, e, t), null;
}
const Z2 = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vr : J;
function ey({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: r }) {
  const [n] = be();
  return Z2(() => {
    if (r) return n.registerUpdateListener(({ editorState: i, dirtyElements: s, dirtyLeaves: o, prevEditorState: a, tags: u }) => {
      e && s.size === 0 && o.size === 0 || t && u.has("history-merge") || a.isEmpty() || r(i, n, u);
    });
  }, [n, t, e, r]), null;
}
const ty = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vr : J;
function ry(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function ny() {
  return function(t) {
    const [e] = be(), r = Be(() => t(e), [e, t]), [n, i] = se(() => r.initialValueFn()), s = Le(n);
    return ty(() => {
      const { initialValueFn: o, subscribe: a } = r, u = o();
      return s.current !== u && (s.current = u, i(u)), a((l) => {
        s.current = l, i(l);
      });
    }, [r, t]), n;
  }(ry);
}
function iy(t) {
  const e = window.location.origin, r = (n) => {
    if (n.origin !== e) return;
    const i = t.getRootElement();
    if (document.activeElement !== i) return;
    const s = n.data;
    if (typeof s == "string") {
      let o;
      try {
        o = JSON.parse(s);
      } catch {
        return;
      }
      if (o && o.protocol === "nuanria_messaging" && o.type === "request") {
        const a = o.payload;
        if (a && a.functionId === "makeChanges") {
          const u = a.args;
          if (u) {
            const [l, c, d, f, g, h] = u;
            t.update(() => {
              const p = B();
              if (R(p)) {
                const m = p.anchor;
                let _ = m.getNode(), y = 0, v = 0;
                if (F(_) && l >= 0 && c >= 0 && (y = l, v = l + c, p.setTextNodeRange(_, y, _, v)), y === v && d === "" || (p.insertRawText(d), _ = m.getNode()), F(_)) {
                  y = f, v = f + g;
                  const C = _.getTextContentSize();
                  y = y > C ? C : y, v = v > C ? C : v, p.setTextNodeRange(_, y, _, v);
                }
                n.stopImmediatePropagation();
              }
            });
          }
        }
      }
    }
  };
  return window.addEventListener("message", r, !0), () => {
    window.removeEventListener("message", r, !0);
  };
}
function sy(t, e) {
  const r = e.body ? e.body.childNodes : [];
  let n = [];
  const i = [];
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (!eh.has(o.nodeName)) {
      const a = th(o, t, i, !1);
      a !== null && (n = n.concat(a));
    }
  }
  return function(s) {
    for (const o of s) o.getNextSibling() instanceof Eu && o.insertAfter(Rr());
    for (const o of s) {
      const a = o.getChildren();
      for (const u of a) o.insertBefore(u);
      o.remove();
    }
  }(i), n;
}
function oy(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const r = document.createElement("div"), n = pe().getChildren();
  for (let i = 0; i < n.length; i++)
    Zf(t, n[i], r, e);
  return r.innerHTML;
}
function Zf(t, e, r, n = null) {
  let i = n === null || e.isSelected(n);
  const s = S(e) && e.excludeFromCopy("html");
  let o = e;
  if (n !== null) {
    let g = Nu(e);
    g = F(g) && n !== null ? Jf(n, g) : g, o = g;
  }
  const a = S(o) ? o.getChildren() : [], u = t._nodes.get(o.getType());
  let l;
  l = u && u.exportDOM !== void 0 ? u.exportDOM(t, o) : o.exportDOM(t);
  const { element: c, after: d } = l;
  if (!c) return !1;
  const f = document.createDocumentFragment();
  for (let g = 0; g < a.length; g++) {
    const h = a[g], p = Zf(t, h, f, n);
    !i && S(e) && p && e.extractWithChild(h, n, "html") && (i = !0);
  }
  if (i && !s) {
    if ((Ae(c) || qa(c)) && c.append(f), r.append(c), d) {
      const g = d.call(o, c);
      g && (qa(c) ? c.replaceChildren(g) : c.replaceWith(g));
    }
  } else r.append(f);
  return i;
}
const eh = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function th(t, e, r, n, i = /* @__PURE__ */ new Map(), s) {
  let o = [];
  if (eh.has(t.nodeName)) return o;
  let a = null;
  const u = function(h, p) {
    const { nodeName: m } = h, _ = p._htmlConversions.get(m.toLowerCase());
    let y = null;
    if (_ !== void 0) for (const v of _) {
      const C = v(h);
      C !== null && (y === null || (y.priority || 0) <= (C.priority || 0)) && (y = C);
    }
    return y !== null ? y.conversion : null;
  }(t, e), l = u ? u(t) : null;
  let c = null;
  if (l !== null) {
    c = l.after;
    const h = l.node;
    if (a = Array.isArray(h) ? h[h.length - 1] : h, a !== null) {
      for (const [, p] of i) if (a = p(a, s), !a) break;
      a && o.push(...Array.isArray(h) ? h : [a]);
    }
    l.forChild != null && i.set(t.nodeName, l.forChild);
  }
  const d = t.childNodes;
  let f = [];
  const g = (a == null || !Qt(a)) && (a != null && Ia(a) || n);
  for (let h = 0; h < d.length; h++) f.push(...th(d[h], e, r, g, new Map(i), a));
  return c != null && (f = c(f)), to(t) && (f = ay(t, f, g ? () => {
    const h = new Eu();
    return r.push(h), h;
  } : Mt)), a == null ? f.length > 0 ? o = o.concat(f) : to(t) && function(h) {
    return h.nextSibling == null || h.previousSibling == null ? !1 : Ba(h.nextSibling) && Ba(h.previousSibling);
  }(t) && (o = o.concat(Rr())) : S(a) && a.append(...f), o;
}
function ay(t, e, r) {
  const n = t.style.textAlign, i = [];
  let s = [];
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    if (Ia(a)) n && !a.getFormat() && a.setFormat(n), i.push(a);
    else if (s.push(a), o === e.length - 1 || o < e.length - 1 && Ia(e[o + 1])) {
      const u = r();
      u.setFormat(n), u.append(...s), i.push(u), s = [];
    }
  }
  return i;
}
function ro(t, ...e) {
  const r = new URL("https://lexical.dev/docs/error"), n = new URLSearchParams();
  n.append("code", t);
  for (const i of e) n.append("v", i);
  throw r.search = n.toString(), Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function uy(t, e = B()) {
  return e == null && ro(166), R(e) && e.isCollapsed() || e.getNodes().length === 0 ? "" : oy(t, e);
}
function ly(t, e = B()) {
  return e == null && ro(166), R(e) && e.isCollapsed() || e.getNodes().length === 0 ? null : JSON.stringify(cy(t, e));
}
function Tc(t, e, r) {
  const n = t.getData("application/x-lexical-editor");
  if (n) try {
    const a = JSON.parse(n);
    if (a.namespace === r._config.namespace && Array.isArray(a.nodes))
      return kc(r, dy(a.nodes), e);
  } catch {
  }
  const i = t.getData("text/html"), s = t.getData("text/plain");
  if (i && s !== i) try {
    const a = new DOMParser().parseFromString(function(u) {
      return window.trustedTypes && window.trustedTypes.createPolicy ? window.trustedTypes.createPolicy("lexical", { createHTML: (l) => l }).createHTML(u) : u;
    }(i), "text/html");
    return kc(r, sy(r, a), e);
  } catch {
  }
  const o = s || t.getData("text/uri-list");
  if (o != null) if (R(e)) {
    const a = o.split(/(\r?\n|\t)/);
    a[a.length - 1] === "" && a.pop();
    for (let u = 0; u < a.length; u++) {
      const l = B();
      if (R(l)) {
        const c = a[u];
        c === `
` || c === `\r
` ? l.insertParagraph() : c === "	" ? l.insertNodes([Zi()]) : l.insertText(c);
      }
    }
  } else e.insertRawText(o);
}
function kc(t, e, r) {
  t.dispatchCommand(Em, { nodes: e, selection: r }) || r.insertNodes(e);
}
function rh(t, e, r, n = []) {
  let i = e === null || r.isSelected(e);
  const s = S(r) && r.excludeFromCopy("html");
  let o = r;
  if (e !== null) {
    let l = Nu(r);
    l = F(l) && e !== null ? Jf(e, l) : l, o = l;
  }
  const a = S(o) ? o.getChildren() : [], u = function(l) {
    const c = l.exportJSON(), d = l.constructor;
    if (c.type !== d.getType() && ro(58, d.name), S(l)) {
      const f = c.children;
      Array.isArray(f) || ro(59, d.name);
    }
    return c;
  }(o);
  if (F(o)) {
    const l = o.__text;
    l.length > 0 ? u.text = l : i = !1;
  }
  for (let l = 0; l < a.length; l++) {
    const c = a[l], d = rh(t, e, c, u.children);
    !i && S(r) && d && r.extractWithChild(c, e, "clone") && (i = !0);
  }
  if (i && !s) n.push(u);
  else if (Array.isArray(u.children)) for (let l = 0; l < u.children.length; l++) {
    const c = u.children[l];
    n.push(c);
  }
  return i;
}
function cy(t, e) {
  const r = [], n = pe().getChildren();
  for (let i = 0; i < n.length; i++)
    rh(t, e, n[i], r);
  return { namespace: t._config.namespace, nodes: r };
}
function dy(t) {
  const e = [];
  for (let r = 0; r < t.length; r++) {
    const n = t[r], i = Af(n);
    F(i) && T2(i), e.push(i);
  }
  return e;
}
let an = null;
async function Ac(t, e, r) {
  if (an !== null) return !1;
  if (e !== null) return new Promise((l, c) => {
    t.update(() => {
      l(wc(t, e, r));
    });
  });
  const n = t.getRootElement(), i = t._window || window, s = window.document, o = gt(i);
  if (n === null || o === null) return !1;
  const a = s.createElement("span");
  a.style.cssText = "position: fixed; top: -1000px;", a.append(s.createTextNode("#")), n.append(a);
  const u = new Range();
  return u.setStart(a, 0), u.setEnd(a, 1), o.removeAllRanges(), o.addRange(u), new Promise((l, c) => {
    const d = t.registerCommand(Wr, (f) => (Ar(f, ClipboardEvent) && (d(), an !== null && (window.clearTimeout(an), an = null), l(wc(t, f, r))), !0), Ra);
    an = window.setTimeout(() => {
      d(), an = null, l(!1);
    }, 50), s.execCommand("copy"), a.remove();
  });
}
function wc(t, e, r) {
  if (r === void 0) {
    const i = gt(t._window);
    if (!i) return !1;
    const s = i.anchorNode, o = i.focusNode;
    if (s !== null && o !== null && !ns(t, s, o)) return !1;
    const a = B();
    if (a === null) return !1;
    r = hy(a);
  }
  e.preventDefault();
  const n = e.clipboardData;
  return n !== null && (py(n, r), !0);
}
const fy = [["text/html", uy], ["application/x-lexical-editor", ly]];
function hy(t = B()) {
  const e = { "text/plain": t ? t.getTextContent() : "" };
  if (t) {
    const r = o2();
    for (const [n, i] of fy) {
      const s = i(r, t);
      s !== null && (e[n] = s);
    }
  }
  return e;
}
function py(t, e) {
  for (const r in e) {
    const n = e[r];
    n !== void 0 && t.setData(r, n);
  }
}
function Dc(t, e) {
  if (document.caretRangeFromPoint !== void 0) {
    const r = document.caretRangeFromPoint(t, e);
    return r === null ? null : { node: r.startContainer, offset: r.startOffset };
  }
  if (document.caretPositionFromPoint !== "undefined") {
    const r = document.caretPositionFromPoint(t, e);
    return r === null ? null : { node: r.offsetNode, offset: r.offset };
  }
  return null;
}
const Vn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, gy = Vn && "documentMode" in document ? document.documentMode : null, my = !(!Vn || !("InputEvent" in window) || gy) && "getTargetRanges" in new window.InputEvent("input"), yy = Vn && /Version\/[\d.]+.*Safari/.test(navigator.userAgent), Sc = Vn && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, _y = Vn && /^(?=.*Chrome).*/i.test(navigator.userAgent), vy = Vn && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && !_y, Nc = Yd();
function Cs(t) {
  let e = null;
  if (Ar(t, DragEvent) ? e = t.dataTransfer : Ar(t, ClipboardEvent) && (e = t.clipboardData), e === null) return [!1, [], !1];
  const r = e.types, n = r.includes("Files"), i = r.includes("text/html") || r.includes("text/plain");
  return [n, Array.from(e.files), i];
}
function Mc(t) {
  const e = B();
  if (!R(e)) return !1;
  const r = /* @__PURE__ */ new Set(), n = e.getNodes();
  for (let i = 0; i < n.length; i++) {
    const s = n[i], o = s.getKey();
    if (r.has(o)) continue;
    const a = ko(s, (l) => S(l) && !l.isInline());
    if (a === null) continue;
    const u = a.getKey();
    a.canIndent() && !r.has(u) && (r.add(u), t(a));
  }
  return r.size > 0;
}
function Ts(t) {
  const e = Dn(t);
  return le(e);
}
function ca(t) {
  for (const e of ["lowercase", "uppercase", "capitalize"]) t.hasFormat(e) && t.toggleFormat(e);
}
function by(t) {
  return Pt(t.registerCommand(Xd, (e) => {
    const r = B();
    return !!wt(r) && (r.clear(), !0);
  }, 0), t.registerCommand(wr, (e) => {
    const r = B();
    return !!R(r) && (r.deleteCharacter(e), !0);
  }, oe), t.registerCommand(Ni, (e) => {
    const r = B();
    return !!R(r) && (r.deleteWord(e), !0);
  }, oe), t.registerCommand(Mi, (e) => {
    const r = B();
    return !!R(r) && (r.deleteLine(e), !0);
  }, oe), t.registerCommand(_n, (e) => {
    const r = B();
    if (typeof e == "string") r !== null && r.insertText(e);
    else {
      if (r === null) return !1;
      const n = e.dataTransfer;
      if (n != null) Tc(n, r, t);
      else if (R(r)) {
        const i = e.data;
        return i && r.insertText(i), !0;
      }
    }
    return !0;
  }, oe), t.registerCommand(Ta, () => {
    const e = B();
    return !!R(e) && (e.removeText(), !0);
  }, oe), t.registerCommand(rr, (e) => {
    const r = B();
    return !!R(r) && (r.formatText(e), !0);
  }, oe), t.registerCommand(Am, (e) => {
    const r = B();
    if (!R(r) && !wt(r)) return !1;
    const n = r.getNodes();
    for (const i of n) {
      const s = ko(i, (o) => S(o) && !o.isInline());
      s !== null && s.setFormat(e);
    }
    return !0;
  }, oe), t.registerCommand(yn, (e) => {
    const r = B();
    return !!R(r) && (r.insertLineBreak(e), !0);
  }, oe), t.registerCommand(Gs, () => {
    const e = B();
    return !!R(e) && (e.insertParagraph(), !0);
  }, oe), t.registerCommand(Tm, () => (Vm([Zi()]), !0), oe), t.registerCommand(km, () => Mc((e) => {
    const r = e.getIndent();
    e.setIndent(r + 1);
  }), oe), t.registerCommand(Il, () => Mc((e) => {
    const r = e.getIndent();
    r > 0 && e.setIndent(r - 1);
  }), oe), t.registerCommand(fu, (e) => {
    const r = B();
    if (wt(r) && !Ts(e.target)) {
      const n = r.getNodes();
      if (n.length > 0) return n[0].selectPrevious(), !0;
    } else if (R(r)) {
      const n = Pa(r.focus, !0);
      if (!e.shiftKey && le(n) && !n.isIsolated() && !n.isInline()) return n.selectPrevious(), e.preventDefault(), !0;
    }
    return !1;
  }, oe), t.registerCommand(hu, (e) => {
    const r = B();
    if (wt(r)) {
      const n = r.getNodes();
      if (n.length > 0) return n[0].selectNext(0, 0), !0;
    } else if (R(r)) {
      if (function(i) {
        const s = i.focus;
        return s.key === "root" && s.offset === pe().getChildrenSize();
      }(r)) return e.preventDefault(), !0;
      const n = Pa(r.focus, !1);
      if (!e.shiftKey && le(n) && !n.isIsolated() && !n.isInline()) return n.selectNext(), e.preventDefault(), !0;
    }
    return !1;
  }, oe), t.registerCommand(Zd, (e) => {
    const r = B();
    if (wt(r)) {
      const n = r.getNodes();
      if (n.length > 0) return e.preventDefault(), n[0].selectPrevious(), !0;
    }
    if (!R(r)) return !1;
    if (mc(r, !0)) {
      const n = e.shiftKey;
      return e.preventDefault(), yc(r, n, !0), !0;
    }
    return !1;
  }, oe), t.registerCommand(Qd, (e) => {
    const r = B();
    if (wt(r) && !Ts(e.target)) {
      const i = r.getNodes();
      if (i.length > 0) return e.preventDefault(), i[0].selectNext(0, 0), !0;
    }
    if (!R(r)) return !1;
    const n = e.shiftKey;
    return !!mc(r, !1) && (e.preventDefault(), yc(r, n, !1), !0);
  }, oe), t.registerCommand(tf, (e) => {
    if (Ts(e.target)) return !1;
    const r = B();
    if (!R(r)) return !1;
    const { anchor: n } = r, i = n.getNode();
    return r.isCollapsed() && n.offset === 0 && !qe(i) && F2(i).getIndent() > 0 ? (e.preventDefault(), t.dispatchCommand(Il, void 0)) : (!Sc || navigator.language !== "ko-KR") && (e.preventDefault(), t.dispatchCommand(wr, !0));
  }, oe), t.registerCommand(rf, (e) => {
    if (Ts(e.target)) return !1;
    const r = B();
    return !!R(r) && (e.preventDefault(), t.dispatchCommand(wr, !1));
  }, oe), t.registerCommand(Oi, (e) => {
    const r = B();
    if (!R(r)) return !1;
    if (ca(r), e !== null) {
      if ((Sc || yy || vy) && my) return !1;
      if (e.preventDefault(), e.shiftKey) return t.dispatchCommand(yn, !1);
    }
    return t.dispatchCommand(Gs, void 0);
  }, oe), t.registerCommand(pu, () => {
    const e = B();
    return !!R(e) && (t.blur(), !0);
  }, oe), t.registerCommand(nf, (e) => {
    const [, r] = Cs(e);
    if (r.length > 0) {
      const i = Dc(e.clientX, e.clientY);
      if (i !== null) {
        const { offset: s, node: o } = i, a = Dn(o);
        if (a !== null) {
          const u = bf();
          if (F(a)) u.anchor.set(a.getKey(), s, "text"), u.focus.set(a.getKey(), s, "text");
          else {
            const c = a.getParentOrThrow().getKey(), d = a.getIndexWithinParent() + 1;
            u.anchor.set(c, d, "element"), u.focus.set(c, d, "element");
          }
          const l = Hs(u);
          et(l);
        }
        t.dispatchCommand(Nc, r);
      }
      return e.preventDefault(), !0;
    }
    const n = B();
    return !!R(n);
  }, oe), t.registerCommand(sf, (e) => {
    const [r] = Cs(e), n = B();
    return !(r && !R(n));
  }, oe), t.registerCommand(of, (e) => {
    const [r] = Cs(e), n = B();
    if (r && !R(n)) return !1;
    const i = Dc(e.clientX, e.clientY);
    if (i !== null) {
      const s = Dn(i.node);
      le(s) && e.preventDefault();
    }
    return !0;
  }, oe), t.registerCommand(ka, () => (Zm(), !0), oe), t.registerCommand(Wr, (e) => (Ac(t, Ar(e, ClipboardEvent) ? e : null), !0), oe), t.registerCommand(jn, (e) => (async function(r, n) {
    await Ac(n, Ar(r, ClipboardEvent) ? r : null), n.update(() => {
      const i = B();
      R(i) ? i.removeText() : wt(i) && i.getNodes().forEach((s) => s.remove());
    });
  }(e, t), !0), oe), t.registerCommand(Gi, (e) => {
    const [, r, n] = Cs(e);
    return r.length > 0 && !n ? (t.dispatchCommand(Nc, r), !0) : Kr(e.target) && Cu(e.target) ? !1 : B() !== null && (function(i, s) {
      i.preventDefault(), s.update(() => {
        const o = B(), a = Ar(i, InputEvent) || Ar(i, KeyboardEvent) ? null : i.clipboardData;
        a != null && o !== null && Tc(a, o, s);
      }, { tag: "paste" });
    }(e, t), !0);
  }, oe), t.registerCommand(ef, (e) => {
    const r = B();
    return R(r) && ca(r), !1;
  }, oe), t.registerCommand(gu, (e) => {
    const r = B();
    return R(r) && ca(r), !1;
  }, oe));
}
const Va = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Vr : J;
function Oc(t) {
  return t.getEditorState().read(Kf(t.isComposing()));
}
function nh({ contentEditable: t, placeholder: e = null, ErrorBoundary: r }) {
  const [n] = be(), i = function(s, o) {
    const [a, u] = se(() => s.getDecorators());
    return Va(() => s.registerDecoratorListener((l) => {
      Ug(() => {
        u(l);
      });
    }), [s]), J(() => {
      u(s.getDecorators());
    }, [s]), Be(() => {
      const l = [], c = Object.keys(a);
      for (let d = 0; d < c.length; d++) {
        const f = c[d], g = w.jsx(o, { onError: (p) => s._onError(p), children: w.jsx(Pg, { fallback: null, children: a[f] }) }), h = s.getElementByKey(f);
        h !== null && l.push(nu(g, h, f));
      }
      return l;
    }, [o, a, s]);
  }(n, r);
  return function(s) {
    Va(() => Pt(by(s), iy(s)), [s]);
  }(n), w.jsxs(w.Fragment, { children: [t, w.jsx(Ey, { content: e }), i] });
}
function Ey({ content: t }) {
  const [e] = be(), r = function(i) {
    const [s, o] = se(() => Oc(i));
    return Va(() => {
      function a() {
        const u = Oc(i);
        o(u);
      }
      return a(), Pt(i.registerUpdateListener(() => {
        a();
      }), i.registerEditableListener(() => {
        a();
      }));
    }, [i]), s;
  }(e), n = ny();
  return r ? typeof t == "function" ? t(n) : t : null;
}
var Ee = {};
function xy(t, e, r) {
  if (r === void 0 && (r = Array.prototype), t && typeof r.find == "function")
    return r.find.call(t, e);
  for (var n = 0; n < t.length; n++)
    if (Jr(t, n)) {
      var i = t[n];
      if (e.call(void 0, i, n, t))
        return i;
    }
}
function Wn(t, e) {
  return e === void 0 && (e = Object), e && typeof e.getOwnPropertyDescriptors == "function" && (t = e.create(null, e.getOwnPropertyDescriptors(t))), e && typeof e.freeze == "function" ? e.freeze(t) : t;
}
function Jr(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function Cy(t, e) {
  if (t === null || typeof t != "object")
    throw new TypeError("target is not an object");
  for (var r in e)
    Jr(e, r) && (t[r] = e[r]);
  return t;
}
var ih = Wn({
  allowfullscreen: !0,
  async: !0,
  autofocus: !0,
  autoplay: !0,
  checked: !0,
  controls: !0,
  default: !0,
  defer: !0,
  disabled: !0,
  formnovalidate: !0,
  hidden: !0,
  ismap: !0,
  itemscope: !0,
  loop: !0,
  multiple: !0,
  muted: !0,
  nomodule: !0,
  novalidate: !0,
  open: !0,
  playsinline: !0,
  readonly: !0,
  required: !0,
  reversed: !0,
  selected: !0
});
function Ty(t) {
  return Jr(ih, t.toLowerCase());
}
var sh = Wn({
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});
function ky(t) {
  return Jr(sh, t.toLowerCase());
}
var Pi = Wn({
  script: !1,
  style: !1,
  textarea: !0,
  title: !0
});
function Ay(t) {
  var e = t.toLowerCase();
  return Jr(Pi, e) && !Pi[e];
}
function wy(t) {
  var e = t.toLowerCase();
  return Jr(Pi, e) && Pi[e];
}
function oh(t) {
  return t === Li.HTML;
}
function Dy(t) {
  return oh(t) || t === Li.XML_XHTML_APPLICATION;
}
var Li = Wn({
  /**
   * `text/html`, the only mime type that triggers treating an XML document as HTML.
   *
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
   *      WHATWG HTML Spec
   */
  HTML: "text/html",
  /**
   * `application/xml`, the standard mime type for XML documents.
   *
   * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
   *      registration
   * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_APPLICATION: "application/xml",
  /**
   * `text/xml`, an alias for `application/xml`.
   *
   * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
   * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_TEXT: "text/xml",
  /**
   * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
   * but is parsed as an XML document.
   *
   * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
   *      registration
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
   * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
   */
  XML_XHTML_APPLICATION: "application/xhtml+xml",
  /**
   * `image/svg+xml`,
   *
   * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
   * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
   * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
   */
  XML_SVG_IMAGE: "image/svg+xml"
}), Sy = Object.keys(Li).map(function(t) {
  return Li[t];
});
function Ny(t) {
  return Sy.indexOf(t) > -1;
}
var My = Wn({
  /**
   * The XHTML namespace.
   *
   * @see http://www.w3.org/1999/xhtml
   */
  HTML: "http://www.w3.org/1999/xhtml",
  /**
   * The SVG namespace.
   *
   * @see http://www.w3.org/2000/svg
   */
  SVG: "http://www.w3.org/2000/svg",
  /**
   * The `xml:` namespace.
   *
   * @see http://www.w3.org/XML/1998/namespace
   */
  XML: "http://www.w3.org/XML/1998/namespace",
  /**
   * The `xmlns:` namespace.
   *
   * @see https://www.w3.org/2000/xmlns/
   */
  XMLNS: "http://www.w3.org/2000/xmlns/"
});
Ee.assign = Cy;
Ee.find = xy;
Ee.freeze = Wn;
Ee.HTML_BOOLEAN_ATTRIBUTES = ih;
Ee.HTML_RAW_TEXT_ELEMENTS = Pi;
Ee.HTML_VOID_ELEMENTS = sh;
Ee.hasDefaultHTMLNamespace = Dy;
Ee.hasOwn = Jr;
Ee.isHTMLBooleanAttribute = Ty;
Ee.isHTMLRawTextElement = Ay;
Ee.isHTMLEscapableRawTextElement = wy;
Ee.isHTMLMimeType = oh;
Ee.isHTMLVoidElement = ky;
Ee.isValidMimeType = Ny;
Ee.MIME_TYPE = Li;
Ee.NAMESPACE = My;
var Gr = {}, Oy = Ee;
function ah(t, e) {
  t.prototype = Object.create(Error.prototype, {
    constructor: { value: t },
    name: { value: t.name, enumerable: !0, writable: e }
  });
}
var Fi = Oy.freeze({
  /**
   * the default value as defined by the spec
   */
  Error: "Error",
  /**
   * @deprecated
   * Use RangeError instead.
   */
  IndexSizeError: "IndexSizeError",
  /**
   * @deprecated
   * Just to match the related static code, not part of the spec.
   */
  DomstringSizeError: "DomstringSizeError",
  HierarchyRequestError: "HierarchyRequestError",
  WrongDocumentError: "WrongDocumentError",
  InvalidCharacterError: "InvalidCharacterError",
  /**
   * @deprecated
   * Just to match the related static code, not part of the spec.
   */
  NoDataAllowedError: "NoDataAllowedError",
  NoModificationAllowedError: "NoModificationAllowedError",
  NotFoundError: "NotFoundError",
  NotSupportedError: "NotSupportedError",
  InUseAttributeError: "InUseAttributeError",
  InvalidStateError: "InvalidStateError",
  SyntaxError: "SyntaxError",
  InvalidModificationError: "InvalidModificationError",
  NamespaceError: "NamespaceError",
  /**
   * @deprecated
   * Use TypeError for invalid arguments,
   * "NotSupportedError" DOMException for unsupported operations,
   * and "NotAllowedError" DOMException for denied requests instead.
   */
  InvalidAccessError: "InvalidAccessError",
  /**
   * @deprecated
   * Just to match the related static code, not part of the spec.
   */
  ValidationError: "ValidationError",
  /**
   * @deprecated
   * Use TypeError instead.
   */
  TypeMismatchError: "TypeMismatchError",
  SecurityError: "SecurityError",
  NetworkError: "NetworkError",
  AbortError: "AbortError",
  /**
   * @deprecated
   * Just to match the related static code, not part of the spec.
   */
  URLMismatchError: "URLMismatchError",
  QuotaExceededError: "QuotaExceededError",
  TimeoutError: "TimeoutError",
  InvalidNodeTypeError: "InvalidNodeTypeError",
  DataCloneError: "DataCloneError",
  EncodingError: "EncodingError",
  NotReadableError: "NotReadableError",
  UnknownError: "UnknownError",
  ConstraintError: "ConstraintError",
  DataError: "DataError",
  TransactionInactiveError: "TransactionInactiveError",
  ReadOnlyError: "ReadOnlyError",
  VersionError: "VersionError",
  OperationError: "OperationError",
  NotAllowedError: "NotAllowedError",
  OptOutError: "OptOutError"
}), uh = Object.keys(Fi);
function lh(t) {
  return typeof t == "number" && t >= 1 && t <= 25;
}
function Iy(t) {
  return typeof t == "string" && t.substring(t.length - Fi.Error.length) === Fi.Error;
}
function os(t, e) {
  lh(t) ? (this.name = uh[t], this.message = e || "") : (this.message = t, this.name = Iy(e) ? e : Fi.Error), Error.captureStackTrace && Error.captureStackTrace(this, os);
}
ah(os, !0);
Object.defineProperties(os.prototype, {
  code: {
    enumerable: !0,
    get: function() {
      var t = uh.indexOf(this.name);
      return lh(t) ? t : 0;
    }
  }
});
var ch = {
  INDEX_SIZE_ERR: 1,
  DOMSTRING_SIZE_ERR: 2,
  HIERARCHY_REQUEST_ERR: 3,
  WRONG_DOCUMENT_ERR: 4,
  INVALID_CHARACTER_ERR: 5,
  NO_DATA_ALLOWED_ERR: 6,
  NO_MODIFICATION_ALLOWED_ERR: 7,
  NOT_FOUND_ERR: 8,
  NOT_SUPPORTED_ERR: 9,
  INUSE_ATTRIBUTE_ERR: 10,
  INVALID_STATE_ERR: 11,
  SYNTAX_ERR: 12,
  INVALID_MODIFICATION_ERR: 13,
  NAMESPACE_ERR: 14,
  INVALID_ACCESS_ERR: 15,
  VALIDATION_ERR: 16,
  TYPE_MISMATCH_ERR: 17,
  SECURITY_ERR: 18,
  NETWORK_ERR: 19,
  ABORT_ERR: 20,
  URL_MISMATCH_ERR: 21,
  QUOTA_EXCEEDED_ERR: 22,
  TIMEOUT_ERR: 23,
  INVALID_NODE_TYPE_ERR: 24,
  DATA_CLONE_ERR: 25
}, da = Object.entries(ch);
for (var ks = 0; ks < da.length; ks++) {
  var Ry = da[ks][0];
  os[Ry] = da[ks][1];
}
function Fu(t, e) {
  this.message = t, this.locator = e, Error.captureStackTrace && Error.captureStackTrace(this, Fu);
}
ah(Fu);
Gr.DOMException = os;
Gr.DOMExceptionName = Fi;
Gr.ExceptionCode = ch;
Gr.ParseError = Fu;
var Ce = {}, Q = {};
function dh(t) {
  try {
    typeof t != "function" && (t = RegExp);
    var e = new t("𝌆", "u").exec("𝌆");
    return !!e && e[0].length === 2;
  } catch {
  }
  return !1;
}
var as = dh();
function qr(t) {
  if (t.source[0] !== "[")
    throw new Error(t + " can not be used with chars");
  return t.source.slice(1, t.source.lastIndexOf("]"));
}
function Rn(t, e) {
  if (t.source[0] !== "[")
    throw new Error("/" + t.source + "/ can not be used with chars_without");
  if (!e || typeof e != "string")
    throw new Error(JSON.stringify(e) + " is not a valid search");
  if (t.source.indexOf(e) === -1)
    throw new Error('"' + e + '" is not is /' + t.source + "/");
  if (e === "-" && t.source.indexOf(e) !== 1)
    throw new Error('"' + e + '" is not at the first postion of /' + t.source + "/");
  return new RegExp(t.source.replace(e, ""), as ? "u" : "");
}
function te(t) {
  var e = this;
  return new RegExp(
    Array.prototype.slice.call(arguments).map(function(r) {
      var n = typeof r == "string";
      if (n && e === void 0 && r === "|")
        throw new Error("use regg instead of reg to wrap expressions with `|`!");
      return n ? r : r.source;
    }).join(""),
    as ? "mu" : "m"
  );
}
function K(t) {
  if (arguments.length === 0)
    throw new Error("no parameters provided");
  return te.apply(K, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
}
var Py = "�", Br = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
as && (Br = te("[", qr(Br), "\\u{10000}-\\u{10FFFF}", "]"));
var qu = /[\x20\x09\x0D\x0A]/, Ly = qr(qu), ce = te(qu, "+"), _e = te(qu, "*"), qi = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
as && (qi = te("[", qr(qi), "\\u{10000}-\\u{10FFFF}", "]"));
var Fy = qr(qi), Bu = te("[", Fy, qr(/[-.0-9\xB7]/), qr(/[\u0300-\u036F\u203F-\u2040]/), "]"), ut = te(qi, Bu, "*"), Ic = te(Bu, "+"), qy = te("&", ut, ";"), By = K(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), Bi = K(qy, "|", By), ji = te("%", ut, ";"), ju = K(
  te('"', K(/[^%&"]/, "|", ji, "|", Bi), "*", '"'),
  "|",
  te("'", K(/[^%&']/, "|", ji, "|", Bi), "*", "'")
), jy = K('"', K(/[^<&"]/, "|", Bi), "*", '"', "|", "'", K(/[^<&']/, "|", Bi), "*", "'"), $y = Rn(qi, ":"), Uy = Rn(Bu, ":"), Rc = te($y, Uy, "*"), us = te(Rc, K(":", Rc), "?"), Vy = te("^", us, "$"), Wy = te("(", us, ")"), $i = K(/"[^"]*"|'[^']*'/), Hy = te(/^<\?/, "(", ut, ")", K(ce, "(", Br, "*?)"), "?", /\?>/), Pc = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, Ao = K('"', Pc, '*"', "|", "'", Rn(Pc, "'"), "*'"), fh = "<!--", hh = "-->", zy = te(fh, K(Rn(Br, "-"), "|", te("-", Rn(Br, "-"))), "*", hh), Lc = "#PCDATA", Ky = K(
  te(/\(/, _e, Lc, K(_e, /\|/, _e, us), "*", _e, /\)\*/),
  "|",
  te(/\(/, _e, Lc, _e, /\)/)
), Jy = /[?*+]?/, Gy = te(
  /\([^>]+\)/,
  Jy
  /*regg(choice, '|', seq), _children_quantity*/
), Yy = K("EMPTY", "|", "ANY", "|", Ky, "|", Gy), Xy = "<!ELEMENT", Qy = te(Xy, ce, K(us, "|", ji), ce, K(Yy, "|", ji), _e, ">"), Zy = te("NOTATION", ce, /\(/, _e, ut, K(_e, /\|/, _e, ut), "*", _e, /\)/), e0 = te(/\(/, _e, Ic, K(_e, /\|/, _e, Ic), "*", _e, /\)/), t0 = K(Zy, "|", e0), r0 = K(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", t0), n0 = K(/#REQUIRED|#IMPLIED/, "|", K(K("#FIXED", ce), "?", jy)), i0 = K(ce, ut, ce, r0, ce, n0), s0 = "<!ATTLIST", o0 = te(s0, ce, ut, i0, "*", _e, ">"), Wa = "about:legacy-compat", a0 = K('"' + Wa + '"', "|", "'" + Wa + "'"), $u = "SYSTEM", wo = "PUBLIC", Do = K(K($u, ce, $i), "|", K(wo, ce, Ao, ce, $i)), u0 = te(
  "^",
  K(
    K($u, ce, "(?<SystemLiteralOnly>", $i, ")"),
    "|",
    K(wo, ce, "(?<PubidLiteral>", Ao, ")", ce, "(?<SystemLiteral>", $i, ")")
  )
), l0 = K(ce, "NDATA", ce, ut), c0 = K(ju, "|", K(Do, l0, "?")), ph = "<!ENTITY", d0 = te(ph, ce, ut, ce, c0, _e, ">"), f0 = K(ju, "|", Do), h0 = te(ph, ce, "%", ce, ut, ce, f0, _e, ">"), p0 = K(d0, "|", h0), g0 = te(wo, ce, Ao), m0 = te("<!NOTATION", ce, ut, ce, K(Do, "|", g0), _e, ">"), Uu = te(_e, "=", _e), Fc = /1[.]\d+/, y0 = te(ce, "version", Uu, K("'", Fc, "'", "|", '"', Fc, '"')), qc = /[A-Za-z][-A-Za-z0-9._]*/, _0 = K(ce, "encoding", Uu, K('"', qc, '"', "|", "'", qc, "'")), v0 = K(ce, "standalone", Uu, K("'", K("yes", "|", "no"), "'", "|", '"', K("yes", "|", "no"), '"')), b0 = te(/^<\?xml/, y0, _0, "?", v0, "?", _e, /\?>/), E0 = "<!DOCTYPE", x0 = "<![CDATA[", C0 = "]]>", T0 = /<!\[CDATA\[/, k0 = /\]\]>/, A0 = te(Br, "*?", k0), w0 = te(T0, A0);
Q.chars = qr;
Q.chars_without = Rn;
Q.detectUnicodeSupport = dh;
Q.reg = te;
Q.regg = K;
Q.ABOUT_LEGACY_COMPAT = Wa;
Q.ABOUT_LEGACY_COMPAT_SystemLiteral = a0;
Q.AttlistDecl = o0;
Q.CDATA_START = x0;
Q.CDATA_END = C0;
Q.CDSect = w0;
Q.Char = Br;
Q.Comment = zy;
Q.COMMENT_START = fh;
Q.COMMENT_END = hh;
Q.DOCTYPE_DECL_START = E0;
Q.elementdecl = Qy;
Q.EntityDecl = p0;
Q.EntityValue = ju;
Q.ExternalID = Do;
Q.ExternalID_match = u0;
Q.Name = ut;
Q.NotationDecl = m0;
Q.Reference = Bi;
Q.PEReference = ji;
Q.PI = Hy;
Q.PUBLIC = wo;
Q.PubidLiteral = Ao;
Q.QName = us;
Q.QName_exact = Vy;
Q.QName_group = Wy;
Q.S = ce;
Q.SChar_s = Ly;
Q.S_OPT = _e;
Q.SYSTEM = $u;
Q.SystemLiteral = $i;
Q.UNICODE_REPLACEMENT_CHARACTER = Py;
Q.UNICODE_SUPPORT = as;
Q.XMLDecl = b0;
var st = Ee, Ot = st.find, D0 = st.hasDefaultHTMLNamespace, Pn = st.hasOwn, S0 = st.isHTMLMimeType, N0 = st.isHTMLRawTextElement, M0 = st.isHTMLVoidElement, hi = st.MIME_TYPE, Lt = st.NAMESPACE, Ue = Symbol(), gh = Gr, H = gh.DOMException, O0 = gh.DOMExceptionName, Dt = Q;
function Ye(t) {
  if (t !== Ue)
    throw new TypeError("Illegal constructor");
}
function I0(t) {
  return t !== "";
}
function R0(t) {
  return t ? t.split(/[\t\n\f\r ]+/).filter(I0) : [];
}
function P0(t, e) {
  return Pn(t, e) || (t[e] = !0), t;
}
function Bc(t) {
  if (!t) return [];
  var e = R0(t);
  return Object.keys(e.reduce(P0, {}));
}
function L0(t) {
  return function(e) {
    return t && t.indexOf(e) !== -1;
  };
}
function mh(t) {
  if (!Dt.QName_exact.test(t))
    throw new H(H.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + t + '"');
}
function Ha(t, e) {
  mh(e), t = t || null;
  var r = null, n = e;
  if (e.indexOf(":") >= 0) {
    var i = e.split(":");
    r = i[0], n = i[1];
  }
  if (r !== null && t === null)
    throw new H(H.NAMESPACE_ERR, "prefix is non-null and namespace is null");
  if (r === "xml" && t !== st.NAMESPACE.XML)
    throw new H(H.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
  if ((r === "xmlns" || e === "xmlns") && t !== st.NAMESPACE.XMLNS)
    throw new H(
      H.NAMESPACE_ERR,
      'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
    );
  if (t === st.NAMESPACE.XMLNS && r !== "xmlns" && e !== "xmlns")
    throw new H(
      H.NAMESPACE_ERR,
      'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
    );
  return [t, r, n];
}
function Hn(t, e) {
  for (var r in t)
    Pn(t, r) && (e[r] = t[r]);
}
function Xe(t, e) {
  var r = t.prototype;
  if (!(r instanceof e)) {
    let n = function() {
    };
    n.prototype = e.prototype, n = new n(), Hn(r, n), t.prototype = r = n;
  }
  r.constructor != t && (typeof t != "function" && console.error("unknown Class:" + t), r.constructor = t);
}
var Qe = {}, ft = Qe.ELEMENT_NODE = 1, Ln = Qe.ATTRIBUTE_NODE = 2, no = Qe.TEXT_NODE = 3, yh = Qe.CDATA_SECTION_NODE = 4, _h = Qe.ENTITY_REFERENCE_NODE = 5, F0 = Qe.ENTITY_NODE = 6, vh = Qe.PROCESSING_INSTRUCTION_NODE = 7, bh = Qe.COMMENT_NODE = 8, Ui = Qe.DOCUMENT_NODE = 9, Eh = Qe.DOCUMENT_TYPE_NODE = 10, ur = Qe.DOCUMENT_FRAGMENT_NODE = 11, q0 = Qe.NOTATION_NODE = 12, ve = st.freeze({
  DOCUMENT_POSITION_DISCONNECTED: 1,
  DOCUMENT_POSITION_PRECEDING: 2,
  DOCUMENT_POSITION_FOLLOWING: 4,
  DOCUMENT_POSITION_CONTAINS: 8,
  DOCUMENT_POSITION_CONTAINED_BY: 16,
  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
});
function xh(t, e) {
  if (e.length < t.length) return xh(e, t);
  var r = null;
  for (var n in t) {
    if (t[n] !== e[n]) return r;
    r = t[n];
  }
  return r;
}
function jc(t) {
  return t.guid || (t.guid = Math.random()), t.guid;
}
function we() {
}
we.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1
   * inclusive.
   *
   * @type {number}
   */
  length: 0,
  /**
   * Returns the item at `index`. If index is greater than or equal to the number of nodes in
   * the list, this returns null.
   *
   * @param index
   * Unsigned long Index into the collection.
   * @returns {Node | null}
   * The node at position `index` in the NodeList,
   * or null if that is not a valid index.
   */
  item: function(t) {
    return t >= 0 && t < this.length ? this[t] : null;
  },
  /**
   * Returns a string representation of the NodeList.
   *
   * @param {unknown} nodeFilter
   * __A filter function? Not implemented according to the spec?__.
   * @returns {string}
   * A string representation of the NodeList.
   */
  toString: function(t) {
    for (var e = [], r = 0; r < this.length; r++)
      mn(this[r], e, t);
    return e.join("");
  },
  /**
   * Filters the NodeList based on a predicate.
   *
   * @param {function(Node): boolean} predicate
   * - A predicate function to filter the NodeList.
   * @returns {Node[]}
   * An array of nodes that satisfy the predicate.
   * @private
   */
  filter: function(t) {
    return Array.prototype.filter.call(this, t);
  },
  /**
   * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
   * not present.
   *
   * @param {Node} item
   * - The Node item to locate in the NodeList.
   * @returns {number}
   * The first index of the node in the NodeList; -1 if not found.
   * @private
   */
  indexOf: function(t) {
    return Array.prototype.indexOf.call(this, t);
  }
};
we.prototype[Symbol.iterator] = function() {
  var t = this, e = 0;
  return {
    next: function() {
      return e < t.length ? {
        value: t[e++],
        done: !1
      } : {
        done: !0
      };
    },
    return: function() {
      return {
        done: !0
      };
    }
  };
};
function Nr(t, e) {
  this._node = t, this._refresh = e, So(this);
}
function So(t) {
  var e = t._node._inc || t._node.ownerDocument._inc;
  if (t._inc !== e) {
    var r = t._refresh(t._node);
    if (Rh(t, "length", r.length), !t.$$length || r.length < t.$$length)
      for (var n = r.length; n in t; n++)
        Pn(t, n) && delete t[n];
    Hn(r, t), t._inc = e;
  }
}
Nr.prototype.item = function(t) {
  return So(this), this[t] || null;
};
Xe(Nr, we);
function Fn() {
}
function Ch(t, e) {
  for (var r = 0; r < t.length; ) {
    if (t[r] === e)
      return r;
    r++;
  }
}
function B0(t, e, r, n) {
  if (n ? e[Ch(e, n)] = r : (e[e.length] = r, e.length++), t) {
    r.ownerElement = t;
    var i = t.ownerDocument;
    i && (n && Ah(i, t, n), j0(i, t, r));
  }
}
function $c(t, e, r) {
  var n = Ch(e, r);
  if (n >= 0) {
    for (var i = e.length - 1; n <= i; )
      e[n] = e[++n];
    if (e.length = i, t) {
      var s = t.ownerDocument;
      s && Ah(s, t, r), r.ownerElement = null;
    }
  }
}
Fn.prototype = {
  length: 0,
  item: we.prototype.item,
  /**
   * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
   * document.
   *
   * @param {string} localName
   * The local name of the attribute.
   * @returns {Attr | null}
   * The attribute with the given local name, or null if no such attribute exists.
   * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
   */
  getNamedItem: function(t) {
    this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (t = t.toLowerCase());
    for (var e = 0; e < this.length; ) {
      var r = this[e];
      if (r.nodeName === t)
        return r;
      e++;
    }
    return null;
  },
  /**
   * Set an attribute.
   *
   * @param {Attr} attr
   * The attribute to set.
   * @returns {Attr | null}
   * The old attribute with the same local name and namespace URI as the new one, or null if no
   * such attribute exists.
   * @throws {DOMException}
   * With code:
   * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
   * element.
   * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
   */
  setNamedItem: function(t) {
    var e = t.ownerElement;
    if (e && e !== this._ownerElement)
      throw new H(H.INUSE_ATTRIBUTE_ERR);
    var r = this.getNamedItemNS(t.namespaceURI, t.localName);
    return r === t ? t : (B0(this._ownerElement, this, t, r), r);
  },
  /**
   * Set an attribute, replacing an existing attribute with the same local name and namespace
   * URI if one exists.
   *
   * @param {Attr} attr
   * The attribute to set.
   * @returns {Attr | null}
   * The old attribute with the same local name and namespace URI as the new one, or null if no
   * such attribute exists.
   * @throws {DOMException}
   * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
   * attribute of another element.
   * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
   */
  setNamedItemNS: function(t) {
    return this.setNamedItem(t);
  },
  /**
   * Removes an attribute specified by the local name.
   *
   * @param {string} localName
   * The local name of the attribute to be removed.
   * @returns {Attr}
   * The attribute node that was removed.
   * @throws {DOMException}
   * With code:
   * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
   * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
   * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
   */
  removeNamedItem: function(t) {
    var e = this.getNamedItem(t);
    if (!e)
      throw new H(H.NOT_FOUND_ERR, t);
    return $c(this._ownerElement, this, e), e;
  },
  /**
   * Removes an attribute specified by the namespace and local name.
   *
   * @param {string | null} namespaceURI
   * The namespace URI of the attribute to be removed.
   * @param {string} localName
   * The local name of the attribute to be removed.
   * @returns {Attr}
   * The attribute node that was removed.
   * @throws {DOMException}
   * With code:
   * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
   * name is found.
   * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
   * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
   */
  removeNamedItemNS: function(t, e) {
    var r = this.getNamedItemNS(t, e);
    if (!r)
      throw new H(H.NOT_FOUND_ERR, t ? t + " : " + e : e);
    return $c(this._ownerElement, this, r), r;
  },
  /**
   * Get an attribute by namespace and local name.
   *
   * @param {string | null} namespaceURI
   * The namespace URI of the attribute.
   * @param {string} localName
   * The local name of the attribute.
   * @returns {Attr | null}
   * The attribute with the given namespace URI and local name, or null if no such attribute
   * exists.
   * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
   */
  getNamedItemNS: function(t, e) {
    t || (t = null);
    for (var r = 0; r < this.length; ) {
      var n = this[r];
      if (n.localName === e && n.namespaceURI === t)
        return n;
      r++;
    }
    return null;
  }
};
Fn.prototype[Symbol.iterator] = function() {
  var t = this, e = 0;
  return {
    next: function() {
      return e < t.length ? {
        value: t[e++],
        done: !1
      } : {
        done: !0
      };
    },
    return: function() {
      return {
        done: !0
      };
    }
  };
};
function Th() {
}
Th.prototype = {
  /**
   * Test if the DOM implementation implements a specific feature and version, as specified in
   * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
   *
   * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
   * feature is supported. The different implementations fairly diverged in what kind of
   * features were reported. The latest version of the spec settled to force this method to
   * always return true, where the functionality was accurate and in use.
   *
   * @deprecated
   * It is deprecated and modern browsers return true in all cases.
   * @function DOMImplementation#hasFeature
   * @param {string} feature
   * The name of the feature to test.
   * @param {string} [version]
   * This is the version number of the feature to test.
   * @returns {boolean}
   * Always returns true.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
   * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
   */
  hasFeature: function(t, e) {
    return !0;
  },
  /**
   * Creates a DOM Document object of the specified type with its document element. Note that
   * based on the {@link DocumentType}
   * given to create the document, the implementation may instantiate specialized
   * {@link Document} objects that support additional features than the "Core", such as "HTML"
   * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
   * On the other hand, setting the {@link DocumentType} after the document was created makes
   * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
   * such as createHTMLDocument
   * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
   * can be used to obtain specific types of {@link Document} objects.
   *
   * __It behaves slightly different from the description in the living standard__:
   * - There is no interface/class `XMLDocument`, it returns a `Document`
   * instance (with it's `type` set to `'xml'`).
   * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   *
   * @function DOMImplementation.createDocument
   * @param {string | null} namespaceURI
   * The
   * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
   * of the document element to create or null.
   * @param {string | null} qualifiedName
   * The
   * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
   * of the document element to be created or null.
   * @param {DocumentType | null} [doctype=null]
   * The type of document to be created or null. When doctype is not null, its
   * {@link Node#ownerDocument} attribute is set to the document being created. Default is
   * `null`
   * @returns {Document}
   * A new {@link Document} object with its document element. If the NamespaceURI,
   * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
   * document element.
   * @throws {DOMException}
   * With code:
   *
   * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
   * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
   * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
   * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
   * is different from null, or if the qualifiedName has a prefix that is "xml" and the
   * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
   * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
   * or if the DOM implementation does not support the "XML" feature but a non-null namespace
   * URI was provided, since namespaces were defined by XML.
   * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
   * or was created from a different implementation.
   * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
   * "XML" and the language exposed through the Document does not support XML Namespaces (such
   * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
   * @since DOM Level 2.
   * @see {@link #createHTMLDocument}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
   *      Level 3 Core
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
   *      Level 2 Core (initial)
   */
  createDocument: function(t, e, r) {
    var n = hi.XML_APPLICATION;
    t === Lt.HTML ? n = hi.XML_XHTML_APPLICATION : t === Lt.SVG && (n = hi.XML_SVG_IMAGE);
    var i = new lr(Ue, { contentType: n });
    if (i.implementation = this, i.childNodes = new we(), i.doctype = r || null, r && i.appendChild(r), e) {
      var s = i.createElementNS(t, e);
      i.appendChild(s);
    }
    return i;
  },
  /**
   * Creates an empty DocumentType node. Entity declarations and notations are not made
   * available. Entity reference expansions and default attribute additions do not occur.
   *
   * **This behavior is slightly different from the one in the specs**:
   * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   * - `publicId` and `systemId` contain the raw data including any possible quotes,
   *   so they can always be serialized back to the original value
   * - `internalSubset` contains the raw string between `[` and `]` if present,
   *   but is not parsed or validated in any form.
   *
   * @function DOMImplementation#createDocumentType
   * @param {string} qualifiedName
   * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
   * name} of the document type to be created.
   * @param {string} [publicId]
   * The external subset public identifier.
   * @param {string} [systemId]
   * The external subset system identifier.
   * @param {string} [internalSubset]
   * the internal subset or an empty string if it is not present
   * @returns {DocumentType}
   * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
   * @throws {DOMException}
   * With code:
   *
   * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
   * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
   * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
   * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
   * "XML" and the language exposed through the Document does not support XML Namespaces (such
   * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
   * @since DOM Level 2.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
   *      MDN
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
   *      Standard
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
   *      Level 3 Core
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
   *      Level 2 Core
   * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
   * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
   * @prettierignore
   */
  createDocumentType: function(t, e, r, n) {
    mh(t);
    var i = new Oo(Ue);
    return i.name = t, i.nodeName = t, i.publicId = e || "", i.systemId = r || "", i.internalSubset = n || "", i.childNodes = new we(), i;
  },
  /**
   * Returns an HTML document, that might already have a basic DOM structure.
   *
   * __It behaves slightly different from the description in the living standard__:
   * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
   * omitted)
   * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   *
   * @param {string | false} [title]
   * A string containing the title to give the new HTML document.
   * @returns {Document}
   * The HTML document.
   * @since WHATWG Living Standard.
   * @see {@link #createDocument}
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
   * @see https://dom.spec.whatwg.org/#html-document
   */
  createHTMLDocument: function(t) {
    var e = new lr(Ue, { contentType: hi.HTML });
    if (e.implementation = this, e.childNodes = new we(), t !== !1) {
      e.doctype = this.createDocumentType("html"), e.doctype.ownerDocument = e, e.appendChild(e.doctype);
      var r = e.createElement("html");
      e.appendChild(r);
      var n = e.createElement("head");
      if (r.appendChild(n), typeof t == "string") {
        var i = e.createElement("title");
        i.appendChild(e.createTextNode(t)), n.appendChild(i);
      }
      r.appendChild(e.createElement("body"));
    }
    return e;
  }
};
function ie(t) {
  Ye(t);
}
ie.prototype = {
  /**
   * The first child of this node.
   *
   * @type {Node | null}
   */
  firstChild: null,
  /**
   * The last child of this node.
   *
   * @type {Node | null}
   */
  lastChild: null,
  /**
   * The previous sibling of this node.
   *
   * @type {Node | null}
   */
  previousSibling: null,
  /**
   * The next sibling of this node.
   *
   * @type {Node | null}
   */
  nextSibling: null,
  /**
   * The parent node of this node.
   *
   * @type {Node | null}
   */
  parentNode: null,
  /**
   * The parent element of this node.
   *
   * @type {Element | null}
   */
  get parentElement() {
    return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
  },
  /**
   * The child nodes of this node.
   *
   * @type {NodeList}
   */
  childNodes: null,
  /**
   * The document object associated with this node.
   *
   * @type {Document | null}
   */
  ownerDocument: null,
  /**
   * The value of this node.
   *
   * @type {string | null}
   */
  nodeValue: null,
  /**
   * The namespace URI of this node.
   *
   * @type {string | null}
   */
  namespaceURI: null,
  /**
   * The prefix of the namespace for this node.
   *
   * @type {string | null}
   */
  prefix: null,
  /**
   * The local part of the qualified name of this node.
   *
   * @type {string | null}
   */
  localName: null,
  /**
   * The baseURI is currently always `about:blank`,
   * since that's what happens when you create a document from scratch.
   *
   * @type {'about:blank'}
   */
  baseURI: "about:blank",
  /**
   * Is true if this node is part of a document.
   *
   * @type {boolean}
   */
  get isConnected() {
    var t = this.getRootNode();
    return t && t.nodeType === t.DOCUMENT_NODE;
  },
  /**
   * Checks whether `other` is an inclusive descendant of this node.
   *
   * @param {Node | null | undefined} other
   * The node to check.
   * @returns {boolean}
   * True if `other` is an inclusive descendant of this node; false otherwise.
   * @see https://dom.spec.whatwg.org/#dom-node-contains
   */
  contains: function(t) {
    if (!t) return !1;
    var e = t;
    do {
      if (this === e) return !0;
      e = t.parentNode;
    } while (e);
    return !1;
  },
  /**
   * @typedef GetRootNodeOptions
   * @property {boolean} [composed=false]
   */
  /**
   * Searches for the root node of this node.
   *
   * **This behavior is slightly different from the in the specs**:
   * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
   *
   * @param {GetRootNodeOptions} [options]
   * @returns {Node}
   * Root node.
   * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
   * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
   */
  getRootNode: function(t) {
    var e = this;
    do {
      if (!e.parentNode)
        return e;
      e = e.parentNode;
    } while (e);
  },
  /**
   * Checks whether the given node is equal to this node.
   *
   * @param {Node} [otherNode]
   * @see https://dom.spec.whatwg.org/#concept-node-equals
   */
  isEqualNode: function(t) {
    if (!t || this.nodeType !== t.nodeType) return !1;
    switch (this.nodeType) {
      case this.DOCUMENT_TYPE_NODE:
        if (this.name !== t.name || this.publicId !== t.publicId || this.systemId !== t.systemId) return !1;
        break;
      case this.ELEMENT_NODE:
        if (this.namespaceURI !== t.namespaceURI || this.prefix !== t.prefix || this.localName !== t.localName || this.attributes.length !== t.attributes.length) return !1;
        for (var e = 0; e < this.attributes.length; e++) {
          var r = this.attributes.item(e);
          if (!r.isEqualNode(t.getAttributeNodeNS(r.namespaceURI, r.localName)))
            return !1;
        }
        break;
      case this.ATTRIBUTE_NODE:
        if (this.namespaceURI !== t.namespaceURI || this.localName !== t.localName || this.value !== t.value) return !1;
        break;
      case this.PROCESSING_INSTRUCTION_NODE:
        if (this.target !== t.target || this.data !== t.data)
          return !1;
        break;
      case this.TEXT_NODE:
      case this.COMMENT_NODE:
        if (this.data !== t.data) return !1;
        break;
    }
    if (this.childNodes.length !== t.childNodes.length)
      return !1;
    for (var e = 0; e < this.childNodes.length; e++)
      if (!this.childNodes[e].isEqualNode(t.childNodes[e]))
        return !1;
    return !0;
  },
  /**
   * Checks whether or not the given node is this node.
   *
   * @param {Node} [otherNode]
   */
  isSameNode: function(t) {
    return this === t;
  },
  /**
   * Inserts a node before a reference node as a child of this node.
   *
   * @param {Node} newChild
   * The new child node to be inserted.
   * @param {Node | null} refChild
   * The reference node before which newChild will be inserted.
   * @returns {Node}
   * The new child node successfully inserted.
   * @throws {DOMException}
   * Throws a DOMException if inserting the node would result in a DOM tree that is not
   * well-formed, or if `child` is provided but is not a child of `parent`.
   * See {@link _insertBefore} for more details.
   * @since Modified in DOM L2
   */
  insertBefore: function(t, e) {
    return io(this, t, e);
  },
  /**
   * Replaces an old child node with a new child node within this node.
   *
   * @param {Node} newChild
   * The new node that is to replace the old node.
   * If it already exists in the DOM, it is removed from its original position.
   * @param {Node} oldChild
   * The existing child node to be replaced.
   * @returns {Node}
   * Returns the replaced child node.
   * @throws {DOMException}
   * Throws a DOMException if replacing the node would result in a DOM tree that is not
   * well-formed, or if `oldChild` is not a child of `this`.
   * This can also occur if the pre-replacement validity assertion fails.
   * See {@link _insertBefore}, {@link Node.removeChild}, and
   * {@link assertPreReplacementValidityInDocument} for more details.
   * @see https://dom.spec.whatwg.org/#concept-node-replace
   */
  replaceChild: function(t, e) {
    io(this, t, e, Nh), e && this.removeChild(e);
  },
  /**
   * Removes an existing child node from this node.
   *
   * @param {Node} oldChild
   * The child node to be removed.
   * @returns {Node}
   * Returns the removed child node.
   * @throws {DOMException}
   * Throws a DOMException if `oldChild` is not a child of `this`.
   * See {@link _removeChild} for more details.
   */
  removeChild: function(t) {
    return Dh(this, t);
  },
  /**
   * Appends a child node to this node.
   *
   * @param {Node} newChild
   * The child node to be appended to this node.
   * If it already exists in the DOM, it is removed from its original position.
   * @returns {Node}
   * Returns the appended child node.
   * @throws {DOMException}
   * Throws a DOMException if appending the node would result in a DOM tree that is not
   * well-formed, or if `newChild` is not a valid Node.
   * See {@link insertBefore} for more details.
   */
  appendChild: function(t) {
    return this.insertBefore(t, null);
  },
  /**
   * Determines whether this node has any child nodes.
   *
   * @returns {boolean}
   * Returns true if this node has any child nodes, and false otherwise.
   */
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  /**
   * Creates a copy of the calling node.
   *
   * @param {boolean} deep
   * If true, the contents of the node are recursively copied.
   * If false, only the node itself (and its attributes, if it is an element) are copied.
   * @returns {Node}
   * Returns the newly created copy of the node.
   * @throws {DOMException}
   * May throw a DOMException if operations within {@link Element#setAttributeNode} or
   * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
   * specific constraints.
   * @see {@link cloneNode}
   */
  cloneNode: function(t) {
    return za(this.ownerDocument || this, this, t);
  },
  /**
   * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
   * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
   *
   * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
   * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
   * nodes.
   *
   * This method operates recursively, so it also normalizes any and all descendent nodes within
   * the subtree.
   *
   * @throws {DOMException}
   * May throw a DOMException if operations within removeChild or appendData (which are
   * potentially invoked in this method) do not meet their specific constraints.
   * @since Modified in DOM Level 2
   * @see {@link Node.removeChild}
   * @see {@link CharacterData.appendData}
   */
  normalize: function() {
    for (var t = this.firstChild; t; ) {
      var e = t.nextSibling;
      e && e.nodeType == no && t.nodeType == no ? (this.removeChild(e), t.appendData(e.data)) : (t.normalize(), t = e);
    }
  },
  /**
   * Checks whether the DOM implementation implements a specific feature and its version.
   *
   * @deprecated
   * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
   * @param {string} feature
   * The package name of the feature to test. This is the same name that can be passed to the
   * method `hasFeature` on `DOMImplementation`.
   * @param {string} version
   * This is the version number of the package name to test.
   * @returns {boolean}
   * Returns true in all cases in the current implementation.
   * @since Introduced in DOM Level 2
   * @see {@link DOMImplementation.hasFeature}
   */
  isSupported: function(t, e) {
    return this.ownerDocument.implementation.hasFeature(t, e);
  },
  /**
   * Look up the prefix associated to the given namespace URI, starting from this node.
   * **The default namespace declarations are ignored by this method.**
   * See Namespace Prefix Lookup for details on the algorithm used by this method.
   *
   * **This behavior is different from the in the specs**:
   * - no node type specific handling
   * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
   *
   * @param {string | null} namespaceURI
   * The namespace URI for which to find the associated prefix.
   * @returns {string | null}
   * The associated prefix, if found; otherwise, null.
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
   * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
   * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
   * @see https://github.com/xmldom/xmldom/issues/322
   * @prettierignore
   */
  lookupPrefix: function(t) {
    for (var e = this; e; ) {
      var r = e._nsMap;
      if (r) {
        for (var n in r)
          if (Pn(r, n) && r[n] === t)
            return n;
      }
      e = e.nodeType == Ln ? e.ownerDocument : e.parentNode;
    }
    return null;
  },
  /**
   * This function is used to look up the namespace URI associated with the given prefix,
   * starting from this node.
   *
   * **This behavior is different from the in the specs**:
   * - no node type specific handling
   * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
   *
   * @param {string | null} prefix
   * The prefix for which to find the associated namespace URI.
   * @returns {string | null}
   * The associated namespace URI, if found; otherwise, null.
   * @since DOM Level 3
   * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
   * @prettierignore
   */
  lookupNamespaceURI: function(t) {
    for (var e = this; e; ) {
      var r = e._nsMap;
      if (r && Pn(r, t))
        return r[t];
      e = e.nodeType == Ln ? e.ownerDocument : e.parentNode;
    }
    return null;
  },
  /**
   * Determines whether the given namespace URI is the default namespace.
   *
   * The function works by looking up the prefix associated with the given namespace URI. If no
   * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
   * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
   * the default.
   *
   * **This behavior is different from the in the specs**:
   * - no node type specific handling
   * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
   *
   * @param {string | null} namespaceURI
   * The namespace URI to be checked.
   * @returns {boolean}
   * Returns true if the given namespace URI is the default namespace, false otherwise.
   * @since DOM Level 3
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
   * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
   * @prettierignore
   */
  isDefaultNamespace: function(t) {
    var e = this.lookupPrefix(t);
    return e == null;
  },
  /**
   * Compares the reference node with a node with regard to their position in the document and
   * according to the document order.
   *
   * @param {Node} other
   * The node to compare the reference node to.
   * @returns {number}
   * Returns how the node is positioned relatively to the reference node according to the
   * bitmask. 0 if reference node and given node are the same.
   * @since DOM Level 3
   * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
   * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
   */
  compareDocumentPosition: function(t) {
    if (this === t) return 0;
    var e = t, r = this, n = null, i = null;
    if (e instanceof jr && (n = e, e = n.ownerElement), r instanceof jr && (i = r, r = i.ownerElement, n && e && r === e))
      for (var s = 0, o; o = r.attributes[s]; s++) {
        if (o === n)
          return ve.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + ve.DOCUMENT_POSITION_PRECEDING;
        if (o === i)
          return ve.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + ve.DOCUMENT_POSITION_FOLLOWING;
      }
    if (!e || !r || r.ownerDocument !== e.ownerDocument)
      return ve.DOCUMENT_POSITION_DISCONNECTED + ve.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (jc(r.ownerDocument) > jc(e.ownerDocument) ? ve.DOCUMENT_POSITION_FOLLOWING : ve.DOCUMENT_POSITION_PRECEDING);
    if (i && e === r)
      return ve.DOCUMENT_POSITION_CONTAINS + ve.DOCUMENT_POSITION_PRECEDING;
    if (n && e === r)
      return ve.DOCUMENT_POSITION_CONTAINED_BY + ve.DOCUMENT_POSITION_FOLLOWING;
    for (var a = [], u = e.parentNode; u; ) {
      if (!i && u === r)
        return ve.DOCUMENT_POSITION_CONTAINED_BY + ve.DOCUMENT_POSITION_FOLLOWING;
      a.push(u), u = u.parentNode;
    }
    a.reverse();
    for (var l = [], c = r.parentNode; c; ) {
      if (!n && c === e)
        return ve.DOCUMENT_POSITION_CONTAINS + ve.DOCUMENT_POSITION_PRECEDING;
      l.push(c), c = c.parentNode;
    }
    l.reverse();
    var d = xh(a, l);
    for (var f in d.childNodes) {
      var g = d.childNodes[f];
      if (g === r) return ve.DOCUMENT_POSITION_FOLLOWING;
      if (g === e) return ve.DOCUMENT_POSITION_PRECEDING;
      if (l.indexOf(g) >= 0) return ve.DOCUMENT_POSITION_FOLLOWING;
      if (a.indexOf(g) >= 0) return ve.DOCUMENT_POSITION_PRECEDING;
    }
    return 0;
  }
};
function kh(t) {
  return t == "<" && "&lt;" || t == ">" && "&gt;" || t == "&" && "&amp;" || t == '"' && "&quot;" || "&#" + t.charCodeAt() + ";";
}
Hn(Qe, ie);
Hn(Qe, ie.prototype);
Hn(ve, ie);
Hn(ve, ie.prototype);
function xi(t, e) {
  if (e(t))
    return !0;
  if (t = t.firstChild)
    do
      if (xi(t, e))
        return !0;
    while (t = t.nextSibling);
}
function lr(t, e) {
  Ye(t);
  var r = e || {};
  this.ownerDocument = this, this.contentType = r.contentType || hi.XML_APPLICATION, this.type = S0(this.contentType) ? "html" : "xml";
}
function j0(t, e, r) {
  t && t._inc++;
  var n = r.namespaceURI;
  n === Lt.XMLNS && (e._nsMap[r.prefix ? r.localName : ""] = r.value);
}
function Ah(t, e, r, n) {
  t && t._inc++;
  var i = r.namespaceURI;
  i === Lt.XMLNS && delete e._nsMap[r.prefix ? r.localName : ""];
}
function wh(t, e, r) {
  if (t && t._inc) {
    t._inc++;
    var n = e.childNodes;
    if (r && !r.nextSibling)
      n[n.length++] = r;
    else {
      for (var i = e.firstChild, s = 0; i; )
        n[s++] = i, i = i.nextSibling;
      n.length = s, delete n[n.length];
    }
  }
}
function Dh(t, e) {
  if (t !== e.parentNode)
    throw new H(H.NOT_FOUND_ERR, "child's parent is not parent");
  var r = e.previousSibling, n = e.nextSibling;
  return r ? r.nextSibling = n : t.firstChild = n, n ? n.previousSibling = r : t.lastChild = r, wh(t.ownerDocument, t), e.parentNode = null, e.previousSibling = null, e.nextSibling = null, e;
}
function $0(t) {
  return t && (t.nodeType === ie.DOCUMENT_NODE || t.nodeType === ie.DOCUMENT_FRAGMENT_NODE || t.nodeType === ie.ELEMENT_NODE);
}
function U0(t) {
  return t && (t.nodeType === ie.CDATA_SECTION_NODE || t.nodeType === ie.COMMENT_NODE || t.nodeType === ie.DOCUMENT_FRAGMENT_NODE || t.nodeType === ie.DOCUMENT_TYPE_NODE || t.nodeType === ie.ELEMENT_NODE || t.nodeType === ie.PROCESSING_INSTRUCTION_NODE || t.nodeType === ie.TEXT_NODE);
}
function cr(t) {
  return t && t.nodeType === ie.DOCUMENT_TYPE_NODE;
}
function zt(t) {
  return t && t.nodeType === ie.ELEMENT_NODE;
}
function Sh(t) {
  return t && t.nodeType === ie.TEXT_NODE;
}
function Uc(t, e) {
  var r = t.childNodes || [];
  if (Ot(r, zt) || cr(e))
    return !1;
  var n = Ot(r, cr);
  return !(e && n && r.indexOf(n) > r.indexOf(e));
}
function Vc(t, e) {
  var r = t.childNodes || [];
  function n(s) {
    return zt(s) && s !== e;
  }
  if (Ot(r, n))
    return !1;
  var i = Ot(r, cr);
  return !(e && i && r.indexOf(i) > r.indexOf(e));
}
function V0(t, e, r) {
  if (!$0(t))
    throw new H(H.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + t.nodeType);
  if (r && r.parentNode !== t)
    throw new H(H.NOT_FOUND_ERR, "child not in parent");
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !U0(e) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    cr(e) && t.nodeType !== ie.DOCUMENT_NODE
  )
    throw new H(
      H.HIERARCHY_REQUEST_ERR,
      "Unexpected node type " + e.nodeType + " for parent node type " + t.nodeType
    );
}
function W0(t, e, r) {
  var n = t.childNodes || [], i = e.childNodes || [];
  if (e.nodeType === ie.DOCUMENT_FRAGMENT_NODE) {
    var s = i.filter(zt);
    if (s.length > 1 || Ot(i, Sh))
      throw new H(H.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    if (s.length === 1 && !Uc(t, r))
      throw new H(H.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
  }
  if (zt(e) && !Uc(t, r))
    throw new H(H.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
  if (cr(e)) {
    if (Ot(n, cr))
      throw new H(H.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    var o = Ot(n, zt);
    if (r && n.indexOf(o) < n.indexOf(r))
      throw new H(H.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    if (!r && o)
      throw new H(H.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
  }
}
function Nh(t, e, r) {
  var n = t.childNodes || [], i = e.childNodes || [];
  if (e.nodeType === ie.DOCUMENT_FRAGMENT_NODE) {
    var s = i.filter(zt);
    if (s.length > 1 || Ot(i, Sh))
      throw new H(H.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    if (s.length === 1 && !Vc(t, r))
      throw new H(H.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
  }
  if (zt(e) && !Vc(t, r))
    throw new H(H.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
  if (cr(e)) {
    if (Ot(n, function(u) {
      return cr(u) && u !== r;
    }))
      throw new H(H.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    var o = Ot(n, zt);
    if (r && n.indexOf(o) < n.indexOf(r))
      throw new H(H.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
  }
}
function io(t, e, r, n) {
  V0(t, e, r), t.nodeType === ie.DOCUMENT_NODE && (n || W0)(t, e, r);
  var i = e.parentNode;
  if (i && i.removeChild(e), e.nodeType === ur) {
    var s = e.firstChild;
    if (s == null)
      return e;
    var o = e.lastChild;
  } else
    s = o = e;
  var a = r ? r.previousSibling : t.lastChild;
  s.previousSibling = a, o.nextSibling = r, a ? a.nextSibling = s : t.firstChild = s, r == null ? t.lastChild = o : r.previousSibling = o;
  do
    s.parentNode = t;
  while (s !== o && (s = s.nextSibling));
  return wh(t.ownerDocument || t, t, e), e.nodeType == ur && (e.firstChild = e.lastChild = null), e;
}
lr.prototype = {
  /**
   * The implementation that created this document.
   *
   * @type DOMImplementation
   * @readonly
   */
  implementation: null,
  nodeName: "#document",
  nodeType: Ui,
  /**
   * The DocumentType node of the document.
   *
   * @type DocumentType
   * @readonly
   */
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(t, e) {
    if (t.nodeType === ur) {
      for (var r = t.firstChild; r; ) {
        var n = r.nextSibling;
        this.insertBefore(r, e), r = n;
      }
      return t;
    }
    return io(this, t, e), t.ownerDocument = this, this.documentElement === null && t.nodeType === ft && (this.documentElement = t), t;
  },
  removeChild: function(t) {
    var e = Dh(this, t);
    return e === this.documentElement && (this.documentElement = null), e;
  },
  replaceChild: function(t, e) {
    io(this, t, e, Nh), t.ownerDocument = this, e && this.removeChild(e), zt(t) && (this.documentElement = t);
  },
  // Introduced in DOM Level 2:
  importNode: function(t, e) {
    return Ih(this, t, e);
  },
  // Introduced in DOM Level 2:
  getElementById: function(t) {
    var e = null;
    return xi(this.documentElement, function(r) {
      if (r.nodeType == ft && r.getAttribute("id") == t)
        return e = r, !0;
    }), e;
  },
  /**
   * Creates a new `Element` that is owned by this `Document`.
   * In HTML Documents `localName` is the lower cased `tagName`,
   * otherwise no transformation is being applied.
   * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
   *
   * __This implementation differs from the specification:__ - The provided name is not checked
   * against the `Name` production,
   * so no related error will be thrown.
   * - There is no interface `HTMLElement`, it is always an `Element`.
   * - There is no support for a second argument to indicate using custom elements.
   *
   * @param {string} tagName
   * @returns {Element}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
   * @see https://dom.spec.whatwg.org/#dom-document-createelement
   * @see https://dom.spec.whatwg.org/#concept-create-element
   */
  createElement: function(t) {
    var e = new dr(Ue);
    e.ownerDocument = this, this.type === "html" && (t = t.toLowerCase()), D0(this.contentType) && (e.namespaceURI = Lt.HTML), e.nodeName = t, e.tagName = t, e.localName = t, e.childNodes = new we();
    var r = e.attributes = new Fn();
    return r._ownerElement = e, e;
  },
  /**
   * @returns {DocumentFragment}
   */
  createDocumentFragment: function() {
    var t = new cs(Ue);
    return t.ownerDocument = this, t.childNodes = new we(), t;
  },
  /**
   * @param {string} data
   * @returns {Text}
   */
  createTextNode: function(t) {
    var e = new ls(Ue);
    return e.ownerDocument = this, e.childNodes = new we(), e.appendData(t), e;
  },
  /**
   * @param {string} data
   * @returns {Comment}
   */
  createComment: function(t) {
    var e = new No(Ue);
    return e.ownerDocument = this, e.childNodes = new we(), e.appendData(t), e;
  },
  /**
   * @param {string} data
   * @returns {CDATASection}
   */
  createCDATASection: function(t) {
    var e = new Mo(Ue);
    return e.ownerDocument = this, e.childNodes = new we(), e.appendData(t), e;
  },
  /**
   * @param {string} target
   * @param {string} data
   * @returns {ProcessingInstruction}
   */
  createProcessingInstruction: function(t, e) {
    var r = new Ro(Ue);
    return r.ownerDocument = this, r.childNodes = new we(), r.nodeName = r.target = t, r.nodeValue = r.data = e, r;
  },
  /**
   * Creates an `Attr` node that is owned by this document.
   * In HTML Documents `localName` is the lower cased `name`,
   * otherwise no transformation is being applied.
   *
   * __This implementation differs from the specification:__ - The provided name is not checked
   * against the `Name` production,
   * so no related error will be thrown.
   *
   * @param {string} name
   * @returns {Attr}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
   * @see https://dom.spec.whatwg.org/#dom-document-createattribute
   */
  createAttribute: function(t) {
    if (!Dt.QName_exact.test(t))
      throw new H(H.INVALID_CHARACTER_ERR, 'invalid character in name "' + t + '"');
    return this.type === "html" && (t = t.toLowerCase()), this._createAttribute(t);
  },
  _createAttribute: function(t) {
    var e = new jr(Ue);
    return e.ownerDocument = this, e.childNodes = new we(), e.name = t, e.nodeName = t, e.localName = t, e.specified = !0, e;
  },
  /**
   * Creates an EntityReference object.
   * The current implementation does not fill the `childNodes` with those of the corresponding
   * `Entity`
   *
   * @deprecated
   * In DOM Level 4.
   * @param {string} name
   * The name of the entity to reference. No namespace well-formedness checks are performed.
   * @returns {EntityReference}
   * @throws {DOMException}
   * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
   * @throws {DOMException}
   * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
   */
  createEntityReference: function(t) {
    if (!Dt.Name.test(t))
      throw new H(H.INVALID_CHARACTER_ERR, 'not a valid xml name "' + t + '"');
    if (this.type === "html")
      throw new H("document is an html document", O0.NotSupportedError);
    var e = new Io(Ue);
    return e.ownerDocument = this, e.childNodes = new we(), e.nodeName = t, e;
  },
  // Introduced in DOM Level 2:
  /**
   * @param {string} namespaceURI
   * @param {string} qualifiedName
   * @returns {Element}
   */
  createElementNS: function(t, e) {
    var r = Ha(t, e), n = new dr(Ue), i = n.attributes = new Fn();
    return n.childNodes = new we(), n.ownerDocument = this, n.nodeName = e, n.tagName = e, n.namespaceURI = r[0], n.prefix = r[1], n.localName = r[2], i._ownerElement = n, n;
  },
  // Introduced in DOM Level 2:
  /**
   * @param {string} namespaceURI
   * @param {string} qualifiedName
   * @returns {Attr}
   */
  createAttributeNS: function(t, e) {
    var r = Ha(t, e), n = new jr(Ue);
    return n.ownerDocument = this, n.childNodes = new we(), n.nodeName = e, n.name = e, n.specified = !0, n.namespaceURI = r[0], n.prefix = r[1], n.localName = r[2], n;
  }
};
Xe(lr, ie);
function dr(t) {
  Ye(t), this._nsMap = /* @__PURE__ */ Object.create(null);
}
dr.prototype = {
  nodeType: ft,
  /**
   * The attributes of this element.
   *
   * @type {NamedNodeMap | null}
   */
  attributes: null,
  getQualifiedName: function() {
    return this.prefix ? this.prefix + ":" + this.localName : this.localName;
  },
  _isInHTMLDocumentAndNamespace: function() {
    return this.ownerDocument.type === "html" && this.namespaceURI === Lt.HTML;
  },
  /**
   * Implementaton of Level2 Core function hasAttributes.
   *
   * @returns {boolean}
   * True if attribute list is not empty.
   * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
   */
  hasAttributes: function() {
    return !!(this.attributes && this.attributes.length);
  },
  hasAttribute: function(t) {
    return !!this.getAttributeNode(t);
  },
  /**
   * Returns element’s first attribute whose qualified name is `name`, and `null`
   * if there is no such attribute.
   *
   * @param {string} name
   * @returns {string | null}
   */
  getAttribute: function(t) {
    var e = this.getAttributeNode(t);
    return e ? e.value : null;
  },
  getAttributeNode: function(t) {
    return this._isInHTMLDocumentAndNamespace() && (t = t.toLowerCase()), this.attributes.getNamedItem(t);
  },
  /**
   * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
   *
   * @param {string} name
   * @param {string} value
   */
  setAttribute: function(t, e) {
    this._isInHTMLDocumentAndNamespace() && (t = t.toLowerCase());
    var r = this.getAttributeNode(t);
    r ? r.value = r.nodeValue = "" + e : (r = this.ownerDocument._createAttribute(t), r.value = r.nodeValue = "" + e, this.setAttributeNode(r));
  },
  removeAttribute: function(t) {
    var e = this.getAttributeNode(t);
    e && this.removeAttributeNode(e);
  },
  setAttributeNode: function(t) {
    return this.attributes.setNamedItem(t);
  },
  setAttributeNodeNS: function(t) {
    return this.attributes.setNamedItemNS(t);
  },
  removeAttributeNode: function(t) {
    return this.attributes.removeNamedItem(t.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(t, e) {
    var r = this.getAttributeNodeNS(t, e);
    r && this.removeAttributeNode(r);
  },
  hasAttributeNS: function(t, e) {
    return this.getAttributeNodeNS(t, e) != null;
  },
  /**
   * Returns element’s attribute whose namespace is `namespaceURI` and local name is
   * `localName`,
   * or `null` if there is no such attribute.
   *
   * @param {string} namespaceURI
   * @param {string} localName
   * @returns {string | null}
   */
  getAttributeNS: function(t, e) {
    var r = this.getAttributeNodeNS(t, e);
    return r ? r.value : null;
  },
  /**
   * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
   * `localName` to value.
   *
   * @param {string} namespaceURI
   * @param {string} qualifiedName
   * @param {string} value
   * @see https://dom.spec.whatwg.org/#dom-element-setattributens
   */
  setAttributeNS: function(t, e, r) {
    var n = Ha(t, e), i = n[2], s = this.getAttributeNodeNS(t, i);
    s ? s.value = s.nodeValue = "" + r : (s = this.ownerDocument.createAttributeNS(t, e), s.value = s.nodeValue = "" + r, this.setAttributeNode(s));
  },
  getAttributeNodeNS: function(t, e) {
    return this.attributes.getNamedItemNS(t, e);
  },
  /**
   * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
   *
   * Returns an empty list if `classNames` is an empty string or only contains HTML white space
   * characters.
   *
   * Warning: This returns a live LiveNodeList.
   * Changes in the DOM will reflect in the array as the changes occur.
   * If an element selected by this array no longer qualifies for the selector,
   * it will automatically be removed. Be aware of this for iteration purposes.
   *
   * @param {string} classNames
   * Is a string representing the class name(s) to match; multiple class names are separated by
   * (ASCII-)whitespace.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
   * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
   */
  getElementsByClassName: function(t) {
    var e = Bc(t);
    return new Nr(this, function(r) {
      var n = [];
      return e.length > 0 && xi(r, function(i) {
        if (i !== r && i.nodeType === ft) {
          var s = i.getAttribute("class");
          if (s) {
            var o = t === s;
            if (!o) {
              var a = Bc(s);
              o = e.every(L0(a));
            }
            o && n.push(i);
          }
        }
      }), n;
    });
  },
  /**
   * Returns a LiveNodeList of elements with the given qualifiedName.
   * Searching for all descendants can be done by passing `*` as `qualifiedName`.
   *
   * All descendants of the specified element are searched, but not the element itself.
   * The returned list is live, which means it updates itself with the DOM tree automatically.
   * Therefore, there is no need to call `Element.getElementsByTagName()`
   * with the same element and arguments repeatedly if the DOM changes in between calls.
   *
   * When called on an HTML element in an HTML document,
   * `getElementsByTagName` lower-cases the argument before searching for it.
   * This is undesirable when trying to match camel-cased SVG elements (such as
   * `<linearGradient>`) in an HTML document.
   * Instead, use `Element.getElementsByTagNameNS()`,
   * which preserves the capitalization of the tag name.
   *
   * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
   * except that it only searches for elements that are descendants of the specified element.
   *
   * @param {string} qualifiedName
   * @returns {LiveNodeList}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
   * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
   */
  getElementsByTagName: function(t) {
    var e = (this.nodeType === Ui ? this : this.ownerDocument).type === "html", r = t.toLowerCase();
    return new Nr(this, function(n) {
      var i = [];
      return xi(n, function(s) {
        if (!(s === n || s.nodeType !== ft))
          if (t === "*")
            i.push(s);
          else {
            var o = s.getQualifiedName(), a = e && s.namespaceURI === Lt.HTML ? r : t;
            o === a && i.push(s);
          }
      }), i;
    });
  },
  getElementsByTagNameNS: function(t, e) {
    return new Nr(this, function(r) {
      var n = [];
      return xi(r, function(i) {
        i !== r && i.nodeType === ft && (t === "*" || i.namespaceURI === t) && (e === "*" || i.localName == e) && n.push(i);
      }), n;
    });
  }
};
lr.prototype.getElementsByClassName = dr.prototype.getElementsByClassName;
lr.prototype.getElementsByTagName = dr.prototype.getElementsByTagName;
lr.prototype.getElementsByTagNameNS = dr.prototype.getElementsByTagNameNS;
Xe(dr, ie);
function jr(t) {
  Ye(t), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
}
jr.prototype.nodeType = Ln;
Xe(jr, ie);
function zn(t) {
  Ye(t);
}
zn.prototype = {
  data: "",
  substringData: function(t, e) {
    return this.data.substring(t, t + e);
  },
  appendData: function(t) {
    t = this.data + t, this.nodeValue = this.data = t, this.length = t.length;
  },
  insertData: function(t, e) {
    this.replaceData(t, 0, e);
  },
  deleteData: function(t, e) {
    this.replaceData(t, e, "");
  },
  replaceData: function(t, e, r) {
    var n = this.data.substring(0, t), i = this.data.substring(t + e);
    r = n + r + i, this.nodeValue = this.data = r, this.length = r.length;
  }
};
Xe(zn, ie);
function ls(t) {
  Ye(t);
}
ls.prototype = {
  nodeName: "#text",
  nodeType: no,
  splitText: function(t) {
    var e = this.data, r = e.substring(t);
    e = e.substring(0, t), this.data = this.nodeValue = e, this.length = e.length;
    var n = this.ownerDocument.createTextNode(r);
    return this.parentNode && this.parentNode.insertBefore(n, this.nextSibling), n;
  }
};
Xe(ls, zn);
function No(t) {
  Ye(t);
}
No.prototype = {
  nodeName: "#comment",
  nodeType: bh
};
Xe(No, zn);
function Mo(t) {
  Ye(t);
}
Mo.prototype = {
  nodeName: "#cdata-section",
  nodeType: yh
};
Xe(Mo, ls);
function Oo(t) {
  Ye(t);
}
Oo.prototype.nodeType = Eh;
Xe(Oo, ie);
function Vu(t) {
  Ye(t);
}
Vu.prototype.nodeType = q0;
Xe(Vu, ie);
function Wu(t) {
  Ye(t);
}
Wu.prototype.nodeType = F0;
Xe(Wu, ie);
function Io(t) {
  Ye(t);
}
Io.prototype.nodeType = _h;
Xe(Io, ie);
function cs(t) {
  Ye(t);
}
cs.prototype.nodeName = "#document-fragment";
cs.prototype.nodeType = ur;
Xe(cs, ie);
function Ro(t) {
  Ye(t);
}
Ro.prototype.nodeType = vh;
Xe(Ro, zn);
function Mh() {
}
Mh.prototype.serializeToString = function(t, e) {
  return Oh.call(t, e);
};
ie.prototype.toString = Oh;
function Oh(t) {
  var e = [], r = this.nodeType === Ui && this.documentElement || this, n = r.prefix, i = r.namespaceURI;
  if (i && n == null) {
    var n = r.lookupPrefix(i);
    if (n == null)
      var s = [
        { namespace: i, prefix: null }
        //{namespace:uri,prefix:''}
      ];
  }
  return mn(this, e, t, s), e.join("");
}
function Wc(t, e, r) {
  var n = t.prefix || "", i = t.namespaceURI;
  if (!i || n === "xml" && i === Lt.XML || i === Lt.XMLNS)
    return !1;
  for (var s = r.length; s--; ) {
    var o = r[s];
    if (o.prefix === n)
      return o.namespace !== i;
  }
  return !0;
}
function fa(t, e, r) {
  t.push(" ", e, '="', r.replace(/[<>&"\t\n\r]/g, kh), '"');
}
function mn(t, e, r, n) {
  n || (n = []);
  var i = t.nodeType === Ui ? t : t.ownerDocument, s = i.type === "html";
  if (r)
    if (t = r(t), t) {
      if (typeof t == "string") {
        e.push(t);
        return;
      }
    } else
      return;
  switch (t.nodeType) {
    case ft:
      var o = t.attributes, a = o.length, v = t.firstChild, u = t.tagName, l = u;
      if (!s && !t.prefix && t.namespaceURI) {
        for (var c, d = 0; d < o.length; d++)
          if (o.item(d).name === "xmlns") {
            c = o.item(d).value;
            break;
          }
        if (!c)
          for (var f = n.length - 1; f >= 0; f--) {
            var g = n[f];
            if (g.prefix === "" && g.namespace === t.namespaceURI) {
              c = g.namespace;
              break;
            }
          }
        if (c !== t.namespaceURI)
          for (var f = n.length - 1; f >= 0; f--) {
            var g = n[f];
            if (g.namespace === t.namespaceURI) {
              g.prefix && (l = g.prefix + ":" + u);
              break;
            }
          }
      }
      e.push("<", l);
      for (var h = 0; h < a; h++) {
        var p = o.item(h);
        p.prefix == "xmlns" ? n.push({
          prefix: p.localName,
          namespace: p.value
        }) : p.nodeName == "xmlns" && n.push({ prefix: "", namespace: p.value });
      }
      for (var h = 0; h < a; h++) {
        var p = o.item(h);
        if (Wc(p, s, n)) {
          var m = p.prefix || "", _ = p.namespaceURI;
          fa(e, m ? "xmlns:" + m : "xmlns", _), n.push({ prefix: m, namespace: _ });
        }
        mn(p, e, r, n);
      }
      if (u === l && Wc(t, s, n)) {
        var m = t.prefix || "", _ = t.namespaceURI;
        fa(e, m ? "xmlns:" + m : "xmlns", _), n.push({ prefix: m, namespace: _ });
      }
      var y = !v;
      if (y && (s || t.namespaceURI === Lt.HTML) && (y = M0(u)), y)
        e.push("/>");
      else {
        if (e.push(">"), s && N0(u))
          for (; v; )
            v.data ? e.push(v.data) : mn(v, e, r, n.slice()), v = v.nextSibling;
        else
          for (; v; )
            mn(v, e, r, n.slice()), v = v.nextSibling;
        e.push("</", l, ">");
      }
      return;
    case Ui:
    case ur:
      for (var v = t.firstChild; v; )
        mn(v, e, r, n.slice()), v = v.nextSibling;
      return;
    case Ln:
      return fa(e, t.name, t.value);
    case no:
      return e.push(t.data.replace(/[<&>]/g, kh));
    case yh:
      return e.push(Dt.CDATA_START, t.data, Dt.CDATA_END);
    case bh:
      return e.push(Dt.COMMENT_START, t.data, Dt.COMMENT_END);
    case Eh:
      var C = t.publicId, T = t.systemId;
      e.push(Dt.DOCTYPE_DECL_START, " ", t.name), C ? (e.push(" ", Dt.PUBLIC, " ", C), T && T !== "." && e.push(" ", T)) : T && T !== "." && e.push(" ", Dt.SYSTEM, " ", T), t.internalSubset && e.push(" [", t.internalSubset, "]"), e.push(">");
      return;
    case vh:
      return e.push("<?", t.target, " ", t.data, "?>");
    case _h:
      return e.push("&", t.nodeName, ";");
    //case ENTITY_NODE:
    //case NOTATION_NODE:
    default:
      e.push("??", t.nodeName);
  }
}
function Ih(t, e, r) {
  var n;
  switch (e.nodeType) {
    case ft:
      n = e.cloneNode(!1), n.ownerDocument = t;
    //var attrs = node2.attributes;
    //var len = attrs.length;
    //for(var i=0;i<len;i++){
    //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
    //}
    case ur:
      break;
    case Ln:
      r = !0;
      break;
  }
  if (n || (n = e.cloneNode(!1)), n.ownerDocument = t, n.parentNode = null, r)
    for (var i = e.firstChild; i; )
      n.appendChild(Ih(t, i, r)), i = i.nextSibling;
  return n;
}
function za(t, e, r) {
  var n = new e.constructor(Ue);
  for (var i in e)
    if (Pn(e, i)) {
      var s = e[i];
      typeof s != "object" && s != n[i] && (n[i] = s);
    }
  switch (e.childNodes && (n.childNodes = new we()), n.ownerDocument = t, n.nodeType) {
    case ft:
      var o = e.attributes, a = n.attributes = new Fn(), u = o.length;
      a._ownerElement = n;
      for (var l = 0; l < u; l++)
        n.setAttributeNode(za(t, o.item(l), !0));
      break;
    case Ln:
      r = !0;
  }
  if (r)
    for (var c = e.firstChild; c; )
      n.appendChild(za(t, c, r)), c = c.nextSibling;
  return n;
}
function Rh(t, e, r) {
  t[e] = r;
}
try {
  if (Object.defineProperty) {
    let t = function(e) {
      switch (e.nodeType) {
        case ft:
        case ur:
          var r = [];
          for (e = e.firstChild; e; )
            e.nodeType !== 7 && e.nodeType !== 8 && r.push(t(e)), e = e.nextSibling;
          return r.join("");
        default:
          return e.nodeValue;
      }
    };
    Object.defineProperty(Nr.prototype, "length", {
      get: function() {
        return So(this), this.$$length;
      }
    }), Object.defineProperty(ie.prototype, "textContent", {
      get: function() {
        return t(this);
      },
      set: function(e) {
        switch (this.nodeType) {
          case ft:
          case ur:
            for (; this.firstChild; )
              this.removeChild(this.firstChild);
            (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
            break;
          default:
            this.data = e, this.value = e, this.nodeValue = e;
        }
      }
    }), Rh = function(e, r, n) {
      e["$$" + r] = n;
    };
  }
} catch {
}
Ce._updateLiveList = So;
Ce.Attr = jr;
Ce.CDATASection = Mo;
Ce.CharacterData = zn;
Ce.Comment = No;
Ce.Document = lr;
Ce.DocumentFragment = cs;
Ce.DocumentType = Oo;
Ce.DOMImplementation = Th;
Ce.Element = dr;
Ce.Entity = Wu;
Ce.EntityReference = Io;
Ce.LiveNodeList = Nr;
Ce.NamedNodeMap = Fn;
Ce.Node = ie;
Ce.NodeList = we;
Ce.Notation = Vu;
Ce.Text = ls;
Ce.ProcessingInstruction = Ro;
Ce.XMLSerializer = Mh;
var Ph = {};
(function(t) {
  var e = Ee.freeze;
  t.XML_ENTITIES = e({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  }), t.HTML_ENTITIES = e({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "𝒷",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "𝔠",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "𝕔",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "𝒻",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "𝔥",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "𝕙",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "𝒽",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "𝔦",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "𝒾",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "𝓁",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "𝓂",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: `
`,
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "𝕟",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "𝕡",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "𝕢",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "𝔯",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "𝕣",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "𝓇",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "	",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "𝔷",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "𝕫",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "‍",
    zwnj: "‌"
  }), t.entityMap = t.HTML_ENTITIES;
})(Ph);
var Po = {}, Kn = Ee, X = Q, Lh = Gr, H0 = Kn.isHTMLEscapableRawTextElement, z0 = Kn.isHTMLMimeType, K0 = Kn.isHTMLRawTextElement, Vi = Kn.hasOwn, Hc = Kn.NAMESPACE, zc = Lh.ParseError, J0 = Lh.DOMException, si = 0, er = 1, un = 2, oi = 3, ln = 4, cn = 5, ai = 6, As = 7;
function Fh() {
}
Fh.prototype = {
  parse: function(t, e, r) {
    var n = this.domBuilder;
    n.startDocument(), qh(e, e = /* @__PURE__ */ Object.create(null)), G0(t, e, r, n, this.errorHandler), n.endDocument();
  }
};
var Hu = /&#?\w+;?/g;
function G0(t, e, r, n, i) {
  var s = z0(n.mimeType);
  t.indexOf(X.UNICODE_REPLACEMENT_CHARACTER) >= 0 && i.warning("Unicode replacement character detected, source encoding issues?");
  function o(V) {
    if (V > 65535) {
      V -= 65536;
      var he = 55296 + (V >> 10), je = 56320 + (V & 1023);
      return String.fromCharCode(he, je);
    } else
      return String.fromCharCode(V);
  }
  function a(V) {
    var he = V[V.length - 1] === ";" ? V : V + ";";
    if (!s && he !== V)
      return i.error("EntityRef: expecting ;"), V;
    var je = X.Reference.exec(he);
    if (!je || je[0].length !== he.length)
      return i.error("entity not matching Reference production: " + V), V;
    var ze = he.slice(1, -1);
    return Vi(r, ze) ? r[ze] : ze.charAt(0) === "#" ? o(parseInt(ze.substr(1).replace("x", "0x"))) : (i.error("entity not found:" + V), V);
  }
  function u(V) {
    if (V > m) {
      var he = t.substring(m, V).replace(Hu, a);
      g && l(m), n.characters(he, 0, V - m), m = V;
    }
  }
  function l(V, he) {
    for (; V >= d && (he = f.exec(t)); )
      c = he.index, d = c + he[0].length, g.lineNumber++;
    g.columnNumber = V - c + 1;
  }
  for (var c = 0, d = 0, f = /.*(?:\r\n?|\n)|.*$/g, g = n.locator, h = [{ currentNSMap: e }], p = [], m = 0; ; ) {
    try {
      var _ = t.indexOf("<", m);
      if (_ < 0) {
        if (!s && p.length > 0)
          return i.fatalError("unclosed xml tag(s): " + p.join(", "));
        if (!t.substring(m).match(/^\s*$/)) {
          var y = n.doc, v = y.createTextNode(t.substr(m));
          if (y.documentElement)
            return i.error("Extra content at the end of the document");
          y.appendChild(v), n.currentElement = v;
        }
        return;
      }
      if (_ > m) {
        var C = t.substring(m, _);
        !s && p.length === 0 && (C = C.replace(new RegExp(X.S_OPT.source, "g"), ""), C && i.error("Unexpected content outside root element: '" + C + "'")), u(_);
      }
      switch (t.charAt(_ + 1)) {
        case "/":
          var P = t.indexOf(">", _ + 2), T = t.substring(_ + 2, P > 0 ? P : void 0);
          if (!T)
            return i.fatalError("end tag name missing");
          var k = P > 0 && X.reg("^", X.QName_group, X.S_OPT, "$").exec(T);
          if (!k)
            return i.fatalError('end tag name contains invalid characters: "' + T + '"');
          if (!n.currentElement && !n.doc.documentElement)
            return;
          var N = p[p.length - 1] || n.currentElement.tagName || n.doc.documentElement.tagName || "";
          if (N !== k[1]) {
            var A = k[1].toLowerCase();
            if (!s || N.toLowerCase() !== A)
              return i.fatalError('Opening and ending tag mismatch: "' + N + '" != "' + T + '"');
          }
          var D = h.pop();
          p.pop();
          var L = D.localNSMap;
          if (n.endElement(D.uri, D.localName, N), L)
            for (var W in L)
              Vi(L, W) && n.endPrefixMapping(W);
          P++;
          break;
        // end element
        case "?":
          g && l(_), P = Z0(t, _, n, i);
          break;
        case "!":
          g && l(_), P = jh(t, _, n, i, s);
          break;
        default:
          g && l(_);
          var U = new $h(), M = h[h.length - 1].currentNSMap, P = Y0(t, _, U, M, a, i, s), Y = U.length;
          if (U.closed || (s && Kn.isHTMLVoidElement(U.tagName) ? U.closed = !0 : p.push(U.tagName)), g && Y) {
            for (var Z = Kc(g, {}), de = 0; de < Y; de++) {
              var ae = U[de];
              l(ae.offset), ae.locator = Kc(g, {});
            }
            n.locator = Z, Jc(U, n, M) && h.push(U), n.locator = g;
          } else
            Jc(U, n, M) && h.push(U);
          s && !U.closed ? P = X0(t, P, U.tagName, a, n) : P++;
      }
    } catch (V) {
      if (V instanceof zc)
        throw V;
      if (V instanceof J0)
        throw new zc(V.name + ": " + V.message, n.locator, V);
      i.error("element parse error: " + V), P = -1;
    }
    P > m ? m = P : u(Math.max(_, m) + 1);
  }
}
function Kc(t, e) {
  return e.lineNumber = t.lineNumber, e.columnNumber = t.columnNumber, e;
}
function Y0(t, e, r, n, i, s, o) {
  function a(g, h, p) {
    if (Vi(r.attributeNames, g))
      return s.fatalError("Attribute " + g + " redefined");
    if (!o && h.indexOf("<") >= 0)
      return s.fatalError("Unescaped '<' not allowed in attributes values");
    r.addValue(
      g,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      h.replace(/[\t\n\r]/g, " ").replace(Hu, i),
      p
    );
  }
  for (var u, l, c = ++e, d = si; ; ) {
    var f = t.charAt(c);
    switch (f) {
      case "=":
        if (d === er)
          u = t.slice(e, c), d = oi;
        else if (d === un)
          d = oi;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (d === oi || d === er)
          if (d === er && (s.warning('attribute value must after "="'), u = t.slice(e, c)), e = c + 1, c = t.indexOf(f, e), c > 0)
            l = t.slice(e, c), a(u, l, e - 1), d = cn;
          else
            throw new Error("attribute value no end '" + f + "' match");
        else if (d == ln)
          l = t.slice(e, c), a(u, l, e), s.warning('attribute "' + u + '" missed start quot(' + f + ")!!"), e = c + 1, d = cn;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (d) {
          case si:
            r.setTagName(t.slice(e, c));
          case cn:
          case ai:
          case As:
            d = As, r.closed = !0;
          case ln:
          case er:
            break;
          case un:
            r.closed = !0;
            break;
          //case S_EQ:
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return s.error("unexpected end of input"), d == si && r.setTagName(t.slice(e, c)), c;
      case ">":
        switch (d) {
          case si:
            r.setTagName(t.slice(e, c));
          case cn:
          case ai:
          case As:
            break;
          //normal
          case ln:
          //Compatible state
          case er:
            l = t.slice(e, c), l.slice(-1) === "/" && (r.closed = !0, l = l.slice(0, -1));
          case un:
            d === un && (l = u), d == ln ? (s.warning('attribute "' + l + '" missed quot(")!'), a(u, l, e)) : (o || s.warning('attribute "' + l + '" missed value!! "' + l + '" instead!!'), a(l, l, e));
            break;
          case oi:
            if (!o)
              return s.fatalError(`AttValue: ' or " expected`);
        }
        return c;
      /*xml space '\x20' | #x9 | #xD | #xA; */
      case "":
        f = " ";
      default:
        if (f <= " ")
          switch (d) {
            case si:
              r.setTagName(t.slice(e, c)), d = ai;
              break;
            case er:
              u = t.slice(e, c), d = un;
              break;
            case ln:
              var l = t.slice(e, c);
              s.warning('attribute "' + l + '" missed quot(")!!'), a(u, l, e);
            case cn:
              d = ai;
              break;
          }
        else
          switch (d) {
            //case S_TAG:void();break;
            //case S_ATTR:void();break;
            //case S_ATTR_NOQUOT_VALUE:void();break;
            case un:
              o || s.warning('attribute "' + u + '" missed value!! "' + u + '" instead2!!'), a(u, u, e), e = c, d = er;
              break;
            case cn:
              s.warning('attribute space is required"' + u + '"!!');
            case ai:
              d = er, e = c;
              break;
            case oi:
              d = ln, e = c;
              break;
            case As:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    c++;
  }
}
function Jc(t, e, r) {
  for (var n = t.tagName, i = null, d = t.length; d--; ) {
    var s = t[d], o = s.qName, a = s.value, f = o.indexOf(":");
    if (f > 0)
      var u = s.prefix = o.slice(0, f), l = o.slice(f + 1), c = u === "xmlns" && l;
    else
      l = o, u = null, c = o === "xmlns" && "";
    s.localName = l, c !== !1 && (i == null && (i = /* @__PURE__ */ Object.create(null), qh(r, r = /* @__PURE__ */ Object.create(null))), r[c] = i[c] = a, s.uri = Hc.XMLNS, e.startPrefixMapping(c, a));
  }
  for (var d = t.length; d--; )
    s = t[d], s.prefix && (s.prefix === "xml" && (s.uri = Hc.XML), s.prefix !== "xmlns" && (s.uri = r[s.prefix]));
  var f = n.indexOf(":");
  f > 0 ? (u = t.prefix = n.slice(0, f), l = t.localName = n.slice(f + 1)) : (u = null, l = t.localName = n);
  var g = t.uri = r[u || ""];
  if (e.startElement(g, l, n, t), t.closed) {
    if (e.endElement(g, l, n), i)
      for (u in i)
        Vi(i, u) && e.endPrefixMapping(u);
  } else
    return t.currentNSMap = r, t.localNSMap = i, !0;
}
function X0(t, e, r, n, i) {
  var s = H0(r);
  if (s || K0(r)) {
    var o = t.indexOf("</" + r + ">", e), a = t.substring(e + 1, o);
    return s && (a = a.replace(Hu, n)), i.characters(a, 0, a.length), o;
  }
  return e + 1;
}
function qh(t, e) {
  for (var r in t)
    Vi(t, r) && (e[r] = t[r]);
}
function Bh(t, e) {
  var r = e;
  function n(c) {
    return c = c || 0, t.charAt(r + c);
  }
  function i(c) {
    c = c || 1, r += c;
  }
  function s() {
    for (var c = 0; r < t.length; ) {
      var d = n();
      if (d !== " " && d !== `
` && d !== "	" && d !== "\r")
        return c;
      c++, i();
    }
    return -1;
  }
  function o() {
    return t.substring(r);
  }
  function a(c) {
    return t.substring(r, r + c.length) === c;
  }
  function u(c) {
    return t.substring(r, r + c.length).toUpperCase() === c.toUpperCase();
  }
  function l(c) {
    var d = X.reg("^", c), f = d.exec(o());
    return f ? (i(f[0].length), f[0]) : null;
  }
  return {
    char: n,
    getIndex: function() {
      return r;
    },
    getMatch: l,
    getSource: function() {
      return t;
    },
    skip: i,
    skipBlanks: s,
    substringFromIndex: o,
    substringStartsWith: a,
    substringStartsWithCaseInsensitive: u
  };
}
function Q0(t, e) {
  function r(a, u) {
    var l = X.PI.exec(a.substringFromIndex());
    return l ? l[1].toLowerCase() === "xml" ? u.fatalError(
      "xml declaration is only allowed at the start of the document, but found at position " + a.getIndex()
    ) : (a.skip(l[0].length), l[0]) : u.fatalError("processing instruction is not well-formed at position " + a.getIndex());
  }
  var n = t.getSource();
  if (t.char() === "[") {
    t.skip(1);
    for (var i = t.getIndex(); t.getIndex() < n.length; ) {
      if (t.skipBlanks(), t.char() === "]") {
        var s = n.substring(i, t.getIndex());
        return t.skip(1), s;
      }
      var o = null;
      if (t.char() === "<" && t.char(1) === "!")
        switch (t.char(2)) {
          case "E":
            t.char(3) === "L" ? o = t.getMatch(X.elementdecl) : t.char(3) === "N" && (o = t.getMatch(X.EntityDecl));
            break;
          case "A":
            o = t.getMatch(X.AttlistDecl);
            break;
          case "N":
            o = t.getMatch(X.NotationDecl);
            break;
          case "-":
            o = t.getMatch(X.Comment);
            break;
        }
      else if (t.char() === "<" && t.char(1) === "?")
        o = r(t, e);
      else if (t.char() === "%")
        o = t.getMatch(X.PEReference);
      else
        return e.fatalError("Error detected in Markup declaration");
      if (!o)
        return e.fatalError("Error in internal subset at position " + t.getIndex());
    }
    return e.fatalError("doctype internal subset is not well-formed, missing ]");
  }
}
function jh(t, e, r, n, i) {
  var s = Bh(t, e);
  switch (i ? s.char(2).toUpperCase() : s.char(2)) {
    case "-":
      var o = s.getMatch(X.Comment);
      return o ? (r.comment(o, X.COMMENT_START.length, o.length - X.COMMENT_START.length - X.COMMENT_END.length), s.getIndex()) : n.fatalError("comment is not well-formed at position " + s.getIndex());
    case "[":
      var a = s.getMatch(X.CDSect);
      return a ? !i && !r.currentElement ? n.fatalError("CDATA outside of element") : (r.startCDATA(), r.characters(a, X.CDATA_START.length, a.length - X.CDATA_START.length - X.CDATA_END.length), r.endCDATA(), s.getIndex()) : n.fatalError("Invalid CDATA starting at position " + e);
    case "D": {
      if (r.doc && r.doc.documentElement)
        return n.fatalError("Doctype not allowed inside or after documentElement at position " + s.getIndex());
      if (i ? !s.substringStartsWithCaseInsensitive(X.DOCTYPE_DECL_START) : !s.substringStartsWith(X.DOCTYPE_DECL_START))
        return n.fatalError("Expected " + X.DOCTYPE_DECL_START + " at position " + s.getIndex());
      if (s.skip(X.DOCTYPE_DECL_START.length), s.skipBlanks() < 1)
        return n.fatalError("Expected whitespace after " + X.DOCTYPE_DECL_START + " at position " + s.getIndex());
      var u = {
        name: void 0,
        publicId: void 0,
        systemId: void 0,
        internalSubset: void 0
      };
      if (u.name = s.getMatch(X.Name), !u.name)
        return n.fatalError("doctype name missing or contains unexpected characters at position " + s.getIndex());
      if (i && u.name.toLowerCase() !== "html" && n.warning("Unexpected DOCTYPE in HTML document at position " + s.getIndex()), s.skipBlanks(), s.substringStartsWith(X.PUBLIC) || s.substringStartsWith(X.SYSTEM)) {
        var l = X.ExternalID_match.exec(s.substringFromIndex());
        if (!l)
          return n.fatalError("doctype external id is not well-formed at position " + s.getIndex());
        l.groups.SystemLiteralOnly !== void 0 ? u.systemId = l.groups.SystemLiteralOnly : (u.systemId = l.groups.SystemLiteral, u.publicId = l.groups.PubidLiteral), s.skip(l[0].length);
      } else if (i && s.substringStartsWithCaseInsensitive(X.SYSTEM)) {
        if (s.skip(X.SYSTEM.length), s.skipBlanks() < 1)
          return n.fatalError("Expected whitespace after " + X.SYSTEM + " at position " + s.getIndex());
        if (u.systemId = s.getMatch(X.ABOUT_LEGACY_COMPAT_SystemLiteral), !u.systemId)
          return n.fatalError(
            "Expected " + X.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + X.SYSTEM + " at position " + s.getIndex()
          );
      }
      return i && u.systemId && !X.ABOUT_LEGACY_COMPAT_SystemLiteral.test(u.systemId) && n.warning("Unexpected doctype.systemId in HTML document at position " + s.getIndex()), i || (s.skipBlanks(), u.internalSubset = Q0(s, n)), s.skipBlanks(), s.char() !== ">" ? n.fatalError("doctype not terminated with > at position " + s.getIndex()) : (s.skip(1), r.startDTD(u.name, u.publicId, u.systemId, u.internalSubset), r.endDTD(), s.getIndex());
    }
    default:
      return n.fatalError('Not well-formed XML starting with "<!" at position ' + e);
  }
}
function Z0(t, e, r, n) {
  var i = t.substring(e).match(X.PI);
  if (!i)
    return n.fatalError("Invalid processing instruction starting at position " + e);
  if (i[1].toLowerCase() === "xml") {
    if (e > 0)
      return n.fatalError(
        "processing instruction at position " + e + " is an xml declaration which is only at the start of the document"
      );
    if (!X.XMLDecl.test(t.substring(e)))
      return n.fatalError("xml declaration is not well-formed");
  }
  return r.processingInstruction(i[1], i[2]), e + i[0].length;
}
function $h() {
  this.attributeNames = /* @__PURE__ */ Object.create(null);
}
$h.prototype = {
  setTagName: function(t) {
    if (!X.QName_exact.test(t))
      throw new Error("invalid tagName:" + t);
    this.tagName = t;
  },
  addValue: function(t, e, r) {
    if (!X.QName_exact.test(t))
      throw new Error("invalid attribute:" + t);
    this.attributeNames[t] = this.length, this[this.length++] = { qName: t, value: e, offset: r };
  },
  length: 0,
  getLocalName: function(t) {
    return this[t].localName;
  },
  getLocator: function(t) {
    return this[t].locator;
  },
  getQName: function(t) {
    return this[t].qName;
  },
  getURI: function(t) {
    return this[t].uri;
  },
  getValue: function(t) {
    return this[t].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};
Po.XMLReader = Fh;
Po.parseUtils = Bh;
Po.parseDoctypeCommentOrCData = jh;
var Yr = Ee, e_ = Ce, t_ = Gr, Gc = Ph, r_ = Po, n_ = e_.DOMImplementation, i_ = Yr.hasDefaultHTMLNamespace, s_ = Yr.isHTMLMimeType, o_ = Yr.isValidMimeType, Uh = Yr.MIME_TYPE, ha = Yr.NAMESPACE, Yc = t_.ParseError, a_ = r_.XMLReader;
function u_(t) {
  return t.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function l_(t) {
  if (t = t || {}, t.locator === void 0 && (t.locator = !0), this.assign = t.assign || Yr.assign, this.domHandler = t.domHandler || zu, this.onError = t.onError || t.errorHandler, t.errorHandler && typeof t.errorHandler != "function")
    throw new TypeError("errorHandler object is no longer supported, switch to onError!");
  t.errorHandler && t.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = t.normalizeLineEndings || u_, this.locator = !!t.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), t.xmlns);
}
l_.prototype.parseFromString = function(t, e) {
  if (!o_(e))
    throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + e + '" is not valid.');
  var r = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), n = Gc.XML_ENTITIES, i = r[""] || null;
  i_(e) ? (n = Gc.HTML_ENTITIES, i = ha.HTML) : e === Uh.XML_SVG_IMAGE && (i = ha.SVG), r[""] = i, r.xml = r.xml || ha.XML;
  var s = new this.domHandler({
    mimeType: e,
    defaultNamespace: i,
    onError: this.onError
  }), o = this.locator ? {} : void 0;
  this.locator && s.setDocumentLocator(o);
  var a = new a_();
  a.errorHandler = s, a.domBuilder = s;
  var u = !Yr.isHTMLMimeType(e);
  return u && typeof t != "string" && a.errorHandler.fatalError("source is not a string"), a.parse(this.normalizeLineEndings(String(t)), r, n), s.doc.documentElement || a.errorHandler.fatalError("missing root element"), s.doc;
};
function zu(t) {
  var e = t || {};
  this.mimeType = e.mimeType || Uh.XML_APPLICATION, this.defaultNamespace = e.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = e.onError;
}
function dn(t, e) {
  e.lineNumber = t.lineNumber, e.columnNumber = t.columnNumber;
}
zu.prototype = {
  /**
   * Either creates an XML or an HTML document and stores it under `this.doc`.
   * If it is an XML document, `this.defaultNamespace` is used to create it,
   * and it will not contain any `childNodes`.
   * If it is an HTML document, it will be created without any `childNodes`.
   *
   * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
   */
  startDocument: function() {
    var t = new n_();
    this.doc = s_(this.mimeType) ? t.createHTMLDocument(!1) : t.createDocument(this.defaultNamespace, "");
  },
  startElement: function(t, e, r, n) {
    var i = this.doc, s = i.createElementNS(t, r || e), o = n.length;
    ws(this, s), this.currentElement = s, this.locator && dn(this.locator, s);
    for (var a = 0; a < o; a++) {
      var t = n.getURI(a), u = n.getValue(a), r = n.getQName(a), l = i.createAttributeNS(t, r);
      this.locator && dn(n.getLocator(a), l), l.value = l.nodeValue = u, s.setAttributeNode(l);
    }
  },
  endElement: function(t, e, r) {
    this.currentElement = this.currentElement.parentNode;
  },
  startPrefixMapping: function(t, e) {
  },
  endPrefixMapping: function(t) {
  },
  processingInstruction: function(t, e) {
    var r = this.doc.createProcessingInstruction(t, e);
    this.locator && dn(this.locator, r), ws(this, r);
  },
  ignorableWhitespace: function(t, e, r) {
  },
  characters: function(t, e, r) {
    if (t = Xc.apply(this, arguments), t) {
      if (this.cdata)
        var n = this.doc.createCDATASection(t);
      else
        var n = this.doc.createTextNode(t);
      this.currentElement ? this.currentElement.appendChild(n) : /^\s*$/.test(t) && this.doc.appendChild(n), this.locator && dn(this.locator, n);
    }
  },
  skippedEntity: function(t) {
  },
  endDocument: function() {
    this.doc.normalize();
  },
  /**
   * Stores the locator to be able to set the `columnNumber` and `lineNumber`
   * on the created DOM nodes.
   *
   * @param {Locator} locator
   */
  setDocumentLocator: function(t) {
    t && (t.lineNumber = 0), this.locator = t;
  },
  //LexicalHandler
  comment: function(t, e, r) {
    t = Xc.apply(this, arguments);
    var n = this.doc.createComment(t);
    this.locator && dn(this.locator, n), ws(this, n);
  },
  startCDATA: function() {
    this.cdata = !0;
  },
  endCDATA: function() {
    this.cdata = !1;
  },
  startDTD: function(t, e, r, n) {
    var i = this.doc.implementation;
    if (i && i.createDocumentType) {
      var s = i.createDocumentType(t, e, r, n);
      this.locator && dn(this.locator, s), ws(this, s), this.doc.doctype = s;
    }
  },
  reportError: function(t, e) {
    if (typeof this.onError == "function")
      try {
        this.onError(t, e, this);
      } catch (r) {
        throw new Yc("Reporting " + t + ' "' + e + '" caused ' + r, this.locator);
      }
    else
      console.error("[xmldom " + t + "]	" + e, c_(this.locator));
  },
  /**
   * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(t) {
    this.reportError("warning", t);
  },
  error: function(t) {
    this.reportError("error", t);
  },
  /**
   * This function reports a fatal error and throws a ParseError.
   *
   * @param {string} message
   * - The message to be used for reporting and throwing the error.
   * @returns {never}
   * This function always throws an error and never returns a value.
   * @throws {ParseError}
   * Always throws a ParseError with the provided message.
   */
  fatalError: function(t) {
    throw this.reportError("fatalError", t), new Yc(t, this.locator);
  }
};
function c_(t) {
  if (t)
    return `
@#[line:` + t.lineNumber + ",col:" + t.columnNumber + "]";
}
function Xc(t, e, r) {
  return typeof t == "string" ? t.substr(e, r) : t.length >= e + r || e ? new java.lang.String(t, e, r) + "" : t;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
  /\w+/g,
  function(t) {
    zu.prototype[t] = function() {
      return null;
    };
  }
);
function ws(t, e) {
  t.currentElement ? t.currentElement.appendChild(e) : t.doc.appendChild(e);
}
var Jn = Ee;
Jn.assign;
Jn.hasDefaultHTMLNamespace;
Jn.isHTMLMimeType;
Jn.isValidMimeType;
Jn.MIME_TYPE;
Jn.NAMESPACE;
const En = "USJ", xn = "3.1", d_ = [
  "type",
  "marker",
  "content",
  "sid",
  "eid",
  "number",
  "code",
  "altnumber",
  "pubnumber",
  "caller",
  "align",
  "category"
];
function f_(t) {
  return h_.includes(t);
}
const h_ = [
  // Old Testament
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  // New Testament
  "MAT",
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
  // Deuterocanon
  "TOB",
  "JDT",
  "ESG",
  "WIS",
  "SIR",
  "BAR",
  "LJE",
  "S3Y",
  "SUS",
  "BEL",
  "1MA",
  "2MA",
  "3MA",
  "4MA",
  "1ES",
  "2ES",
  "MAN",
  "PS2",
  "ODA",
  "PSS",
  "EZA",
  "5EZ",
  "6EZ",
  "DAG",
  "PS3",
  "2BA",
  "LBA",
  "JUB",
  "ENO",
  "1MQ",
  "2MQ",
  "3MQ",
  "REP",
  "4BA",
  "LAO",
  // Non scripture
  "FRT",
  "BAK",
  "OTH",
  "INT",
  "CNC",
  "GLO",
  "TDX",
  "NDX",
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG"
], Vh = "id", Wh = 1;
class mt extends Yt {
  constructor(r, n, i) {
    super(i);
    $(this, "__marker");
    $(this, "__code");
    $(this, "__unknownAttributes");
    this.__marker = Vh, this.__code = r, this.__unknownAttributes = n;
  }
  static getType() {
    return "book";
  }
  static clone(r) {
    const { __code: n, __unknownAttributes: i, __key: s } = r;
    return new mt(n, i, s);
  }
  static importJSON(r) {
    const { code: n, unknownAttributes: i } = r;
    return p_(n, i).updateFromJSON(r);
  }
  static isValidBookCode(r) {
    return f_(r);
  }
  updateFromJSON(r) {
    return super.updateFromJSON(r).setMarker(r.marker);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setCode(r) {
    if (this.__code === r) return this;
    const n = this.getWritable();
    return n.__code = r, n;
  }
  /**
   * Get the book code (ID).
   * @returns the book code (ID).
   */
  getCode() {
    return this.getLatest().__code;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement("p");
    return r.setAttribute("data-marker", this.__marker), r.classList.add(this.__type, `usfm_${this.__marker}`), r.setAttribute("data-code", this.__code), r;
  }
  updateDOM() {
    return !1;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      marker: this.getMarker(),
      code: this.getCode(),
      unknownAttributes: this.getUnknownAttributes(),
      version: Wh
    };
  }
}
function p_(t, e) {
  return ke(new mt(t, e));
}
function Ku(t) {
  return t instanceof mt;
}
function g_(t) {
  return (t == null ? void 0 : t.type) === mt.getType();
}
const Hh = "#", Gn = " ", zh = "​", so = "chapter", Ka = "verse", Qc = "invalid", m_ = "text-spacing", y_ = "formatted-font", Ju = "external-usj-mutation", __ = "selection-change", Ja = "cursor-change", v_ = "annotation-change", b_ = [
  Ju,
  __,
  Ja,
  v_
], Kh = 1;
class Xr extends Yt {
  constructor(r, n, i, s) {
    super(s);
    $(this, "__tag");
    $(this, "__marker");
    $(this, "__unknownAttributes");
    this.__tag = r, this.__marker = n, this.__unknownAttributes = i;
  }
  static getType() {
    return "unknown";
  }
  static clone(r) {
    const { __tag: n, __marker: i, __unknownAttributes: s, __key: o } = r;
    return new Xr(n, i, s, o);
  }
  static importJSON(r) {
    const { tag: n, marker: i, unknownAttributes: s } = r;
    return E_(n, i, s).updateFromJSON(r);
  }
  setTag(r) {
    if (this.__tag === r) return this;
    const n = this.getWritable();
    return n.__tag = r, n;
  }
  getTag() {
    return this.getLatest().__tag;
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement("unknown");
    return r.style.display = "none", r;
  }
  updateDOM() {
    return !1;
  }
  exportDOM() {
    return { element: null };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      tag: this.getTag(),
      marker: this.getMarker(),
      unknownAttributes: this.getUnknownAttributes(),
      version: Kh
    };
  }
  // Mutation
  canBeEmpty() {
    return !0;
  }
  isInline() {
    return !0;
  }
  extractWithChild() {
    return !1;
  }
  excludeFromCopy(r) {
    return r !== "clone";
  }
}
function E_(t, e, r) {
  return ke(new Xr(t, e, r));
}
function x_(t) {
  return t instanceof Xr;
}
const Jh = "c", Gh = 1;
class Ct extends Yt {
  constructor(r, n, i, s, o, a) {
    super(a);
    $(this, "__marker");
    $(this, "__number");
    $(this, "__sid");
    $(this, "__altnumber");
    $(this, "__pubnumber");
    $(this, "__unknownAttributes");
    this.__marker = Jh, this.__number = r, this.__sid = n, this.__altnumber = i, this.__pubnumber = s, this.__unknownAttributes = o;
  }
  static getType() {
    return "chapter";
  }
  static clone(r) {
    const { __number: n, __sid: i, __altnumber: s, __pubnumber: o, __unknownAttributes: a, __key: u } = r;
    return new Ct(n, i, s, o, a, u);
  }
  static importJSON(r) {
    const { number: n, sid: i, altnumber: s, pubnumber: o, unknownAttributes: a } = r;
    return C_(n, i, s, o, a).updateFromJSON(
      r
    );
  }
  updateFromJSON(r) {
    return super.updateFromJSON(r).setMarker(r.marker);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setNumber(r) {
    if (this.__number === r) return this;
    const n = this.getWritable();
    return n.__number = r, n;
  }
  getNumber() {
    return this.getLatest().__number;
  }
  setSid(r) {
    if (this.__sid === r) return this;
    const n = this.getWritable();
    return n.__sid = r, n;
  }
  getSid() {
    return this.getLatest().__sid;
  }
  setAltnumber(r) {
    if (this.__altnumber === r) return this;
    const n = this.getWritable();
    return n.__altnumber = r, n;
  }
  getAltnumber() {
    return this.getLatest().__altnumber;
  }
  setPubnumber(r) {
    if (this.__pubnumber === r) return this;
    const n = this.getWritable();
    return n.__pubnumber = r, n;
  }
  getPubnumber() {
    return this.getLatest().__pubnumber;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement("p");
    return r.setAttribute("data-marker", this.__marker), r.classList.add(so, `usfm_${this.__marker}`), r.setAttribute("data-number", this.__number), r;
  }
  updateDOM() {
    return !1;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      marker: this.getMarker(),
      number: this.getNumber(),
      sid: this.getSid(),
      altnumber: this.getAltnumber(),
      pubnumber: this.getPubnumber(),
      unknownAttributes: this.getUnknownAttributes(),
      version: Gh
    };
  }
}
function C_(t, e, r, n, i) {
  return ke(
    new Ct(t, e, r, n, i)
  );
}
function Yh(t) {
  return t instanceof Ct;
}
function T_(t) {
  return (t == null ? void 0 : t.type) === Ct.getType();
}
const Xh = [
  "fr",
  "fq",
  "fqa",
  "fk",
  "ft",
  "fl",
  "fw",
  "fp",
  "fv",
  "fdc",
  "fm"
], Qh = [
  "xo",
  "xop",
  "xk",
  "xq",
  "xt",
  "xta",
  "xot",
  "xnt",
  "xdc"
], Zh = [
  // Chapter & Verse
  "ca",
  "cp",
  "va",
  "vp",
  // Text Features
  "add",
  "bk",
  "dc",
  "em",
  "jmp",
  "k",
  "nd",
  "ord",
  "pn",
  "png",
  "qt",
  "rb",
  "rq",
  // "ref", // This has its own tag and is not a Char
  "sig",
  "sls",
  "tl",
  "w",
  "wa",
  "wg",
  "wh",
  "wj",
  // Note there are 2 deprecated markers intentionally not listed here: "addpn", "pro"
  // Text Formatting
  "bd",
  "it",
  "bdit",
  "no",
  "sc",
  "sup",
  // Introductions
  "ior",
  "iqt",
  // Poetry
  "qac",
  "qs",
  // Lists
  "litl",
  "lik",
  "liv",
  "liv1",
  "liv2",
  "liv3",
  "liv4",
  "liv5",
  ...Xh,
  ...Qh
], ep = fp(Zh), k_ = [
  ...hp(Zh),
  // Include the numbered markers, i.e. not ending in a number since pi (= pi1) is valid.
  ...ep
], tp = 1;
class Ie extends xt {
  constructor(r, n, i, s) {
    super(n, s);
    $(this, "__marker");
    $(this, "__unknownAttributes");
    this.__marker = r, this.__unknownAttributes = i;
  }
  static getType() {
    return "char";
  }
  static clone(r) {
    const { __marker: n, __text: i, __unknownAttributes: s, __key: o } = r;
    return new Ie(n, i, s, o);
  }
  static importJSON(r) {
    const { marker: n, text: i, unknownAttributes: s } = r;
    return rp(n, i, s).updateFromJSON(r);
  }
  static importDOM() {
    return {
      span: (r) => w_(r) ? {
        conversion: A_,
        priority: 1
      } : null
    };
  }
  static isValidMarker(r) {
    return r && k_.includes(r) || dp(r, ep);
  }
  static isValidFootnoteMarker(r) {
    return !!r && Xh.includes(r);
  }
  static isValidCrossReferenceMarker(r) {
    return !!r && Qh.includes(r);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM(r) {
    const n = super.createDOM(r);
    return n.setAttribute("data-marker", this.__marker), n.classList.add(this.__type, `usfm_${this.__marker}`), n;
  }
  exportDOM(r) {
    const { element: n } = super.exportDOM(r);
    return n && Ae(n) && (n.setAttribute("data-marker", this.getMarker()), n.classList.add(this.getType(), `usfm_${this.getMarker()}`)), { element: n };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      marker: this.getMarker(),
      unknownAttributes: this.getUnknownAttributes(),
      version: tp
    };
  }
  isTextEntity() {
    return !0;
  }
}
function A_(t) {
  const e = t.getAttribute("data-marker") ?? "f", r = t.textContent ?? "", n = rp(e, r);
  return n.setStyle(t.getAttribute("style") ?? ""), { node: n };
}
function rp(t, e, r) {
  return ke(new Ie(t, e, r));
}
function w_(t) {
  if (!t) return !1;
  const e = t.getAttribute("data-marker") ?? "";
  return Ie.isValidMarker(e) && t.classList.contains(Ie.getType());
}
function Gu(t) {
  return t instanceof Ie;
}
function np(t) {
  return (t == null ? void 0 : t.type) === Ie.getType();
}
const $r = "zmsc-s", Cn = "zmsc-e", D_ = [$r, Cn], S_ = [
  "ts-s",
  "ts-e",
  "t-s",
  "t-e",
  "ts",
  "qt1-s",
  "qt1-e",
  "qt2-s",
  "qt2-e",
  "qt3-s",
  "qt3-e",
  "qt4-s",
  "qt4-e",
  "qt5-s",
  "qt5-e",
  "qt-s",
  "qt-e",
  // custom markers used for annotations
  $r,
  Cn
], kr = 1;
class Ft extends $n {
  constructor(r, n, i, s, o) {
    super(o);
    $(this, "__marker");
    $(this, "__sid");
    $(this, "__eid");
    $(this, "__unknownAttributes");
    this.__marker = r, this.__sid = n, this.__eid = i, this.__unknownAttributes = s;
  }
  static getType() {
    return "ms";
  }
  static clone(r) {
    const { __marker: n, __sid: i, __eid: s, __unknownAttributes: o, __key: a } = r;
    return new Ft(n, i, s, o, a);
  }
  static importJSON(r) {
    const { marker: n, sid: i, eid: s, unknownAttributes: o } = r;
    return M_(n, i, s, o);
  }
  static isValidMarker(r) {
    return !!r && (S_.includes(r) || r.startsWith("z"));
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setSid(r) {
    if (this.__sid === r) return this;
    const n = this.getWritable();
    return n.__sid = r, n;
  }
  getSid() {
    return this.getLatest().__sid;
  }
  setEid(r) {
    if (this.__eid === r) return this;
    const n = this.getWritable();
    return n.__eid = r, n;
  }
  getEid() {
    return this.getLatest().__eid;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement("span");
    return r.setAttribute("data-marker", this.__marker), r.classList.add(this.__type, `usfm_${this.__marker}`), r;
  }
  updateDOM() {
    return !1;
  }
  decorate() {
    return "";
  }
  exportJSON() {
    return {
      type: this.getType(),
      marker: this.getMarker(),
      sid: this.getSid(),
      eid: this.getEid(),
      unknownAttributes: this.getUnknownAttributes(),
      version: kr
    };
  }
}
function N_(t) {
  return D_.includes(t);
}
function M_(t, e, r, n) {
  return ke(new Ft(t, e, r, n));
}
function O_(t) {
  return t instanceof Ft;
}
const I_ = [
  // Footnote
  "f",
  "fe",
  "ef",
  // Cross Reference
  "x",
  "ex"
], ip = 1, Wi = "+";
class tt extends Yt {
  constructor(r, n, i, s, o) {
    super(o);
    $(this, "__marker");
    $(this, "__caller");
    $(this, "__category");
    $(this, "__unknownAttributes");
    this.__marker = r, this.__caller = n, this.__category = i, this.__unknownAttributes = s;
  }
  static getType() {
    return "note";
  }
  static clone(r) {
    const { __marker: n, __caller: i, __category: s, __unknownAttributes: o, __key: a } = r;
    return new tt(n, i, s, o, a);
  }
  static importJSON(r) {
    const { marker: n, caller: i, category: s, unknownAttributes: o } = r;
    return sp(n, i, s, o).updateFromJSON(
      r
    );
  }
  static importDOM() {
    return {
      span: (r) => P_(r) ? {
        conversion: R_,
        priority: 1
      } : null
    };
  }
  static isValidMarker(r) {
    return !!r && I_.includes(r);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setCaller(r) {
    if (this.__caller === r) return this;
    const n = this.getWritable();
    return n.__caller = r, n;
  }
  getCaller() {
    return this.getLatest().__caller;
  }
  setCategory(r) {
    if (this.__category === r) return this;
    const n = this.getWritable();
    return n.__category = r, n;
  }
  getCategory() {
    return this.getLatest().__category;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement("span");
    return r.setAttribute("data-marker", this.__marker), r.classList.add(this.__type, `usfm_${this.__marker}`), r.setAttribute("data-caller", this.__caller), r;
  }
  updateDOM() {
    return !1;
  }
  exportDOM(r) {
    const { element: n } = super.exportDOM(r);
    return n && Ae(n) && (n.setAttribute("data-marker", this.getMarker()), n.classList.add(this.getType(), `usfm_${this.getMarker()}`), n.setAttribute("data-caller", this.getCaller())), { element: n };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      marker: this.getMarker(),
      caller: this.getCaller(),
      category: this.getCategory(),
      unknownAttributes: this.getUnknownAttributes(),
      version: ip
    };
  }
  // Mutation
  canBeEmpty() {
    return !1;
  }
  isInline() {
    return !0;
  }
}
function R_(t) {
  const e = t.getAttribute("data-marker") ?? "f", r = t.getAttribute("data-caller") ?? "";
  return { node: sp(e, r) };
}
Symbol.for(tt.name);
function sp(t, e, r, n) {
  return ke(new tt(t, e, r, n));
}
function P_(t) {
  if (!t) return !1;
  const e = t.getAttribute("data-marker") ?? "";
  return tt.isValidMarker(e) && t.classList.contains(tt.getType());
}
function Gt(t) {
  return t instanceof tt;
}
const Yu = "p", op = [
  // Identification
  "ide",
  "sts",
  "rem",
  "h",
  "toc1",
  "toc2",
  "toc3",
  "toca1",
  "toca2",
  "toca3",
  // Introductions
  "imt",
  "imt1",
  "imt2",
  "imt3",
  "imt4",
  "is",
  "is1",
  "is2",
  "ip",
  "ipi",
  "im",
  "imi",
  "ipq",
  "imq",
  "ipr",
  "iq",
  "iq1",
  "iq2",
  "iq3",
  "ili",
  "ili1",
  "ili2",
  "ib",
  "iot",
  "io",
  "io1",
  "io2",
  "io3",
  "io4",
  "iex",
  "imte",
  "imte1",
  "imte2",
  "ie",
  // Titles and Headings
  "mt",
  "mt1",
  "mt2",
  "mt3",
  "mt4",
  "mte",
  "mte1",
  "mte2",
  "cl",
  "cd",
  "ms",
  "ms1",
  "ms2",
  "ms3",
  "mr",
  "s",
  "s1",
  "s2",
  "s3",
  "s4",
  "sr",
  "r",
  "d",
  "sp",
  "sd",
  "sd1",
  "sd2",
  "sd3",
  "sd4",
  // Body Paragraphs
  Yu,
  "m",
  "po",
  "cls",
  "pr",
  "pc",
  "pm",
  "pmo",
  "pmc",
  "pmr",
  "pi",
  "pi1",
  "pi2",
  "pi3",
  "mi",
  "lit",
  "nb",
  // Note there is 1 deprecated marker not listed here: "ph#"
  // Poetry
  "q",
  "q1",
  "q2",
  "q3",
  "q4",
  "qr",
  "qc",
  "qa",
  "qm",
  "qm1",
  "qm2",
  "qm3",
  "qd",
  "b",
  // Lists
  "lh",
  "li",
  "li1",
  "li2",
  "li3",
  "li4",
  "lf",
  "lim",
  "lim1",
  "lim2",
  "lim3",
  "lim4",
  // Breaks - see https://docs.usfm.bible/usfm/3.1/char/breaks/pb.html
  "pb"
], ap = fp(op), L_ = [
  ...hp(op),
  // Include the numbered styles, i.e. not ending in a number since pi (= pi1) is valid.
  ...ap
], up = 1;
class Ge extends pr {
  constructor(r = Yu, n, i) {
    super(i);
    $(this, "__marker");
    $(this, "__unknownAttributes");
    this.__marker = r, this.__unknownAttributes = n;
  }
  static getType() {
    return "para";
  }
  static clone(r) {
    const { __marker: n, __unknownAttributes: i, __key: s } = r;
    return new Ge(n, i, s);
  }
  static importJSON(r) {
    const { marker: n, unknownAttributes: i } = r;
    return Ga(n, i).updateFromJSON(r);
  }
  static importDOM() {
    return {
      p: () => ({
        conversion: F_,
        priority: 1
      })
    };
  }
  static isValidMarker(r) {
    return r && L_.includes(r) || dp(r, ap);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement("p");
    return r.setAttribute("data-marker", this.__marker), r.classList.add(this.__type, `usfm_${this.__marker}`), r;
  }
  exportDOM(r) {
    const { element: n } = super.exportDOM(r);
    return n && Ae(n) && (n.setAttribute("data-marker", this.getMarker()), n.classList.add(this.getType(), `usfm_${this.getMarker()}`)), { element: n };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      marker: this.getMarker(),
      unknownAttributes: this.getUnknownAttributes(),
      version: up
    };
  }
  // Mutation
  insertNewAfter(r, n) {
    const i = Ga(this.getMarker());
    return i.setTextFormat(r.format), i.setTextStyle(r.style), i.setDirection(this.getDirection()), i.setFormat(this.getFormatType()), i.setStyle(this.getTextStyle()), i.setIndent(this.getIndent()), this.insertAfter(i, n), i;
  }
}
function F_(t) {
  const e = t.getAttribute("data-marker") ?? void 0, r = Ga(e);
  if (t.style) {
    r.setFormat(t.style.textAlign);
    const n = parseInt(t.style.textIndent, 10) / 20;
    n > 0 && r.setIndent(n);
  }
  return { node: r };
}
function Ga(t, e) {
  return ke(new Ge(t, e));
}
function q_(t) {
  return t instanceof Ge;
}
const lp = "v", cp = 1;
class yt extends xt {
  constructor(r, n, i, s, o, a, u) {
    super(n ?? r, u);
    $(this, "__marker");
    $(this, "__number");
    $(this, "__sid");
    $(this, "__altnumber");
    $(this, "__pubnumber");
    $(this, "__unknownAttributes");
    this.__marker = lp, this.__number = r, this.__sid = i, this.__altnumber = s, this.__pubnumber = o, this.__unknownAttributes = a;
  }
  static getType() {
    return "verse";
  }
  static clone(r) {
    const { __number: n, __text: i, __sid: s, __altnumber: o, __pubnumber: a, __unknownAttributes: u, __key: l } = r;
    return new yt(
      n,
      i,
      s,
      o,
      a,
      u,
      l
    );
  }
  static importJSON(r) {
    const { number: n, text: i, sid: s, altnumber: o, pubnumber: a, unknownAttributes: u } = r;
    return B_(
      n,
      i,
      s,
      o,
      a,
      u
    ).updateFromJSON(r);
  }
  updateFromJSON(r) {
    return super.updateFromJSON(r).setMarker(r.marker);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setNumber(r) {
    if (this.__number === r) return this;
    const n = this.getWritable();
    return n.__number = r, n;
  }
  getNumber() {
    return this.getLatest().__number;
  }
  setSid(r) {
    if (this.__sid === r) return this;
    const n = this.getWritable();
    return n.__sid = r, n;
  }
  getSid() {
    return this.getLatest().__sid;
  }
  setAltnumber(r) {
    if (this.__altnumber === r) return this;
    const n = this.getWritable();
    return n.__altnumber = r, n;
  }
  getAltnumber() {
    return this.getLatest().__altnumber;
  }
  setPubnumber(r) {
    if (this.__pubnumber === r) return this;
    const n = this.getWritable();
    return n.__pubnumber = r, n;
  }
  getPubnumber() {
    return this.getLatest().__pubnumber;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM(r) {
    const n = super.createDOM(r);
    return n.setAttribute("data-marker", this.__marker), n.classList.add(Ka, `usfm_${this.__marker}`), n.setAttribute("data-number", this.__number), n;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      marker: this.getMarker(),
      number: this.getNumber(),
      sid: this.getSid(),
      altnumber: this.getAltnumber(),
      pubnumber: this.getPubnumber(),
      unknownAttributes: this.getUnknownAttributes(),
      version: cp
    };
  }
}
function B_(t, e, r, n, i, s) {
  return ke(
    new yt(t, e, r, n, i, s)
  );
}
function Lo(t) {
  return t instanceof yt;
}
const j_ = /^\d+$/;
function dp(t, e) {
  if (!t) return !1;
  const r = e.find(
    (i) => t.startsWith(i)
  );
  if (!r) return !1;
  const n = t.slice(r.length);
  return j_.test(n);
}
function fp(t) {
  return t.filter((e) => !!e && e.endsWith(Hh)).map((e) => e.slice(0, -1));
}
function hp(t) {
  return t.filter((e) => !(e != null && e.endsWith(Hh)));
}
function Ht(t) {
  return Yh(t) || Cp(t);
}
function $_(t, e) {
  return t.find(
    (r) => Ht(r) && r.getNumber() === e.toString()
  );
}
function pp(t, e = !1) {
  return t.find(
    (r, n) => (!e || n > 0) && Ht(r)
  );
}
function gp(t) {
  var r;
  if (!t) return;
  if (Ht(t)) return t;
  let e = (r = t.getTopLevelElement()) == null ? void 0 : r.getPreviousSibling();
  for (; e && !Ht(e); )
    e = e.getPreviousSibling();
  if (e && Ht(e)) return e;
}
function U_(t, e, r) {
  r && (t.length = r.getIndexWithinParent() - e.getIndexWithinParent());
}
function mp(t, e) {
  return e ? t.splice(e.getIndexWithinParent(), t.length - 1) : t;
}
function Xu(t) {
  return `\\${t}`;
}
function V_(t) {
  return `\\${t}*`;
}
function yp(t, e, r) {
  const n = Xu(t);
  if (e != null && e.startsWith(n)) {
    const i = parseInt(e.slice(n.length), 10);
    isNaN(i) || (r = i.toString());
  }
  return r;
}
function Fo(t, e) {
  let r = Xu(t);
  return e && (r += `${Gn}${e}`), r += " ", r;
}
function W_(t) {
  return t.reduce((r, n) => r + (np(n) ? ` ${n.text}` : ""), "").trim();
}
function _p(t) {
  return Gn + t + " ";
}
function H_(t) {
  return t.reduce((r, n) => r + (Gu(n) ? ` ${n.getTextContent()}` : ""), "").trim();
}
function gr(t) {
  const e = { ...t };
  return d_.forEach((r) => delete e[r]), Object.keys(e).length === 0 ? void 0 : e;
}
function z_(t, e) {
  const r = e.getElementByKey(t.getKey());
  return r ? r.tagName.toLowerCase() : void 0;
}
function Ne(t) {
  return Object.fromEntries(
    Object.entries(t).filter(([, e]) => e !== void 0)
  );
}
function K_(t) {
  return Ku(t) || Yh(t) || Gu(t) || Cp(t) || O_(t) || q_(t) || Gt(t) || Lo(t) || x_(t);
}
function Ya(t, e) {
  if (!e) return (t + 1).toString();
  const r = e.split("-");
  if (r.length === 2)
    return parseInt(r[1]) ? `${parseInt(r[1]) + 1}` : `${parseInt(r[0]) + 1}`;
  const n = RegExp(/(\d+)([a-yA-Y]+)/).exec(e);
  if (!n) return (parseInt(e) + 1).toString();
  const i = String.fromCharCode(n[2].charCodeAt(0) + 1);
  return `${n[1]}${i}`;
}
function J_(t, e) {
  const r = S(t) ? t : t.getParent(), n = S(e) ? e : e.getParent(), i = r && n ? Ei(r, n) : void 0;
  return i ? i.commonAncestor : void 0;
}
const G_ = "c", vp = 1, bp = "span";
class mr extends $n {
  constructor(r, n = !1, i, s, o, a, u) {
    super(u);
    $(this, "__marker");
    $(this, "__number");
    $(this, "__showMarker");
    $(this, "__sid");
    $(this, "__altnumber");
    $(this, "__pubnumber");
    $(this, "__unknownAttributes");
    this.__marker = G_, this.__number = r, this.__showMarker = n, this.__sid = i, this.__altnumber = s, this.__pubnumber = o, this.__unknownAttributes = a;
  }
  static getType() {
    return "immutable-chapter";
  }
  static clone(r) {
    const { __number: n, __showMarker: i, __sid: s, __altnumber: o, __pubnumber: a, __unknownAttributes: u, __key: l } = r;
    return new mr(
      n,
      i,
      s,
      o,
      a,
      u,
      l
    );
  }
  static importJSON(r) {
    const { number: n, showMarker: i, sid: s, altnumber: o, pubnumber: a, unknownAttributes: u } = r;
    return Ep(
      n,
      i,
      s,
      o,
      a,
      u
    ).updateFromJSON(r);
  }
  static importDOM() {
    return {
      span: (r) => xp(r) ? {
        conversion: Y_,
        priority: 1
      } : null
    };
  }
  updateFromJSON(r) {
    return super.updateFromJSON(r).setMarker(r.marker);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setNumber(r) {
    if (this.__number === r) return this;
    const n = this.getWritable();
    return n.__number = r, n;
  }
  getNumber() {
    return this.getLatest().__number;
  }
  setShowMarker(r = !1) {
    if (this.__showMarker === r) return this;
    const n = this.getWritable();
    return n.__showMarker = r, n;
  }
  getShowMarker() {
    return this.getLatest().__showMarker;
  }
  setSid(r) {
    if (this.__sid === r) return this;
    const n = this.getWritable();
    return n.__sid = r, n;
  }
  getSid() {
    return this.getLatest().__sid;
  }
  setAltnumber(r) {
    if (this.__altnumber === r) return this;
    const n = this.getWritable();
    return n.__altnumber = r, n;
  }
  getAltnumber() {
    return this.getLatest().__altnumber;
  }
  setPubnumber(r) {
    if (this.__pubnumber === r) return this;
    const n = this.getWritable();
    return n.__pubnumber = r, n;
  }
  getPubnumber() {
    return this.getLatest().__pubnumber;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    return n.__unknownAttributes = r, n;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement(bp);
    return r.setAttribute("data-marker", this.__marker), r.classList.add(so, `usfm_${this.__marker}`), r.setAttribute("data-number", this.__number), r;
  }
  updateDOM() {
    return !1;
  }
  exportDOM(r) {
    const { element: n } = super.exportDOM(r);
    return n && Ae(n) && (n.setAttribute("data-marker", this.getMarker()), n.classList.add(so, `usfm_${this.getMarker()}`), n.setAttribute("data-number", this.getNumber())), { element: n };
  }
  decorate() {
    return this.getShowMarker() ? Fo(this.getMarker(), this.getNumber()) : this.getNumber();
  }
  exportJSON() {
    return {
      type: this.getType(),
      marker: this.getMarker(),
      number: this.getNumber(),
      showMarker: this.getShowMarker(),
      sid: this.getSid(),
      altnumber: this.getAltnumber(),
      pubnumber: this.getPubnumber(),
      unknownAttributes: this.getUnknownAttributes(),
      version: vp
    };
  }
  // Mutation
  isInline() {
    return !1;
  }
}
function Y_(t) {
  const e = t.getAttribute("data-number") ?? "0";
  return { node: Ep(e) };
}
function Ep(t, e, r, n, i, s) {
  return ke(
    new mr(
      t,
      e,
      r,
      n,
      i,
      s
    )
  );
}
function xp(t) {
  return t ? t.classList.contains(so) && t.tagName.toLowerCase() === bp : !1;
}
function Cp(t) {
  return t instanceof mr;
}
function X_(t) {
  return (t == null ? void 0 : t.type) === mr.getType();
}
const Tp = 1;
class Yn extends pr {
  static getType() {
    return "implied-para";
  }
  static clone(e) {
    return new Yn(e.__key);
  }
  static importJSON(e) {
    return Zc().updateFromJSON(e);
  }
  createDOM() {
    return document.createElement("p");
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      version: Tp
    };
  }
  // Mutation
  insertNewAfter(e, r) {
    const n = Zc();
    return n.setTextFormat(e.format), n.setTextStyle(e.style), n.setDirection(this.getDirection()), n.setFormat(this.getFormatType()), n.setStyle(this.getTextStyle()), n.setIndent(this.getIndent()), this.insertAfter(n, r), n;
  }
}
function Zc() {
  return ke(new Yn());
}
function kp(t) {
  return (t == null ? void 0 : t.type) === Yn.getType();
}
const Q_ = 1;
class Xn extends xt {
  constructor(r, n = !0, i) {
    const s = n ? Xu(r) : V_(r);
    super(s, i);
    $(this, "__marker");
    $(this, "__isOpening");
    this.__marker = r, this.__isOpening = n;
  }
  static getType() {
    return "marker";
  }
  static clone(r) {
    return new Xn(r.__marker, r.__isOpening, r.__key);
  }
  static importJSON(r) {
    const { marker: n, isOpening: i } = r;
    return Z_(n, i).updateFromJSON(r);
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setIsOpening(r) {
    if (this.__isOpening === r) return this;
    const n = this.getWritable();
    return n.__isOpening = r, n;
  }
  getIsOpening() {
    return this.getLatest().__isOpening;
  }
  createDOM(r) {
    const n = super.createDOM(r);
    return n.setAttribute("data-marker", this.__marker), n.classList.add(this.__type, this.__isOpening ? "opening" : "closing"), n;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      text: this.getTextContent(),
      marker: this.getMarker(),
      isOpening: this.getIsOpening(),
      version: Q_
    };
  }
}
function Z_(t, e) {
  return ke(new Xn(t, e));
}
const oo = "unmatched", Ap = 1;
class Qr extends $n {
  constructor(r, n) {
    super(n);
    $(this, "__marker");
    this.__marker = r;
  }
  static getType() {
    return "unmatched";
  }
  static clone(r) {
    const { __marker: n, __key: i } = r;
    return new Qr(n, i);
  }
  static importJSON(r) {
    const { marker: n } = r;
    return wp(n);
  }
  static importDOM() {
    return {
      [oo]: (r) => tv(r) ? {
        conversion: ev,
        priority: 1
      } : null
    };
  }
  setMarker(r) {
    if (this.__marker === r) return this;
    const n = this.getWritable();
    return n.__marker = r, n;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  createDOM() {
    const r = document.createElement(oo);
    r.setAttribute("data-marker", this.__marker), r.classList.add(Qc);
    const n = this.__marker.endsWith("*");
    return r.title = n ? "This closing marker has no matching opening marker!" : "This opening marker has no matching closing marker!", r;
  }
  updateDOM() {
    return !1;
  }
  exportDOM(r) {
    const { element: n } = super.exportDOM(r);
    return n && Ae(n) && (n.setAttribute("data-marker", this.getMarker()), n.classList.add(Qc)), { element: n };
  }
  decorate() {
    return `\\${this.getMarker()}${zh}`;
  }
  exportJSON() {
    return {
      type: this.getType(),
      marker: this.getMarker(),
      version: Ap
    };
  }
}
function ev(t) {
  const e = t.getAttribute("data-marker") ?? "";
  return { node: wp(e) };
}
function wp(t) {
  return ke(new Qr(t));
}
function tv(t) {
  return (t == null ? void 0 : t.tagName) === oo;
}
const Dp = [
  mt,
  mr,
  Ct,
  yt,
  Ie,
  tt,
  Ft,
  Xn,
  Xr,
  Qr,
  Yn,
  Ge,
  {
    replace: pr,
    withKlass: Ge,
    with: (t) => new Ge(t.__marker, t.__unknownAttributes)
  }
], Sp = 1, Nt = "ImmutableNoteCallerNode";
class ot extends $n {
  constructor(r, n, i, s) {
    super(s);
    $(this, "__caller");
    $(this, "__previewText");
    $(this, "__onClick");
    this.__caller = r, this.__previewText = n, this.__onClick = i ?? (() => {
    });
  }
  static getType() {
    return "immutable-note-caller";
  }
  static clone(r) {
    const { __caller: n, __previewText: i, __onClick: s, __key: o } = r;
    return new ot(n, i, s, o);
  }
  static importJSON(r) {
    const { caller: n, previewText: i, onClick: s } = r;
    return Np(n, i, s);
  }
  static importDOM() {
    return {
      span: (r) => nv(r) ? {
        conversion: rv,
        priority: 1
      } : null
    };
  }
  setCaller(r) {
    const n = this.getWritable();
    n.__caller = r;
  }
  getCaller() {
    return this.getLatest().__caller;
  }
  setPreviewText(r) {
    const n = this.getWritable();
    n.__previewText = r;
  }
  getPreviewText() {
    return this.getLatest().__previewText;
  }
  setOnClick(r) {
    const n = this.getWritable();
    n.__onClick = r;
  }
  getOnClick() {
    return this.getLatest().__onClick;
  }
  createDOM() {
    const r = document.createElement("span");
    return r.classList.add(this.__type), r.setAttribute("data-caller", this.__caller), r.setAttribute("data-preview-text", this.__previewText), r;
  }
  updateDOM(r) {
    return r.__caller !== this.__caller;
  }
  exportDOM(r) {
    const { element: n } = super.exportDOM(r);
    return n && Ae(n) && (n.classList.add(this.getType()), n.setAttribute("data-caller", this.getCaller()), n.setAttribute("data-preview-text", this.getPreviewText())), { element: n };
  }
  decorate() {
    const r = `${this.__caller}_${this.__previewText}}`.replace(/\s+/g, "").substring(0, 25);
    return /* @__PURE__ */ w.jsx("button", { onClick: this.__onClick, title: this.__previewText, "data-caller-id": r, children: this.__caller });
  }
  exportJSON() {
    return {
      type: this.getType(),
      caller: this.getCaller(),
      previewText: this.getPreviewText(),
      onClick: this.getOnClick(),
      version: Sp
    };
  }
}
function rv(t) {
  const e = t.getAttribute("data-caller") ?? "", r = t.getAttribute("data-preview-text") ?? "";
  return { node: Np(e, r) };
}
function Np(t, e, r) {
  return ke(new ot(t, e, r));
}
function nv(t) {
  return t ? t.classList.contains(ot.getType()) : !1;
}
function qo(t) {
  return t instanceof ot;
}
const Mp = "v", Op = 1;
class _t extends $n {
  constructor(r, n = !1, i, s, o, a, u) {
    super(u);
    $(this, "__marker");
    $(this, "__number");
    $(this, "__showMarker");
    $(this, "__sid");
    $(this, "__altnumber");
    $(this, "__pubnumber");
    $(this, "__unknownAttributes");
    this.__marker = Mp, this.__number = r, this.__showMarker = n, this.__sid = i, this.__altnumber = s, this.__pubnumber = o, this.__unknownAttributes = a;
  }
  static getType() {
    return "immutable-verse";
  }
  static clone(r) {
    const { __number: n, __showMarker: i, __sid: s, __altnumber: o, __pubnumber: a, __unknownAttributes: u, __key: l } = r;
    return new _t(
      n,
      i,
      s,
      o,
      a,
      u,
      l
    );
  }
  static importJSON(r) {
    const { marker: n, number: i, showMarker: s, sid: o, altnumber: a, pubnumber: u, unknownAttributes: l } = r, c = Ip(
      i,
      s,
      o,
      a,
      u,
      l
    );
    return c.setMarker(n), c;
  }
  static importDOM() {
    return {
      span: (r) => sv(r) ? {
        conversion: iv,
        priority: 1
      } : null
    };
  }
  setMarker(r) {
    const n = this.getWritable();
    n.__marker = r;
  }
  getMarker() {
    return this.getLatest().__marker;
  }
  setNumber(r) {
    const n = this.getWritable();
    n.__number = r;
  }
  getNumber() {
    return this.getLatest().__number;
  }
  setShowMarker(r = !1) {
    const n = this.getWritable();
    n.__showMarker = r;
  }
  getShowMarker() {
    return this.getLatest().__showMarker;
  }
  setSid(r) {
    const n = this.getWritable();
    n.__sid = r;
  }
  getSid() {
    return this.getLatest().__sid;
  }
  setAltnumber(r) {
    const n = this.getWritable();
    n.__altnumber = r;
  }
  getAltnumber() {
    return this.getLatest().__altnumber;
  }
  setPubnumber(r) {
    const n = this.getWritable();
    n.__pubnumber = r;
  }
  getPubnumber() {
    return this.getLatest().__pubnumber;
  }
  setUnknownAttributes(r) {
    const n = this.getWritable();
    n.__unknownAttributes = r;
  }
  getUnknownAttributes() {
    return this.getLatest().__unknownAttributes;
  }
  createDOM() {
    const r = document.createElement("span");
    return r.setAttribute("data-marker", this.__marker), r.classList.add(Ka, `usfm_${this.__marker}`), r.setAttribute("data-number", this.__number), r;
  }
  updateDOM() {
    return !1;
  }
  exportDOM(r) {
    const { element: n } = super.exportDOM(r);
    return n && Ae(n) && (n.setAttribute("data-marker", this.getMarker()), n.classList.add(Ka, `usfm_${this.getMarker()}`), n.setAttribute("data-number", this.getNumber())), { element: n };
  }
  decorate() {
    return /* @__PURE__ */ w.jsx("span", { children: this.getShowMarker() ? Fo(this.getMarker(), this.getNumber()) : this.getNumber() + zh });
  }
  exportJSON() {
    return {
      type: this.getType(),
      marker: this.getMarker(),
      number: this.getNumber(),
      showMarker: this.getShowMarker(),
      sid: this.getSid(),
      altnumber: this.getAltnumber(),
      pubnumber: this.getPubnumber(),
      unknownAttributes: this.getUnknownAttributes(),
      version: Op
    };
  }
}
function iv(t) {
  const e = t.getAttribute("data-number") ?? "0";
  return { node: Ip(e) };
}
function Ip(t, e, r, n, i, s) {
  return ke(
    new _t(t, e, r, n, i, s)
  );
}
function sv(t) {
  return ((t == null ? void 0 : t.getAttribute("data-marker")) ?? void 0) === Mp;
}
function Bo(t) {
  return t instanceof _t;
}
const ov = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
function av(t) {
  J(() => {
    t[Nt] || (t[Nt] = {});
    const e = t[Nt].noteCallers;
    (!e || e.length <= 0) && (t[Nt].noteCallers = ov);
  }, [t]);
}
function Rp(t) {
  return t.replaceAll("	", " ");
}
const Qu = (t) => {
  navigator.clipboard.read().then(async (e) => {
    if ((await navigator.permissions.query({
      // @ts-expect-error These types are incorrect.
      name: "clipboard-read"
    })).state === "denied") {
      alert("Not allowed to paste from clipboard.");
      return;
    }
    const n = new DataTransfer(), i = e[0];
    for (const o of i.types) {
      const a = await (await i.getType(o)).text();
      n.setData(o, Rp(a));
    }
    const s = new ClipboardEvent("paste", {
      clipboardData: n
    });
    t.dispatchCommand(Gi, s);
  });
}, Zu = (t) => {
  navigator.clipboard.read().then(async () => {
    if ((await navigator.permissions.query({
      // @ts-expect-error These types are incorrect.
      name: "clipboard-read"
    })).state === "denied") {
      alert("Not allowed to paste from clipboard.");
      return;
    }
    const r = new DataTransfer(), n = await navigator.clipboard.readText();
    r.setData("text/plain", Rp(n));
    const i = new ClipboardEvent("paste", {
      clipboardData: r
    });
    t.dispatchCommand(Gi, i);
  });
};
function uv() {
  const [t] = be();
  return J(() => {
    const e = (r) => {
      const { key: n, shiftKey: i, metaKey: s, ctrlKey: o, altKey: a } = r;
      !(Yf ? s : o) || a || (!i && n.toLowerCase() === "c" ? (r.preventDefault(), t.dispatchCommand(Wr, null)) : !i && n.toLowerCase() === "x" ? (r.preventDefault(), t.dispatchCommand(jn, null)) : n.toLowerCase() === "v" && (r.preventDefault(), i ? Zu(t) : Qu(t)));
    };
    return t.registerRootListener(
      (r, n) => {
        n !== null && n.removeEventListener("keydown", e), r !== null && r.addEventListener("keydown", e);
      }
    );
  }, [t]), null;
}
const Xa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, lv = Xa ? Vr : J;
class cv {
  constructor(e) {
    this.key = e, this.ref = { current: null }, this.setRefElement = this.setRefElement.bind(this);
  }
  setRefElement(e) {
    this.ref = { current: e };
  }
}
const ed = (t) => {
  const e = document.getElementById("typeahead-menu");
  if (!e) return;
  const r = e.getBoundingClientRect();
  r.top + r.height > window.innerHeight && e.scrollIntoView({ block: "center" }), r.top < 0 && e.scrollIntoView({ block: "center" }), t.scrollIntoView({ block: "nearest" });
};
function td(t, e) {
  const r = t.getBoundingClientRect(), n = e.getBoundingClientRect();
  return r.top > n.top && r.top < n.bottom;
}
function dv(t, e, r, n) {
  const [i] = be();
  J(() => {
    if (e != null && t != null) {
      const s = i.getRootElement(), o = s != null ? function(d, f) {
        let g = getComputedStyle(d);
        const h = g.position === "absolute", p = /(auto|scroll)/;
        if (g.position === "fixed") return document.body;
        for (let m = d; m = m.parentElement; ) if (g = getComputedStyle(m), (!h || g.position !== "static") && p.test(g.overflow + g.overflowY + g.overflowX)) return m;
        return document.body;
      }(s) : document.body;
      let a = !1, u = td(e, o);
      const l = function() {
        a || (window.requestAnimationFrame(function() {
          r(), a = !1;
        }), a = !0);
        const d = td(e, o);
        d !== u && (u = d, n != null && n(d));
      }, c = new ResizeObserver(r);
      return window.addEventListener("resize", r), document.addEventListener("scroll", l, { capture: !0, passive: !0 }), c.observe(e), () => {
        c.unobserve(e), window.removeEventListener("resize", r), document.removeEventListener("scroll", l, !0);
      };
    }
  }, [e, i, n, r, t]);
}
const rd = Yd();
function fv({ close: t, editor: e, anchorElementRef: r, resolution: n, options: i, menuRenderFn: s, onSelectOption: o, shouldSplitNodeWithQuery: a = !1, commandPriority: u = vo }) {
  const [l, c] = se(null), d = n.match && n.match.matchingString;
  J(() => {
    c(0);
  }, [d]);
  const f = me((h) => {
    e.update(() => {
      const p = n.match != null && a ? function(m) {
        const _ = B();
        if (!R(_) || !_.isCollapsed()) return null;
        const y = _.anchor;
        if (y.type !== "text") return null;
        const v = y.getNode();
        if (!v.isSimpleText()) return null;
        const C = y.offset, T = v.getTextContent().slice(0, C), k = m.replaceableString.length, N = C - function(D, L, W) {
          let U = W;
          for (let M = U; M <= L.length; M++) D.slice(-M) === L.substring(0, M) && (U = M);
          return U;
        }(T, m.matchingString, k);
        if (N < 0) return null;
        let A;
        return N === 0 ? [A] = v.splitText(C) : [, A] = v.splitText(N, C), A;
      }(n.match) : null;
      o(h, p, t, n.match ? n.match.matchingString : "");
    });
  }, [e, a, n.match, o, t]), g = me((h) => {
    const p = e.getRootElement();
    p !== null && (p.setAttribute("aria-activedescendant", "typeahead-item-" + h), c(h));
  }, [e]);
  return J(() => () => {
    const h = e.getRootElement();
    h !== null && h.removeAttribute("aria-activedescendant");
  }, [e]), lv(() => {
    i === null ? c(null) : l === null && g(0);
  }, [i, l, g]), J(() => Pt(e.registerCommand(rd, ({ option: h }) => !(!h.ref || h.ref.current == null) && (ed(h.ref.current), !0), u)), [e, g, u]), J(() => Pt(e.registerCommand(hu, (h) => {
    const p = h;
    if (i !== null && i.length && l !== null) {
      const m = l !== i.length - 1 ? l + 1 : 0;
      g(m);
      const _ = i[m];
      _.ref != null && _.ref.current && e.dispatchCommand(rd, { index: m, option: _ }), p.preventDefault(), p.stopImmediatePropagation();
    }
    return !0;
  }, u), e.registerCommand(fu, (h) => {
    const p = h;
    if (i !== null && i.length && l !== null) {
      const m = l !== 0 ? l - 1 : i.length - 1;
      g(m);
      const _ = i[m];
      _.ref != null && _.ref.current && ed(_.ref.current), p.preventDefault(), p.stopImmediatePropagation();
    }
    return !0;
  }, u), e.registerCommand(pu, (h) => {
    const p = h;
    return p.preventDefault(), p.stopImmediatePropagation(), t(), !0;
  }, u), e.registerCommand(gu, (h) => {
    const p = h;
    return i !== null && l !== null && i[l] != null && (p.preventDefault(), p.stopImmediatePropagation(), f(i[l]), !0);
  }, u), e.registerCommand(Oi, (h) => i !== null && l !== null && i[l] != null && (h !== null && (h.preventDefault(), h.stopImmediatePropagation()), f(i[l]), !0), u)), [f, t, e, i, l, g, u]), s(r, Be(() => ({ options: i, selectOptionAndCleanUp: f, selectedIndex: l, setHighlightedIndex: c }), [f, l, i]), n.match ? n.match.matchingString : "");
}
function nd(t, e) {
  e != null && (t.className = e), t.setAttribute("aria-label", "Typeahead menu"), t.setAttribute("role", "listbox"), t.style.display = "block", t.style.position = "absolute";
}
function hv({ options: t, onWillOpen: e, onClose: r, onOpen: n, onSelectOption: i, menuRenderFn: s, anchorClassName: o, commandPriority: a = vo, parent: u }) {
  const [l] = be(), [c, d] = se(null), f = Os.useRef(null), g = function(y, v, C, T = Xa ? document.body : void 0, k = !0) {
    const [N] = be(), A = Le(Xa ? document.createElement("div") : null), D = me(() => {
      if (A.current === null || T === void 0) return;
      A.current.style.top = A.current.style.bottom;
      const U = N.getRootElement(), M = A.current, P = M.firstChild;
      if (U !== null && y !== null) {
        const { left: Y, top: Z, width: de, height: ae } = y.getRect(), V = A.current.offsetHeight;
        if (M.style.top = `${Z + V + 3 + (k ? window.pageYOffset : 0)}px`, M.style.left = `${Y + window.pageXOffset}px`, M.style.height = `${ae}px`, M.style.width = `${de}px`, P !== null) {
          P.style.top = `${Z}`;
          const he = P.getBoundingClientRect(), je = he.height, ze = he.width, lt = U.getBoundingClientRect();
          Y + ze > lt.right && (M.style.left = `${lt.right - ze + window.pageXOffset}px`), (Z + je > window.innerHeight || Z + je > lt.bottom) && Z - lt.top > je + ae && (M.style.top = `${Z - je - ae + (k ? window.pageYOffset : 0)}px`);
        }
        M.isConnected || (nd(M, C), T.append(M)), M.setAttribute("id", "typeahead-menu"), A.current = M, U.setAttribute("aria-controls", "typeahead-menu");
      }
    }, [N, y, k, C, T]);
    J(() => {
      const U = N.getRootElement();
      return y !== null && D(), () => {
        U !== null && U.removeAttribute("aria-controls");
        const M = A.current;
        M !== null && M.isConnected && (M.remove(), M.removeAttribute("id"));
      };
    }, [N, D, y]);
    const L = me((U) => {
      y !== null && (U || v(null));
    }, [y, v]);
    dv(y, A.current, D, L);
    const W = A.current;
    return W != null && (nd(W, C), T != null && T.append(W)), A;
  }(c, d, o, u), h = me(() => {
    d(null), r != null && c !== null && r();
  }, [r, c]), p = me((y) => {
    d(y), n != null && c === null && n(y);
  }, [n, c]), m = me((y) => {
    y.preventDefault(), e != null && e(y);
    const v = q2(y.target);
    p({ getRect: () => new DOMRect(y.clientX / v, y.clientY / v, 1, 1) });
  }, [p, e]), _ = me((y) => {
    c !== null && f.current != null && y.target != null && Kr(y.target) && !f.current.contains(y.target) && h();
  }, [h, c]);
  return J(() => {
    const y = l.getRootElement();
    if (y) return y.addEventListener("contextmenu", m), () => y.removeEventListener("contextmenu", m);
  }, [l, m]), J(() => (document.addEventListener("click", _), () => document.removeEventListener("click", _)), [l, _]), g.current === null || c === null || l === null ? null : w.jsx(fv, { close: h, resolution: c, editor: l, anchorElementRef: g, options: t, menuRenderFn: (y, v) => s(y, v, { setMenuRef: (C) => {
    f.current = C;
  } }), onSelectOption: i, commandPriority: a });
}
function pv({
  index: t,
  isSelected: e,
  onClick: r,
  onMouseEnter: n,
  option: i
}) {
  let s = "item";
  return e && (s += " selected"), i.isDisabled && (s += " disabled"), /* @__PURE__ */ w.jsx(
    "li",
    {
      tabIndex: -1,
      className: s,
      ref: i.setRefElement,
      role: "option",
      "aria-selected": e,
      "aria-disabled": i.isDisabled,
      id: "typeahead-item-" + t,
      onMouseEnter: n,
      onClick: i.isDisabled ? void 0 : r,
      children: /* @__PURE__ */ w.jsx("span", { className: "text", children: i.title })
    },
    i.key
  );
}
function gv({
  options: t,
  selectedItemIndex: e,
  onOptionClick: r,
  onOptionMouseEnter: n
}) {
  return /* @__PURE__ */ w.jsx("div", { className: "typeahead-popover", children: /* @__PURE__ */ w.jsx("ul", { children: t.map((i, s) => /* @__PURE__ */ w.jsx(
    pv,
    {
      index: s,
      isSelected: e === s,
      onClick: () => r(i, s),
      onMouseEnter: () => n(s),
      option: i
    },
    i.key
  )) }) });
}
class Ds extends cv {
  constructor(r, n) {
    super(r);
    $(this, "title");
    $(this, "onSelect");
    $(this, "isDisabled");
    this.title = r, this.onSelect = n.onSelect.bind(this), this.isDisabled = n.isDisabled || !1;
  }
}
function mv(t, e = "editor-input") {
  return t ? t.classList.contains(e) : !1;
}
function yv() {
  const [t] = be(), e = !t.isEditable(), r = Le(), n = Le(), i = Le(), s = Be(() => [
    new Ds("Cut", {
      onSelect: () => {
        t.dispatchCommand(jn, null);
      },
      isDisabled: e
    }),
    new Ds("Copy", {
      onSelect: () => {
        t.dispatchCommand(Wr, null);
      }
    }),
    new Ds("Paste", {
      onSelect: () => {
        Qu(t);
      },
      isDisabled: e
    }),
    new Ds("Paste as Plain Text", {
      onSelect: () => {
        Zu(t);
      },
      isDisabled: e
    })
  ], [t, e]), o = me(
    (a, u, l) => {
      t.update(() => {
        a == null || a.onSelect(u), l();
      });
    },
    [t]
  );
  return J(() => {
    var a;
    n.current = ((a = t.getRootElement()) == null ? void 0 : a.className) || "";
  }, [t]), J(() => {
    const a = () => {
      var u;
      (u = i.current) == null || u.call(i);
    };
    return window.addEventListener("scroll", a, !0), () => {
      window.removeEventListener("scroll", a, !0);
    };
  }, []), /* @__PURE__ */ w.jsx(
    hv,
    {
      options: s,
      onSelectOption: o,
      onWillOpen: (a) => {
        r.current = a.target;
      },
      menuRenderFn: (a, { selectedIndex: u, options: l, selectOptionAndCleanUp: c, setHighlightedIndex: d }, { setMenuRef: f }) => (i.current = () => c(void 0), a.current && !mv(r.current, n.current) && !xp(r.current) ? $g.createPortal(
        /* @__PURE__ */ w.jsx(
          "div",
          {
            className: "typeahead-popover auto-embed-menu",
            style: {
              marginLeft: a.current.style.width,
              userSelect: "none",
              width: 200
            },
            ref: f,
            children: /* @__PURE__ */ w.jsx(
              gv,
              {
                options: s,
                selectedItemIndex: u,
                onOptionClick: (g, h) => {
                  g.isDisabled || (d(h), c(g));
                },
                onOptionMouseEnter: (g) => {
                  d(g);
                }
              }
            )
          }
        ),
        a.current
      ) : null)
    }
  );
}
const el = "comment", _v = [el], vv = 1;
class Zr extends Yt {
  constructor(r, n) {
    super(n);
    /** @internal */
    $(this, "__typedIDs");
    this.__typedIDs = r || {};
  }
  static getType() {
    return "typed-mark";
  }
  static clone(r) {
    const n = JSON.parse(JSON.stringify(r.__typedIDs));
    return new Zr(n, r.__key);
  }
  static isReservedType(r) {
    return _v.includes(r);
  }
  static importJSON(r) {
    const { typedIDs: n } = r;
    return id(n).updateFromJSON(r);
  }
  static importDOM() {
    return null;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      typedIDs: this.getTypedIDs(),
      version: vv
    };
  }
  createDOM(r) {
    const n = document.createElement("mark");
    for (const [i, s] of Object.entries(this.__typedIDs))
      Es(n, Ss(r.theme.typedMark, i)), s.length > 1 && Es(n, Ss(r.theme.typedMarkOverlap, i));
    return n;
  }
  updateDOM(r, n, i) {
    for (const [s, o] of Object.entries(this.__typedIDs)) {
      const u = r.__typedIDs[s].length, l = o.length, c = Ss(i.theme.typedMark, s), d = Ss(i.theme.typedMarkOverlap, s);
      u !== l && (u === 0 ? l === 1 && Es(n, c) : l === 0 && _c(n, c), u === 1 ? l === 2 && Es(n, d) : l === 1 && _c(n, d));
    }
    return !1;
  }
  hasID(r, n) {
    const s = this.getTypedIDs()[r];
    if (!s) return !1;
    for (let o = 0; o < s.length; o++)
      if (n === s[o])
        return !0;
    return !1;
  }
  getTypedIDs() {
    const r = this.getLatest();
    return Ci(r) ? r.__typedIDs : {};
  }
  addID(r, n) {
    const i = this.getWritable();
    if (!Ci(i)) return;
    const s = i.__typedIDs[r] ?? [];
    i.__typedIDs[r] = s;
    for (let o = 0; o < s.length; o++)
      if (n === s[o])
        return;
    s.push(n);
  }
  deleteID(r, n) {
    const i = this.getWritable();
    if (!Ci(i)) return;
    const s = i.__typedIDs[r];
    for (let o = 0; o < s.length; o++)
      if (n === s[o]) {
        s.splice(o, 1);
        return;
      }
  }
  hasNoIDsForEveryType() {
    return Object.values(this.getTypedIDs()).every((r) => r === void 0 || r.length === 0);
  }
  insertNewAfter(r, n = !0) {
    const i = id(this.__typedIDs);
    return this.insertAfter(i, n), i;
  }
  canInsertTextBefore() {
    return !1;
  }
  canInsertTextAfter() {
    return !1;
  }
  canBeEmpty() {
    return !1;
  }
  isInline() {
    return !0;
  }
  extractWithChild(r, n, i) {
    if (!R(n) || i === "html")
      return !1;
    const s = n.anchor, o = n.focus, a = s.getNode(), u = o.getNode(), c = n.isBackward() ? s.offset - o.offset : o.offset - s.offset;
    return this.isParentOf(a) && this.isParentOf(u) && this.getTextContent().length === c;
  }
  excludeFromCopy(r) {
    return r !== "clone";
  }
}
function Ss(t, e) {
  return `${t}-${e}`;
}
function id(t) {
  return ke(new Zr(t));
}
function Ci(t) {
  return t instanceof Zr;
}
function bv(t) {
  return (t == null ? void 0 : t.type) === Zr.getType();
}
function Pp(t, e, r, n) {
  let i = t;
  if (t === Wi && e && e.length > 0) {
    r.count >= e.length ** 2 + e.length && (r.count = 0, n == null || n.warn("Note caller count was reset. Consider adding more possible note callers."));
    const s = r.count % e.length;
    let o = "";
    if (r.count >= e.length) {
      const a = Math.trunc(r.count / e.length) - 1;
      o = e[a];
    }
    i = o + e[s], r.count += 1;
  }
  return i ?? "*";
}
function Ev(t) {
  const e = [];
  function r(n) {
    if (qo(n) && e.push(n), !S(n)) return;
    n.getChildren().forEach(r);
  }
  return t.forEach(r), e;
}
function Ti(t) {
  return Lo(t) || Bo(t);
}
function xv(t, e) {
  return S(t) ? t.getChildren().find(
    (i) => Ti(i) && i.getNumber() === e.toString()
  ) : void 0;
}
function Cv(t, e) {
  return t.map((r) => xv(r, e)).filter((r) => r)[0];
}
function sd(t) {
  return !t || !S(t) ? void 0 : t.getChildren().findLast((n) => Ti(n));
}
function Tv(t) {
  var o, a;
  if (!t || Ht(t)) return;
  if (Ti(t)) return t;
  let r = Ci(t.getParent()) ? (o = t.getParent()) == null ? void 0 : o.getPreviousSibling() : t.getPreviousSibling();
  for (; r && !Ti(r) && !Ht(r); )
    r = r.getPreviousSibling();
  if (r && Ti(r)) return r;
  let n = (a = t.getTopLevelElement()) == null ? void 0 : a.getPreviousSibling(), i = sd(n), s = i;
  for (; n && !i && !Ht(n); )
    i = s, n = n.getPreviousSibling(), s = sd(n);
  if (!(!i && Ht(n)))
    return i;
}
function kv(t) {
  return K_(t) || Bo(t);
}
function Av({
  nodeOptions: t,
  logger: e
}) {
  const [r] = be();
  return wv(r, t, e), Ov(r), null;
}
function wv(t, e, r) {
  J(() => {
    if (!t.hasNodes([Ie, tt, ot]))
      throw new Error(
        "NoteNodePlugin: CharNode, NoteNode or ImmutableNoteCallerNode not registered on editor!"
      );
    const n = (i) => t.update(() => Mv(i));
    return Pt(
      // Update NoteNodeCaller preview text when NoteNode children text is changed.
      t.registerNodeTransform(Ie, Dv),
      // Re-generate all note callers when a note is added.
      t.registerNodeTransform(
        ot,
        (i) => Sv(i, t, e, r)
      ),
      // Re-generate all note callers when a note is removed.
      t.registerMutationListener(
        ot,
        (i, { prevEditorState: s }) => Nv(
          i,
          s,
          t,
          e,
          r
        )
      ),
      // Handle double-click of a word immediately following a NoteNode (no space between).
      t.registerRootListener(
        (i, s) => {
          s !== null && s.removeEventListener("dblclick", n), i !== null && i.addEventListener("dblclick", n);
        }
      )
    );
  }, [t, r, e]);
}
function Dv(t) {
  const e = t.getParentOrThrow(), r = e.getChildren(), n = r.find((s) => qo(s));
  if (!Gu(t) || !Gt(e) || !n) return;
  const i = H_(r);
  n.setPreviewText(i);
}
function Sv(t, e, r, n) {
  if (e2(Ju)) return;
  const i = e.getEditorState().read(() => !ge(t.getKey())), s = t == null ? void 0 : t.getParent();
  i && qo(t) && Gt(s) && s.getCaller() === Wi && Lp(r, n);
}
function Lp(t, e) {
  const r = pe().getChildren(), n = Ev(r).filter((s) => {
    const o = s.getParentOrThrow();
    return Gt(o) ? o.getCaller() === Wi : !1;
  }), i = { count: 0 };
  n.forEach((s) => {
    var u;
    const o = (u = t[Nt]) == null ? void 0 : u.noteCallers, a = Pp(Wi, o, i, e);
    s.__caller !== a && s.setCaller(a);
  });
}
function Nv(t, e, r, n, i) {
  r.update(
    () => {
      for (const [s, o] of t) {
        if (o !== "destroyed") continue;
        e.read(() => {
          const u = ge(s), l = u == null ? void 0 : u.getParent();
          return qo(u) && Gt(l) && l.getCaller() === Wi;
        }) && Lp(n, i);
      }
    },
    { tag: "history-merge" }
  );
}
function Mv(t) {
  const e = B();
  if (!R(e)) return;
  const r = e.anchor, n = e.focus, i = r.getNode(), s = n.getNode();
  if (Gt(i) && F(s)) {
    t.preventDefault();
    const o = bf();
    o.anchor.set(s.getKey(), 0, "text"), o.focus.set(s.getKey(), n.offset, "text"), et(o);
  }
}
function Ov(t) {
  J(() => {
    const e = (r) => {
      if (r.key !== "ArrowLeft" && r.key !== "ArrowRight") return !1;
      const n = B();
      if (!R(n)) return !1;
      const i = n.anchor.getNode(), s = n.anchor.offset === i.getTextContent().length, o = ko(
        i,
        (l) => z_(l, t) === "p"
      );
      if (!o) return !1;
      const a = t.getElementByKey(o.getKey());
      if (!a) return !1;
      const u = a.parentElement;
      if (!u) return !1;
      if (s && (u.dir === "ltr" && r.key === "ArrowRight" || u.dir === "rtl" && r.key === "ArrowLeft")) {
        const l = i.getNextSibling();
        if (Gt(l)) {
          const c = l.getNextSibling();
          if (c)
            return n.anchor.set(c.getKey(), 0, "text"), n.focus.set(c.getKey(), 0, "text"), r.preventDefault(), !0;
        }
      }
      return !1;
    };
    return t.registerCommand(go, e, xu);
  }, [t]);
}
function Fp({
  scripture: t,
  nodeOptions: e,
  editorAdaptor: r,
  viewOptions: n,
  logger: i
}) {
  var o;
  const [s] = be();
  return (o = r.initialize) == null || o.call(r, e, i), J(() => {
    var c;
    (c = r.reset) == null || c.call(r);
    const a = r.serializeEditorState(t, n), u = s.parseEditorState(a), l = setTimeout(() => {
      s.setEditorState(u, { tag: Ju }), s.dispatchCommand(af, void 0);
    }, 0);
    return () => clearTimeout(l);
  }, [s, t, n, r]), null;
}
let Ls;
function Iv(t) {
  t && (Ls = t);
}
function Rv(t) {
  if (t.isEmpty()) return { type: En, version: xn, content: [] };
  const e = t.toJSON();
  if (!e.root || !e.root.children) return;
  const r = e.root.children;
  if (r.length === 1 && r[0].type === "para" && r[0].marker === "p" && (!r[0].children || r[0].children.length === 0))
    return { type: En, version: xn, content: [] };
  const n = qp(r), i = Cr(n);
  return i ? { type: En, version: xn, content: i } : void 0;
}
function Pv(t, e) {
  const { type: r, marker: n, code: i, unknownAttributes: s } = t;
  return Ne({
    type: r,
    marker: n,
    code: i,
    ...s,
    content: e
  });
}
function Lv(t) {
  const { marker: e, number: r, sid: n, altnumber: i, pubnumber: s, unknownAttributes: o } = t;
  return Ne({
    type: Ct.getType(),
    marker: e,
    number: r,
    sid: n,
    altnumber: i,
    pubnumber: s,
    ...o
  });
}
function Fv(t, e) {
  const { marker: r, sid: n, altnumber: i, pubnumber: s, unknownAttributes: o } = t, a = e && typeof e[0] == "string" ? e[0] : void 0;
  let { number: u } = t;
  return u = yp(r, a, u), Ne({
    type: Ct.getType(),
    marker: r,
    number: u,
    sid: n,
    altnumber: i,
    pubnumber: s,
    ...o
  });
}
function qv(t) {
  const { marker: e, sid: r, altnumber: n, pubnumber: i, unknownAttributes: s } = t, { text: o } = t;
  let { number: a } = t;
  return a = yp(e, o, a), Ne({
    type: yt.getType(),
    marker: e,
    number: a,
    sid: r,
    altnumber: n,
    pubnumber: i,
    ...s
  });
}
function Bv(t) {
  const { type: e, marker: r, unknownAttributes: n } = t;
  let { text: i } = t;
  return i.startsWith(Gn) && (i = i.slice(1)), Ne({
    type: e,
    marker: r,
    ...n,
    content: [i]
  });
}
function jv(t, e) {
  const { type: r, marker: n, unknownAttributes: i } = t;
  return Ne({
    type: r,
    marker: n,
    ...i,
    content: e
  });
}
function $v(t, e) {
  const { type: r, marker: n, caller: i, category: s, unknownAttributes: o } = t;
  return Ne({
    type: r,
    marker: n,
    caller: i,
    category: s,
    ...o,
    content: e
  });
}
function pn(t) {
  const { type: e, marker: r, sid: n, eid: i, unknownAttributes: s } = t;
  return Ne({
    type: e,
    marker: r,
    sid: n,
    eid: i,
    ...s
  });
}
function Uv(t) {
  return t.text;
}
function Vv(t, e) {
  const { tag: r, marker: n, unknownAttributes: i } = t;
  return Ne({
    type: r,
    marker: n,
    ...i,
    content: e
  });
}
function Wv(t) {
  const { marker: e } = t;
  return {
    type: oo,
    marker: e
  };
}
function od(t, e) {
  const r = t[t.length - 1];
  r && typeof r == "string" ? t[t.length - 1] = r + e : t.push(e);
}
function Hv(t, e, r, n, i) {
  const s = Ft.getType(), o = e.filter((l) => !r.includes(l));
  if (r.filter((l) => !e.includes(l)).forEach((l) => {
    const c = pn({
      type: s,
      marker: Cn,
      eid: l,
      version: kr
    });
    i.push(c);
  }), o.forEach((l) => {
    const c = pn({
      type: s,
      marker: $r,
      sid: l,
      version: kr
    });
    i.push(c);
  }), e.length === 0) {
    const l = pn({
      type: s,
      marker: $r,
      version: kr
    });
    i.push(l);
  }
  if (i.push(...t), e.length === 0) {
    const l = pn({
      type: s,
      marker: Cn,
      version: kr
    });
    i.push(l);
  }
  (!n || !bv(n)) && e.forEach((l) => {
    const c = pn({
      type: s,
      marker: Cn,
      eid: l,
      version: kr
    });
    i.push(c);
  });
}
function Cr(t, e) {
  const r = [];
  let n, i = [];
  return t.forEach((s, o) => {
    const a = s, u = s, l = s, c = s, d = s, f = s, g = s;
    switch (s.type) {
      case mt.getType():
        r.push(
          Pv(a, Cr(a.children))
        );
        break;
      case mr.getType():
        r.push(Lv(s));
        break;
      case Ct.getType():
        r.push(
          Fv(u, Cr(u.children))
        );
        break;
      case _t.getType():
      case yt.getType():
        r.push(qv(s));
        break;
      case Ie.getType():
        r.push(Bv(s));
        break;
      case Ge.getType():
        r.push(
          jv(l, Cr(l.children))
        );
        break;
      case tt.getType():
        r.push(
          $v(
            c,
            Cr(c.children, c.caller)
          )
        );
        break;
      case ot.getType():
      case Hr.getType():
      case Xn.getType():
        break;
      case Zr.getType():
        if (n = Cr(f.children), n) {
          const h = f.typedIDs[el];
          if (h && h.length >= 0)
            Hv(n, h, i, t[o + 1], r), i = h;
          else {
            const p = n.shift();
            p && (typeof p == "string" ? od(r, p) : r.push(p)), n && r.push(...n);
          }
        }
        break;
      case Ft.getType():
        r.push(pn(s));
        break;
      case xt.getType():
        d.text && d.text !== Gn && (!e || d.text !== _p(e)) && od(r, Uv(d));
        break;
      case Xr.getType():
        r.push(
          Vv(g, Cr(g.children))
        );
        break;
      case Qr.getType():
        r.push(Wv(s));
        break;
      default:
        Ls == null || Ls.error(`Unexpected node type '${s.type}'!`);
    }
  }), r && r.length > 0 ? r : void 0;
}
function qp(t) {
  const e = t.findIndex((r) => kp(r));
  if (e >= 0) {
    const r = t.slice(0, e), n = t[e].children, i = qp(t.slice(e + 1));
    t = [...r, ...n, ...i];
  }
  return t;
}
const zv = {
  initialize: Iv,
  deserializeEditorState: Rv
}, tl = "formatted", Bp = "unformatted", Kv = tl;
function Jv(t) {
  let e;
  switch (t ?? Kv) {
    case tl:
      e = {
        markerMode: "hidden",
        hasSpacing: !0,
        isFormattedFont: !0
      };
      break;
    case Bp:
      e = {
        markerMode: "editable",
        hasSpacing: !1,
        isFormattedFont: !1
      };
      break;
  }
  return e;
}
function xx(t) {
  if (!t) return;
  const { markerMode: e, hasSpacing: r, isFormattedFont: n } = t;
  if (e === "hidden" && r && n) return tl;
  if (e === "editable" && !r && !n) return Bp;
}
function Gv(t) {
  if (t)
    return t.markerMode === "editable" ? yt : _t;
}
function jp(t) {
  const e = [];
  return t != null && t.hasSpacing && e.push(m_), t != null && t.isFormattedFont && e.push(y_), e;
}
const ad = "MarkNode", Yv = {
  type: Hr.getType(),
  version: 1
}, $p = {
  /** Count used for note callers. */
  count: 0
};
let ki = [], z, ir, Up, Fs, ee;
function Xv(t, e) {
  ki = [], eb(t), tb(e);
}
function Qv(t = 0) {
  $p.count = t;
}
function Zv(t, e) {
  e ? z = e : z = Jv(void 0);
  const r = Wp({
    type: Ge.getType(),
    marker: Yu
  });
  let n;
  return t ? (t.type !== En && (ee == null || ee.warn(`This USJ type '${t.type}' didn't match the expected type '${En}'.`)), t.version !== xn && (ee == null || ee.warn(
    `This USJ version '${t.version}' didn't match the expected version '${xn}'.`
  )), t.content.length > 0 ? n = pi(qs(t.content)) : n = [r]) : n = [r], Fs == null || Fs(ki), {
    root: {
      children: n,
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1
    }
  };
}
function eb(t) {
  var e;
  if (t && (ir = t), ir && ir[Nt]) {
    const r = ir[Nt].noteCallers;
    r && r.length > 0 && (Up = r);
  }
  (e = t == null ? void 0 : t[ad]) != null && e.addMissingComments && (Fs = t[ad].addMissingComments);
}
function tb(t) {
  t && (ee = t);
}
function Vp(t) {
  return !t || t.length !== 1 || typeof t[0] != "string" ? "" : t[0];
}
function rb(t) {
  const { marker: e, code: r } = t;
  e !== Vh && (ee == null || ee.warn(`Unexpected book marker '${e}'!`)), (!r || !mt.isValidBookCode(r)) && (ee == null || ee.warn(`Unexpected book code '${r}'!`));
  const n = gr(t);
  return Ne({
    type: mt.getType(),
    marker: e,
    code: r ?? "",
    unknownAttributes: n,
    children: [ds(Vp(t.content))],
    direction: null,
    format: "",
    indent: 0,
    version: Wh
  });
}
function nb(t) {
  const { marker: e, number: r, sid: n, altnumber: i, pubnumber: s } = t;
  e !== Jh && (ee == null || ee.warn(`Unexpected chapter marker '${e}'!`));
  const o = gr(t);
  let a;
  return (z == null ? void 0 : z.markerMode) === "visible" && (a = !0), (z == null ? void 0 : z.markerMode) === "editable" ? Ne({
    type: Ct.getType(),
    marker: e,
    number: r ?? "",
    sid: n,
    altnumber: i,
    pubnumber: s,
    unknownAttributes: o,
    children: [ds(Fo(e, r) ?? "")],
    direction: null,
    format: "",
    indent: 0,
    version: Gh
  }) : Ne({
    type: mr.getType(),
    marker: e,
    number: r ?? "",
    showMarker: a,
    sid: n,
    altnumber: i,
    pubnumber: s,
    unknownAttributes: o,
    version: vp
  });
}
function ib(t) {
  const { marker: e, number: r, sid: n, altnumber: i, pubnumber: s } = t;
  e !== lp && (ee == null || ee.warn(`Unexpected verse marker '${e}'!`));
  const a = (Gv(z) ?? _t).getType(), u = (z == null ? void 0 : z.markerMode) === "editable" ? cp : Op;
  let l, c;
  (z == null ? void 0 : z.markerMode) === "editable" ? l = Fo(e, r) : (z == null ? void 0 : z.markerMode) === "visible" && (c = !0);
  const d = gr(t);
  return Ne({
    type: a,
    text: l,
    marker: e,
    number: r ?? "",
    sid: n,
    altnumber: i,
    pubnumber: s,
    showMarker: c,
    unknownAttributes: d,
    version: u
  });
}
function sb(t) {
  const { marker: e } = t;
  Ie.isValidMarker(e) || ee == null || ee.warn(`Unexpected char marker '${e}'!`);
  let r = Vp(t.content);
  ((z == null ? void 0 : z.markerMode) === "visible" || (z == null ? void 0 : z.markerMode) === "editable") && (r = Gn + r);
  const n = gr(t);
  return Ne({
    type: Ie.getType(),
    marker: e,
    text: r,
    unknownAttributes: n,
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    version: tp
  });
}
function ob(t) {
  return {
    type: Yn.getType(),
    children: t,
    direction: null,
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: Tp
  };
}
function Wp(t, e = []) {
  const { marker: r } = t;
  Ge.isValidMarker(r) || ee == null || ee.warn(`Unexpected para marker '${r}'!`);
  const n = [];
  (z == null ? void 0 : z.markerMode) === "editable" && n.push(Hi(r), ds(Gn)), n.push(...e);
  const i = gr(t);
  return Ne({
    type: Ge.getType(),
    marker: r,
    unknownAttributes: i,
    children: n,
    direction: null,
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: up
  });
}
function ab(t, e) {
  const r = W_(e);
  let n = () => {
  };
  return ir && ir[Nt] && ir[Nt].onClick && (n = ir[Nt].onClick), Ne({
    type: ot.getType(),
    caller: t,
    previewText: r,
    onClick: n,
    version: Sp
  });
}
function ub(t, e) {
  const { marker: r, category: n } = t;
  tt.isValidMarker(r) || ee == null || ee.warn(`Unexpected note marker '${r}'!`);
  const i = t.caller ?? "*";
  let s;
  if ((z == null ? void 0 : z.markerMode) === "editable")
    s = ds(_p(i));
  else {
    const c = Pp(t.caller, Up, $p, ee);
    s = ab(c, e), e.forEach((d) => {
      np(d) && (d.mode = "token", d.style = "display: none");
    });
  }
  const o = gr(t);
  let a, u;
  ((z == null ? void 0 : z.markerMode) === "visible" || (z == null ? void 0 : z.markerMode) === "editable") && (a = Hi(r), u = Hi(r, !1));
  const l = [];
  return a && l.push(a), l.push(s, ...e), u && l.push(u), Ne({
    type: tt.getType(),
    marker: r,
    caller: i,
    category: n,
    unknownAttributes: o,
    children: l,
    direction: null,
    format: "",
    indent: 0,
    version: ip
  });
}
function lb(t) {
  const { marker: e, sid: r, eid: n } = t;
  (!e || !Ft.isValidMarker(e)) && (ee == null || ee.warn(`Unexpected milestone marker '${e}'!`));
  const i = gr(t);
  return Ne({
    type: Ft.getType(),
    marker: e,
    sid: r,
    eid: n,
    unknownAttributes: i,
    version: kr
  });
}
function ud(t, e = []) {
  return {
    type: Zr.getType(),
    typedIDs: { [el]: e },
    children: t,
    direction: null,
    format: "",
    indent: 0,
    version: 1
  };
}
function cb(t, e) {
  const { marker: r } = t, n = t.type, i = gr(t), s = [...e];
  return Ne({
    type: Xr.getType(),
    tag: n,
    marker: r,
    unknownAttributes: i,
    children: s,
    direction: null,
    format: "",
    indent: 0,
    version: Kh
  });
}
function db(t) {
  return {
    type: Qr.getType(),
    marker: t,
    version: Ap
  };
}
function Hi(t, e = !0) {
  return {
    type: Xn.getType(),
    marker: t,
    isOpening: e,
    text: "",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    version: 1
  };
}
function ds(t, e = "normal") {
  return {
    type: xt.getType(),
    text: t,
    detail: 0,
    format: 0,
    mode: e,
    style: "",
    version: 1
  };
}
function fb(t, e) {
  ((z == null ? void 0 : z.markerMode) === "visible" || (z == null ? void 0 : z.markerMode) === "editable") && e.push(Hi(t));
}
function hb(t, e) {
  ((z == null ? void 0 : z.markerMode) === "visible" || (z == null ? void 0 : z.markerMode) === "editable") && !(Ie.isValidFootnoteMarker(t) || Ie.isValidCrossReferenceMarker(t)) && e.push(Hi(t, !1));
}
function ld(t, e) {
  return t.length <= 0 || e === 0 ? t : t.map((r) => r - e);
}
function pb(t, e) {
  const r = t.indexOf(e, 0);
  r > -1 && t.splice(r, 1);
}
function cd(t, e) {
  e.marker === $r && e.sid !== void 0 && t.push(e.sid), e.marker === Cn && e.eid !== void 0 && pb(t, e.eid);
}
function Qa(t, e, r = !1, n = []) {
  if (e.length <= 0 || e[0] >= t.length) return t;
  const i = e.shift(), s = e.length > 0 ? e.shift() : t.length - 1;
  if (i === void 0 || s === void 0 || s >= t.length || t.length <= 0)
    return t;
  const o = t.slice(0, i), a = r ? [ud(o, [...n])] : o, u = t[i];
  cd(n, u);
  const l = Qa(
    t.slice(i + 1, s),
    ld(e, i + 1),
    u.marker === $r,
    n
  ), c = ud(l, [...n]), d = t[s];
  cd(n, d);
  const f = Qa(
    t.slice(s + 1),
    ld(e, s + 1),
    d.marker === $r,
    n
  );
  return [...a, c, ...f];
}
function qs(t) {
  const e = [], r = [];
  return t == null || t.forEach((n) => {
    if (typeof n == "string")
      r.push(ds(n));
    else if (!n.type)
      ee == null || ee.error("Marker type is missing!");
    else
      switch (n.type) {
        case mt.getType():
          r.push(rb(n));
          break;
        case Ct.getType():
          r.push(nb(n));
          break;
        case yt.getType():
          z != null && z.hasSpacing || r.push(Yv), r.push(ib(n));
          break;
        case Ie.getType():
          fb(n.marker, r), r.push(sb(n)), hb(n.marker, r);
          break;
        case Ge.getType():
          r.push(Wp(n, qs(n.content)));
          break;
        case tt.getType():
          r.push(ub(n, qs(n.content)));
          break;
        case Ft.getType():
          N_(n.marker) && (e.push(r.length), n.sid !== void 0 && (ki == null || ki.push(n.sid))), r.push(lb(n));
          break;
        case Qr.getType():
          r.push(db(n.marker));
          break;
        default:
          ee == null || ee.warn(`Unknown type-marker '${n.type}-${n.marker}'!`), r.push(cb(n, qs(n.content)));
      }
  }), Qa(r, e);
}
function pi(t) {
  const e = t.findIndex((s) => g_(s)), r = e >= 0, n = t.findIndex(
    (s) => T_(s) || X_(s)
  ), i = n >= 0;
  if (r && (!i || e < n)) {
    const s = pi(t.slice(0, e)), o = t[e], a = pi(t.slice(e + 1));
    return [...s, o, ...a];
  } else if (i) {
    const s = pi(t.slice(0, n)), o = t[n], a = pi(t.slice(n + 1));
    return [...s, o, ...a];
  } else if (t.some((s) => "text" in s && "mode" in s))
    return [ob(t)];
  return t;
}
const rl = {
  initialize: Xv,
  reset: Qv,
  serializeEditorState: Zv
};
var x = /* @__PURE__ */ ((t) => (t.FileIdentification = "FileIdentification", t.Headers = "Headers", t.Remarks = "Remarks", t.Introduction = "Introduction", t.DivisionMarks = "DivisionMarks", t.Paragraphs = "Paragraphs", t.Poetry = "Poetry", t.TitlesHeadings = "TitlesHeadings", t.Tables = "Tables", t.CenterTables = "CenterTables", t.RightTables = "RightTables", t.Lists = "Lists", t.Footnotes = "Footnotes", t.CrossReferences = "CrossReferences", t.SpecialText = "SpecialText", t.CharacterStyling = "CharacterStyling", t.Breaks = "Breaks", t.SpecialFeatures = "SpecialFeatures", t.PeripheralReferences = "PeripheralReferences", t.PeripheralMaterials = "PeripheralMaterials", t.Uncategorized = "Uncategorized", t))(x || {}), E = /* @__PURE__ */ ((t) => (t.Paragraph = "Paragraph", t.Character = "Character", t.Note = "Note", t.Unknown = "Unknown", t))(E || {});
const gb = {
  id: {
    category: x.FileIdentification,
    type: E.Paragraph,
    description: "File identification information (BOOKID, FILENAME, EDITOR, MODIFICATION DATE)",
    hasEndMarker: !1,
    children: {
      FileIdentification: ["usfm", "ide"],
      Headers: ["h", "h1", "h2", "h3", "toc1", "toc2", "toc3"],
      Remarks: ["rem", "sts", "restore"],
      Introduction: [
        "imt",
        "imt1",
        "imt2",
        "imt3",
        "imt4",
        "imte",
        "imte1",
        "imte2",
        "is",
        "is1",
        "is2",
        "iot",
        "io",
        "io1",
        "io2",
        "io3",
        "io4",
        "ior",
        "ip",
        "im",
        "ipi",
        "imi",
        "ili",
        "ili1",
        "ili2",
        "ipq",
        "imq",
        "ipr",
        "ib",
        "iq",
        "iq1",
        "iq2",
        "iq3",
        "iex",
        "ie"
      ],
      DivisionMarks: ["c", "cl"],
      TitlesHeadings: ["mt", "mt1", "mt2", "mt3", "mt4"]
    }
  },
  usfm: {
    category: x.FileIdentification,
    type: E.Paragraph,
    description: "File markup version information",
    hasEndMarker: !1,
    children: void 0
  },
  ide: {
    category: x.FileIdentification,
    type: E.Paragraph,
    description: "File encoding information",
    hasEndMarker: !1,
    children: {
      Remarks: ["rem", "sts"]
    }
  },
  h: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Running header text for a book (basic)",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h1: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Running header text",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h2: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Running header text, left side of page",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  h3: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Running header text, right side of page",
    hasEndMarker: !1,
    children: {
      Headers: ["toc1", "toc2", "toc3", "toca1", "toca2", "toca3"]
    }
  },
  toc1: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Long table of contents text",
    hasEndMarker: !1,
    children: void 0
  },
  toc2: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Short table of contents text",
    hasEndMarker: !1,
    children: void 0
  },
  toc3: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Book Abbreviation",
    hasEndMarker: !1,
    children: void 0
  },
  toca1: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Alternative language long table of contents text",
    hasEndMarker: !1,
    children: void 0
  },
  toca2: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Alternative language short table of contents text",
    hasEndMarker: !1,
    children: void 0
  },
  toca3: {
    category: x.Headers,
    type: E.Paragraph,
    description: "Alternative language book Abbreviation",
    hasEndMarker: !1,
    children: void 0
  },
  rem: {
    category: x.Remarks,
    type: E.Paragraph,
    description: "Comments and remarks",
    hasEndMarker: !1,
    children: void 0
  },
  sts: {
    category: x.Remarks,
    type: E.Paragraph,
    description: "Status of this file",
    hasEndMarker: !1,
    children: void 0
  },
  restore: {
    category: x.Remarks,
    type: E.Paragraph,
    description: "Project restore information",
    hasEndMarker: !1,
    children: void 0
  },
  imt: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title, level 1 (if single level) (basic)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt1: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt2: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title, level 2",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt3: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title, level 3",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imt4: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title, level 4 (usually within parenthesis)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title at introduction end, level 1 (if single level)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte1: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title at introduction end, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  imte2: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction major title at introduction end, level 2",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction section heading, level 1 (if single level) (basic)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"],
      CharacterStyling: ["no"]
    }
  },
  is1: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction section heading, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  is2: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction section heading, level 2",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      SpecialText: ["bk"]
    }
  },
  iot: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction outline title (basic)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  io: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction outline text, level 1 (if single level)",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io1: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction outline text, level 1 (if multiple levels) (basic)",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io2: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction outline text, level 2",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io3: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction outline text, level 3",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  io4: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction outline text, level 4",
    hasEndMarker: !1,
    children: {
      Introduction: ["ior", "iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ior: {
    category: x.Introduction,
    type: E.Character,
    description: "Introduction references range for outline entry; for marking references separately",
    hasEndMarker: !0,
    children: void 0
  },
  ip: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction prose paragraph (basic)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  im: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction prose paragraph, with no first line indent (may occur after poetry)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipi: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction prose paragraph, indented, with first line indent",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  imi: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction prose paragraph text, indented, with no first line indent",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "A list entry, level 1 (if single level)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili1: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "A list entry, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ili2: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "A list entry, level 2",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipq: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction prose paragraph, quote from the body text",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  imq: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction prose paragraph, quote from the body text, with no first line indent",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ipr: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction prose paragraph, right aligned",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ib: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction blank line",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"]
    }
  },
  iq: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction poetry text, level 1 (if single level)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq1: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction poetry text, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq2: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction poetry text, level 2",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iq3: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction poetry text, level 3",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  iex: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)",
    hasEndMarker: !1,
    children: {
      Introduction: ["iqt"],
      CharacterStyling: ["no"]
    }
  },
  iqt: {
    category: x.Introduction,
    type: E.Character,
    description: "For quoted scripture text appearing in the introduction",
    hasEndMarker: !0,
    children: void 0
  },
  ie: {
    category: x.Introduction,
    type: E.Paragraph,
    description: "Introduction ending marker",
    hasEndMarker: !1,
    children: void 0
  },
  c: {
    category: x.DivisionMarks,
    type: E.Paragraph,
    description: "Chapter number",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["ca", "cp", "cl", "cd"],
      Paragraphs: ["p", "m", "po", "pr", "cls", "pi", "pi1", "pi2", "pi3", "pc", "mi", "nb"],
      Poetry: ["q", "q1", "q2", "q3", "q4", "qc", "qr", "qa", "qd", "b"],
      TitlesHeadings: [
        "mte",
        "ms",
        "ms1",
        "ms2",
        "ms3",
        "s",
        "s1",
        "s2",
        "s3",
        "s4",
        "r",
        "sp",
        "d",
        "sd",
        "sd1",
        "sd2",
        "sd3",
        "sd4"
      ],
      Lists: ["lh", "li", "li1", "li2", "li3", "li4", "lf", "lim", "lim1", "lim2", "lim3", "lim4"],
      Footnotes: ["f", "fe"],
      SpecialText: ["lit"],
      Breaks: ["pb"]
    }
  },
  ca: {
    category: x.DivisionMarks,
    type: E.Character,
    description: "Second (alternate) chapter number (for coding dual versification; useful for places where different traditions of chapter breaks need to be supported in the same translation)",
    hasEndMarker: !0,
    children: void 0
  },
  cp: {
    category: x.DivisionMarks,
    type: E.Paragraph,
    description: "Published chapter number (chapter string that should appear in the published text)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"]
    }
  },
  cl: {
    category: x.DivisionMarks,
    type: E.Paragraph,
    description: "Chapter label used for translations that add a word such as 'Chapter' before chapter numbers (e.g. Psalms). The subsequent text is the chapter label.",
    hasEndMarker: !1,
    children: void 0
  },
  cd: {
    category: x.DivisionMarks,
    type: E.Paragraph,
    description: "Chapter Description (Publishing option D, e.g. in Russian Bibles)",
    hasEndMarker: !1,
    children: {
      DivisionMarks: ["vp"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  v: {
    category: x.DivisionMarks,
    type: E.Character,
    description: "A verse number",
    hasEndMarker: !1,
    children: void 0
  },
  va: {
    category: x.DivisionMarks,
    type: E.Character,
    description: "Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)",
    hasEndMarker: !0,
    children: void 0
  },
  vp: {
    category: x.DivisionMarks,
    type: E.Character,
    description: "Published verse marker (verse string that should appear in the published text)",
    hasEndMarker: !0,
    children: void 0
  },
  p: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, with first line indent (basic)",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  m: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, with no first line indent (may occur after poetry) (basic)",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  po: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Letter opening",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pr: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Text refrain (paragraph text, right aligned)",
    hasEndMarker: !1,
    children: {
      Paragraphs: ["pmo", "pm", "pmc", "pmr"],
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  cls: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Letter Closing",
    hasEndMarker: !1,
    children: {
      SpecialText: ["tl", "sig", "pn", "png", "addpn", "add"]
    }
  },
  pmo: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Embedded text opening",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pm: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Embedded text paragraph",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pmc: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Embedded text closing",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pmr: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Embedded text refrain (e.g. Then all the people shall say, 'Amen!')",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse (basic)",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi1: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi2: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, level 2 indent, with first line indent; often used for discourse",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pi3: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, level 3 indent, with first line indent; often used for discourse",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  pc: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, centered (for Inscription)",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  mi: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, indented, with no first line indent; often used for discourse",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  nb: {
    category: x.Paragraphs,
    type: E.Paragraph,
    description: "Paragraph text, with no break from previous paragraph text (at chapter boundary) (basic)",
    hasEndMarker: !1,
    children: {
      Poetry: ["qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, level 1 indent (if single level)",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q1: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, level 1 indent (if multiple levels) (basic)",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q2: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, level 2 indent (basic)",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q3: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, level 3 indent",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  q4: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, level 4 indent",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qc: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, centered",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qr: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, Right Aligned",
    hasEndMarker: !1,
    children: {
      Poetry: ["qs", "qac", "qm", "qm1", "qm2", "qm3"],
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qs: {
    category: x.Poetry,
    type: E.Character,
    description: "Poetry text, Selah",
    hasEndMarker: !0,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  qa: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, Acrostic marker/heading",
    hasEndMarker: !1,
    children: void 0
  },
  qac: {
    category: x.Poetry,
    type: E.Character,
    description: "Poetry text, Acrostic markup of the first character of a line of acrostic poetry",
    hasEndMarker: !0,
    children: void 0
  },
  qm: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, embedded, level 1 indent (if single level)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm1: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, embedded, level 1 indent (if multiple levels)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm2: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, embedded, level 2 indent",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qm3: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text, embedded, level 3 indent",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  qd: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "A Hebrew musical performance annotation, similar in content to Hebrew descriptive title.",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte1"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  b: {
    category: x.Poetry,
    type: E.Paragraph,
    description: "Poetry text stanza break (e.g. stanza break) (basic)",
    hasEndMarker: !1,
    children: void 0
  },
  mt: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "The main title of the book (if single level)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt1: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "The main title of the book (if multiple levels) (basic)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt2: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A secondary title usually occurring before the main title (basic)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt3: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A secondary title occurring after the main title",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f"],
      CrossReferences: ["x"]
    }
  },
  mt4: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A small secondary title sometimes occurring within parentheses",
    hasEndMarker: !1,
    children: void 0
  },
  mte: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "The main title of the book repeated at the end of the book, level 1 (if single level)",
    hasEndMarker: !1,
    children: void 0
  },
  mte1: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "The main title of the book repeated at the end of the book, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mte2"]
    }
  },
  mte2: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A secondary title occurring before or after the 'ending' main title",
    hasEndMarker: !1,
    children: void 0
  },
  ms: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A major section division heading, level 1 (if single level) (basic)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms1: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A major section division heading, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms2: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A major section division heading, level 2",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  ms3: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A major section division heading, level 3",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["mr"],
      Footnotes: ["f", "fe"]
    }
  },
  mr: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A major section division references range heading (basic)",
    hasEndMarker: !1,
    children: void 0
  },
  s: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A section heading, level 1 (if single level) (basic)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s1: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A section heading, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s2: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A section heading, level 2 (e.g. Proverbs 22-24)",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s3: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A section heading, level 3 (e.g. Genesis 'The First Day')",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["no", "it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  s4: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A section heading, level 4",
    hasEndMarker: !1,
    children: {
      TitlesHeadings: ["sr", "r"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  sr: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A section division references range heading",
    hasEndMarker: !1,
    children: void 0
  },
  r: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "Parallel reference(s) (basic)",
    hasEndMarker: !1,
    children: void 0
  },
  sp: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A heading, to identify the speaker (e.g. Job)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  d: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "A Hebrew text heading, to provide description (e.g. Psalms)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  sd: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "Vertical space used to divide the text into sections, level 1 (if single level)",
    hasEndMarker: !1,
    children: void 0
  },
  sd1: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "Vertical space used to divide the text into sections, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: void 0
  },
  sd2: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "Vertical space used to divide the text into sections, level 2",
    hasEndMarker: !1,
    children: void 0
  },
  sd3: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "Vertical space used to divide the text into sections, level 3",
    hasEndMarker: !1,
    children: void 0
  },
  sd4: {
    category: x.TitlesHeadings,
    type: E.Paragraph,
    description: "Vertical space used to divide the text into sections, level 4",
    hasEndMarker: !1,
    children: void 0
  },
  lh: {
    category: x.Lists,
    type: E.Paragraph,
    description: "List header (introductory remark)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li: {
    category: x.Lists,
    type: E.Paragraph,
    description: "A list entry, level 1 (if single level)",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li1: {
    category: x.Lists,
    type: E.Paragraph,
    description: "A list entry, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li2: {
    category: x.Lists,
    type: E.Paragraph,
    description: "A list entry, level 2",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li3: {
    category: x.Lists,
    type: E.Paragraph,
    description: "A list entry, level 3",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  li4: {
    category: x.Lists,
    type: E.Paragraph,
    description: "A list entry, level 4",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lf: {
    category: x.Lists,
    type: E.Paragraph,
    description: "List footer (concluding remark)",
    hasEndMarker: !1,
    children: {
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim: {
    category: x.Lists,
    type: E.Paragraph,
    description: "An embedded list entry, level 1 (if single level)",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim1: {
    category: x.Lists,
    type: E.Paragraph,
    description: "An embedded list entry, level 1 (if multiple levels)",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim2: {
    category: x.Lists,
    type: E.Paragraph,
    description: "An embedded list entry, level 2",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim3: {
    category: x.Lists,
    type: E.Paragraph,
    description: "An embedded list item, level 3",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  lim4: {
    category: x.Lists,
    type: E.Paragraph,
    description: "An embedded list entry, level 4",
    hasEndMarker: !1,
    children: {
      Lists: ["litl", "lik", "liv", "liv1", "liv2", "liv3", "liv4", "liv5"],
      Footnotes: ["f", "fe", "fm"],
      CrossReferences: ["x", "xt", "rq"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  litl: {
    category: x.Lists,
    type: E.Character,
    description: "List entry total text",
    hasEndMarker: !0,
    children: void 0
  },
  lik: {
    category: x.Lists,
    type: E.Character,
    description: "Structured list entry key text",
    hasEndMarker: !0,
    children: void 0
  },
  liv: {
    category: x.Lists,
    type: E.Character,
    description: "Structured list entry value 1 content (if single value)",
    hasEndMarker: !0,
    children: void 0
  },
  liv1: {
    category: x.Lists,
    type: E.Character,
    description: "Structured list entry value 1 content (if multiple values)",
    hasEndMarker: !0,
    children: void 0
  },
  liv2: {
    category: x.Lists,
    type: E.Character,
    description: "Structured list entry value 2 content",
    hasEndMarker: !0,
    children: void 0
  },
  liv3: {
    category: x.Lists,
    type: E.Character,
    description: "Structured list entry value 3 content",
    hasEndMarker: !0,
    children: void 0
  },
  liv4: {
    category: x.Lists,
    type: E.Character,
    description: "Structured list entry value 4 content",
    hasEndMarker: !0,
    children: void 0
  },
  liv5: {
    category: x.Lists,
    type: E.Character,
    description: "Structured list entry value 5 content",
    hasEndMarker: !0,
    children: void 0
  },
  f: {
    category: x.Footnotes,
    type: E.Note,
    description: "A Footnote text item (basic)",
    hasEndMarker: !0,
    children: {
      Footnotes: ["fr", "ft", "fk", "fq", "fqa", "fl", "fw", "fp", "fv", "fdc"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  fe: {
    category: x.Footnotes,
    type: E.Note,
    description: "An Endnote text item",
    hasEndMarker: !0,
    children: {
      Footnotes: ["fr", "ft", "fk", "fq", "fqa", "fl", "fw", "fp", "fv", "fdc"],
      CrossReferences: ["xt"],
      SpecialText: [
        "qt",
        "nd",
        "tl",
        "dc",
        "bk",
        "sig",
        "pn",
        "png",
        "addpn",
        "wj",
        "k",
        "sls",
        "ord",
        "add"
      ],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  fr: {
    category: x.Footnotes,
    type: E.Character,
    description: "The origin reference for the footnote (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  ft: {
    category: x.Footnotes,
    type: E.Character,
    description: "Footnote text, Protocanon (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  fk: {
    category: x.Footnotes,
    type: E.Character,
    description: "A footnote keyword (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  fq: {
    category: x.Footnotes,
    type: E.Character,
    description: "A footnote scripture quote or alternate rendering (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  fqa: {
    category: x.Footnotes,
    type: E.Character,
    description: "A footnote alternate rendering for a portion of scripture text",
    hasEndMarker: !0,
    children: void 0
  },
  fl: {
    category: x.Footnotes,
    type: E.Character,
    description: "A footnote label text item, for marking or 'labelling' the type or alternate translation being provided in the note.",
    hasEndMarker: !0,
    children: void 0
  },
  fw: {
    category: x.Footnotes,
    type: E.Character,
    description: "A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.",
    hasEndMarker: !0,
    children: void 0
  },
  fp: {
    category: x.Footnotes,
    type: E.Character,
    description: "A Footnote additional paragraph marker",
    hasEndMarker: !0,
    children: void 0
  },
  fv: {
    category: x.Footnotes,
    type: E.Character,
    description: "A verse number within the footnote text",
    hasEndMarker: !0,
    children: void 0
  },
  fdc: {
    category: x.Footnotes,
    type: E.Character,
    description: "Footnote text, applies to Deuterocanon only",
    hasEndMarker: !0,
    children: void 0
  },
  fm: {
    category: x.Footnotes,
    type: E.Character,
    description: "An additional footnote marker location for a previous footnote",
    hasEndMarker: !0,
    children: void 0
  },
  x: {
    category: x.CrossReferences,
    type: E.Note,
    description: "A list of cross references (basic)",
    hasEndMarker: !0,
    children: {
      CrossReferences: ["xo", "xop", "xt", "xta", "xk", "xq", "xot", "xnt", "xdc"],
      CharacterStyling: ["it", "bd", "bdit", "em", "sc", "sup"]
    }
  },
  xo: {
    category: x.CrossReferences,
    type: E.Character,
    description: "The cross reference origin reference (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  xop: {
    category: x.CrossReferences,
    type: E.Character,
    description: "Published cross reference origin reference (origin reference that should appear in the published text)",
    hasEndMarker: !0,
    children: void 0
  },
  xt: {
    category: x.CrossReferences,
    type: E.Character,
    description: "The cross reference target reference(s), protocanon only (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  xta: {
    category: x.CrossReferences,
    type: E.Character,
    description: "Cross reference target references added text",
    hasEndMarker: !0,
    children: void 0
  },
  xk: {
    category: x.CrossReferences,
    type: E.Character,
    description: "A cross reference keyword",
    hasEndMarker: !0,
    children: void 0
  },
  xq: {
    category: x.CrossReferences,
    type: E.Character,
    description: "A cross-reference quotation from the scripture text",
    hasEndMarker: !0,
    children: void 0
  },
  xot: {
    category: x.CrossReferences,
    type: E.Character,
    description: "Cross-reference target reference(s), Old Testament only",
    hasEndMarker: !0,
    children: void 0
  },
  xnt: {
    category: x.CrossReferences,
    type: E.Character,
    description: "Cross-reference target reference(s), New Testament only",
    hasEndMarker: !0,
    children: void 0
  },
  xdc: {
    category: x.CrossReferences,
    type: E.Character,
    description: "Cross-reference target reference(s), Deuterocanon only",
    hasEndMarker: !0,
    children: void 0
  },
  rq: {
    category: x.CrossReferences,
    type: E.Character,
    description: "A cross-reference indicating the source text for the preceding quotation.",
    hasEndMarker: !0,
    children: void 0
  },
  qt: {
    category: x.SpecialText,
    type: E.Character,
    description: "For Old Testament quoted text appearing in the New Testament (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  nd: {
    category: x.SpecialText,
    type: E.Character,
    description: "For name of deity (basic)",
    hasEndMarker: !0,
    children: void 0
  },
  tl: {
    category: x.SpecialText,
    type: E.Character,
    description: "For transliterated words",
    hasEndMarker: !0,
    children: void 0
  },
  dc: {
    category: x.SpecialText,
    type: E.Character,
    description: "Deuterocanonical/LXX additions or insertions in the Protocanonical text",
    hasEndMarker: !0,
    children: void 0
  },
  bk: {
    category: x.SpecialText,
    type: E.Character,
    description: "For the quoted name of a book",
    hasEndMarker: !0,
    children: void 0
  },
  sig: {
    category: x.SpecialText,
    type: E.Character,
    description: "For the signature of the author of an Epistle",
    hasEndMarker: !0,
    children: void 0
  },
  pn: {
    category: x.SpecialText,
    type: E.Character,
    description: "For a proper name",
    hasEndMarker: !0,
    children: void 0
  },
  png: {
    category: x.SpecialText,
    type: E.Character,
    description: "For a geographic proper name",
    hasEndMarker: !0,
    children: void 0
  },
  addpn: {
    category: x.SpecialText,
    type: E.Character,
    description: "For chinese words to be dot underline & underline",
    hasEndMarker: !0,
    children: void 0
  },
  wj: {
    category: x.SpecialText,
    type: E.Character,
    description: "For marking the words of Jesus",
    hasEndMarker: !0,
    children: void 0
  },
  k: {
    category: x.SpecialText,
    type: E.Character,
    description: "For a keyword",
    hasEndMarker: !0,
    children: void 0
  },
  sls: {
    category: x.SpecialText,
    type: E.Character,
    description: "To represent where the original text is in a secondary language or from an alternate text source",
    hasEndMarker: !0,
    children: void 0
  },
  ord: {
    category: x.SpecialText,
    type: E.Character,
    description: "For the text portion of an ordinal number",
    hasEndMarker: !0,
    children: void 0
  },
  add: {
    category: x.SpecialText,
    type: E.Character,
    description: "For a translational addition to the text",
    hasEndMarker: !0,
    children: void 0
  },
  lit: {
    category: x.SpecialText,
    type: E.Paragraph,
    description: "For a comment or note inserted for liturgical use",
    hasEndMarker: !1,
    children: void 0
  },
  no: {
    category: x.CharacterStyling,
    type: E.Character,
    description: "A character style, use normal text",
    hasEndMarker: !0,
    children: void 0
  },
  it: {
    category: x.CharacterStyling,
    type: E.Character,
    description: "A character style, use italic text",
    hasEndMarker: !0,
    children: void 0
  },
  bd: {
    category: x.CharacterStyling,
    type: E.Character,
    description: "A character style, use bold text",
    hasEndMarker: !0,
    children: void 0
  },
  bdit: {
    category: x.CharacterStyling,
    type: E.Character,
    description: "A character style, use bold + italic text",
    hasEndMarker: !0,
    children: void 0
  },
  em: {
    category: x.CharacterStyling,
    type: E.Character,
    description: "A character style, use emphasized text style",
    hasEndMarker: !0,
    children: void 0
  },
  sc: {
    category: x.CharacterStyling,
    type: E.Character,
    description: "A character style, for small capitalization text",
    hasEndMarker: !0,
    children: void 0
  },
  sup: {
    category: x.CharacterStyling,
    type: E.Character,
    description: "A character style, for superscript text. Typically for use in critical edition footnotes.",
    hasEndMarker: !0,
    children: void 0
  },
  pb: {
    category: x.Breaks,
    type: E.Paragraph,
    description: "Page Break used for new reader portions and children's bibles where content is controlled by the page",
    hasEndMarker: !1,
    children: void 0
  }
}, xr = {
  DivisionMarks: { add: ["v", "c"], remove: [] },
  Paragraphs: { add: ["p"], remove: [] },
  Poetry: { add: ["q", "q1", "q2", "q3", "q4", "b"], remove: [] },
  TitlesHeadings: {
    add: [
      "mte",
      "ms",
      "ms1",
      "ms2",
      "ms3",
      "s",
      "s1",
      "s2",
      "s3",
      "s4",
      "r",
      "sp",
      "d",
      "sd",
      "sd1",
      "sd2",
      "sd3",
      "sd4"
    ],
    remove: []
  }
}, mb = {
  p: { children: xr },
  q: { children: xr },
  q1: { children: xr },
  q2: { children: xr },
  q3: { children: xr },
  q4: { children: xr },
  b: { children: xr },
  qm: {
    children: {
      Paragraphs: { add: ["p"], remove: [] }
    }
  },
  c: {
    type: E.Paragraph,
    children: null
  },
  v: {
    children: null
  }
};
function dd(t) {
  const e = gb[t], r = mb[t];
  if (!e)
    return;
  if (!r)
    return e;
  let n = e.children ? { ...e.children } : void 0;
  if (r.children === null && (n = void 0), r.children) {
    n = n || {};
    for (const [i, s] of Object.entries(r.children)) {
      const o = i;
      if (s === null)
        delete n[o];
      else {
        let a = n[o] || [];
        s.remove && (a = a.filter((u) => !s.remove.includes(u))), s.add && (a = [.../* @__PURE__ */ new Set([...a, ...s.add])]), a.length > 0 ? n[o] = a : delete n[o];
      }
    }
    Object.keys(n).length === 0 && (n = void 0);
  }
  return {
    ...e,
    ...r,
    children: n
  };
}
function yb({
  scriptureReference: t,
  contextMarker: e,
  getMarkerAction: r,
  autoNumbering: n
}) {
  return { markersMenuItems: Be(() => {
    if (!e || !t) return;
    const s = dd(e);
    if (s != null && s.children)
      return Object.values(s.children).flatMap(
        (o) => o.map((a) => {
          const u = dd(a), { action: l } = r(a, u);
          return {
            name: a,
            label: a,
            description: (u == null ? void 0 : u.description) ?? "",
            action: ({
              editor: c,
              newVerseRChapterNum: d,
              noteText: f
            }) => {
              l({
                editor: c,
                reference: t,
                autoNumbering: n,
                newVerseRChapterNum: d,
                noteText: f
              });
            }
          };
        })
      );
  }, [n, e, r, t]) };
}
const _b = Ji((t, e) => {
  const { coords: r, children: n, style: i, ...s } = t, o = r !== void 0;
  return /* @__PURE__ */ w.jsx(
    "div",
    {
      ref: e,
      className: "floating-box",
      "aria-hidden": !o,
      style: {
        ...i,
        position: "absolute",
        zIndex: 1e3,
        top: r == null ? void 0 : r.y,
        left: r == null ? void 0 : r.x,
        visibility: o ? "visible" : "hidden",
        opacity: o ? 1 : 0
      },
      ...s,
      children: n
    }
  );
}), ao = Math.min, Mr = Math.max, uo = Math.round, Ns = Math.floor, It = (t) => ({
  x: t,
  y: t
}), vb = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, bb = {
  start: "end",
  end: "start"
};
function fd(t, e, r) {
  return Mr(t, ao(e, r));
}
function nl(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function qn(t) {
  return t.split("-")[0];
}
function il(t) {
  return t.split("-")[1];
}
function Hp(t) {
  return t === "x" ? "y" : "x";
}
function zp(t) {
  return t === "y" ? "height" : "width";
}
function zi(t) {
  return ["top", "bottom"].includes(qn(t)) ? "y" : "x";
}
function Kp(t) {
  return Hp(zi(t));
}
function Eb(t, e, r) {
  r === void 0 && (r = !1);
  const n = il(t), i = Kp(t), s = zp(i);
  let o = i === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (o = lo(o)), [o, lo(o)];
}
function xb(t) {
  const e = lo(t);
  return [Za(t), e, Za(e)];
}
function Za(t) {
  return t.replace(/start|end/g, (e) => bb[e]);
}
function Cb(t, e, r) {
  const n = ["left", "right"], i = ["right", "left"], s = ["top", "bottom"], o = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return r ? e ? i : n : e ? n : i;
    case "left":
    case "right":
      return e ? s : o;
    default:
      return [];
  }
}
function Tb(t, e, r, n) {
  const i = il(t);
  let s = Cb(qn(t), r === "start", n);
  return i && (s = s.map((o) => o + "-" + i), e && (s = s.concat(s.map(Za)))), s;
}
function lo(t) {
  return t.replace(/left|right|bottom|top/g, (e) => vb[e]);
}
function kb(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Ab(t) {
  return typeof t != "number" ? kb(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function co(t) {
  const {
    x: e,
    y: r,
    width: n,
    height: i
  } = t;
  return {
    width: n,
    height: i,
    top: r,
    left: e,
    right: e + n,
    bottom: r + i,
    x: e,
    y: r
  };
}
function hd(t, e, r) {
  let {
    reference: n,
    floating: i
  } = t;
  const s = zi(e), o = Kp(e), a = zp(o), u = qn(e), l = s === "y", c = n.x + n.width / 2 - i.width / 2, d = n.y + n.height / 2 - i.height / 2, f = n[a] / 2 - i[a] / 2;
  let g;
  switch (u) {
    case "top":
      g = {
        x: c,
        y: n.y - i.height
      };
      break;
    case "bottom":
      g = {
        x: c,
        y: n.y + n.height
      };
      break;
    case "right":
      g = {
        x: n.x + n.width,
        y: d
      };
      break;
    case "left":
      g = {
        x: n.x - i.width,
        y: d
      };
      break;
    default:
      g = {
        x: n.x,
        y: n.y
      };
  }
  switch (il(e)) {
    case "start":
      g[o] -= f * (r && l ? -1 : 1);
      break;
    case "end":
      g[o] += f * (r && l ? -1 : 1);
      break;
  }
  return g;
}
const wb = async (t, e, r) => {
  const {
    placement: n = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: o
  } = r, a = s.filter(Boolean), u = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let l = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: c,
    y: d
  } = hd(l, n, u), f = n, g = {}, h = 0;
  for (let p = 0; p < a.length; p++) {
    const {
      name: m,
      fn: _
    } = a[p], {
      x: y,
      y: v,
      data: C,
      reset: T
    } = await _({
      x: c,
      y: d,
      initialPlacement: n,
      placement: f,
      strategy: i,
      middlewareData: g,
      rects: l,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    c = y ?? c, d = v ?? d, g = {
      ...g,
      [m]: {
        ...g[m],
        ...C
      }
    }, T && h <= 50 && (h++, typeof T == "object" && (T.placement && (f = T.placement), T.rects && (l = T.rects === !0 ? await o.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : T.rects), {
      x: c,
      y: d
    } = hd(l, f, u)), p = -1);
  }
  return {
    x: c,
    y: d,
    placement: f,
    strategy: i,
    middlewareData: g
  };
};
async function Jp(t, e) {
  var r;
  e === void 0 && (e = {});
  const {
    x: n,
    y: i,
    platform: s,
    rects: o,
    elements: a,
    strategy: u
  } = t, {
    boundary: l = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: g = 0
  } = nl(e, t), h = Ab(g), m = a[f ? d === "floating" ? "reference" : "floating" : d], _ = co(await s.getClippingRect({
    element: (r = await (s.isElement == null ? void 0 : s.isElement(m))) == null || r ? m : m.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: c,
    strategy: u
  })), y = d === "floating" ? {
    x: n,
    y: i,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, v = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), C = await (s.isElement == null ? void 0 : s.isElement(v)) ? await (s.getScale == null ? void 0 : s.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, T = co(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: y,
    offsetParent: v,
    strategy: u
  }) : y);
  return {
    top: (_.top - T.top + h.top) / C.y,
    bottom: (T.bottom - _.bottom + h.bottom) / C.y,
    left: (_.left - T.left + h.left) / C.x,
    right: (T.right - _.right + h.right) / C.x
  };
}
const Db = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var r, n;
      const {
        placement: i,
        middlewareData: s,
        rects: o,
        initialPlacement: a,
        platform: u,
        elements: l
      } = e, {
        mainAxis: c = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: p = !0,
        ...m
      } = nl(t, e);
      if ((r = s.arrow) != null && r.alignmentOffset)
        return {};
      const _ = qn(i), y = zi(a), v = qn(a) === a, C = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)), T = f || (v || !p ? [lo(a)] : xb(a)), k = h !== "none";
      !f && k && T.push(...Tb(a, p, h, C));
      const N = [a, ...T], A = await Jp(e, m), D = [];
      let L = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (c && D.push(A[_]), d) {
        const P = Eb(i, o, C);
        D.push(A[P[0]], A[P[1]]);
      }
      if (L = [...L, {
        placement: i,
        overflows: D
      }], !D.every((P) => P <= 0)) {
        var W, U;
        const P = (((W = s.flip) == null ? void 0 : W.index) || 0) + 1, Y = N[P];
        if (Y)
          return {
            data: {
              index: P,
              overflows: L
            },
            reset: {
              placement: Y
            }
          };
        let Z = (U = L.filter((de) => de.overflows[0] <= 0).sort((de, ae) => de.overflows[1] - ae.overflows[1])[0]) == null ? void 0 : U.placement;
        if (!Z)
          switch (g) {
            case "bestFit": {
              var M;
              const de = (M = L.filter((ae) => {
                if (k) {
                  const V = zi(ae.placement);
                  return V === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  V === "y";
                }
                return !0;
              }).map((ae) => [ae.placement, ae.overflows.filter((V) => V > 0).reduce((V, he) => V + he, 0)]).sort((ae, V) => ae[1] - V[1])[0]) == null ? void 0 : M[0];
              de && (Z = de);
              break;
            }
            case "initialPlacement":
              Z = a;
              break;
          }
        if (i !== Z)
          return {
            reset: {
              placement: Z
            }
          };
      }
      return {};
    }
  };
}, Sb = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: r,
        y: n,
        placement: i
      } = e, {
        mainAxis: s = !0,
        crossAxis: o = !1,
        limiter: a = {
          fn: (m) => {
            let {
              x: _,
              y
            } = m;
            return {
              x: _,
              y
            };
          }
        },
        ...u
      } = nl(t, e), l = {
        x: r,
        y: n
      }, c = await Jp(e, u), d = zi(qn(i)), f = Hp(d);
      let g = l[f], h = l[d];
      if (s) {
        const m = f === "y" ? "top" : "left", _ = f === "y" ? "bottom" : "right", y = g + c[m], v = g - c[_];
        g = fd(y, g, v);
      }
      if (o) {
        const m = d === "y" ? "top" : "left", _ = d === "y" ? "bottom" : "right", y = h + c[m], v = h - c[_];
        h = fd(y, h, v);
      }
      const p = a.fn({
        ...e,
        [f]: g,
        [d]: h
      });
      return {
        ...p,
        data: {
          x: p.x - r,
          y: p.y - n
        }
      };
    }
  };
};
function jo() {
  return typeof window < "u";
}
function Qn(t) {
  return Gp(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Ze(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Bt(t) {
  var e;
  return (e = (Gp(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Gp(t) {
  return jo() ? t instanceof Node || t instanceof Ze(t).Node : !1;
}
function vt(t) {
  return jo() ? t instanceof Element || t instanceof Ze(t).Element : !1;
}
function qt(t) {
  return jo() ? t instanceof HTMLElement || t instanceof Ze(t).HTMLElement : !1;
}
function pd(t) {
  return !jo() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Ze(t).ShadowRoot;
}
function fs(t) {
  const {
    overflow: e,
    overflowX: r,
    overflowY: n,
    display: i
  } = bt(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + n + r) && !["inline", "contents"].includes(i);
}
function Nb(t) {
  return ["table", "td", "th"].includes(Qn(t));
}
function $o(t) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function sl(t) {
  const e = ol(), r = vt(t) ? bt(t) : t;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((n) => r[n] ? r[n] !== "none" : !1) || (r.containerType ? r.containerType !== "normal" : !1) || !e && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !e && (r.filter ? r.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((n) => (r.willChange || "").includes(n)) || ["paint", "layout", "strict", "content"].some((n) => (r.contain || "").includes(n));
}
function Mb(t) {
  let e = fr(t);
  for (; qt(e) && !Bn(e); ) {
    if (sl(e))
      return e;
    if ($o(e))
      return null;
    e = fr(e);
  }
  return null;
}
function ol() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Bn(t) {
  return ["html", "body", "#document"].includes(Qn(t));
}
function bt(t) {
  return Ze(t).getComputedStyle(t);
}
function Uo(t) {
  return vt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function fr(t) {
  if (Qn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    pd(t) && t.host || // Fallback.
    Bt(t)
  );
  return pd(e) ? e.host : e;
}
function Yp(t) {
  const e = fr(t);
  return Bn(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : qt(e) && fs(e) ? e : Yp(e);
}
function Ki(t, e, r) {
  var n;
  e === void 0 && (e = []), r === void 0 && (r = !0);
  const i = Yp(t), s = i === ((n = t.ownerDocument) == null ? void 0 : n.body), o = Ze(i);
  if (s) {
    const a = eu(o);
    return e.concat(o, o.visualViewport || [], fs(i) ? i : [], a && r ? Ki(a) : []);
  }
  return e.concat(i, Ki(i, [], r));
}
function eu(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Xp(t) {
  const e = bt(t);
  let r = parseFloat(e.width) || 0, n = parseFloat(e.height) || 0;
  const i = qt(t), s = i ? t.offsetWidth : r, o = i ? t.offsetHeight : n, a = uo(r) !== s || uo(n) !== o;
  return a && (r = s, n = o), {
    width: r,
    height: n,
    $: a
  };
}
function al(t) {
  return vt(t) ? t : t.contextElement;
}
function Tn(t) {
  const e = al(t);
  if (!qt(e))
    return It(1);
  const r = e.getBoundingClientRect(), {
    width: n,
    height: i,
    $: s
  } = Xp(e);
  let o = (s ? uo(r.width) : r.width) / n, a = (s ? uo(r.height) : r.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: o,
    y: a
  };
}
const Ob = /* @__PURE__ */ It(0);
function Qp(t) {
  const e = Ze(t);
  return !ol() || !e.visualViewport ? Ob : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Ib(t, e, r) {
  return e === void 0 && (e = !1), !r || e && r !== Ze(t) ? !1 : e;
}
function Ur(t, e, r, n) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  const i = t.getBoundingClientRect(), s = al(t);
  let o = It(1);
  e && (n ? vt(n) && (o = Tn(n)) : o = Tn(t));
  const a = Ib(s, r, n) ? Qp(s) : It(0);
  let u = (i.left + a.x) / o.x, l = (i.top + a.y) / o.y, c = i.width / o.x, d = i.height / o.y;
  if (s) {
    const f = Ze(s), g = n && vt(n) ? Ze(n) : n;
    let h = f, p = eu(h);
    for (; p && n && g !== h; ) {
      const m = Tn(p), _ = p.getBoundingClientRect(), y = bt(p), v = _.left + (p.clientLeft + parseFloat(y.paddingLeft)) * m.x, C = _.top + (p.clientTop + parseFloat(y.paddingTop)) * m.y;
      u *= m.x, l *= m.y, c *= m.x, d *= m.y, u += v, l += C, h = Ze(p), p = eu(h);
    }
  }
  return co({
    width: c,
    height: d,
    x: u,
    y: l
  });
}
function ul(t, e) {
  const r = Uo(t).scrollLeft;
  return e ? e.left + r : Ur(Bt(t)).left + r;
}
function Zp(t, e, r) {
  r === void 0 && (r = !1);
  const n = t.getBoundingClientRect(), i = n.left + e.scrollLeft - (r ? 0 : (
    // RTL <body> scrollbar.
    ul(t, n)
  )), s = n.top + e.scrollTop;
  return {
    x: i,
    y: s
  };
}
function Rb(t) {
  let {
    elements: e,
    rect: r,
    offsetParent: n,
    strategy: i
  } = t;
  const s = i === "fixed", o = Bt(n), a = e ? $o(e.floating) : !1;
  if (n === o || a && s)
    return r;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = It(1);
  const c = It(0), d = qt(n);
  if ((d || !d && !s) && ((Qn(n) !== "body" || fs(o)) && (u = Uo(n)), qt(n))) {
    const g = Ur(n);
    l = Tn(n), c.x = g.x + n.clientLeft, c.y = g.y + n.clientTop;
  }
  const f = o && !d && !s ? Zp(o, u, !0) : It(0);
  return {
    width: r.width * l.x,
    height: r.height * l.y,
    x: r.x * l.x - u.scrollLeft * l.x + c.x + f.x,
    y: r.y * l.y - u.scrollTop * l.y + c.y + f.y
  };
}
function Pb(t) {
  return Array.from(t.getClientRects());
}
function Lb(t) {
  const e = Bt(t), r = Uo(t), n = t.ownerDocument.body, i = Mr(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), s = Mr(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let o = -r.scrollLeft + ul(t);
  const a = -r.scrollTop;
  return bt(n).direction === "rtl" && (o += Mr(e.clientWidth, n.clientWidth) - i), {
    width: i,
    height: s,
    x: o,
    y: a
  };
}
function Fb(t, e) {
  const r = Ze(t), n = Bt(t), i = r.visualViewport;
  let s = n.clientWidth, o = n.clientHeight, a = 0, u = 0;
  if (i) {
    s = i.width, o = i.height;
    const l = ol();
    (!l || l && e === "fixed") && (a = i.offsetLeft, u = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: a,
    y: u
  };
}
function qb(t, e) {
  const r = Ur(t, !0, e === "fixed"), n = r.top + t.clientTop, i = r.left + t.clientLeft, s = qt(t) ? Tn(t) : It(1), o = t.clientWidth * s.x, a = t.clientHeight * s.y, u = i * s.x, l = n * s.y;
  return {
    width: o,
    height: a,
    x: u,
    y: l
  };
}
function gd(t, e, r) {
  let n;
  if (e === "viewport")
    n = Fb(t, r);
  else if (e === "document")
    n = Lb(Bt(t));
  else if (vt(e))
    n = qb(e, r);
  else {
    const i = Qp(t);
    n = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return co(n);
}
function eg(t, e) {
  const r = fr(t);
  return r === e || !vt(r) || Bn(r) ? !1 : bt(r).position === "fixed" || eg(r, e);
}
function Bb(t, e) {
  const r = e.get(t);
  if (r)
    return r;
  let n = Ki(t, [], !1).filter((a) => vt(a) && Qn(a) !== "body"), i = null;
  const s = bt(t).position === "fixed";
  let o = s ? fr(t) : t;
  for (; vt(o) && !Bn(o); ) {
    const a = bt(o), u = sl(o);
    !u && a.position === "fixed" && (i = null), (s ? !u && !i : !u && a.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || fs(o) && !u && eg(t, o)) ? n = n.filter((c) => c !== o) : i = a, o = fr(o);
  }
  return e.set(t, n), n;
}
function jb(t) {
  let {
    element: e,
    boundary: r,
    rootBoundary: n,
    strategy: i
  } = t;
  const o = [...r === "clippingAncestors" ? $o(e) ? [] : Bb(e, this._c) : [].concat(r), n], a = o[0], u = o.reduce((l, c) => {
    const d = gd(e, c, i);
    return l.top = Mr(d.top, l.top), l.right = ao(d.right, l.right), l.bottom = ao(d.bottom, l.bottom), l.left = Mr(d.left, l.left), l;
  }, gd(e, a, i));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function $b(t) {
  const {
    width: e,
    height: r
  } = Xp(t);
  return {
    width: e,
    height: r
  };
}
function Ub(t, e, r) {
  const n = qt(e), i = Bt(e), s = r === "fixed", o = Ur(t, !0, s, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = It(0);
  if (n || !n && !s)
    if ((Qn(e) !== "body" || fs(i)) && (a = Uo(e)), n) {
      const f = Ur(e, !0, s, e);
      u.x = f.x + e.clientLeft, u.y = f.y + e.clientTop;
    } else i && (u.x = ul(i));
  const l = i && !n && !s ? Zp(i, a) : It(0), c = o.left + a.scrollLeft - u.x - l.x, d = o.top + a.scrollTop - u.y - l.y;
  return {
    x: c,
    y: d,
    width: o.width,
    height: o.height
  };
}
function pa(t) {
  return bt(t).position === "static";
}
function md(t, e) {
  if (!qt(t) || bt(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let r = t.offsetParent;
  return Bt(t) === r && (r = r.ownerDocument.body), r;
}
function tg(t, e) {
  const r = Ze(t);
  if ($o(t))
    return r;
  if (!qt(t)) {
    let i = fr(t);
    for (; i && !Bn(i); ) {
      if (vt(i) && !pa(i))
        return i;
      i = fr(i);
    }
    return r;
  }
  let n = md(t, e);
  for (; n && Nb(n) && pa(n); )
    n = md(n, e);
  return n && Bn(n) && pa(n) && !sl(n) ? r : n || Mb(t) || r;
}
const Vb = async function(t) {
  const e = this.getOffsetParent || tg, r = this.getDimensions, n = await r(t.floating);
  return {
    reference: Ub(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: n.width,
      height: n.height
    }
  };
};
function Wb(t) {
  return bt(t).direction === "rtl";
}
const Hb = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Rb,
  getDocumentElement: Bt,
  getClippingRect: jb,
  getOffsetParent: tg,
  getElementRects: Vb,
  getClientRects: Pb,
  getDimensions: $b,
  getScale: Tn,
  isElement: vt,
  isRTL: Wb
};
function rg(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function zb(t, e) {
  let r = null, n;
  const i = Bt(t);
  function s() {
    var a;
    clearTimeout(n), (a = r) == null || a.disconnect(), r = null;
  }
  function o(a, u) {
    a === void 0 && (a = !1), u === void 0 && (u = 1), s();
    const l = t.getBoundingClientRect(), {
      left: c,
      top: d,
      width: f,
      height: g
    } = l;
    if (a || e(), !f || !g)
      return;
    const h = Ns(d), p = Ns(i.clientWidth - (c + f)), m = Ns(i.clientHeight - (d + g)), _ = Ns(c), v = {
      rootMargin: -h + "px " + -p + "px " + -m + "px " + -_ + "px",
      threshold: Mr(0, ao(1, u)) || 1
    };
    let C = !0;
    function T(k) {
      const N = k[0].intersectionRatio;
      if (N !== u) {
        if (!C)
          return o();
        N ? o(!1, N) : n = setTimeout(() => {
          o(!1, 1e-7);
        }, 1e3);
      }
      N === 1 && !rg(l, t.getBoundingClientRect()) && o(), C = !1;
    }
    try {
      r = new IntersectionObserver(T, {
        ...v,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(T, v);
    }
    r.observe(t);
  }
  return o(!0), s;
}
function Kb(t, e, r, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: s = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = n, l = al(t), c = i || s ? [...l ? Ki(l) : [], ...Ki(e)] : [];
  c.forEach((_) => {
    i && _.addEventListener("scroll", r, {
      passive: !0
    }), s && _.addEventListener("resize", r);
  });
  const d = l && a ? zb(l, r) : null;
  let f = -1, g = null;
  o && (g = new ResizeObserver((_) => {
    let [y] = _;
    y && y.target === l && g && (g.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var v;
      (v = g) == null || v.observe(e);
    })), r();
  }), l && !u && g.observe(l), g.observe(e));
  let h, p = u ? Ur(t) : null;
  u && m();
  function m() {
    const _ = Ur(t);
    p && !rg(p, _) && r(), p = _, h = requestAnimationFrame(m);
  }
  return r(), () => {
    var _;
    c.forEach((y) => {
      i && y.removeEventListener("scroll", r), s && y.removeEventListener("resize", r);
    }), d == null || d(), (_ = g) == null || _.disconnect(), g = null, u && cancelAnimationFrame(h);
  };
}
const Jb = Sb, Gb = Db, Yb = (t, e, r) => {
  const n = /* @__PURE__ */ new Map(), i = {
    platform: Hb,
    ...r
  }, s = {
    ...i.platform,
    _c: n
  };
  return wb(t, e, {
    ...i,
    platform: s
  });
};
function Xb() {
  const [t, e] = se(void 0), [r, n] = se(), i = Le(null), s = me((a, u) => {
    i.current && i.current();
    const l = a.commonAncestorContainer.nodeType === a.commonAncestorContainer.TEXT_NODE ? a : a.commonAncestorContainer;
    i.current = Kb(l, u, () => {
      Yb(l, u, {
        placement: "bottom-start",
        middleware: [Jb(), Gb()]
      }).then((c) => {
        n(c.placement), e(
          (d) => (d == null ? void 0 : d.x) === c.x && (d == null ? void 0 : d.y) === c.y ? d : { x: c.x, y: c.y }
        );
      }).catch(() => {
        e(void 0);
      });
    });
  }, []), o = me(() => {
    i.current && (e(void 0), i.current(), i.current = null);
  }, []);
  return J(() => o, [o]), { coords: t, placement: r, updatePosition: s, cleanup: o };
}
function Qb({
  isOpen: t,
  floatingBoxRef: e
}) {
  const { coords: r, updatePosition: n, cleanup: i, placement: s } = Xb();
  return J(() => {
    var a;
    if (!t || !e.current) {
      i();
      return;
    }
    const o = (a = window.getSelection()) == null ? void 0 : a.getRangeAt(0);
    if (o)
      return n(o, e.current), i;
  }, [i, t, e, n]), { coords: r, placement: s };
}
const Zb = document.body, eE = Lg(_b);
function yd({ isOpen: t = !1, children: e }) {
  const r = Le(null), { coords: n, placement: i } = Qb({ isOpen: t, floatingBoxRef: r }), s = Be(
    () => n ? typeof e == "function" ? e : () => e : () => null,
    [e, n]
  );
  return nu(
    /* @__PURE__ */ w.jsx(
      eE,
      {
        ref: r,
        coords: n,
        style: n ? void 0 : { display: "none" },
        children: s({ isOpen: t, placement: i })
      }
    ),
    Zb
  );
}
const ng = Od(void 0);
function ll() {
  const t = Id(ng);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuProvider");
  return t;
}
function tE(t, e) {
  const [r, n] = se(0), [i, s] = se(-1), o = Be(() => t ?? [], [t]), a = {
    menuItems: o,
    activeIndex: r,
    selectedIndex: i,
    onSelectOption: e ?? (() => {
    })
  }, u = me(() => {
    n((d) => {
      const f = o.length;
      return f ? (d - 1 + f) % f : 0;
    });
  }, [o.length]), l = me(() => {
    n((d) => {
      const f = o.length;
      return f ? (d + 1) % f : 0;
    });
  }, [o.length]), c = me(() => {
    const d = o.length;
    if (r >= 0 && r < d) {
      const f = o[r];
      e == null || e(f), s(r);
    }
  }, [r, o, e]);
  return {
    state: a,
    moveUp: u,
    moveDown: l,
    select: c,
    setActiveIndex: n,
    setSelectedIndex: s
  };
}
function rE({ children: t, menuItems: e, onSelectOption: r, ...n }) {
  const i = tE(e, r);
  return /* @__PURE__ */ w.jsx(ng.Provider, { value: i, children: /* @__PURE__ */ w.jsx("div", { ...n, children: t }) });
}
const ig = Ji(
  ({ index: t, children: e, onMouseEnter: r, onClick: n, ...i }, s) => {
    const {
      state: { activeIndex: o },
      setActiveIndex: a,
      setSelectedIndex: u,
      select: l
    } = ll(), c = me(
      (f) => {
        l(), u(-1), n == null || n(f);
      },
      [n, l, u]
    ), d = me(
      (f) => {
        a(t), r == null || r(f);
      },
      [t, a, r]
    );
    return /* @__PURE__ */ w.jsx(
      "button",
      {
        ref: s,
        role: "menuitem",
        ...i,
        onClick: c,
        onMouseEnter: d,
        "aria-selected": t !== void 0 && o === t,
        tabIndex: -1,
        children: e
      }
    );
  }
);
function nE({ children: t, autoIndex: e = !0, ...r }) {
  const n = Le(null), {
    state: { activeIndex: i, menuItems: s }
  } = ll(), o = Be(
    () => s ? typeof t == "function" ? t : () => t : () => null,
    [t, s]
  ), a = Be(() => {
    const u = o(s);
    return e ? Fg.map(u, (l, c) => qg(l) && l.type === ig && l.props.index === void 0 ? Bg(l, { index: c }) : l) : u;
  }, [o, e, s]);
  return J(() => {
    if (n.current) {
      const u = n.current, l = u.children[i];
      if (l) {
        const c = u.getBoundingClientRect(), d = l.getBoundingClientRect();
        d.bottom > c.bottom ? u.scrollTop += d.bottom - c.bottom : d.top < c.top && (u.scrollTop -= c.top - d.top);
      }
    }
  }, [i]), /* @__PURE__ */ w.jsx("div", { ref: n, role: "menu", ...r, children: a });
}
const ga = {
  Root: rE,
  Options: nE,
  Option: ig
}, iE = (t, e, r) => Bs(t, r).toLowerCase().includes(e.toLowerCase()), _d = (t) => Object.keys(t).find((e) => typeof t[e] == "string") || "", Bs = (t, e) => {
  const r = t[e];
  return typeof r == "string" ? r : String(r);
};
function sE({
  query: t,
  items: e,
  filterBy: r,
  filter: n,
  sortBy: i,
  sortingOptions: s
}) {
  const { caseSensitive: o = !1, priorityOrder: a = ["exact", "startsWith", "contains"] } = s || {}, u = o ? t : t.toLowerCase();
  let l, c;
  n ? (c = n, l = e.length > 0 ? _d(e[0]) : "") : (l = r || (e.length > 0 ? _d(e[0]) : ""), c = (g, h) => iE(g, h, l));
  const d = i || l, f = /* @__PURE__ */ new Map();
  return e.filter((g) => {
    try {
      return c(g, t);
    } catch (h) {
      return console.warn("Error filtering item:", g, h), !1;
    }
  }).sort((g, h) => {
    const p = (y) => (f.has(y) || f.set(y, Bs(y, d).toLowerCase()), f.get(y) ?? ""), m = o ? Bs(g, d) : p(g), _ = o ? Bs(h, d) : p(h);
    for (const y of a)
      switch (y) {
        case "exact":
          if (m === u && _ !== u) return -1;
          if (_ === u && m !== u) return 1;
          break;
        case "startsWith":
          if (m.startsWith(u) && !_.startsWith(u)) return -1;
          if (_.startsWith(u) && !m.startsWith(u)) return 1;
          break;
        case "contains": {
          const v = m.indexOf(u), C = _.indexOf(u);
          if (v !== -1 && C === -1) return -1;
          if (C !== -1 && v === -1) return 1;
          if (v !== -1 && C !== -1) return v - C;
          break;
        }
      }
    return m.localeCompare(_);
  });
}
function oE({
  query: t,
  items: e,
  filterBy: r,
  filter: n,
  sortBy: i,
  sortingOptions: s
}) {
  return Be(() => sE({
    query: t,
    items: e,
    filterBy: r,
    filter: n,
    sortBy: i,
    sortingOptions: s
  }), [t, e, r, n, i, s]);
}
function aE() {
  const { moveUp: t, moveDown: e, select: r } = ll();
  return Be(
    () => ({
      moveUp: t,
      moveDown: e,
      select: r
    }),
    [t, e, r]
  );
}
const uE = () => {
  const t = aE(), [e] = be();
  J(() => {
    const r = (n) => {
      const s = {
        ArrowDown: () => t == null ? void 0 : t.moveDown(),
        ArrowUp: () => t == null ? void 0 : t.moveUp(),
        Enter: () => t == null ? void 0 : t.select(),
        Tab: () => t == null ? void 0 : t.select()
      }[n.key];
      return s ? (s(), n.preventDefault(), n.stopPropagation(), !0) : !1;
    };
    return e.registerCommand(go, r, xu);
  }, [e, t]);
};
function lE() {
  return uE(), null;
}
function cE({
  options: t,
  onSelectOption: e,
  onClose: r,
  inverse: n,
  query: i
}) {
  const [s] = be(), o = i !== void 0, [a, u] = se(""), l = o ? i : a, c = oE({ query: l, items: t, filterBy: "name" }), d = (f) => {
    r == null || r(), e ? e(f) : f.action({ editor: s });
  };
  return J(() => s.registerCommand(
    go,
    (f) => {
      if (o) return !1;
      const h = {
        Escape: () => r == null ? void 0 : r(),
        Backspace: () => {
          l.length === 0 ? r == null || r() : u((p) => p.slice(0, -1));
        }
      }[f.key];
      return h ? (f.stopPropagation(), f.preventDefault(), h(), !0) : f.key.length === 1 ? (f.stopPropagation(), f.preventDefault(), u((p) => p + f.key), !0) : !1;
    },
    xu
  ), [s, o, l, r]), /* @__PURE__ */ w.jsxs(
    ga.Root,
    {
      className: `autocomplete-menu-container ${n ? "inverse" : ""}`,
      menuItems: c,
      onSelectOption: (f) => d(f),
      children: [
        !o && /* @__PURE__ */ w.jsx("input", { value: l, type: "text", disabled: !0 }),
        /* @__PURE__ */ w.jsx(lE, {}),
        /* @__PURE__ */ w.jsx(ga.Options, { className: "autocomplete-menu-options", autoIndex: !1, children: (f) => f.map((h, p) => /* @__PURE__ */ w.jsxs(ga.Option, { index: p, children: [
          /* @__PURE__ */ w.jsx("span", { className: "label", children: h.label ?? h.name }),
          /* @__PURE__ */ w.jsx("span", { className: "description", children: h.description })
        ] }, h.name)) })
      ]
    }
  );
}
function dE({
  trigger: t,
  items: e,
  autoNumbering: r = !0
}) {
  const [n] = be(), [i, s] = se(!1), [o, a] = se(""), [u, l] = se(null), [c, d] = se(!1), f = me(() => {
    if (u && o.trim()) {
      try {
        if (u.name === "c" || u.name === "v") {
          const p = parseInt(o);
          if (isNaN(p)) {
            console.error("Invalid number input");
            return;
          }
          u.action({ editor: n, newVerseRChapterNum: p });
        } else u.name === "f" || u.name === "x" ? u.action({ editor: n, noteText: o }) : u.action({ editor: n });
        console.log("Submitted: ", u.name, o);
      } catch (p) {
        console.error("Error processing input:", p);
      }
      d(!1), a(""), l(null), n.focus();
    }
  }, [n, u, o]), g = me(
    (p) => {
      p.key === "Escape" && (i || c) ? (s(!1), d(!1), a(""), n.focus()) : p.key === t && !i && !c ? (p.preventDefault(), s(!0)) : p.key === "Enter" && c && (p.preventDefault(), f());
    },
    [n, f, i, c, t]
  );
  J(() => n.registerRootListener((p) => {
    if (p)
      return p.addEventListener("keydown", g), () => {
        p.removeEventListener("keydown", g);
      };
  }), [n, g]), J(() => n.registerUpdateListener(({ prevEditorState: p, editorState: m }) => {
    const _ = p.read(() => {
      const y = B();
      if (R(y))
        return y;
    });
    m.read(() => {
      const y = B();
      !R(y) || _ != null && _.is(y) || (s(!1), d(!1));
    });
  }), [n]);
  const h = me(
    (p) => {
      const m = !r && (p.name === "c" || p.name === "v") || p.name === "f" || p.name === "x";
      console.log({ needsUserInput: m }, !r, p.name), m ? (l(p), d(!0), s(!1), setTimeout(() => {
        const _ = document.querySelector(".user-input-container input");
        _ && _.focus();
      }, 0)) : (p.action({ editor: n }), s(!1));
    },
    [r, n]
  );
  return /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
    e && i && /* @__PURE__ */ w.jsx(yd, { isOpen: i, children: ({ placement: p }) => /* @__PURE__ */ w.jsx(
      cE,
      {
        options: e,
        onSelectOption: h,
        onClose: () => s(!1),
        inverse: p === "top-start"
      }
    ) }),
    c && u && /* @__PURE__ */ w.jsx(yd, { isOpen: c, children: () => /* @__PURE__ */ w.jsxs("div", { className: "user-input-container", children: [
      /* @__PURE__ */ w.jsx("div", { className: "input-header", children: u.name === "c" ? "Enter chapter number:" : u.name === "v" ? "Enter verse number:" : u.name === "f" ? "Enter footnote text:" : u.name === "x" ? "Enter cross-reference:" : "Enter text:" }),
      /* @__PURE__ */ w.jsx(
        "input",
        {
          type: "text",
          value: o,
          onChange: (p) => a(p.target.value),
          autoFocus: !0,
          className: "mb-3 w-full rounded border border-gray-300 p-2",
          onKeyDown: (p) => {
            p.key === "Enter" && (p.preventDefault(), f());
          }
        }
      ),
      /* @__PURE__ */ w.jsxs("div", { className: "input-actions", children: [
        /* @__PURE__ */ w.jsx(
          "button",
          {
            className: "cancel-button",
            onClick: () => {
              d(!1), a(""), l(null), n.focus();
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ w.jsx("button", { className: "apply-button", onClick: f, children: "Insert" })
      ] })
    ] }) })
  ] });
}
function fE({
  trigger: t,
  scriptureReference: e,
  contextMarker: r,
  getMarkerAction: n,
  autoNumbering: i
}) {
  const { markersMenuItems: s } = yb({
    scriptureReference: e,
    contextMarker: r,
    getMarkerAction: n,
    autoNumbering: i
  });
  return /* @__PURE__ */ w.jsx(dE, { trigger: t, items: s, autoNumbering: i });
}
function hE({
  trigger: t,
  scrRef: e,
  getMarkerAction: r,
  autoNumbering: n = !0
}) {
  const { book: i, chapterNum: s, verseNum: o, verse: a } = e, u = Be(() => e, [i, s, o, a]), [l] = be(), [c] = pE(l);
  return mE(l, n), /* @__PURE__ */ w.jsx(
    fE,
    {
      trigger: t,
      scriptureReference: u,
      contextMarker: c,
      getMarkerAction: r,
      autoNumbering: n
    }
  );
}
function pE(t) {
  const [e, r] = se();
  return J(
    () => t.registerCommand(
      po,
      () => (t.read(() => {
        const n = B();
        if (!R(n)) {
          r(void 0);
          return;
        }
        const i = ge(n.anchor.key), s = ge(n.focus.key);
        if (!i || !s) {
          r(void 0);
          return;
        }
        const o = J_(i, s);
        if (!o || !kv(o)) {
          r(void 0);
          return;
        }
        r(o.getMarker());
      }), !1),
      vo
    ),
    [t]
  ), [e];
}
function gE(t) {
  return RegExp(/(\d+)([a-zA-Z]+)?(-(\d+)([a-zA-Z]+)?)?/).exec(t);
}
function vd(t) {
  const e = pe().getChildren(), r = gp(t), n = mp(e, r), i = pp(n, !!r), s = I2(r, i).filter(
    (c) => Bo(c.node) || Lo(c.node)
  ), o = t.getKey(), a = s.findIndex(({ node: c }) => c.getKey() === o), u = s.slice(a + 1);
  let l = parseInt(t.getNumber());
  u.forEach(({ node: c }) => {
    const d = c.getNumber(), f = parseInt(d);
    if (f > l) return;
    const g = Ya(f, void 0), h = gE(d), p = !!(h != null && h[3]), m = (h == null ? void 0 : h[2]) ?? "", _ = (h == null ? void 0 : h[5]) ?? "", y = p ? Ya(parseInt(h[4]), void 0) : "";
    let v = `${m}`;
    v += p ? `-${y}${_}` : "", c.setNumber(`${g}${v}`), l = parseInt(p ? y : g);
  });
}
function mE(t, e) {
  J(() => {
    if (!t.hasNodes([yt, _t]))
      throw new Error(
        "UsjNodesMenuPlugin: VerseNode or ImmutableVerseNode not registered on editor!"
      );
    if (e)
      return Pt(
        t.registerMutationListener(_t, (r) => {
          t.update(
            () => {
              for (const [n, i] of r) {
                const s = ge(n);
                i === "created" && Bo(s) && vd(s);
              }
            },
            { tag: "history-merge" }
          );
        }),
        t.registerMutationListener(yt, (r) => {
          t.update(
            () => {
              for (const [n, i] of r) {
                const s = ge(n);
                i === "created" && Lo(s) && vd(s);
              }
            },
            { tag: "history-merge" }
          );
        })
      );
  }, [t, e]);
}
var yE = Object.getOwnPropertyNames, _E = Object.getOwnPropertySymbols, vE = Object.prototype.hasOwnProperty;
function bd(t, e) {
  return function(n, i, s) {
    return t(n, i, s) && e(n, i, s);
  };
}
function Ms(t) {
  return function(r, n, i) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return t(r, n, i);
    var s = i.cache, o = s.get(r), a = s.get(n);
    if (o && a)
      return o === n && a === r;
    s.set(r, n), s.set(n, r);
    var u = t(r, n, i);
    return s.delete(r), s.delete(n), u;
  };
}
function Ed(t) {
  return yE(t).concat(_E(t));
}
var bE = Object.hasOwn || function(t, e) {
  return vE.call(t, e);
};
function en(t, e) {
  return t === e || !t && !e && t !== t && e !== e;
}
var EE = "__v", xE = "__o", CE = "_owner", xd = Object.getOwnPropertyDescriptor, Cd = Object.keys;
function TE(t, e, r) {
  var n = t.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(t[n], e[n], n, n, t, e, r))
      return !1;
  return !0;
}
function kE(t, e) {
  return en(t.getTime(), e.getTime());
}
function AE(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack;
}
function wE(t, e) {
  return t === e;
}
function Td(t, e, r) {
  var n = t.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var i = new Array(n), s = t.entries(), o, a, u = 0; (o = s.next()) && !o.done; ) {
    for (var l = e.entries(), c = !1, d = 0; (a = l.next()) && !a.done; ) {
      if (i[d]) {
        d++;
        continue;
      }
      var f = o.value, g = a.value;
      if (r.equals(f[0], g[0], u, d, t, e, r) && r.equals(f[1], g[1], f[0], g[0], t, e, r)) {
        c = i[d] = !0;
        break;
      }
      d++;
    }
    if (!c)
      return !1;
    u++;
  }
  return !0;
}
var DE = en;
function SE(t, e, r) {
  var n = Cd(t), i = n.length;
  if (Cd(e).length !== i)
    return !1;
  for (; i-- > 0; )
    if (!sg(t, e, r, n[i]))
      return !1;
  return !0;
}
function ui(t, e, r) {
  var n = Ed(t), i = n.length;
  if (Ed(e).length !== i)
    return !1;
  for (var s, o, a; i-- > 0; )
    if (s = n[i], !sg(t, e, r, s) || (o = xd(t, s), a = xd(e, s), (o || a) && (!o || !a || o.configurable !== a.configurable || o.enumerable !== a.enumerable || o.writable !== a.writable)))
      return !1;
  return !0;
}
function NE(t, e) {
  return en(t.valueOf(), e.valueOf());
}
function ME(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function kd(t, e, r) {
  var n = t.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  for (var i = new Array(n), s = t.values(), o, a; (o = s.next()) && !o.done; ) {
    for (var u = e.values(), l = !1, c = 0; (a = u.next()) && !a.done; ) {
      if (!i[c] && r.equals(o.value, a.value, o.value, a.value, t, e, r)) {
        l = i[c] = !0;
        break;
      }
      c++;
    }
    if (!l)
      return !1;
  }
  return !0;
}
function OE(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
function IE(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password;
}
function sg(t, e, r, n) {
  return (n === CE || n === xE || n === EE) && (t.$$typeof || e.$$typeof) ? !0 : bE(e, n) && r.equals(t[n], e[n], n, n, t, e, r);
}
var RE = "[object Arguments]", PE = "[object Boolean]", LE = "[object Date]", FE = "[object Error]", qE = "[object Map]", BE = "[object Number]", jE = "[object Object]", $E = "[object RegExp]", UE = "[object Set]", VE = "[object String]", WE = "[object URL]", HE = Array.isArray, Ad = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, wd = Object.assign, zE = Object.prototype.toString.call.bind(Object.prototype.toString);
function KE(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, n = t.areErrorsEqual, i = t.areFunctionsEqual, s = t.areMapsEqual, o = t.areNumbersEqual, a = t.areObjectsEqual, u = t.arePrimitiveWrappersEqual, l = t.areRegExpsEqual, c = t.areSetsEqual, d = t.areTypedArraysEqual, f = t.areUrlsEqual;
  return function(h, p, m) {
    if (h === p)
      return !0;
    if (h == null || p == null)
      return !1;
    var _ = typeof h;
    if (_ !== typeof p)
      return !1;
    if (_ !== "object")
      return _ === "number" ? o(h, p, m) : _ === "function" ? i(h, p, m) : !1;
    var y = h.constructor;
    if (y !== p.constructor)
      return !1;
    if (y === Object)
      return a(h, p, m);
    if (HE(h))
      return e(h, p, m);
    if (Ad != null && Ad(h))
      return d(h, p, m);
    if (y === Date)
      return r(h, p, m);
    if (y === RegExp)
      return l(h, p, m);
    if (y === Map)
      return s(h, p, m);
    if (y === Set)
      return c(h, p, m);
    var v = zE(h);
    return v === LE ? r(h, p, m) : v === $E ? l(h, p, m) : v === qE ? s(h, p, m) : v === UE ? c(h, p, m) : v === jE ? typeof h.then != "function" && typeof p.then != "function" && a(h, p, m) : v === WE ? f(h, p, m) : v === FE ? n(h, p, m) : v === RE ? a(h, p, m) : v === PE || v === BE || v === VE ? u(h, p, m) : !1;
  };
}
function JE(t) {
  var e = t.circular, r = t.createCustomConfig, n = t.strict, i = {
    areArraysEqual: n ? ui : TE,
    areDatesEqual: kE,
    areErrorsEqual: AE,
    areFunctionsEqual: wE,
    areMapsEqual: n ? bd(Td, ui) : Td,
    areNumbersEqual: DE,
    areObjectsEqual: n ? ui : SE,
    arePrimitiveWrappersEqual: NE,
    areRegExpsEqual: ME,
    areSetsEqual: n ? bd(kd, ui) : kd,
    areTypedArraysEqual: n ? ui : OE,
    areUrlsEqual: IE
  };
  if (r && (i = wd({}, i, r(i))), e) {
    var s = Ms(i.areArraysEqual), o = Ms(i.areMapsEqual), a = Ms(i.areObjectsEqual), u = Ms(i.areSetsEqual);
    i = wd({}, i, {
      areArraysEqual: s,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: u
    });
  }
  return i;
}
function GE(t) {
  return function(e, r, n, i, s, o, a) {
    return t(e, r, a);
  };
}
function YE(t) {
  var e = t.circular, r = t.comparator, n = t.createState, i = t.equals, s = t.strict;
  if (n)
    return function(u, l) {
      var c = n(), d = c.cache, f = d === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : d, g = c.meta;
      return r(u, l, {
        cache: f,
        equals: i,
        meta: g,
        strict: s
      });
    };
  if (e)
    return function(u, l) {
      return r(u, l, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: i,
        meta: void 0,
        strict: s
      });
    };
  var o = {
    cache: void 0,
    equals: i,
    meta: void 0,
    strict: s
  };
  return function(u, l) {
    return r(u, l, o);
  };
}
var gi = yr();
yr({ strict: !0 });
yr({ circular: !0 });
yr({
  circular: !0,
  strict: !0
});
yr({
  createInternalComparator: function() {
    return en;
  }
});
yr({
  strict: !0,
  createInternalComparator: function() {
    return en;
  }
});
yr({
  circular: !0,
  createInternalComparator: function() {
    return en;
  }
});
yr({
  circular: !0,
  createInternalComparator: function() {
    return en;
  },
  strict: !0
});
function yr(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, n = t.createInternalComparator, i = t.createState, s = t.strict, o = s === void 0 ? !1 : s, a = JE(t), u = KE(a), l = n ? n(u) : GE(u);
  return YE({ circular: r, comparator: u, createState: i, equals: l, strict: o });
}
function XE(t) {
  const [e, r] = se(t), [n, i] = se(t);
  return J(() => {
    gi(t, n) || r(t);
  }, [t]), [e, n, i];
}
function QE({
  scrRef: t,
  setScrRef: e
}) {
  const [r] = be(), n = Le(!1), { book: i, chapterNum: s, verseNum: o } = t;
  return J(
    () => r.registerMutationListener(
      mt,
      (a) => {
        r.update(
          () => {
            for (const [u, l] of a) {
              const c = ge(u);
              c && Ku(c) && l === "created" && Dd(s, o);
            }
          },
          { tag: Ja }
        );
      },
      { skipInitialization: !0 }
    ),
    [r, s, o]
  ), J(() => {
    r.update(
      () => {
        n.current ? n.current = !1 : Dd(s, o);
      },
      { tag: Ja }
    );
  }, [r, s, o]), J(
    () => r.registerCommand(
      po,
      () => ZE(i, s, o, e, n),
      vo
    ),
    [r, i, s, o, e]
  ), r.registerUpdateListener(({ editorState: a }) => {
    ex(a, e);
  }), null;
}
function Dd(t, e) {
  const r = pe().getChildren(), n = $_(r, t), i = mp(r, n), s = pp(i, !!n);
  if (s && !n || !n) return;
  U_(i, n, s);
  const o = Cv(i, e);
  !o || o.isSelected() || o.selectNext(0, 0);
}
function ZE(t, e, r, n, i) {
  var d;
  const s = (d = B()) == null ? void 0 : d.getNodes()[0];
  if (!s) return !1;
  const o = gp(s), a = parseInt((o == null ? void 0 : o.getNumber()) ?? "1", 10), u = Tv(s), l = u == null ? void 0 : u.getNumber(), c = parseInt(l ?? "1", 10);
  if (i.current = !!(o && a !== e || c !== r), i.current) {
    const f = {
      book: t,
      chapterNum: a,
      verseNum: c
    };
    l != null && c.toString() !== l && (f.verse = l), n(f);
  }
  return !1;
}
const ex = (t, e) => {
  t.read(() => {
    let n = pe().getFirstChild();
    for (; n !== null; ) {
      if (Ku(n)) {
        const i = n;
        e((s) => ({
          ...s,
          book: i.__code
        }));
        break;
      }
      n = n.getNextSibling();
    }
  });
}, og = {
  chapter: "chapter",
  verse: "verse",
  char: "char",
  para: "para",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5"
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem"
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem"
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough"
  }
};
function tx() {
  return /* @__PURE__ */ w.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ w.jsxs(
    "svg",
    {
      className: "h-10 w-10 animate-spin",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ w.jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ w.jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  ) });
}
const Sd = (t) => ke(Af(t));
function rx(t, e, r) {
  const n = {
    type: En,
    version: xn,
    content: t
  }, i = e.serializeEditorState(n, r);
  return kp(i.root.children[0]) ? i.root.children[0].children[0] : i.root.children[0];
}
const nx = {
  c: {
    action: (t) => {
      const { book: e, chapterNum: r } = t.reference, n = t.autoNumbering ? r + 1 : t.newVerseRChapterNum;
      return [{
        type: "chapter",
        marker: "c",
        number: `${n}`,
        sid: `${e} ${n}`
      }];
    }
  },
  v: {
    action: (t) => {
      const { book: e, chapterNum: r, verseNum: n, verse: i } = t.reference, s = t.autoNumbering ? Ya(n, i) : t.newVerseRChapterNum;
      return [{
        type: "verse",
        marker: "v",
        number: `${s}`,
        sid: `${e} ${r}:${s}`
      }];
    }
  },
  f: {
    action: (t) => {
      const { chapterNum: e, verseNum: r } = t.reference;
      return [{
        type: "note",
        marker: "f",
        caller: "+",
        content: [
          { type: "char", marker: "fr", content: [`${e}:${r} `] },
          {
            type: "char",
            marker: "ft",
            content: [t.noteText ?? " "]
          }
        ]
      }];
    }
  },
  x: {
    action: (t) => {
      const { chapterNum: e, verseNum: r } = t.reference;
      return [{
        type: "note",
        marker: "x",
        caller: "+",
        content: [
          { type: "char", marker: "xo", content: [`${e}:${r} `] },
          {
            type: "char",
            marker: "xt",
            content: [t.noteText ?? " "]
          }
        ]
      }];
    }
  }
};
function tu(t, e, r) {
  const n = ix(t);
  return { action: (s) => {
    s.editor.update(() => {
      var c, d;
      const o = s.autoNumbering ? (c = n == null ? void 0 : n.action) == null ? void 0 : c.call(n, s) : (d = n == null ? void 0 : n.action) == null ? void 0 : d.call(n, s);
      if (!o) return;
      const a = rx(o, rl, r), u = Sd(a), l = B();
      if (R(l))
        if (l.getTextContent().length > 0)
          sx(
            l,
            () => Sd(a)
          );
        else if (S(u) && !u.isInline()) {
          const f = l.insertParagraph();
          if (f) {
            const g = f.getChildren();
            u.append(...g), f.replace(u), u.selectStart();
          }
        } else
          l.insertNodes([u]);
      else
        l == null || l.insertNodes([u]);
    });
  }, label: n == null ? void 0 : n.label };
}
function ix(t) {
  let e = nx[t];
  return e || (Ge.isValidMarker(t) ? e = {
    action: () => [{
      type: Ge.getType(),
      marker: t,
      content: []
    }]
  } : Ie.isValidMarker(t) && (e = {
    action: () => [{
      type: Ie.getType(),
      marker: t,
      content: [" "]
    }]
  })), e;
}
function sx(t, e) {
  const r = t.getNodes(), [n, i] = ox(t);
  let s;
  r.forEach((o, a) => {
    if (S(s) && s.isParentOf(o))
      return;
    const u = ax(
      o,
      a === 0,
      a === r.length - 1,
      n,
      i
    );
    if (!u) {
      s = void 0;
      return;
    }
    s || (s = e(), u.insertBefore(s)), lx(u, s);
  }), F(s) && s.selectEnd();
}
function ox(t) {
  const e = t.anchor.offset, r = t.focus.offset;
  return t.isBackward() ? [r, e] : [e, r];
}
function ax(t, e, r, n, i) {
  if (!(Ci(t) || Gt(t) || Gt(t.getParent()))) {
    if (F(t))
      return ux(t, e, r, n, i);
    if (S(t) && t.isInline())
      return t;
  }
}
function ux(t, e, r, n, i) {
  const s = t.getTextContentSize(), o = e ? n : 0, a = r ? i : s;
  if (o === 0 && a === 0)
    return;
  const u = t.splitText(o, a);
  return u.length === 1 ? u[0] : u.length === 3 || e || a === s ? u[1] : u[0];
}
function lx(t, e) {
  F(e) ? (e.setTextContent(t.getTextContent()), t.remove()) : S(e) && (e.clear(), e.append(t));
}
function cx({
  canUndo: t,
  canRedo: e,
  setCanUndo: r,
  setCanRedo: n
}) {
  const [i] = be();
  return J(() => Pt(
    i.registerCommand(
      di,
      (s) => (r(s), !1),
      Ra
    ),
    i.registerCommand(
      ci,
      (s) => (n(s), !1),
      Ra
    )
  ), [i, r, n]), J(() => {
    const s = (o) => {
      const { key: a, shiftKey: u, metaKey: l, ctrlKey: c, altKey: d } = o;
      !(Yf ? l : c) || d || (a.toLowerCase() === "z" && u && e ? (o.preventDefault(), i.dispatchCommand(Xi, void 0)) : a.toLowerCase() === "z" && t && (console.log("undo"), o.preventDefault(), i.dispatchCommand(Yi, void 0)));
    };
    return i.registerRootListener(
      (o, a) => {
        a !== null && a.removeEventListener("keydown", s), o !== null && o.addEventListener("keydown", s);
      }
    );
  }, [i, t, e]), null;
}
function Ut({
  onClick: t,
  children: e,
  className: r,
  title: n,
  ...i
}) {
  const [s] = be();
  return /* @__PURE__ */ w.jsx(
    "button",
    {
      onClick: (o) => t ? t(o, s) : void 0,
      className: `scribe-toolbar-button ${r || ""}`,
      title: n,
      "aria-label": n,
      ...i,
      children: e
    }
  );
}
function dx({
  onClose: t,
  children: e,
  title: r,
  closeOnClickOutside: n
}) {
  const i = Le(null);
  return J(() => {
    i.current !== null && i.current.focus();
  }, []), J(() => {
    let s = null;
    const o = (l) => {
      l.key === "Escape" && t();
    }, a = (l) => {
      const c = l.target;
      i.current !== null && !i.current.contains(c) && n && t();
    }, u = i.current;
    return u !== null && (s = u.parentElement, s !== null && s.addEventListener("click", a)), window.addEventListener("keydown", o), () => {
      window.removeEventListener("keydown", o), s !== null && (s == null || s.removeEventListener("click", a));
    };
  }, [n, t]), /* @__PURE__ */ w.jsx("div", { className: "Modal__overlay Modal__editor_centered", role: "dialog", children: /* @__PURE__ */ w.jsxs("div", { className: "Modal__modal", tabIndex: -1, ref: i, children: [
    /* @__PURE__ */ w.jsx("h2", { className: "Modal__title", children: r }),
    /* @__PURE__ */ w.jsx(
      "button",
      {
        className: "Modal__closeButton",
        "aria-label": "Close modal",
        type: "button",
        onClick: t,
        children: "X"
      }
    ),
    /* @__PURE__ */ w.jsx("div", { className: "Modal__content", children: e })
  ] }) });
}
function fx({
  onClose: t,
  children: e,
  title: r,
  closeOnClickOutside: n = !1
}) {
  var o;
  const s = ((o = document.querySelector(".editor-lexical")) == null ? void 0 : o.closest("div")) || document.body;
  return console.log({ portalTarget: s }), nu(
    /* @__PURE__ */ w.jsx(dx, { onClose: t, title: r, closeOnClickOutside: n, children: e }),
    s
  );
}
function hx() {
  const [t, e] = se(null), r = me(() => {
    e(null);
  }, []), n = Be(() => {
    if (t === null)
      return null;
    const { title: s, content: o, closeOnClickOutside: a } = t;
    return /* @__PURE__ */ w.jsx(fx, { onClose: r, title: s, closeOnClickOutside: a, children: o });
  }, [t, r]), i = me(
    (s, o, a = !1) => {
      e({
        closeOnClickOutside: a,
        content: o(r),
        title: s
      });
    },
    [r]
  );
  return [n, i];
}
const Nd = ({
  label: t,
  value: e,
  onChange: r,
  placeholder: n = "",
  "data-test-id": i,
  type: s = "text"
}) => /* @__PURE__ */ w.jsxs("div", { className: "scribe-input-wrapper", children: [
  /* @__PURE__ */ w.jsx("label", { className: "scribe-input-label", children: t }),
  /* @__PURE__ */ w.jsx(
    "input",
    {
      type: s,
      className: "scribe-input-field",
      placeholder: n,
      value: e,
      onChange: (o) => r(o.target.value),
      "data-test-id": i
    }
  )
] }), px = ({
  activeEditor: t,
  onClose: e,
  insertFunction: r,
  label: n,
  placeholder: i
}) => {
  const [s, o] = se(""), [a, u] = se(!0);
  J(() => {
    u(s.trim() === "");
  }, [s]);
  const l = () => {
    r(n === "Footnote" || n === "Cross Reference" ? { editor: t, noteText: s } : { editor: t, value: s }), o(""), e();
  };
  return /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
    n === "Footnote" ? (
      // For footnote with multiple fields
      /* @__PURE__ */ w.jsx(w.Fragment, { children: /* @__PURE__ */ w.jsx(
        Nd,
        {
          placeholder: "Text",
          label: "Text",
          onChange: (c) => o(c),
          value: s,
          "data-test-id": "note-ft"
        }
      ) })
    ) : (
      // For simple inputs like verse/chapter numbers
      /* @__PURE__ */ w.jsx(
        Nd,
        {
          placeholder: i ?? "Enter Value",
          label: n,
          onChange: o,
          value: s,
          "data-test-id": `modal-${n.toLowerCase()}`,
          type: n === "Verse" || n === "Chapter" ? "number" : "text"
        }
      )
    ),
    /* @__PURE__ */ w.jsx("button", { className: "scribe-button", disabled: a, onClick: l, children: "Insert" })
  ] });
}, ag = [
  // Old Testament
  { code: "GEN", name: "Genesis", testament: "OT", chapters: 50 },
  { code: "EXO", name: "Exodus", testament: "OT", chapters: 40 },
  { code: "LEV", name: "Leviticus", testament: "OT", chapters: 27 },
  { code: "NUM", name: "Numbers", testament: "OT", chapters: 36 },
  { code: "DEU", name: "Deuteronomy", testament: "OT", chapters: 34 },
  { code: "JOS", name: "Joshua", testament: "OT", chapters: 24 },
  { code: "JDG", name: "Judges", testament: "OT", chapters: 21 },
  { code: "RUT", name: "Ruth", testament: "OT", chapters: 4 },
  { code: "1SA", name: "1 Samuel", testament: "OT", chapters: 31 },
  { code: "2SA", name: "2 Samuel", testament: "OT", chapters: 24 },
  { code: "1KI", name: "1 Kings", testament: "OT", chapters: 22 },
  { code: "2KI", name: "2 Kings", testament: "OT", chapters: 25 },
  { code: "1CH", name: "1 Chronicles", testament: "OT", chapters: 29 },
  { code: "2CH", name: "2 Chronicles", testament: "OT", chapters: 36 },
  { code: "EZR", name: "Ezra", testament: "OT", chapters: 10 },
  { code: "NEH", name: "Nehemiah", testament: "OT", chapters: 13 },
  { code: "EST", name: "Esther", testament: "OT", chapters: 10 },
  { code: "JOB", name: "Job", testament: "OT", chapters: 42 },
  { code: "PSA", name: "Psalms", testament: "OT", chapters: 150 },
  { code: "PRO", name: "Proverbs", testament: "OT", chapters: 31 },
  { code: "ECC", name: "Ecclesiastes", testament: "OT", chapters: 12 },
  { code: "SNG", name: "Song of Songs", testament: "OT", chapters: 8 },
  { code: "ISA", name: "Isaiah", testament: "OT", chapters: 66 },
  { code: "JER", name: "Jeremiah", testament: "OT", chapters: 52 },
  { code: "LAM", name: "Lamentations", testament: "OT", chapters: 5 },
  { code: "EZK", name: "Ezekiel", testament: "OT", chapters: 48 },
  { code: "DAN", name: "Daniel", testament: "OT", chapters: 12 },
  { code: "HOS", name: "Hosea", testament: "OT", chapters: 14 },
  { code: "JOL", name: "Joel", testament: "OT", chapters: 3 },
  { code: "AMO", name: "Amos", testament: "OT", chapters: 9 },
  { code: "OBA", name: "Obadiah", testament: "OT", chapters: 1 },
  { code: "JON", name: "Jonah", testament: "OT", chapters: 4 },
  { code: "MIC", name: "Micah", testament: "OT", chapters: 7 },
  { code: "NAM", name: "Nahum", testament: "OT", chapters: 3 },
  { code: "HAB", name: "Habakkuk", testament: "OT", chapters: 3 },
  { code: "ZEP", name: "Zephaniah", testament: "OT", chapters: 3 },
  { code: "HAG", name: "Haggai", testament: "OT", chapters: 2 },
  { code: "ZEC", name: "Zechariah", testament: "OT", chapters: 14 },
  { code: "MAL", name: "Malachi", testament: "OT", chapters: 4 },
  // New Testament
  { code: "MAT", name: "Matthew", testament: "NT", chapters: 28 },
  { code: "MRK", name: "Mark", testament: "NT", chapters: 16 },
  { code: "LUK", name: "Luke", testament: "NT", chapters: 24 },
  { code: "JHN", name: "John", testament: "NT", chapters: 21 },
  { code: "ACT", name: "Acts", testament: "NT", chapters: 28 },
  { code: "ROM", name: "Romans", testament: "NT", chapters: 16 },
  { code: "1CO", name: "1 Corinthians", testament: "NT", chapters: 16 },
  { code: "2CO", name: "2 Corinthians", testament: "NT", chapters: 13 },
  { code: "GAL", name: "Galatians", testament: "NT", chapters: 6 },
  { code: "EPH", name: "Ephesians", testament: "NT", chapters: 6 },
  { code: "PHP", name: "Philippians", testament: "NT", chapters: 4 },
  { code: "COL", name: "Colossians", testament: "NT", chapters: 4 },
  { code: "1TH", name: "1 Thessalonians", testament: "NT", chapters: 5 },
  { code: "2TH", name: "2 Thessalonians", testament: "NT", chapters: 3 },
  { code: "1TI", name: "1 Timothy", testament: "NT", chapters: 6 },
  { code: "2TI", name: "2 Timothy", testament: "NT", chapters: 4 },
  { code: "TIT", name: "Titus", testament: "NT", chapters: 3 },
  { code: "PHM", name: "Philemon", testament: "NT", chapters: 1 },
  { code: "HEB", name: "Hebrews", testament: "NT", chapters: 13 },
  { code: "JAS", name: "James", testament: "NT", chapters: 5 },
  { code: "1PE", name: "1 Peter", testament: "NT", chapters: 5 },
  { code: "2PE", name: "2 Peter", testament: "NT", chapters: 3 },
  { code: "1JN", name: "1 John", testament: "NT", chapters: 5 },
  { code: "2JN", name: "2 John", testament: "NT", chapters: 1 },
  { code: "3JN", name: "3 John", testament: "NT", chapters: 1 },
  { code: "JUD", name: "Jude", testament: "NT", chapters: 1 },
  { code: "REV", name: "Revelation", testament: "NT", chapters: 22 }
], ru = (t) => ag.find((e) => e.code === t), gx = (t) => {
  var e;
  return ((e = ru(t)) == null ? void 0 : e.chapters) || 0;
};
function mx({ scrRef: t, setScrRef: e, scope: r }) {
  var _;
  const [n, i] = se(!1), [s, o] = se("books"), [a, u] = se(null), [l, c] = se("OT"), d = Le(null), f = me(
    (y) => r ? r.availableBooks.has(y) : !0,
    [r]
  ), g = (y) => {
    u(y), o("chapters");
  }, h = (y) => {
    a && (e({
      book: a,
      chapterNum: y,
      verseNum: 1
    }), p());
  }, p = () => {
    i(!1), o("books"), u(null);
  };
  J(() => {
    const y = (v) => {
      d.current && !d.current.contains(v.target) && p();
    };
    return n && document.addEventListener("mousedown", y), () => {
      document.removeEventListener("mousedown", y);
    };
  }, [n]);
  const m = ru(t.book);
  return /* @__PURE__ */ w.jsxs("div", { className: "bcv-selector", ref: d, children: [
    /* @__PURE__ */ w.jsx("button", { onClick: () => i(!n), className: "bcv-selector-button", children: /* @__PURE__ */ w.jsxs("span", { children: [
      m == null ? void 0 : m.name,
      " ",
      t.chapterNum,
      ":",
      t.verseNum
    ] }) }),
    n && /* @__PURE__ */ w.jsxs("div", { className: "bcv-dropdown", children: [
      /* @__PURE__ */ w.jsxs("div", { className: "bcv-dropdown-header", children: [
        /* @__PURE__ */ w.jsx("h3", { children: "Select Reference" }),
        /* @__PURE__ */ w.jsx("button", { className: "bcv-close-button", onClick: p, children: "×" })
      ] }),
      s === "books" && /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
        /* @__PURE__ */ w.jsxs("div", { className: "bcv-tabs", children: [
          /* @__PURE__ */ w.jsx(
            "button",
            {
              className: `bcv-tab ${l === "OT" ? "active" : ""}`,
              onClick: () => c("OT"),
              children: "Old Testament"
            }
          ),
          /* @__PURE__ */ w.jsx(
            "button",
            {
              className: `bcv-tab ${l === "NT" ? "active" : ""}`,
              onClick: () => c("NT"),
              children: "New Testament"
            }
          )
        ] }),
        /* @__PURE__ */ w.jsx("div", { className: "bcv-books-grid", children: ag.filter((y) => y.testament === l).map((y) => /* @__PURE__ */ w.jsx(
          "button",
          {
            onClick: () => g(y.code),
            disabled: !f(y.code),
            className: `bcv-book-button ${f(y.code) ? "" : "bcv-book-disabled"} ${t.book === y.code ? "selected" : ""}`,
            children: y.name
          },
          y.code
        )) })
      ] }),
      s === "chapters" && a && /* @__PURE__ */ w.jsxs("div", { className: "bcv-chapters-container", children: [
        /* @__PURE__ */ w.jsxs("div", { className: "bcv-chapters-header", children: [
          /* @__PURE__ */ w.jsx("button", { onClick: () => o("books"), className: "bcv-back-button", children: "Back to Books" }),
          /* @__PURE__ */ w.jsx("h3", { className: "bcv-book-title", children: (_ = ru(a)) == null ? void 0 : _.name })
        ] }),
        /* @__PURE__ */ w.jsx("div", { className: "bcv-chapters-grid", children: Array.from({ length: gx(a) }, (y, v) => v + 1).map(
          (y) => /* @__PURE__ */ w.jsx(
            "button",
            {
              onClick: () => h(y),
              className: "bcv-chapter-button",
              children: y
            },
            y
          )
        ) })
      ] })
    ] })
  ] });
}
const yx = ({
  scrRef: t,
  viewOptions: e,
  autoNumbering: r = !1,
  canUndo: n,
  canRedo: i,
  setScrRef: s,
  scope: o
  // readOnly,
}) => {
  const [a, u] = hx(), [l, c] = se(!1), [d, f] = se(!1), g = Le(null), h = Le(null), [p] = be(), [m, _] = se(!0), y = Le(null), v = [
    {
      title: "Verse",
      marker: "v",
      requiresValue: !0,
      placeholder: "Verse Number"
    },
    {
      title: "Chapter",
      marker: "c",
      requiresValue: !0,
      placeholder: "Chapter Number"
    },
    {
      title: "Footnote",
      marker: "f",
      requiresValue: !0
    },
    {
      title: "Cross Reference",
      marker: "x",
      requiresValue: !0
    }
  ], C = [
    {
      title: "Cut",
      action: k
    },
    {
      title: "Copy",
      action: T
    },
    {
      title: "Paste",
      action: N
    },
    {
      title: "Paste as Plain Text",
      action: A
    }
  ];
  J(() => {
    const M = (P) => {
      g.current && !g.current.contains(P.target) && c(!1), h.current && !h.current.contains(P.target) && f(!1);
    };
    return document.addEventListener("mousedown", M), () => {
      document.removeEventListener("mousedown", M);
    };
  }, []), J(() => {
    const M = document.querySelector(".editor-input");
    if (M) {
      const P = M.closest("div");
      y.current = P;
    }
  }, []);
  function T() {
    p.dispatchCommand(Wr, null);
  }
  function k() {
    p.dispatchCommand(jn, null);
  }
  function N() {
    Qu(p);
  }
  function A() {
    Zu(p);
  }
  function D() {
    p.dispatchCommand(Yi, void 0);
  }
  function L() {
    p.dispatchCommand(Xi, void 0);
  }
  function W(M) {
    if (console.log({ option: M }), c(!1), M.requiresValue)
      u(`Insert ${M.title}`, (P) => /* @__PURE__ */ w.jsx(
        px,
        {
          activeEditor: p,
          onClose: P,
          label: M.title,
          placeholder: M.placeholder,
          insertFunction: ({ editor: Y, value: Z, noteText: de }) => {
            const ae = tu(M.marker, void 0, e);
            ae && ae.action && ae.action({
              reference: t,
              editor: Y,
              autoNumbering: r,
              newVerseRChapterNum: Z ? parseInt(Z) : void 0,
              noteText: de
            });
          }
        }
      ));
    else {
      const P = tu(M.marker, void 0, e);
      P && P.action && P.action({
        reference: t,
        editor: p,
        autoNumbering: r
      });
    }
  }
  function U(M) {
    f(!1), M.action();
  }
  return /* @__PURE__ */ w.jsxs("div", { className: "scribe-toolbar scribe-toolbar-sticky", children: [
    /* @__PURE__ */ w.jsxs("div", { className: "scribe-toolbar-group", children: [
      /* @__PURE__ */ w.jsx(Ut, { onClick: D, title: "Undo", disabled: !n, children: "Undo" }),
      /* @__PURE__ */ w.jsx(Ut, { onClick: L, title: "Redo", disabled: !i, children: "Redo" })
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: "scribe-toolbar-group", children: /* @__PURE__ */ w.jsx(mx, { scrRef: t, setScrRef: s, scope: o }) }),
    /* @__PURE__ */ w.jsxs("div", { className: "scribe-toolbar-group clipboard-actions-responsive", children: [
      /* @__PURE__ */ w.jsx(Ut, { onClick: k, title: "Cut", children: "Cut" }),
      /* @__PURE__ */ w.jsx(Ut, { onClick: T, title: "Copy", children: "Copy" }),
      /* @__PURE__ */ w.jsx(Ut, { onClick: N, title: "Paste", children: "Paste" }),
      /* @__PURE__ */ w.jsx(Ut, { onClick: A, title: "Paste as Plain Text", children: "Paste as Plain Text" })
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: "scribe-toolbar-group clipboard-dropdown", ref: h, children: [
      /* @__PURE__ */ w.jsx(
        Ut,
        {
          onClick: () => f(!d),
          className: d ? "scribe-active" : "",
          children: "Edit ▼"
        }
      ),
      d && /* @__PURE__ */ w.jsx("div", { className: "scribe-dropdown", children: C.map((M) => /* @__PURE__ */ w.jsx(
        "button",
        {
          className: "scribe-dropdown-item",
          onClick: () => U(M),
          children: M.title
        },
        M.title
      )) })
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: "scribe-toolbar-group", ref: g, children: [
      /* @__PURE__ */ w.jsx(
        Ut,
        {
          onClick: () => c(!l),
          className: l ? "scribe-active" : "",
          children: "Insert ▼"
        }
      ),
      l && /* @__PURE__ */ w.jsx("div", { className: "scribe-dropdown", children: v.map((M) => /* @__PURE__ */ w.jsx(
        "button",
        {
          className: "scribe-dropdown-item",
          onClick: () => W(M),
          children: M.title
        },
        M.title
      )) })
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: "scribe-toolbar-group", children: /* @__PURE__ */ w.jsx(
      Ut,
      {
        onClick: () => {
          const M = !m;
          _(M), p.setEditable(M);
        },
        className: m ? "scribe-status-editable" : "scribe-status-readonly",
        children: m ? "Editable" : "Read Only"
      }
    ) }),
    a
  ] });
}, Cx = Ji(function({ usjInput: e, onChange: r, viewOptions: n, nodeOptions: i = {}, scrRef: s, setScrRef: o, scope: a }, u) {
  const l = Le(null), c = Le(), [d, f] = se(e), [g] = XE(d), [h, p] = se(!1), [m, _] = se(!1);
  av(i);
  const y = !1, v = {
    namespace: "ScribeEditor",
    editable: !0,
    editorState: void 0,
    theme: og,
    onError(T) {
      throw T;
    },
    nodes: [ot, _t, ...Dp]
  };
  jg(u, () => ({
    focus() {
      var T;
      (T = l.current) == null || T.focus();
    },
    getUsj() {
      return c.current;
    },
    setUsj(T) {
      !gi(c.current, T) && !gi(d, T) && (c.current = T, f(T));
    }
  }));
  const C = me(
    (T, k, N) => {
      if (b_.some((D) => N.has(D))) return;
      const A = zv.deserializeEditorState(T);
      if (A) {
        const D = !gi(c.current, A);
        D && (c.current = A), (D || !gi(d, A)) && (r == null || r(A));
      }
    },
    [r, d]
  );
  return /* @__PURE__ */ w.jsxs(zf, { initialConfig: v, children: [
    /* @__PURE__ */ w.jsx(
      yx,
      {
        scrRef: s,
        autoNumbering: y,
        canUndo: h,
        canRedo: m,
        setScrRef: o,
        scope: a
      }
    ),
    /* @__PURE__ */ w.jsx(
      nh,
      {
        contentEditable: /* @__PURE__ */ w.jsx(
          Qf,
          {
            className: `editor-input outline-none ${jp(n).join(" ")}`
          }
        ),
        placeholder: /* @__PURE__ */ w.jsx(tx, {}),
        ErrorBoundary: W2
      }
    ),
    s && /* @__PURE__ */ w.jsx(
      hE,
      {
        trigger: "\\",
        scrRef: s,
        getMarkerAction: (T, k) => tu(T, k, n),
        autoNumbering: y
      }
    ),
    /* @__PURE__ */ w.jsx(
      Fp,
      {
        scripture: g,
        nodeOptions: i,
        editorAdaptor: rl,
        viewOptions: n
      }
    ),
    /* @__PURE__ */ w.jsx(ey, { onChange: C, ignoreSelectionChange: !0 }),
    /* @__PURE__ */ w.jsx(Av, { nodeOptions: i }),
    /* @__PURE__ */ w.jsx(Q2, {}),
    /* @__PURE__ */ w.jsx(zg, {}),
    /* @__PURE__ */ w.jsx(yv, {}),
    /* @__PURE__ */ w.jsx(
      cx,
      {
        canUndo: h,
        setCanUndo: p,
        canRedo: m,
        setCanRedo: _
      }
    ),
    /* @__PURE__ */ w.jsx(uv, {}),
    /* @__PURE__ */ w.jsx(QE, { scrRef: s, setScrRef: o })
  ] });
}), _x = {
  type: "USJ",
  version: "3.1",
  content: []
};
function Tx({
  usjInput: t,
  viewOptions: e
}) {
  const [r, n] = se(_x), i = Le(null);
  J(() => {
    t && (console.log("Setting usjInput", t), n(t));
  }, [t]), J(() => {
    const o = setTimeout(() => {
      r && i.current && i.current.setUsj(r);
    }, 1e3);
    return () => clearTimeout(o);
  }, [r]);
  const s = {
    namespace: "ReadOnlyUSJEditor",
    editable: !1,
    theme: og,
    onError(o) {
      throw o;
    },
    nodes: [ot, _t, ...Dp]
  };
  return /* @__PURE__ */ w.jsx("div", { className: "lexical-editor-container", children: /* @__PURE__ */ w.jsx("div", { className: "editor-wrapper p-4 text-gray-600", children: /* @__PURE__ */ w.jsxs(zf, { initialConfig: s, children: [
    /* @__PURE__ */ w.jsx(
      nh,
      {
        contentEditable: /* @__PURE__ */ w.jsx(
          Qf,
          {
            readOnly: !0,
            spellCheck: !0,
            className: `editor-input outline-none ${jp(e).join(" ")}`
          }
        ),
        placeholder: null,
        ErrorBoundary: ({ children: o }) => o
      }
    ),
    /* @__PURE__ */ w.jsx(Fp, { scripture: r, editorAdaptor: rl })
  ] }) }) });
}
export {
  Kv as DEFAULT_VIEW_MODE,
  Cx as Editor,
  Tx as ReadOnlyEditor,
  Jv as getViewOptions,
  Nt as immutableNoteCallerNodeName,
  xx as viewOptionsToMode
};
//# sourceMappingURL=index.js.map
