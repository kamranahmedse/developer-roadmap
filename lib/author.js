import authors from "content/authors";

export const findByUsername = (username) => authors.find(author => author.username === username) || {};
