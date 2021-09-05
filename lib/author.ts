import authors from '../content/authors.json';

export type AuthorType = {
  username: string;
  name: string;
  twitter: string;
  picture: string;
  bio: string;
}

export function findAuthorByUsername(username: string): AuthorType | undefined {
  return (authors as AuthorType[]).find(author => author.username === username);
}

