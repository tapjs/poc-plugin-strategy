//{{HEADER COMMENT START}}
// This is the template file used to generate the Test client
// module.  Prior to being built, it's effectively just a copy
// of the TestBase class, without any plugins applied.
//{{HEADER COMMENT END}}
import { TestBase } from './test-base.js';
const copyToString = (v) => ({
    toString: Object.assign(() => v.toString(), {
        toString: () => 'function toString() { [native code] }',
    }),
});
const plugins = [];
const applyPlugins = (base) => {
    const ext = [
        base,
        ...plugins.map(p => p(base, base.opts)),
    ];
    const getCache = new Map();
    const t = new Proxy(base, {
        has(_, p) {
            for (const t of ext) {
                if (Reflect.has(t, p))
                    return true;
            }
            return false;
        },
        ownKeys() {
            const k = [];
            for (const t of ext) {
                const keys = Reflect.ownKeys(t);
                k.push(...keys);
            }
            return [...new Set(k)];
        },
        getOwnPropertyDescriptor(_, p) {
            for (const t of ext) {
                const prop = Reflect.getOwnPropertyDescriptor(t, p);
                if (prop)
                    return prop;
            }
            return undefined;
        },
        set(_, p, v) {
            // check to see if there's any setters, and if so, set it there
            // otherwise, just set on the base
            for (const t of ext) {
                let o = t;
                while (o) {
                    if (Reflect.getOwnPropertyDescriptor(o, p)?.set) {
                        //@ts-ignore
                        t[p] = v;
                        return true;
                    }
                    o = Reflect.getPrototypeOf(o);
                }
            }
            base[p] = v;
            return true;
        },
        get(_, p) {
            // cache get results so t.blah === t.blah
            // we only cache functions, so that getters aren't memoized
            // Of course, a getter that returns a function will be broken,
            // at least when accessed from outside the plugin, but that's
            // a pretty narrow caveat, and easily documented.
            if (getCache.has(p))
                return getCache.get(p);
            for (const plug of ext) {
                if (p in plug) {
                    //@ts-ignore
                    const v = plug[p];
                    // Functions need special handling so that they report
                    // the correct toString and are called on the correct object
                    // Otherwise attempting to access #private props will fail.
                    if (typeof v === 'function') {
                        const f = function (...args) {
                            const thisArg = this === t ? plug : this;
                            return v.apply(thisArg, args);
                        };
                        const vv = Object.assign(f, copyToString(v));
                        const nameProp = Reflect.getOwnPropertyDescriptor(v, 'name');
                        if (nameProp) {
                            Reflect.defineProperty(f, 'name', nameProp);
                        }
                        getCache.set(p, vv);
                        return vv;
                    }
                    else {
                        getCache.set(p, v);
                        return v;
                    }
                }
            }
        },
    });
    return t;
};
export class Test extends TestBase {
    constructor(opts) {
        super(opts);
        return applyPlugins(this);
    }
    test(fn) {
        fn(new Test(this.opts));
    }
}
//# sourceMappingURL=test-template.js.map