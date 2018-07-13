import LTT from './tree'

const defaultOptions = {
  key_id: 'id',
  key_parent: 'parent',
  key_child: 'child',
  key_last: null,
  uuid: false,
  empty_children: false
}

function sortBy (collection, propertyA, propertyB) {
  return collection.sort(function (a, b) {
    if (a[propertyB] < b[propertyB]) {
      if (a[propertyA] > b[propertyA]) {
        return 1
      }
      return -1
    } else {
      if (a[propertyA] < b[propertyA]) {
        return -1
      }
      return 1
    }
  })
}

export default class ListToTree {
  constructor(list, options = {}) {
    const _list = list.map(item => item)

    options = Object.assign({}, defaultOptions, options)
    this.options = options
    const { key_id, key_parent, uuid } = options

    if (uuid === false) {
      sortBy(_list, key_parent, key_id)
    }

    const tree = new LTT({
      [key_id]: 0
    })
    _list.forEach((item, index) => {
      tree.add(parentNode => {
        return parentNode.get(key_id) === item[key_parent] || item[key_parent] === null
      }, item)
    })

    this.tree = tree
  }

  sort (criteria) {
    this.tree.sort(criteria)
  }

  last (val, key_id, key_last, key_child) {
    for (let n in val) {
      if (val[n][key_child] && val[n][key_child].length) { // 如果有子元素，则先对子元素进行处理
        this.last(val[n][key_child], key_id, key_last, key_child)
      }
      if (val[n][key_last] !== 0) {
        if (((n - 1) >= 0 && val[n - 1][key_id] !== val[n][key_last]) || (n - 1) < 0) {
          const tmp = val.splice(n, 1) // 从该元素位置删除元素并将已删除的元素放置于新数组(tmp)
          val.splice(n + 1, 0, tmp[0]) // 在指定ID元素后面添加被删除的元素
        }
      }
    }
  }

  GetTree () {
    const { key_id, key_child, empty_children, key_last } = this.options

    let json = this.tree.toJson({
      key_children: key_child,
      empty_children: empty_children
    })[key_child]

    if (key_last) {
      this.last(json, key_id, key_last, key_child)
    }
    return json
  }
}
