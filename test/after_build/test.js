import JsTreeList from '../../src/index'
import { Node, Tree } from '../../src/index'
console.log(Node)
console.log(Tree)
// const JsTreeList = require('../../lib/index')
console.log(JsTreeList)
var list = [
  {
    id: 1,
    parent: 0
  },
  {
    id: 2,
    parent: 1
  },
  {
    id: 3,
    parent: 1
  },
  {
    id: 4,
    parent: 2
  },
  {
    id: 5,
    parent: 2
  },
  {
    id: 6,
    parent: 0
  },
  {
    id: 7,
    parent: 0
  },
  {
    id: 8,
    parent: 7
  },
  {
    id: 9,
    parent: 8
  },
  {
    id: 10,
    parent: 0
  }
]

var ltt = new JsTreeList(list, {
  key_id: 'id',
  key_parent: 'parent'
})

var tree = ltt.GetTree()

console.log(tree)
