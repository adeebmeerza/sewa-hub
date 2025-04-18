export type FilterValue = string | number | boolean;

export interface BaseFilter {
  type: string;
}

export interface IMultiSelectFilter extends BaseFilter {
  type: "multiSelect";
  options: Array<string | { value: string; label: string }>;
}

export interface ISingleSelectFilter extends BaseFilter {
  type: "singleSelect";
  options: Array<string | { value: string; label: string }>;
}

export interface IRangeSliderFilter extends BaseFilter {
  type: "rangeSlider";
  min: number;
  max: number;
  step: number;
  defaultMin: number;
  defaultMax: number;
}

export interface IStarRatingFilter extends BaseFilter {
  type: "starRating";
  options: number[];
}

export interface IDistanceFilter extends BaseFilter {
  type: "distance";
  options: Array<{ radius: string; label: string }>;
}

export type FilterType =
  | IMultiSelectFilter
  | ISingleSelectFilter
  | IRangeSliderFilter
  | IStarRatingFilter
  | IDistanceFilter;

export type FiltersObject = {
  [key: string]: FilterType;
};
