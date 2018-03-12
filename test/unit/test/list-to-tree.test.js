import LTT from '../../../src/list-to-tree'
import { compareById, showTree } from '../../../src/utils'

describe('Base usage:', () => {
  let tree = null
  let key_id = 'id'
  let key_parent = 'parent'

  beforeEach(() => {
    let list = [
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
      }
    ]
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(1)
  })

  test('First node check id', () => {
    let firstNode = tree[0]
    expect(firstNode[key_id]).toBe(1)
  })

  test('First node check parent', () => {
    let firstNode = tree[0]
    expect(firstNode[key_parent]).toBe(0)
  })

  test('First node check child', () => {
    let child = tree[0].child
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    let child = tree[0].child
    let node = child[0]
    expect(node[key_id]).toBe(2)
  })

  test('First child - check parent', () => {
    let child = tree[0].child
    let node = child[0]
    expect(node[key_parent]).toBe(1)
  })

  test('Child node not have a child key', () => {
    let child = tree[0].child
    let node = child[0]
    expect('child' in node).toBe(false)
  })
})

describe('Big tree:', () => {
  let tree = null

  let key_id = 'id'

  let key_parent = 'parent'

  let key_child = 'child'

  beforeEach(() => {
    let list = [
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
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(4)
  })

  test('First node check id', () => {
    let firstNode = tree[0]
    expect(firstNode[key_id]).toBe(1)
  })

  test('First node check parent', () => {
    let firstNode = tree[0]
    expect(firstNode[key_parent]).toBe(0)
  })

  test('First node check child', () => {
    let child = tree[0][key_child]
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    let child = tree[0][key_child]
    let node = child[0]
    expect(node[key_id]).toBe(2)
  })

  test('First child - check parent', () => {
    let child = tree[0][key_child]
    let node = child[0]
    expect(node[key_parent]).toBe(1)
  })

  test('Child node have a child key', () => {
    let child = tree[0][key_child]
    let node = child[0]
    expect(key_child in node).toBe(true)
  })
})

describe('Default keys:', () => {
  let tree = null

  beforeEach(() => {
    let list = [
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
    let ltt = new LTT(list)
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(4)
  })

  test('First node check id', () => {
    let firstNode = tree[0]
    expect(firstNode.id).toBe(1)
  })

  test('First node check parent', () => {
    let firstNode = tree[0]
    expect(firstNode.parent).toBe(0)
  })

  test('First node check child', () => {
    let child = tree[0].child
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    let child = tree[0].child
    let node = child[0]
    expect(node.id).toBe(2)
  })

  test('First child - check parent', () => {
    let child = tree[0].child
    let node = child[0]
    expect(node.parent).toBe(1)
  })

  test('Child node have a child key', () => {
    let child = tree[0].child
    let node = child[0]
    expect('child' in node).toBe(true)
  })
})

describe('Disorderly keys:', () => {
  let tree = null

  beforeEach(() => {
    let list = [
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
      },
      {
        id: 1,
        parent: 0
      }
    ]
    let ltt = new LTT(list)
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(4)
  })

  test('First node check id', () => {
    let firstNode = tree[0]
    expect(firstNode.id).toBe(1)
  })

  test('First node check parent', () => {
    let firstNode = tree[0]
    expect(firstNode.parent).toBe(0)
  })

  test('First node check child', () => {
    let child = tree[0].child
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    let child = tree[0].child
    let node = child[0]
    expect(node.id).toBe(2)
  })

  test('First child - check parent', () => {
    let child = tree[0].child
    let node = child[0]
    expect(node.parent).toBe(1)
  })

  test('Child node have a child key', () => {
    let child = tree[0].child
    let node = child[0]
    expect('child' in node).toBe(true)
  })
})

describe('Other keys:', () => {
  let tree = null

  let key_id = 'xid'

  let key_parent = 'xparent'

  let key_child = 'xchild'

  beforeEach(() => {
    let list = [
      {
        xid: 1,
        xparent: 0
      },
      {
        xid: 2,
        xparent: 1
      },
      {
        xid: 3,
        xparent: 1
      }
    ]
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(1)
  })

  test('First node check id', () => {
    let firstNode = tree[0]
    expect(firstNode[key_id]).toBe(1)
  })

  test('First node check parent', () => {
    let firstNode = tree[0]
    expect(firstNode[key_parent]).toBe(0)
  })

  test('First node check child', () => {
    let child = tree[0][key_child]
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    let child = tree[0][key_child]
    let node = child[0]
    expect(node[key_id]).toBe(2)
  })

  test('First child - check parent', () => {
    let child = tree[0][key_child]
    let node = child[0]
    expect(node[key_parent]).toBe(1)
  })

  test('Child node not have a child key', () => {
    let child = tree[0][key_child]
    let node = child[0]
    expect('child' in node).toBe(false)
  })
})

describe('Big tree:', () => {
  let tree = null
  let list = []

  let key_id = 'id'

  let key_parent = 'parent'

  let key_child = 'child'

  beforeEach(() => {
    list = [
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
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    tree = ltt.GetTree()
  })

  test('Sort tree', () => {
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    ltt.sort(compareById(false))
    const json = ltt.GetTree()

    expect(json[0].id).toBe(10)
    expect(json[json.length - 1].id).toBe(1)
    expect(json[1].child[0].id).toBe(8)
  })
})

describe('Other tree:', () => {
  let tree = null
  let list = []

  let key_id = 'id'

  let key_parent = 'parent'

  let key_child = 'child'

  beforeEach(() => {
    list = [
      {
        id: 1,
        parent: 0,
        content: 1
      },
      {
        id: 2,
        parent: 1,
        content: 1
      },
      {
        id: 3,
        parent: 1,
        content: 2
      }
    ]
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    tree = ltt.GetTree()
  })

  test('Sort tree', () => {
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    ltt.sort(compareById(false))
    const json = ltt.GetTree()

    showTree(json)
    expect(json[0].id).toBe(1)
    expect(json[json.length - 1].id).toBe(1)
    expect(json[0].child[0].id).toBe(3)
  })
})

describe('No parent:', () => {
  let tree = null
  let key_id = 'id'
  let key_parent = 'parent'

  beforeEach(() => {
    let list = [
      {
        id: 1,
        parent: ''
      },
      {
        id: 2,
        parent: 0
      },
      {
        id: 3,
        parent: 0
      }
    ]
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(2)
  })
})

describe('Parent not equal id:', () => {
  let tree = null
  let key_id = 'id'
  let key_parent = 'parent'

  beforeEach(() => {
    let list = [
      {
        id: 4,
        parent: 0
      },
      {
        id: 2,
        parent: 3
      },
      {
        id: 3,
        parent: 5
      }
    ]
    let ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(1)
  })
})
