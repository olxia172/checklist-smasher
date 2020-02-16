import { observable, action } from 'mobx'
import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { toggleDoneItem } from '../queries/checklists'

const link = new HttpLink({ uri: 'http://localhost:3001/graphql', fetch })

export default class ItemStore {
  constructor(root) {
    this.root = root
  }

  @observable isLoading = false;

  @action.bound
  toggleDoneItem(itemId, doneValue) {
    makePromise(execute(link, toggleDoneItem(itemId, doneValue)))
      .then(() => this.root.refresh()
      )
      .catch(error => this.errors = error)
  }
}