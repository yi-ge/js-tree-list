'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  key_id: 'id',
  key_parent: 'parent',
  key_child: 'child',
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
    (0, _classCallCheck3.default)(this, ListToTree);

    var _list = list.map(function (item) {
      return item;
    });

    options = (0, _assign2.default)({}, defaultOptions, options);
    this.options = options;
    var _options = options,
        key_id = _options.key_id,
        key_parent = _options.key_parent;


    sortBy(_list, key_parent, key_id);
    var tree = new _tree2.default((0, _defineProperty3.default)({}, key_id, 0));
    _list.forEach(function (item, index) {
      tree.add(function (parentNode) {
        return parentNode.get(key_id) === item[key_parent];
      }, item);
    });

    this.tree = tree;
  }

  (0, _createClass3.default)(ListToTree, [{
    key: 'sort',
    value: function sort(criteria) {
      this.tree.sort(criteria);
    }
  }, {
    key: 'GetTree',
    value: function GetTree() {
      var _options2 = this.options,
          key_child = _options2.key_child,
          empty_children = _options2.empty_children;

      return this.tree.toJson({
        key_children: key_child,
        empty_children: false
      })[key_child];
    }
  }]);
  return ListToTree;
}();

exports.default = ListToTree;