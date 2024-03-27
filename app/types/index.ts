export interface TaskSchema {
  id: string;
  userId: number;
  title: string;
  label: string;
  priority: string;
  status: string;
  createdAt: Date;
}