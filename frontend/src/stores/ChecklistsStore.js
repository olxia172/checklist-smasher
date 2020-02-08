import { observable, action } from "mobx"
import gql from "graphql-tag"
import { execute, makePromise } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import fetch from "node-fetch"

const link = new HttpLink({ uri: "http://localhost:3001/graphql", fetch })

export default class ChecklistsStore {
  @observable isLoading = false
  @observable checklists = []
  @observable errors = null

  @action.bound
  getChecklists() {
    this.isLoading = true

    const operation = {
      query: gql`
      {
        checklists {
          id
          name
        }
      }
      `,
    }

    makePromise(execute(link, operation))
      .then(({ data }) => {
        this.checklists = data.checklists
        this.isLoading = false
      })
      .catch(error => this.errors = error)
  }
}