'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeTree = exports.traversalTree = exports.showTree = exports.searchNode = exports.removeEmptyChildren = exports.compareById = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * node-compare-by-id
 * Return callback to compare nodes by id
 * @param  boolean  vector If vector is true then sort asc else desc
 * @return function Compare function
 */
var compareById = exports.compareById = function compareById(vector) {
  return function (a, b) {
    var aid = Number(a.get('id'));
    var bid = Number(b.get('id'));
    if (aid > bid) {
      return vector ? 1 : -1;
    } else if (aid < bid) {
      return vector ? -1 : 1;
    } else {
      return 0;
    }
  };
};

/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
var removeEmptyChildren = exports.removeEmptyChildren = function removeEmptyChildren(jTree) {
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
var searchNode = exports.searchNode = function searchNode(tree, node, criteria, options) {
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
var showTree = exports.showTree = function showTree(tree) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  node = node || tree[0];
  if (node && node.content) {
    console.log(new Array(level).join('\t'), node.content);
  }
  if (node && node.children) {
    node.children.forEach(function (item) {
      showTree(tree, item, level + 1);
    });
  }
};

/**
 * traversal-tree
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} callback
 */
var traversalTree = exports.traversalTree = function traversalTree(tree) {
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
var serializeTree = exports.serializeTree = function serializeTree(tree) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var options = arguments[3];
  var key_children = options.key_children;

  node = node || tree.rootNode;
  var index = target.push((0, _assign2.default)((0, _defineProperty3.default)({}, key_children, []), node.content));
  node.children.forEach(function (item) {
    serializeTree(tree, item, target[index - 1][key_children], options);
  });
  return target;
};