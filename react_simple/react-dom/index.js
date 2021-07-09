function render(vnode, container) {
    if (vnode === undefined) return;
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        return container.appendChild(textNode);
    }

    const { tag, attrs, childrens } = vnode;
    let dom;
    if (typeof tag === 'string') {
        dom = document.createElement(tag);
    } else if (typeof tag === 'function') {
        return render(tag(attrs), container);
    }
    // 处理属性
    if (attrs) {
        Object.keys(attrs).forEach((k) => {
            setAttribute(dom, k, attrs[k]);
        });
    }
    // 递归处理子节点
    if (childrens) {
        for (let k in childrens) {
            const child = childrens[k];
            if (typeof child === 'string') {
                const textDom = document.createTextNode(child);
                dom.appendChild(textDom);
            } else {
                render(child, dom);
            }
        }
    }
    container.appendChild(dom);
}

function setAttribute(dom, key, value) {
    if (/on\w+/.test(key)) {
        key = key.toLowerCase();
        dom[key] = value;
    } else if (key === 'style') {
        if (!value || typeof value === 'string') {
            return (dom.style.cssText = value);
        } else if (value && typeof value === 'object') {
            let css = '';
            for (let k in value) {
                // console.log(dasherize(k), maybeAddPx(k, value[k]));
                css += dasherize(k) + ':' + maybeAddPx(k, value[k]) + ';';
            }
            return (dom.style.cssText = css);
        }
    } else {
        if (key in dom) {
            dom[key] = value || '';
        }
        if (value) {
            dom.setAttribute(key, value);
        } else {
            dom.removeAttribute(key);
        }
    }
}

// react属性名 -> js属性名
function dasherize(key) {
    const keys = {
        fontSize: 'font-size',
        zIndex: 'z-index',
    };
    return keys[key] || key;
}

// 属性值可能需要添加 px
function maybeAddPx(key, value) {
    const cssNumber = {
        'column-count': 1,
        columns: 1,
        'font-weight': 1,
        'line-height': 1,
        opacity: 1,
        'z-index': 1,
        zoom: 1,
    };

    return typeof value === 'number' ? (cssNumber[dasherize(key)] ? value : value + 'px') : value;
}

const ReactDOM = {
    render,
};
export default ReactDOM;
