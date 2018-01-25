import Tree from '../../../src/tree'

export default () => {
  const object = { id: 1, title: 'Root' }
  const tree = new Tree(object)

  const list = [
    { id: 2, parent: 1 },
    { id: 3, parent: 1 },
    { id: 4, parent: 3 },
    { id: 5, parent: 4 },
    { id: 6, parent: 5 },
    { id: 7, parent: 2 },
    { id: 8, parent: 7 }
  ]
    .map(item => {
      item.title = `Node ${item.id}`
      return item
    })
    .forEach(item => {
      tree.add(parentNode => {
        return parentNode.get('id') === item.parent
      }, item)
    })

  return tree
}
