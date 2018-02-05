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

    let ltt = new LTT(list)
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
