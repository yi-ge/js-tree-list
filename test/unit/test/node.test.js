import Node from '../../../src/node'
import { compareById } from '../../../src/utils'

const rootContent = {
  id: 1,
  name: 'Root'
}

let node = new Node(rootContent)

describe('Node', () => {
  beforeEach(() => {
    node = new Node(rootContent)
  })

  describe('Constructor', () => {
    test('Check children and content field', () => {
      const { children, content } = node

      expect(Array.isArray(children)).toBe(true)
      expect(children).toHaveLength(0)
      expect(content.name).toEqual(rootContent.name)
    })

    test('Check correct work getter', () => {
      expect(rootContent.name).toEqual(node.get('name'))
      expect(node.get('lastname')).toEqual(undefined)
    })
  })

  describe('Get', () => {
    test('Method get with correct path', () => {
      expect(node.get('id')).toEqual(1)
      expect(node.get('name')).toEqual('Root')
    })

    test('Method get with incorrect path', () => {
      expect(node.get('uid')).toEqual(undefined)
    })
  })

  describe('Set', () => {
    test('Method set with correct path', () => {
      expect(node.set('id', 100)).toEqual(true)
      expect(node.get('id')).toEqual(100)
    })

    test('Method set with incorrect path', () => {
      expect(node.set('uid', 101)).toEqual(true)
      expect(node.get('uid')).toEqual(101)
    })
  })

  describe('Add', () => {
    test('Add one node', () => {
      const childNode = node.add({ id: 2, name: 'Two node' })

      expect(childNode instanceof Node).toEqual(true)
      expect(node.children).toHaveLength(1)
      expect(node.length).toEqual(1)
    })

    test('Add nodes', () => {
      node.add({ id: 2, name: 'Two node' })
      node.add({ id: 3, name: 'Three node' })

      expect(node.children).toHaveLength(2)
      expect(node.length).toEqual(2)
    })
  })

  describe('Remove', () => {
    test('Remove exists child node', () => {
      node.add({ id: 2, name: 'Two node' })
      node.add({ id: 3, name: 'Three node' })
      const removedNodes = node.remove(itemNode => {
        return itemNode.get('id') === 3
      })

      expect(node.length).toEqual(1)
      expect(removedNodes.length).toEqual(1)
    })

    test('Remove not exists node', () => {
      node.add({ id: 2, name: 'Two node' })
      node.add({ id: 3, name: 'Three node' })
      const removedNodes = node.remove(itemNode => {
        return itemNode.get('id') === 333
      })

      expect(node.length).toEqual(2)
      expect(removedNodes.length).toEqual(0)
    })
  })

  describe('Sort', () => {
    test('Order desc', () => {
      node.add({ id: 2, name: 'Two node' })
      node.add({ id: 3, name: 'Three node' })
      node.add({ id: 15, name: 'Fifteen node' })
      node.add({ id: 4, name: 'Four node' })
      node.sort(compareById(false))

      expect(node.children[0].get('id')).toEqual(15)
      expect(node.children[1].get('id')).toEqual(4)
      expect(node.children[2].get('id')).toEqual(3)
      expect(node.children[3].get('id')).toEqual(2)
    })

    test('Order asc', () => {
      node.add({ id: 2, name: 'Two node' })
      node.add({ id: 3, name: 'Three node' })
      node.add({ id: 15, name: 'Fifteen node' })
      node.add({ id: 4, name: 'Four node' })
      node.sort(compareById(true))

      expect(node.children[0].get('id')).toEqual(2)
      expect(node.children[1].get('id')).toEqual(3)
      expect(node.children[2].get('id')).toEqual(4)
      expect(node.children[3].get('id')).toEqual(15)
    })
  })

  describe('Traversal', () => {
    test('Change name for each child', () => {
      node.add({ id: 2, name: 'Two node' })
      node.add({ id: 3, name: 'Three node' })
      node.add({ id: 15, name: 'Fifteen node' })
      node.add({ id: 4, name: 'Four node' })
      node.traversal(null, currentNode => {
        const name = currentNode.get('name')
        currentNode.set('name', `${name}!`)
      })
      expect(node.children[0].get('name')).toEqual('Two node!')
      expect(node.children[1].get('name')).toEqual('Three node!')
    })

    test('Change name for item with id is 3', () => {
      node.add({ id: 2, name: 'Two node' })
      node.add({ id: 3, name: 'Three node' })
      node.add({ id: 15, name: 'Fifteen node' })
      node.add({ id: 4, name: 'Four node' })
      node.traversal(
        currentNode => currentNode.get('id') === 3,
        currentNode => {
          const name = currentNode.get('name')
          currentNode.set('name', `${name}!`)
        }
      )
      expect(node.children[0].get('name')).toEqual('Two node')
      expect(node.children[1].get('name')).toEqual('Three node!')
    })
  })
})
