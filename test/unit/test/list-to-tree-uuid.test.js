import LTT from '../../../src/list-to-tree'
import { compareById, showTree } from '../../../src/utils'
import uuidv4 from 'uuid/v4'

describe('UUID List to Tree:', () => {
  let tree = null

  beforeEach(() => {
    // let list = Array.apply(null, { length: 30 }).map(() => {
    //   return {
    //     id: uuidv4(),
    //     parent: ''
    //   }
    // })

    let list = [
      {
        id: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b',
        parent: 0
      },
      {
        id: 'cb33614c-58d8-4d7d-930d-40bfff15de26',
        parent: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b'
      },
      {
        id: 'd9702c3b-405d-4cc6-ad61-b7bca1efd710',
        parent: 'cb33614c-58d8-4d7d-930d-40bfff15de26'
      }
    ]

    // console.log(list)

    let ltt = new LTT(list, {
      key_id: 'id',
      key_parent: 'parent',
      key_child: 'children',
      uuid: true
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(1)
  })

  // test('First node check id', () => {
  //   let firstNode = tree[0]
  //   expect(firstNode.id).toBe(1)
  // })

  // test('First node check parent', () => {
  //   let firstNode = tree[0]
  //   expect(firstNode.parent).toBe(0)
  // })

  // test('First node check child', () => {
  //   let child = tree[0].child
  //   expect(child.length).toBe(2)
  // })

  // test('First child - check id', () => {
  //   let child = tree[0].child
  //   let node = child[0]
  //   expect(node.id).toBe(2)
  // })

  // test('First child - check parent', () => {
  //   let child = tree[0].child
  //   let node = child[0]
  //   expect(node.parent).toBe(1)
  // })

  // test('Child node have a child key', () => {
  //   let child = tree[0].child
  //   let node = child[0]
  //   expect('child' in node).toBe(true)
  // })
})

describe('ID is Equal:', () => {
  let list = []

  let key_id = 'id'
  let key_parent = 'parent'
  let key_child = 'children'

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
        id: 2,
        parent: 1
      }
    ]
  })

  test('Sort tree', () => {
    let ltt = new LTT(list, {
      key_id,
      key_parent,
      key_child
    })
    ltt.sort(compareById(false))
    const json = ltt.GetTree()
    showTree(json)
    expect(typeof json).toBe('object')
  })
})

describe('UUID List to Tree:', () => {
  let tree = null

  beforeEach(() => {
    // let listTmp = Array.apply(null, { length: 30 }).map(() => {
    //   return {
    //     id: uuidv4(),
    //     parent: ''
    //   }
    // })
    // console.log(listTmp)

    let list = [
      {
        id: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b',
        parent: 0,
        last: '3b83e600-7115-48d4-85e0-8e422d59ebc8'
      },
      {
        id: '3b83e600-7115-48d4-85e0-8e422d59ebc8',
        parent: 0,
        last: 0
      },
      {
        id: '9d70510c-9c4f-42e3-8858-05457ac65b2c',
        parent: 0,
        last: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b'
      },
      {
        id: 'cb33614c-58d8-4d7d-930d-40bfff15de26',
        parent: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b',
        last: 0,
      },
      {
        id: 'd9702c3b-405d-4cc6-ad61-b7bca1efd710',
        parent: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b',
        last: 'cb33614c-58d8-4d7d-930d-40bfff15de26'
      },
      {
        id: '5cd82d47-fd4e-48b5-a00a-1aaf74f65cca',
        parent: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b',
        last: '3a501280-9a23-454e-a022-6131c6b9af9b'
      },
      {
        id: '3a501280-9a23-454e-a022-6131c6b9af9b',
        parent: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b',
        last: 'd9702c3b-405d-4cc6-ad61-b7bca1efd710'
      }
    ]

    let ltt = new LTT(list, {
      key_id: 'id',
      key_parent: 'parent',
      key_child: 'children',
      key_last: 'last',
      uuid: true
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    console.log(tree)
    console.log(tree[1]['children'])

    expect(tree.length).toBe(3)
    expect(tree[1]['children'].length).toBe(4)
  })

  test('Last Root is ok.', () => {
    expect(tree[0]['id']).toBe('3b83e600-7115-48d4-85e0-8e422d59ebc8')
    expect(tree[1]['id']).toBe('ca6c9883-005a-4ee5-a84d-34bb19a7818b')
    expect(tree[1]['children'][0]['id']).toBe('cb33614c-58d8-4d7d-930d-40bfff15de26')
    expect(tree[1]['children'][1]['id']).toBe('d9702c3b-405d-4cc6-ad61-b7bca1efd710')
    expect(tree[1]['children'][2]['id']).toBe('3a501280-9a23-454e-a022-6131c6b9af9b')
  })
})

describe('UUID List to Tree，parent is null:', () => {
  let tree = null

  beforeEach(() => {
    let list = [
      {
        id: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b',
        parent: null
      },
      {
        id: 'cb33614c-58d8-4d7d-930d-40bfff15de26',
        parent: 'ca6c9883-005a-4ee5-a84d-34bb19a7818b'
      },
      {
        id: 'd9702c3b-405d-4cc6-ad61-b7bca1efd710',
        parent: 'cb33614c-58d8-4d7d-930d-40bfff15de26'
      }
    ]

    // console.log(list)

    let ltt = new LTT(list, {
      key_id: 'id',
      key_parent: 'parent',
      key_child: 'children',
      uuid: true
    })
    tree = ltt.GetTree()
  })

  test('It is workly', () => {
    expect(tree.length).toBe(1)
  })
})