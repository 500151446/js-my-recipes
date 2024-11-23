
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

router.get('/', (_, response) => {
    mappedRecipes = recipes.map(({ id, title, image, prepTime, difficulty }) => {
        return {id, title, image, prepTime, difficulty}
    })
    response.send(mappedRecipes)
})

router.post('/recipe/add', (request, response) => {
    const{title, image, ingredients, instructions, prepTime, difficulty} = request.body
    id = recipes.length + 1
    const recipe = { id, title, image, ingredients, instructions, prepTime, difficulty }
    recipes.push(recipe)
    response.send(recipe)
    
})

router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(p => p.id.toString() === id)
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find recipe with id: ${id}` }})
})

module.exports = router