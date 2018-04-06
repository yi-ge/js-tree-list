import LTT from './tree'

const defaultOptions = {
  key_id: 'id',
  key_parent: 'parent',
  key_child: 'child',
  key_last: null,
  uuid: false,
  empty_children: false
}

export default class TreeToList {
  constructor(tree, options = {}) {
    this.options = Object.assign({}, defaultOptions, options)
    this.tree = tree
  }

  toList (tree) {
    let tmp = []
    // console.log(tree)
    const { key_child, empty_children } = this.options
    for (let n in tree) {
      if (tree[n][key_child] && tree[n][key_child].length) {
        tmp = [...tmp, ...this.toList(tree[n][key_child])]
      }

      if (empty_children) {
        delete tree[n][key_child]
      }

      tmp.push(tree[n])
    }
    return tmp
  }

  GetList () {
    return this.toList(this.tree)
  }
}
