const fetch = require('node-fetch')
const root = 'http://localhost:5000/api/nomeModulo'
var nomeModuloExample = {
                        	"attributo1": "1",
                        	"attributo2": "1",
                        	"attributo3": { "value": "10" }
                        }
const postnomeModulo = function(nomeModulo){
  return fetch(root, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(nomeModulo)
  })
}

const putnomeModulo = function(id){
  var url = root + '/' + id
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ attributo3: { value: "20" } })
  })
}

const getAssignments = function(){
  return fetch(root, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

const getonenomeModulo = function(id){
  return fetch(root+'/'+id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

const deletenomeModulo = function(id){
  return fetch(root+'/'+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

//testo sia la post che la get one
test('test post new nomeModulo and get it back', () => {
  return postnomeModulo(nomeModuloExample)
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
        nomeModuloExample.attributo1 = postResponseJson.attributo1
        nomeModuloExample.id = postResponseJson.id //vado a salvare localmente l'id sul mio esempio
        return getonenomeModulo(nomeModuloExample.id)
    })
    .then(getResponse => {return getResponse.json()})
    .then(jsonResponse => {expect(jsonResponse.attributo1).toEqual(nomeModuloExample.attributo1)})
    //.catch(e => {console.log(e)})
})
test('test put function', () =>{
    return putnomeModulo(nomeModuloExample.id)
    .then(putResponse => { return putResponse.json() })
    .then(putResponseJson => {
        expect(putResponseJson.attributo3.value).toEqual('20') //mi aspetto che sia uguale a quello che ho cambiato
    })
})
test('test delete function', () =>{
    return deletenomeModulo(nomeModuloExample.id)
    .then(deleteResponse => { return deleteResponse.json() })
    .then(deleteResponseJson => {
        expect(deleteResponseJson.message).toEqual('deleted')
    })
})