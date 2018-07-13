(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['js-tree-list'] = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var Node = function () {
  function Node(content) {
    classCallCheck(this, Node);

    this.content = content;
    this.children = [];
    this.length = 0;
  }

  createClass(Node, [{
    key: 'get',
    value: function get$$1(fieldKey) {
      if (typeof this.content[fieldKey] !== 'undefined') {
        return this.content[fieldKey];
      }
    }
  }, {
    key: 'set',
    value: function set$$1(fieldKey, value) {
      return !!(this.content[fieldKey] = value);
    }
  }, {
    key: 'add',
    value: function add(child) {
      var node = child instanceof Node ? child : new Node(child);
      node.parent = this;
      this.length++;
      this.children.push(node);
      return node;
    }
  }, {
    key: 'remove',
    value: function remove(callback) {
      var index = this.children.findIndex(callback);
      if (index > -1) {
        var removeItems = this.children.splice(index, 1);
        this.length--;
        return removeItems;
      }
      return [];
    }
  }, {
    key: 'sort',
    value: function sort(compare) {
      return this.children.sort(compare);
    }
  }, {
    key: 'traversal',
    value: function traversal(criteria, callback) {
      criteria = criteria || function () {
        return true;
      };
      this.children.filter(criteria).forEach(callback);
    }
  }]);
  return Node;
}();

/**
 * node-compare-by-id
 * Return callback to compare nodes by id
 * @param  boolean  vector If vector is true then sort asc else desc
 * @return function Compare function
 */


/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
var removeEmptyChildren = function removeEmptyChildren(jTree) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments[2];
  var key_children = options.key_children;

  node = node || jTree[0];
  if (node[key_children].length === 0) {
    delete node[key_children];
  } else {
    node[key_children].forEach(function (item) {
      removeEmptyChildren(jTree, item, options);
    });
  }
};

/**
 * search-node
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} options
 */
var searchNode = function searchNode(tree, node, criteria, options) {
  var currentNode = node || tree.rootNode;
  if (criteria(currentNode)) {
    return currentNode;
  }
  var children = currentNode.children;
  var target = null;
  for (var i = 0; i < children.length; i++) {
    var item = children[i];
    target = searchNode(tree, item, criteria);
    if (target) {
      return target;
    }
  }
};

/**
 * showTree
 * @param {*} tree
 * @param {*} node
 * @param {*} level
 */


/**
 * traversal-tree
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} callback
 */
var traversalTree = function traversalTree(tree) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var criteria = arguments[2];
  var callback = arguments[3];

  var currentNode = node || tree.rootNode;
  if (!node) {
    if (typeof criteria === 'function' && criteria(currentNode)) {
      callback(currentNode);
    } else if (criteria === null) {
      callback(currentNode);
    }
  }
  currentNode.traversal(criteria, callback);
  var children = currentNode.children;

  children.forEach(function (item) {
    traversalTree(tree, item, criteria, callback);
  });
};

/**
 * serializeTree
 * @param {*} tree
 * @param {*} node
 * @param {*} target
 * @param {*} options
 */
var serializeTree = function serializeTree(tree) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var options = arguments[3];
  var key_children = options.key_children;

  node = node || tree.rootNode;
  if (!node) {
    return null;
  }
  var index = target.push(Object.assign(defineProperty({}, key_children, []), node.content));
  node.children.forEach(function (item) {
    serializeTree(tree, item, target[index - 1][key_children], options);
  });
  return target;
};

