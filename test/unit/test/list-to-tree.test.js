import LTT from '../../../src/list-to-tree'
import { compareById, showTree } from '../../../src/utils'

describe('Base usage:', () => {
  var tree = null
  var key_id = 'id'
  var key_parent = 'parent'

  beforeEach(() => {
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
      }
    ]
    var ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(1)
  })

  test('First node check id', () => {
    var firstNode = tree[0]
    expect(firstNode[key_id]).toBe(1)
  })

  test('First node check parent', () => {
    var firstNode = tree[0]
    expect(firstNode[key_parent]).toBe(0)
  })

  test('First node check child', () => {
    var child = tree[0].child
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    var child = tree[0].child
    var node = child[0]
    expect(node[key_id]).toBe(2)
  })

  test('First child - check parent', () => {
    var child = tree[0].child
    var node = child[0]
    expect(node[key_parent]).toBe(1)
  })

  test('Child node not have a child key', () => {
    var child = tree[0].child
    var node = child[0]
    expect('child' in node).toBe(false)
  })
})

describe('Big tree:', () => {
  var tree = null

  var key_id = 'id'

  var key_parent = 'parent'

  var key_child = 'child'

  beforeEach(() => {
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
    var ltt = new LTT(list, {
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
    var firstNode = tree[0]
    expect(firstNode[key_id]).toBe(1)
  })

  test('First node check parent', () => {
    var firstNode = tree[0]
    expect(firstNode[key_parent]).toBe(0)
  })

  test('First node check child', () => {
    var child = tree[0][key_child]
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    var child = tree[0][key_child]
    var node = child[0]
    expect(node[key_id]).toBe(2)
  })

  test('First child - check parent', () => {
    var child = tree[0][key_child]
    var node = child[0]
    expect(node[key_parent]).toBe(1)
  })

  test('Child node have a child key', () => {
    var child = tree[0][key_child]
    var node = child[0]
    expect(key_child in node).toBe(true)
  })
})

describe('Default keys:', () => {
  var tree = null

  beforeEach(() => {
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
    var ltt = new LTT(list)
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(4)
  })

  test('First node check id', () => {
    var firstNode = tree[0]
    expect(firstNode.id).toBe(1)
  })

  test('First node check parent', () => {
    var firstNode = tree[0]
    expect(firstNode.parent).toBe(0)
  })

  test('First node check child', () => {
    var child = tree[0].child
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    var child = tree[0].child
    var node = child[0]
    expect(node.id).toBe(2)
  })

  test('First child - check parent', () => {
    var child = tree[0].child
    var node = child[0]
    expect(node.parent).toBe(1)
  })

  test('Child node have a child key', () => {
    var child = tree[0].child
    var node = child[0]
    expect('child' in node).toBe(true)
  })
})

describe('Disorderly keys:', () => {
  var tree = null

  beforeEach(() => {
    var list = [
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
    var ltt = new LTT(list)
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(4)
  })

  test('First node check id', () => {
    var firstNode = tree[0]
    expect(firstNode.id).toBe(1)
  })

  test('First node check parent', () => {
    var firstNode = tree[0]
    expect(firstNode.parent).toBe(0)
  })

  test('First node check child', () => {
    var child = tree[0].child
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    var child = tree[0].child
    var node = child[0]
    expect(node.id).toBe(2)
  })

  test('First child - check parent', () => {
    var child = tree[0].child
    var node = child[0]
    expect(node.parent).toBe(1)
  })

  test('Child node have a child key', () => {
    var child = tree[0].child
    var node = child[0]
    expect('child' in node).toBe(true)
  })
})

describe('Other keys:', () => {
  var tree = null

  var key_id = 'xid'

  var key_parent = 'xparent'

  var key_child = 'xchild'

  beforeEach(() => {
    var list = [
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
    var ltt = new LTT(list, {
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
    var firstNode = tree[0]
    expect(firstNode[key_id]).toBe(1)
  })

  test('First node check parent', () => {
    var firstNode = tree[0]
    expect(firstNode[key_parent]).toBe(0)
  })

  test('First node check child', () => {
    var child = tree[0][key_child]
    expect(child.length).toBe(2)
  })

  test('First child - check id', () => {
    var child = tree[0][key_child]
    var node = child[0]
    expect(node[key_id]).toBe(2)
  })

  test('First child - check parent', () => {
    var child = tree[0][key_child]
    var node = child[0]
    expect(node[key_parent]).toBe(1)
  })

  test('Child node not have a child key', () => {
    var child = tree[0][key_child]
    var node = child[0]
    expect('child' in node).toBe(false)
  })
})

describe('Big tree:', () => {
  var tree = null
  var list = []

  var key_id = 'id'

  var key_parent = 'parent'

  var key_child = 'child'

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
    var ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    tree = ltt.GetTree()
  })

  test('Sort tree', () => {
    var ltt = new LTT(list, {
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
  var tree = null
  var list = []

  var key_id = 'id'

  var key_parent = 'parent'

  var key_child = 'child'

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
    var ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    tree = ltt.GetTree()
  })

  test('Sort tree', () => {
    var ltt = new LTT(list, {
      key_id: key_id,
      key_parent: key_parent,
      key_child: key_child
    })
    ltt.sort(compareById(false))
    const json = ltt.GetTree()

    console.log(json)
    showTree(json)
    expect(json[0].id).toBe(1)
    expect(json[json.length - 1].id).toBe(1)
    expect(json[0].child[0].id).toBe(3)
  })
})
