import LTT from '../../../src/list-to-tree'
import TTL from '../../../src/tree-to-list'

describe('Base usage:', () => {
  let tree = null
  let list = null
  const key_id = 'id'
  const key_parent = 'parent'
  const key_child = 'children'

  beforeEach(() => {
    let originalList = [
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
        parent: 4
      }
    ]

    tree = new LTT(originalList, {
      key_id,
      key_parent,
      key_child
    }).GetTree()

    list = new TTL(tree, {
      key_id,
      key_parent,
      key_child
    }).GetList()
  })

  test('LTT is workly', () => {
    expect(tree.length).toBe(1)
  })

  test('TTL is workly', () => {
    expect(list.length).toBe(5)
  })

  test('Empty Children', () => {
    let listNoChild = new TTL(tree, {
      key_id,
      key_parent,
      key_child,
      empty_children: true
    }).GetList()

    let noChild = true
    for (const n in listNoChild) {
      if (listNoChild[n][key_child]) {
        noChild = false
        break
      }
    }
    expect(noChild).toBe(true)
  })

  test('No Empty Children', () => {
    let listHaveChild = new TTL(tree, {
      key_id,
      key_parent,
      key_child,
      empty_children: false
    }).GetList()

    let noChild = true
    for (const n in listHaveChild) {
      if (listHaveChild[n][key_child]) {
        noChild = false
        break
      }
    }
    expect(noChild).toBe(false)
  })
})