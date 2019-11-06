import authors from "data/authors";

export const findByUsername = (username) => authors.find(author => author.username === username) || {};
