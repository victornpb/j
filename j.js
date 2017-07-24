function j(el) {
    if (typeof el === 'string') el = document.querySelector(el);
    return new J(el);
}

function J(el) {
    this.el = el;
}

J.prototype = {
    insertBefore: function insertBefore(target) {
        target.parentNode.insertBefore(this.el, target);
        return this;
    },
    insertAfter: function insertAfter(target) {
        target.parentNode.insertBefore(this.el, target.nextSibling);
        return this;
    },
    before: function before(child) {
        this.el.parentNode.insertBefore(child, this.el);
        return this;
    },
    after: function after(child) {
        this.el.parentNode.insertBefore(child, this.el.nextSibling);
        return this;
    },
    prepend: function prepend(child) {
        this.el.insertBefore(child, this.el.firstChild);
        return this;
    },
    append: function append(child) {
        this.el.appendChild(child);
        return this;
    },
    appendTo: function appendTo(node) {
        node.appendChild(this.el);
        return this;
    },
    prependTo: function prependTo(node) {
        node.insertBefore(this.el, node.firstChild);
        return this;
    },
    contains: function contains(child) {
        return this.el !== child && this.el.contains(child);
    },

    hide: function hide() {
        this.el.style.display = "none";
        return this;
    },
    show: function show() {
        this.el.style.display = "";
        return this;
    },
    addClass: function addClass(className) {
        if (this.el.classList)
            this.el.classList.add(className);
        else
            this.el.className += ' ' + className;
        return this;
    },
    removeClass: function removeClass(className) {
        if (this.el.classList)
            this.el.classList.remove(className);
        else
            this.el.className = this.el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        return this;
    },
    toggleClass: function toggleClass(className) {
        if (this.el.classList) {
            this.el.classList.toggle(className);
        }
        else {
            var classes = this.el.className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            this.el.className = classes.join(' ');
        }
        return this;
    },
    hasClass: function hasClass(className) {
        if (this.el.classList)
            return this.el.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.el.className);
    },
    empty: function empty() {
        this.el.innerHTML = "";
        return this;
    },
    parent: function parent() {
        return new J(this.el.parentNode);
    },
    remove: function remove() {
        this.el.parentNode.removeChild(this.el);
        return this;
    },
    next: function next() {
        function nextElementSibling(el) {
            do {
                el = el.nextSibling;
            } while (el && el.nodeType !== 1); // prevSibling can include text nodes
            return el;
        }
        return new J(this.el.nextElementSibling || nextElementSibling(this.el));
    },
    prev: function prev() {
        function previousElementSibling(el) {
            do {
                el = el.previousSibling;
            } while (el && el.nodeType !== 1); // prevSibling can include text nodes
            return el;
        }
        return new J(this.el.previousElementSibling || previousElementSibling(this.el));
    },
    html: function html(html) {
        if (html) {
            this.el.innerHTML = html;
            return this;
        }
        else {
            return this.el.innerHTML;
        }
    },
    siblings: function siblings() {
        var siblings = Array.prototype.slice.call(this.el.parentNode.children);
        for (var i = siblings.length; i--;) {
            if (siblings[i] === this.el) {
                siblings.splice(i, 1);
                break;
            }
        }
        return siblings;
    },
    text: function text() {
        return this.el.textContent || this.el.innerText;
    },
    position: function position() {
        return {
            top: this.el.offsetTop,
            left: this.el.offsetLeft
        };
    },
    css: function css(ruleName) {
        return getComputedStyle(this.el)[ruleName];
    },
};

module.exports = j;
