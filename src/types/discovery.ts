export interface Profile {
  id: number;
  username: string;
  age: number;
  archetype: string;
  avatarUrl: string | null;
  bio: string;
  traits: Record<string, any>;
}