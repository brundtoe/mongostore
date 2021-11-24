/**
 * Functions to return messages
 */
function record_not_found (id, entity) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
      description: `${entity} ${id} findes ikke`,
    }
  }
}

function record_deleted (id, entity) {
  let data = {
    message: `${entity} ${id} er slettet`
  }
  data[`${entity.toLowerCase()}_id`] = id
  return { data: data }
}

function record_updated (id, entity) {
  let data = {
    message: `Opdateret ${entity} ${id}`
  }
  data[`${entity}_id`] = id
  return { data: data }
}

function record_created (id, entity) {
  let data = {
    message: `Oprettet ${entity} ${id}`
  }
  data[`${entity}_id`] = id
  return { data: data }
}

function action_failed (action) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
      description: `Transaktionen ${action} fejlede`,
    }
  }
}

function collection_not_found(entity) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
        description: `${entity} collection findes ikke`,
    }
  }


}
module.exports = {record_not_found, record_updated, record_deleted, record_created, action_failed, collection_not_found}
