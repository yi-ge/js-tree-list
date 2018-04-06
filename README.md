# js-tree-list

[![npm version](https://img.shields.io/npm/v/js-tree-list.svg?style=flat-square)](https://www.npmjs.org/package/js-tree-list)
[![build status](https://img.shields.io/travis/yi-ge/js-tree-list.svg?style=flat-square)](https://travis-ci.org/yi-ge/js-tree-list)
[![Codecov](https://img.shields.io/codecov/c/github/yi-ge/js-tree-list.svg?style=flat-square)](https://codecov.io/gh/yi-ge/js-tree-list)
[![code coverage](https://img.shields.io/coveralls/yi-ge/js-tree-list.svg?style=flat-square)](https://coveralls.io/github/yi-ge/js-tree-list)
[![npm](https://img.shields.io/npm/dt/js-tree-list.svg?style=flat-square)](http://npm-stat.com/charts.html?package=js-tree-list)
[![license](https://img.shields.io/github/license/yi-ge/js-tree-list.svg?style=flat-square)](https://github.com/yi-ge/js-tree-list/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/yi-ge/js-tree-list.svg?style=flat-square)](https://github.com/yi-ge/js-tree-list)
[![bitHound](https://img.shields.io/bithound/dependencies/github/yi-ge/js-tree-list.svg?style=flat-square)](https://www.bithound.io/github/yi-ge/js-tree-list)

[![GitHub release](https://img.shields.io/github/release/yi-ge/js-tree-list.svg?style=flat-square)](https://github.com/yi-ge/js-tree-list/releases)
[![Github file size](https://img.shields.io/github/size/yi-ge/js-tree-list/bin/js-tree-list.min.js.svg?style=flat-square)](https://github.com/yi-ge/js-tree-list/blob/master/bin/js-tree-list.min.js)
[![codebeat badge](https://codebeat.co/badges/1e0be277-b609-4336-a4aa-b18c2cb94951)](https://codebeat.co/projects/github-com-yi-ge-js-tree-list-master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fyi-ge%2Fjs-tree-list.svg?type=small)](https://app.fossa.io/projects/git%2Bgithub.com%2Fyi-ge%2Fjs-tree-list?ref=badge_small)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Convert list to tree, managing a tree and its nodes.

Fork from:
https://github.com/DenQ/iron-tree
https://github.com/DenQ/list-to-tree

The author of this project is [DenQ](https://github.com/DenQ). This project has only been improved a little.

## Features

* Convert list to tree.
* Convert tree to list.
* Tree sort by last.
* UUID is support.

## Installation

```
$ npm install js-tree-list
```

## Usage

```js
// JsTreeList.ListToTree Config
const defaultOptions = {
  key_id: 'id',
  key_parent: 'parent',
  key_child: 'child',
  key_last: null,
  uuid: false,
  empty_children: false
}
```

```js
import JsTreeList from "js-tree-list"
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

const tree = new JsTreeList.ListToTree(list, {
  key_id: "id",
  key_parent: "parent",
  key_child: "children",
  key_last: "last"
}).GetTree()

const list = new JsTreeList.TreeToList(tree, {
  key_child: "children",
  empty_children: true
}).GetList()

console.log(tree)
console.log(list)
```

###### Result

    [{
        "id": 1,
        "parent": 0,
        "child": [
            {
                "id": 2,
                "parent": 1,
                "child": [
                    {
                        "id": 4,
                        "parent": 2
                    }, {
                        "id": 5,
                        "parent": 2
                    }
                ]
            },
            {
                "id": 3,
                "parent": 1
            }
        ]
    }, {
        "id": 6,
        "parent": 0
    }, {
        "id": 7,
        "parent": 0,
        "child": [
            {
                "id": 8,
                "parent": 7,
                "child": [
                    {
                        "id": 9,
                        "parent": 8
                    }
                ]
            }
        ]
    }, {
        "id": 10,
        "parent": 0
    }];

# Methods

* **constructor(list, options)**
  * params:
    * `list` - array list with elements. Like `{ id: 5: parent: 1 }`.
    * `options` - optional parameter. Object for describe flags and field names for tree.
* **.GetTree()** This method will be return json tree
  * example:
    ```
      tree.GetTree()
    ```
* **.sort(callback)** The custom sort method
  * callback(a, b) - a and b have `Node` type and have methods: add, remove, get, set, sort, traversal, etc...
  * example:
    ```js
    function compareById(vector) {
      return (a, b) => {
        const aid = Number(a.get("id"))
        const bid = Number(b.get("id"))
        if (aid > bid) {
          return vector ? 1 : -1
        } else if (aid < bid) {
          return vector ? -1 : 1
        } else {
          return 0
        }
      }
    }
    ltt.sort(compareById(false))
    ```

# The Tree and Node Base usage

```js
// create tree
import JsTreeList from "js-tree-list"
const object = { id: 1, title: "Root" }
const tree = new JsTreeList.Tree(object)

// add nodes
const regularObject = { id: 2, title: "Node 2" }
tree.add(parentNode => {
  return parentNode.get("id") === 1
}, regularObject)

// contains node
const targetNode = tree.contains(currentNode => {
  return currentNode.get("id") === 2
})

// remove node
const result = tree.remove(currentNode => {
  return currentNode.get("id") === 2
})

// traversal
const criteria = currentNode => currentNode.get("id") === 1
tree.traversal(criteria, currentNode => {
  currentNode.set("some", true)
})
```

```js
function compareById(vector) {
  return (a, b) => {
    const aid = Number(a.get("id"))
    const bid = Number(b.get("id"))
    if (aid > bid) {
      return vector ? 1 : -1
    } else if (aid < bid) {
      return vector ? -1 : 1
    } else {
      return 0
    }
  }
}
tree.sort(compareById(false)) // desc
```

The following are the other methods available.

---

# Tree

This is the class of tree management

### Properties

* **rootNode** Root tree node
  * type `Node`

### Methods

* **contstructor(object)**
  * params
    * object - json `object`. Optional
  * return `Three`
  * example
  ```js
  const object = { id: 1, title: "Root" }
  const tree = new JsTreeList.Tree(object)
  ```
* **.add(criteria, object)** Adds a node to the tree if the criterion is true
  * params
    * criteria(Node) - `function` or `string`. If `string` then criteria is **"root"**
    * object - content for the node
  * return `Three`
  * examples
  ```js
  const object = { id: 1, title: "Root" }
  const tree = new JsTreeList.Tree()
  const resultTree = tree.add("root", object)
  ```
  ```js
  const regularObject = { id: 2, title: "Node 2" }
  const resultTree = tree.add(parentNode => {
    return parentNode.get("id") === 1
  }, regularObject)
  ```
* **.remove(criteria)** Removes a node from a tree if the criterion is true
  * params
    * criteria(Node) - return `boolean`
  * return `boolean`
  * examples
  ```js
  const result = tree.remove(currentNode => {
    return currentNode.get("id") === 7
  })
  ```
* **.contains(criteria)** Searches for a node in a tree according to the criterion

  * params
    * criteria(Node) - return `boolean`
  * return `Node`
  * examples

  ```js
  const targetNode = tree.contains(currentNode => {
    return currentNode.get("id") === 7
  })
  ```

* **.sort(compare)** Sorts a tree
  * params
    * compare(a:Node, b:Node) - comparison function
  * return `null`
  * examples
  ```js
  function compareById(vector) {
    return (a, b) => {
      const aid = Number(a.get("id"))
      const bid = Number(b.get("id"))
      if (aid > bid) {
        return vector ? 1 : -1
      } else if (aid < bid) {
        return vector ? -1 : 1
      } else {
        return 0
      }
    }
  }
  tree.sort(compareById(false)) //Desc
  ```
* **.move(criteria, destination)** Moves the desired branch or node to the node or branch of the destination, according to the criteria
  * params
    * criteria(Node) - callback
    * destination(Node) - callback
  * return `boolean`
  * examples
  ```js
  const search = currentNode => currentNode.get("id") === 7
  const destination = currentNode => currentNode.get("id") === 3
  const result = tree.move(search, destination)
  ```
* **.traversal(criteria, callback)** Bypasses the tree and, according to the criterion, calls a function for each node
  * params
    * criteria(Node) - return `boolean`
    * callback(Node)
  * return `null`
  * examples
  ```js
  const criteria = currentNode => currentNode.get("id") === 7
  tree.traversal(criteria, currentNode => {
    currentNode.set("some", true)
  })
  ```
  ```js
  tree.traversal(null, currentNode => {
    if (currentNode.get("id") % 2 === 0) {
      currentNode.set("some", true)
    }
  })
  ```
* **.toJson(options)** Represents a tree in the form of a json format
  * params
    * options - `object`. Optional
      * empty_children - Type `boolean`. Allow empty children. Default `true`
      * key_children - Type `string`. Field name for children. Default `children`
  * return `object`
  * examples
  ```js
  const json = tree.toJson()
  ```

---

# Node

This is the node management class

### Properties

* **content** Content of the node
  * type `object`
* **children** Children of the node
  * type `array`
* **length** Number children of the node
  * type `number`

### Methods

* **constructor(json)**

  * params
    * json - simple `json` object
  * examples

  ```js
  import JsTreeList from "js-tree-list"
  const rootContent = {
    id: 1,
    name: "Root"
  }
  let node = new JsTreeList.Node(rootContent)
  ```

* **.add(child)** Adding a child to the node
  * return `Node` - created node
  * params
    * child - type `object`/json
  * examples
  ```js
  const rootContent = {
    id: 1,
    name: "Root"
  }
  let node = new JsTreeList.Node(rootContent)
  const childNode = node.add({ id: 2, name: "Two node" })
  ```
* **.remove(criteria)** Removing a child node according to the criterion

  * return - removed `Node`
  * params
    * criteria - criteria function for removing nodes
  * examples

  ```js
  const removedNodes = node.remove(itemNode => {
    return itemNode.get("id") === 3
  })
  ```

* **.get(path)** Access to node content by field name
  * return `mixed`
  * params
    * path - key name for object in node. For example `id` or `fullname`, etc...
  * examples
  ```js
  node.get("id") // 1
  node.get("name") // "Some name"
  ```
* **.set(path, value)** Setting a value or creating a new field in the contents of a node
  * return `boolean`
  * params
    * path - `String` field name
    * value - `mixed`
  * examples
  ```js
  node.set('id', 100)); // returned `true`. Node.content.id = 100
  node.get('id'); // 100
  ```
* **.sort(compare)** Sorting child nodes
  * return `null`
  * params
    * compare - custom function for sorting
  * examples
  ```js
  function compareById(vector) {
    return (a, b) => {
      const aid = Number(a.get("id"))
      const bid = Number(b.get("id"))
      if (aid > bid) {
        return vector ? 1 : -1
      } else if (aid < bid) {
        return vector ? -1 : 1
      } else {
        return 0
      }
    }
  }
  node.sort(compareById(false))
  ```
* **.traversal(criteria, callback)** Bypassing child nodes according to the criterion and applying function to them
  * return `null`
  * params
    * criteria - `function` criteria each nodes
    * callback - `function` fire when criteria is true for node
  * examples
  ```js
  // for all nodes
  node.traversal(null, currentNode => {
    const name = currentNode.get("name")
    currentNode.set("name", `${name}!`) // Last symbol "!"
  })
  ```
  ```js
  // only for node.id == 3
  node.traversal(
    currentNode => currentNode.get("id") === 3,
    currentNode => {
      const name = currentNode.get("name")
      currentNode.set("name", `${name}!`) // Last symbol "!"
    }
  )
  ```

---
