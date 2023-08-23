export interface INote {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

export interface IAuthor extends INote {
  badge: 'author';
}
