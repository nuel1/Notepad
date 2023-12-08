export interface INote {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  // note_id: string;
}

export interface IAuthor extends INote {
  badge: 'author';
}

export interface ICreateNote {
  title: string;
  tags: string[];
}