var Tree = function () {
  function Tree() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    classCallCheck(this, Tree);

    this.rootNode = null;
    if (object) {
      this.rootNode = new Node(object);
    }
  }

  // only for rootNode


  createClass(Tree, [{
    key: 'get',
    value: function get$$1(path) {
      return this.rootNode.get(path);
    }

    // only for rootNode

  }, {
    key: 'set',
    value: function set$$1(path, value) {
      this.rootNode.set(path, value);
    }
  }, {
    key: 'add',
    value: function add(callback, object) {
      var type = typeof callback === 'undefined' ? 'undefined' : _typeof(callback);
      if (type === 'string' && callback === 'root') {
        this.rootNode = new Node(object);
        return this;
      } else if (type === 'function') {
        var target = searchNode(this, null, callback);
        if (target && target.add(object)) {
          return this;
        } else {
          console.log('Warning', object);
        }
      }
    }
  }, {
    key: 'contains',
    value: function contains(criteria) {
      return searchNode(this, null, criteria);
    }
  }, {
    key: 'remove',
    value: function remove(criteria) {
      var targetNode = this.contains(criteria);
      if (targetNode) {
        return !!targetNode.parent.remove(criteria);
      }
      return false;
    }
  }, {
    key: 'move',
    value: function move(search, destination) {
      var targetNode = this.contains(search);
      if (targetNode && this.remove(search)) {
        var destinationNode = this.contains(destination);
        return !!destinationNode.add(targetNode);
      }
      return false;
    }
  }, {
    key: 'traversal',
    value: function traversal(criteria, callback) {
      traversalTree(this, null, criteria, callback);
    }
  }, {
    key: 'sort',
    value: function sort(compare) {
      this.traversal(null, function (currentNode) {
        currentNode.sort(compare);
      });
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var optionsDefault = {
        key_children: 'children',
        empty_children: true
      };
      options = Object.assign(optionsDefault, options);
      var result = serializeTree(this, null, [], options);

      if (!options.empty_children) {
        removeEmptyChildren(result, null, options);
      }

      if (result && result.length > 0) {
        return result[0];
      } else {
        return [];
      }
    }
  }]);
  return Tree;
}();

var defaultOptions = {
  key_id: 'id',
  key_parent: 'parent',
  key_child: 'child',
  key_last: null,
  uuid: false,
  empty_children: false
};

function sortBy(collection, propertyA, propertyB) {
  return collection.sort(function (a, b) {
    if (a[propertyB] < b[propertyB]) {
      if (a[propertyA] > b[propertyA]) {
        return 1;
      }
      return -1;
    } else {
      if (a[propertyA] < b[propertyA]) {
        return -1;
      }
      return 1;
    }
  });
}

var ListToTree = function () {
  function ListToTree(list) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, ListToTree);

    var _list = list.map(function (item) {
      return item;
    });

    options = Object.assign({}, defaultOptions, options);
    this.options = options;
    var _options = options,
        key_id = _options.key_id,
        key_parent = _options.key_parent,
        uuid = _options.uuid;


    if (uuid === false) {
      sortBy(_list, key_parent, key_id);
    }

    var tree = new Tree(defineProperty({}, key_id, 0));
    _list.forEach(function (item, index) {
      tree.add(function (parentNode) {
        return parentNode.get(key_id) === item[key_parent] || item[key_parent] === null;
      }, item);
    });

    this.tree = tree;
  }

  createClass(ListToTree, [{
    key: 'sort',
    value: function sort(criteria) {
      this.tree.sort(criteria);
    }
  }, {
    key: 'last',
    value: function last(val, key_id, key_last, key_child) {
      for (var n in val) {
        if (val[n][key_child] && val[n][key_child].length) {
          // 如果有子元素，则先对子元素进行处理
          this.last(val[n][key_child], key_id, key_last, key_child);
        }
        if (val[n][key_last] !== 0) {
          if (n - 1 >= 0 && val[n - 1][key_id] !== val[n][key_last] || n - 1 < 0) {
            var tmp = val.splice(n, 1); // 从该元素位置删除元素并将已删除的元素放置于新数组(tmp)
            val.splice(n + 1, 0, tmp[0]); // 在指定ID元素后面添加被删除的元素
          }
        }
      }
    }
  }, {
    key: 'GetTree',
    value: function GetTree() {
      var _options2 = this.options,
          key_id = _options2.key_id,
          key_child = _options2.key_child,
          empty_children = _options2.empty_children,
          key_last = _options2.key_last;


      var json = this.tree.toJson({
        key_children: key_child,
        empty_children: empty_children
      })[key_child];

      if (key_last) {
        this.last(json, key_id, key_last, key_child);
      }
      return json;
    }
  }]);
  return ListToTree;
}();

var index = {
  ListToTree: ListToTree,
  Tree: Tree,
  Node: Node
};

return index;

})));
