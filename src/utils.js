/**
 * node-compare-by-id
 * Return callback to compare nodes by id
 * @param  boolean  vector If vector is true then sort asc else desc
 * @return function Compare function
 */
export let compareById = vector => {
  return (a, b) => {
    const aid = Number(a.get('id'))
    const bid = Number(b.get('id'))
    if (aid > bid) {
      return vector ? 1 : -1
    } else if (aid < bid) {
      return vector ? -1 : 1
    } else {
      return 0
    }
  }
}

/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
export let removeEmptyChildren = (jTree, node = null, options) => {
  const { key_children } = options
  node = node || jTree[0]
  if (node[key_children].length === 0) {
    delete node[key_children]
  } else {
    node[key_children].forEach(item => {
      removeEmptyChildren(jTree, item, options)
    })
  }
}

/**
 * search-node
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} options
 */
export let searchNode = (tree, node, criteria, options) => {
  const currentNode = node || tree.rootNode
  if (criteria(currentNode)) {
    return currentNode
  }
  const children = currentNode.children
  let target = null
  for (let i = 0; i < children.length; i++) {
    const item = children[i]
    target = searchNode(tree, item, criteria)
    if (target) {
      return target
    }
  }
}

/**
 * showTree
 * @param {*} tree
 * @param {*} node
 * @param {*} level
 */
export let showTree = (tree, node = null, level = 1) => {
  node = node || tree[0]
  if (node && node.content) {
    console.log(new Array(level).join('\t'), node.content)
  }
  if (node && node.children) {
    node.children.forEach(item => {
      showTree(tree, item, level + 1)
    })
  }
}

/**
 * traversal-tree
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} callback
 */
export let traversalTree = (tree, node = null, criteria, callback) => {
  const currentNode = node || tree.rootNode
  if (!node) {
    if (typeof criteria === 'function' && criteria(currentNode)) {
      callback(currentNode)
    } else if (criteria === null) {
      callback(currentNode)
    }
  }
  currentNode.traversal(criteria, callback)
  const children = currentNode.children

  children.forEach(item => {
    traversalTree(tree, item, criteria, callback)
  })
}

/**
 * serializeTree
 * @param {*} tree
 * @param {*} node
 * @param {*} target
 * @param {*} options
 */
export let serializeTree = (tree, node = null, target = [], options) => {
  const { key_children } = options
  node = node || tree.rootNode
  if (!node) {
    return null
  }
  const index = target.push(Object.assign({ [key_children]: [] }, node.content))
  node.children.forEach(item => {
    serializeTree(tree, item, target[index - 1][key_children], options)
  })
  return target
}
