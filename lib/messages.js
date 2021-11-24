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
  return {
    data: {
      message: `${entity} ${id} er slettet`,
      id: id
    }
  }
}

function record_updated (id, entity) {
  return {
    data: {
      message: `Opdateret ${entity} ${id}`,
      id: id
    }
  }
}

function record_created (id, entity) {
  return {
    data:
      {
        message: `Oprettet ${entity} ${id}`,
        id: id
      }
  }
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
