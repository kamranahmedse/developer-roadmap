import authors from "storage/authors";

export const findByUsername = (username) => authors.find(author => author.username === username) || {};
