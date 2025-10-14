import { IUser } from './user';

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: string; 
  createdAt: string;
  updatedAt: string;
  user: string | IUser; 
}

export interface TaskItemProps {
  task: ITask;
  onToggle: () => Promise<void>;
  onDelete: () => void;
  onEdit: (task: ITask) => void;
}

export interface TaskFormProps {
  initialData?: ITask;
  onSubmit: (task: Partial<ITask>) => void;
  isEditing?: boolean;
  onClose: () => void;
}

export type TaskFilterType = 'all' | 'active' | 'done';

export interface TaskFilterProps {
  filter: TaskFilterType;
  setFilter: (filter: TaskFilterType) => void;
}

export interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export interface StatusCardProps {
  label: string;
  count: number;
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}
