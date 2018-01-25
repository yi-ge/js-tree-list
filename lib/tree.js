'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tree = function () {
  function Tree() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    (0, _classCallCheck3.default)(this, Tree);

    this.rootNode = null;
    if (object) {
      this.rootNode = new _node2.default(object);
    }
  }

  // only for rootNode


  (0, _createClass3.default)(Tree, [{
    key: 'get',
    value: function get(path) {
      return this.rootNode.get(path);
    }

    // only for rootNode

  }, {
    key: 'set',
    value: function set(path, value) {
      this.rootNode.set(path, value);
    }
  }, {
    key: 'add',
    value: function add(callback, object) {
      var type = typeof callback === 'undefined' ? 'undefined' : (0, _typeof3.default)(callback);
      if (type === 'string' && callback === 'root') {
        this.rootNode = new _node2.default(object);
        return this;
      } else if (type === 'function') {
        var target = (0, _utils.searchNode)(this, null, callback);
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
      return (0, _utils.searchNode)(this, null, criteria);
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
      (0, _utils.traversalTree)(this, null, criteria, callback);
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
      options = (0, _assign2.default)(optionsDefault, options);
      var result = (0, _utils.serializeTree)(this, null, [], options);

      if (!options.empty_children) {
        (0, _utils.removeEmptyChildren)(result, null, options);
      }

      if (result && result.length > 0) {
        return result[0];
      }
    }
  }]);
  return Tree;
}();

exports.default = Tree;