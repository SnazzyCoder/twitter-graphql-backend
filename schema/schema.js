const graphql = require('graphql')
const Tweets = require('../models/Tweet')

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = graphql

const TweetType = new GraphQLObjectType({
    name: "tweet",
    fields: {
        id: {type: GraphQLID},
        author: {type: GraphQLString},
        title: {type: GraphQLString},
        content: {type: GraphQLString}
    }
})

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        tweets: {
            type: new GraphQLList(TweetType),
            resolve(parent, args) {
                return Tweets.find({})
            }
        },
        tweet: {
            type: TweetType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Tweets.findById(args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'addTweet',
    fields: {
        addTweet: {
            type: TweetType,
            args: {
                author: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent,args) {

                const tweet = new Tweets({
                    author: args.author,
                    title: args.title,
                    content: args.content,
                })

                return tweet.save()
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})