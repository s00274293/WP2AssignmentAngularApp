export interface Launch {
    _id: string;
    missionName: string;
    rocketName: string;
    date?: Date;
    favorite?: boolean;
    notes?: string;
}

export interface CreateLaunchDto {
  missionName: string;
  rocketName: string;
  date?: Date;
  favorite?: boolean;
  notes?: string;
}

export interface UpdateLaunchDto {
  missionName: string;
  rocketName: string;
  date?: Date;
  favorite?: boolean;
  notes?: string;
}
