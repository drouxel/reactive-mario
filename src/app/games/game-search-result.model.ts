export class PaginatedSearchResult<T> {
  pagination!: PaginationResult;
  data!: T[]
}

export class PaginationResult {
  total_count!: number;
  total_pages!: number;
}

export class GameSearchItem {
  id!: number;
  name!: string;
  release_date!: Date;
  age!: number;
  device!: Device;
}

export class GameDetail {
  id!: number;
  name!: string;
  release_date!: Date;
  age!: number;
  device!: Device;
  image!: string;
  genres!: Genre[];
}

export class Genre {
  name!: string;
  icon!: string;
  code!: string;
}

export class Device {
  name!: string;
  code!: string;
  logo!: string;
  description_fr!: string;
}

export class MarioUniversalisResponse<T> {
  data!: T;
}

export class Sort {
  field!: 'release_date_eur' | 'name' | 'popularity';
  sort!: 'ASC' | 'DESC';
}
