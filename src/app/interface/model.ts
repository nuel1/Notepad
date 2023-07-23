export interface INote {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

export interface IUser {
  name: string;
  img: any;
}

export interface INgxEditorJson {
  content: [
    {
      content: [
        {
          text: string;
        }
      ];
    }
  ];
}
