export default class Node {
  constructor (content) {
    this.content = content
    this.children = []
    this.length = 0
  }

  get (fieldKey) {
    if (typeof this.content[fieldKey] !== 'undefined') {
      return this.content[fieldKey]
    }
  }

  set (fieldKey, value) {
    return !!(this.content[fieldKey] = value)
  }

  add (child) {
    const node = child instanceof Node ? child : new Node(child)
    node.parent = this
    this.length++
    this.children.push(node)
    return node
  }

  remove (callback) {
    const index = this.children.findIndex(callback)
    if (index > -1) {
      const removeItems = this.children.splice(index, 1)
      this.length--
      return removeItems
    }
    return []
  }

  sort (compare) {
    return this.children.sort(compare)
  }

  traversal (criteria, callback) {
    criteria = criteria || (() => true)
    this.children.filter(criteria).forEach(callback)
  }
}
