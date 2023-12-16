export interface IEdenAPIAudio {
  audio: string;
  audio_resource_url: string;
  cost: number;
  status: 'success';
  voice_type: number;
}

export interface IEdentAPIData {
  providers: 'elevenlabs';
  language: 'eng';
  text: string;
  option: 'FEMALE' | 'MALE';
}
