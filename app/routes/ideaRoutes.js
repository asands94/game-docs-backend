// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Game = require('../models/game')

// custom middleware
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// ROUTES

// POST -> create an idea(and give that idea to a game)
// anybody should be able to give a game an idea
// so we wont requireToken
// our idea schema, has some non-required fields, so let's use removeBlanks
router.post('/ideas/:gameId', removeBlanks, (req, res, next) => {
    // isolate our idea from the request, and save to variable
  const idea = req.body.idea
    // isolate and save our gaes's id for easy reference
    const gameId = req.params.gameId
    // find the game and push the new idea into the game's array
    Game.findById(gameId)
        // first step is to use our custom 404 middleware
        .then(handle404)
        // handle adding idea to game
        .then(game => {
            console.log('the game: ', game)
            console.log('the idea: ', idea)
            // add idea to idea array
            game.ideas.push(idea)

            // save the game
            return game.save()
        })
        // send info after updating the game
        .then(game => res.status(201).json({ game: game }))
        // pass errors along to our error handler
        .catch(next)
})

// PATCH -> update an idea
router.patch('/ideas/:gameId/:ideaId', requireToken, removeBlanks, (req, res, next) => {
    // get and save the id's to variables
    const gameId = req.params.gameId
    const ideaId = req.params.ideaId

    // find our game
    Game.findById(gameId)
        .then(handle404)
        .then(game => {
            // single out the idea
            const theIdea = game.ideas.id(ideaId)
            // make sure the user is the games's owner
            requireOwnership(req, game)
            // update accordingly
            theIdea.set(req.body.idea)

            return game.save()
        })
        // send a status
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE -> destroy an idea
router.delete('/ideas/:gameId/:ideaId', requireToken, (req, res, next) => {
  const gameId = req.params.gameId
  const ideaId = req.params.ideaId

    // find the game
    Game.findById(gameId)
        .then(handle404)
        // grab the specific idea using its id
        .then(game => {
            // isolate the idea
            const theIdea = game.ideas.id(ideaId)
            // make sure the user is the owner of the game
            requireOwnership(req, game)
            // call remove on our idea subdoc
            theIdea.remove()
            // return the saved game
            return game.save()
        })
        // send a response
        .then(() => res.sendStatus(204))
        // pass errors to our error handler (using next)
        .catch(next)
})

// export our router
module.exports = router