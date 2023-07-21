export interface iNote {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  noteIsFocused?: boolean;
  noteOptionToggled?: boolean;
}

export interface iUser {
  name: string;
  img: any;
}

export interface iNgxEditorJson {
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
