declare var io: any;

interface Message {
  type: string;
  data: {
    username: string;
    content: string;
    timestamp: Date;
  };
}
