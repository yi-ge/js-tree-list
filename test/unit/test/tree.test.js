import Node from '../../../src/node'
import Tree from '../../../src/tree'
import { showTree, compareById } from '../../../src/utils'
import generateTreeDefault from './generate-tree-default'

let object = { id: 1, title: 'Root' }
let tree = new Tree(object)

describe('Tree', () => {
  beforeEach(() => {
    object = { id: 1, title: 'Root' }
    tree = new Tree(object)
  })

  describe('Constructor', () => {
    test('It exists', () => {
      expect(tree instanceof Tree).toEqual(true)
    })

    test('With params', () => {
      expect(tree.rootNode instanceof Node).toEqual(true)
    })

    test('Without params', () => {
      const tree = new Tree()

      expect(tree.rootNode instanceof Node).toEqual(false)
      expect(tree.rootNode).toEqual(null)
    })
  })

  describe('Add', () => {
    test('Add root', () => {
      const tree = new Tree()
      const resultTree = tree.add('root', object)

      expect(resultTree instanceof Tree).toEqual(true)
      expect(resultTree.rootNode instanceof Node).toEqual(true)
    })

    test('Add regular node', () => {
      const regularObject = { id: 2, title: 'Node 2' }
      const resultTree = tree.add(parentNode => {
        return parentNode.get('id') === 1
      }, regularObject)

      expect(resultTree instanceof Tree).toEqual(true)
      expect(resultTree.rootNode instanceof Node).toEqual(true)

      expect(resultTree.rootNode.children).toHaveLength(1)
      expect(resultTree.rootNode.children[0].get('id')).toEqual(2)
    })

    test('Add many nodes', () => {
      tree = generateTreeDefault()

      expect(tree instanceof Tree).toEqual(true)
      expect(tree.rootNode instanceof Node).toEqual(true)

      expect(tree.rootNode.get('id')).toEqual(1)
      expect(tree.rootNode.children[0].get('id')).toEqual(2)
      expect(tree.rootNode.children[1].get('id')).toEqual(3)

      expect(tree.rootNode.children[1].children[0].get('id')).toEqual(4)
      expect(
        tree.rootNode.children[1].children[0].children[0].get('id')
      ).toEqual(5)
      expect(
        tree.rootNode.children[1].children[0].children[0].children[0].get('id')
      ).toEqual(6)

      // showTree(tree);
    })
  })

  describe('Contains', () => {
    test('Search element when he does exists', () => {
      tree = generateTreeDefault()
      const targetNode = tree.contains(currentNode => {
        return currentNode.get('id') === 7
      })

      expect(targetNode instanceof Node).toEqual(true)
      expect(targetNode.get('id')).toEqual(7)
    })

    test('Search element when he does not exists', () => {
      tree = generateTreeDefault()
      const targetNode = tree.contains(currentNode => {
        return currentNode.get('id') === 100
      })

      expect(targetNode).toEqual(undefined)
    })
  })

  describe('Remove', () => {
    test('Remove correct criteria', () => {
      tree = generateTreeDefault()
      const result = tree.remove(currentNode => {
        return currentNode.get('id') === 7
      })
      const targetNode = tree.contains(currentNode => {
        return currentNode.get('id') === 7
      })

      expect(result).toEqual(true)
      expect(targetNode).toEqual(undefined)
    })

    test('Remove incorrect criteria', () => {
      tree = generateTreeDefault()
      const result = tree.remove(currentNode => {
        return currentNode.get('id') === 100
      })
      const targetNode = tree.contains(currentNode => {
        return currentNode.get('id') === 100
      })

      expect(result).toEqual(false)
      expect(targetNode).toEqual(undefined)
    })
  })

  describe('Move', () => {
    test('Move exists branch', () => {
      tree = generateTreeDefault()
      const search = currentNode => currentNode.get('id') === 7
      const destination = currentNode => currentNode.get('id') === 3
      const result = tree.move(search, destination)
      const targetNode = tree.contains(search)

      expect(result).toEqual(true)
      expect(targetNode.get('id')).toEqual(7)
      expect(targetNode.parent.get('id')).toEqual(3)

      // showTree(tree);
    })

    test('Move not exists branch', () => {
      tree = generateTreeDefault()
      const search = currentNode => currentNode.get('id') === 100
      const destination = currentNode => currentNode.get('id') === 3
      const result = tree.move(search, destination)
      const targetNode = tree.contains(search)

      expect(result).toEqual(false)
      expect(targetNode).toEqual(undefined)
    })
  })

  describe('Traversal', () => {
    test('Add new field for item.id === 7', () => {
      tree = generateTreeDefault()
      const criteria = currentNode => currentNode.get('id') === 7
      tree.traversal(criteria, currentNode => {
        currentNode.set('some', true)
      })
      // showTree(tree);
      tree.traversal(null, currentNode => {
        const some = currentNode.get('some')
        expect(some).toEqual(currentNode.get('id') === 7 ? true : undefined)
      })
    })

    test('Add new property for each node', () => {
      tree = generateTreeDefault()
      tree.traversal(null, currentNode => {
        currentNode.set('some', true)
      })

      tree.traversal(null, currentNode => {
        const some = currentNode.get('some')
        expect(some).toEqual(true)
      })
    })

    test('Add new property only for even nodes', () => {
      tree = generateTreeDefault()
      tree.traversal(null, currentNode => {
        if (currentNode.get('id') % 2 === 0) {
          currentNode.set('some', true)
        }
      })

      tree.traversal(null, currentNode => {
        const some = currentNode.get('some')
        if (currentNode.get('id') % 2 === 0) {
          expect(some).toEqual(true)
        } else {
          expect(some).toEqual(undefined)
        }
      })
    })

    test('typeof criteria is function', () => {
      tree = generateTreeDefault()
      tree.traversal(null, currentNode => {
        if (currentNode.get('id') % 2 === 0) {
          currentNode.set('some', true)
        }
      })

      tree.traversal(tree)
    })
  })

  describe('Sort', () => {
    test('Order desc', () => {
      tree = generateTreeDefault()
      tree.sort(compareById(false))

      // showTree(tree);
      expect(tree.rootNode.children[0].get('id')).toEqual(3)
      expect(tree.rootNode.children[1].get('id')).toEqual(2)
    })

    test('Order asc', () => {
      tree = generateTreeDefault()
      tree.sort(compareById(false))
      tree.sort(compareById(true))

      // showTree(tree);
      expect(tree.rootNode.children[0].get('id')).toEqual(2)
      expect(tree.rootNode.children[1].get('id')).toEqual(3)
    })
  })

  describe('toJson', () => {
    test('Searialize tree to json', () => {
      tree = generateTreeDefault()
      const json = tree.toJson()

      expect(json.id).toEqual(1)
      expect(json.children[0].id).toEqual(2)
      expect(json.children[0].children[0].id).toEqual(7)
      expect(json.children[0].children[0].children[0].id).toEqual(8)
      expect(json.children[1].id).toEqual(3)
      expect(json.children[1].children[0].id).toEqual(4)
      expect(json.children[1].children[0].children[0].id).toEqual(5)
    })

    test('Searialize tree to json after sort desc', () => {
      tree = generateTreeDefault()
      tree.sort(compareById(false))
      const json = tree.toJson()

      expect(json.id).toEqual(1)
      expect(json.children[1].id).toEqual(2)
      expect(json.children[1].children[0].id).toEqual(7)
      expect(json.children[1].children[0].children[0].id).toEqual(8)
      expect(json.children[0].id).toEqual(3)
      expect(json.children[0].children[0].id).toEqual(4)
      expect(json.children[0].children[0].children[0].id).toEqual(5)
    })

    test('Searialize tree to json after remove element', () => {
      tree = generateTreeDefault()
      tree.remove(parentNode => parentNode.get('id') === 2)
      const json = tree.toJson()

      expect(json.id).toEqual(1)
      expect(json.children[0].id).toEqual(3)
      expect(json.children[0].children[0].id).toEqual(4)
      expect(json.children[0].children[0].children[0].id).toEqual(5)
    })

    test('Searialize tree to json with options: key_children=child', () => {
      tree = generateTreeDefault()
      const json = tree.toJson({
        key_children: 'child'
      })

      expect(json.id).toEqual(1)
      expect(json.child[0].id).toEqual(2)
      expect(json.child[0].child[0].id).toEqual(7)
      expect(json.child[0].child[0].child[0].id).toEqual(8)
      expect(json.child[1].id).toEqual(3)
      expect(json.child[1].child[0].id).toEqual(4)
    })

    describe('Options', () => {
      test('Flag: empty_children', () => {
        tree = generateTreeDefault()
        const json = tree.toJson({
          empty_children: false
        })

        expect(json.children[0].children[0].children[0].id).toEqual(8)
        expect(json.children[0].children[0].children[0].children).toEqual(
          undefined
        )
      })
    })
  })

  describe('toJson back [] or Tree is null', () => {
    test('Searialize tree to json', () => {
      let tree = new Tree()
      const json = tree.toJson()
      expect(typeof json).toEqual('object')
    })
  })

  describe('Options', () => {
    test('Flags: key_id and key_parent', () => {
      const object = { uid: 1, title: 'Root' }
      const tree = new Tree(object)

      const list = [
        { uid: 2, _parent: 1 },
        { uid: 3, _parent: 1 },
        { uid: 4, _parent: 3 },
        { uid: 5, _parent: 4 },
        { uid: 6, _parent: 5 },
        { uid: 7, _parent: 2 },
        { uid: 8, _parent: 7 }
      ]
        .map(item => {
          item.title = `Node ${item.uid}`
          return item
        })
        .forEach(item => {
          tree.add(parentNode => {
            return parentNode.get('uid') === item._parent
          }, item)
        })

      // showTree(tree);
      // console.log(tree.toJson({ key_children: 'child' }));

      expect(tree instanceof Tree).toEqual(true)
      expect(tree.rootNode instanceof Node).toEqual(true)

      expect(tree.rootNode.get('uid')).toEqual(1)
      expect(tree.rootNode.children[0].get('uid')).toEqual(2)
      expect(tree.rootNode.children[1].get('uid')).toEqual(3)

      expect(tree.rootNode.children[1].children[0].get('uid')).toEqual(4)
      expect(
        tree.rootNode.children[1].children[0].children[0].get('uid')
      ).toEqual(5)
      expect(
        tree.rootNode.children[1].children[0].children[0].children[0].get('uid')
      ).toEqual(6)
    })
  })

  describe('Get', () => {
    test('Regular', () => {
      expect(tree.get('id')).toEqual(1)
    })

    test('If not exists property', () => {
      expect(tree.get('uid')).toEqual(undefined)
    })
  })

  describe('Set', () => {
    test('Regular set', () => {
      expect(tree.get('id')).toEqual(1)
      tree.set('id', 101)
      expect(tree.get('id')).toEqual(101)
    })

    test('Add new property', () => {
      expect(tree.get('some')).toEqual(undefined)
      tree.set('some', true)
      expect(tree.get('some')).toEqual(true)
    })
  })

  describe('Hide load', () => {
    test('2000 items', () => {
      function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
      const list = new Array(10000).fill().map((item, index) => {
        return {
          id: index + 1,
          parent: getRandomInt(0, index)
        }
      })

      tree = new Tree({ id: 0 })
      list.forEach((item, index) => {
        tree.add(parentNode => {
          return parentNode.get('id') === item.parent
        }, item)
      })
      const jTree = tree.toJson({
        empty_children: false
      })
    })
  })
})
