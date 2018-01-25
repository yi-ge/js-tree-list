'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node = function () {
  function Node(content) {
    (0, _classCallCheck3.default)(this, Node);

    this.content = content;
    this.children = [];
    this.length = 0;
  }

  (0, _createClass3.default)(Node, [{
    key: 'get',
    value: function get(fieldKey) {
      if (typeof this.content[fieldKey] !== 'undefined') {
        return this.content[fieldKey];
      }
    }
  }, {
    key: 'set',
    value: function set(fieldKey, value) {
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

exports.default = Node;