export type SitType = {
	type: string;
  	number: number;
	reserved: boolean;
	opposite: boolean;
}

export type ColumnType = {
	hasBike: boolean;
	sits: SitType[];
}

export type WagonType = {
	id: number;
	rows: number;
	columns: ColumnType[]
	corridors: number[];
}

export type VehicleType = {
    type: string;
	wagons: WagonType[]
}

export type SavedProjectType = {
    title: string;
    saved: boolean;
    vehicle: VehicleType;
	savedAt: Date;
}

