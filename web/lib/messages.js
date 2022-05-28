/**
 * Functions to return messages
 */

module.exports = {

  record_not_found (id, entity) {
    return {
      error: {
        type: 'RESOURCE_NOT_FOUND',
        description: `${entity} ${id} findes ikke`,
      }
    }
  },

  record_deleted (id, entity) {
    let data = {
      message: `${entity} ${id} er slettet`
    }
    data[`${entity.toLowerCase()}_id`] = id
    return { data: data }
  },

  record_updated (id, entity) {
    let data = {
      message: `Opdateret ${entity} ${id}`
    }
    data[`${entity}_id`] = id
    return { data: data }
  },

  record_created (id, entity) {
    let data = {
      message: `Oprettet ${entity} ${id}`
    }
    data[`${entity}_id`] = id
    return { data: data }
  },

  action_failed (action) {
    return {
      error: {
        type: 'RESOURCE_NOT_FOUND',
        description: `Transaktionen ${action} fejlede`,
      }
    }
  },

  collection_not_found (entity) {
    return {
      error: {
        type: 'RESOURCE_NOT_FOUND',
        description: `${entity} collection findes ikke`,
      }
    }
  },

  author_has_books (author_id) {
    return {
      error: {
        type: 'NOT_ALLOWED',
        description: [`Author ${author_id} har skrevet bøger og kan ikke slettes`],
      }
    }
  },

  user_has_orders (customer_id) {
    return {
      error: {
        type: 'NOT_ALLOWED',
        description: [`Customer ${customer_id} har placeret ordrer og kan ikke slettes`],
      }
    }
  },
  book_has_orderlines (book_id) {
    return {
      error: {
        type: 'NOT_ALLOWED',
        description: [`Book ${book_id} har ordrelinier og kan ikke slettes`],
      }
    }
  }
}
