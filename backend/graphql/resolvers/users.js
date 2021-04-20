const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const getAuthenticatedUser = require("../middlewares/authenticated");
const generateToken = require("../../util/generateToken");

module.exports = {
        Query: {
            loadUser: async(_, __, context) => {
                const { user, token } = await getAuthenticatedUser({
                    context,
                    newToken: true,
                });
                if (!user) {
                    throw new Error("Unauthenticated!");
                }

                return {
                    token,
                    ...user._doc,
                    id: user._id,
                };
            },
        }